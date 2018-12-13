require.config({
	baseUrl: 'js/lib', // 根目录
	paths:{
		jquery: 'jquery',
		backbone: 'backbone',
		underscore: 'underscore',
		ajaxUpload: 'ajaxUpload',
		angular: 'angular',
		cookie: 'jquery.cookie',
		metrojs: 'MetroJs',
		JSXTransformer: 'JSXTransformer',
		react: 'react',
		zclip: 'jquery.zclip',
		raphael: 'Raphael',
		vue: 'vue',
		vuex: 'vuex'
	},
	shim:{
		'vue': {
			exports: 'Vue'
		},
		'backbone': {
			deps:['underscore', 'jquery'], // 依赖关系
			exports:'backbone' // 标识
		},
		'underscore': {
			exports:'_'
		},
		'backboneLocalStorage': {
			deps:['backbone', 'underscore'],
			exports:'localStorage'
		},
		'zclip': {
			deps:['jquery'],
			exports:'zclip'
		},
		'raphael': {
			exports:'raphael'
		},
		'JSXTransformer': {
			deps:['react']
		}
	}
});







