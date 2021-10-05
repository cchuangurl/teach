var express = require('express');
var router = express.Router();
const machineController = require('../controllers/index').machine;
//本router執行後，導到拉霸機頁
router.get('/', function(req, res, next) {
	machineController.list(req,res)
});

//本router，導到...頁
router.get('/reset', function(req, res, next) {
	machineController.reset(req,res)
});
//&nbsp;
module.exports = router;