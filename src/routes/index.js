const siteRouter = require("./site");
const authRouter = require("./auth");
const userRouter = require("./user");


function route(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/user", userRouter);
  // app.use("/", siteRouter);
}

module.exports = route;
