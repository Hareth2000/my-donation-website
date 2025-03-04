const { ContactMessage } = require("../models/contactMessages");

const { Users } = require("../models/users");

exports.saveContactMessage = async (req, res) => {
  try {
    const { user_id, name, email, message } = req.body;

    if (!user_id || !message) {
      return res
        .status(400)
        .json({ message: "User ID and message are required" });
    }

    const newMessage = await ContactMessage.create({
      user_id,
      name,
      email,
      message,
    });

    res.status(201).json({ message: "Message saved successfully", newMessage });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, phone, address } = req.body;

    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
