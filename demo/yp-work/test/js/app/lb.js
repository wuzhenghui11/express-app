define(['jquery'],function(){
	function getId(id){
		return document.getElementById(id);
	}
	function getTag(root,tag){
		return (root || document).getElementsByTagName(tag);
	}
	function currentStyle(elem){
		return elem.currentStyle || document.defaultView.getComputedStyle(elem,null);
	}
	function extend(obj1,obj2){
		for(var i in obj2){
			obj1[i]=obj2[i];
		}
		return obj1;
	}
	function each(arr,callback){
		for(var i=0;i<arr.length;i++){
			callback(arr[i],i);
		}
	}
	function setOpacity(elem,level){
		if(elem.filters){
			elem.style.filter="alpha(opacity="+level+")";
		}
		else{
			elem.style.opacity=level/100;
		}
	}
	//默认配置
	var defaultConfig={
		outside:"",
		inside:"",
		slide:"",
		nav:"",
		navEvent:"",
		auto:true,
		lrbtn:true,
		changeMethod:"",
		count:null
	}
	//切换方式
	var scrollMethod={
		index:0,
		slide:function(elem,i){
			$(elem).animate({
				left:-i*610+"px"//要改进同过js获取计算宽度
			});
		},
		slideTB:function(elem,i){
			getId(elem).find("li").css("clear","both");
			getId(elem).animate({
				top:-i*205+"px"
			});
		},
		fadeout:function(elem,i){
			var d=this.index;
			setOpacity(getTag(elem,"li")[d],100);
			for(var j=0;j<=20;j++){
				(function(){
					var show=j*5;
					var hide=100-j*5;
					setTimeout(function(){
						setOpacity(getTag(elem,"li")[d],hide);
						setOpacity(getTag(elem,"li")[i],show);
					},j*25);
				})();
			}
			this.index=i;
		}
	}
	//根据配置选择哪种方式
	var whatMethod=function(method,s){
		var hasMethod;
		if(method=="slide"){
			hasMethod=scrollMethod.slide;
		}
		else if(method=="slideTB"){
			hasMethod=scrollMethod.slideTB;
		}
		else if(method=="fadeout"){
			for(var i=1;i<getTag(s,"li").length;i++){//每次点击需要重新设置position不好
				getTag(s,"li")[i].style.position="absolute";
				setOpacity(getTag(s,"li")[i],0);
			}
			hasMethod=scrollMethod.fadeout;
		}
		else{
		
		}
		return hasMethod;
	}
	//构造函数(初始化)
	var scrollTrans=function(config){
		var self=this;
		if(!(self instanceof scrollTrans)){
			return new scrollTrans(config);
		}
		self.config=config;
		self.navEvent=self.config.navEvent;
		self.outside=getId(self.config.outside);
		self.inside=getId(self.config.inside);
		self.slide=getId(self.config.slide);
		self.nav=getId(self.config.nav);
		if(!(self.outside && self.inside && self.slide && self.nav)){
			return;
		}
		self.lrbtn=self.config.lrbtn;
		self.auto=self.config.auto;
		self.index=0;
		self.timer=null;
		self.runMethod=whatMethod(self.config.changeMethod,self.slide);
		self.count=self.config.count;
	}
	scrollTrans.prototype={
		autoRun:function(){
			var self=this;
			clearTimeout(self.timer);
			self.timer=setTimeout(function(){
				getTag(self.nav,"li")[self.index].className="";
				self.index++;
				if(self.index==self.count){
					self.index=0;
				}
				self.runMethod(self.slide,self.index);
				getTag(self.nav,"li")[self.index].className="cur";
				self.autoRun();
			},3000);
		},
		addNav:function(){
			var self=this;
			var navArr=[];
			var frag=document.createDocumentFragment();
			for(var i=0;i<self.count;i++){
				(navArr[i]=frag.appendChild(document.createElement("li"))).innerHTML=i+1;
			}
			self.nav.appendChild(frag);
			getTag(self.nav,"li")[0].className="cur";
			each(navArr,function(n,i){
				n[(self.navEvent==1) ? "onclick" : "onmouseover"]=function(){
					getTag(self.nav,"li")[self.index].className="";
					n.className="cur";
					if(self.index!=i){
						$("#"+self.config.slide).stop();
						self.runMethod(self.slide,i);
					}
					self.index=i;
				}
			});
		},
		hover:function(a,b){//hover事件
			var self=this;
			self.outside.onmouseover=function(){
				if(b){
					getId("prev").style.display="block";
					getId("next").style.display="block";
				}
				if(a){
					clearTimeout(self.timer);
				}
			};
			self.outside.onmouseout=function(){
				if(b){
					getId("prev").style.display="none";
					getId("next").style.display="none";
				}
				if(a){
					self.timer=setTimeout(function(){
						self.autoRun();
					},3000);
				}
			};
		},
		prev:function(){
			var self=this;
			getTag(self.nav,"li")[self.index].className="";
			self.index--;
			if(self.index<0){
				self.index=self.count-1;
			}
			getTag(self.nav,"li")[self.index].className="cur";
			self.runMethod(self.slide,self.index);
		},
		next:function(){
			var self=this;
			getTag(self.nav,"li")[self.index].className="";
			self.index++;
			if(self.index==self.count){
				self.index=0;
			}
			getTag(self.nav,"li")[self.index].className="cur";
			self.runMethod(self.slide,self.index);
		}
	};
	return {
		scroll:function(config){
			var newConfig=extend(defaultConfig,config);//合并对象
			var st=scrollTrans(newConfig);//传入合并后的对象，方法返回当前的实例
			st.addNav();
			st.hover(st.auto,st.lrbtn);	
			if(st.lrbtn){
				getId("prev").onclick=function(){
					st.prev();
				};
				getId("next").onclick=function(){
					st.next();
				};
			}
			if(st.auto){
				st.autoRun();				
			}
		}
	}
});