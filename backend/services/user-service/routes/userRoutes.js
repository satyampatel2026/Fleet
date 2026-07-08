const express = require("express");
const router = express.Router();



const {
    getUsers,
    postUser,
    deleteUser,
    updateUser
} = require("../controller/userController");


const userValidation = require("../middleware/userValidation");


// Get all partners
router.get("/", getUsers);


// Add new partner
router.post("/", userValidation, postUser);


// Update partner
router.patch("/:id", userValidation, updateUser);


// Delete partner
router.delete("/:id", deleteUser);



module.exports = router;