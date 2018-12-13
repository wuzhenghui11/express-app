$(function () {
    /* var viewport=document.querySelector("meta[name=viewport]");
	 * var wW=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	 * var hH=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	 * if(hH==460 && wW==320){
	 * 	viewport.setAttribute("content","width=device-width, initial-scale=0.5, minimum=1.0, maximum-scale=1.0, user-scalable=yes");
	 * }
	 * else{
	 *  viewport.setAttribute("content","width=device-width, initial-scale=1.0, minimum=1.0, maximum-scale=1.0, user-scalable=yes");
	 * }
	*/
    var _hmt = _hmt || [];
    function getQueryStrings() {
        var assoc = {};
        var decode = function (s) {
            return decodeURIComponent(s.replace(/\+/g, " "));
        };
        var queryString = location.search.substring(1);
        var keyValues = queryString.split('&');
        for (var i in keyValues) {
            var key = keyValues[i].split('=');
            if (key.length > 1) {
                assoc[decode(key[0])] = decode(key[1]);
            }
        }
        return assoc;
    }
    function is_weixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        }
        else {
            return false;
        }
    }
    var campaignEvent = "";
    var androidAppUrl = "";
    (function () {
        var qs = getQueryStrings();
        campaignEvent = qs["e"];
        if (campaignEvent) {
            var pairs = campaignEvent.split('_');
            if (pairs.length >= 3) {
                var campaignName = pairs[0];
                var channelName = pairs[1];
                var contentName = pairs[2];
                androidAppUrl = "androidapps/ioffice_" + channelName + ".apk";
                _hmt.push(['_trackEvent', 'campaign', 'fullname', campaignEvent]);
                _hmt.push(['_trackEvent', 'campaign', 'campaignName', campaignName]);
                _hmt.push(['_trackEvent', 'campaign', 'channelName', channelName]);
                _hmt.push(['_trackEvent', 'campaign', 'contentName', contentName]);
                // _hmt.push(['_setCustomVar', 1, 'campaignName', campaignName, 2]);
                // _hmt.push(['_setCustomVar', 1, 'channelName', channelName, 2]);
                // _hmt.push(['_setCustomVar', 1, 'contentName', contentName, 2]);
            }
        }
        else {
            campaignEvent = " ";
            androidAppUrl = "androidapps/ioffice_mobileSite.apk";
        }
        $("#container").on("click", function () {
            $("#container").css("display", "none");
            $('html, body').removeAttr("style");
        });
    })();
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
    if (browser.versions.wp) {
        $(".header").css({
            position: "absolute",
            left: "0",
            top: "0"
        });
    }
    //../androidapps/ioffice_mobileSite.apk
    var config = {
        iosHref: "https://appsto.re/cn/6Y7a0.i",
        iosWeixin: "http://a.app.qq.com/o/simple.jsp?pkgname=blueoffice.app",
        androidHref: androidAppUrl,
        wpHref: "http://www.windowsphone.com/en-us/store/app/%E9%9A%8F%E5%8A%9E-ioffice/3a383253-4e4a-4d19-961a-70e030f1524e"
    };
    $(".openApp").click(function () {
        if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
            if (is_weixin()) {
                $(this).prop({
                    "href": config.iosWeixin
                });
            }
            else {
                $(this).prop({
                    "href": config.iosHref
                });
                var ifr = document.createElement('iframe');
                ifr.src = 'ioffice100://';
                ifr.style.display = 'none';
                document.body.appendChild(ifr);
                window.setTimeout(function () {
                    document.body.removeChild(ifr);
                }, 3000);
            }
            _hmt.push(['_trackEvent', 'download', 'ios', campaignEvent]);
        }
        else if (browser.versions.android) {
            $(this).prop({
                "href": config.androidHref,
                "target": "_blank"
            });
            _hmt.push(['_trackEvent', 'download', 'android', campaignEvent]);
        }
        else if (browser.versions.wp) {
            $(this).prop({
                "href": config.wpHref,
                "target": "_blank"
            });
            _hmt.push(['_trackEvent', 'download', 'wp', campaignEvent]);
        }
        else {
            $(".downLoadBox").fadeIn();
        }
    });
    $(".ios_dl").click(function () {
        _hmt.push(['_trackEvent', 'download', 'ios', campaignEvent]);
    });
    $(".android_dl").click(function () {
        _hmt.push(['_trackEvent', 'download', 'android', campaignEvent]);
    });
    $(".wp_dl").click(function () {
        _hmt.push(['_trackEvent', 'download', 'wp', campaignEvent]);
    });
	
	var preventDefault = function (e) {
        e.preventDefault();
    }
    var startX = 0, startY = 0, direction = null;
    var slide = document.getElementById("slide");
    var $slide_show = $("#slide_show");
	var publicObj = { // 公共对象
        index: 0,
        _scale: (620 / 685).toFixed(2),
        _slideW: 0,
        _slideFun: function (i) {// 滑动方法以及延迟加载
            var $curLi = $slide_show.find("li").eq(i);
			$curLi.addClass("curLiShow");
			if(i > this.index){
				$slide_show.finish().animate({
					"left": -this._slideW + "px"
				},"normal", function () {
					$curLi.siblings().removeClass("curLiShow");
					$slide_show.css("left",0);
					$curLi.find(".title").addClass("animate");
					$curLi.siblings().find(".title").removeClass("animate");
					$curLi.addClass("curLiShow");
					$curLi.find("img.lazy").lazyload({
						effect: "show",
						container: $slide_show
					});
				});
			}
			else{
				$slide_show.css("left",-this._slideW + "px");
				$slide_show.finish().animate({
					"left": 0
				},"normal", function () {
					$curLi.siblings().removeClass("curLiShow");
					$curLi.find(".title").addClass("animate");
					$curLi.siblings().find(".title").removeClass("animate");
					$curLi.addClass("curLiShow");
					$curLi.find("img.lazy").lazyload({
						effect: "show",
						container: $slide_show
					});
				});
			}
			this.index = i;
        },
        wpPop: function () {// 点击功能弹出框的位置及大小
			var windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            this._slideW = windowW;
			if (browser.versions.wp) {
                windowH = windowH - 90;
                $(".slide-box").css({
                    "position": "absolute",
                    "left": "0",
                    "top": "90px"
                });
                $(".itd_page").css({
                    "height": windowH + "px"
                });
                $(".phoneSite").css({
                    "width": windowW + "px",
                    "height": windowH + "px",
                    "overflow": "hidden"
                });
                $(".head .downLoad").show();
            }
        },
        leftMin: function () {// 滑动判断
			var i = this.index + 1;
            if (i > 12) {
                i = 0;
            }
            this._slideFun(i);
        },
        rightMax: function () {// 滑动判断
			var i = this.index - 1;
            if (i < 0) {
                i = 12;
            }
            this._slideFun(i);
        },
        funAuto: function () {// 功能弹出框的大小适应
			var windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            if (!browser.versions.wp && !browser.versions.android && !(browser.versions.ios || browser.versions.iPhone || browser.versions.iPad)) {
                windowW = (windowW > 960) ? 960 : windowW;
            }
            this._slideW = windowW;
            $(".itd_page,#slide_show li").css({
                "width": windowW + "px"
            });
            $slide_show.css({
                "width": windowW * 13 + "px",
                "left": 0 + "px"
            });
            var imgHeight = $(".itd_page").find(".content").height();
            var imgWidth = Math.round(imgHeight * this._scale);
            if (windowW > windowH) {
                $(".itd_page .fun_pic").css({
                    "height": imgHeight + "px",
                    "width": imgWidth + "px",
                    "marginRight": 0
                });
            }
            else {
                imgHeight = imgHeight - 220;
                imgWidth = Math.round(imgHeight * this._scale);
                $(".itd_page .fun_pic").css({
                    "height": imgHeight + "px",
                    "width": imgWidth + "px",
                    "marginRight": -(imgWidth / 2) + "px"
                });
            }
        },
        dlShow: function () {// 导航栏下载按钮的显示方式
            if ($(window).scrollTop() > 295) {
                $(".head .downLoad").css("display", "block");
            }
            else {
                if (!browser.versions.wp) {
                    $(".head .downLoad").css("display", "none");
                }
            }
        },
        closeSlide: function () {//滑动关闭按钮方法
            $(".slide-box").hide();
            $slide_show.find("li").find(".title").removeClass("animate");
			$slide_show.find("li").removeClass("curLiShow");
            this.dlShow();
			document.removeEventListener("touchmove", preventDefault, false);
        }
    };
	
    var touchStart = function (e) {
        var touch = e.touches[0];
        var x = Number(touch.pageX);
        var y = Number(touch.pageY);
        startY = y;
        startX = x;
    }
    var touchMove = function (e) {
        e.preventDefault();
        var touch = e.touches[0];
        var x = Number(touch.pageX);
        var y = Number(touch.pageY);
        if (Math.abs(x - startX) > Math.abs(y - startY)) {
            if (x - startX < 0) {
                direction = true;
            }
            else {
                direction = false;
            }
        }
    }
    var touchEnd = function () {
        if (direction) {
            publicObj.leftMin();
        }
        else if (direction == false) {
            publicObj.rightMax();
        }
        direction = null;
    }
    slide.addEventListener("touchmove", touchMove, false);
    slide.addEventListener("touchend", touchEnd, false);
    slide.addEventListener("touchstart", touchStart, false);
	
    $(".itd_page .left").click(function () {
        publicObj.rightMax();
    });
    $(".itd_page .right").click(function () {
		publicObj.leftMin();
    });
    $(".downLoadBox").mouseleave(function () {
        $(this).fadeOut();
    });
    var funTop = $(".tit").offset().top;
    var conTop = $(".last").offset().top;
    $(".head .logo,.head .home,.pop .home").click(function () {
        $("body,html").animate({
            scrollTop: 0
        });
        $(".pop").slideUp();
        $(".phoneSite").removeAttr("style");
        publicObj.closeSlide();
    });
    $(".head .fun,.pop .fun").click(function () {
        $("body,html").animate({
            scrollTop: (funTop - 107) + "px"
        });
        $(".pop").slideUp();
        $(".phoneSite").removeAttr("style");
        publicObj.closeSlide();
    });
    $(".head .con,.pop .con").click(function () {
        $("body,html").animate({
            scrollTop: conTop + "px"
        });
        $(".pop").slideUp();
        $(".phoneSite").removeAttr("style");
        publicObj.closeSlide();
    });
    $(".nav").on("click", "a", function () {
        $(this).addClass("cur").siblings().removeClass("cur");
    });
    $(".navPack_wrap,.pop .curClose").click(function () {
        $(".pop").slideToggle();
    });
    $(".fun_mod").on("click", ".fun", function () {
        $(".slide-box").show();
        $(".head .downLoad").css("display", "block");
        $(".head .nav a.fun").addClass("cur").siblings().removeClass("cur");
        var className = $(this).prop("className").toString();
        publicObj.index = (className.substr(11) - 1);
		document.addEventListener("touchmove", preventDefault, false);
        publicObj.wpPop();
        publicObj.funAuto();
		$slide_show.find("li").eq(publicObj.index).addClass("curLiShow");
        $slide_show.find("li").eq(publicObj.index).find("img.lazy").lazyload({
            effect: "show",
            container: $slide_show
        });
        $slide_show.find("li").eq(publicObj.index).find(".title").addClass("animate");
    });
    $(".itd_page .closeWrap").click(function () {
        $(".head .nav a.home").addClass("cur").siblings().removeClass("cur");
        $(".phoneSite").removeAttr("style");
        publicObj.closeSlide();
    });
    $(window).resize(function () {
        if ($(".navPack_wrap").css("display") == "none"){
            $(".pop").removeAttr("style");
        }
        publicObj.funAuto();
    }).trigger("resize");
    $(window).scroll(function () {
        publicObj.dlShow();
    }).trigger("scroll");
});