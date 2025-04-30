/**
 * @fileoverview Arama sorguları için Joi şeması ve doğrulama middleware'ini tanımlar.
 * @module middlewares/validators/searchValidator
 */

import Joi from "joi";
import { requestValidator } from "./joiValidator.js"; // requestValidator import edildiğini varsayıyoruz

/**
 * @description Arama sorgusu (`query` veya `q`) için Joi doğrulama şeması.
 * Zorunlu bir metin olmalıdır.
 */
const querySchema = Joi.object({
    // Genellikle arama sorgusu 'q' veya 'query' olarak adlandırılır.
    // Eğer 'q' kullanıyorsanız: q: Joi.string().required(),
    query: Joi.string().trim().min(1).required(), // Boşlukları temizle, en az 1 karakter olsun
});

/**
 * @description İstek query parametrelerindeki (`req.query`) 'query' alanını doğrulamak için middleware.
 * Eğer 'q' parametresini kullanıyorsanız, şemayı ve bu fonksiyonun adını ona göre güncelleyebilirsiniz.
 * @function validateQuery
 * @type {Function} Express middleware fonksiyonu.
 */
export const validateQuery = requestValidator(querySchema, "query"); // Fonksiyon adı düzeltildi
