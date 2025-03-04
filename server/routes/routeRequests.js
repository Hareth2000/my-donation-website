const express = require("express");
const multer = require("multer");
const { Requests } = require("../models/requests");
// const { getRequestById } = require("../controller/detailsController");
const { getRequests } = require("../controller/requestsController");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/donations", getRequests);

router.post(
  "/submit",
  upload.fields([{ name: "medicalEquipment" }, { name: "proofDocument" }]),
  async (req, res) => {
    try {
      if (!req.body.user_id) {
        return res.status(400).json({ error: "user_id is required" });
      }
      const newRequest = await Requests.create({
        user_id: parseInt(req.body.user_id, 10),
        organizationName: req.body.organizationName, // ensure field names match
        organizationAddress: req.body.organizationAddress,
        phone: req.body.phone,
        email: req.body.email,
        toolName: req.body.toolName, // ensure field names match
        medicalEquipment: req.files["medicalEquipment"]
          ? req.files["medicalEquipment"][0].path
          : null,
        quantity: parseInt(req.body.quantity),
        proofDocument: req.files["proofDocument"]
          ? req.files["proofDocument"][0].path
          : null,
        hasFundraisingLicense: req.body.hasFundraisingLicense === "yes",
        agreement: req.body.agreement === "true",
        status: "pending",
        description: req.body.description,
        estimatedCost: parseFloat(req.body.estimatedCost),
        amount_raised: parseFloat(req.body.amount_raised) || 0,
      });

      res.status(201).json({
        message: "Request submitted successfully",
        request: newRequest,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;