var db = require("../models");
const bcrypt = require("bcrypt");
//const jwt = require("jwt-simple");

module.exports = function(app) {
  // route for GETTER to place a bid on a service

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/editservice", function(req, res) {
    console.log(req.body);
    db.Service.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbData) {
      res.json(dbData);
    });
  });

  // Create a new example
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
  //Delete a Service
  app.delete("/api/deleteService/:id", function(req, res) {
    console.log(req.params.id);
    db.Service.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => {
      return res.json(true);
    });
  });

  //Create a new Bid
  app.post("/api/newBid", function(req, res, next) {
    db.Bid.create(req.body)
      .then(() => {
        return res.send(true);
      })
      .catch(() => {
        return next({
          status: 503,
          message: "Error creating bid"
        });
      });
  });

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
