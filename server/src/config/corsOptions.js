/**
 * @fileoverview CORS (Cross-Origin Resource Sharing) ayarlarını yapılandıran nesneyi tanımlar.
 * @module config/corsConfig
 */

import dotenv from "dotenv";
dotenv.config();

/**
 * @description Geliştirme (development) ortamında olup olmadığını belirler.
 * @type {boolean}
 */
const isDev = process.env.NODE_ENV === "development";

/**
 * @description Express `cors` middleware'i için yapılandırma seçenekleri.
 * Geliştirme ve üretim ortamları için farklı `origin` değerleri ayarlar.
 * Kimlik bilgileri (credentials) gönderimine izin verir, `Set-Cookie` başlığını erişilebilir yapar ve izin verilen HTTP metodlarını tanımlar.
 * @property {string} origin - İzin verilen kaynak (origin). Geliştirmede localhost, üretimde Vercel adresi.
 * @property {boolean} credentials - Tarayıcının istekle birlikte kimlik bilgilerini (örn: cookie) göndermesine izin verir.
 * @property {Array<string>} exposedHeaders - Tarayıcı tarafından erişilebilen sunucu yanıt başlıkları (`Set-Cookie` dahil).
 * @property {Array<string>} methods - İzin verilen HTTP metodları.
 */
export const corsConfig = {
    origin: isDev ? "http://localhost:5173" : "https://www.auroratones.online", // Geliştirme veya üretim origin'i
    credentials: true, // Cookie gibi bilgilerin gönderilmesine izin ver
    exposedHeaders: ["Set-Cookie"], // İstemcinin Set-Cookie başlığını okumasına izin ver
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // İzin verilen HTTP metodları
};
