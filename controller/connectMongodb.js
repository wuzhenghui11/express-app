const { MongoClient, ObjectId } = require('mongodb')

const mongoose = require('mongoose');
const User = require('./userModel');

const URL = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(URL)


async function start () {
  try {
    await client.connect()
    console.log('Connected successfully to server');
    const db = client.db('admin') // dbname
    const coll = db.collection('users') // 集合相当于表
    
    let zhansan = await coll.findOne({ name: '张三' })
    const addressColl = db.collection('address')
    const addressResult = await addressColl.findOne({ userId: zhansan._id })

    let filter = { city: '武汉' };
    let result = await coll.find(filter).toArray();
    console.log(addressResult, result);

    const zhangsanItem = result.find((item) => {
      return new ObjectId(item._id).equals(new ObjectId(addressResult.userId))
    })
    console.log(zhangsanItem);
    zhangsanItem.address = addressResult
    return result
  } catch (e) {
    throw new Error(e)
  }
}

async function insert (data) {
  try {
    await client.connect()
    const daminDB = client.db('admin');
    const usersColl = daminDB.collection('users');
    const doc = {
      name: data.userName,
      age: Number.parseInt(data.age),
      city: data.city,
      email: data.email
    }
    const result = await usersColl.insertOne(doc);
    return result
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
}

async function insertUserInfo () {
  await mongoose.connect(URL + '/admin')
  // const u1 = await User.create({ name: '就这样', age: 19, city: '武汉', email: '112233@qq.com' })
  // console.log(u1)

  // const list = await User.find({ name: '就这样' });
  const single = await User.findOne({ name: '就这样' });
  
  console.log(single);

  //按_id查询，直接传字符串！Mongoose自动帮你转ObjectId！
  // const one = await User.findById(u1._id);
  //删除
  if (single && single._id) {
    await User.deleteOne({_id: single._id})
  }
  mongoose.disconnect();
}



module.exports = {
  client,
  start,
  insert,
  insertUserInfo
}