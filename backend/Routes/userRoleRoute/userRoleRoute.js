const express= require("express");
const userRoleRouter=express.Router();
const { getUserRole, postUserRole, updateUserRole, deleteUserRole }= require('../../controllers/userRoleController/userRoleController');

userRoleRouter.get('/', getUserRole);
userRoleRouter.post("/assign", postUserRole);
userRoleRouter.put("/:user_id/:role_id", updateUserRole);
userRoleRouter.delete("/:user_id/:role_id", deleteUserRole);

module.exports= userRoleRouter;