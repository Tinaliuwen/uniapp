<template>
	<view class="setting">
		<view class="info">
			<view class="user-info">
				<view class="">
					<input class="input" type="password" placeholder="设置新密码" v-model="pwd" maxlength="32" placeholder-style="color:#B7B7B7"></input>
				</view>
			</view>
			
			<view class="user-info">
				<view class="">
					<input class="input" type="password" placeholder="确认新密码" v-model="repwd" maxlength="32"placeholder-style="color:#B7B7B7"></input>
				</view>
			</view>
			
			<view class="btn" @click="submit">确认修改</view>
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
			userInfo: ''
		};
	},
	onShow() {
		this.getUserInfo();
	},
	methods: {
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
		submit(){
			var self = this;

			self.$http.post(service.api.upload.update, {
					password:self.pwd
				})
				.then(function(res) {
					self.$api.msg(res.info);
					if (res.code == 1) {
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							});
						}, 1500);
					}
				});
			
		},
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
		}
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
		padding: 10rpx 30rpx;
		background-color: #fff;
	}
}
.input{
	color:#cccccc;
	font-Size:30upx;
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
			// width: 128upx;
			// height: 128upx;

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
		border-bottom: 2upx solid #f1f1f1;
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
