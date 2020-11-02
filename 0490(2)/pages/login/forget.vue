<template>
	<view class="forget">
		<view class="logo">
			<image src="/static/face.png" mode=""></image>
		</view>
		<view class="info">
			
			<view class="box" >
				<view class="title">手机号码</view>
				<view class="inp">
					<input type="text" value="" placeholder="请输入手机号码" placeholder-class="cl" v-model="phone" maxlength="11"/>
				</view>
			</view>
			
			<view class="box" >
				<view class="title">验证码</view>
				<view class="inp">
					<input type="text" value="" placeholder="请输入验证码" placeholder-class="cl" v-model="code"/>
				</view>
				<view class="code" @click="getCode" v-if="countdown>61">验证码</view>
				<view class="code" @click="getCode" v-if="countdown==61">重新获取</view>
				<view class="code" v-if="countdown<61">{{countdown}} 秒</view>
			</view>
			<view class="box" >
				<view class="title">修改登录密码</view>
				<view class="inp">
					<input type="password" value="" placeholder="请输入6~12位的密码" placeholder-class="cl" v-model="password" maxlength="12" />
				</view>
			</view>
			<view class="box" >
				<view class="title">确认登录密码</view>
				<view class="inp">
					<input type="password" value="" placeholder="请确认登录密码" placeholder-class="cl" v-model="password2"/>
				</view>
			</view>
		</view>

		<view class="btn" @click="save">确认修改</view>
	</view>
</template>

<script>
import service from '@/store/service.js';
	export default {
		data() {
			return {
				countdown:62,
				countDown:false,
				timestamp:59,
				codeText:'验证码',
				phone:'',
				code:'',
				password:'',
				password2:''
				
			}
		},
		methods: {
			//确认修改
			save(){
				let that = this;
				if (!that.phone) {
					that.$api.msg('请输入手机号码');
					return;
				}
				if (!that.code) {
					that.$api.msg('请输入验证码');
					return;
				}
				if (!that.password) {
					that.$api.msg('登录密码不能为空');
					return;
				}
				if (that.password.length < 6 || that.password.length > 12) {
					that.$api.msg('请输入6~12位的密码');
					return;
				}
				if (that.password != that.password2) {
					that.$api.msg('修改的登录密码不一致');
					return;
				}
			that.$http.post(service.api.login.forget, {
					account: that.phone,
					password: that.password,
					code: that.code
				}).then(function(res) {
					if (res.code == 1) {
						that.$api.msg('修改成功');
						setTimeout(() => {
							uni.redirectTo({
								url: './login'
							});
						}, 1500);
					} else {
						that.$api.msg(res.info);
					}
				});
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
					.get(service.api.upload.code, {
						mobile: that.phone,
						temp:'sms_forget'
					})
					.then(function(res) {
						console.log(res);
						if (res.code == 1) {
							that.codetime(that,60);
						} else {
							that.$api.msg(res.info);
						}
					});
			},
			//手机验证码获取倒计时
			codetime: function(obj,num) {
				if(num<10){
					obj.countdown = "0"+num;
				}else{
					obj.countdown = num;
				}
				num--;
				if(num < 0){
					obj.countdown = 61;
				}else{
					setTimeout(function(){
						obj.codetime(obj,num);
					}, 1000);
				}
			},
			countDownEnd() {
				this.countDown = !this.countDown;
				console.log('重新获取验证码');
			},
			changes(){
				// console.log('11')
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/uni.css';
	page{
		background-color: #fff;
	}
	.forget {
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
				border-bottom: 2upx solid #F3F3F3;
				padding: 26upx 0;
				position: relative;

				.title {
					font-size: 28upx;

				}

				.inp {

					input{
						color: #333333;
						font-size: 32upx;
						font-weight: bold;
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
					background-color: #ff594d;
					border-radius: 30upx;
					color: #ffffff;
					position: absolute;
					right: 0;
					bottom: 34upx;
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

		}

	}
</style>
