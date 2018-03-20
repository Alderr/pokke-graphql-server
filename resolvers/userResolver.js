const UserModel = require('../models/UserModel');
const ApiKeyModel = require('../models/ApiKeyModel');
const uuidv4 = require('uuid/v4');

function phoneNumberCheck(str) {
  return /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(str);
}

module.exports = {
  Query: {
    users: () =>
      UserModel.find()
        .populate('apiKeys')
        .exec()
        .then((users) => {
          console.log(users);
          return users;
        }),
  },
  Mutation: {
    createUser: (_, { input }) => UserModel.create(input)
      .then((response) => {
        console.log(response);
        return response;
      }),
    deleteUser: (_, { _id }) => UserModel.findByIdAndRemove(_id).then((response) => {
      console.log(response);
      return response;
    }),
    addKeyToUser: (_, { _id }) => {
      /*
        > find User
        > create api key using uuid
        > create apiKey in model { key, user-id }
        > save user's apiKey
      */

      let userData;

      return UserModel.findById(_id, 'apiKeys')
        .then((user) => {
          userData = user;
          const apiKey = uuidv4();
          console.log('before new apikey ', user);
          return ApiKeyModel.create({ key: apiKey, user: userData._id });
        })
        .then((apiKey) => {
          userData.apiKeys = [...userData.apiKeys, apiKey._id];
          console.log('apiKey: ', apiKey);
          console.log('===== User ====: ', userData);
          return userData.save();
        })
        .then((response) => {
          console.log(response);
          return response;
        });
    },
    createLog: (_, { _id, message, contacts }) => UserModel.findById(_id, 'logs')
      .then((user) => {
        console.log('user', user);

        const newLogsObj = {
          message,
          contacts: contacts.map((contact) => {
            if (contact.includes('@')) {
              return { email: contact };
            } else if (phoneNumberCheck(contact)) {
              return { phoneNumber: contact };
            }

            throw new Error('Not a valid contact!');
          }),
        };

        user.logs = [...user.logs, newLogsObj];
        console.log('user===log', user.logs);
        return user.save();
      })
      .then((response) => {
        console.log('RESPONSE===');
        console.log(response);
        return response;
      })
      .catch((err) => {
        console.log(err);
        return err;
      }),
  },
};
