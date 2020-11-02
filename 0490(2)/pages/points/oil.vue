<template>
	<view class="quality">
		<view class="all">
			<view class="allB">
				<view class="product">
					<view class="shop_image"><image src="../../static/img/points/pic.png" mode="widthFix"></image></view>
					<view class="commodity">
						<view class="t1">日本大米原装进口樱花大米2kg*2袋组合装...</view>
						<view class="l_price">
							<text class="t4">1296积分</text>
							<text class="card">￥2999</text>
						</view>
					</view>
				</view>
				<view class="product">
					<view class="shop_image"><image src="../../static/img/points/pic.png" mode="widthFix"></image></view>
					<view class="commodity">
						<view class="t1">日本大米原装进口樱花大米2kg*2袋组合装...</view>
						<view class="l_price">
							<text class="t4">1296积分</text>
							<text class="card">￥2999</text>
						</view>
					</view>
				</view>
				<view class="product">
					<view class="shop_image"><image src="../../static/img/points/pic.png" mode="widthFix"></image></view>
					<view class="commodity">
						<view class="t1">日本大米原装进口樱花大米2kg*2袋组合装...</view>
						<view class="l_price">
							<text class="t4">1296积分</text>
							<text class="card">￥2999</text>
						</view>
					</view>
				</view>
				<view class="product">
					<view class="shop_image"><image src="../../static/img/points/pic.png" mode="widthFix"></image></view>
					<view class="commodity">
						<view class="t1">日本大米原装进口樱花大米2kg*2袋组合装...</view>
						<view class="l_price">
							<text class="t4">1299元+1291积分</text>
							<text class="card">￥2999</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fff;
	}
.all {
	width: 100%;

		.top1 {
			color: #333333;
			font-size: 34rpx;
			font-weight: bold;
		}

		.top2 {
			font-size: 23upx;
			color: #ef7c38;
		}

	.allB {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		padding: 0 20upx;
		box-sizing: border-box;
		margin-bottom: 20upx;
		margin-top: 20upx;

		.product {
			margin: 10rpx;
			box-sizing: border-box;
			width: calc(50% - 20upx);
			// box-shadow: 0 0 5upx #999999;
			border-radius:10upx;
			background-color: #fff;
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
				margin-left: 20upx;
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
					margin: 20rpx 0;
					.t2 {
						font-size: 24rpx;
						color: #b7b7b7;
					}
					.t4 {
						color: #e78c3a;
						font-weight: bold;
						font-size: 32upx;
					}
					// .t5{
					// 	color: #E78C3A;
					// 	font-size: 24upx;
					// }
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
				// border-radius: 10upx 10upx 0px 0px;
				// height: 341upx;
				// margin: 10upx 10upx 0 10upx;
			}
		}
	}
}
</style>
