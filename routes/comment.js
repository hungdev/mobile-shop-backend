// var express = require('express');
// var router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/checkAuth');
const CommentController = require('../controllers/comment');
import upload from '../middleware/upload'
var router = global.router;


/* GET users listing. */
router.get("/get-product-comments/:productId", CommentController.get_product_comments);

// router.put("/update-post", PostController.update_post);

// router.get("/get-detail-post", PostController.get_detail_post);

router.post("/create-comment", CommentController.create_comment);

// router.get("/open-image", PostController.open_image);

// router.delete("/post/:postId", PostController.post_delete);

// router.delete("/post-delete-many", PostController.post_delete_many);

router.delete("/comment-delete-all", CommentController.comment_delete_all);


module.exports = router;
