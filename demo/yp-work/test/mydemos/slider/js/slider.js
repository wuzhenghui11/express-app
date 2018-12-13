$.fn.extend({
	slider:function(obj){
		var elem = this,
			index = 0,
			start,
			sliderBoxWidth,
			switchBox = elem.find(".slider"),
			sliderBtn = elem.find(".slider_navbtn");
		
		// 默认配置
		var config = {
			container:"#slider_box",
			auto:true,
			switchTime:600,
			interval:3000,
			width:"auto",
			size:1
		};
		if(obj){
			$.extend(config, obj);
		}
		config.size = switchBox.children().length;
		if(config.size < 2 || !$.cssHooks){ // 如果只有一张图
			if(!$.cssHooks){
				throw("jQuery 1.4.3+ is needed for this plugin to work");
			}
			return;
		}
		var styleSupport = function(prop){
			var vendorProp, supportedProp,
				properties = ["Moz", "Webkit", "ms", "O"],
				propertiesLength = properties.length,
				capProp = prop.charAt(0).toUpperCase() + prop.slice(1),
				div = document.createElement("div");
			if(prop in div.style){
				supportedProp = prop;
			}
			else{
				for(var i = 0; i < propertiesLength; i++){
					vendorProp = properties[i] + capProp;
					if(vendorProp in div.style){
						supportedProp = vendorProp;
						break;
					}
				}
			}
			div = null;
			$.support[prop] = supportedProp; // 判断是否支持某些属性（transition）
			return supportedProp;
		}
		
		// cssHookS
		var transition = styleSupport("transition");
		$.cssHooks["transition"] = {
			get:function(elem, computed, extra){
				return $.css(elem, transition);
			},
			set:function(elem, value){
				elem.style[transition] = value;
			}
		}
		
		var translate = function(d,p){
			switchBox.css({
				"transition":"transform " + d + "ms",
				"transform":"translate3d(" + p + "px,0,0)"
			});
		}
		;(function(s,w){
			// 判断宽度
			if(w != "auto"){
				sliderBoxWidth = parseInt(w);
				var sliderWidth = s * sliderBoxWidth;
				elem.width(sliderBoxWidth);
				switchBox.width(sliderWidth).children().width(sliderBoxWidth);
			}
			else{
				$(window).resize(function(){
					sliderBoxWidth = $(window).width();
					sliderBoxWidth = (sliderBoxWidth < 320) ? 320 : sliderBoxWidth;
					var sliderWidth = s * sliderBoxWidth;
					elem.width(sliderBoxWidth);
					switchBox.width(sliderWidth).children().width(sliderBoxWidth);
					var positionX = -index * sliderBoxWidth;
					if($.support.transition){
						translate(0,positionX);
					}
					else{
						switchBox.css("left", positionX + "px");
					}
				}).trigger("resize");
			}
			// 添加滑动导航
			var liStr = "<ul>";
			for(var i = 0; i < config.size; i++){
				if(i == 0){
					liStr += "<li class='active'></li>";
				}
				else{
					liStr += "<li></li>";
				}
			}
			liStr += "</ul>";
			sliderBtn.html(liStr);
		})(config.size,config.width);
		// 滑动方式
		var switchWay = {
			slide:function(i){
				var range = -i * sliderBoxWidth;
				if($.support.transition){
					translate(config.switchTime,range);
				}
				else{
					switchBox.animate({"left":range + "px"},config.switchTime);
				}
			}
		}
		// 圆点click事件的方法
		var navLi = function(i){
			sliderBtn.find("ul li").eq(i).addClass("active").siblings().removeClass("active");
		}
		// 为圆点添加click事件
		sliderBtn.find("ul").on("click","li",function(){
			index = $(this).index();
			switchWay.slide(index);
			navLi(index);
		});
		// 自动播放方法
		var autoSlide = function(){
			start = setTimeout(function(){
				index++;
				if(index>config.size-1){
					index = 0;
				}
				switchWay.slide(index);
				navLi(index);
				autoSlide();
			},config.interval);
		}
		if(config.auto){
			autoSlide();
			elem.mouseenter(function(){
				if(!startX){
					clearTimeout(start);
				}
			});
			elem.mouseleave(function(){
				if(!startX){
					autoSlide();
				}
			});
		}
		// 手机浏览器的滑动事件
		
		if(window.addEventListener){
			var slider = document.querySelector(config.container);
			var startTime,startX,startY,slidingDistance,direction = null;
			
			var touchStart = function(e){
				e.preventDefault();
				if(start){
					clearTimeout(start);
				}
				translate(0, -index*sliderBoxWidth);
				var touch = e.touches[0];
				var x = Number(touch.pageX);
				var y = Number(touch.pageY);
				startTime = new Date();
				startX = x;
				startY = y;
				slider.addEventListener("touchmove", touchMove, false);
				slider.addEventListener("touchend", touchEnd, false);
			}
			var touchMove = function(e){
				if(e.touches.length > 1 || e.scale && e.scale !== 1){
					return;
				}
				var touch = e.touches[0];
				if((new Date() - startTime) > 100){
				var x = Number(touch.pageX);
				var y = Number(touch.pageY);
				slidingDistance = Math.abs(x - startX);
				// 确定是左右滑动
				if(Math.abs(x - startX) > Math.abs(y - startY)){
					e.preventDefault();
					if(x - startX < 0){
						direction = true; // 图片向左滑动
					}
					else{
						direction = false; // 图片向右滑动
					}
					translate(0,-index*sliderBoxWidth+(x-startX));
				}
				}
			}
			var touchEnd = function(){
				var duration = new Date() - startTime;
				if(config.auto){
					autoSlide();
				}
				// 触摸时间小于250毫秒...
				if(Number(duration) < 250 && slidingDistance > 20 || slidingDistance > sliderBoxWidth/2){
					if (direction) {
						index++;
						if(index > config.size-1){
							index = 0;
						}
						switchWay.slide(index);
						navLi(index);
					}
					else if(direction == false){
						index--;
						if(index < 0){
							index = config.size-1;
						}
						switchWay.slide(index);
						navLi(index);
					}
					direction = null;
				}
				else{
					translate(config.switchTime,-index*sliderBoxWidth);
				}
				slider.removeEventListener("touchmove", touchMove, false);
				slider.removeEventListener("touchend", touchEnd, false);
			}
			slider.addEventListener("touchstart", touchStart, false);
		}
	}
});