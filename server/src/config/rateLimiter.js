/**
 * Kimlik doğrulama (auth) endpoint'leri için hız sınırlama (rate limiting) middleware'ini yapılandırır.
 */
import { rateLimit } from "express-rate-limit";

/**
 * Kimlik doğrulama (login, register vb.) endpoint'leri için hız sınırlayıcı.
 * Aynı IP adresinden 15 dakikalık bir pencerede en fazla 5 isteğe izin verir.
 * Brute-force saldırılarını yavaşlatmaya yardımcı olur.
 * Standart `RateLimit-*` başlıklarını yanıta ekler.
 */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika
    limit: 5, // İzin verilen maksimum istek sayısı
    standardHeaders: true, // `RateLimit-*` standart başlıklarını gönder
});
