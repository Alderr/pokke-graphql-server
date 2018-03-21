const UserModel = require('../models/UserModel');


function localAuth(username, password) {
  return UserModel.findOne({ username })
    .then((user) => {
      if (user) {
        if (user.validatePassword(password)) {
          return user;
        }

        return new Error('Incorrect credentials.');
      }

      return new Error('Incorrect credentials.');
    });
}
module.exports = {
  Query: {
    signIn: (_, { input }, context) => {
      /*
      > see if user exists?
      > see if password matches when unencrypted
      > ==> if true - give valid token
      > ==> if false - send err: invalid credentials
      */
      console.log('​-----------------');
      console.log('​context', context);
      console.log('​-----------------');

      return null;
    },
  },
  Mutation: {
  },
};
