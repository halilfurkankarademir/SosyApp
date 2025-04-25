import { rateLimit } from "express-rate-limit";

// Giriş (login) ve kayıt (register) endpoint'lerine yönelik
// brute-force ve DDOS saldırılarına karşı koruma.
// bir IP adresinden 15 dakikada maksimum 5 istek kabul edilir.
// Bu, brute force attacklerini engellemeye yardimci olur.

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
});
