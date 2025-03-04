const { Requests } = require("../models/requests");

// Controller to get request details by ID
const getRequestById = async (req, res) => {
    const { id } = req.params;
    try {
        const request = await Requests.findOne({ where: { id } });

        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        res.json(request);
        console.log("woooooooooooooooooooorkkkkk:"+ request);
    } catch (error) {
        console.error("Error fetching request:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getRequestById };