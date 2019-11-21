// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // blog route loads blog.html
  app.get("/testList", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/testList.html"));
  });

  app.get("/testActive", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/testActive.html"));
  });

  app.get("/evv", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/evv.html"));
  });

  app.get("/test2", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/test2.html"));
  });
};
