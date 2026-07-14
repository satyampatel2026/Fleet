const express= require("express");

const {adminLogin, forgotPassword, resetPassword}= require('../../controllers/adminAuthController/adminAuthController');
// const adminAuthMiddleware= require('../../middlware/adminAuthMiddleware');

const adminauthrouter = express.Router();

adminauthrouter.post("/admin/forgotpassword", forgotPassword);
adminauthrouter.post("/admin/login", adminLogin);
adminauthrouter.post("/admin/reset-password/:token", resetPassword);

module.exports = adminauthrouter;