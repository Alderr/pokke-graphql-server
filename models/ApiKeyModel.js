const mongoose, { Schema } = require('mongoose');

mongoose.Promise = global.Promise;

const ApiKeySchema = new Schema({
  key: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "Users" },
  usage: { type: Number, required: true },
});

ApiKeySchema.methods.serialize = function () {
  return {
    id: this._id,
    key: this.key,
    user: this.user,
    usage: this.usage,
  };
};

const ApiKeyModel = mongoose.model('ApiKeys', ApiKeySchema);

module.exports = ApiKeyModel;
