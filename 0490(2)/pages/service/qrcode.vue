<template>
	<view class="container">
		<image :src="qrcode" mode="" class="pageurl" v-if="type == 1"></image>

		<view class="center">
			<image :src="links" mode="" class="qrcode"></image>
			<!-- <view class="code">邀请码：{{code}}</view> -->
			<view class="buttom">
				<view class="btn-left" @click="save(qrcode)">保存图片</view>
				<view class="text">点击保存二维码可分享</view>
			</view>
		</view>
	</view>
</template>

<script>
import service from '@/store/service.js';
	export default {
		data() {
			return {
				type: 1,
				qrcode: '',
				code:'',
				logo: '',
				saveurl: '',
				share_bg: "",
				links:'',
			}; 
		},
		onShow: function() {
		var self = this;
			self.$http .post(service.api.service.qrcode).then(function(res) {
				if(res.code == 1){
					res = res.data;
					self.qrcode = res.code;
					self.links = res.links;
					self.code = res.icode;
				}else{
					self.$api.msg(res.msg);
				}
			});
		},
		methods: {
			//保存海报
			save(url) {
				var self = this;
				//#ifdef H5
				uni.showToast({
					icon: 'none',
					title: '该功能只能在APP端使用'
				})
				//#endif
				//#ifndef H5 
				uni.saveImageToPhotosAlbum({
					filePath: this.qrcode,
					success: function() {
						uni.showToast({
							icon: 'none',
							title: '海报保存成功，请前往手机相册查看！'
						});
					}
				});
				//#endif
			},
		}
	}
</script>

<style>
	.pageurl {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 50;
		/* opacity: .6; */
	}

	.center {
		width: 560upx;
		margin: 100upx calc(50% - 280upx) 0;
		position: fixed;
		z-index: 100;
	}

	.center-img {
		width: 100%;
		height: 1000upx;
		position: absolute;
		z-index: 200;
		box-shadow: 0 0 40upx #FFFFFF;
	}

	.logo,
	.logo1 {
		width: 100upx;
		height: 100upx;
		position: absolute;
		z-index: 300;
		margin: 200upx calc(50% - 50upx) 0;
	}

	.logo1 {
		margin-top: 60upx;
	}

	.qrcode,
	.qrcode1 {
		width: 180upx;
		height: 180upx;
		position: relative;
		z-index: 300;
		margin: 500upx calc(50% - 90upx) 0;
	}
	.qrcode1 {
		margin-top: 480upx;
	}
.code{
	display: flex;
	align-items: center;
	justify-content: center;
	font-size:47upx;
	font-weight:bold;
	color: #fff;
	margin-top: 40upx;
}
	.buttom {
		width: 560upx;
		z-index: 300;
		bottom: 50upx;
		position: fixed;
		bottom: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* position: fixed; */
		margin-top: 50upx;
		font-size: 28upx;
		font-weight: bold;
	}

	.btn-left,
	.btn-right {
		width: 48%;
		margin: 0 auto;
		height: 82upx;
		text-align: center;
		line-height: 82upx;
		border-radius: 40upx;
	}

	.btn-left {
		color: #DC2430;
		background: #fff;
		font-size:34upx;
		font-weight: 500;
	}

	.btn-right {
		color: #555555;
		background: #FFFFFF;
	}
	.text{
		margin-top: 30upx;
		font-size:24upx;
		color: #fff;
		font-weight: 500;
	}
</style>
