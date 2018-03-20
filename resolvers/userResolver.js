const UserModel = require('../models/UserModel');

module.exports = {
  Query: {
    users: () => {
        return UserModel.find()
            .then((users) => {
                return users.map((user) => user.serialize());
            });
    },
  },
  Mutations: {
      createUser: () => 1,
  },
//   Subscriptions: {},
};
