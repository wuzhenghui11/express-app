const { MongoClient } = require('mongodb')

const URL = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(URL)


async function start () {
  await client.connect()
  console.log('Connected successfully to server');
  const db = client.db('admin')
  const collection = db.collection('test')
  let filter = { userName: 'wzh' }
  let result = collection.findOne(filter)
  return result
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