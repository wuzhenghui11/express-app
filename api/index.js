const app = require('express')
const router = app.Router()
const mongodb = require('../controller/connectMongodb')

/* GET home page. */
router.get('/other', (req, res, next) => {
	res.render('index', { title: 'Express', name: 'test'});
})

router.post('/getData', (req, res, next) => {

	mongodb.start().then((data) => {
		res.json({
			"state": 0,
			"data": [data]
		})
	}).catch((e) => {
		res.json({
			"stateCode": 2,
			"error": "连接错误",
			"errorMessage": e
		})
	}).finally(() => {
		mongodb.client.close()
	})
})

router.post('/getData2', (req, res, next) => {
	console.log(req.body.testHanzi);
	res.json({
		"token": "abc123",
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
	})
})

router.get('/lunarNewYear', (req, res, next) => {
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
	})
})



module.exports = router
