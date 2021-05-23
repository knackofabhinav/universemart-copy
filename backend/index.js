const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const { initializeDBConnection } = require("./db/db.connect");
const products = require("./routers/products.router");
const user = require("./routers/user.router");
const cart = require("./routers/cart.router");
const wishlist = require("./routers/wishlist.router");
app.use(express.json());
app.use(cors());

initializeDBConnection();

app.use("/", user);
app.use("/products", products);
app.use("/cart", cart);
app.use("/wishlist", wishlist);

//  404 Route Handler
app.use((req, res) => {
  res.status(404).json({ success: false });
});

/**
 * Error Handler
 * Don't move
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "error occured, see the errMessage key for more details",
    errorMessage: err.message,
  });
});

app.listen(port, () => {
  console.log(`Express App is Listening at http://localhost:${port}`);
});
