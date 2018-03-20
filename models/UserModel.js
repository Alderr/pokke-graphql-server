const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  log: [
    {
      date: { type: Number, default: Date.now() },
      message: { type: String },
      contacts: [
        {
          email: { type: String },
          phoneNumber: { type: String },
        },
      ],
    },
  ],
  apiKeys: [
    {
      date: { type: Number, default: Date.now() },
      key: { type: String, required: true },
    },
  ],
});

UserSchema.methods.serialize = function () {
  return {
    id: this._id,
    username: this.username,
    password: this.password,
    firstName: this.firstName,
    lastName: this.lastName,
    log: this.log,
    apiKeys: this.apiKeys,
  };
};

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;
