const gulp = require('gulp')
const uglify = require('gulp-uglify')
const less = require('gulp-less')
const sourcemaps = require('gulp-sourcemaps')
const minify = require('gulp-clean-css')
const rename = require('gulp-rename')
const nodemon = require('gulp-nodemon')
// const yargs = require('yargs').argv
// const livereload = require('gulp-livereload')
// const concat = require('gulp-concat')
const connect = require('gulp-connect')
const path = require('path')
const opn = require('opn')

const process = require('node:process')

function resolve(dir) {
  return path.join(__dirname, '/', dir)
}

// 工作目录静态文件等有变动则处理后导出到其他地址
// const workBasePath = '../../work/zhongan/20190722_463_1/src/main/resources/static/'
// const workPath = [workPupPath + 'pages/fundsrouter/*.html', workPupPath + 'js/fundsrouter/*.js']

// js地址
const jsFilePath = [resolve('public/js/common/*.js')]
// less文件地址
const lessFilePath = resolve('public/less/*.less')
// html文件地址
const htmlFilePath = [resolve('views/*.html'), resolve('views/**/*.html'), resolve('dist/*.html'),]

const outPutPath = {
	js: resolve('assets'),
	css: resolve('assets'),
}

// 处理less
gulp.task('lessTask', function(done){
	gulp.src(lessFilePath)
		.pipe(less())
		.pipe(minify())
		.pipe(rename(function(path){
			path.basename += '.min'
		}))
		.pipe(gulp.dest(outPutPath.css))
		.pipe(connect.reload())
	done()
})
// 处理JS
gulp.task('jsminTask', function(done){
	gulp.src(jsFilePath)
		.pipe(sourcemaps.init())
		.pipe(uglify({
			// mangle: true,//类型：Boolean 默认：true 是否修改变量名
			mangle: {except: ['require', 'exports', 'module', '$']} // 排除混淆关键字
		}))
		.pipe(sourcemaps.write())
		.pipe(rename(function(path){
			path.basename += '.min'
		}))
		.pipe(gulp.dest(outPutPath.js))
		.pipe(connect.reload())
	done()
})
// html reload
gulp.task('htmlTask', function(done){
	gulp.src(htmlFilePath)
		.pipe(connect.reload())
	done()
})

// 监听文件 执行不同任务
gulp.task('watchTask', function(done){
	gulp.watch(jsFilePath, gulp.parallel('jsminTask'))
	gulp.watch(
		lessFilePath,
		gulp.parallel('lessTask')
	)
	gulp.watch(htmlFilePath, gulp.parallel('htmlTask'))
	// gulp.watch(workPath, gulp.parallel('htmlTask'))
	done()
})

// const childProcess = require('child_process')
// const exec = childProcess.exec

// const autoCommit = function(){
// 	const command = 'c: && cd Users/mcx/Desktop/envisioncn/dream_par_stu_mob && dir'
// 	childProcess = exec(command, function(error, stdout, stderr){
// 	    if(error) {
// 	        console.error('error: ' + error)
// 	        return
// 	    }
// 	    console.log('stdout: ' + stdout)
// 	})
// 	childProcess.on('exit', function (code, signal) { 
// 		console.log('子进程已退出，代码：' + code) 
// 	})
// }

// 请求相应头
const cors = function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	next()
}

gulp.task('connectTask', function(done) {
	const defaultDir = ['views', 'public', 'assets', '../express-app']
	if (process.env.STATIC_DIR === 'dist') {
		defaultDir.unshift('dist')
	}
	console.log(defaultDir)
	connect.server({
		name: 'aa',
		root: defaultDir,
		port: 3007,
		middleware: function(connect, opt) {
			return [cors]
		},
		livereload: true
	})
	done()
})

gulp.task('nodemonTask', function (done) {
	nodemon({
		watch: ['./gulpfile.js', './routes/*.js', './routes/**/*.js'],
		script: './bin/www.js'
	})
	// 3006 是node express
	// 3007 是gulp的服务
	// opn('http://localhost:3007')
	done()
})

gulp.task(
	'default',
	gulp.series('watchTask', 'connectTask', 'nodemonTask', function (done) {
		done()
	})
)

