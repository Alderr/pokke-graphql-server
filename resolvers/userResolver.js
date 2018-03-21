const uuidv4 = require('uuid/v4');
const UserModel = require('../models/UserModel');
const ApiKeyModel = require('../models/ApiKeyModel');
const requireAuth = require('../services/authRequired');

function phoneNumberCheck(str) {
  return /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(str);
}

function createContactsArr(contacts) {
  return contacts.map((contact) => {
    if (contact.includes('@')) {
      return { email: contact };
    } else if (phoneNumberCheck(contact)) {
      return { phoneNumber: contact };
    }

    throw new Error('Not a valid contact!');
  });
}

module.exports = {
  Query:
  {
    users: () =>
      UserModel.find()
        .populate('apiKeys')
        .exec()
        .then((users) => {
          console.log(users);
          return users;
        }),
  },
  Mutation:
  {
    createUser: (_, { input }) => {
      // { firstName, lastName, username, password } = input;

      const args = input;

      return UserModel.hashPassword(input.password)
        .then((hashedPassword) => {
          args.password = hashedPassword;
          return UserModel.create(args);
        })
        .then((response) => {
          console.log(response);
          return response;
        });
    },
    deleteUser: (_, { _id }, user) => {
      /*
      Delete all user info when requested!
      */
      const { id } = requireAuth(user);

      return UserModel.findByIdAndRemove(id)
        .then((response) => {
          console.log(response);
          return response;
        });
    },
    addApiKey: (_, __, user) => {
      /*
        > find User
        > create api key using uuid
        > create apiKey in model { key, user-id }
        > save user's apiKey
        > see response & send it!
      */

      let userData;

      return requireAuth(user)
        .then((response) => {
          userData = response;
          const apiKey = uuidv4();
          console.log('before new apikey ', response);
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
    deleteApiKey: (_, { apiKeyId }, user) => {
      console.log('​-----------------------------');
      console.log('​apiKeyId', apiKeyId);
      console.log('​-----------------------------');

      return requireAuth(user)
        .then((user) => {
          const newApiKeysArr = user.apiKeys.filter(key => !(JSON.stringify(key).replace(/\"/g, '') === apiKeyId));

          user.apiKeys = [...newApiKeysArr];
          return user.save();
        })
        .then((response) => {
          console.log(response);
          return ApiKeyModel.findByIdAndRemove(apiKeyId);
        })
        .then((response) => {
          console.log(response);
          return response;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    },
    createLog: (_, { input }) => {
      const { id, message, contacts } = input;

      return UserModel.findById(id, 'logs')
        .then((user) => {
          console.log('user', user);

          const newLogsObj = {
            message,
            contacts: createContactsArr(contacts),
          };

          user.logs = [...user.logs, newLogsObj];
          return user.save();
        })
        .then((response) => {
          console.log(response);
          return response;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    },
  },

};
