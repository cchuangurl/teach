var express = require('express');
var router = express.Router();
const activeController = require('../controllers/index').active;
//導到互動紀錄清單及處理功能按鈕頁
router.get('/', function(req, res, next) {
	activeController.list(req,res)
});
//導到單筆互動紀錄資料輸入頁
router.get('/inputpage', function(req, res, next) {
	res.render("active/inputpage",{
		//statusreport:req.body.statusreport
		statusreport:req.query.statusreport
	})
});
//導到互動紀錄資料批次輸入頁
router.get('/batchinput', function(req, res, next) {
	activeController.dobatchinput(req,res)
});
//導動互動紀錄資料自動輸入
router.get('/record/:waterno', function(req, res, next) {
	activeController.record(req,res)
});
router.get('/find/:no', function(req, res, next) {
	activeController.findByNo(req,res)
});
//更新編輯後互動紀錄資料
router.post('/', function(req, res, next) {
	console.log(req.body);
	activeController.create(req,res)
});
//刪除指定互動紀錄資料
router.get('/delete/:id', function(req, res, next) {
	activeController.destroy(req,res)
});
//更新指定互動紀錄資料
router.post('/update/:id', function(req, res, next) {
	activeController.update(req,res)
});
//測試片斷程式
router.get('/testblock', function(req, res, next) {
	activeController.test(req,res)
});
//&nbsp;
module.exports = router;