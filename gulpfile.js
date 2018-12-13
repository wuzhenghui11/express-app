var gulp = require('gulp');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var minify = require('gulp-clean-css');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');
var yargs = require('yargs').argv;
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
const opn = require('opn');

var childProcess = require('child_process');
var exec = childProcess.exec;

var autoCommit = function(){
	childProcess = exec('c: && cd Users/mcx/Desktop/envisioncn/dream_par_stu_mob && dir', function(error, stdout, stderr){
	    if(error) {
	        console.error('error: ' + error);
	        return;
	    }
	    console.log('stdout: ' + stdout);
	})
	childProcess.on('exit', function (code, signal) { 
		console.log('子进程已退出，代码：' + code); 
	});
}

var workURl = '../../work/envision/campus_recruitment/dream_par_stu_mob/'

gulp.task('connect', function(done) {
	connect.server({
		root: ['views', 'public', 'demo', workURl],
		port: 3002,
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
	gulp.watch(['./views/*.html',
		'./demo/*.html',
		workURl + 'css/*.css',
		workURl + 'html/*.html',
		workURl + 'js/*.js'], gulp.parallel('html'));
	done();
});

gulp.task('express', function(){
	nodemon({
		script: './bin/www'
	})
});

gulp.task('server', gulp.series('watch', 'connect', function(done){
	opn('http://localhost:3002');
	done()
}));

/* gulp.task('childProcess', function(){
	exec('gulp -sw', function(err, stdout, stderr){
		if (err) throw err;
		console.log(stdout);
	});
}); */


gulp.task('default', gulp.series('server', function(done){
	// if(yargs.s){
	// 	console.log(11);
	// }
	// if(yargs.w){
	// 	console.log(22);
	// }
	done();
}));






