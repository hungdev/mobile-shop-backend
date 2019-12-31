'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({
  name: {
    type: String,
    required: true
  },
  product_id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  updated_date: {
    type: Date,
    default: Date.now
  },
});
// a setter
// Comment.path('name').set((inputString) => {
//   return inputString[0].toUpperCase() + inputString.slice(1);
// });

module.exports = mongoose.model('Comment', Comment);