<template>
  <view class="container">
	<view class="head">
		<view class="header"></view>
		<view class="header-center">
			<view class="center-top">
				<text>我的积分</text>
				<text>{{ integral }}</text>
			</view>
			
				<!-- <view class="center-right" @click="jump('/pages/index/cart')">补货单</view> -->
		</view>
	</view>
	
	<!-- <view class="gift">
		<view class="box">
			<image src="/static/user/gift1.png" mode="widthFix"></image>
			
			<view class="right">
				<view class="top">现金积分明细</view>
				<view class="bom">赚的花的都清楚</view>
			</view>
		</view>
		
		<view class="box">
			<image src="/static/user/gift3.png" mode="widthFix"></image>
			
			<view class="right">
				<view class="top">购物车</view>
				<view class="bom">添加商品一次付款</view>
			</view>
		</view>
	</view> -->

	<!-- 精选商品 -->
	<view class="goods-section">
		<view class="goods-header">爆款推荐</view>
		<view class="goods-list u-f-jsb u-f-fw">
			<view class="goods-item" @click="jump(`/pages/category/commodity?id=${item.id}`)" v-for="(item,index) in goodsCate" :key="index">
				<image :src="item.logo" mode=""></image>
				<view class="title u-line-clamp">{{item.title}}</view>
				<view class="price u-f-ac">
					￥{{item.discount_price}}
					<text>￥{{item.price_cost}}</text>
				</view>
			</view>
		</view>
		
		<uni-load-more :status="status"></uni-load-more>
	</view>
    
    <!-- <tabbar status="3" type="0"></tabbar> -->
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
					type:2
				}).then(function(res) {
					console.log(res);
			
					var list = res.data;
					list.forEach(item=>{
						var ratio = item.discount.discount_ratio;
						if(ratio == 0 || ratio == null){
							var discount = 1;
						}else{
							var discount = ratio / 10;
						}
						var price = Math.floor(item.price_market * discount * 100) / 100;
						item.discount_price = price;
					})
					self.goodsCate = list;
				});
			},
			jump(url){
				console.log(url)
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
	.header {
		width: 100%;
		height: 270upx;
		background: url(../../static/user/back.png) no-repeat;
		background-size: 100% 100%;
	}

	.header-center {
		position: relative;
		/* display: flex; */
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
				height: 90upx;
			}
		}
		.center-right{
			float: right;
			height: 60upx;
			width: 200upx;
			color: #FFFFFF;
			text-align: center;
			line-height: 60upx;
			background: #ff7c7c;
			margin-top: -100upx;
			margin-right: -50upx;
			position: relative;
			z-index: 500;
			border-radius: 30upx 0 0 30upx;
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
				margin-left: calc(50% - 150upx);
			}
			.right{
				width: 220upx;
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
