// var express = require('express');
// var router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const CategoryController = require('../controllers/category');
var router = global.router;


/* GET users listing. */
router.get("/get-categories", CategoryController.get_categories);

router.post("/create-category", CategoryController.create_category);

router.delete("/category/:categoryId", CategoryController.category_delete);


module.exports = router;
