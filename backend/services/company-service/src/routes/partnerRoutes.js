const express = require("express");
const router = express.Router();



const {
    getPartners,
    postPartner,
    deletePartner,
    updatePartner
} = require("../controllers/partnerController");


const partnerValidation = require("../middleware/partnerValidation");


// Get all partners
router.get("/", getPartners);


// Add new partner  
router.post("/", partnerValidation, postPartner);


// Update partner
router.patch("/:id", partnerValidation, updatePartner);


// Delete partner
router.delete("/:id", deletePartner);



module.exports = router;