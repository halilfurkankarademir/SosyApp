/**
 * Joi şemalarıyla istek doğrulaması yapan genel bir middleware üretici fonksiyon.
 */

/**
 * Belirtilen Joi şeması ile isteğin ilgili kısmını (body, params, query) doğrulayan bir Express middleware oluşturur.
 * @param {object} schema - Joişema nesnesi.
 * @param {string} property - İstek gövdesini (`req.body`) veya istek parametrelerini (`req.params`) doğrulamak istiyorsanız, bu değişkeni "body" veya "params" olarak ayarlayın.
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
