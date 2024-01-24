(function (doc, win) {
	var docEl = doc.documentElement,
	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	recalc = function () {
	  var clientWidth = docEl.clientWidth;
	  if (!clientWidth) return;
	  docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
	};

	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


const setCookie = function (key, value, date) {
	document.cookie = `${key}=${value}`
}

function isWeixin (){ //判断是否是微信浏览器
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
			return true;
	} else {
			return false;
	}
}


/*<div class="scratch_card" :class="[hasPrize === null ? '' : (hasPrize ? 'winPrize' : 'noPrize')]"
	ref="scratchCardBox">
	<canvas class="canvas" ref="scratchCardCanvas"></canvas>
	.scratch_card{
		margin: 0 auto 1.173rem;
		width: 18.21rem;
		height: 5.556rem;
		border-radius: 0.494rem;
		font-size: 0.988rem;
		font-weight: 500;
		color: rgba(0, 0, 0, 0.2);
		line-height: 2.593rem;
		text-align: center;
		background: transparent url('~@/asset/img/beckoning/scratch_card01.png') no-repeat left top/100% 100%;
		.canvas{
			border-radius: 0.333333rem;
			background-color: transparent;
			padding: 0;
			border: 0;
			position: relative;
			z-index: 2;
		}
	}
</div>*/
// 刮刮卡
function scratchCardCanvasInit() {
	let scratchCardCanvas = this.$refs.scratchCardCanvas;
	let scratchCardCtx = scratchCardCanvas.getContext('2d');
	let scratchCardBox = this.$refs.scratchCardBox;

	let offsetLeft = scratchCardCanvas.offsetLeft;
	let offsetTop = scratchCardCanvas.offsetTop;

	let scratchCardImg = new Image();
	scratchCardImg.src = scratchCardPic1;

	scratchCardCanvas.width = scratchCardBox.offsetWidth + 2;
	scratchCardCanvas.height = scratchCardBox.offsetHeight + 2;

	let touchMove = (event) => {
		event.preventDefault();
		let e = event.changedTouches[event.changedTouches.length - 1];
		let x = (e.clientX + window.scrollX || e.pageX) - offsetLeft || 0;
		let y = (e.clientY + window.scrollY || e.pageY) - offsetTop || 0;
		scratchCardCtx.beginPath()
		scratchCardCtx.arc(x, y, 16, 0, Math.PI * 2);
		scratchCardCtx.fill();
	}

	scratchCardCanvas.addEventListener('touchmove', touchMove, false);

	scratchCardCanvas.addEventListener('touchstart', (event) => {
		event.preventDefault();
		window.publicMethods.jumpToAppStore('springFestival').then(() => {
			if (
				Number.parseInt(this.$store.state.user.setSpringFestivalTimeStamp) <= 1587830400000 &&
				Number.parseInt(this.$store.state.user.setSpringFestivalTimeStamp) >= 1582732800000
			) {
				Toast('请于4月26日参与抽奖');
				scratchCardCanvas.removeEventListener('touchmove', touchMove);
				return;
			}
			if (!this.isSendDrawLottery) {
				this.isSendDrawLottery = true;
				this.lotteryFunc();
			}
		}).catch((e) => {
			scratchCardCanvas.removeEventListener('touchmove', touchMove);
		});
	}, false);
	scratchCardImg.addEventListener('load', () => {
		scratchCardCtx.drawImage(scratchCardImg, -1, -1, scratchCardBox.offsetWidth + 2, scratchCardBox.offsetHeight + 2);
		// 在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。
		scratchCardCtx.globalCompositeOperation = 'destination-out';
	});
}

// 整数验证
// { pattern: /^[\+\-]?[0-9](\d+)?$/, message: '请输入整数', trigger: 'blur'}]">

// 2020-04-17 21:06:00 可用dayjs或者其它
function timestampFormat(date) {
	let d = new Date(date);
	let YY = d.getFullYear();
	let MM = d.getMonth() + 1;
	let DD = d.getDate();
	let hh = d.getHours();
	let mm = d.getMinutes();
	let ss = d.getSeconds();
	MM = MM < 10 ? `0${MM}` : MM;
	DD = DD < 10 ? `0${DD}` : DD;
	hh = hh < 10 ? `0${hh}` : hh;
	mm = mm < 10 ? `0${mm}` : mm;
	ss = ss < 10 ? `0${ss}` : ss;
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 移除url query 或某个参数 部分
 * @param  {[String]} val    url 地址
 * @param  {[Array|String]}  fields 只想移除其中的某个参数
 * @return {[String]}        移除后的url
 */
function searchParams(val, fields) {
	let search = location.href.split('?')[1];
	if (!search) return;
	search = (search.split('#')[1]) ? search.split('#')[0] : search;
	let arr = search.split('&');
	// let arr = `& + ${search}`.match(/[?&][^?&]+=[^?&]+/g);
	let obj = {};
	if (arr) {
		arr.forEach((item) => {
			let tempArr = item.substring(1).split('=');
			obj[tempArr[0]] = tempArr[1];
		});
	}
	// 去掉某个url
	let searchStr = '?';
	for (let {key, value} in Object.entries(obj)) {
		searchStr += (searchStr === '?') ? '' : '&';
		searchStr += `${key}=${value}`;
	}

	let url;
	let urlArr = location.href.split('?');
	if (urlArr[0].split('#')[1] || !urlArr[1].split('#')[1]) {

		url = `${urlArr[0]}${searchStr}`;

	} else if (urlArr[1].split('#')[1]) {

		url = `${urlArr[0]}${searchStr}${urlArr[1].split('#')[1]}`;

	}
	window.history.replaceState({}, '', url);
}
/**
 * 将字符串处理成md5
 */
function md5(md5str) {
	var createMD5String = function (string) {
		var x = Array()
		var k, AA, BB, CC, DD, a, b, c, d
		var S11 = 7,
			S12 = 12,
			S13 = 17,
			S14 = 22
		var S21 = 5,
			S22 = 9,
			S23 = 14,
			S24 = 20
		var S31 = 4,
			S32 = 11,
			S33 = 16,
			S34 = 23
		var S41 = 6,
			S42 = 10,
			S43 = 15,
			S44 = 21
		string = uTF8Encode(string)
		x = convertToWordArray(string)
		a = 0x67452301
		b = 0xEFCDAB89
		c = 0x98BADCFE
		d = 0x10325476
		for (k = 0; k < x.length; k += 16) {
			AA = a
			BB = b
			CC = c
			DD = d
			a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478)
			d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756)
			c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB)
			b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE)
			a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF)
			d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A)
			c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613)
			b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501)
			a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8)
			d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF)
			c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1)
			b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE)
			a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122)
			d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193)
			c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E)
			b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821)
			a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562)
			d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340)
			c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51)
			b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA)
			a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D)
			d = GG(d, a, b, c, x[k + 10], S22, 0x2441453)
			c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681)
			b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8)
			a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6)
			d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6)
			c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87)
			b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED)
			a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905)
			d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8)
			c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9)
			b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A)
			a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942)
			d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681)
			c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122)
			b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C)
			a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44)
			d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9)
			c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60)
			b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70)
			a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6)
			d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA)
			c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085)
			b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05)
			a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039)
			d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5)
			c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8)
			b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665)
			a = II(a, b, c, d, x[k + 0], S41, 0xF4292244)
			d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97)
			c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7)
			b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039)
			a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3)
			d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92)
			c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D)
			b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1)
			a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F)
			d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0)
			c = II(c, d, a, b, x[k + 6], S43, 0xA3014314)
			b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1)
			a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82)
			d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235)
			c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB)
			b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391)
			a = addUnsigned(a, AA)
			b = addUnsigned(b, BB)
			c = addUnsigned(c, CC)
			d = addUnsigned(d, DD)
		}
		var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)
		return tempValue.toLowerCase()
	}
	var rotateLeft = function (lValue, iShiftBits) {
		return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
	}
	var addUnsigned = function (lX, lY) {
		var lX4, lY4, lX8, lY8, lResult
		lX8 = (lX & 0x80000000)
		lY8 = (lY & 0x80000000)
		lX4 = (lX & 0x40000000)
		lY4 = (lY & 0x40000000)
		lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF)
		if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8)
		if (lX4 | lY4) {
			if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8)
			else return (lResult ^ 0x40000000 ^ lX8 ^ lY8)
		} else {
			return (lResult ^ lX8 ^ lY8)
		}
	}
	var F = function (x, y, z) {
		return (x & y) | ((~x) & z)
	}
	var G = function (x, y, z) {
		return (x & z) | (y & (~z))
	}
	var H = function (x, y, z) {
		return (x ^ y ^ z)
	}
	var I = function (x, y, z) {
		return (y ^ (x | (~z)))
	}
	var FF = function (a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac))
		return addUnsigned(rotateLeft(a, s), b)
	}
	var GG = function (a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac))
		return addUnsigned(rotateLeft(a, s), b)
	}
	var HH = function (a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac))
		return addUnsigned(rotateLeft(a, s), b)
	}
	var II = function (a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac))
		return addUnsigned(rotateLeft(a, s), b)
	}
	var convertToWordArray = function (string) {
		var lWordCount
		var lMessageLength = string.length
		var lNumberOfWordsTempOne = lMessageLength + 8
		var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64
		var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16
		var lWordArray = Array(lNumberOfWords - 1)
		var lBytePosition = 0
		var lByteCount = 0
		while (lByteCount < lMessageLength) {
			lWordCount = (lByteCount - (lByteCount % 4)) / 4
			lBytePosition = (lByteCount % 4) * 8
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition))
			lByteCount++
		}
		lWordCount = (lByteCount - (lByteCount % 4)) / 4
		lBytePosition = (lByteCount % 4) * 8
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition)
		lWordArray[lNumberOfWords - 2] = lMessageLength << 3
		lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29
		return lWordArray
	}
	var wordToHex = function (lValue) {
		var WordToHexValue = '',
			WordToHexValueTemp = '',
			lByte, lCount
		for (lCount = 0; lCount <= 3; lCount++) {
			lByte = (lValue >>> (lCount * 8)) & 255
			WordToHexValueTemp = '0' + lByte.toString(16)
			WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2)
		}
		return WordToHexValue
	}
	var uTF8Encode = function (string) {
		string = string.toString().replace(/\x0d\x0a/g, '\x0a')
		var output = ''
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n)
			if (c < 128) {
				output += String.fromCharCode(c)
			} else if ((c > 127) && (c < 2048)) {
				output += String.fromCharCode((c >> 6) | 192)
				output += String.fromCharCode((c & 63) | 128)
			} else {
				output += String.fromCharCode((c >> 12) | 224)
				output += String.fromCharCode(((c >> 6) & 63) | 128)
				output += String.fromCharCode((c & 63) | 128)
			}
		}
		return output
	}
	return createMD5String(md5str)
}

// axios 封装
const httpRequest = axios.create({
	baseURL: 'chinese-new-year',
});
httpRequest.interceptors.request.use(function() {

}, function() {

});
httpRequest.interceptors.response.use(function() {

}, function() {

});
export const fetch = (httpParams) => {
	return new Promise((resolve, reject) => {
		httpRequest(httpParams).then(response => {
			resolve(response);
		}).catch(error => {
			Notify({
				type: 'warning',
				message: '网络异常'
			});
			reject(error);
		});
	});
}

function deepCopy(arr) {
  let obj = Array.isArray(arr) ? [] : {};
  for (let item in arr) {
    if (
      typeof arr[item] === "object" &&
      arr[item] != null &&
      !(arr[item] instanceof Date)
    ) {
      obj[item] = deepCopy(arr[item]);
    } else {
      obj[item] = arr[item];
    }
  }
  return obj;
}

/**
 * 表单查询 将起始日期数字转化为两个字段 有起始日期
 */
daterangeArrConversionStartDateAndEndDate (dateArr = []) {
  let startDate = '', endDate = ''
  if (Array.isArray(dateArr) && dateArr[0] !== '') {
    endDate = this.$day(dateArr[1]).format('YYYY-MM-DD')
    startDate = this.$day(dateArr[0]).format('YYYY-MM-DD')
  }
  return {
    startDate,
    endDate
  }
}

function submitSearchForm() {
	let params = Object.assign({}, this.searchForm, this.paging);
	daterangeArrConversionStartDateAndEndDate(params.startDate);
	params.startDate = daterange.startDate
    params.endDate = daterange.endDate

	this.tableLoading = true;
	queryList({
		...params
	}).then(({ data }) => {
		if (data.code == '000000' || data.code == '301000') {
			this.tableData = data.data.list;
			this.paging.total = Number.parseInt(data.data.resultPageParam.total);
		} else {
			this.$Message.error(data.description);
		}
		this.tableLoading = false;
	}).catch(() => {
		this.tableLoading = false;
	});
}

/**
 * 从其次的参数对象中拷贝第一个目标参数对象自身有的属性（浅拷贝）
 * @param  ([Object|..Object]);
 * @return 第一个参数对象
 */
const copyOwn = function (...args) {
	if (!args.length) return;

	let target = args[0];
	let obj = Object.assign({}, ...args.slice(1));

	for (let key in target) {
		if (obj[key]) {
			target[key] = obj[key]
		}
	}
	return target
}

/**
 * 两个日期框 的 日期范围验证 validate
 */
 export default function daterangeValidator (rule, value, callback) {
	if (value === '') {
		callback(new Error('请选择'))
	} else if (
		rule.field === 'startDate' &&
		this.searchForm.endDate !== '' &&
		value > this.searchForm.endDate
	) {
		callback(new Error('始日不能大于止日'))
	} else if (
		rule.field === 'endDate' &&
		this.searchForm.startDate !== '' &&
		value < this.searchForm.startDate
	) {
		callback(new Error('止日不能小于始日'))
	} else if (
		Array.isArray(value) &&
		((value[0] === '' && value[1] === '') || !value.length)
	) {
		callback(new Error('请选择'))
	} else {
		callback()
	}
}



/**
 * 千分位分隔符
 */
export default function thousandsSep(num) {
	num = (num || 0).toString()
	let pre = num[0] == '-' ? '-' : ''
	let arr = num.split('.')
	let result = arr[1] ? ('.' + arr[1]) : ''
	num = pre ? arr[0].substr(1) : arr[0]

	while (num.length > 3) {
		result = ',' + num.slice(-3) + result
		num = num.slice(0, num.length - 3)
	}

	if (num) {
		result = pre + num + result
	}

	return result
}


export function warning (valid: boolean, message: string) {
	// Support uglify
	if (process.env.NODE_ENV !== 'production' && !valid && console !== undefined) {
	  	console.error(`Warning: ${message}`)
	}
}
  
export function warningWithoutKey (treeData: TreeNode[], fieldNames: FieldNames) {
const keys: Map<string, boolean> = new Map()

function dig (list: TreeNode[], path = '') {
	(list || []).forEach(treeNode => {
		const key = treeNode[fieldNames.key as string]
		const children = treeNode[fieldNames.children as string]
		warning(
			key !== null && key !== undefined,
			`Tree node must have a certain key: [${path}${key}]`
		)

		const recordKey = String(key)
		warning(
			!keys.has(recordKey) || key === null || key === undefined,
			`Same 'key' exist in the Tree: ${recordKey}`
		)
		keys.set(recordKey, true)

		dig(children, `${path}${recordKey} > `)
		})
	}

	dig(treeData)
}
  
  

