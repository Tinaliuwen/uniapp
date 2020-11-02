<template>
	<view class="login">
		<view class="logo">
			<image src="/static/face.png" mode=""></image>
		</view>
		<view class="info">
			<view class="box">
				<view class="title">手机号码</view>
				<view class="inp"><input type="" placeholder="请输入手机号码" placeholder-class="cl" maxlength="11" v-model="phone" /></view>
			</view>
			<view class="box">
				<view class="title">登录密码</view>
				<view class="inp"><input type="password" placeholder="请输入登录密码" placeholder-class="cl" v-model="password" /></view>
			</view>
			<view class="more">
				<view class="" @click="jump('/pages/login/forget')">忘记密码</view>
				<!-- #ifndef APP-PLUS -->
				<view class="" @click="jump('/pages/login/register')">注册账号</view>
				<!-- #endif -->
				
			</view>
		</view>

		<view class="btn" @click="login">立即登录</view>
		<!-- <view class="agreement">
			登录即代表已阅读并同意
			<text @click="jump('/pages/login/agreement')">《服务协议》</text>
		</view> -->
	</view>
</template>

<script>
import service from '@/store/service.js';
export default {
	data() {
		return {
			phone: '',//13242765183
			password: ''//123456
		};
	},
	onLoad() {},
	mounted() {
		//去掉导航栏的返回按钮
		// var a = document.getElementsByClassName('uni-page-head-hd')[0]
		// a.style.display = 'none';
	},
	methods: {
		savetype(e){},
		jump(url) {
			uni.navigateTo({
				url: url
			});
		},
		login() {
			//13100000000
			//123456
			let self = this;
			let phone = self.phone;
			let pwd = self.password;
			
			console.log('登录')

			if (!phone) {
				self.$api.msg('请输入手机号码');
				return;
			}
			if (!pwd) {
				self.$api.msg('请输入登录密码');
				return;
			}
				/* service.upload(this, service.api.login.login, {
					account: phone,
					password: pwd
				}, 'POST', '', '', function(self, res) {
					self.status = 1;
					if (res.code == 1) {
						setTimeout(function(){
							uni.setStorageSync('token', res.data.token);
							uni.setStorageSync('authorization', 'Bearer ' + res.data.token);
							self.$store.commit('login', 'bearer ' + res.data.token);
							uni.reLaunch({
								url: '/pages/main/user',
							});
						}, 1000);
					} else {
						uni.showToast({
							icon: 'none',
							title: res.info
						});
					}
				}); */
			self.$http.post(service.api.login.login, {
				account: phone,
				password: pwd
			}).then(function(res) {
				console.log(res);
				if (res.code == 1) {
					uni.setStorageSync('token', res.data.token);
					uni.setStorageSync('authorization', 'Bearer ' + res.data.token);
					self.$store.commit('login', 'bearer ' + res.data.token);
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/main/index'
						})
					}, 1500)
				} else {
					self.$store.commit('logout')
					self.$api.msg(res.info);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../common/uni.css';
page {
	background-color: #fff;
}
.login {
	height: 100%;
	overflow: hidden;

	.logo {
		width: 200upx;
		height: 200upx;
		line-height: 200upx;
		text-align: center;
		font-size: 66upx;
		/* background-color: #556ffd; */
		border-radius: 30upx;
		/* color: #ffffff; */
		margin: 50upx auto 50upx auto;
		image{
			border-radius: 20upx;
			width: 200upx;
			height: 200upx;
		}
	}

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
				input {
					color: #333333;
					font-size: 32upx;
					font-weight: bold;

					// height: 50upx !important;
					// padding: 15upx 25upx !important;
					// line-height:50upx !important;
					// font-size:28upx !important;
					// background:#FFF !important;
					// flex: 1;
				}

				.cl {
					color: #999999;
					font-size: 32upx;
					font-weight: 400;
				}
			}

			.code {
				width: 136upx;
				height: 58upx;
				line-height: 58upx;
				text-align: center;
				background-color: #556ffd;
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
		background-color: #ff594d;
		border-radius: 50upx;
		color: #ffffff;
		font-size: 36upx;
		margin: 20upx auto 0 auto;
		box-shadow: 0upx 4upx 8upx 0upx rgba(167, 168, 174, 0.3);
	}

	.agreement {
		margin: 20upx 0;
		color: #999999;
		font-size: 28upx;
		text-align: center;

		text {
			color: #ff594d;
		}
	}
}
</style>
