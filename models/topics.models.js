const db = require('../db/connection.js');

exports.getTopics = () => {
    return db
    .query(
      `SELECT * FROM topics;`
    )
    .then((result) => {
        console.log(result);
      return result.rows;
    });
};