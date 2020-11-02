<template>
	<view class="my-points">
		<view class="points">
			<image class="points-img" src="../../static/img/points/bg.png" mode=""></image>
			<view class="points-top">
				<view class="text">可用积分</view>
				<view class="num">54321</view>
			</view>
			<view class="bg" @click="jump('/pages/points/rule')">积分规则</view>
			<view class="points-content">
				<view class="points-text" @click="jump('/pages/points/detail')">
					<image class="icon" src="../../static/img/points/icon1.png" mode=""></image>
					<view @click="jump('/pages/points/pointsAll')">
						<view class="text1">积分明细</view>
						<view class="text2">赚的花的都清楚</view>
					</view>
				</view>
				<view class="points-text" @click="jump('/pages/points/record')">
					<image class="icon" src="../../static/img/points/icon2.png" mode=""></image>
					<view>
						<view class="text1">兑换记录</view>
						<view class="text2">兑换实物实查看</view>
					</view>
				</view>
			</view>
			<view class="banner">
				<swiper :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item>
						<view class="swiper-item"><image class="banner-img" src="../../static/img/points/banner.png" mode=""></image></view>
					</swiper-item>
				</swiper>
			</view>
			<view class="nav">
				<view class="nav-item" @click="jump('/pages/points/qualityRice')">
					<image class="icon-img" src="../../static/img/points/icon3.png" mode=""></image>
					<view>优质米</view>
				</view>
				<view class="nav-item" @click="jump('/pages/points/food')">
					<image class="icon-img" src="../../static/img/points/icon4.png" mode=""></image>
					<view>粗粮</view>
				</view>
				<view class="nav-item" @click="jump('/pages/points/oil')">
					<image class="icon-img" src="../../static/img/points/icon5.png" mode=""></image>
					<view>粮油</view>
				</view>
				<view class="nav-item" @click="jump('/pages/points/other')">
					<image class="icon-img" src="../../static/img/points/icon6.png" mode=""></image>
					<view>其他</view>
				</view>
			</view>
		</view>
		<!-- <view class="recommend">
			<view>爆款推荐</view>
			<view class="all">
				<view class="product">
					<view class="shop_image"><image class="image" src="../../static/img/points/pic.png" mode="widthFix"></image></view>
					<view class="commodity">
						<view class="title">日本大米原装进口樱花大米2kg*2袋组合装...</view>
						<view class="price">
							<text class="number">1296积分</text>
							<text class="commodity-price">￥2999</text>
						</view>
					</view>
				</view>
			</view>
		</view> -->

		<view class="all">
			<view class="top"><view class="top1">推荐产品</view></view>
			<view class="allB">
				<view class="product" @click="jump('/pages/points/commodity')">
					<view class="shop_image"><image src="../../static/img/points/pic.png" mode="widthFix"></image></view>
					<view class="commodity">
						<view class="t1">日本大米原装进口樱花大米2kg*2袋组合装...</view>
						<view class="l_price">
							<view>
								<text class="t4">1296</text>
								<text class="t5">积分</text>
							</view>
							<!-- <text class="t2">/</text>
							<image src="/static/icon/icon.png" mode=""></image>
							<text class="t3">{{it.price_market}}</text> -->
							<!-- <image src="/static/icon/card.png" mode="widthFix" class="card" @click.stop="addcard(it.id)"></image> -->
							<text class="card">￥2999</text>
						</view>
					</view>
				</view>
				<view class="product" @click="jump('/pages/points/commodity')">
					<view class="shop_image"><image src="../../static/img/points/pic.png" mode="widthFix"></image></view>
					<view class="commodity">
						<view class="t1">日本大米原装进口樱花大米2kg*2袋组合装...</view>
						<view class="l_price">
							<view>
								<text class="t4">1296</text>
								<text class="t5">积分</text>
							</view>
							<!-- <text class="t2">/</text>
							<image src="/static/icon/icon.png" mode=""></image>
							<text class="t3">{{it.price_market}}</text> -->
							<!-- <image src="/static/icon/card.png" mode="widthFix" class="card" @click.stop="addcard(it.id)"></image> -->
							<text class="card">￥2999</text>
						</view>
					</view>
				</view>
				<view class="product" @click="jump('/pages/points/commodity')">
					<view class="shop_image"><image src="../../static/img/points/pic.png" mode="widthFix"></image></view>
					<view class="commodity">
						<view class="t1">日本大米原装进口樱花大米2kg*2袋组合装...</view>
						<view class="l_price">
							<view>
								<text class="t4">1296</text>
								<text class="t5">积分</text>
							</view>
							<!-- <text class="t2">/</text>
							<image src="/static/icon/icon.png" mode=""></image>
							<text class="t3">{{it.price_market}}</text> -->
							<!-- <image src="/static/icon/card.png" mode="widthFix" class="card" @click.stop="addcard(it.id)"></image> -->
							<text class="card">￥2999</text>
						</view>
					</view>
				</view>
				<view class="product" @click="jump('/pages/points/commodity')">
					<view class="shop_image"><image src="../../static/img/points/pic.png" mode="widthFix"></image></view>
					<view class="commodity">
						<view class="t1">日本大米原装进口樱花大米2kg*2袋组合装...</view>
						<view class="l_price">
							<view>
								<text class="t4">1296</text>
								<text class="t5">积分</text>
							</view>
							<!-- <text class="t2">/</text>
							<image src="/static/icon/icon.png" mode=""></image>
							<text class="t3">{{it.price_market}}</text> -->
							<!-- <image src="/static/icon/card.png" mode="widthFix" class="card" @click.stop="addcard(it.id)"></image> -->
							<text class="card">￥2999</text>
						</view>
					</view>
				</view>
			</view>

			<view class="more">没有更多的数据了~</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		jump(url) {
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.my-points {
	position: relative;
}

.points {
	background-color: #fff;
}

.points-img {
	width: 748upx;
	height: 264upx;
}

.points-top {
	display: flex;
	align-items: center;
	flex-direction: column;
	position: absolute;
	top: 64upx;
	left: 284upx;
}

.text {
	color: #fff;
	font-weight: bold;
}

.num {
	color: #fff;
	font-size: 66upx;
	font-weight: bold;
}

.bg {
	width: 152upx;
	height: 58upx;
	line-height: 58upx;
	text-align: center;
	background: rgba(255, 211, 164, 1);
	border-radius: 26upx 0px 0px 26upx;
	color: #8a4f23;
	position: absolute;
	top: 64upx;
	right: 0;
}

.points-content {
	display: flex;
	padding: 48upx 72upx;
}

.icon {
	width: 52upx;
	height: 52upx;
	margin-right: 22upx;
}

.points-text {
	display: flex;
	align-items: center;
}

.points-text:nth-of-type(1) {
	margin-right: 120upx;
}

.text1 {
	color: #333;
	font-size: 26upx;
	font-weight: bold;
}

.text2 {
	color: #999999;
	font-size: 22upx;
}

.banner {
	margin-bottom: 56upx;
}

.swiper-item {
	width: 710upx;
	height: 180upx;
}

.banner-img {
	width: 100%;
	height: 180upx;
	margin-left: 20upx;
}

.nav {
	display: flex;
	width: 100%;
	padding-bottom: 40upx;
}

.nav-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 25%;
}

.icon-img {
	width: 90upx;
	height: 90upx;
}

.recommend {
	padding: 45upx 0 28upx 25upx;
	font-size: 34upx;
	font-weight: bold;
}

.image {
	width: 345upx;
	height: 330upx;
	border-radius: 10upx 10upx 0px 0px;
}

.all {
	width: 100%;
	.top {
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		// padding: 29rpx 22rpx 20rpx 22rpx ;
		margin: 30rpx 0;

		.top1 {
			color: #333333;
			font-size: 32rpx;
			font-weight: bold;
		}

		.top2 {
			font-size: 23upx;
			color: #ef7c38;
		}
	}

	.allB {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		padding: 0 20upx;
		box-sizing: border-box;
		border-radius: 10upx;

		.product {
			margin: 10rpx;
			box-sizing: border-box;
			width: calc(50% - 20upx);
			box-shadow: 0 0 5upx #999999;
			background-color: #ffffff;

			.name {
				font-size: 23upx;
				margin: 8rpx 0;
				color: #333333;
				font-weight: bold;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}

			.commodity {
				// display: flex;
				margin: 0 10upx;
				.t1 {
					height: 90rpx;
					font-size: 26rpx;
					color: #333333;
					font-weight: bold;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.l_price {
					display: flex;
					flex-direction: column;

					// align-items: center;
					// justify-content: space-between;
					// text-align: center;
					margin: 20rpx 0;

					.t2 {
						font-size: 24rpx;
						color: #b7b7b7;
					}

					.t4 {
						color: #e78c3a;
						font-weight: bold;
						font-size: 36upx;
					}

					.t5 {
						color: #e78c3a;
						font-size: 24upx;
					}

					.t3 {
						color: #ffd200;
						font-size: 24rpx;
					}

					image {
						width: 24rpx;
						height: 24rpx;
					}

					.card {
						float: right;
						// width: 40upx;
						height: 40upx;
						margin-right: 20upx;
						font-size: 20upx;
						color: #999;
						text-decoration: line-through;
						font-weight: bold;
					}
				}
			}

			.shop_image {
				width: 100%;
				height: 345rpx;
				overflow: hidden;
			}

			image {
				width: 341upx;
				border-radius: 10upx 10upx 0px 0px;
				// height: 341upx;
				// margin: 10upx 10upx 0 10upx;
			}
		}
	}

	.more {
		width: 100vw;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		font-size: 24upx;
		color: #666666;
	}
}

uni-swiper {
	display: block;
	height: 90px;
}
</style>
