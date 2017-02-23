// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // GET route for getting all of the posts
    app.get("/", function(req, res) {
        // Add sequelize code to find all posts, and return them to the user with res.json
        db.Burger.findAll({
            include: [db.Customer]
        }).then(function(result) {
            //return res.json(result);
            var hbsObject = {
                burgers: result
            };
            console.log(hbsObject);
            res.render("index", hbsObject);
        });
    });

    // POST route for saving a new post
    app.post("/api/burgers", function(req, res) {
        // Add sequelize code for creating a post using req.body,
        // then return the result using res.json
        var bg = req.body;
        db.Burger.create({
            burger_name: bg.burger_name,
            devoured: 0
        }).then(function(result) {
            //res.json(result);
            res.redirect("/");
        });
    });

    // PUT route for updating posts
    app.put("/api/burgers", function(req, res) {
        // Add code here to update a post using the values in req.body, where the id is equal to
        // req.body.id and return the result to the user using res.json
        var bg = req.body;
        db.Customer.create({
            customer_name: bg.customer_name
        }).then(function(result) {
            db.Burger.update({
                devoured: 1,
                CustomerId: result.id
            }, {
                where: {
                    id: bg.id
                }
            }).then(function(result) {
                res.redirect("/");
            });
        });
    });
};
