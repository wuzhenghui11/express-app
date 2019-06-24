const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/other', (req, res, next) => {
	res.render('index', { title: 'Express', name: 'test'});
});

router.get('/getData', (req, res, next) => {
	console.log(req);
	res.json({
		"state": 0,
		"data": [
			{
				"name": "Jack",
				"age": 18,
				"phoneNumber": "11111111111"
			},
			{
				"name": "李四",
				"age": 20,
				"phoneNumber": "99999999999"
			},
			{
				"name": "张三",
				"age": 22,
				"phoneNumber": "1234567890"
			},
			{
				"name": "Mason",
				"age": 23,
				"phoneNumber": "1234567891"
			},
			{
				"name": "王五",
				"age": 25,
				"phoneNumber": "12347273748"
			}
		]
	});
});

module.exports = router;
