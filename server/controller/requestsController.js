const { Requests } = require("../models/requests");


const getRequests = async (req, res) => {
    try {
        const requests = await Requests.findAll({
            attributes: ["organizationName", "toolName", "medicalEquipment","status" ,"id"],
            order: [["createdAt", "DESC"]],

        });

        res.json(requests);
    } catch (error) {
        console.error("Error fetching donation requests:", error);
        res.status(500).json({ message: "Error retrieving data" });
    }
};

module.exports = { getRequests };