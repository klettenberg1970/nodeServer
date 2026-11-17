import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerObsidianTools } from './tools/obsidianTools.js';
import { registerLinksTools } from './tools/linksTool.js';
import { registerNotizenTool } from './tools/notizenTool.js';
import { registerRssTools } from './tools/rssTool.js';
import { registerKontakteTools } from './tools/kontakteTool.js';

export const erstelleMcpServer = () => {
    const server = new McpServer({
        name: 'obsidian-server',
        version: '1.0.0',
    });

    // Registriere Tools aus modularen Dateien
    registerObsidianTools(server);
    registerLinksTools(server);
    registerNotizenTool(server);
    registerRssTools(server);
    registerKontakteTools(server);

    return server;
};