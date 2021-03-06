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

      return ApiKeyModel.findByIdAndUpdate(_id, { $inc: { usage: 1 } })
        .then((response) => {
          console.log(response);
          return response;
        });
    },
    resetUsage: (_, _id) => {
      console.log('​---------');
      console.log('​_id', _id);
      console.log('​---------');

      return ApiKeyModel.findByIdAndUpdate(_id, { usage: 0 })
        .then((response) => {
          console.log(response);
          return response;
        });
    },
    addLogToApiKey: (_, { input }) => {
      const { _id, message, subject, contact, status } = input;
      const newLog = { message, subject, contact, status };

      return ApiKeyModel.findByIdAndUpdate(_id, { $push: { logs: newLog } })
        .then((response) => {
          console.log('​-------------------');
          console.log('​ApiKeyModel -> response', response);
          console.log('​-------------------');
          return response;
        })
        .catch(err => err);
    },
  },
};
