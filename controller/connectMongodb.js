const { MongoClient } = require('mongodb')

const URL = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(URL)


async function start () {
  try {
    await client.connect()
    console.log('Connected successfully to server');
    const db = client.db('admin') // dbname
    const coll = db.collection('users') // 集合相当于表
    let filter = { city: '武汉' };
    // let result = await coll.findOne(filter)
    let result = await coll.find(filter).toArray();
    return result
  } catch (e) {
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
  start
}