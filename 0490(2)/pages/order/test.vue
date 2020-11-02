<template>
	<view>
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
export default {
	data() {
		return {
			isMask: true //遮罩
		};
	},
	methods: {
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
};
</script>

<style lang="less" scoped>
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
		margin:0 60upx 300upx 60upx;
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
			> text {
				height: 34upx;
				font-size: 32upx;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				line-height: 34upx;
			}

			> image {
				height: 58upx;
				width: 58upx;
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
}
</style>
