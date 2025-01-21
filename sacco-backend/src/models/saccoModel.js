// filepath: /sacco-backend/src/models/saccoModel.js
const mongoose = require('mongoose');

const saccoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  deposits: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, amount: Number }],
});

const Sacco = mongoose.model('Sacco', saccoSchema);

module.exports = Sacco;