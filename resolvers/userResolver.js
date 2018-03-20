const UserModel = require('../models/UserModel');

module.exports = {
  Query: {
    users: () => UserModel.find().then((users) => users.map((user) => user.serialize())),
  },
  Mutation: {
    createUser: (_, { firstName, lastName, username, password }) => {
    // creating user! 
    return UserModel.create({firstName, lastName, username, password})
        .then((data) => {
          console.log(data);
          return data;
        });
    },
    deleteUser: (_, { _id }) => {
        return UserModel.findByIdAndRemove(_id)
            .then((response) => {
                console.log(response);
                return response;
            });
    }
  },
};
