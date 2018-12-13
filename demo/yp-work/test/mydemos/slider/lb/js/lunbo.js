var lunbo= (function(){
	var switchMethod={
		slide:function(className,index){
			$(className).stop();
			var slidLiWidth=$(className+" li").eq(0).width();
			$(className).animate({
				"left":-index*slidLiWidth+"px"
			},800);
		},
		slideTB:function(className,index){
			$(className).stop();
			$(className).removeClass("fadeIn");
			$(className).addClass("slideTB");
			var slidLiHeight=$(className+" li").eq(0).height();
			$(className).animate({
				"top":-index*slidLiHeight+"px"
			});
		},
		fadeIn:function(className,index){
			$(className+" li").stop();
			$(className).removeClass("slidTB");
			$(className).addClass("fadeIn");
			$(className+" li").eq(index).fadeIn(1000).siblings().fadeOut(1000);
		}
	}
	var methodSelect=function(m){
		var method;
		if(m=="slide"){
			method=switchMethod.slide;
		}
		else if(m=="slideTB"){
			method=switchMethod.slideTB;
		}
		else{
			method=switchMethod.fadeIn;
		}
		return method;
	}
	var defaultConfig={
		containerID:"",			//容器传值唯一性
		scroll:"",				//滑动
		page:"",				//不传则不显示页码
		runMethod:"slide",		//slide左右,slideTB上下,fadeIn淡入
		auto:true,				//是否自动切换默认true自动切换
		lrShow:"hade",			//方式fadeIn淡入,show永久显示,hade不显示
		delay:3000,				//切换间隔
		count:5					//数目
	}
	//构造函数(初始化)
	var ScrollTrans=function(config){
		var self=this;
		if(!(self instanceof ScrollTrans)){
			return new ScrollTrans(config);
		}
		self.container=config.containerID;
		self.scroll=config.scroll;
		self.page=config.page;
		self.runMethod=methodSelect(config.runMethod);
		self.auto=config.auto;
		self.lrShow=config.lrShow;
		self.delay=config.delay;
		self.count=config.count;
		self.index=0;
		self.timer=null;
	}
	ScrollTrans.prototype={
		addNav:function(){
			var self=this;
			var str=""
			for(var i=0;i<self.count;i++){
				if(i==0){
					str+="<li class='cur'>"+(i+1)+"</li>";
				}
				else{
					str+="<li>"+(i+1)+"</li>";
				}
			}
			$(self.container+" "+self.page).html(str);
			$(self.container+" "+self.page+" li").on("mouseover",function(){
				$(this).addClass("cur").siblings().removeClass("cur");
				self.index=$(this).index();
				self.runMethod(self.container+" "+self.scroll,self.index);
			});
		},
		autoRun:function(){
			var self=this;
			clearTimeout(self.timer);
			$(self.container+" "+self.page+" li").eq(self.index).addClass("cur").siblings().removeClass("cur");
			self.runMethod(self.container+" "+self.scroll,self.index);
			self.timer=setTimeout(function(){
				self.index++;
				if(self.index==self.count){
					self.index=0;
				}
				self.autoRun();
			},self.delay);
		},
		hover:function(){
			var self=this;
			if(self.lrShow=="fadeIn"){
				$(self.container).mouseenter(function(){
					$(self.container+" .prev,"+self.container+" .next").fadeIn();
				});
				$(self.container).mouseleave(function(){
					$(self.container+" .prev,"+self.container+" .next").fadeOut();
				});
			}
			else if(self.lrShow=="show"){
				$(self.container+" .prev,"+self.container+" .next").show();
			}
			else{
				$(self.container+" .prev,"+self.container+" .next").hide();
			}
			$(self.container).mouseenter(function(){
				clearTimeout(self.timer);
			});
			$(self.container).mouseleave(function(){
				self.autoRun();
			});
		},
		prev:function(){
			var self=this;
			self.index--;
			if(self.index<0){
				self.index=self.count-1;
			}
			$(self.container+" "+self.page+" li").eq(self.index).addClass("cur").siblings().removeClass("cur");
			self.runMethod(self.container+" "+self.scroll,self.index);
		},
		next:function(){
			var self=this;
			self.index++;
			if(self.index==self.count){
				self.index=0;
			}
			$(self.container+" "+self.page+" li").eq(self.index).addClass("cur").siblings().removeClass("cur");
			self.runMethod(self.container+" "+self.scroll,self.index);
		}
	}
	return {
		start:function(config){
			var newConfig=$.extend(defaultConfig,config);
			var st=ScrollTrans(newConfig);
			if(st.page){
				st.addNav();
			}
			if(st.auto){
				st.autoRun();
			}
			st.hover();
			if(st.lrShow=="show" || st.lrShow=="fadeIn"){
				$(st.container+" .prev").click(function(){
					st.prev();
				});
				$(st.container+" .next").click(function(){
					st.next();
				});
			}
		}
	}
})();