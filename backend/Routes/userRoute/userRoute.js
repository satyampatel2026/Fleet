const express= require("express");
const userRouter=express.Router();
const { getUser, getPartner, postPartner, updatePartner, deletePartner, getFleetOwners, postFleetOwner,updateFleetOwner, deleteFleetOwner, postUser, updateUser, deleteUser }= require('../../controllers/userController/userController');
const { validateUserCreate, validateUserUpdate } = require('../../controllers/userController/userValidation');

userRouter.get('/users', getUser);
userRouter.get('/partners', getPartner);
userRouter.post('/partners', postPartner);
userRouter.patch('/partners/:id', updatePartner);
userRouter.delete('/partners/:id', deletePartner);
userRouter.get('/fleetowners', getFleetOwners);
userRouter.post('/fleetowners', postFleetOwner);
userRouter.patch('/fleetowners/:id', updateFleetOwner);
userRouter.delete('/fleetowners/:id', deleteFleetOwner);
userRouter.post("/users", validateUserCreate, postUser);
userRouter.put("/users/:id", validateUserUpdate, updateUser);
userRouter.delete("/users/:id", deleteUser);

module.exports= userRouter;

