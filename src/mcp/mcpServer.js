import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
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