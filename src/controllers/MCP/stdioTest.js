
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { erstelleMcpServer } from './mcpServer.js';

const server = erstelleMcpServer();
const transport = new StdioServerTransport();
await server.connect(transport);