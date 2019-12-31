'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  category_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  price: {
    type: String
  },
  status: {
    type: String
  },
  accessories: {
    type: String
  },
  promotion: {
    type: String
  },
  details: {
    type: String
  },
  is_stock: {
    type: Boolean
  },
  is_featured: {
    type: Boolean
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
// ProductSchema.path('name').set((inputString) => {
//   return inputString[0].toUpperCase() + inputString.slice(1);
// });

module.exports = mongoose.model('Product', ProductSchema);