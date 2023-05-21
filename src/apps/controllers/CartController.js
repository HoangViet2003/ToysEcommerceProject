const Cart = require("../../models/Cart");

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
            const cart = await Cart.findOne({ user_id: req.params.user_id });
            cart.products = cart.products.filter((item) => {
                return item._id != req.params.product_id;
            });
            await cart.save();
            res.status(200).json(cart);
        } catch (err) {
            res.status(404).json({ error: "Product not found" });
        }
    }
}

module.exports = new CartController();