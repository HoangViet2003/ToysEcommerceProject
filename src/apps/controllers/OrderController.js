const Order = require("../../models/Order");
const Product = require("../../models/Product");
const Cart = require("../../models/Cart");
const User = require("../../models/User");

class OrderController {
  //get all order
  async index(req, res, next) {
    try {
      const orders = await Order.find();
      //return username to order
      // const user_id = orders.map((item) => item.user_id);
      // const users = await User.find({ _id: { $in: user_id } });
      // orders.forEach((item) => {
      //   const user = users.find((user) => user._id = item.user_id);
      //   item.user_name = user.name;
      // });

      // await order.save();

      res.status(200).json({orders});
    } catch (err) {
      res.status(404).json({ error: "Order not found" });
    }
  }

  //create order an update quantity of product
  async store(req, res, next) {
    try {
      const { user_id } = req.user;
      const { total } = req.body;
      // check if user has cart
      const cart = await Cart.findOne({ user_id: req.user.user_id });
      if (!cart) return res.status(404).json({ error: "Cannot find cart" });
      //add products in cart to order
      const order = new Order();
      order.user_id = user_id;
      //push all product in cart to order
      cart.products.forEach((item) => {
        order.products.push(item);
      });
      order.total = total;

      //find product and update quantity
      cart.products.forEach((item) => {
        const product = Product.findOne({ _id: item.product_id });
        if (product.quantity < item.quantity)
          return res.status(404).json({ error: "Cannot add order" });
        product.quantity = product.quantity - item.quantity;
        product.save();
      });

      cart.products = [];

      await cart.save();
      await order.save();
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
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

  //search order by date
  async searchOrderByDate(req, res, next) {
    try {
      const { user_id } = req.user;

      //find date by time stamp
      const date = new Date(req.params.date);

      const order = await Order.find({ user_id: user_id, date: date });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }

  // getOrderByTime = async (req, res) => {
  //   try {
  //     const { startTime } = req.query;

  //     // Parse the start and end timestamps
  //     const start = new Date(startTime);

  //      const startTimestamp = new Date(
  //        start.getFullYear(),
  //       start.getMonth(),
  //        start.getDate()
  //      );

  //     // Query orders based on the timestamp range
  //     const orders = await Order.find({
  //       createdAt: { $gte: startTimestamp },
  //     });

  //     res.status(200).json({ orders });
  //   } catch (error) {
  //     console.error("Error filtering orders:", error);
  //     res.status(500).json({ error: "Error filtering orders" });
  //   }
  // };

//  getOrdersBytime = async (req, res) => {
//   try {
//     const { date } = req.query;

//     // Convert the input date string to a JavaScript Date object
//     const filterDate = new Date(date);

//     // Set the start and end timestamps for the given date
//     const startTimestamp = new Date(filterDate.getFullYear(), filterDate.getMonth(), filterDate.getDate());
//     // const endTimestamp = new Date(filterDate.getFullYear(), filterDate.getMonth(), filterDate.getDate() + 1);

//     // Find orders that fall within the specified date range
//     const orders = await Order.find({
//       createdAt: { $gte: startTimestamp}
//     });

//     res.status(200).json(orders);
//   } catch (error) {
//     console.error('Error filtering orders:', error);
//     res.status(500).json({ error: 'An error occurred while filtering orders' });
//   }
// };
 getOrderByTime = async (req, res) => {
  try {
    const { date } = req.query;

    // Convert the input date string to a JavaScript Date object
    const filterDate = new Date(date);

    // Set the start and end timestamps for the given date
    const startTimestamp = new Date(filterDate.getFullYear(), filterDate.getMonth(), filterDate.getDate());
    const endTimestamp = new Date(filterDate.getFullYear(), filterDate.getMonth(), filterDate.getDate() + 1);

    // Find orders that fall within the specified date range
    const orders = await Order.find({
      createdAt: { $gte: startTimestamp, $lt: endTimestamp },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error filtering orders:', error);
    res.status(500).json({ error: 'An error occurred while filtering orders' });
  }
};


async searchOrder(req, res, next) {
  try{
    const {keyword} = req.body;
    //find order by user_id
    const order = await Order.find({ user_id: keyword });
    res.status(200).json(order);
  }catch(err){
    res.status(500).json({ error: "Server error" });
  }
};

}
// Function to filter orders by timestamp

module.exports = new OrderController();
