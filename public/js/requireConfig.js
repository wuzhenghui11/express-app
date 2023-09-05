require.config({
	baseUrl: 'public/js/library', // 根目录
	paths:{
		jquery: 'jquery',
		backbone: 'backbone',
		underscore: 'underscore',
	},
	shim:{
		'backbone': {
			deps: ['underscore', 'jquery'], // 依赖关系
			exports: 'backbone' // 标识
		},
		'underscore': {
			exports: '_'
		},
	}
});







