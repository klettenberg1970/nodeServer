// yf_class.js - Version 3 kompatibel
import YahooFinance from 'yahoo-finance2';

export class YF {
    constructor(options = {}) {
        // WICHTIG: YahooFinance muss jetzt instanziiert werden
        this.yahooFinance = new YahooFinance({
            ...options,
            suppressNotices: ['yahooSurvey'],
        });

        this.cache = new Map();
        this.cacheValidityTime = options.cacheTime || 60000; // 1 Minute default
        this.lastRequestTime = 0;
        this.minDelayBetweenRequests = options.minDelay || 2000; // 2 Sekunden default

        console.log('YF-Klasse initialisiert mit YahooFinance v3');
    }

    async _waitForRateLimit() {
        const timeSinceLastRequest = Date.now() - this.lastRequestTime;
        if (timeSinceLastRequest < this.minDelayBetweenRequests) {
            const delay = this.minDelayBetweenRequests - timeSinceLastRequest;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
        this.lastRequestTime = Date.now();
    }

    _getCached(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheValidityTime) {
            return cached.data;
        }
        return null;
    }

    _setCache(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    async _makeRequest(requestFn, cacheKey = null, useCache = true) {
        if (useCache && cacheKey) {
            const cached = this._getCached(cacheKey);
            if (cached) {

                return cached;
            }
        }

        await this._waitForRateLimit();

        try {

            const result = await requestFn();

            if (useCache && cacheKey) {
                this._setCache(cacheKey, result);
            }

            return result;
        } catch (error) {
            console.error(`Request-Fehler für ${cacheKey || 'unknown'}:`, error.message);

            if (error.message.includes('429') || error.message.includes('rate limit')) {
                console.log('Rate Limit erreicht');
                if (cacheKey) {
                    const cached = this._getCached(cacheKey);
                    if (cached) {
                        console.log(`Fallback auf Cache für: ${cacheKey}`);
                        return cached;
                    }
                }
                throw new Error('Rate Limit erreicht und kein Cache verfügbar');
            }

            // Für 404 oder andere Fehler
            if (cacheKey && error.message.includes('404')) {
                console.log(`Symbol nicht gefunden: ${cacheKey}, speichere null in Cache`);
                this._setCache(cacheKey, null);
                return null;
            }

            throw error;
        }
    }

   async getPreis(symbol) {
    // PROBLEM-SYMBOLE AUSSCHLIESSEN (Futures/Indizes die Fehler machen)
    // const problemSymbole = ['2YY=F', '^TNX', '^TYX', '^FVX', '^IRX'];
    // if (problemSymbole.includes(symbol)) {
    //     console.log(`Überspringe Problem-Symbol: ${symbol}`);
    //     return null;
    // }
    
    try {
        const cleanSymbol = symbol.trim().toUpperCase();
       
        
        const result = await this._makeRequest(
            async () => {
                const quote = await this.yahooFinance.quote(cleanSymbol);
                return quote;
            },
            `price_${cleanSymbol}`,
            true
        );
        
        if (!result) {
            return null;
        }
        
        return result.regularMarketPrice || null;
        
    } catch (error) {
        console.error(`Fehler in getPreis für ${symbol}:`, error.message);
        return null;
    }
}

    async getMehrerePreise(symbols) {
    try {
       
        
        // Erstelle alle Promises GLEICHZEITIG
        const promises = symbols.map(symbol => 
            this.getPreis(symbol).catch(error => {
                // Nur wichtige Fehler loggen
                if (!error.message.includes('Problem-Symbol')) {
                    console.error(`Fehler bei ${symbol}:`, error.message);
                }
                return null;
            })
        );
        
        // Warte auf ALLE parallel (statt nacheinander!)
        const resultsArray = await Promise.all(promises);
        
        // Ergebnisse zusammenbauen
        const results = {};
        symbols.forEach((symbol, index) => {
            results[symbol] = resultsArray[index];
        });
        
        // Statistiken
        const erfolgreich = resultsArray.filter(p => p !== null).length;
       
        
        return results;
        
    } catch (error) {
        console.error("Kritischer Fehler in getMehrerePreise:", error);
        return {};
    }
}
    async getQuote(symbol) {
        try {
            const cleanSymbol = symbol.trim().toUpperCase();
            return await this._makeRequest(
                // WICHTIG: Jetzt über this.yahooFinance.quote() aufrufen
                () => this.yahooFinance.quote(cleanSymbol),
                `quote_${cleanSymbol}`,
                true
            );
        } catch (error) {
            console.error(`Fehler in getQuote für ${symbol}:`, error);
            return null;
        }
    }

    async getHistorischeDaten(symbol, period1, period2 = new Date(), interval = '1d') {
        try {
            const cleanSymbol = symbol.trim().toUpperCase();
            const cacheKey = `hist_${cleanSymbol}_${period1.getTime()}_${period2.getTime()}_${interval}`;

            return await this._makeRequest(
                // WICHTIG: Jetzt über this.yahooFinance.historical() aufrufen
                () => this.yahooFinance.historical(cleanSymbol, {
                    period1,
                    period2,
                    interval
                }),
                cacheKey,
                true
            );
        } catch (error) {
            console.error(`Fehler in getHistorischeDaten für ${symbol}:`, error);
            return null;
        }
    }

    async getUnternehmensInfo(symbol) {
        try {
            const cleanSymbol = symbol.trim().toUpperCase();
            return await this._makeRequest(
                // WICHTIG: Jetzt über this.yahooFinance.quoteSummary() aufrufen
                () => this.yahooFinance.quoteSummary(cleanSymbol, {
                    modules: ['summaryProfile', 'financialData', 'defaultKeyStatistics']
                }),
                `info_${cleanSymbol}`,
                true
            );
        } catch (error) {
            console.error(`Fehler in getUnternehmensInfo für ${symbol}:`, error);
            return null;
        }
    }

    async getOptionen(symbol, date = null) {
        try {
            const cleanSymbol = symbol.trim().toUpperCase();
            const cacheKey = date ? `options_${cleanSymbol}_${date}` : `options_${cleanSymbol}`;

            return await this._makeRequest(
                // WICHTIG: Jetzt über this.yahooFinance.options() aufrufen
                () => this.yahooFinance.options(cleanSymbol, date),
                cacheKey,
                true
            );
        } catch (error) {
            console.error(`Fehler in getOptionen für ${symbol}:`, error);
            return null;
        }
    }

    async sucheSymbol(query) {
        try {
            return await this._makeRequest(
                // WICHTIG: Jetzt über this.yahooFinance.search() aufrufen
                () => this.yahooFinance.search(query),
                `search_${query}`,
                false // Suche nicht cachen
            );
        } catch (error) {
            console.error(`Fehler in sucheSymbol für "${query}":`, error);
            return { quotes: [] };
        }
    }

    async getTagesdaten(symbol, tage = 30) {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - tage);

        return this.getHistorischeDaten(symbol, startDate, endDate, '1d');
    }

    async getWochendaten(symbol, wochen = 52) {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - (wochen * 7));

        return this.getHistorischeDaten(symbol, startDate, endDate, '1wk');
    }

    async getMonatsdaten(symbol, monate = 12) {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(endDate.getMonth() - monate);

        return this.getHistorischeDaten(symbol, startDate, endDate, '1mo');
    }

    clearCache() {
        console.log(`Cache geleert (${this.cache.size} Einträge)`);
        this.cache.clear();
    }

    getCacheStats() {
        const now = Date.now();
        const entries = Array.from(this.cache.entries()).map(([key, value]) => ({
            key,
            age: now - value.timestamp,
            valid: (now - value.timestamp) < this.cacheValidityTime
        }));

        return {
            size: this.cache.size,
            validityTime: this.cacheValidityTime,
            validEntries: entries.filter(e => e.valid).length,
            entries: entries
        };
    }
}