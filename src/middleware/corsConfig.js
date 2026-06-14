import cors from 'cors';

const allowedOrigins = [
    // ... deine anderen Einträge
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    'http://192.168.178.93:8000',
    /\.onrender\.com$/,
    /\.github\.io$/,
    /\.localhost:\d+$/,
    /\.run\.app$/ // <--- DAS HIER FEHLT: Erlaubt alle Cloud-Run-Dienste
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
            console.log(`CORS blocked: ${origin}`); // Für Debugging
            callback(new Error('Nicht erlaubt durch CORS-Konfiguration'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

export default cors(corsOptions);