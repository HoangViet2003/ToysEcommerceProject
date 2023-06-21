const Order = require("../../models/Order");
const Product = require("../../models/Product");
const Cart = require("../../models/Cart");

class OrderController {
  //get all order
  async index(req, res, next) {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(404).json({ error: "Order not found" });
    }
  }

  //create order an update quantity of product
  async store(req, res, next) {
    try {
      const { user_id } = req.user;
      const { total } = req.body;
      // const {product_id,quantity} = req.body
      // check if user has cart
      const cart = await Cart.findOne({ user_id: user_id });
      if (!cart) return res.status(404).json({ error: "Cannot add order" });
      //add products in cart to order
      const order = new Order();
      order.user_id = user_id;
    //   order.products = cart.products;
        //push all product in cart to order
        cart.products.forEach((item) => {
            order.products.push(item);
        })
      order.total = total;

      //find product and update quantity
      cart.products.forEach(async (item) => {
        const product = await Product.findOne({ _id: item.product_id });
        if (product.quantity < item.quantity)
          return res.status(404).json({ error: "Cannot add order" });
        product.quantity = product.quantity - item.quantity;
        await product.save();
      });

      if(order){
        //empty cart
        cart.products = [];
      }

      // const order = new Order();
      // order.user_id = user_id;
      // // add to products array
      // order.products = [{product_id,quantity}];

      // const product = await Product.findOne({ _id: product_id });
      // if(product.quantity < req.body.quantity) return res.status(404).json({ error: "Cannot add order" })
      // product.quantity = product.quantity - req.body.quantity;
      // const price = product.price;
      // order.total = price * req.body.quantity;

      await order.save();
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json({ error: "You need to fill correct information" });
    }
  }

  //confirm order
  async confirmOrder(req, res, next) {
    try {
      const order = await Order.findOne({ _id: req.params.id });
      order.is_confirmed = true;
      await order.save();
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }

  //get order by user_id
  async show(req, res, next) {
    try {
      const { user_id } = req.user;
      const order = await Order.find({ user_id: user_id });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
}

module.exports = new OrderController();
