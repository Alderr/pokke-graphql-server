const UserModel = require('../models/UserModel');

module.exports = {
  Query: {
    signIn: (_, obj, context) => {
      console.log('​-----------------');
      console.log('​context', context);
      console.log('​-----------------');

      return null;
    },
  },
  Mutation: {
  },
};
