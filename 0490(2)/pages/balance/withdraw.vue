<
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
			<view class="all">全部提现</view>
		</view>

		<view class="select-pay">提现方式</view>
		<!-- <view class="pay-list">
	    <view class="pay-item">
	      
	    </view>
	  </view> -->
		<!-- 支付方式 -->
		<view class="payment_methods">
			<radio-group @change="paymentType">
				<!-- 微信支付 -->
				<view class="webchat com_sty_row">
					<view class="left">
						<image src="../../static/img/webchat2x.png" mode="aspectFit"></image>
						<text>微信零钱</text>
					</view>
					<view class="right"><radio value="webchat" color="#ff594d" style="transform: scale(0.8);"></radio></view>
				</view>
				<!-- 支付宝支付 -->
				<view class="alipay com_sty_row">
					<view class="left">
						<image src="../../static/img/alipay2x.png" mode="aspectFit"></image>
						<text>添加支付宝</text>
					</view>
					<view class="right"><radio value="alipay" color="#ff594d" style="transform: scale(0.8);"></radio></view>
				</view>
				<!-- 积分支付 -->
				<view class="balance com_sty_row">
					<view class="left">
						<image src="../../static/img/balance2x.png" mode="aspectFit"></image>
						<text>添加银行卡</text>
					</view>
					<view class="right"><radio value="balance" color="#ff594d" style="transform: scale(0.8);"></radio></view>
				</view>
			</radio-group>
		</view>
		
		<!-- 支付方式 -->
		<view class="payment_methods">
			<radio-group @change="paymentType">
				<!-- 微信支付 -->
				<view class="webchat com_sty_row">
					<view class="left">
						<image src="../../static/img/webchat2x.png" mode="aspectFit"></image>
						<text>微信零钱</text>
					</view>
					<view class="right"><radio value="webchat" color="#ff594d"  style="transform: scale(0.8);"></radio></view>
				</view>
				<!-- 支付宝支付 -->
				<view class="alipay com_sty_row">
					<view class="left">
						<image src="../../static/img/alipay2x.png" mode="aspectFit"></image>
						<view class="left-text">
						<text>支付宝</text>
						<text>152*****1236</text>
						</view>
					</view>
					<view class="right"><radio value="alipay" color="#ff594d" style="transform: scale(0.8);"></radio></view>
				</view>
				<!-- 积分支付 -->
				<view class="balance com_sty_row">
					<view class="left">
						<image src="../../static/img/balance2x.png" mode="aspectFit"></image>
						<view class="left-text">
							<text>建设银行</text>
							<text>6612**********122</text>
						</view>
						
					</view>
					<view class="right"><radio value="balance" color="#ff594d" style="transform: scale(0.8);"></radio></view>
				</view>
			</radio-group>
		</view>
		<!-- <view class="pay-choose">支付</view> -->
		<view class="pay">提现</view>
		<view class="explain">
			<view>提现说明</view>
			<view>1. 单笔最小提现额为100元</view>
			<view>2. 提现手续费10%</view>
		</view>
		<view class="consume">
			<view class="consume-img">
				<image class="img" src="../../static/img/withdraw.png" mode=""></image>
				<view class="text">提现申请已提交，等待人工审核</view>
			</view>
		</view>
	</view>
</template>

<script></script>

<style lang="scss" scoped>
.consume-img {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 150upx;
}
.img {
	width: 256upx;
	height: 290upx;
}
.text {
	color: #333;
	font-weight: bold;
}
.container {
	.section {
		height: 100rpx;
		background-color: $uni-bg-color;
		border-bottom: 1rpx solid #f3f3f3;
		margin-right: 20upx;

		.left {
			padding-left: 20rpx;
			margin-right: 30rpx;
			color: #666666;
		}

		.right {
			color: $uni-text-color;
			font-weight: 500;
		}
		.all {
			color: #ff594d;
			// float: right;
			margin-left: 20upx;
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
		height: 100upx;
		width: 100%;
		padding: 0 19upx 0 16upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #f4f4f4;
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
		.left-text{
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: 40upx;
			font-size: 26upx;
			font-weight: 500;
			color: rgba(102, 102, 102, 1);
			line-height: 40upx;
			margin-left: 8upx;
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
.explain{
	margin-left: 18upx;
	margin-top: 30upx;
	color: #666;
	}
</style>
