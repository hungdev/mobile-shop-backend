
const BuyController = require('../controllers/buy');
var router = global.router;

router.post("/buy", BuyController.buy_product);

module.exports = router;
