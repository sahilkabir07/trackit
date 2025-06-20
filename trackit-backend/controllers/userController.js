const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("_id email");
    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};
