const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const cryptoMiddleware = require("./middlewares/cryptoMiddleware");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

connectDB();

app.use("/api/auth", cryptoMiddleware, require("./routes/authRoutes"));
app.use("/api/user", cryptoMiddleware, require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoute")); // ❌ no crypto/verify here

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
