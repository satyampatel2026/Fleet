const joi = require('joi');

const createServiceCategorySchema = joi.object({
    category_name: joi.string().min(3).max(100).required(),
     description: joi.string().max(255).allow('', null),
    status: joi.string().valid('ACTIVE', 'INACTIVE').optional(),
    created_by: joi.number().integer().required().optional()});

const updateServiceCategorySchema = joi.object({
    category_name: joi.string().min(3).max(100),
    description: joi.string().max(255).allow('', null),
    status: joi.string().valid('ACTIVE', 'INACTIVE'),
    created_by: joi.number().integer()}).min(1); // At least one field is required

    const validateServiceCategoryCreate = (req, res, next) => {

    const { error } = createServiceCategorySchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }

    next();
};

const validateServiceCategoryUpdate = (req, res, next) => {

    const { error } = updateServiceCategorySchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }

    next();
};

module.exports = { validateServiceCategoryCreate, validateServiceCategoryUpdate };