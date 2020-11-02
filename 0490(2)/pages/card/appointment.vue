<template>
	<view class="appointment">
		<image class="img" src="../../static/img/appointment.png" mode=""></image>
		<view class="content">
			<text class="tips">预约提交成功</text>
			<text class="wait">正在审核中，请等待.…</text>
		</view>
	</view>
</template>

<script></script>

<style scoped>
.appointment {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.img {
	padding-top: 240upx;
	height: 355rpx;
}
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #333333;
	font-size: 32rpx;
	font-weight: bold;
}
.wait {
	font-weight: 100;
}
</style>
