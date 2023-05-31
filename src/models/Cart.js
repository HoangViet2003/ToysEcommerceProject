const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = new Schema(
  {
    user_id: { type: String },
    products: [
      {
        product_id: { type: String, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", Cart);
