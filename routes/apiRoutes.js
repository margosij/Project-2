// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");
var passport = require("../config/passport.js");
var moment = require("moment");

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

  app.post("/api/testRecordSave", function(req, res) {
    console.log(JSON.stringify(req.body));
    db.TestRecord.create({
      testScore: req.body.testScore,
      testPass: req.body.testPass,
      testDate: moment(),
      TestListId: req.body.TestListId,
      UserId: req.body.UserId
    })
      .then(function() {
        res.end();
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  app.get("/api/testList/", function(req, res) {
    db.TestList.findAll({}).then(function(dbTestList) {
      res.json(dbTestList);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/shiftRecord/:id", function(req, res) {
    db.EVVRecord.findOne({
      where: {
        ClientId: req.params.id,
        shiftDate: moment().startOf("day")
      }
    }).then(function(dbShift) {
      res.json(dbShift);
    });
  });

  // PUT route for saving a new post
  app.put("/api/shiftRecord", function(req, res) {
    db.EVVRecord.update(
      {
        shiftRecord: req.body.shiftRecord
      },
      { where: { id: req.body.id } }
    ).then(function(dbshiftRecord) {
      res.json(dbshiftRecord);
    });
  });

  app.put("/api/shiftEmployeeSignature", function(req, res) {
    db.EVVRecord.update(
      {
        employeeSignature: req.body.employeeSignature
      },
      { where: { id: req.body.id } }
    ).then(function(dbshiftRecord) {
      res.json(dbshiftRecord);
    });
  });

  app.put("/api/shiftClientSignature", function(req, res) {
    db.EVVRecord.update(
      {
        clientSignature: req.body.clientSignature
      },
      { where: { id: req.body.id } }
    ).then(function(dbshiftRecord) {
      res.json(dbshiftRecord);
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
      req.body,
      // {
      //   checkInLongitude: req.body.checkInLongitude,
      //   checkInLatitude: req.body.checkInLatitude,
      //   checkInTime: req.body.checkInTime
      // },
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
