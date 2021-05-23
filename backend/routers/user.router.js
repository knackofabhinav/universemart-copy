const { Router } = require("express");
const { User } = require("../models/user.model.js");
const router = Router();

router.route("/signup").post(async (req, res) => {
  try {
    const { username, password } = req.body;
    const NewUser = new User({ username, password });
    const savedUser = await NewUser.save();
    res.json({ success: true, savedUser });
  } catch (err) {
    console.log(err);
    res.status(409).json({ success: false, errMessage: err });
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).populate({
      path: "cart",
    });
    const userResponse = {
      userId: user._id,
      username: user.username,
      cart: user.cart,
      wishlist: user.wishlist,
    };
    if (user.password !== password) {
      return res.json({ success: false, message: "Wrong id or password" });
    }
    res.json({ success: true, user: userResponse });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "No user exists with the given credentials",
    });
  }
});

module.exports = router;
