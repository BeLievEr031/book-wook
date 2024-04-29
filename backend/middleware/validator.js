import joi from "joi"
import createError from "http-errors"

const validateRegisterUser = (req, _, next) => {
    const validationSchema = joi.object({
        name: joi.string().required().disallow("").trim(),
        email: joi.email().required(),
        password: joi.string().required().disallow(""),
        role: joi.string().options("ADMIN", "USER").default("USER")
    })

    const { error, value } = validationSchema.validate(req.body)
    if (error) {
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