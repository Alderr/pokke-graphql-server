const UserModel = require('../models/UserModel');

const authRequired = (userGiven) => {

/*
  Checks if req.user is null or if its a valid
  user that exists in our database
*/
    console.log("​-------------------------------------");
    console.log("​authRequired -> userGiven", userGiven);
    console.log("​-------------------------------------");
  if (userGiven) {
    console.log('​-------------------------------------');
    console.log('​authRequired -> if -> userGiven', userGiven);
    console.log('​-------------------------------------');
    console.log('​---------------------------------------------');
    console.log('​authRequired -> userGiven._id', userGiven._id);
    console.log('​---------------------------------------------');

    return UserModel.findById(userGiven._id)
      .then((user) => {
        console.log('​---------------------------');
        console.log('​authRequired -> findByid -> user', user);
        console.log('​---------------------------');
        if (user) {
          console.log('​---------------------------');
          console.log('​authRequired -> user; foundit?', user);
          console.log('​---------------------------');

          return user;
        }

        throw new Error('Invalid credentials');
      });
  }

  throw new Error('Invalid credentials');
};

module.exports = authRequired;
