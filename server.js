import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();  // Lädt .env
dotenv.config({ 
    path: path.join(process.cwd(), '.env.google'),
    override: true  // Überschreibt vorhandene Variablen
});


import helmet from 'helmet';
import compression from 'compression';
import { fileURLToPath } from 'url';



import connectDB from './src/config/db.js';
import errorMiddleware from './src/middleware/errorMiddleware.js';
import dateiLogger from './src/middleware/dateilogger.js';
import corsOptions from './src/middleware/corsConfig.js';
import indexRouter from './src/routes/indexRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

connectDB();


app.use(corsOptions);

// Middleware

app.use(dateiLogger);
app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routen
app.use('/', indexRouter);

// Error-Middleware als letztes
app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});