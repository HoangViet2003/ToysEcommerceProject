const User = require("../../models/User");

class UserController {
  //[GET] /api/user
  // index(req, res, next) {
  //     User.find({})
  //     .then((users) => res.json(users))
  //     .catch(next);
  // }

  // //[POST] /api/user
  // store(req, res, next) {
  //     const user = new User(req.body);
  //     user
  //     .save()
  //     .then(() => res.json(user))
  //     .catch(next);
  // }

  //[DELETE] /api/user/:id
  delete(req, res, next) {
    try {
      User.deleteOne({ _id: req.params.id });
      res.json({ message: "Delete successfully" });
    } catch (err) {
      console.log(err);
    }
  }

  
}

module.exports = new UserController();
