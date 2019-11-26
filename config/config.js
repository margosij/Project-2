require("dotenv").config();
var keys = require("../keys.js");

module.exports = {
  development: {
    username: "root",
    password: keys.mySql.password,
    database: "exampledb",
    host: "localhost",
    port: 3306,
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: "root",
    database: "testdb",
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    logging: false
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
};
