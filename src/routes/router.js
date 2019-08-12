const mainRoute = require("./main/main");
const products = require("./products/products");
const signUpRoute = require("./users/sign-up-route");

const router = {
  "/products": products,
  "/signup": signUpRoute,
  default: mainRoute
};

module.exports = router;
