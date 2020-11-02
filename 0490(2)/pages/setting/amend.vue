<template>
	<view class="">
		<view class="amend">
			<view class="content">
				<view class="box phone" v-if="amend != 0">{{ amend == 1 ? `原手机号码：${mobile}` : `手机号码：${mobile}` }}</view>

				<view class="box" v-if="amend == 1">
					<input type="text" value="" placeholder="请输入新的手机号码" placeholder-style="color:#cccccc;fontSize:28upx" v-model="newPhone" maxlength="11" />
				</view>
				<view class="box code" v-if="amend == 1">
					<input type="text" value="" placeholder="请输入验证码" placeholder-style="color:#cccccc;fontSize:28upx" v-model="code" />
					
					<view class="codes" @click="getCode" v-if="countdown>61">验证码</view>
					<view class="codes" @click="getCode" v-if="countdown==61">重新获取</view>
					<view class="codes" v-if="countdown<61">{{countdown}} 秒</view>
				</view>
			</view>
			<view class="btn" @click="amendBtn">修改</view>
		</view>
	</view>
</template>

<script>
import service from '@/store/service.js';
export default {
	data() {
		return {
				countdown:62,
			amend: 1, // 0.修改手机号  1.修改登录密码  2.修改支付密码
			timestamp: 59,
			countDown: false,
			codeText: '验证码',
			code: '', //验证码
			nickname: '', //昵称
			oldPhone: '',
			newPhone: '', //新手机号
			pwd: '', //重置登录密码
			repwd: '', //确认密码
			payPwd: '', //重置支付密码
			repayPwd: '', //重置支付密码
			mobile: ''
		};
	},
	onLoad(option) {
		this.getUserInfo();
		let id = option.id;
		this.amend = id;
		uni.setNavigationBarTitle({
			title: '修改手机号'
		});
	},
	methods: {
		getUserInfo() {
			var self = this;
			self.$http.post(service.api.main.user, {}).then(function(res) {
				var list = res.data;
				self.userInfo = list;
				self.mobile = list.account;
			});
		},
		//获取验证码
		getCode() {
			let that = this;

			if (that.newPhone == '') {
				that.$api.msg('请输入手机号');
				return;
			}
			//手机号码正则验证
			if (!/^1[3-9][0-9]\d{8,11}$/.test(that.newPhone)) {
				uni.showToast({
					icon: 'none',
					title: '手机号码格式不正确'
				});
				return;
			}
			that.$http
				.get(service.api.upload.code, {
					mobile: that.newPhone,
					temp:'sms_bind'
				})
				.then(function(res) {
					that.$api.msg(res.info);
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
		amendBtn() {
			let that = this;
			if (!that.newPhone) {
				that.$api.msg('请输入新手机');
				return;
			}
			if (!that.code) {
				console.log(that.code);
				that.$api.msg('请输入验证码');
				return;
			}
			
			that.$http.post(service.api.upload.bindMobile, {
				mobile: that.newPhone,
				verifycode: that.code ,
			}).then(res => {
				that.$api.msg(res.info);
				if (res.code === 1) {
					setTimeout(function(){
						uni.navigateBack({
							delta:1
						})
					},1500)
				} else {
				}
			});
		},
		getCodeNum() {
			let that = this;
		
			if (that.newPhone == '') {
				that.$api.msg('请输入手机号');
				return;
			}
			//手机号码正则验证
			if (!/^1[3-9][0-9]\d{8,11}$/.test(that.newPhone)) {
				uni.showToast({
					icon: 'none',
					title: '手机号码格式不正确'
				});
				return;
			}
			that.$http
				.get(service.api.login.code, {
					mobile: that.newPhone
				})
				.then(function(res) {
					console.log(res);
					if (res.code === 1) {
						that.countDown = !that.countDown;
						that.$api.msg('验证码发送成功');
						that.codeText = '重新获取';
						setTimeout(() => {
							that.$api.msg(res.info);
						}, 1500);
					} else {
						that.$api.msg(res.info);
					}
				});
		},
		countDownEnd() {
			this.countDown = !this.countDown;
			
		},
		//获取验证码倒计时进行中
		changes() {
			console.log('11');
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	height: 100%;
	overflow: hidden;
	background-color: #fff;
}

.amend {
	.content {
		background-color: #ffffff;
		margin-top: 30upx;
		padding: 0 30upx;

		.box {
			padding: 40upx 0;
			border-bottom: 1upx solid #f4f4f4;
			color: #333333;
		}

		.code {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.codes {
				width: 124upx;
				height: 52upx;
				line-height: 52upx;
				text-align: center;
				border-radius: 26upx;
				background-color: #ff594d;
				font-size: 28upx;
				color: #ffffff;
			}
		}
	}

	.btn {
		width: 630upx;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		border-radius: 50upx;
		color: #ffffff;
		background-color: #ff594d;
		font-size: 36upx;
		margin: 60upx auto 0 auto;
	}
}
</style>
