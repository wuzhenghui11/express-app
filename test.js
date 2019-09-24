const path = require('path');
console.log(__dirname);
console.log(path.resolve(__dirname, '../../work/zhongan/20190722_463_1/src/main/resources/static/'));
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux'));

const someAsyncThing = function() {
	return new Promise(function(resolve, reject) {
		// 下面一行会报错，因为x没有声明
		resolve(x + 2);
	});
};
someAsyncThing().then(function() {
	console.log('everything is great');
});
setTimeout(() => { console.log(123) }, 2000);
process.on('unhandledRejection', function (err, p) {
	throw err;
});
