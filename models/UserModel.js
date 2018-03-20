const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

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
