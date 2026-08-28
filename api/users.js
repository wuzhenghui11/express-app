var express = require('express');
var router = express.Router();

const mongodb = require('../controller/connectMongodb')

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/setData', (req, res, next) => {
  mongodb.insertUserInfo().then(() => {
    res.send('操作成功');
  }).catch((e) => {
    console.log(e);
    res.send(e);
  })
  
});

module.exports = router;
