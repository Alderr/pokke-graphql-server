const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Schema } = require('mongoose');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  logs: [
    {
      date: { type: Number, default: Date.now() },
      message: { type: String, required: true },
      subject: { type: String, default: '' },
      apiKey: { type: String, required: true },
      contact: { type: String, default: '' },
      status: { type: String, default: '' },
    },
  ],
  apiKeys: [{ type: Schema.Types.ObjectId, ref: 'ApiKeys' }],
});

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

UserSchema.methods.generateToken = function () {
  const { _id, firstName, lastName } = this;
  const user = { _id, firstName, lastName };

  return jwt.sign({ user }, JWT_SECRET, {
    subject: this.username,
    expiresIn: JWT_EXPIRY,
    algorithm: 'HS256',
  });
};

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;
