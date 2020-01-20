const ProductController = require('../controllers/product');
import upload from '../middleware/upload'
var router = global.router;


router.get("/get-products", ProductController.get_products);

router.get("/product/:productId", ProductController.product_detail);

router.post("/create-product", upload.single('imageUrl'), ProductController.create_product);

router.delete("/product/:productId", ProductController.product_delete);

module.exports = router;
