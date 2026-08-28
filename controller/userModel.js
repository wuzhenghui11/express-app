const mongoose = require('mongoose');

// 1.定义Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String,
  email: String
});

// 2.编译模型 User模型，对应users集合
// 由 Schema 编译出来，用来做增删改查，对应集合。模型名大写单数，Mongo 自动生成小写复数集合名。`User`模型 → 对应集合 `users`
const User = mongoose.model('User', userSchema);

module.exports = User;