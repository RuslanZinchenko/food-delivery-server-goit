const qs = require("querystring");
const fs = require("fs");
const path = require("path");

const signUpRoute = (request, response) => {
  if (request.method === "POST") {
    let body = "";

    request.on("data", function(data) {
      body += data;
    });

    request.on("end", function() {
      const userData = qs.parse(body);
      const { userName } = userData;
      console.log(userName);

      if (!fs.existsSync("./db/users")) {
        fs.mkdirSync("./db/users");
      }

      fs.writeFile(
        path.join(__dirname, "../../../db/users/", `${userName}.json`),
        body,
        err => {
          if (err) {
            console.log(err);
            return;
          }

          response.writeHead(200, { "Content-Type": "application/json" });
          response.write(JSON.stringify(body));
          response.end();
        }
      );
    });
  }
};

module.exports = signUpRoute;
