'use strict';

var mongoose = require('mongoose');

var pantsSchema = new mongoose.Schema({
  style: { type: String, unique: true, enum: ["Aztec Mint", "The Basics", "WKND Commander", "Purple Mountain"] },
  price: { type: Number, required: true },
  sizes: {
    small: Number,
    medium: Number,
    large: Number,
  }
})

module.exports = mongoose.model("Pant", pantsSchema);
