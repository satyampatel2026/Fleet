const joi= require('joi');

const createUserSchema = joi.object({
    full_name: joi.string().min(2).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(20).required(),
    role_id: joi.number().integer().required(),
    status: joi.string().valid("ACTIVE", "INACTIVE").optional()
});

const updateUserSchema = joi.object({
    full_name: joi.string().min(2).max(50),
    email: joi.string().email(),
    password: joi.string().min(6).max(20),
    status: joi.string().valid("ACTIVE", "INACTIVE").optional()
});

const validateUserCreate = (req, res, next) => {
    const { error } = createUserSchema.validate(req.body);
     if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }next();
};

const validateUserUpdate = (req, res, next) => {
    const {error} = updateUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = { validateUserCreate, validateUserUpdate };