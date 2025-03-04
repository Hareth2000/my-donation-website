const  Payment  = require("../models/payment");

const getDonations = async (req, res) => {
    try {
        const donations = await Payment.findAll(); 
        res.status(200).json(donations); 
    } catch (error) {
        console.error("Error fetching donations:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = {
    getDonations,
};