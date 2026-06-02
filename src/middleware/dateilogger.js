export default function dateiLogger(req, res, next) {
    if (req.url === '/favicon.ico') return next();

    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const status = res.statusCode;
        const timestamp = new Date().toLocaleString('de-DE');
        const slowWarning = duration > 2000 ? " [!!! LANGSAM !!!]" : "";

        const reset = "\x1b[0m";
        const red = "\x1b[31m";
        const yellow = "\x1b[33m";
        const green = "\x1b[32m";
        const blue = "\x1b[34m";

        let color = reset;
        if (status >= 500) color = red;
        else if (status >= 400) color = yellow;
        else if (status >= 300) color = blue;
        else if (status >= 200) color = green;

        console.log(`${color}[${timestamp}] ${req.method} ${req.originalUrl} - ${status} (${duration}ms)${slowWarning}${reset}`);
    });

    next();
}