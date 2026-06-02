export default function errorMiddleware(err, req, res, next) {
    // 1. Fehler in der Konsole loggen (für dich als Entwickler)
    console.error("\x1b[31m[Server-Fehler]\x1b[0m", err.message);

    // 2. Statuscode bestimmen (falls schon einer gesetzt wurde, sonst 500)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // 3. Antwort an das Frontend senden
    res.status(statusCode).json({
        success: false,
        message: err.message || "Ein interner Serverfehler ist aufgetreten",
        // Stack-Trace (Zeilennummern) nur lokal anzeigen, nicht auf Render
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
}