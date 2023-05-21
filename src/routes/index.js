const siteRouter = require("./site");
const authRouter = require("./auth");
const userRouter = require("./user");
const productRouter = require("./product");
const cartRouter = require("./cart");


function route(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/cart", cartRouter);
  // app.use("/", siteRouter);
}

module.exports = route;
