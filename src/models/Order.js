//write a function so filter order according time stamp

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema(
  {
    user_id: { type: String, required: true },
    products: [
      {
        product_id: { type: String, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    total: { type: Number, required: true },
    is_confirmed: { type: Boolean, default: false },
  },
  { timestamps: true }

);

module.exports = mongoose.model("Order", Order);
