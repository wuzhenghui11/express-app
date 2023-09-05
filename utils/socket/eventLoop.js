const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, './index.html'), 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data + '2');
});

fs.readFile(path.join(__dirname, './test.js'), 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data + '1');
});

