const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: "User Already Exists. Please Login",
    },
    password: { type: String, required: true },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        unique: "Product already exists",
      },
    ],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartItem" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
