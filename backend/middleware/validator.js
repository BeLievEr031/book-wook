import joi from "joi"
import createError from "http-errors"


// @User validators.
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
    const validationSchema = joi.object({
        page: joi.number().integer().min(1).default(1).required(),
        limit: joi.number().integer().min(1).max(100).default(10).required(),
        sortBy: joi.string().valid('createdAt', 'updatedAt', "name", "email").default('createdAt').required(),
        sortOrder: joi.string().valid('asc', 'desc').default('asc').required()
    });

    if (!req.query || typeof req.query !== 'object') {
        return next(createError(400, 'Invalid request query'));
    }
    const { error, value } = validationSchema.validate(req.query)
    if (error) {
        return next(createError(422, error.message))
    }

    req.query = value;
    next()
}

const validateUpdateUser = (req, _, next) => {
    const validationSchema = joi.object({
        name: joi.string().required().trim().disallow(""),
        email: joi.string().required().email().disallow(""),
        role: joi.string().required().valid("ADMIN", "USER").default("USER").disallow(""),
        isVerified: joi.boolean(),
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

// @Book validators.
const validateAddBook = (req, _, next) => {
    const validationSchema = joi.object({
        genreid: joi.string().required().trim(),
        title: joi.string().required().trim(),
        author: joi.string().required().trim(),
        description: joi.string().required().trim(),
        price: joi.number().default(0),
        isForSale: joi.boolean().default(false),
        isForRent: joi.boolean().default(false),
        rentalPrice: joi.number().default(0),
        rating: joi.number().min(1).max(5).default(0),
        thumbnail: joi.string().default(''),
        photos: joi.array().items(joi.string()).default([]),
        pdf: joi.string().default(''),
        quantity: joi.number().default(0),
        isActive: joi.boolean().default(false)
    });

    if (!req.body || typeof req.body !== 'object') {
        return next(createError(400, 'Invalid request body'));
    }
    const { error, value } = validationSchema.validate(req.body)
    if (error) {
        return next(createError(422, error.message))
    }
    req.book = value;
    next()
}

const validateUpdateBook = (req, _, next) => {
    const validationSchema = joi.object({
        genreid: joi.string().required().trim(),
        title: joi.string().required().trim(),
        author: joi.string().required().trim(),
        description: joi.string().required().trim(),
        price: joi.number().default(0),
        isForSale: joi.boolean().default(false),
        isForRent: joi.boolean().default(false),
        rentalPrice: joi.number().default(0),
        rating: joi.number().min(1).max(5).default(0),
        thumbnail: joi.string().default(''),
        photos: joi.array().items(joi.string()).default([]),
        pdf: joi.string().default('').required(),
        quantity: joi.number().default(0),
        isActive: joi.boolean().default(false)
    });

    if (!req.body || typeof req.body !== 'object') {
        return next(createError(400, 'Invalid request body'));
    }
    const { error, value } = validationSchema.validate(req.body)
    if (error) {
        return next(createError(422, error.message))
    }
    req.book = value;
    next()
}

const validateBookReqQuery = (req, _, next) => {
    const validationSchema = joi.object({
        page: joi.number().integer().min(1).default(1).required(),
        limit: joi.number().integer().min(1).max(100).default(10).required(),
        sortBy: joi.string().valid('createdAt', 'updatedAt', "title", "author", "rating", "price", "quantity").default('createdAt').required(),
        sortOrder: joi.string().valid('asc', 'desc').default('asc').required()
    });

    if (!req.query || typeof req.query !== 'object') {
        return next(createError(400, 'Invalid request query'));
    }
    const { error, value } = validationSchema.validate(req.query)
    if (error) {
        return next(createError(422, error.message))
    }

    req.query = value;
    next()
}

// @Genre Validators.
const validateAddGenre = (req, _, next) => {
    const validationSchema = joi.object({
        name: joi.string().trim().required().disallow(""),
        description: joi.string().trim().required().disallow(""),
    })
    if (!req.body || typeof req.body !== 'object') {
        return next(createError(400, 'Invalid request body'));
    }
    const { error, value } = validationSchema.validate(req.body)
    if (error) {
        return next(createError(400, error.message))
    }
    next()
}

const validateUpdateGenre = (req, _, next) => {
    const validationSchema = joi.object({
        name: joi.string().trim().required().disallow(""),
        description: joi.string().trim().required().disallow(""),
    })
    if (!req.body || typeof req.body !== 'object') {
        return next(createError(400, 'Invalid request body'));
    }
    const { error, value } = validationSchema.validate(req.body)
    if (error) {
        return next(createError(400, error.message))
    }
    next()
}

const validateGenreReqQuery = (req, _, next) => {
    const validationSchema = joi.object({
        page: joi.number().integer().min(1).default(1).required(),
        limit: joi.number().integer().min(1).max(100).default(10).required(),
        sortBy: joi.string().valid('createdAt', 'updatedAt', "name").default('createdAt').required(),
        sortOrder: joi.string().valid('asc', 'desc').default('asc').required()
    });

    if (!req.query || typeof req.query !== 'object') {
        return next(createError(400, 'Invalid request query'));
    }
    const { error, value } = validationSchema.validate(req.query)
    if (error) {
        return next(createError(422, error.message))
    }

    req.query = value;
    next()
}

const validateCartReqQuery = (req, _, next) => {
    const validationSchema = joi.object({
        type: joi.string().valid("delete", "update").required().disallow(""),
        // bookid: joi.string().required().disallow(""),
        quantity: joi.number().integer().min(1).required().disallow("")
    })

    if (!req.query || typeof req.query !== 'object') {
        return next(createError(400, 'Invalid request query'));
    }
    const { error, value } = validationSchema.validate(req.query)
    if (error) {
        return next(createError(422, error.message))
    }
    req.query = value;
    next();
}

const validateFetchCartReqQuery = (req, _, next) => {
    const validationSchema = joi.object({
        page: joi.number().integer().min(1).default(1).required(),
        limit: joi.number().integer().min(1).max(100).default(10).required(),
        // sortBy: joi.string().valid('createdAt', 'updatedAt', "name", "email").default('createdAt').required(),
        // sortOrder: joi.string().valid('asc', 'desc').default('asc').required()
    });

    if (!req.query || typeof req.query !== 'object') {
        return next(createError(400, 'Invalid request query'));
    }
    const { error, value } = validationSchema.validate(req.query)
    if (error) {
        return next(createError(422, error.message))
    }

    req.query = value;
    next()
}

const validateOrder = (req,_,next) =>{
    const validationSchema = joi.object({
        cartid:joi.string().required().disallow(""),
        addressid:joi.string().required().disallow("")
    })
}

// @Validators for user routes 🛣️
export { validateRegisterUser, validateLoginUser, validateReqQuery, validateUpdateUser };

// @Validators for Book routes 🛣️
export { validateAddBook, validateUpdateBook, validateBookReqQuery };

// @Validators for Genre routes 🛣️
export { validateAddGenre, validateUpdateGenre, validateGenreReqQuery };

// @Validators for Cart routes 🛣️
export { validateCartReqQuery,validateFetchCartReqQuery };