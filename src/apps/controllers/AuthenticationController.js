const User = require("../../models/User");
const Cart = require("../../models/Cart");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthenticationController {
  async register(req, res) {
    try {
      const { username, password, email,isAdmin } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        password: hashedPassword,
        email,
        isAdmin,
      });

      //create a cart for new user
      const cart = new Cart({ user_id: user._id });
      await cart.save();
      
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }

  async login(req, res) {
    try {
      const { password, email } = req.body;
      // Find the user associated with the email provided by the user
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      // Check if the password is correct
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }

      // Create a token
      const accessToken = jwt.sign(
        {
          user_id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );

      // // Include the accessToken inside the user object in the response
      const userWithToken = { ...user.toObject(), accessToken };

      // Password is correct, proceed with authentication
      res
        .status(200)
        .json({ user: userWithToken, message: "Authentication successful" });
    } catch (err) {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }
}

module.exports = new AuthenticationController();
