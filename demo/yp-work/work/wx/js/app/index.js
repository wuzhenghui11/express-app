(function(doc,win){
	var isImages = function(data){
		var Images = " ";
		if(data.Images !== "[]"){
			var Images = data.Images.slice(),
				l = Images.length,
				str = " ";
			for(var i=0;i<l;i++){
				if(i>0 && i<l-1){
					str += Images[i];
				}
			}
			Images = "<div class='slide_box' id='slide_box'>" +
				"<ul class='slide'><li class='active'>" +
					"<img src='http://10.1.1.4:8003/imghub/3092340B-5667-492D-0000-000000000000/timing/" + str + "_5_0_0.jpg' />" +
				"</li></ul>" +
				"<ul class='circle'></ul>" +
				"</div>";
			
		}
		return Images;
	}
	var Participants = function(data){
		var str = "",
			Participants = data.Participants.length;
		for(var i=0;i<Participants;i++){
			str += "<li><img src='http://10.1.1.4:8003/imghub/3092340B-5667-492D-0000-000000000000/timing/" + data.Participants[i].User.Portrait + "_2_75_75.jpg' /></li>";
		}
		return {
			length:Participants,
			str:str
		};
	}
	var url = "js/app/data.json";
	// "http://10.1.1.4:9001/ShiJuService/Parties/105B0C88-EB2A-441E-BA80-5C445C0703C7?";
	var getData = function(){
		$.ajax({
			type: "GET",
			url: url,
			// data: "userId=00000000000000000000000000000000",
			success:function(d){
				var data = {
    "Code": 0,
    "Description": "Succeeded",
    "Party": {
        "Id": "105b0c88eb2a441eba805c445c0703c7",
        "CreatorUserId": "e2ea50633cb74cc5b3be9cd8c1022a16",
        "Sponsor": "",
        "BeginTime": "2015-10-15 05:01:00",
        "EndTime": "2015-10-16 03:59:00",
        "Title": "中午去吃饭！",
        "Description": "去那边吃生煎",
        "Address": "上海大世界",
        "Images": "[]",
        "Kind": "4",
        "MaxUserCount": 0,
        "DirectFriendVisible": true,
        "IsPublic": false,
        "LikeCount": 1,
        "CommentCount": 43,
        "VoteTitle": "吃饭时间",
        "VoteChoicesJson": "[{\"ImageId\":\"00000000000000000000000000000000\",\"Text\":\"中午ABCc123十二点\",\"Position\":0},{\"ImageId\":\"00000000000000000000000000000000\",\"Text\":\"上午十一点半\",\"Position\":1},{\"ImageId\":\"00000000000000000000000000000000\",\"Text\":\"中午十二点半\",\"Position\":2},{\"ImageId\":\"00000000000000000000000000000000\",\"Text\":\"下午一点！\",\"Position\":3}]",
        "VoteResult0Count": 1,
        "VoteResult1Count": 0,
        "VoteResult2Count": 1,
        "VoteResult3Count": 0,
        "VoteResult4Count": 0,
        "IsDisabled": false,
        "CreatedTime": "2015-10-15 03:02:00",
        "IsUserLiked": false,
        "IsUserVoted": false,
        "CreatorUser": {
            "Id": "e2ea50633cb74cc5b3be9cd8c1022a16",
            "Status": 0,
            "PhoneNumber": "13916842184",
            "NickName": "黄东胜",
            "Signature": "我就是我，不一样的自己！",
            "Portrait": "ca6271b13da874e1c1ed910f70d24083",
            "Gender": 2
        },
        "Participants": [
            {
                "UserId": "8a705b918fe4406ca20c825ad55ca5e2",
                "Status": 1,
                "ProposedBeginTime": "2015-10-15 00:59:37",
                "ProposedEndTime": "2015-10-15 03:00:12",
                "User": {
                    "Id": "8a705b918fe4406ca20c825ad55ca5e2",
                    "NickName": "AndyHuang",
                    "Portrait": "ccd8036ee173559bdfadd69d20bdc621"
                }
            },
            {
                "UserId": "c96af5bb424a4eb7a05491912607c5ae",
                "Status": 1,
                "ProposedBeginTime": "2015-10-15 05:01:08",
                "ProposedEndTime": "2015-10-16 03:59:12",
                "User": {
                    "Id": "c96af5bb424a4eb7a05491912607c5ae",
                    "NickName": "minmin",
                    "Portrait": "74f93126322e3b4cd6a608cee261976b"
                }
            }
        ],
        "PartyComments": [
            {
                "Id": "f934a5b2fd8d4bf3be5547ba6bedbe86",
                "Text": "咯啦咯啦咯看看",
                "AudioJson": "{\"AudioId\":\"00000000000000000000000000000000\",\"AudioTime\":0}",
                "VoteResult": "",
                "CreatedTime": "2015-10-15 08:54:05",
                "User": {
                    "Id": "8a705b918fe4406ca20c825ad55ca5e2",
                    "NickName": "AndyHuang",
                    "Portrait": "ccd8036ee173559bdfadd69d20bdc621"
                }
            },
            {
                "Id": "ac916a85d50b4764818b79e2968a59a7",
                "Text": "寂寞吗啦啦啦",
                "AudioJson": "{\"AudioId\":\"00000000000000000000000000000000\",\"AudioTime\":0}",
                "VoteResult": "",
                "CreatedTime": "2015-10-15 08:45:36",
                "User": {
                    "Id": "8a705b918fe4406ca20c825ad55ca5e2",
                    "NickName": "AndyHuang",
                    "Portrait": "ccd8036ee173559bdfadd69d20bdc621"
                }
            },
            {
                "Id": "ca45731336e0426c8b307b5f5c0b40d6",
                "Text": "我噢噢噢哦哦",
                "AudioJson": "{\"AudioId\":\"00000000000000000000000000000000\",\"AudioTime\":0}",
                "VoteResult": "",
                "CreatedTime": "2015-10-15 05:44:34",
                "User": {
                    "Id": "8a705b918fe4406ca20c825ad55ca5e2",
                    "NickName": "AndyHuang",
                    "Portrait": "ccd8036ee173559bdfadd69d20bdc621"
                }
            },
            {
                "Id": "e8664ea8ffba4997a907ae6c6063461d",
                "Text": "我噢噢噢哦哦",
                "AudioJson": "{\"AudioId\":\"00000000000000000000000000000000\",\"AudioTime\":0}",
                "VoteResult": "",
                "CreatedTime": "2015-10-15 00:00:00",
                "User": {
                    "Id": "8a705b918fe4406ca20c825ad55ca5e2",
                    "NickName": "AndyHuang",
                    "Portrait": "ccd8036ee173559bdfadd69d20bdc621"
                }
            }
			,
            {
                "Id": "de25200cc34d4416968a2cd2bb507eeb",
                "Text": "噢噢噢哦哦",
                "AudioJson": "{\"AudioId\":\"00000000000000000000000000000000\",\"AudioTime\":0}",
                "VoteResult": "",
                "CreatedTime": "2015-10-15 23:50:25",
                "User": {
                    "Id": "8a705b918fe4406ca20c825ad55ca5e2",
                    "NickName": "AndyHuang",
                    "Portrait": "ccd8036ee173559bdfadd69d20bdc621"
                }
            }
        ]
    }
}
				data = data.Party;
				var htmlTemplate = [isImages(data),
				"<div class='article'>",
					"<div class='share_p'>",
						"<span class='photo'><img src='http://10.1.1.4:8003/imghub/3092340B-5667-492D-0000-000000000000/timing/" + data.CreatorUser.Portrait + "_2_75_75.jpg' /></span>",
						"<p>发起人</p>",
						"<span class='name'>" + data.CreatorUser.NickName + "</span>",
					"</div>",
					"<article>" + data.Description + "</article>",
				"</div>",
				"<div class='info'>",
					"<div class='date'><i class='icon'></i><span>" + data.BeginTime + "</span> — <span>" + data.EndTime + "</span></div>",
					"<div class='address'><i class='icon'></i><span>" + data.Address + "</span></div>",
					"<div class='people'><i class='icon'></i><span>期望人数 x</span><span class='number'>" + data.MaxUserCount + "</span></div>",
				"</div>",
				"<div class='join_p'>",
					"<a class='more' href='javascript:;' ></a>",
					"<div class='join_num'>参与者 x<span>" + Participants(data).length + "</span></div>",
					"<div class='p_photo'><ul>" + Participants(data).str + "</ul></div>",
				"</div>"].join("");
				$(".theme_content .title").find("h2").text(data.Title);
				$(".theme_content .middle").html(htmlTemplate);
				$(".toolbar .number").text(data.LikeCount);
				if(data.Description == " "){
					$(".article").find("article").hide();
				}
				else{
					$(".article").find("article").show();
				}
				if(data.Address == ""){
					$(".address").hide();
				}
				else{
					$(".address").show();
				}
				$(".theme_content .middle .more").click(function(){
					$(this).toggleClass("moveRotate");
					$(".theme_content .middle .join_p .p_photo").toggleClass("heightAuto");
				});
				$(".vote_content").find("h2").text(data.VoteTitle);
				var VoteChoicesJson = $.parseJSON(data.VoteChoicesJson),
					voteLen = VoteChoicesJson.length,
					voteStr = " ",
					abc = ["A", "B", "C", "D", "E"];
				for(var k = 0; k<voteLen; k++){
					voteStr += "<li><b>" + abc[k] + "</b><span>" + VoteChoicesJson[k].Text + "</span></li>";
				}
				$(".vote_content .option_c").find("ul").html(voteStr);
				var $optionPicture = $(".vote_content .option").find("img");
				switch (voteLen){
					case 3:
						$optionPicture.prop("src","images/o_three.png");
						break;
					case 4:
						$optionPicture.prop("src","images/o_four.png");
						break;
					case 5:
						$optionPicture.prop("src","images/o_five.png");
						break;
					default:
						$(".vote").hide();
						$(".vote_content").hide();
				}
				// 投票
				$(".comment .number").text(data.PartyComments.length);
				var PartyComments = data.PartyComments.length;
				if(PartyComments == 0){
					$(".no_comment").show();
				}
				else{
					$(".no_comment").hide();
					PartyComments = (PartyComments>5) ? 5 : PartyComments;
					var commentStr = " ";
					for(var i=0;i<PartyComments;i++){
						var year = parseInt(data.PartyComments[i].CreatedTime.substr(0,4)),
							month = parseInt(data.PartyComments[i].CreatedTime.substr(5,2)) - 1,
							day = parseInt(data.PartyComments[i].CreatedTime.substr(8,2)),
							hours = parseInt(data.PartyComments[i].CreatedTime.substr(11,2)),
							minutes = parseInt(data.PartyComments[i].CreatedTime.substr(14,2)),
							seconds = parseInt(data.PartyComments[i].CreatedTime.substr(17,2)),
							ts = (new Date()) - (new Date(year, month, day, hours, minutes, seconds)),
							dd = parseInt(ts/1000/60/60/24,10),
							hh = parseInt(ts/1000/60/60%24,10),
							mm = parseInt(ts/1000/60%60,10);
						if(dd > 0){
							commentStr += "<dl>" +
										"<dt><span><img src='http://10.1.1.4:8003/imghub/3092340B-5667-492D-0000-000000000000/timing/" + data.PartyComments[i].User.Portrait + "_2_75_75.jpg'></span></dt>" +
										"<dd><span class='name'>" + data.PartyComments[i].User.NickName + "</span><span class='time'><b>" + dd + "</b>天前</span><p>" + data.PartyComments[i].Text + "</p></dd>" +
										"</dl>";
						}
						else if(hh > 0){
							commentStr += "<dl>" +
										"<dt><span><img src='http://10.1.1.4:8003/imghub/3092340B-5667-492D-0000-000000000000/timing/" + data.PartyComments[i].User.Portrait + "_2_75_75.jpg'></span></dt>" +
										"<dd><span class='name'>" + data.PartyComments[i].User.NickName + "</span><span class='time'><b>" + hh + "</b>小时前</span><p>" + data.PartyComments[i].Text + "</p></dd>" +
										"</dl>";
						}
						else{
							commentStr += "<dl>" +
										"<dt><span><img src='http://10.1.1.4:8003/imghub/3092340B-5667-492D-0000-000000000000/timing/" + data.PartyComments[i].User.Portrait + "_2_75_75.jpg'></span></dt>" +
										"<dd><span class='name'>" + data.PartyComments[i].User.NickName + "</span><span class='time'><b>" + mm + "</b>分钟前</span><p>" + data.PartyComments[i].Text + "</p></dd>" +
										"</dl>";
						}
					}
					$(".comm_list").html(commentStr);
				}
			}
		});
		setTimeout(function(){
			getData();
		},60000);
	}
	getData();
	// 单击事件
	var scrollTop;
	var scrollTop;
    var noScroll = function () {
        scrollTop = $(window).scrollTop();
        $("body,html").css({
            "overflow": "hidden",
            "width": "100%",
            "height": "100%"
        });
    }
    var autoScroll = function () {
        $("body,html").css({
            "overflow": "auto",
            "width": "auto",
            "height": "auto"
        });
        $(window).scrollTop(scrollTop);
    }
	$(".comm_btn,.toolbar,.option img").click(function(){
		noScroll();
		$(".prompt").addClass("proShow");
	});
	$(".prompt .close").click(function(){
		autoScroll();
		$(".prompt").removeClass("proShow");
	});
	$(".sign_up").click(function(){
		if (true) {// 有时聚账号和微信号并且两个账号是相同的
            noScroll();
        }
        /*else if(2){
            // 有微信号和时聚号 但，是分别的两个账号

        }
        else if (3) {
            // 有微信号没有时聚号，用微信号注册时聚并报名
        }*/
	});
	
	var w,$slideBox = $("#slide_box");
	var is_weixin = function() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        }
        else {
            return false;
        }
    }
	var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {// 移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, // IE内核
                presto: u.indexOf('Presto') > -1, // opera内核
                webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
                mac: u.indexOf('Mac OS X') > -1,// 是否为Mac OS X
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), // 是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, // 是否iPad
                webApp: u.indexOf('Safari') == -1, // 是否web应该程序，没有头部与底部
                wp: u.indexOf("Windows Phone") > -1// 是否为winPhone
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
	
	if(!is_weixin()){
		if(browser.versions.ios || browser.versions.iPhone || browser.versions.iPad){
			window.location = "https://appsto.re/cn/6Y7a0.i";
		}
		else if(browser.versions.android){
			window.location = "http://m.ioffice100.com";
		}
		
	}
	
	$(window).load(function(){
		w = $slideBox.width();
	});
	
	var docEl = doc.documentElement,
	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	recalc = function () {
		var clientWidth = docEl.clientWidth;
		if (!clientWidth) return;
		var fontSize=20 * (clientWidth / 640);
		docEl.style.fontSize = fontSize + "px"; // (fontSize>20) ? 20 + 'px' : (fontSize + 'px');
	};
	if (!doc.addEventListener) return;
		win.addEventListener(resizeEvt, recalc, false);
		doc.addEventListener('DOMContentLoaded', recalc, false);
		doc.body.addEventListener('touchstart', function(){}, false);
		
	$(window).resize(function(){
		w = $slideBox.width();
	}).trigger("resize");

	var showHide = function(ele,elec){
		if(!ele || !elec){
			return;
		}
		$(elec).slideToggle();
		ele.toggleClass("arrow_rot");
	}
	$(".theme_arrow").click(function(){
		var ele = $(this).find(".arrow");
		var elec = $(".theme_content");
		showHide(ele,elec);
	});
	$(".vote_arrow").click(function(){
		var ele = $(this).find(".arrow");
		var elec = $(".vote_content");
		showHide(ele,elec);
	});
	$(".comm_arrow").click(function(){
		var ele = $(this).find(".arrow");
		var elec = $(".comm_content");
		showHide(ele,elec);
	});
	$("#dl_app").click(function(){
		if(is_weixin()){
			$(".dl_prompt").show();
		}
		else{
			if(browser.versions.ios || browser.versions.iPhone || browser.versions.iPad){
				$(this).prop({
                    "href": "http://m.ioffice100.com"
                });
                /*var ifr = document.createElement('iframe');
                ifr.src = 'ioffice100://';
                ifr.style.display = 'none';
                document.body.appendChild(ifr);
                window.setTimeout(function () {
                    document.body.removeChild(ifr);
                }, 3000);*/
			}
			else if(browser.versions.android){
				$(this).prop({
                    "href": "http://m.ioffice100.com"
                });
			}
		}
	});
	$(".dl_prompt").click(function(){
		$(this).hide();
	});
	/* 
	if(is_weixin() && android){
		noScroll();
		$(".ad_error").show();
	}
	var index = 0;
	var num = $slideBox.find(".slide").find("li").length;
	var addLi = function(num){
		if(num > 1){
			var str = "";
			for(var i=0; i<num; i++){
				if(i == 0){
					str += "<li class='cur'></li>";
				}
				else{
					str += "<li></li>";
				}
			}
			$(".slide_box .circle").html(str);
		}
	}*/
	/*var slider = function(i){
		var $curSlide = $slideBox.find(".slide");
		if(i > index){
			index = i;
			$curSlide.find("li").eq(index).addClass("active");
			$curSlide.finish().animate({
				"left":-w + "px"
			},"normal",function(){
				$curSlide.find("li").eq(index).siblings().removeClass("active");
				$curSlide.css("left",0);
			});
		}
		else{
			index = i;
			$curSlide.find("li").eq(index).addClass("active");
			$curSlide.css("left",-w + "px").finish().animate({
				"left":0
			},"normal",function(){
				$curSlide.find("li").eq(index).siblings().removeClass("active");
				$curSlide.css("left",0);
			});
		}
		$(".slide_box .circle").find("li").eq(index).addClass("cur").siblings().removeClass("cur");
	}*/
	
	// 为slider原点绑定事件
	/*$(".slide_box .circle").on("click","li",function(){
		slider($(this).index());
	});*/
	
	// 活动图滑动
	/* var isRight = function(i){
		i--;
		if(i < 0){
			i = num-1;
		}
		slider(i);
		
	}
	var isLeft = function(i){
		i++;
		if(i > num-1){
			i = 0;
		}
		slider(i);
	}
	var slideBox = document.getElementById("slide_box");
	var startX, startY, direction = null; 
	var touchStart = function(e){
		var touch = e.touches[0];
		var x = Number(touch.pageX);
		var y = Number(touch.pageY);
		startY = y;
		startX = x;
		index = $slideBox.find(".circle .cur").index();
		slideBox.addEventListener("touchmove", touchMove, false);
	    slideBox.addEventListener("touchend", touchEnd, false);
	}
	var touchMove = function(e){
		var touch = e.touches[0];
		var x = Number(touch.pageX);
		var y = Number(touch.pageY);
		var moveSize = x-startX;
		if(Math.abs(x-startX) > Math.abs(y-startY)){
			if(x - startX < 0){
				e.preventDefault();
				direction = 1;
			}
			else{
				e.preventDefault();
				direction = 0;
			}
		}
	}
	var touchEnd = function(){
		if(direction == 1){
			isLeft(index);
		}
		else if(direction == 0){
			isRight(index);
		}
		else{
			return;
		}
		direction = null;
		slideBox.removeEventListener("touchmove", touchMove, false);
		slideBox.removeEventListener("touchend", touchEnd, false);
	}
	slideBox.addEventListener("touchstart", touchStart, false);*/
})(document, window);
	