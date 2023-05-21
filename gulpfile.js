const gulp = require('gulp');
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-clean-css');
const rename = require('gulp-rename');
const nodemon = require('gulp-nodemon');
const yargs = require('yargs').argv;
const livereload = require('gulp-livereload');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const path = require('path');
const opn = require('opn');

const childProcess = require('child_process');
const exec = childProcess.exec;

const autoCommit = function(){
	childProcess = exec('c: && cd Users/mcx/Desktop/envisioncn/dream_par_stu_mob && dir', function(error, stdout, stderr){
	    if(error) {
	        console.error('error: ' + error);
	        return;
	    }
	    console.log('stdout: ' + stdout);
	});
	childProcess.on('exit', function (code, signal) { 
		console.log('子进程已退出，代码：' + code); 
	});
}


const workURl = '../../work/zhongan/20190722_463_1/src/main/resources/static/';

const cors = function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
};

gulp.task('connect', function(done) {
	connect.server({
		root: ['views', 'public', 'demo', '../express-app'],
		port: 3007,
		// host: 'localhost',
		// https: {
		// 	get: (function(){})
		// },
		middleware: function(connect, opt) {
			// console.log(opt);
			return [cors];
		},
		livereload: true
	});
	done();
});

gulp.task('jsmin', function(done){
	gulp.src(['./javascript/*.js'])
		.pipe(sourcemaps.init())
		.pipe(uglify({
			// mangle: true,//类型：Boolean 默认：true 是否修改变量名
			mangle: {except: ['require', 'exports', 'module', '$']} // 排除混淆关键字
		}))
		.pipe(sourcemaps.write())
		.pipe(rename(function(path){
			path.basename += '.min';
		}))
		.pipe(gulp.dest('./public/js/app'))
		.pipe(connect.reload());
	done();
});
gulp.task('less', function(done){
	gulp.src('./less/*.less')
		.pipe(less())
		.pipe(minify())
		.pipe(rename(function(path){
			path.basename += '.min';
		}))
		.pipe(gulp.dest('public/css'))
		.pipe(connect.reload());
	done();
});

gulp.task('html', function(done){
	gulp.src(['./views/*.html', './demo/*.html'])
		.pipe(connect.reload());
	done();
});

gulp.task('watch', function(done){
	gulp.watch('./javascript/*.js', gulp.parallel('jsmin'));
	gulp.watch('./less/*.less', gulp.parallel('less'));
	gulp.watch(['./views/*.html', './demo/*.html'], gulp.parallel('html'));
	gulp.watch([workURl + 'pages/fundsrouter/*.html', workURl + 'js/fundsrouter/*.js'], gulp.parallel('html'));
	done();
});

gulp.task('nodemon', function(){
	opn('http://localhost:3007');
	nodemon({
		script: './bin/www'
	})
});

gulp.task('server', gulp.series('watch', 'connect', 'nodemon', function(done){
	done()
}));


gulp.task('default', gulp.series('server', function(done){
	done();
}));

