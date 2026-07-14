const express= require("express");
const userRouter=express.Router();
const {
  getUsers,
  getUserById,
  getRoles,
  postUser,
  updateUser,
  deleteUser,
  restoreUser,
} = require('../../controllers/userController/userController');
const { validateUserCreate, validateUserUpdate } = require('../../controllers/userController/userValidation');
const {
  verifyToken,
  adminOnly,
} = require("../../middlware/adminAuthMiddleware");
userRouter.use(verifyToken);
userRouter.use(adminOnly);

userRouter.get("/roles", getRoles);

// All users
userRouter.get("/", getUsers);

// Single user
userRouter.get("/:id", getUserById);

// Create user
userRouter.post("/",validateUserCreate, postUser);

// Update user and role
userRouter.patch("/:id", validateUserUpdate,updateUser);

// Soft delete
userRouter.delete("/:id", deleteUser);

// Restore inactive user
userRouter.patch("/:id/restore", restoreUser);


module.exports= userRouter;

