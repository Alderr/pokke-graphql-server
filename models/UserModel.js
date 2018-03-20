const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
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
      key: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
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
    _id: this._id,
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
