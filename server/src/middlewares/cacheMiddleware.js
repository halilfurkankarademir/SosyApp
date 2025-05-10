import NodeCache from "node-cache";

// 5 dakika hafızalı bir cache olusturur
const cache = new NodeCache({ stdTTL: 300, checkperiod: 300 });

// Cache ile ilgili endpoint kontrollerlerinde kullanılacak middleware
export const cacheMiddleware = (duration) => {
    return (req, res, next) => {
        // Get methodu disindaki istekler icin cache middleware'ini atla
        const isGetMethod = req.method === "GET";
        if (!isGetMethod) {
            return next();
        }

        const key = req.originalUrl || req.url;

        const cachedResponse = cache.get(key);

        if (cachedResponse) {
            return res.send(cachedResponse);
        }
        res.sendResponse = res.json;
        res.json = (body) => {
            cache.set(key, body, duration);
            res.sendResponse(body);
        };
        next();
    };
};
