// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // route loads testList.html
  app.get("/testList", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/testList.html"));
  });

  // route loads testActive.html
  app.get("/testActive", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/testActive.html"));
  });

  // route loads signup.html
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/home");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/home");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/home", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/schedule", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/viewSchedule.html"));
  });

  // route loads viewShift.html
  app.get("/shift", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/viewShift.html"));
  });
};
