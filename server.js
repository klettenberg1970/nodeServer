import './env.js';

import express from 'express';

import helmet from 'helmet';
import compression from 'compression';

import connectDB from './src/config/db.js';
import errorMiddleware from './src/middleware/errorMiddleware.js';
import dateiLogger from './src/middleware/dateilogger.js';
import corsOptions from './src/middleware/corsConfig.js';
import indexRouter from './src/routes/indexRouter.js';

const app = express();

connectDB();

app.use(corsOptions);

// Middleware

app.use(dateiLogger);
app.use(helmet());
app.use(compression());
app.use(express.json());


// Routen
app.use('/', indexRouter);

// Error-Middleware als letztes
app.use(errorMiddleware);

// Server-Start 

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});