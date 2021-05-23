const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: Number,
  },
  {
    timestamp: true,
  }
);

const Cart = mongoose.model("CartItem", cartSchema);

module.exports = { Cart };
