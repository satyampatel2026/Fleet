const express= require('express');
const adminDashboardRouter= express.Router();
const {getDashboard}= require('../../controllers/adminDashboardController/adminDashboardController');

adminDashboardRouter.get('/', getDashboard);

module.exports= adminDashboardRouter;