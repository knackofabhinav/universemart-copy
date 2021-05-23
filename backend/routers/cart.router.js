const { Router } = require("express");
const { User } = require("../models/user.model.js");
const { Cart } = require("../models/cart.model.js");
const { Product } = require("../models/product.model.js");
const router = Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const { userid } = req.headers;
      const { cart } = await User.findById(userid).populate({
        path: "cart",
        populate: {
          path: "product",
        },
      });
      if (!cart) {
        res.status(404).json({ success: false, message: "your cart is empty" });
      }
      res.json({ success: true, cart });
    } catch (err) {
      res.status(500).json({ success: false, errMessage: err });
    }
  })
  .post(async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
      const user = await User.findById(userId).populate({
        path: "cart",
      });
      const foundProductInCart = user.cart.find(
        (cartItem) => cartItem.product == productId
      );
      if (!foundProductInCart) {
        const newCartItem = new Cart({ product: productId, quantity: 1 });
        await newCartItem.save();
        user.cart.push(newCartItem._id);
        await user.save();
        const updatedUser = await User.findById(userId).populate({
          path: "cart",
        });
        return res.json({ success: true, cart: updatedUser.cart });
      }
      const userCart = await Cart.findById(foundProductInCart._id);
      userCart.quantity = quantity;
      userCart.save();
      const updatedUser = await User.findById(userId).populate({
        path: "cart",
      });
      res.json({
        success: true,
        cart: updatedUser.cart,
        message: "product quantity updated as per header req",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, errMessage: err });
    }
  });
router.route("/:userId/:cartId").delete(async (req, res) => {
  try {
    const { userId, cartId } = req.params;
    const user = await User.findById(userId).populate("cart");
    const cartFound = user.cart.find((cart) => cart._id == cartId);
    await user.cart.remove({ _id: cartFound });
    user.save();
    console.log(user.cart);
    res.json({ success: true, cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, errMessage: err });
  }
});

module.exports = router;
