const express = require("express");
const data = require("./data.js");
const User = require("../models/userModel.js");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { generateToken } = require("./utils.js");

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post("/signin", async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        idAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid email or password" });
});

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 8),
  });

  const createdUser = await user.save();

  res.send({
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    idAdmin: createdUser.isAdmin,
    token: generateToken(createdUser),
  });
});

module.exports = userRouter;
