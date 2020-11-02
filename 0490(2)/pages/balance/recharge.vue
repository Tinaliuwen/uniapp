<template>
	<view class="container">
		<view class="section u-f-ac">
			<text class="left">当前积分</text>
			<text class="right">￥ 785</text>
		</view>
		<view class="section u-f-ac">
			<text class="left">充值积分</text>
			<view class="right u-f-ac">
				<text>￥</text>
				<input type="number" value="" />
			</view>
		</view>

		<view class="select-pay">选择支付方式</view>
		<!-- <view class="pay-list">
      <view class="pay-item">
        
      </view>
    </view> -->
		<!-- 支付方式 -->
		<view class="payment_methods">
			<radio-group @change="paymentType" style="padding: 12upx 0;">
				<!-- 微信支付 -->
				<view class="webchat com_sty_row">
					<view class="left">
						<image src="../../static/img/webchat2x.png" mode="aspectFit"></image>
						<text>微信</text>
					</view>
					<view class="right"><radio value="webchat" color="#ff594d" style="transform: scale(0.8);"></radio></view>
				</view>
				<!-- 支付宝支付 -->
				<!-- 	<view class="alipay com_sty_row">
					<view class="left">
						<image src="../../static/img/alipay2x.png" mode="aspectFit"></image>
						<text>支付宝支付</text>
					</view>
					<view class="right"><radio value="alipay" style="transform: scale(0.8);"></radio></view>
				</view> -->
				<!-- 积分支付 -->
				<!-- 	<view class="balance com_sty_row">
					<view class="left">
						<image src="../../static/img/balance2x.png" mode="aspectFit"></image>
						<text>积分支付</text>
					</view>
					<view class="right"><radio value="balance" style="transform: scale(0.8);"></radio></view>
				</view> -->
			</radio-group>
		</view>
		<view class="pay-choose" v-if="choose">支付</view>
		<view class="pay" v-else>支付</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			choose:true
		}
	},
	methods: {
		paymentType(e) {
			const paymentType = e.detail.value;
			console.log(paymentType);
			if(paymentType!=""){
				this.choose=false
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	.section {
		height: 100rpx;
		background-color: $uni-bg-color;
		border-bottom: 1rpx solid #f3f3f3;

		.left {
			padding-left: 20rpx;
			margin-right: 30rpx;
			color: #666666;
		}

		.right {
			color: $uni-text-color;
			font-weight: 500;
		}
	}

	.select-pay {
		height: 83rpx;
		line-height: 83rpx;
		padding-left: 20rpx;
		color: #666666;
	}

	.pay-list {
		.pay-item {
			width: 100%;
			height: 100rpx;
			background-color: $uni-bg-color;
		}
	}
}
// 支付方式
.payment_methods {
	padding: 0 27upx 0 20upx;
	// width:100%;
	// height:255upx;
	border-radius: 20upx;
	margin-top: 20upx;
	margin-bottom: 85upx;
	background-color: #ffffff;
	// 共有样式
	.com_sty_row {
		height: 80upx;
		width: 100%;
		padding: 0 19upx 0 16upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left {
			display: flex;
			align-items: center;
			> image {
				height: 58upx;
				width: 58upx;
			}
			> text {
				height: 25upx;
				font-size: 26upx;
				font-weight: 500;
				color: rgba(102, 102, 102, 1);
				line-height: 25upx;
				margin-left: 8upx;
			}
		}
		.right {
		}
	}
}
.pay {
	color: #ffffff;
	background: #ff594d;
	border-radius: 10upx;
	margin: 0 30upx;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100upx;
	font-size: 36upx;
}
.pay-choose {
	color: #666;
	background: #d6d6d6;
	border-radius: 10upx;
	margin: 0 30upx;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100upx;
	font-size: 36upx;
}
</style>
