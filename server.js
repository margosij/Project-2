require("dotenv").config();

var db = require("./models");
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
var seedData = require("./public/data/seedData");

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
    var carePlans = [];
    db.Employee.bulkCreate(seedData.getEmployees())
      .then(db.TestList.bulkCreate(seedData.getTests()))
      .then(db.TestQuestion.bulkCreate(seedData.getQuestions()))
      .then(db.Client.bulkCreate(seedData.getClients()))
      .then(function() {
        carePlans = seedData.createCarePlans();
        db.CarePlan.bulkCreate(carePlans);
      })
      .then(function() {
        db.EVVRecord.bulkCreate(seedData.createSchedule(carePlans));
      });
  });
});

module.exports = app;
