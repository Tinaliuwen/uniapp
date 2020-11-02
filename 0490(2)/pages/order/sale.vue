<template>
	<view class="sale">
		<view class="order-item">
			<view class="order-top">
				<view class="num">订单单号：SH2020062812345698</view>
				<view class="text">
					<image class="icon" src="../../static/img/icon1.png" mode=""></image>
					<view class="state">退货</view>
				</view>
			</view>
			<view class="order-center">
				<view class="img"><image class="order-img" src="../../static/order/pic.png" mode=""></image></view>
				<view class="center-right">
					<view class="title">塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装</view>
					<view class="detail">
						<view class="detail-price">￥1296</view>
						<view class="detail-num">x1</view>
					</view>
				</view>
			</view>
			<view class="total">
				共1件，合计：
				<view class="money">￥1296</view>
			</view>
			<view class="bottom"><view class="warn">处理中</view></view>
		</view>
		<view class="order-item">
			<view class="order-top">
				<view class="num">订单单号：SH2020062812345698</view>
				<view class="text">
					<image class="icon" src="../../static/img/iocn2.png" mode=""></image>
					<view class="state">退款</view>
				</view>
			</view>
			<view class="order-center">
				<view class="img"><image class="order-img" src="../../static/order/pic.png" mode=""></image></view>
				<view class="center-right">
					<view class="title">塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装</view>
					<view class="detail">
						<view class="detail-price">￥1296</view>
						<view class="detail-num">x1</view>
					</view>
				</view>
			</view>
			<view class="total">
				共1件，合计：
				<view class="money">￥1296</view>
			</view>
			<view class="bottom"><view class="warn">已处理</view></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.order-item {
	margin: 20upx;
	background-color: #fff;
	padding: 30upx 22upx 24upx 22upx;
	border-radius: 20upx;
}
.order-top {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.num {
	font-size: 26upx;
	color: #666666;
}
.text {
	display: flex;
	align-items: center;
}
.state {
	color: #333;
	font-weight: bold;
}
.order-center {
	border-bottom: 1px solid #ccc;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.img {
	width: 190upx;
	margin-top: 30upx;
	margin-bottom: 24upx;
}
.order-img {
	width: 100%;
	height: 190upx;
}
.center-right {
	flex: 1;
	margin-left: 25upx;
}
.title {
	color: #333;
	font-size: 26upx;
	font-weight: bold;
	margin-bottom: 20upx;
}
.detail {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.detail-price {
	color: #333;
	font-size: 32upx;
	font-weight: bold;
}
.detail-num {
	color: #333;
	font-size: 24upx;
	font-weight: bold;
}
.total {
	display: flex;
	justify-content: flex-end;
	color: #333;
	font-weight: bold;
	padding: 20upx 0;
}
.bottom {
	display: flex;
	justify-content: flex-end;
}
.money {
	color: #ff594d;
	font-weight: bold;
}
.back {
	border: 1px solid #999;
	border-radius: 33upx;
	padding: 0 45upx;
	height: 65upx;
	display: flex;
	align-items: center;
	color: #666;
	margin-right: 24upx;
}
.warn {
	border: 1px solid #ff594d;
	border-radius: 33upx;
	padding: 0 45upx;
	height: 65upx;
	display: flex;
	align-items: center;
	color: #ff594d;
}
.icon {
	width: 60upx;
	height: 60upx;
}
</style>
