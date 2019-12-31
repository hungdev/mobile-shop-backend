// var express = require('express');
// var router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const BuyController = require('../controllers/buy');
var router = global.router;


/* GET users listing. */
// router.get("/get-categories", CategoryController.get_categories);

// router.put("/update-post", PostController.update_post);

// router.get("/get-detail-post", PostController.get_detail_post);

router.post("/buy", BuyController.buy_product);

// router.get("/open-image", PostController.open_image);

// router.delete("/category/:categoryId", CategoryController.category_delete);

// router.delete("/post-delete-many", PostController.post_delete_many);

// router.delete("/post-delete-all", PostController.post_delete_all);


module.exports = router;
