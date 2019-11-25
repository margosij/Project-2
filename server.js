require("dotenv").config();

var express = require("express");
var session = require("express-session");
var passport = require("./config/passport");

var db = require("./models");
var PORT = process.env.PORT || 3000;

var app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

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
    db.TestList.bulkCreate(seedData.getTests())
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
