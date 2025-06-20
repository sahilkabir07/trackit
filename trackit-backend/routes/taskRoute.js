const express = require("express");
const router = express.Router();
const { createTask, getTasks } = require("../controllers/taskController");

const verifyToken = require("../middlewares/authMiddleware");
const cryptoMiddleware = require("../middlewares/cryptoMiddleware");

router.get("/", verifyToken, getTasks);
router.post("/", verifyToken, cryptoMiddleware, createTask);

module.exports = router;
