const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  logs: [
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
  apiKeys: [{ type: Schema.Types.ObjectId, ref: 'ApiKeys' }],
});

UserSchema.methods.validatePassword = password => bcrypt.compare(password, this.password);

UserSchema.statics.hashPassword = password => bcrypt.hash(password, 10);

UserSchema.methods.serialize = () => ({
  _id: this._id,
  username: this.username,
  password: this.password,
  firstName: this.firstName,
  lastName: this.lastName,
  log: this.log,
  apiKeys: this.apiKeys,
});

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;
