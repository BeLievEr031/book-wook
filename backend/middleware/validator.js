import joi from "joi"
import createError from "http-errors"

const validateRegisterUser = (req, _ , next) => {
    const validationSchema = joi.object({
        name: joi.string().required().trim().disallow(""),
        email: joi.string().email().required(),
        password: joi.string().required().disallow(""),
        role: joi.string().valid("ADMIN", "USER").default("USER")
    })

    console.log(req.body);

    if (!req.body || typeof req.body !== 'object') {
        return next(createError(400, 'Invalid request body'));
    }

    const { error, value } = validationSchema.validate(req.body)
    if (error) {
        console.log(req.body);

        return next(createError(422, error.message))
    }
    next()
}

const validateLoginUser = (req, _, next) => {
    const validationSchema = joi.object({
        email: joi.email().required(),
        password: joi.string().required().disallow(""),
    })

    const { error, value } = validationSchema.validate(req.body)
    if (error) {
        return next(createError(422, error.message))
    }

    next()
}

export { validateRegisterUser, validateLoginUser };