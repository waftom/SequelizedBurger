var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// To work on Heroku / Port to listen to
var port = process.env.PORT || 8080;
var app = express();

var db = require("./models");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Serve static content for the app from the "public" directory in the application directory.

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
app.use(express.static("./public"));

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

db.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log("App listening on port " + port);
  });
});
