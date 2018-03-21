const UserModel = require('../models/UserModel');


function localAuth(username, password) {
  let tempUser;
  return UserModel.findOne({ username })
    .then((user) => {
      console.log('user', user);

      if (user) {
        // mongoose methods + bcrypt | its a promise!
        tempUser = user;
        return user.validatePassword(password);
      }

      return new Error('Incorrect credentials.');
    })
    .then((verdict) => {
      console.log('​------------------------------');
      console.log('​localAuth -> verdict', verdict);
      console.log('​------------------------------');

      if (verdict) {
        return tempUser.generateToken();
      }

      return new Error('Incorrect credentials.');
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

module.exports = {
  Query: {},
  Mutation: {
    signIn: (_, { input }, context) => {
      const { username, password } = input;
      console.log('​-----------------');
      console.log('​context', context);
      console.log('​-----------------');

      return localAuth(username, password);
    },
  },
};
