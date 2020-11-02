<template>
	<view class="pay">
		<view class="state">
			<view>
				<view class="success">待付款</view>
				<view class="total-price">订单金额 : 129 元 + 1296 积分</view>
			</view>
			<image class="delivery-img" src="../../static/order/pay.png" mode=""></image>
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
				<view>订单编号：SH20200214578963548</view>
			</view>

			<view class="time">创建时间：2020-11-22 11:46</view>
			<view class="bottom">
				<view class="back"  @click="isMask=!isMask">取消订单</view>
				<view class="warn">去付款</view>
			</view>
		</view>
		<view class="mask" v-show="isMask">
			<view class="mask_top"></view>
			<view class="mask_content">
				<!-- 标题 -->
				<view class="title">
					<text>请选择取消订单原因</text>
					<!-- <image src="../../static/icon/cha.png" mode="aspectFit" @tap="maskShow(false)"></image> -->
				</view>
				<!-- 相泽祥 -->
				<view class="options">
					<radio-group @change="_returnReason">
						<view class="list">
							<text class="common_text_style">我不想买了</text>
							<radio value="我不想买了" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
						<view class="list">
							<text class="common_text_style">信息填写错误，重拍</text>
							<radio value="信息填写错误，重拍" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
						<view class="list">
							<text class="common_text_style">卖家缺货</text>
							<radio value="卖家缺货" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
						<view class="list">
							<text class="common_text_style">同城见面交易</text>
							<radio value="同城见面交易" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
						<view class="list list_end">
							<text class="common_text_style">其他原因</text>
							<radio value="其他原因" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
					</radio-group>
					<!-- 确认按钮 -->
					<view class="btn">
						<view class="confirm" @tap="maskShow(false)">取消</view>
						<view class="confirm confirm-btn" @tap="maskShow(false)">确定</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				isMask: false, //遮罩
			}
		},
		methods:{
			// 遮罩
			maskShow(boolean) {
				this.isMask = boolean
				if (boolean) {}
			},
			// 退货原因
			_returnReason(returnReason) {
				if (returnReason) {
					this.returnReason = returnReason.detail.value
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.state {
	background: #e6852d;
	height: 186upx;
	display: flex;
	/* flex-direction: column; */
	justify-content: space-around;
	align-items: center;
	color: #fff;
	margin-bottom: 20upx;
}
.success {
	font-size: 42upx;
	/* margin-top: 45upx; */
	font-weight: bold;
}
.total-price {
	font-size: 24upx;
}
.delivery-img {
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
	width: 100%;
	height: 190upx;
}
.center-right {
	flex: 1;
	margin-left: 25upx;
}
.title {
	color: #333;
	font-size: 30upx;
	font-weight: 500;
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
	padding: 30upx 20upx;
}
.copy {
	display: flex;
	align-items: center;
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
}
.time {
	margin-top: 10upx;
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
	margin-top: 76upx;
}
.back {
	border: 1px solid #999;
	border-radius: 33upx;
	padding: 0 20upx;
	height: 56upx;
	display: flex;
	align-items: center;
	color: #666;
	margin-right: 24upx;
}
.warn {
	border: 1px solid #ff594d;
	border-radius: 33upx;
	padding: 0 20upx;
	height: 56upx;
	display: flex;
	align-items: center;
	color: #ff594d;
	margin-right: 20upx;
}

	// 遮罩样式
	.mask {
		position: fixed;
		top: 0;
		// right: 60upx;
		// left: 60upx;
		bottom: 0;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		z-index: 99;

		.mask_top {
			opacity: 0.53;
			background: rgba(0, 0, 0, 1);
			flex: 1;
		}

		.mask_content {
			height: 760upx;
			margin: 0 60upx 300upx 60upx;
			// width: 100%;
			background-color: #ffffff;
			position: absolute;
			bottom: 0;
			right: 0;
			left: 0;
			background: rgba(255, 255, 255, 1);
			border-radius: 12upx;
			padding-top: 42upx;
			// box-sizing: border-box;

			.title {
				height: 105upx;
				width: 100%;
				display: flex;
				justify-content: center;
				// padding: 0 15upx 0 272upx;
				align-items: center;
				box-sizing: border-box;
				padding-bottom: 30upx;
				border-bottom: 1px solid #f1f1f1;

				>text {
					height: 34upx;
					font-size: 32upx;
					font-weight: bold;
					color: rgba(51, 51, 51, 1);
					line-height: 34upx;
				}

				>image {
					height: 58upx;
					width: 58upx;
				}
			}
		}
	}

	.options {
		margin-top: 10upx;

		.list {
			height: 100upx;
			width: 100%;
			padding: 0 30upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			color: #333;
			font-size: 32upx;
			// border-bottom: 1px solid rgba(244, 244, 244, 1);
		}

		.list_end {
			border-bottom: 0;
		}
	}

	.btn {
		display: flex;
		justify-content: space-between;
		align-items: center;
		// width: 710upx;
		height: 100upx;
		// background: linear-gradient(90deg, rgba(233, 144, 64, 1) 0%, rgba(255, 123, 76, 1) 100%);
		// border-radius: 10upx;
		font-size: 36upx;
		font-weight: 500;
		text-align: center;
		line-height: 100upx;
		// color: rgba(255, 255, 255, 1);
		margin: 25upx auto;
		color: #333;
		font-size: 32upx;

		.confirm {
			width: 50%;
		}

		.confirm-btn {
			color: #000;
			font-weight: bold;
		}
	}
</style>
