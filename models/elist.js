"use strict";

var mongoose = require('mongoose');

var elistSchema = mongoose.Schema({
  name: String,
  email: String
});

module.export = mongoose.model('Elist', elistSchema);
