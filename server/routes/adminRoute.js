const express = require("express");
const adminRoute = express.Router();
const { adminLogin, adminLogout, getAllRequests, updateRequestStatus } = require("../controller/adminAuth");
const isAdmin = require("../middlewares/adminMiddleware");
const { getDonations } = require("../controller/donationController");


// Admin-only routes
adminRoute.get("/", isAdmin, getAllRequests);
adminRoute.get("/donation", isAdmin, getDonations );
adminRoute.put("/:id/status", isAdmin, updateRequestStatus);

module.exports = adminRoute;