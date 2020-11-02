<template>
	<view class="setting">
		<view class="info">
			<view class="user-info">
				<view class="">
					<input class="input" type="text" placeholder="请输入昵称" v-model="nickname" maxlength="20"></input>
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
	},
	methods: {
		submit(){
			var self = this;
			if (self.nickname == '') {
				self.$api.msg('用户昵称不能为空');
				return;
			}
			self.$http.post(service.api.upload.update, {
					nickname:self.nickname,
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
		padding: 0px 30rpx;
		background-color: #fff;
	}
}
.input{
	color:#cccccc;
	font-Size:28upx;
	// text-align: right;
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
