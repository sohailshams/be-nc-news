const db = require("../db/connection.js");

exports.getUsers = () => {
  return db.query("SELECT * FROM users;").then(({ rows }) => {
    const users = rows;
    return users;
  });
};
