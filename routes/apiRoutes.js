var db = require("../models");
const bcrypt = require("bcrypt");
//const jwt = require("jwt-simple");

module.exports = function(app) {
  // Get all examples
  /*app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });*/
  /*
  const checkJwt = (req, res, next) => {
    try {
      var decoded = jwt.decode(req.token, process.env.JWT_SECRET);
    } catch (error) {
      return next({
        status: 401,
        message: "Unauthorized"
      });
    }
    req.user = decoded;
    next();
  };*/
  // Create a new user api/newuser
  app.post("/api/newuser", function(req, res, next) {
    db.User.create(req.body)
      .then(() => {
        return res.send(true);
      })
      .catch(() => {
        return next({
          status: 503,
          message: "Error creating user"
        });
      });
  });
  //Create a new user api/newuser
  app.post("/api/newservice", function(req, res) {
    console.log(req.body);

    db.Service.create(req.body).then(function(data) {
      res.json(data);
    });
  });

  app.post("/api/signin", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(406).send("Missing email or password.");
    }

    // Check to see if the user exists
    db.User.findOne({
      where: {
        email
      }
    }).then(user => {
      // If no user, return 406 error
      if (!user) {
        return res.status(406).send("User not found.");
      }

      // Compare hashed, attempted PW with PW in database
      bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
          console.log(err);

          return res.status(500).send("Service unavailable");
        }

        // If no match, return 401 error
        if (!result) {
          return res.status(401).send("Unauthorized");
        }

        // If match, generate JWT
        return res.json(user);
        //return res.send({
        /* token: jwt.encode(
            { userId: user.id },
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzQHRlc3QuY29tIiwicGFzc3dvcmQiOiJhZG1pbiJ9.flou7bD7EGalOMFGDnJ8i21cSRbZYai_oqoUCauxCZo")
        });*/
      });
    });
  });
};
