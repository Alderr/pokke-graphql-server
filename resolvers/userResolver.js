const UserModel = require('../models/UserModel');
const ApiKeyModel = require('../models/ApiKeyModel');
const uuidv4 = require("uuid/v4");

module.exports = {
  Query: {
    users: () => UserModel.find().populate('apiKeys.key').exec().then((users) => {
        console.log(users[0].apiKeys);
        return users;
    }),
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
    },
    addKeyToUser: (_, { _id }) => {
      /*
        > find User
        > create api key using uuid
        > create apiKey in model { key, user-id }
        > save user's apiKey
      */
      let userData;
      return UserModel.findById(_id)
        .then((user) => {
          userData = user;
          let apiKey = uuidv4() + '';

          return ApiKeyModel.create({ key: apiKey, user: userData._id });
        })
        .then((apiKey) => {
          userData.apiKeys = [...userData.apiKeys, { key: apiKey._id }];
          console.log('apiKey: ', apiKey);
          return userData.save();
        })
        .then((response) => {
            console.log(response);
            return response;
        });
    },
  },
};
