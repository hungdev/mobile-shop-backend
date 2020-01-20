const CommentController = require('../controllers/comment');
var router = global.router;


router.get("/get-product-comments/:productId", CommentController.get_product_comments);

router.post("/create-comment", CommentController.create_comment);

router.delete("/comment-delete-all", CommentController.comment_delete_all);


module.exports = router;
