import joi from "joi"
import createError from "http-errors"

const validateRegisterUser = (req, _, next) => {
    const validationSchema = joi.object({
        name: joi.string().required().trim().disallow(""),
        email: joi.string().email().required(),
        password: joi.string().required().disallow(""),
    })
    if (!req.body || typeof req.body !== 'object') {
        return next(createError(400, 'Invalid request body'));
    }
    const { error, value } = validationSchema.validate(req.body)
    if (error) {
        return next(createError(422, error.message))
    }
    next()
}

const validateLoginUser = (req, _, next) => {
    const validationSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required().disallow(""),
    })

    const { error, value } = validationSchema.validate(req.body)
    if (error) {
        return next(createError(422, error.message))
    }

    next()
}

const validateReqQuery = (req, _, next) => {
    console.log(45);
    const validationSchema = joi.object({
        page: joi.number().integer().min(1).default(1),
        limit: joi.number().integer().min(1).max(100).default(10),
        sortBy: joi.string().valid('createdAt', 'updatedAt', "name", "email").default('createdAt'),
        sortOrder: joi.string().valid('asc', 'desc').default('asc')
    });

    const { error, value } = validationSchema.validate(req.body)
    if (error) {
        return next(createError(422, error.message))
    }

    next()
}

export { validateRegisterUser, validateLoginUser, validateReqQuery };