<template>
	<view class="shopping-cart">
		<view class="consume-img">
			<image class="img" src="../../static/img/result1.png" mode=""></image>
			<view class="text">申请成功，等待平台联系入驻</view>
		</view>
		<view class="shopping"><view class="shopping-text">去首页</view></view>
		<view class="consume-img">
			<image class="img" src="../../static/img/result1.png" mode=""></image>
			<view class="text">申请失败，提交资料不符合条件</view>
		</view>
		<view class="shopping"><view class="shopping-text">重新申请</view></view>
		<view class="consume-img">
			<image class="img" src="../../static/img/result2.png" mode=""></image>
			<view class="tips">
				<view class="success">入驻信息及资提交成功</view>
				<view class="wait">请耐心等待平台审核</view>
			</view>
		</view>
		<view class="shopping"><view class="shopping-text">去首页</view></view>
	</view>
</template>

<script></script>

<style scoped>
.consume-img {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 160upx;
}
.img {
	width: 522upx;
	height: 420upx;
}
.text {
	color: #333;
	font-weight: bold;
}
.shopping {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 150upx;
}
.shopping-text {
	width: 240upx;
	height: 88upx;
	line-height: 88upx;
	text-align: center;
	color: #fff;
	border-radius: 44upx;
	background: linear-gradient(90deg, rgba(233, 144, 64, 1) 0%, rgba(255, 123, 76, 1) 100%);
	font-size: 36upx;
}
.tips {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.success {
	font-size: 32upx;
	color: #333333;
	font-weight: bold;
	margin-bottom: 20upx;
}
.wait {
	color: #666666;
}
</style>
