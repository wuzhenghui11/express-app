require.config({
	baseUrl:'js/lib', // 根目录
	paths:{
		jquery:'jquery-1.11.3.min',
		Jquery_ui:'jquery-ui.min',
		backbone:'backbone-1.1.2.min',
		underscore:'underscore',
		localStorage:'backbone.localStorage-min',
		ajaxUpload:'ajaxUpload',
		lazyLoad:'lazyLoad',
		bootstrap:'bootstrap.min',
		angular:'angular',
		cookie:'jquery.cookie',
		metrojs:'MetroJs',
		JSXTransformer:'JSXTransformer',
		react:'react',
		zclip:'jquery.zclip.min',
		raphael:'Raphael.2.1.2.min',
		kinetic:'kinetic/kinetic-v5.1.0.min',
		slider:'js/app/slider'
	},
	shim:{
		'backbone':{
			deps:['underscore', 'jquery'], // 依赖关系
			exports:'backbone' // 标识
		},
		'underscore':{
			exports:'_'
		},
		'backboneLocalStorage':{
			deps:['backbone', 'underscore'],
			exports:'localStorage'
		},
		'zclip':{
			deps:['jquery'],
			exports:'zclip'
		},
		'raphael':{
			exports:'raphael'
		},
		'JSXTransformer':{
			deps:['react']
		}
	}
});







