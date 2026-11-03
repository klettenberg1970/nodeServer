import { Router } from 'express';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { erstelleMcpServer } from './mcpServer.js';

const mcpRouter = Router();

const pruefeToken = (req, res, next) => {
    const token = process.env.MCP_TOKEN;
    if (!token) {
        return res.status(500).json({ error: 'MCP_TOKEN nicht konfiguriert' });
    }
    if (req.headers.authorization !== `Bearer ${token}`) {
        return res.status(401).json({ error: 'invalid_token' });
    }
    next();
};

// Stateless: pro Anfrage ein neuer Server und Transport
mcpRouter.post('/', pruefeToken, async (req, res) => {
    const server = erstelleMcpServer();
    const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
    });

    res.on('close', () => {
        transport.close();
        server.close();
    });

    try {
        await server.connect(transport);
        await transport.handleRequest(req, res, req.body);
    } catch (err) {
        console.error('MCP-Fehler:', err);
        if (!res.headersSent) {
            res.status(500).json({
                jsonrpc: '2.0',
                error: { code: -32603, message: 'Internal server error' },
                id: null,
            });
        }
    }
});

const nichtErlaubt = (req, res) => {
    res.status(405).json({
        jsonrpc: '2.0',
        error: { code: -32000, message: 'Method not allowed' },
        id: null,
    });
};

mcpRouter.get('/', nichtErlaubt);
mcpRouter.delete('/', nichtErlaubt);

export default mcpRouter;