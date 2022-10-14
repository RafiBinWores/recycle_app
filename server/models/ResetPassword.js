const mongoose = require("mongoose");

const ResetPasswordSchema = new mongoose.Schema({
  userId: String,
  resetString: String,
  createdAt: Date,
  expiresAt: Date,
});

module.exports =  mongoose.model("Resetpassword", ResetPasswordSchema);