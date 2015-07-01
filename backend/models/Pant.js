'use strict';

var mongoose = require('mongoose');

var pantsSchema = new mongoose.Schema({
  style: { type: String, enum: ["Aztec Mint", "The Basics", "WKND Commander", "Purple Mountain"] },
  sizes: {
    small: Number,
    medium: Number,
    large: Number,
  }
})

module.exports = mongoose.model("Pant", pantsSchema);
