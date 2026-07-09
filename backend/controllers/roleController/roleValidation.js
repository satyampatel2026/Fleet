const joi = require('joi');

const roleSchema = joi.object({
    role_name: joi.string().min(2).max(50).required()
});

const updateRoleSchema = joi.object({
    role_name: joi.string().min(2).max(50)
});

const validateRoleCreate = (req, res, next) => {
    const { error } = roleSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateRoleUpdate = (req, res, next) => {
    const { error } = updateRoleSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = { validateRoleCreate, validateRoleUpdate };