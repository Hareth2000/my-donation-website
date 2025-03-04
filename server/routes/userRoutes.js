

const express = require("express");
 const { saveContactMessage } = require("../controller/userController");

const { getUserProfile, updateUserProfile } = require("../controller/userController");

const router = express.Router();

router.get("/profile/:userId", getUserProfile);

router.put("/profile/:userId", updateUserProfile);

 router.post("/contact", saveContactMessage);


module.exports = router;
