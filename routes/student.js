var express = require('express');
var router = express.Router();
const studentController = require('../controllers/index').student;
//導到學生清單及處理功能按鈕頁
router.get('/', function(req, res, next) {
	studentController.list(req,res)
});
//導到單筆學生資料編輯頁
router.get('/edit/:id', function(req, res, next) {
	studentController.edit(req,res)
});
//導到學生資料批次輸入頁
router.get('/batchinput', function(req, res, next) {
	studentController.dobatchinput(req,res)
});
//&nbsp;
router.get('/:id', function(req, res, next) {
	studentController.retrieve(req,res)
});
router.get('/makeurl/:id', function(req, res, next) {
	studentController.makepath(req,res)
});
router.get('/find/:no', function(req, res, next) {
	studentController.findByNo(req,res)
});
//&nbsp;
router.post('/', function(req, res, next) {
	console.log(req.body);
	studentController.create(req,res)
});
//&nbsp;
router.get('/delete/:id', function(req, res, next) {
	studentController.destroy(req,res)
});
//&nbsp;
router.post('/update', function(req, res, next) {
	studentController.update(req,res)
});
//測試片斷程式
router.get('/testblock', function(req, res, next) {
	studentController.test(req,res)
});
//&nbsp;
module.exports = router;