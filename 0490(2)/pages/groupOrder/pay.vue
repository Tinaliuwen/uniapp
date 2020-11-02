<template>
	<view class="pay">
		<view class="state">
			<view>
				<view class="success">待付款</view>
				<view class="total-price">订单金额：129 元 + 1296 积分</view>
			</view>
			<image class="pay-img" src="../../static/order/pay.png" mode=""></image>
		</view>

		<view class="content">
			<view class="center">
				<image class="icon" src="../../static/img/location.png" mode=""></image>
				<view class="container">
					<view class="text">
						<view class="name">凌小姐</view>
						<view>15217543689</view>
					</view>
					<view class="address">广州市天河区中山大道206</view>
				</view>
			</view>

			<image class="right" src="../../static/img/right.png" mode=""></image>
		</view>
		<view class="order-center">
			<view class="img"><image class="order-img" src="../../static/order/pic.png" mode=""></image></view>
			<view class="center-right">
				<view class="title">日本大米原装进口樱花大米2kg*2袋 组合装板桥米谷店越光米寿司米</view>
				<view class="detail">
					<view class="detail-price">￥129</view>
					<view class="detail-num">x1</view>
				</view>
			</view>
		</view>
		<view class="content-center">
			<view class="price">
				<view class="price-text">运费</view>
				<view class="money">￥0.00</view>
			</view>
			<view class="total">
				<view class="total-text">订单总价（含运费）</view>
				<view class="total-price-right">￥129</view>
			</view>
		</view>
		<view class="order-bottom">
			<view class="copy">
				<view><text>订单编号：</text>SH20200214578963548</view>
				<!-- <view class="copy-text">复制</view> -->
			</view>

			<view class="time"><text>下单时间：</text>2020-11-22 11:46</view>
			<view class="bottom">
				<view class="back">修改地址</view>
				<view class="back">取消订单</view>
				<view class="warn">去参团</view>
			</view>
		</view>
	</view>
</template>

<script></script>

<style scoped>
.state {
	background: linear-gradient(90deg, rgba(218,98,25,1) 35%, rgba(241,146,81,1) 100%);
	height: 186upx;
	display: flex;
	/* flex-direction: column; */
	/* justify-content: space-around; */
	justify-content: space-between;
	align-items: center;
	padding: 0 27upx;
	box-sizing: border-box;
	color: #fff;
	margin-bottom: 20upx;
}
.success {
	font-size: 42upx;
	/* margin-top: 45upx; */
	/* font-weight: bold; */
}
.total-price {
	font-size: 24upx;
}
.pay-img {
	width: 235upx;
	height: 126upx;
}
.content {
	display: flex;
	align-items: center;
	background-color: #fff;
	justify-content: space-between;
	padding: 0 20upx;
	margin-bottom: 20upx;
	height: 160upx;
}
.center {
	display: flex;
	align-items: center;
}
.icon {
	width: 50upx;
	height: 50upx;
	margin-right: 20upx;
}
.text {
	display: flex;
	font-size: 30upx;
	font-weight: bold;
	color: #333;
}
.message {
	color: #ff594d;
}
.update-time {
	font-size: 22upx;
	color: #999;
}
.name {
	margin-right: 32upx;
}
.address {
	color: #666;
	font-size: 26upx;
}
.right {
	width: 40upx;
	height: 40upx;
}
.order-center {
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20upx;
}
.img {
	width: 190upx;
	margin-top: 30upx;
	margin-bottom: 24upx;
}
.order-img {
	width: 145.3upx;
	height: 144.7upx;
}
.center-right {
	/* flex: 1; */
	margin-left: 25upx;
	/* padding: 20upx 0; */
	box-sizing: border-box;
	
}
.title {
	color: #333;
	font-size: 32upx;
	font-weight: 500;
	margin-bottom: 14upx;
	line-height: 1.5;
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
.content-center {
	background-color: #fff;
	margin-bottom: 20upx;
}
.price,
.total {
	display: flex;
	justify-content: space-between;
	padding: 0 20upx;
}
.total {
	margin-top: 40upx;
	padding-bottom: 30upx;
}
.total-text {
	color: #333;
	font-weight: 500;
}
.total-price-right {
	color: #ff594d;
	font-size: 32upx;
	font-weight: bold;
}
.order-bottom {
	background-color: #fff;
	padding: 30upx 0;
}
.copy {
	display: flex;
	align-items: center;
	font-size: 28upx;
	padding: 0 20upx;
}
.copy>view:nth-child(1) text{
	color: #999999;
}
.copy-text {
	border: 1px solid #797979;
	border-radius: 20upx;
	width: 78upx;
	height: 38upx;
	line-height: 38upx;
	text-align: center;
	margin-left: 14upx;
	color: #797979;
	box-sizing: border-box;
	font-size: 20upx;
}
.time {
	margin-top: 10upx;
	font-size: 28upx;
	padding: 0 20upx;
}
.time>text{
	color: #999999;
	
}
.price-text {
	color: #999;
}
.money {
	color: #35393b;
	font-weight: bold;
}
.bottom {
	display: flex;
	justify-content: flex-end;
	margin-top: 50upx;
	padding-top: 26upx;
	border-top:1px solid rgba(241,241,241,1);
}
.back {
	border: 1px solid #999;
	border-radius: 27upx;
	width: 159upx;
	height: 56upx;
	line-height: 56upx;
	text-align: center;
	box-sizing: border-box;
	color: #666;
	margin-right: 24upx;
}
.warn {
	border: 1px solid #ff594d;
	border-radius: 33upx;
	width: 159upx;
	height: 56upx;
	line-height: 56upx;
	text-align: center;
	box-sizing: border-box;
	color: #ff594d;
	margin-right: 20upx;
}
</style>
