const express= require("express");
const serviceCategoryRouter=express.Router();
const { getServiceCategory, postServiceCategory, updateServiceCategory, deleteServiceCategory }= require('../../controllers/serviceCategoryController/serviceCategoryController');
const { validateServiceCategoryCreate, validateServiceCategoryUpdate } = require('../../controllers/serviceCategoryController/serviceCategoryValidation');

serviceCategoryRouter.get('/servicecategory', getServiceCategory);
serviceCategoryRouter.post('/servicecategory', validateServiceCategoryCreate, postServiceCategory);
serviceCategoryRouter.patch('/servicecategory/:id', validateServiceCategoryUpdate, updateServiceCategory);
serviceCategoryRouter.delete('/servicecategory/:id', deleteServiceCategory);

module.exports= serviceCategoryRouter;

