const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const placeSchema = new Schema({
  placeId: { type: String, unique: true },
  users: [String],
  peopleGoing: { type: Number, default: 1 }
});

module.exports = mongoose.model('Place', placeSchema);
