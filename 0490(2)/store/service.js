const config = {
	verify: 5, //手机验证码位数控制
	version: "1.0.00", //系统版本号
	langtype: 0, //默认语言下标，与下面的 language 方法相关
	ios: '', //苹果app下载地址
	android: '', //安卓app下载地址
	appname: '诗涧书画院', //APP名字
	uploadtype: 1,
	invite: 0, //邀请码状态，0：非必填，1：必填
	segm:'*'
}

const User_paw = function(user, paw) {
	let User_paw = []
	User_paw.push(user)
	User_paw.push(paw)
	uni.setStorageSync('User_paw', User_paw)
	// return User_paw
}

const Memory = function(memory) {
	uni.setStorageSync('memory', memory)
}

const language = [{
	id: 'zh-cn',
	name: '中文',
	code: 'chn',
}, {
	id: 'en-us',
	name: 'English',
	code: 'eng',
}];

const root = 'http://www.sz-photography.cn'; //'';//
// const root = 'http://0490.hhw778.com'; //'';//
const api = {
	root: 'http://www.sz-photography.cn',
	// http://rr0532.8396048.com
	login: {
		//: root + "",//
		login: root + "/api/login", // 登录
		wechat: root + "/api/login/wxlogin",//微信登录
		register: root + "/api/register", // 注册
		code: root + "/api/code", // 获取验证码
		bind: root + "/api/bind", // 绑定手机号
		forget: root + "/api/member/index/ForgetPassword", // 忘记密码
		info: root + "info", // logo

	},
	card: {
		//: root + "",//
		packageList: root + "/api/unicom/application/packageList", // 套餐列表
		jobNumber: root + "/api/unicom/application/getJobNumber", // 获取工号
		applyCard: root + "/api/unicom/application/accountOpenApply", // 开户申请
		applyNumber: root + "/api/unicom/application/jobNumberApply", // 申请工号

	},
	rice: {
		rice: root + "/api/unicom/application/getRice", // 米粒数量
		riceDetail: root + "/api/unicom/application/riceLog", // 米粒转出明细
		cashDetail: root + "/api/unicom/application/cash", // 米粒转出到余额
		already: root + "/api/member/index/myCreditList", // 已结算
	},
	mobile: {
		getMobile: root + "/api/unicom/application/getMobile", // 我的手机号
	},
	upload: {
		uploadImg: root + "/api/sms_store/order/uploadImg", // 上传付款凭证
		image: root + "/api/member/index/upload", // 上传图片
		recharge: root + "/api/member/Index/PostCredit", // 积分充值
		withdrawal: root + "/api/member/Index/WithdrawalCredit",//积分提现
		give: root + "/api/member/Index/Give",//转让积分
		userinfo: root + "/api/member/index/updateUserInfo",//更改会员信息
		code: root + "/api/code",//获取验证码
		register: root + "/api/register",//注册
		update: root + "/api/member/index/updateUserInfo",//
		bindMobile: root + "/api/member/index/bindMobile",//绑定手机号
		level: root + "/api/team_range/Agent/TeamRangeLevel",//获取所有等级
		logout: root + "/api/logout",//退出登录
	},
	group: {
		groupList: root + "/api/groups/home/info", // 拼团列表展示
		categroy: root + "/api/groups/goods/categroy", // 分类列表
		teaming: root + "/api/groups/goods/teaming", // 正在进行中的团
		goodsList: root + "/api/groups/goods/list", // 拼团商品列表
		goodsInfo: root + "/api/groups/goods/goodsInfo", // 拼团商品详情
		confirmDetail: root + "/api/groups/order/confirmDetail", // 拼团下订单数据确认
		confirm: root + "/api/groups/order/confirm", // 确认下单
		payDetail: root + "/api/sms_store/order/payInfo", // 订单支付详情
		pay: root + "/api/sms_store/order/pay", // 支付手续费
		list: root + "/api/groups/order/list", // 订单列表
		teams: root + "/api/groups/goods/teams", // 团列表
		cancel: root + "/api/groups/order/cancel", // 取消订单
		orderDetail: root + "/api/groups/order/orderDetail", // 订单详情
		remove: root + "/api/groups/order/remove", // 删除订单
		orderConfirm: root + "/api/groups/order/orderConfirm", // 确认收货
		
	},
	category: {
		goodsCate: root + "/api/sms_store/index/getGoodsCate", // 商品分类
		subGoodsCate: root + "/api/sms_store/index/getSubGoodsCate", // 一级分类下面的全部分类
		goodList: root + "/api/sms_store/index/getGoodList", // 商品列表
		goodDetail: root + "/api/sms_store/index/getGoodsDetail", // 商品详情
		goodComment: root + "/api/sms_store/index/getGoodsComment", // 商品评价
	},
	cart: {
		myCart: root + "/api/sms_store/member/myCart", // 我的购物车
		addToCart: root + "/api/sms_store/member/addToCart", // 加入购物车
		removeCart: root + "/api/sms_store/member/removeCart", // 删除购物车商品
		
	},
	address:{
		addressList: root + "/api/sms_store/member/getAddressList", // 收货地址列表
		modifyAddress: root + "/api/sms_store/member/modifyAddress", // 添加/更新收货地址
		deteleAddress: root + "/api/sms_store/member/deteleAddress", // 删除收货地址
		getAddress: root + "/api/sms_store/member/getAddress", // 地址详情
		setAddress: root + "/api/sms_store/member/setAddressDefault", // 设置默认地址
		
	},
	main: {
		number: root + "/api/sms_store/order/getOrderCount",//订单角标
		goodsList: root + "/api/sms_store/index/getGoodList",//拍卖区
		getNewGoodDetail: root + "/api/sms_store/index/getNewGoodDetail",//新人商品列表
		goodhotList: root + "/api/sms_store/index/getHotGoodList",//商品列表
		user: root + "/api/member/index/info", // 用户信息
		swiper: root + "/api/sms_store/index/getBanner", // 获取首页轮播图片
		swiperList: root + "/api/groups/goods/adv", // 拼团轮播图
		Leaarea: root + "/api/sms_store/index/getLeaarea", //是否捡漏
		getNewGoodList: root + "/api/sms_store/index/getNewGoodList", //是否捡漏
		updateHyiInfo: root + "/api/member/index/updateHyiInfo", //上传支付
		wzsubmit: root + "/api/sms_store/order/getUploadVoucher", //提交
		getAppealsList: root + "/api/sms_store/order/getAppealsList", //申诉列表
		getReprTation: root + "/api/sms_store/order/getReprTation", //申诉按钮
		getGoodLouList: root +"/api/sms_store/index/getGoodLouList" ,// 捡漏区
		getNoticestail: root +"/api/sms_store/index/getNoticestail" ,// 公告
		
	},
	order:{
		caculate: root + "/api/sms_store/order/caculate", // 创建订单
		create: root + "/api/sms_store/order/create", //提交订单
		payInfo: root + "/api/sms_store/order/payInfo", //订单编号
		pay: root + "/api/sms_store/order/pay", //订单支付
		orderList: root + "/api/sms_store/order/getOrderList", //订单列表
		neworderList: root + "/api/sms_store/order/getOrdersNew", //新人订单列表
		getNewOrdeail: root + "/api/sms_store/order/getNewOrdeail", //新人订单详情
		detele: root + "/api/sms_store/order/detele", //删除订单
		cancel: root + "/api/sms_store/order/cancel", //取消订单
		confirm: root + "/api/sms_store/order/confirm", //确认收货
		comment: root + "/api/sms_store/order/comment", //订单评价
		orderDetail: root + "/api/sms_store/order/getOrderDetail", //订单详情
		expressQuery: root + "/api/sms_store/order/expressQuery", //物流查询
		appeal: root + "/api/sms_store/order/getRepresentation", //申诉订单
		entrust: root + "/api/sms_store/order/ationRules", //委托
		geteryOgoods: root + "/api/sms_store/order/geteryOgoods", //上架提交
		gweenMembers: root + "/api/sms_store/order/gweenMembers",//确认收款
		geteTihuoGoods: root + "/api/sms_store/order/geteTihuoGoods" ,//去发货
		orderDividends: root + "/api/sms_store/order/orderDividends",//余额详情
		getWorkslogo: root + "/api/sms_store/order/getWorkslogo",//作品展示
		getOrderCon: root + "/api/sms_store/order/getOrderCon",//支付转账
		getPaymeslo: root + "/api/sms_store/order/getPaymeslo",//是否购买
	
	},
	collection:{
		addCollection: root + "/api/sms_store/member/addMyCollection", //加入我的收藏
		myCollection: root + "/api/sms_store/member/myCollection", //我的收藏
		removeMyCollection: root + "/api/sms_store/member/removeMyCollection", //删除我的收藏商品
		removeGoodsCollection: root + "/api/sms_store/member/removeGoodsCollection", //商品列表删除我的收藏商品
	},
	service:{
		qrcode: root + "/api/member/index/getMyCode",//邀请码
		integral: root + "/api/member/index/myCreditList",//积分明细
		team: root + "/api/team_range/Agent/subordinate",//团队查询
		teamtwo: root + "/api/team_range/Agent/AgentMember",//团队查询
		dendFembers: root + "/api/sms_store/order/dendFembers",//团队查询
		achieve: root + "/api/team_range/Agent/getAchievement",//团队业绩
		agent: root + "/api/team_range/Agent/getAgent",//当前等级
		jurisd: root + '/api/member/Jurisdiction/JurisdictionAdd',//提交授权
		accredit: root + '/api/member/Jurisdiction/uncertainPower',//授权结果
		education: root + '/api/single_page/Index/SourceMaterial',//素材库列表
		details: root + '/api/single_page/Index/GetSourceMaterial',//素材库详情
		service: root + '/api/single_page/Index/MyService',//客服中心,资质证照，企业介绍
		upgrade: root + '/api/plugins/AchievementApi/GetUpgrade',//升级条件
		member: root + '/api/plugins/AchievementApi/GetMember',//股东等级
		apply: root + '/api/plugins/AchievementApi/ApplyLevel',//申请升级
		
	}
}

const upload = function(self, url, data, type, path, name, _success) {
	if(data == '' || path == ''){
		uni.request({
			url: url,
			method: type,
			data: data,
			header: {
				'Authorization': 'Bearer ' + uni.getStorageSync('token'),
				'content-type': 'application/json;charset=UTF-8'
			},
			success: res => {
				var res = res.data;
				if(res.code == 400){
					uni.showToast({
						icon: 'none',
						title: res.info
					});
					uni.setStorageSync('token','');
					setTimeout(function(){
						uni.reLaunch({
							url: '/pages/login/login'
						});
					},2000);
				}else{
					_success(self, res);
				}
			},
		});
	}else{
		uni.uploadFile({
			url : url,
			filePath: path,
			name: name,
			formData: data,
			header: {
				'Authorization': 'Bearer ' + uni.getStorageSync('token'),
				'content-type': 'application/json;charset=UTF-8'
			},
			success: function (res) {
				res = res.data;
				res = eval('(' + res + ')');
				if(res.code == 400){
					uni.showToast({
						icon: 'none',
						title: res.info
					});
					uni.setStorageSync('token','');
					setTimeout(function(){
						uni.reLaunch({
							url: '/pages/login/login'
						});
					},2000);
				}else{
					_success(self, res);
				}
			}
		});
	}
}
export default {
	root,
	api,
	upload,
	config,
	User_paw,
	Memory,
	language
}
