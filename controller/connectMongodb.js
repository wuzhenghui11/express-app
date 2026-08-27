const { MongoClient, ObjectId } = require('mongodb')

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

// start().then((data) => {
//   console.log(data)
// }).catch((e) => {
//   console.error(e)
// }).finally(() => {
//   client.close()
// })

module.exports = {
  client,
  start,
  insert
}