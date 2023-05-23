const { getUsers } = require("../models/users.models");

exports.fetchUsers = (request, response, next) => {
  getUsers()
    .then((users) => {
      response.status(200).send({ users: users });
    })
    .catch((err) => next(err));
};
