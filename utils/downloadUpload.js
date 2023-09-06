export const upload = async () => {
    if (!this.action && this.action === '') return
    let formData = new FormData()
    formData.append('file', this.choiceFile, this.choiceFile.name)
    for (let [key, value] of Object.entries(this.data)) {
        formData.append(key, value)
    }

    let result = null
    this.loading = true
    await this.$http.post(this.action, formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((data) => {
        if (data.status === 200) {
            result = data
        } else {
            this.$message.error(data.massage)
        }
    }).catch((e) => {
        console.error(e)
    }).finally(() => {
        this.loading = false
    })
    return result
}

export const download = (arrayBuffer, name, type = 'application/vnd.ms-excel', extension = 'xlsx') => {
    const blob = new Blob([arrayBuffer], { type })
    const fileName = `${name}.${extension}`
    if ('download' in document.createElement('a')) { // 非IE下载
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
    } else { // IE10+下载
        navigator.msSaveBlob(blob, fileName)
    }
}


// ios和android判断
(function(doc, win){
    function is_weixin() {
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
    var weixin = doc.querySelector(".weixin"),
        ios = doc.querySelector(".ios"),
        android = doc.querySelector(".android");
    // 微信
    if(is_weixin()){
        weixin.style.display = "block";
        weixin.addEventListener("click",function(){
            weixin.style.display = "none";
        },false);
        ios.setAttribute("href","");
        android.setAttribute("href","");
    }
    // 非微信
    else{
        /*if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad){
            win.location.href = "https://itunes.apple.com/cn/app/qu-cha-che/id1081298479?l=zh&ls=1&mt=8"; // IOS下载地址
        }
        else if (browser.versions.android){
            win.location.href = "http://download.7chache.com:8080/quchache.apk"; // Android下载地址
        }
        ios.setAttribute("href","https://itunes.apple.com/cn/app/qu-cha-che/id1081298479?l=zh&ls=1&mt=8");
        android.setAttribute("href","http://download.7chache.com:8080/quchache.apk");*/
    }
    win.addEventListener("touchstart",function(){},false);
})(document, window);

