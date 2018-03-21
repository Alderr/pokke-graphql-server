const ApiKeyModel = require('../models/ApiKeyModel');


module.exports = {
  Query: {
    apiKeys: () =>
      ApiKeyModel.find()
        .populate('user')
        .exec()
        .then((keys) => {
          console.log(keys);
          return keys;
        }),
  },
  Mutation: {
    incrementUsage: (_, _id) => {
      console.log('​---------');
      console.log('​_id', _id);
      console.log('​---------');

      return null;
    },
    resetUsage: (_, _id) => {
      console.log('​---------');
      console.log('​_id', _id);
      console.log('​---------');

      return null;
    },
  },
};
