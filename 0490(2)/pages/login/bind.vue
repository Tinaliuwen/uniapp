<template>
	<view class="register">
		<!-- <view class="logo">logo</view> -->
		<view class="logo">
			<image src="/static/face.png" mode=""></image>
			</view>
		<view class="info">
			<view class="box">
				<view class="title">邀请码</view>
				<view class="inp"><input type="text" value="" placeholder="请输入邀请码" placeholder-class="cl" v-model="invite" :disabled="disabled" /></view>
			</view>
			<view class="box">
				<view class="title">真实姓名</view>
				<view class="inp"><input type="text" value="" placeholder="请输入真实姓名" placeholder-class="cl" v-model="name" /></view>
			</view>
			<view class="box">
				<view class="title">手机号码</view>
				<view class="inp"><input type="text" value="" placeholder="请输入手机号码" placeholder-class="cl" v-model="phone" maxlength="11" /></view>
			</view>
			<view class="box">
				<view class="title">验证码</view>
				<view class="inp"><input type="text" value="" placeholder="请输入验证码" placeholder-class="cl" v-model="code" /></view>
				<view class="code" v-if="!countDown" @click="getCode">{{ codeText }}</view>
				<view class="code" v-if="countDown">
					<u-count-down
						:timestamp="timestamp"
						:show-days="false"
						:show-hours="false"
						:show-minutes="false"
						@change="changes"
						@end="countDownEnd"
						bg-color="#f81149"
						color="#fff"
					></u-count-down>
					s
				</view>
			</view>
			<!-- <view class="box">
				<view class="title">姓名</view>
				<view class="inp"><input type="text" value="" placeholder="请输入姓名" placeholder-class="cl" v-model="name" /></view>
			</view> -->
			<view class="box">
				<view class="title">登录密码</view>
				<view class="inp"><input type="password" value="" placeholder="请输入登录密码" placeholder-class="cl" v-model="password" /></view>
			</view>
			<view class="box">
				<view class="title">确认登录密码</view>
				<view class="inp"><input type="password" value="" placeholder="请输入确认登录密码" placeholder-class="cl" v-model="password2" /></view>
			</view>

			<!-- <view class="box">
				<view class="title">支付密码</view>
				<view class="inp"><input type="password" value="" placeholder="请输入8-12位支付密码" placeholder-class="cl" v-model="pay" /></view>
			</view>
			<view class="box">
				<view class="title">确认支付密码</view>
				<view class="inp"><input type="password" value="" placeholder="请输入确认支付密码" placeholder-class="cl" v-model="pay2" /></view>
			</view> -->
		</view>

		<view class="btn" @click="register">立即绑定</view>

		<!-- <view class="agreement">
			注册即代表已阅读并同意
			<text @click="jump('./agreement')">《服务协议》</text>
		</view> -->
	</view>
</template>

<script>
import service from '@/store/service.js';
export default {
	data() {
		return {
			openid: '',
			countDown: false,
			timestamp: 59,
			codeText: '验证码',
			invite: '', //邀请码
			disabled: false,
			phone: '', //手机号
			code: '', //验证码
			name: '', //昵称
			password: '', //密码
			password2: '', //确认密码
			pay: '', //支付密码
			pay2: '', //确认支付密码
			mid: '',
			icode: '',
			logo:''
		};
	},
	onLoad: function(e) {
		// this.getLogo()
		// this.invite=uni.getStorageSync('urlmid')
		this.invite = uni.getStorageSync('icode');
		console.log(this.invite);
		this.openid = uni.getStorageSync('openid');
		console.log(this.invite);
		//this.invite=e.mid
		if (e.val) {
			this.openid = e.val;
		}
	},
	methods: {
		getLogo() {
			console.log(123);
			var self = this
			self.$http
				.get(service.api.login.info, {})
				.then(function(res) {
					// console.log(res, 123);
					self.logo=res.data.site_icon
				});
		},
		jump(url) {
			uni.navigateTo({
				url: url
			});
		},
		//注册
		register() {
			let that = this;
			if (!that.phone) {
				that.$api.msg('请输入手机号码');
				return;
			}
			if (!that.password) {
				that.$api.msg('请输入密码');
				return;
			}
			if (that.password != that.password2) {
				that.$api.msg('登录密码不一致');
				return;
			}
			that.$http
				.post(service.api.login.register, {
					icode: that.invite,
					account: that.phone,
					password: that.password,
					// type: 'wechat',
					type: 'WeChat',
					value: that.openid,
					// value: "",
					code: that.code,
					nickname: that.name
				})
				.then(function(res) {
					console.log(res);
					// console.log('注册=====>>>', res);
					if (res.code == 1) {
						that.$api.msg('绑定成功');
						uni.setStorageSync('token', res.data.token);
						uni.setStorageSync('authorization', 'Bearer ' + res.data.token);
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/main/index'
							});
						}, 500);
					} else {
						that.$api.msg(res.info);
					}
					// if (res.code === 1) {
					// 	that.countDown = !that.countDown;
					// 	that.$api.msg('验证码发送成功');
					// 	that.codeText = '重新获取验证码';
					// 	setTimeout(() => {
					// 		that.$api.msg(res.info);
					// 	}, 1500);
					// } else {
					// 	that.$api.msg(res.info);
					// }
				});
			// that.$http.post(that.$api.api.user.register, data).then(res => {
			// 	console.log('注册=====>>>', res);
			// 	if (res.code == 1) {
			// 		that.$api.msg('注册成功');
			// 		setTimeout(() => {
			// 			uni.redirectTo({
			// 				url: './login'
			// 			});
			// 		}, 1500);
			// 	} else {
			// 		that.$api.msg(res.info);
			// 	}
			// });
		},
		//获取验证码
		getCode() {
			let that = this;

			if (that.phone == '') {
				that.$api.msg('请输入手机号');
				return;
			}
			//手机号码正则验证
			if (!/^1[3-9][0-9]\d{8,11}$/.test(that.phone)) {
				uni.showToast({
					icon: 'none',
					title: '手机号码格式不正确'
				});
				return;
			}
			that.$http
				.get(service.api.login.code, {
					mobile: that.phone,
					temp: 'sms_reg'
				})
				.then(function(res) {
					console.log(res);
					if (res.code === 1) {
						that.countDown = !that.countDown;
						that.$api.msg('验证码发送成功');
						that.codeText = '重新获取验证码';
						// setTimeout(() => {
						// 	that.$api.msg(res.info);
						// }, 1500);
					} else {
						that.$api.msg(res.info);
					}
				});
		},
		countDownEnd() {
			this.countDown = !this.countDown;
			console.log('重新获取验证码');
		},
		changes() {
			// console.log('11')
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../common/uni.css';

page {
	height: 100%;
	overflow: hidden;
	background-color: #ffffff;
}
.logo {
	display: flex;
	justify-content: center;
	align-items: center;
	image {
		width: 260upx;
		height: 260upx;
		margin-top: 80upx;
	}
}
.register {
	height: 100%;
	overflow: auto;

	// .logo {
	// 	width: 200upx;
	// 	height: 200upx;
	// 	line-height: 200upx;
	// 	text-align: center;
	// 	font-size: 66upx;
	// 	background-color: #556ffd;
	// 	border-radius: 30upx;
	// 	color: #ffffff;
	// 	margin: 50upx auto 50upx auto;
	// }

	.info {
		padding: 60upx;

		.box {
			color: #999999;
			border-bottom: 2upx solid #f3f3f3;
			padding: 26upx 0;
			position: relative;

			.title {
				font-size: 28upx;
			}

			.inp {
				.cl {
					color: #999999;
					font-size: 32upx;
					font-weight: 400;
				}

				input {
					color: #333333;
					font-size: 32upx;
					font-weight: bold;
				}
			}

			.code {
				width: 136upx;
				height: 58upx;
				line-height: 58upx;
				text-align: center;
				background-color: #f81149;
				border-radius: 30upx;
				color: #ffffff;
				position: absolute;
				right: 0;
				bottom: 34upx;
			}
		}

		.more {
			display: flex;
			justify-content: space-between;
			margin: 20upx 0;

			color: #333333;

			& > view {
				font-size: 32upx;
				color: #333333;
			}
		}
	}

	.btn {
		width: 630upx;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		background-color: #f81149;
		border-radius: 50upx;
		color: #ffffff;
		font-size: 36upx;
		margin: 20upx auto 60upx auto;
		box-shadow: 0upx 4upx 8upx 0upx rgba(167, 168, 174, 0.3);
	}

	.agreement {
		margin: 20upx 0;
		color: #999999;
		font-size: 28upx;
		text-align: center;
		padding-bottom: 40upx;

		text {
			color: #f81149;
		}
	}
}
</style>
