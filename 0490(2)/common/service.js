import request from "./uni-request";
import store from '../store'
import api from "./api.js"

let $http = new request({
	//接口请求地址
	baseUrl: api.base,
	//服务器本地上传文件地址
	fileUrl: api.base,
	//设置请求头（如果使用报错跨域问题，可能是content-type请求类型和后台那边设置的不一致）
	header: {
		'Authorization': 'Bearer ' + uni.getStorageSync('token'),
		'content-type': 'application/json;charset=UTF-8'
	},
	//以下是默认值可不写
	//是否提示--默认提示
	isPrompt: true,
	//是否显示请求动画
	load: true,
	//是否使用处理数据模板
	isFactory: true
});

// 添加获取七牛云token的方法
$http.getQnToken = function(callback) {
	//该地址需要开发者自行配置（每个后台的接口风格都不一样）
	$http.get("api/kemean/aid/qn_upload").then(data => {
		/*
		 *接口返回参数：
		 *visitPrefix:访问文件的域名
		 *token:七牛云上传token
		 *folderPath:上传的文件夹
		 */
		callback({
			visitPrefix: data.visitPrefix,
			token: data.token,
			folderPath: data.folderPath
		});
	});
}

//当前接口请求数
let requestNum = 0;
//请求开始拦截器
$http.requestStart = function(options) {
	if (options.load) {
		if (requestNum <= 0) {
			//打开加载动画
			// uni.showLoading({
			// 	title: '加载中',
			// 	mask: true
			// });
		}
		requestNum += 1;
	}
	// 图片上传大小限制
	if (options.method == "FILE" && options.maxSize) {
		// 文件最大字节: options.maxSize 可以在调用方法的时候加入参数
		maxSize = options.maxSize;
		for (let item of options.files) {
			if (item.size > maxSize) {
				setTimeout(() => {
					uni.showToast({
						title: "图片过大，请重新上传",
						icon: "none"
					});
				}, 500);
				return false;
			}
		}
	}
	//请求前加入token
	let authorization = store.getters.authorization;
	if (authorization)
		options.header['Authorization'] = uni.getStorageSync('authorization') //authorization;

	return options;
}
//请求结束
$http.requestEnd = function(options, resolve) {
	//判断当前接口是否需要加载动画
	if (options.load) {
		requestNum = requestNum - 1;
		if (requestNum <= 0) {
			uni.hideLoading();
		}
	}
	if (resolve.errMsg && resolve.statusCode && resolve.statusCode > 300) {
		setTimeout(() => {
			uni.showToast({
				title: "网络错误，请检查一下网络",
				icon: "none"
			});
		}, 500);
	}
}
//登录弹窗次数
let loginPopupNum = 0;
//所有接口数据处理（可在接口里设置不调用此方法）
$http.dataFactory = function(res) {
	if (res.response.statusCode && res.response.statusCode == 200) {
		let data = res.response.data;
		let code = data.code;
		//判断数据是否请求成功
		if (data.code < 400) {
			// 返回正确的结果(then接受数据)
			let authorization = res.response.header.Authorization ? res.response.header.Authorization : res.response.header.authorization
			if (authorization) {
				store.commit('login', authorization);
			}
			res.resolve(data);
		} else {
			store.commit('logout')
			console.log(999)
			// #ifdef APP-PLUS
			uni.reLaunch({
				url: '/pages/login/login'
			})
			return;
			$http.member.info();
			// #endif
			return;
		}
	} else {
		// 返回错误的结果(catch接受数据)
		res.reject(res.response);
	}
}

let weichat = {
	oauth: async function() {
		return new Promise(func => {
			let _location = encodeURIComponent(api.h5_url)
			console.log('_location:', _location)
			var href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + api.appid + //data.appId + //wx53cfa21a6fb37682
				'&redirect_uri=' + _location +
				'&response_type=code&scope=snsapi_userinfo&state=wechat' + //data.state +
				'#wechat_redirec'
			window.location.href = href;
		})
	}
}

async function wxlogin() {
	return new Promise(func => {
		uni.login({
			provider: 'weixin',
			success: e => {
				func(e)
			}
		})
	})
};

async function jump(url) {
	return new Promise(func => {
		uni.reLaunch({
			url: url
		})
	});
}

//获取会员信息
$http.member = {
	isLogin: function() {
		let member_info = store.getters.info
		if (member_info.login == null) {
			return false
		}
		return true;
	},
	//获取会员基本登录信息
	info: async function() {
		//判断会员是否登录
		//let login = uni.getStorageSync('tologin');
		let member_info = store.getters.info

		if (member_info.login == null) { //如果会员未登录
			let isWechat = false;
			// #ifdef H5
			//isWechat = /micromessenger/i.test(navigator.userAgent || '');
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				isWechat = true;
			} else {
				// #ifdef APP-PLUS||H5
				// uni.reLaunch({
				// 	url: "/pages/login/login"
				// })
				return;
				// #endif
			}
			// console.log('isWechat:',isWechat)
			// #endif
			if (isWechat) {
				console.log(" 是来自微信内置浏览器")
				let reg = new RegExp('(^|&)code=([^&]*)(&|$)')
				//let r = window.location.hash.match(reg)
				let r = window.location.search.substr(1).match(reg)
				// console.log('r:',r)
				if (r != null) {
					let code = unescape(r[2])
					let res = await $http.get('wxlogin', {
						'code': code
					});
					if (res.code == 0) {
						await weichat.oauth()
					} else {
						if (res.info == "wechat") {
							console.log('没有绑定')
							/*uni.reLaunch({
								url: "/pages/login/bind?val=" + res.data.openid
							})*/
							uni.setStorageSync("openid", res.data.openid)
							await jump("/pages/login/bind?val=" + res.data.openid);
							
						} else { //已绑定 直接登录
							console.log('已绑定')
							uni.setStorageSync('token', res.data.token)
							uni.setStorageSync('authorization', 'Bearer ' + res.data.token)
							let info = store.getters.setAuthorization('Bearer ' + res.data.token)

							setTimeout(function() {
								return new Promise(function(resolve, reject) {
									resolve(info)
								});
							}, 1500)
						}
					}
				} else {
					weichat.oauth()
				}
			} else {
				// #ifdef MP-WEIXIN
				let ret = await wxlogin();
				console.log(ret, "ret");
				if (ret.errMsg == 'login:ok') {
					let e = await $http.get('code2Session', {
						'code': ret.code
					});
					//根据openid 后台获取关联账号
					// console.info(e.data)
					//使用code获取会员openid
					let res = await $http.get('wxapplogin', {
						'openid': e.data.openid
					});
					if (res.code == 1) {
						let info = store.getters.setAuthorization('Bearer ' + res.data.token)
						return new Promise(function(resolve, reject) {
							resolve(info)
						});
					} else {
						uni.reLaunch({
							url: "/pages/login/bind?type=wxapp&val=" + escape(e.data.session_key)
						})
					}
				}
				return new Promise(function(resolve, reject) {
					resolve(ret)
				});
				// #endif
			}
		}
		return new Promise(function(resolve, reject) {
			resolve(member_info)
		});
	},
	//获取会员ID，未绑定跳转绑定页面
	logout: function() {
		let login_type = null;

		// #ifdef H5
		if (/micromessenger/i.test(navigator.userAgent || '')) {
			login_type = '公众号';
		}
		// #endif
		// #ifdef MP-WEIXIN
		login_type = '微信小程序';
		// #endif
		login_type = null;
		if (login_type == null) {
			console.log('未绑定')
			store.commit('logout')
			uni.reLaunch({
				url: "/pages/login/login"
			})
		} else {
			setTimeout(() => {
				uni.showToast({
					title: login_type + '无法退出',
					icon: "none"
				});
			}, 500);
		}

	},
}

$http.api = api;

export default $http;
