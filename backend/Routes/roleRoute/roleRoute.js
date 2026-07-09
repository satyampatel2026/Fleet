const express = require("express");
const roleRouter = express.Router();
const { getRole, postRole, updateRole, deleteRole } = require("../../controllers/roleController/roleController");
const { validateRoleCreate, validateRoleUpdate } = require("../../controllers/roleController/roleValidation");

roleRouter.get("/", getRole);
roleRouter.post("/", validateRoleCreate, postRole);
roleRouter.put("/:id", validateRoleUpdate, updateRole);
roleRouter.delete("/:id", deleteRole);

module.exports= roleRouter;