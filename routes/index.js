const app = require('express');
const router = app.Router();

/* GET home page. */
router.get('/other', (req, res, next) => {
	res.render('index', { title: 'Express', name: 'test'});
});


router.post('/getData', (req, res, next) => {
	res.json({
		"state": 0,
		"data": [
			{
				"name": "Jack",
				"age": 18,
				"phoneNumber": "11111111111"
			},
			{
				"name": "test",
				"age": 20,
				"phoneNumber": "99999999999"
			}
		]
	});
});
router.post('/getData2', (req, res, next) => {
	res.json({
		"state": 0,
		"data": [
			{
				"name": "Jack",
				"age": 18,
				"phoneNumber": "11111111111"
			},
			{
				"name": "test",
				"age": 20,
				"phoneNumber": "99999999999"
			}
		]
	});
});



module.exports = router;
