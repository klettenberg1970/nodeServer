import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerObsidianTools } from './tools/obsidianTools.js';
import { registerLinksTools } from './tools/linksTool.js';

export const erstelleMcpServer = () => {
    const server = new McpServer({
        name: 'obsidian-server',
        version: '1.0.0',
    });

    // Registriere Tools aus modularen Dateien
    registerObsidianTools(server);
    registerLinksTools(server);

    return server;
};

// Wenn die Datei direkt ausgeführt wird (z. B. via stdio über Claude / Gemini / Cursor)
const server = erstelleMcpServer();
const transport = new StdioServerTransport();
await server.connect(transport);

