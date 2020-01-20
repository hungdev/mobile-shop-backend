// // http://www.codingpedia.org/ama/cleaner-code-in-nodejs-with-async-await-mongoose-calls-example#before
const mongoose = require("mongoose");
const fs = require("fs")
const Comment = require("../models/comment");
const _ = require('lodash')

// // res.setHeader('Content-Type', 'application/json');
// //https://stackoverflow.com/questions/33627238/mongoose-find-with-multiple-conditions
exports.get_product_comments = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
    return res.json({
      result: "failed",
      data: {},
      message: "You must enter valid productId"
    });
  }
  // skip: lấy từ phần tử số skip đó trở đi
  try {
    const limit = parseInt(req.query.limit, 0) || 10;
    const skip = parseInt(req.query.skip, 0) || 0;
    const commentRs = await Comment.find({ product_id: req.params.productId }).skip(skip).limit(limit).sort({ created_date: -1 }) // sort theo title
    // .select("title content location created_date user_id image_url likes")
    res.status(200).json({
      result: "ok",
      data: commentRs,
      count: commentRs.length,
      message: "Query list of comment successfully"
    })
  } catch (err) {
    return res.status(500).json({
      error: err
    });
  }
}

exports.create_comment = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.body.productId)) {
    return res.json({
      result: "failed",
      data: {},
      message: "You must enter valid productId"
    });
  }
  const comment = new Comment({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    product_id: req.body.productId,
    email: req.body.email,
    content: req.body.content,
  });
  comment.save((err) => {
    if (err) {
      res.json({
        result: "failed",
        data: {},
        message: `Error is : ${err}`
      });
    } else {
      res.json({
        result: "ok",
        message: "Insert new comment successfully"
      });
    }
  });
};

exports.comment_delete_all = async (req, res, next) => {
  Comment.deleteMany({}, (err, response) => {
    if (err) {
      res.json({
        result: "failed",
        message: `Cannot delete Post with Id: ${req.params.commentId}. Error is : ${err}`
      });
      return;
    }
    res.json({
      result: "ok",
      message: `Delete all successful`
    });
  })
};