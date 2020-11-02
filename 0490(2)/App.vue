<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		uni.setStorageSync('type', 1);
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import "uview-ui/index.scss";
/* 引入官方样式 */
@import './common/uni.css';
/* @import './common/iconfont.css'; */
/* 引入通用样式*/
@import './common/common.css';


page {
	background-color: #f3f3f3;
}
page,
.container {
	box-sizing: border-box;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-iconfonticonfonti2:before {
  content: "\e62c";
}

.icon-shangjiantou:before {
  content: "\e61e";
}
/* checkbox样式重置 */
uni-checkbox .uni-checkbox-input {
	height: 40upx;
	width: 40upx;
	border-radius: 50%;
}

uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:before {
	color: #ffffff;
	position: absolute;
	font-size: 35upx;
}

uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
	border-color: #d1d1d1;
}

uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
	background-color: #ff594d;
}

/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
