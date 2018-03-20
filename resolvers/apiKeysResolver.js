const ApiKeyModel = require('../models/ApiKeyModel');


module.exports = {
  Query: {
    apiKeys: () => ApiKeyModel.find().populate('user').exec().then((keys) => {
      console.log(keys);
      return keys;
    }),
  },
  Mutation: {},
//   Subscriptions: {},
};
