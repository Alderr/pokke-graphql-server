const UserModel = require('../models/UserModel');

const authRequired = (userGiven) => {
/*
  Checks if req.user is null or if its a valid
  user that exists in our database
*/
  if (userGiven) {
    return UserModel.findById(userGiven._id)
      .then((user) => {
        if (user) {
          return user;
        }

        throw new Error('Invalid credentials');
      });
  }

  throw new Error('Invalid credentials');
};

module.exports = authRequired;
