const Task = require("../models/Task");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.createTask = async (req, res) => {
  try {
    console.log("⚙️ [createTask] Start");

    console.log("👤 req.user:", req.user);
    if (req.user.role !== "admin") {
      console.log("🚫 User is not admin");
      return res.status(403).json({ message: "Only admin can create tasks" });
    }

    const { title, description, dueDate, status, assignedTo } = req.body;

    console.log("📩 Incoming Task Payload:", {
      title,
      description,
      dueDate,
      status,
      assignedTo,
    });

    if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
      console.log("❌ assignedTo is not a valid ObjectId:", assignedTo);
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const assignedUser = await User.findById(assignedTo);
    console.log("🔍 Lookup Assigned User:", assignedUser);

    if (!assignedUser) {
      console.log("❌ User not found in DB:", assignedTo);
      return res.status(404).json({ message: "Assigned user not found" });
    }

    const newTask = new Task({
      title,
      description,
      dueDate,
      status,
      createdBy: req.user.id,
      assignedTo,
    });

    await newTask.save();
    console.log("✅ Task saved:", newTask);

    res.json({ message: "Task created", task: newTask });
  } catch (error) {
    console.error("❌ Server Error in createTask:", error);
    res.status(500).json({ message: "Server error creating task" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    console.log("⚙️ [getTasks] Start");
    console.log("👤 req.user:", req.user);

    let tasks;
    if (req.user.role === "admin") {
      tasks = await Task.find();
    } else {
      tasks = await Task.find({ assignedTo: req.user.id });
    }

    console.log(`📊 Found ${tasks.length} tasks`);
    tasks.forEach((task, index) => {
      console.log(`📌 Task ${index + 1}:`, task);
    });

    res.json({ tasks });
  } catch (err) {
    console.error("❌ Server Error in getTasks:", err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};
