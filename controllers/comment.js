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
    const commentRs = await Comment.find({ product_id: req.params.productId }).skip(skip).limit(limit).sort({ created_date: 1 }) // sort theo title
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


// exports.update_post = async (req, res, next) => {
//   let conditions = {};//search record with "conditions" to update
//   if (mongoose.Types.ObjectId.isValid(req.body.postId)) {
//     conditions._id = mongoose.Types.ObjectId(req.body.postId);
//   } else {
//     res.json({
//       result: "failed",
//       data: {},
//       message: "You must enter postId to update"
//     });
//   }

//   let newValues = {
//     ...req.body,
//     image_url: _.get(req, 'file.path', ''),
//     user_id: mongoose.Types.ObjectId(req.userData.userId)
//   };

//   if (newValues.like) {
//     const curPost = await Post.findById(req.body.postId).exec();
//     const isInclude = curPost.likes.includes(newValues.like)
//     const remain = isInclude ? curPost.likes.filter(e => e !== newValues.like) : curPost.likes.concat([newValues.like])
//     newValues.likes = remain
//   }

//   const options = {
//     new: true, // return the modified document rather than the original.
//     multi: true
//   }

//   Post.findOneAndUpdate(conditions, { $set: newValues }, options, (err, updatedPost) => {
//     if (err) {
//       res.json({
//         result: "failed",
//         data: {},
//         message: `Cannot update existing post. Error is : ${err}`
//       });
//     } else {
//       res.json({
//         result: "ok",
//         data: updatedPost,
//         message: "Update post successfully"
//       });
//     }
//   });
// };

// exports.get_detail_post = (request, response, next) => {
//   Post.findById(mongoose.Types.ObjectId(request.query.postId),
//     (err, post) => {
//       if (err) {
//         response.json({
//           result: "failed",
//           data: {},
//           message: `Error is : ${err}`
//         });
//       } else {
//         response.json({
//           result: "ok",
//           data: post,
//           message: "Query post by Id successfully"
//         });
//       }
//     });
// };

exports.create_comment = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.body.productId)) {
    return res.json({
      result: "failed",
      data: {},
      message: "You must enter valid categoryId"
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

// //http://localhost:3000/open-image?image_name=uploads/2018-12-12T04:43:50.787Z47390714_767819240231467_8016730945325367296_n.jpg
// exports.open_image = (request, response, next) => {
//   // let imageName = "uploads/" + request.query.image_name;
//   let imageName = request.query.image_name;
//   fs.readFile(imageName, (err, imageData) => {
//     if (err) {
//       response.json({
//         result: "failed",
//         message: `Cannot read image.Error is : ${err}`
//       });
//       return;
//     }
//     response.writeHead(200, { 'Content-Type': 'image/jpeg' });
//     response.end(imageData); // Send the file data to the browser.
//   });
// };

// exports.post_delete = (req, res, next) => {
//   Post.findOneAndRemove({ _id: mongoose.Types.ObjectId(req.params.postId) }, (err) => {
//     if (err) {
//       res.json({
//         result: "failed",
//         message: `Cannot delete Post with Id: ${req.params.postId}. Error is : ${err}`
//       });
//       return;
//     }
//     res.json({
//       result: "ok",
//       message: `Delete category and Post with post Id ${req.params.postId} successful`
//     });
//   });
// };

// exports.post_delete_many = async (req, res, next) => {
//   Post.deleteMany({ _id: { $in: req.body.ids } }, (err, response) => {
//     if (err) {
//       res.json({
//         result: "failed",
//         message: `Cannot delete Post with Id: ${req.params.postId}. Error is : ${err}`
//       });
//       return;
//     }
//     res.json({
//       result: "ok",
//       message: `Delete successful`
//     });
//   })
// };
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