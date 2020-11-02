//底部导航栏样式
//"big" : 按钮凸起：0：不凸起，1，：凸起
//"text" : 按钮底部文字内容
//"color" : 按钮默认时的文字颜色
//"selectColor" : 按钮选中时的文字颜色
//"pages" : 按钮跳转路径
//"iconPath" : 按钮默认时的图片
//"selected" : 按钮选中时的图片
var tabbarData = [
	[{
		"big":0,
		"text": "首页",
		"color":'#000000',
		"selectColor":'#ff3439',
		"pages": "/pages/main/index",
		"iconPath": "/static/tabbar/index.png",
		"selected": "/static/tabbar/indexHL.png",
	}, {
		"big":0,
		"text": "福利专区",
		"color":'#000000',
		"selectColor":'#ff3439',
		"pages": "/pages/main/gift",
		"iconPath": "/static/tabbar/gift.png",
		"selected": "/static/tabbar/giftHL.png",
	}, 
	// {
	// 	"big":1,
	// 	"text": "合作区",
	// 	"color":'#000000',
	// 	"selectColor":'#ff3439',
	// 	"pages": "/pages/main/upgrade",
	// 	"iconPath": "/static/tabbar/upgrade.png",
	// 	"selected": "/static/tabbar/upgrade.png",
	// }, 
	{
		"big":0,
		"text": "产品区",
		"color":'#000000',
		"selectColor":'#ff3439',
		"pages": "/pages/main/replen",
		"iconPath": "/static/tabbar/replen.png",
		"selected": "/static/tabbar/replenHL.png",
	}, {
		"big":0,
		"text": "我的",
		"color":'#000000',
		"selectColor":'#ff3439',
		"pages": "/pages/main/user",
		"iconPath": "/static/tabbar/user.png",
		"selected": "/static/tabbar/userHL.png",
	}],
	[{
		"big":0,
		"text": "首页",
		"color":'#000000',
		"selectColor":'#ff3439',
		"pages": "/pages/main/index",
		"iconPath": "/static/tabbar/index.png",
		"selected": "/static/tabbar/indexHL.png",
	}, {
		"big":0,
		"text": "福利专区",
		"color":'#000000',
		"selectColor":'#ff3439',
		"pages": "/pages/main/gift",
		"iconPath": "/static/tabbar/gift.png",
		"selected": "/static/tabbar/giftHL.png",
	 }, 
	// {
	// 	"big":1,
	// 	"text": "合作区",
	// 	"color":'#000000',
	// 	"selectColor":'#ff3439',
	// 	"pages": "/pages/main/upgrade",
	// 	"iconPath": "/static/tabbar/upgrade.png",
	// 	"selected": "/static/tabbar/upgrade.png",
	// },
	{
		"big":0,
		"text": "产品区",
		"color":'#000000',
		"selectColor":'#ff3439',
		"pages": "/pages/main/replen",
		"iconPath": "/static/tabbar/replen.png",
		"selected": "/static/tabbar/replenHL.png",
	}, {
		"big":0,
		"text": "我的",
		"color":'#000000',
		"selectColor":'#ff3439',
		"pages": "/pages/main/user",
		"iconPath": "/static/tabbar/user.png",
		"selected": "/static/tabbar/userHL.png",
	}]
	/* [{
		"big":0,
		"text": "首页",
		"color":'#000000',
		"selectColor":'#ff3439',
		"pages": "/pages/main/index",
		"iconPath": "/static/tabbar/index.png",
		"selected": "/static/tabbar/indexHL.png",
	}, {
		"big":0,
		"text": "分类",
		"color":'#000000',
		"selectColor":'#ff3439',
		"pages": "/pages/main/category",
		"iconPath": "/static/tabbar/gift.png",
		"selected": "/static/tabbar/giftHL.png",
	}, {
		"big":1,
		"text": "企业介绍",
		"color":'#000000',
		"selectColor":'#ff3439',
		"pages": "/pages/main/introduce",
		"iconPath": "/static/tabbar/upgrade.png",
		"selected": "/static/tabbar/upgrade.png",
	}, {
		"big":0,
		"text": "购物车",
		"color":'#000000',
		"selectColor":'#ff3439',
		"pages": "/pages/main/cart",
		"iconPath": "/static/tabbar/replen.png",
		"selected": "/static/tabbar/replenHL.png",
	}, {
		"big":0,
		"text": "我的",
		"color":'#000000',
		"selectColor":'#ff3439',
		"pages": "/pages/main/user",
		"iconPath": "/static/tabbar/user.png",
		"selected": "/static/tabbar/userHL.png",
	}] */
];

//底部导航栏样式
//"background" : 底部颜色
//"border" : 上边框颜色
//"height" : 高度
//"fontSize" : 文字大小
//"imgWidth" : 图标宽高
//"imgTop" : 图标上边距
//"bigWidth" : 凸起按钮图标宽高
//"bigTop" : 凸起按钮图标上边距,一般为负数
//"bigRadius" : 凸起按钮图标圆角
//"bigBack" : 凸起按钮图标底部颜色
var colorData = [{
	"background" : "#ffffff",
	"border" : "2upx solid #C8C7CC",
	"height" : "100upx",
	"fontSize" : "24upx",
	"imgWidth" : "50upx",
	"imgTop" : "10upx",
	"bigWidth" : "70upx",
	"bigTop" : "-30upx",
	"bigRadius" : "100upx",
	"bigBack" : "#ffffff",
	"bigmar" : "-120upx",
}];

//头部分页栏样式
//"background" : 底部颜色
//"color" : 字体颜色
//"active" : 选中时的字体颜色
//"height" : 分栏高度
//"line" : 字体行高
//"margin" : 外间距
//"padding" : 内间距
//"size" : 字体大小
var cateData = [{
	background:'#ffffff',
	color:'#999999',
	active:'#4e0745',
	height:'86upx',
	line:'80upx',
	margin:'0 10upx',
	padding:'0 8upx',
	size:'30upx',
}];

//顶部搜索导航栏样式
//"radius" : 搜索导航栏圆角
//"icon" : 导航栏搜索图标颜色
//"border" : 搜索导航栏边框大小
//"background" : 搜索导航栏底部颜色
//"btnSize" : 按钮文字大小
//"btnColor" : 按钮文字颜色
//"btnRadius" : 按钮右边框圆角
//"btnBack" : 按钮底部颜色
//"inputColor" : 输入框文字颜色
//"inputBack" : 输入框底部颜色
var headerData = [{
	"radius" : "30upx",
	"icon" : "#999999",
	"border" : "2upx solid #FFFFFF",
	"background" : "rgba(255, 255, 255, 1.3)",
	"btnSize" : "28upx",
	"btnColor" : "#999999",
	"btnRadius" : "0 10upx 10upx 0",
	"btnBack" : "rgba(255, 255, 255, .6)",
	"inputColor" : "#999999",
	"inputBack" : "rgba(255, 255, 255, .2)",
}];

//分享配置
const shareData = [{
	type:1,
	name:'微信好友',
	code:'WXSceneSession',
	image:'/static/icon/wechat.png',
},{
	type:0,
	name:'微信朋友圈',
	code:'WXSenceTimeline',
	image:'/static/icon/friend.png',
},{
	type:0,
	name:'微信收藏',
	code:'WXSceneFavorite',
	image:'/static/icon/collect.png',
/* },{
	type:0,
	name:'QQ好友',
	code:'qq',
	image:'/static/icon/qq.png',
},{
	type:0,
	name:'新浪微博',
	code:'weibo',
	image:'/static/icon/sina.png', */
}];

const calendarData = [{
	"radius" : "30upx",
	"back" : '#ffffff',
	"iconSize" : '24',
	"iconColor" : '#000000',
	"padding" : "20upx 0",
}];
export default {
	headerData,
	tabbarData,
	colorData,
	shareData,
	cateData,
	calendarData,
}