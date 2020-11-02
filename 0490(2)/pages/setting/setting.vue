<template>
	<view class="setting">
		<view class="info">
			<view class="photo" @click="cloose">
				<!-- <view class="photo"> -->
				<view class="title">头像</view>
				<view class="">
					<image :src="avatar == '' ? '/static/face1.png' : avatar" mode=""></image>
					<image src="../../static/icon/next_.png" mode=""></image>
				</view>
			</view>
			
			<view class="user-info" @click="jumper('/pages/setting/nickname')">
				<view class="">真实姓名</view>
				<view class="">
					<view class="input">{{nickname}}</view>
					<view class="modify"><image src="../../static/icon/next_.png" mode=""></image></view>
				</view>
			</view>
			
			<view class="user-info" @click="jumper('/pages/setting/set_pass')">
				<view class="">修改登录密码</view>
				<view class="">
					<view class="input"></view>
					<view class="modify"><image src="../../static/icon/next_.png" mode=""></image></view>
				</view>
			</view>
			
			<!-- <view class="user-info">
				<view class="">确认登录密码</view>
				<view class="">
					<input class="input" type="password" placeholder="请确认登录密码" v-model="repwd" maxlength="32"></input>
					<view class="modify"><image src="../../static/icon/next_.png" mode=""></image></view>
				</view>
			</view> -->
			
			<view style="height: 20upx;"></view>
			
			<!-- <view class="user-info" @click="jumper('/pages/setting/amend?id=1')">
				<view class="">手机号码</view>
				<view class="">
					<view class="">{{account}}</view>
					<view class="modify"><image src="../../static/icon/next_.png" mode=""></image></view>
				</view>
			</view> -->
			<!-- #ifdef APP-PLUS -->
			<view class="btn" @click="exit">退出登录</view>
			<!-- #endif -->
			
			
			
		</view>
	</view>
</template>

<script>
import service from '@/store/service.js';
export default {
	data() {
		return {
			show: false,
			avatar: '',
			nickname: '',
			account: '',
			pwd: '',
			repwd: '',
			userInfo: '',
			infoList: [
				{
					title: '昵称',
					content: '牛哄哄'
				},
				{
					title: '手机号码',
					content: '去修改'
				},
				{
					title: '重置登录密码',
					content: '去修改'
				}
			]
		};
	},
	onShow() {
		this.getUserInfo();
		// console.log('用户信息===>>', this.$store.state.userInfo);
		// let info = this.$store.state.userInfo;
		// this.infoList[0].content = info.nickname;
		// this.infoList[1].content = info.account;
		// this.avatar = info.avatar;
	},
	methods: {
		getUserInfo() {
			var self = this;
			self.$http .post(service.api.main.user).then(function(res) {
				if(res.code == 1){
					res = res.data;
					self.user_id = res.id;
					self.avatar = res.avatar;
					self.account = res.account;
					self.nickname = res.nickname;
				}else{
					self.$api.msg(res.msg);
				}
			});
		},
		cloose(){
			var self = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album','camera'],
				success: (res) => {
					var imageSrc = res.tempFilePaths[0];
					self.$http.upload(service.api.upload.image,imageSrc,'image').then(function(res) {
						if(res.code == 1){
							res = res.data;
							self.avatar = res.img_url;
							self.$http.post(service.api.upload.update, {
									avatar:self.avatar,
								})
								.then(function(res) {
									self.$api.msg(res.info);
								});
							uni.hideToast()
						}else{
							self.$api.msg(res.info);
						}
					});
				},
				fail: (err) => {
					console.log('chooseImage fail', err)
				}
			})
		},
		jumper(url) {
			uni.navigateTo({
				url: url
			})
		},
		amend(index) {
			// if(index != 0){
			// 	this.jump(`./amend?id=${index}`)
			// }
			this.jump(`./amend?id=${index}`);
		},
		//退出登录
		exit() {
			var self = this;
			self.$http.post(service.api.upload.logout)
				.then(function(res) {
					if(res.code == 1){
						self.$api.msg('退出成功')
						setTimeout(function() {
							uni.setStorageSync('token', '');
							uni.setStorageSync('authorization', '');
							uni.reLaunch({
								url:'/pages/login/login'
							})	
						}, 2000);
						
					}
				});
			
		},
		//取消退出登录
		cancel() {
			console.log('取消退出');
		},
		//确认退出登录
		confirm() {
			let that = this;
			// this.$http.post(this.$api.api.user.logout).then(res => {
			// console.log('退出登录');
			// if (res.code === 1) {
				// that.$store.commit('logout');
				uni.removeStorage({
					key: 'token'
				});
				this.$api.msg('退出成功');
				setTimeout(() => {
					this.$jump('/pages/login/login');
				}, 1500);
			// } else {
			// 	this.$api.msg(res.info);
			// }
			// });
		},
		//更换头像
		putPhoto() {
			let that = this;
			console.log('更换');
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album'],
				success: function(res) {
					console.log(res);
					uni.showLoading({
						title: '加载中'
					});
					if (res.errMsg == 'chooseImage:ok') {
						console.log('ok');
						that.avatar = res.tempFilePaths[0];
						let image = res.tempFilePaths[0];
						that.$http.upload(service.api.upload.uploadImg + '?token=' + uni.getStorageSync('token'), res.tempFilePaths[0], 'image').then(function(res) {
							console.log(res);
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: '头像上传成功'
							});
							if (res.code === 1) {
								//修改头像
								that.$http
									.post(service.api.user.updateInfo, {
										avatar: res.data
									})
									.then(res => {
										console.log('上传头像====>>', res);
										that.$http.post(service.api.user.info).then(res => {
											// console.log(res,111);
											if (res.code === 1) {
												// console.log('更新===>>', res);
												that.userInfo = res.data;
												// uni.setStorageSync('userInfo', res.data);
												// that.$store.state.userInfo = res.data;
												uni.hideLoading();
												that.$api.msg('更新成功');
											}
										});
									});
							}
						});
						// });
						// that.$http.upload(that.$api.api.common.upload, res.tempFilePaths[0], 'image').then(i => {
						// 	console.log('上传图片===>>', i);
						// 	if (i.code === 1) {
						// 		//修改头像
						// 		that.$http
						// 			.post(that.$api.api.my.modify_info, {
						// 				avatar: i.data.img_url,
						// 				nickname: ''
						// 			})
						// 			.then(res => {
						// 				console.log('上传头像====>>', res);
						// 				that.$http.get(that.$api.api.user.userInfo).then(res => {
						// 					if (res.code === 1) {
						// 						console.log('更新===>>', res);
						// 						uni.setStorageSync('userInfo', res.data);
						// 						that.$store.state.userInfo = res.data;
						// 						uni.hideLoading();
						// 						that.$api.msg('上传成功');
						// 					}
						// 				});
						// 			});
						// 	}
						// });
					}
				}
			});
		},
	}
};
</script>

<style lang="scss" scoped>
@import '../../common/uni.css';

page {
	width: 100%;
	height: 100%;
	overflow: hidden;

	.setting {
		height: 100%;
		overflow: auto;
		background-color: #f4f4f4;
	}
}
.input{
	color:#cccccc;
	font-Size:28upx;
	text-align: right;
}
.info {
	.photo {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 30upx;
		background-color: #fff;
		color: #333333;

		& > view:nth-child(2) {
			display: flex;
			align-items: center;
			> image:nth-child(1) {
				width: 89upx;
				height: 89upx;
				border-radius: 50%;
			}

			> image:nth-child(2) {
				width: 48upx;
				height: 48upx;
			}
		}
	}

	.user-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30upx;
		border-top: 2upx solid #f1f1f1;
		background-color: #fff;
		color: #333333;

		& > view:nth-child(2) {
			display: flex;
			align-items: center;
			color: #999999;
			font-size: 28upx;
		}

		.modify {
			width: 48upx;
			height: 48upx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.btn {
		width: 630upx;
		height: 100upx;
		line-height: 100upx;
		background: #ff594d;
		border-radius: 50upx;
		margin: 0 auto;
		text-align: center;
		color: #fff;
		font-size: 36upx;
		margin-top: 200upx;
	}
}

.margin {
	margin-top: 30upx;
}

.amend {
	.content {
		background-color: #ffffff;
		margin-top: 30upx;
		padding: 0 30upx;

		.box {
			padding: 40upx 0;
			border: 1upx solid#F4F4F4;
			color: #333333;
		}

		.code {
			display: flex;
			align-items: center;
			justify-content: space-between;

			> view {
				width: 124upx;
				height: 52upx;
				line-height: 52upx;
				text-align: center;
				border-radius: 26upx;
				background-color: #5670fe;
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
		background-color: #5670fe;
		font-size: 36upx;
		margin: 60upx auto 0 auto;
	}
}

//uview样式
.u-update-content {
	font-size: 28upx;
	color: #666666;
	text-align: center;
	padding: 20upx 0;
}

/deep/.u-model-title {
	font-size: 40upx;
	font-weight: bold;
	color: #333333;
}
</style>
