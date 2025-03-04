const { Users } = require("../models/users"); 
const { Requests } = require("../models/requests"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Users.findOne({ where: { email, user_type: "admin" } });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: admin.user_id,
        email: admin.email,
        name: admin.name,
        user_type: admin.user_type,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600 * 1000,
    });

    return res.status(200).json({
      message: "Admin login successful",
      userId: admin.user_id,
      user_type: admin.user_type,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error logging in as admin" });
  }
};


const adminLogout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.json({ message: "Admin logged out successfully" });
};


const getAllRequests = async (req, res) => {
    try {
      const requests = await Requests.findAll(); 
      res.status(200).json(requests); 
    } catch (error) {
      console.error("Error fetching requests:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
  
  const updateRequestStatus = async (req, res) => {
    const { id } = req.params; 
    const { status } = req.body; 
  
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
  
    try {
      
      const request = await Requests.findByPk(id);
  
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
  
      request.status = status;
      await request.save(); 

      res.status(200).json({ message: "Request status updated successfully", request });
    } catch (error) {
      console.error("Error updating request status:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };

module.exports = {
  adminLogin,
  adminLogout,
  getAllRequests,
  updateRequestStatus,
};