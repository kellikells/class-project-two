var db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");

module.exports = function(app) {
  // Load index page
  /*  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });
  */
  app.get("/", function(req, res) {
    res.render("index", {});
  });

  app.get("/signup", function(req, res) {
    res.render("signup", {});
  });

  //signin
  app.get("/signin", function(req, res) {
    res.render("signin", {});
  });

  app.get("/service", function(req, res) {
    res.render("service", {});
  });

  app.get("/services", function(req, res) {
    db.Service.findAll({}).then(function(data) {
      const hbData = data.map(function(data) {
        return data.dataValues;
      });
      // res.json(dbData);
      res.render("services", { services: hbData });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
