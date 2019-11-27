// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");
var passport = require("../config/passport.js");
var moment = require("moment");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

// Routes
// =============================================================
module.exports = function(app) {
  //Get route for retrieving the test question info
  app.get("/api/testquestions/:testId", function(req, res) {
    db.TestQuestion.findAll({
      where: {
        TestListId: req.params.testId
      }
    }).then(function(dbTestQuestions) {
      res.json(dbTestQuestions);
    });
  });

  // Get route for returning posts of a specific category
  app.get("/api/posts/category/:category", function(req, res) {
    db.Post.findAll({
      where: {
        TestListId: req.params.testId
      },
      include: [db.TestList]
    }).then(function(dbTestQuestions) {
      res.json(dbTestQuestions);
    });
  });

  app.get("/api/testList/", function(req, res) {
    db.TestList.findAll({}).then(function(dbTestList) {
      res.json(dbTestList);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/shiftRecord/:id", function(req, res) {
    db.EVVRecord.findOne({
      where: {
        ClientId: req.params.id,
        shiftDate: {
          [Op.gte]: moment().subtract(12, "hours"),
          [Op.lte]: moment().add(12, "hours")
        }
      }
    }).then(function(dbShift) {
      res.json(dbShift);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/testRecord/:userId/:testId", function(req, res) {
    db.TestRecord.findOne({
      where: {
        TestListId: req.params.testId,
        UserId: req.params.userId
      }
    }).then(function(dbTestRecords) {
      res.json(dbTestRecords);
    });
  });

  // PUT route for saving a new post
  app.put("/api/EVVRecord", function(req, res) {
    db.EVVRecord.update(
      {
        checkInLongitude: req.body.checkInLongitude,
        checkInLatitude: req.body.checkInLatitude,
        checkInTime: req.body.checkInTime
      },
      { where: { id: req.body.id } }
    ).then(function(dbEVVRecord) {
      res.json(dbEVVRecord);
    });
  });

  app.get("/api/shifts/:id", function(req, res) {
    db.EVVRecord.findAll({
      where: {
        ClientId: req.params.id
      },
      include: [db.Client]
    }).then(function(dbShifts) {
      res.json(dbShifts);
    });
  });

  app.post("/api/testRecord", function(req, res) {
    db.TestRecord.create({
      testScore: req.body.testScore,
      testPass: req.body.testPass,
      testDate: moment(),
      TestListId: req.body.TestListId,
      UserId: req.body.UserId
    })
      .then(function() {
        res.redirect(307, "/testList");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      employeeName: req.body.employeeName
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        employeeName: req.user.employeeName
      });
    }
  });


};
