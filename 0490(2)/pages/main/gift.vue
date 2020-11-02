<template>
  <view >
  	<web-view src="apiname=com.alipay.account.auth&app_id=2021001197619025&app_name=mc&auth_type=AUTHACCOUNT&biz_type=openservice&method=alipay.open.auth.sdk.code.get&pid=2088931606405945&product_id=AUTHACCOUNT&scope=kuaijie&sign_type=RSA2&target_id=772223&sign=BQK6Xngo2c9pYquHAZWuT5kGE7CsPQuId1KhzGY%2FrH8oXFGLurDa2qRamPBQq4UW4w2J8DCLG6RdWOqizyxNaCW6LJqoJNmyFrz7cg2Tr%2B5dYqZAspC1wcp1XZPOzH83WHwj7vVbss7eIDk173ObMjudeRseFixxxczZ5H2TGf9pBA37Fgnj0Q2xzgpP9aJBmXBsZ6eSINmPKqBHqTOKLmCtTOXwsSTFKb3sRxHNSJevLxzrTM7DOhfH8oHIYXBUV34MtVVo1%2FhHdn%2Bm95fnQ%2FmFLYvRpvm1srGZq%2BOBNo1t4uQxxl8wqwgY29oTDk6OVEE33KDE9R%2F8EqI2qahfkw%3D%3Dsign=BQK6Xngo2c9pYquHAZWuT5kGE7CsPQuId1KhzGY%2FrH8oXFGLurDa2qRamPBQq4UW4w2J8DCLG6RdWOqizyxNaCW6LJqoJNmyFrz7cg2Tr%2B5dYqZAspC1wcp1XZPOzH83WHwj7vVbss7eIDk173ObMjudeRseFixxxczZ5H2TGf9pBA37Fgnj0Q2xzgpP9aJBmXBsZ6eSINmPKqBHqTOKLmCtTOXwsSTFKb3sRxHNSJevLxzrTM7DOhfH8oHIYXBUV34MtVVo1%2FhHdn%2Bm95fnQ%2FmFLYvRpvm1srGZq%2BOBNo1t4uQxxl8wqwgY29oTDk6OVEE33KDE9R%2F8EqI2qahfkw%3D%3D"></web-view>
  </view>
</template>

<script>
	import service from '@/store/service.js';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				integral: '',
				goodsCate:[],
				status:0,
			};
		},
		onShow:function(){
			var self = this;
			self.$http .post(service.api.main.user).then(function(res) {
				if(res.code == 1){
					res = res.data;
					self.integral = res.credit2;
				}else{
					self.$api.msg(res.msg);
				}
			});
		},
		onLoad: function() {
			var self = this;
			self.getGoodsCate()
		},
		methods: {
			getGoodsCate() {
				var self = this;
				self.$http.get(service.api.main.goodsList, {
					type:3
				}).then(function(res) {
					console.log(res);
			
					var list = res.data;
					self.goodsCate = list;
				});
			},
			jumper(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss">
	.head,.gift{
		width: 100%;
		background: #FFFFFF;
	}
	/deep/uni-tabbar {
		display: block !important;
	}
	.header {
		width: 100%;
		height: 270upx;
		background: url(../../static/user/back.png) no-repeat;
		background-size: 100% 100%;
	}

	.header-center {
		position: relative;
		display: flex;
		flex-direction: column;
		left: 0;
		right: 0;
		width: 710upx;
		height: 260upx;
		margin: 0 auto;
		margin-top: -240upx;
		border-radius: 10px;
		.center-top {
			display: flex;
			flex-direction: column;
			text-align: center;
			color: #FFFFFF;
			text:first-child {
				font-size: 32upx;
				margin-top: 48upx;
			}

			text:last-child {
				font-size: 66upx;
			}
		}
		.center-bottom {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding: 20upx 0;
			// height: 90upx;
			border-top: 1px solid #f3f3f3;
			text {
				font-size: 32upx;
				font-weight: bold;
				color: #e98f3f;
			}
			view {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 140upx;
				height: 44upx;
				margin: 0 22upx 0 136upx;
				border: 1px solid #ff594d;
				color: #d16f19;
				border-radius: 20upx;
				text {
					font-size: 24upx;
					font-weight: bold;
				}
				image {
					width: 10upx;
					height: 18upx;
					margin-left: 4upx;
				}
			}
		}
	}
	.gift{
		display: flex;
		.box{
			width: 50%;
			display: flex;
			padding: 30upx 0;
			image{
				width: 60upx;
				height: 60upx;
				margin: 6upx 0;
				margin-left: calc(50% - 140upx);
			}
			.right{
				width: 200upx;
				color: #333333;
				font-size: 30upx;
				font-weight: bold;
				margin-left: 20upx;
				.bom{
					font-size: 26upx;
					color: #999999;
				}
			}
		}
	}

	.goods-section {
		background-color: #f3f3f3;
		padding: 0 20rpx 30rpx;

		.goods-header {
			color: #262626;
			font-size: 34rpx;
			font-weight: bold;
			margin: 20rpx 0;
		}

		.goods-list {
			/* margin-bottom: 50rpx; */
			.goods-item {
				width: 345rpx;
				background-color: #ffffff;
				margin-bottom: 20rpx;
				border-radius: 10upx;

				image {
					width: 100%;
					height: 330rpx;
					border-radius: 10upx 10upx 0upx 0upx;
				}

				.title {
					padding: 10rpx 30rpx 0;
					font-size: 26rpx;
					color: $uni-text-color;
					font-weight: bold;
					line-height: 1.4;
				}

				.price {
					padding: 14rpx 30rpx;
					font-size: 36rpx;
					font-weight: bold;
					color: #ff594d;

					text {
						font-size: 20rpx;
						color: #999;
						text-decoration: line-through;
						margin-left: 15rpx;
					}
				}
			}
		}
	}
</style>
