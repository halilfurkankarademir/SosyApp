export const requestValidator = (schema, property) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property]);

        if (error) {
            const errorMessage = error.details
                .map((detail) => detail.message)
                .join(", ");
            const validationError = new Error(
                `Validation error: ${errorMessage}`
            );
            validationError.statusCode = 400;
            validationError.isJoi = true;
            validationError.details = error.details;
            return next(validationError);
        }
        req[property] = value;
        next();
    };
};
