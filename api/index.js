const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

const multer  = require('multer') // 文件上传中间件


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
			"data": data
		})
	}).catch((e) => {
		console.log(e);
		res.json({
			"stateCode": 2,
			"error": "连接错误",
			"errorMessage": e
		})
	}).finally(() => {
		mongodb.client.close()
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

router.get('/userInfo', (req, res) => {
	res.json({
		code: 200,
		data: {
			userName: req.session.userName,
			email: req.session.email
		}
	})
})

/**
 * 一个简单的表单
 */
router.post('/userInfoSubmit', (req, res) => {
	console.log(req.xhr);
	console.log('body:', req.body);
	console.log('accepts:', req.accepts());
	console.log('req.session:', req.session);
	// req.cookie
	// req.signedCookies
	if (req.body.isBiaodan) {
		res.clearCookie('setTestCookie');
		res.redirect(303, '/about');
	} else if (req.xhr) {
		res.json({
			code: 12,
			message: '提交成功',
			...req.body
		})
	} else {
		// fetch 提交
		
		req.session.userName = req.body.userName
		req.session.email = req.body.email

		res.cookie('setTestCookie', '123', {maxAge: 60000})
		// res.cookie('SIGNED_USERINFO', '123', { signed: true, httpOnly: true })

		mongodb.insert(req.body).then((result) => {
			console.log('insertResult', result);
			res.json({
				code: 12,
				message: '提交成功',
				...req.body
			})
		}).catch ((e) => {
			res.json({
				code: 0,
				message: '提交失败',
			})
		}).finally (() => {
			mongodb.client.close()
		})
	}
})

/**
 * 文件上传
 */
const uploadDir = path.join(__dirname, '../my-uploads')
console.log(__dirname + 'index.js 打印', '文件上传在:', uploadDir);
// 如果文件夹不存在，自动创建
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// ========== 2. multer 存储配置 ==========
const storage = multer.diskStorage({
  // 设置保存目录
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  // 设置保存的文件名（防止重名覆盖）
  filename: function (req, file, cb) {
    // 时间戳 + 原始后缀名
    const ext = path.extname(file.originalname)
    const fileName = Date.now() + '-' + Math.random().toString(36).slice(2) + ext
    cb(null, fileName)
  }
})

// 可选：文件过滤器（限制上传类型，例如只允许图片）
const fileFilter = (req, file, cb) => {
  const allowTypes = ['image/jpeg', 'image/png', 'image/gif']
  if (allowTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('只允许上传 jpg/png/gif 图片'), false)
  }
}

// 创建上传实例，限制单文件最大 5MB
// const upload = multer()
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
})



router.post('/upload', upload.single('avatar'), (req, res) => {
	console.log('body', req.body);
	console.log('Session:', req.session);
	console.log('上传文件：', req.file)
	const fileInfo = req.file
	res.json({
		code: 200,
		msg: '接收成功',
		data: {
			originalName: fileInfo.originalname,
			saveName: fileInfo.filename,
			savePath: fileInfo.path,
			...req.body
		},
	})
})


/**
 * 带参数的
 */
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
