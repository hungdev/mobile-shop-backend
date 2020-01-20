// http://www.codingpedia.org/ama/cleaner-code-in-nodejs-with-async-await-mongoose-calls-example#before
const mongoose = require("mongoose");
const fs = require("fs")
const Category = require("../models/category");
const Product = require("../models/product");
const _ = require('lodash')

//https://stackoverflow.com/questions/33627238/mongoose-find-with-multiple-conditions
exports.get_categories = async (req, res, next) => {
  let criteria = {}
  // if (mongoose.Types.ObjectId.isValid(req.query.user_id)) {
  //   criteria.userID = mongoose.Types.ObjectId(req.query.user_id)
  // }
  // skip: lấy từ phần tử số skip đó trở đi
  try {
    const limit = parseInt(req.query.limit, 0) || 10;
    const skip = parseInt(req.query.skip, 0) || 0;
    const categoryResult = await Category.find(criteria).skip(skip).limit(limit).sort({ name: 1 }) // sort theo title
    res.status(200).json({
      result: "ok",
      data: categoryResult,
      count: categoryResult.length,
      message: "Query list of posts successfully"
    })
  } catch (err) {
    return res.status(500).json({
      error: err
    });
  }
};

exports.create_category = (req, res, next) => {
  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name
  });
  category.save((err) => {
    if (err) {
      res.json({
        result: "failed",
        data: {},
        message: `Error is : ${err}`
      });
    } else {
      res.json({
        result: "ok",
        message: "Insert new category successfully"
      });
    }
  });
};

exports.category_delete = (req, res, next) => {
  Category.findOneAndRemove({ _id: mongoose.Types.ObjectId(req.params.categoryId) }, (err) => {
    if (err) {
      res.json({
        result: "failed",
        message: `Cannot delete category with Id: ${req.params.categoryId}. Error is : ${err}`
      });
      return;
    }
    Product.deleteMany({ category_id: { $in: req.params.categoryId } }, (err, response) => {
      if (err) {
        res.json({
          result: "failed",
          message: `Cannot delete Product with Id: ${req.params.categoryId}. Error is : ${err}`
        });
        return;
      }
      res.json({
        result: "ok",
        message: `Delete successful`
      });
    })
  });
};
