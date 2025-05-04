/**
 * @fileoverview Joi şemalarıyla istek doğrulaması yapan genel bir middleware üretici fonksiyon.
 * @module middlewares/validators/joiValidator
 */

/**
 * Belirtilen Joi şeması ile isteğin ilgili kısmını (body, params, query) doğrulayan bir Express middleware oluşturur.
 * @param {Joi.ObjectSchema} schema - Doğrulama için kullanılacak Joi şeması.
 * @param {'body' | 'params' | 'query'} property - Doğrulanacak istek özelliği ('body', 'params', 'query').
 * @returns {Function} Express middleware fonksiyonu. Hata durumunda `next(error)` çağrılır, başarılıysa `next()` çağrılır.
 */
export const requestValidator = (schema, property) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property]);

        if (error) {
            // Hata detaylarını birleştir
            const errorMessage = error.details
                .map((detail) => detail.message)
                .join(", ");
            const validationError = new Error(
                `Validation error: ${errorMessage}`
            );
            validationError.statusCode = 400;
            return next(validationError);
        }
        req[property] = value;
        next();
    };
};
