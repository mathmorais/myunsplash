const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  images: [
    {
      label: { type: String },
      url: { type: String },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
