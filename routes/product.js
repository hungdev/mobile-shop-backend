// var express = require('express');
// var router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/checkAuth');
const ProductController = require('../controllers/product');
import upload from '../middleware/upload'
var router = global.router;


/* GET users listing. */
router.get("/get-products", ProductController.get_products);

router.get("/product/:productId", ProductController.product_detail);
// router.put("/update-post", PostController.update_post);

// router.get("/get-detail-post", PostController.get_detail_post);

router.post("/create-product", upload.single('imageUrl'), ProductController.create_product);

// router.get("/open-image", PostController.open_image);

router.delete("/product/:productId", ProductController.product_delete);

// router.delete("/post-delete-many", PostController.post_delete_many);

// router.delete("/post-delete-all", PostController.post_delete_all);


module.exports = router;
