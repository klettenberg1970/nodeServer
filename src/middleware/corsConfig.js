
import cors from 'cors';

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    'http://192.168.178.93:8000',
    /\.onrender\.com$/,
    /\.github\.io$/  // ← Das reicht für ALLE GitHub Pages
];
const corsOptions = {
    origin: (origin, callback) => {
        // Erlaubt Anfragen ohne Origin (wie Postman oder mobile Apps)
        // oder wenn die Origin in der Liste oben steht
        if (!origin || allowedOrigins.some(pattern => 
            typeof pattern === 'string' ? pattern === origin : pattern.test(origin)
        )) {
            callback(null, true);
        } else {
            callback(new Error('Nicht erlaubt durch CORS-Konfiguration'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Wichtig, falls du später Cookies oder Sessions nutzt
};

export default cors(corsOptions);
