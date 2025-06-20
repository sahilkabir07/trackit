const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const User = require("../models/User");

router.get("/all", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can fetch users" });
    }

    const users = await User.find({ role: "user" }).select("_id email");
    res.json({ users });
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({ message: "Server error fetching users" });
  }
});

module.exports = router;
