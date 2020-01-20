// http://www.codingpedia.org/ama/cleaner-code-in-nodejs-with-async-await-mongoose-calls-example#before
const mongoose = require("mongoose");
const fs = require("fs")
const Product = require("../models/product");
const Comment = require("../models/comment");
const _ = require('lodash')

// res.setHeader('Content-Type', 'application/json');
//https://stackoverflow.com/questions/33627238/mongoose-find-with-multiple-conditions
exports.get_products = async (req, res, next) => {
  let criteria = {}

  if (req.query.isFeatured) {
    criteria.is_featured = req.query.isFeatured
  }

  if (req.query.name) {
    criteria.name = new RegExp(req.query.name, "i")
  }
  if (req.query.categoryId) {
    criteria.category_id = req.query.categoryId
  }
  // skip: lấy từ phần tử số skip đó trở đi
  try {
    const limit = parseInt(req.query.limit, 0) || 10;
    const skip = parseInt(req.query.skip, 0) || 0;
    const productRs = await Product.find(criteria).skip(skip).limit(limit).sort({ title: 1 }) // sort theo title
    // .select("title content location created_date user_id image_url likes")
    res.status(200).json({
      result: "ok",
      data: productRs,
      count: productRs.length,
      message: "Query list of product successfully"
    })
  } catch (err) {
    return res.status(500).json({
      error: err
    });
  }
}

exports.product_detail = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId).exec();
    res.json({
      result: "ok",
      data: product,
      message: "Query list successfully"
    });
  } catch (error) {
    res.json({
      result: "failed",
      data: [],
      message: `Error is : ${error}`
    });
  }
}

exports.create_product = (req, res, next) => {

  if (!mongoose.Types.ObjectId.isValid(req.body.categoryId)) {
    return res.json({
      result: "failed",
      data: {},
      message: "You must enter valid categoryId"
    });
  }

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    category_id: mongoose.Types.ObjectId(req.body.categoryId),
    price: req.body.price,
    status: req.body.status,
    accessories: req.body.accessories,
    promotion: req.body.promotion,
    details: req.body.details,
    is_stock: req.body.isStock,
    is_featured: req.body.isFeatured,
    image: _.get(req, 'file.path', '')
  });
  product.save((err) => {
    if (err) {
      res.json({
        result: "failed",
        data: {},
        message: `Error is : ${err}`
      });
    } else {
      res.json({
        result: "ok",
        message: "Insert new product successfully"
      });
    }
  });
};

exports.product_delete = (req, res, next) => {
  Product.findOneAndRemove({ _id: mongoose.Types.ObjectId(req.params.productId) }, (err) => {
    if (err) {
      res.json({
        result: "failed",
        message: `Cannot delete with Id: ${req.params.productId}. Error is : ${err}`
      });
      return;
    }
    Comment.deleteMany({ product_id: { $in: req.params.productId } }, (err, response) => {
      if (err) {
        res.json({
          result: "failed",
          message: `Cannot delete comment with Id: ${req.params.productId}. Error is : ${err}`
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
