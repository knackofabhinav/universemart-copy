const { Router } = require("express");
const router = Router();
const { User } = require("../models/user.model.js");
const { Product } = require("../models/product.model.js");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const { userid } = req.headers;
      const user = await User.findById(userid).populate("wishlist");
      if (!user.wishlist) {
        res
          .status(404)
          .json({ success: false, message: "your wishlist is empty" });
      }
      res.json({ success: true, wishlist: user.wishlist });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, errMessage: err });
    }
  })
  .post(async (req, res) => {
    try {
      const { userId, productId } = req.body;
      const user = await User.findById(userId);
      const productFoundInWishlist = user.wishlist.find(
        (product) => product == productId
      );
      if (!productFoundInWishlist) {
        user.wishlist.push(productId);
        user.save();
        console.log(user.wishlist);
        return res.json({ success: true, wishlist: user.wishlist });
      }
      res.json({ success: false, message: "product already exists" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, errMessage: err });
    }
  });

router.route("/:userId/:productId").delete(async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const user = await User.findById(userId);
    const productFoundInWishlist = user.wishlist.find(
      (product) => product._id == productId
    );
    await user.wishlist.remove({ _id: productFoundInWishlist });
    user.save();
    res.json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, errMessage: err });
  }
});

module.exports = router;
