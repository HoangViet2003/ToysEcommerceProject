const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

class CartController {
  //get cart by user id
  async show(req, res, next) {
    try {
      const cart = await Cart.findOne({ user_id: req.params.user_id });
      res.status(200).json(cart);
    } catch (err) {
      res.status(404).json({ error: "Cart not found" });
    }
  }

  //create cart
  async store(req, res, next) {
    try {
      const cart = new Cart(req.body);

      //find product by id
      await cart.save();
      res.status(200).json(cart);
    } catch (err) {
      res.status(400).json({ error: "You need to fill correct information" });
    }
  }

  //update cart
  async update(req, res, next) {
    try {
      const cart = await Cart.findOne({ user_id: req.params.user_id });
      cart.products = req.body.products;
      await cart.save();
      res.status(200).json(cart);
    } catch (err) {
      res.status(400).json({ error: "You need to fill correct information" });
    }
  }

  //remove product from cart
  async delete(req, res, next) {
    try {
      const {user_id} = req.user
      console.log(user_id)
      const cart = await Cart.findOne({ user_id: user_id});

      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
      cart.products = cart.products.filter((item) => {
        return item.product_id !== req.params.product_id;
      });

      //  cart.products = cart.products.findOneAndDelete({product_id:req.body.product_id});

      // const { user_id } = req.params.user_id;
      // const { product_id } = req.body.product_id;

      // const result = await Cart.findOneAndDelete(
      //   { user_id: user_id },
      //   { $pull: { products: {  product_id } } },{
      //     new: true,
      //   }
      // );
      // if (!result) {
      //   return res
      //     .status(404)
      //     .json({ message: "Product not found in the cart" });
      // }

      await cart.save();
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({ error: "server error" });
    }
  }

  //add product to cart
  async addToCart(req, res, next) {
    try {
      const { user_id } = req.user;
      const { product_id } = req.body;
      const { quantity } = req.body;

      // Find the cart by cartId
      const cart = await Cart.findOne({ user_id: user_id });

      // Check if the cart exists
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      // Check if the product already exists in the cart
      const existingProduct = cart.products.find(
        (product) => product.product_id === product_id
      );

      if (existingProduct) {
        //   // If the product exists, update the quantity
        existingProduct.quantity += quantity;
      } else {
        //   // If the product doesn't exist, add it to the products array
        cart.products.push({ product_id: product_id, quantity });
      }

      // Add the cart item to the cart's items array
      // cart.products.push({
      //   product_id: product_id,
      //   quantity: quantity, // Set the quantity as desired
      // });

      // Save the updated cart
      await cart.save();

      res.status(200).json({ message: "Product added to cart" });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async updateQuantity(req, res, next) {
    try {
      const { user_id } = req.user;
      const { product_id } = req.params;
      const { quantity } = req.body;

      // Find the cart by cartId
      const cart = await Cart.findOne({ user_id: user_id });

      // Check if the cart exists
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      // Check if the product already exists in the cart
      const existingProduct = cart.products.find(
        (product) => product.product_id === product_id
      );

      if (existingProduct) {
        // If the product exists, update the quantity
        existingProduct.quantity = quantity;
      } else {
        // If the product doesn't exist, add it to the products array
        cart.products.push({ product_id: product_id, quantity });
      }

      // Save the updated cart
      await cart.save();

      res.status(200).json(cart);
    } catch (err) {
      console.log(error);
    }
  }

  async index(req, res, next) {
    try {
      const { user_id } = req.user;

      // Find the cart by user_id
      const cart = await Cart.findOne({ user_id: user_id });

      // If the cart doesn't exist, return an empty response or an appropriate message
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // Get the product IDs from the cart
      const productIds = cart.products.map((product) => product.product_id);

      // Fetch the product details based on the product IDs
      const products = await Product.find(
        { _id: { $in: productIds } },
        "name images price" // Only return the name, images and price fields
      );

      let totalAmount = 0;
      // Map the product details to the products in the cart
      const cartItems = cart.products.map((product) => {
        const productDetails = products.find(
          (p) => p._id.toString() === product.product_id.toString()
        );
        const itemTotal = product.quantity * productDetails.price;
        totalAmount += itemTotal;
        return {
          product_id: product.product_id,
          quantity: product.quantity,
          name: productDetails.name,
          images: productDetails.images,
          price: productDetails.price,
        };
      });

      res.status(200).json({ cartItems, totalAmount });
    } catch (err) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the cart" });
    }
  }

  async deleteAllProductFromCart(req, res, next) {
    try {
      const cart = await Cart.findOne({ user_id: req.user.user_id });

      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
      cart.products = [];
      await cart.save();
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({ error: "server error" });
    }
  }
}

module.exports = new CartController();
