const express = require('express')
const app = express()
const router = express.Router()
const mongodb = require('../controller/connectMongodb')

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', (req, res) => {
	res.send('123')
})

/* GET home page. */
router.get('/other', (req, res) => {
	res.contentType('text/html')
	res.render('index', { title: 'Express', name: 'test'});
})

router.post('/getData', (req, res) => {

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

router.post('/userInfo', (req, res) => {
	res.json({
		"name": "jack",
		"phone": "13222222222",
	})
})

router.post('/getData2', (req, res) => {
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

router.get('/lunarNewYear/:id', (req, res, next) => {
	const arr = ['1', '2', 'all']
	if (arr.includes(req.params.id)) {
		// 跳过中间的中间件直接执行最后一个中间件函数
		next('route')
	} else {
		next()
	}
},
(req, res, next) => {
	res.send('查不到数据')
})

router.get('/lunarNewYear/:id', (req, res) => {
	console.log(req.headers)
	const acceptTypes = req.accepts()
	console.log(acceptTypes);
	const acceptType = req.accepts(['html', 'json'])
	console.log(acceptType, '12')
	const arr = [
		{
			"id": '1',
			"name": "Jack",
			"age": 18,
			"phoneNumber": "11111111111"
		},
		{
			"id": '2',
			"name": "test",
			"age": 20,
			"phoneNumber": "99999999999"
		}
	]
	let resultArr = []
	console.log(req.params)
	if (req.params.id === 'all') {
		resultArr = arr
	} else if (req.params.id) {
		resultArr = arr.filter((item) => item.id === req.params.id)
	}
	console.log(resultArr)
	res.json({
		"state": 0,
		"data": resultArr
	})
})



module.exports = router
