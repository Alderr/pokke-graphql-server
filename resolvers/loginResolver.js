const UserModel = require('../models/UserModel');


function localAuth(username, password) {
  return UserModel.findOne({ username })
    .then((user) => {
      if (user) {
        if (user.validatePassword(password)) {
          return { authToken: user.generateToken() };
        }

        return new Error('Incorrect credentials.');
      }

      return new Error('Incorrect credentials.');
    });
}

module.exports = {
  Query: {
    signIn: (_, { input }, context) => {
      const { username, password } = input;
      console.log('​-----------------');
      console.log('​context', context);
      console.log('​-----------------');

      return localAuth(username, password);
    },
  },
  Mutation: {
  },
}; 
