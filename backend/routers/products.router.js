const express = require("express");
const { Product } = require("../models/product.model");
const { extend } = require("lodash");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const products = await Product.find({});
      products.map((product) => (product.__v = undefined));
      res.json({ success: true, products });
    } catch (err) {
      console.log(err);
      res.status(404).json({ success: false, message: "Products Not Found" });
    }
  })
  .post(async (req, res) => {
    try {
      const product = req.body;
      const { url } = req.body;
      const dataInDb = await Product.findOne({ url });
      console.log(dataInDb);
      const NewProduct = new Product(product);
      const savedProduct = await NewProduct.save();
      res.json({ success: true, savedProduct });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ success: false, message: "Unable to add product" });
    }
  });

router.param("productId", async (req, res, next, productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    req.product = product;
    next();
  } catch (err) {
    res.status(400).json({ success: false, errMessage: err });
  }
});

router
  .route("/:productId")
  .get((req, res) => {
    const { product } = req;
    product.__v = undefined;
    res.json({ success: true, product });
  })
  .post((req, res) => {
    const updateProduct = req.body;
    let { product } = req;
    product = extend(product, updateProduct);
    product.save();
    product.__v = undefined;
    res.json({ success: true, product });
  });

module.exports = router;
