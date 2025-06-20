const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { collection: "UserCollection" }
);

module.exports = mongoose.model("User", userSchema);
