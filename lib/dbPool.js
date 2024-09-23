const mysql = require("mysql2");

let connInfo = {
  host: "localhost",
  port: "3306",
  user: "soon",
  password: "alstjsl1!",
  // multipleStatements: true,
  database: "udemy_express",
  // connectionLimit: dbSetting.connectionLimit,
};
const pool = mysql.createPool(connInfo);

module.exports = pool.promise();
