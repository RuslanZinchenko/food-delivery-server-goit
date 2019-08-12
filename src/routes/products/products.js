const path = require("path");
const fs = require("fs");

const mainRoute = (req, res) => {
  const menu = path.join(__dirname, "../../../db/products/all-products.json");

  fs.readFile(menu, "utf-8", function(err, data) {
    if (err) throw err;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(data);
    res.end();
  });
};

module.exports = mainRoute;
