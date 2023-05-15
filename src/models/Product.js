const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, required: true,enum: ["in_stock", "out_of_stock","running_low"] },
  category: {type: Array},
  rating: { type: Number, required: true },
});

module.exports = mongoose.model("Product", Product);
