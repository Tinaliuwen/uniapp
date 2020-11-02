<template>
	<view class="confirm_order">
		<!-- 联系人 -->
		<view class="contact">
			<view class="top">
				<text class="name">兮兮林</text>
				<text class="phone">15912548789</text>
			</view>
			<view class="bottom">
				<!-- 地址 -->
				<view class="address"><text>北京市 朝阳区三里屯北路19号三里屯太古里北区区N8楼9层</text></view>
				<!-- 右箭头 -->
				<view class="icon_right"><image src="../../static/img/right.png" mode="aspectFit"></image></view>
			</view>
		</view>
		<!-- 商品信息 -->
		<view class="goods_list">
			<view class="info">
				<view class="img"><image src="../../static/order/pic.png" mode="aspectFit"></image></view>
				<view class="detail">
					<!-- 标题 -->
					<text class="title">塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装</text>
					<!-- 套餐类型 -->
					<text class="type">标准套餐</text>
					<!-- 金额数量 -->
					<view class="note">
						<text class="total">￥1299.00</text>
						<text class="num">×1</text>
					</view>
				</view>
			</view>
			<view class="comment"><text>买家留言：选填，填写内容与商家协商确认</text></view>
		</view>
		<!-- 金额-数量 信息 -->
		<view class="money_options">
			<!-- 商品金额 -->
			<view class="money com_money_sty">
				<text class="title com_tx_sty">商品金额：</text>
				<text class="com_sum_sty">￥1299</text>
			</view>
			<!-- 邮费 -->
			<view class="postage com_money_sty">
				<text class="com_tx_sty">邮费</text>
				<text class="com_sum_sty">包邮</text>
			</view>
			<!-- 商品金额 -->
			<view class="com_money_sty">
				<text class="com_tx_sty">商品金额：</text>
				<text class="com_sum_sty">￥1299</text>
			</view>
			<!-- 发票 -->
			<view class="receipt">
				<view class="top">
					<text>发票</text>
					<view class="img" @click="checked = !checked"><radio color="#ff594d" :checked="checked" style="transform: scale(0.8);"></radio></view>
				</view>
				<text class="note">注：需要发票，请联系客服获取</text>
			</view>
		</view>
		<!-- 支付方式 -->
		<view class="payment_methods">
			<radio-group @change="paymentType">
				<!-- 微信支付 -->
				<view class="webchat com_sty_row">
					<view class="left">
						<image src="../../static/img/webchat2x.png" mode="aspectFit"></image>
						<text>微信支付</text>
					</view>
					<view class="right"><radio value="webchat" color="#ff594d" style="transform: scale(0.8);"></radio></view>
				</view>
				<!-- 支付宝支付 -->
				<view class="alipay com_sty_row">
					<view class="left">
						<image src="../../static/img/alipay2x.png" mode="aspectFit"></image>
						<text>支付宝支付</text>
					</view>
					<view class="right"><radio value="alipay" color="#ff594d" style="transform: scale(0.8);"></radio></view>
				</view>
				<!-- 积分支付 -->
				<view class="balance com_sty_row">
					<view class="left">
						<image src="../../static/img/balance2x.png" mode="aspectFit"></image>
						<text>积分支付</text>
					</view>
					<view class="right"><radio value="balance" color="#ff594d" style="transform: scale(0.8);"></radio></view>
				</view>
			</radio-group>
		</view>
		<!-- 提交订单 -->
		<view class="submit">
			<view class="left">
				<text class="tx">合计：</text>
				<text class="total">￥1299.00</text>
			</view>
			<view class="right"><button>提交订单</button></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			checked: false
		};
	},
	methods: {
		paymentType(e) {
			const paymentType = e.detail.value;
			console.log(paymentType);
		}
	}
};
</script>

<style lang="less" scoped>
.confirm_order {
	padding: 20upx;

	// 联系人
	.contact {
		width: 100%;
		height: 180upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx;
		padding-left: 21upx;
		box-sizing: border-box;
		padding-top: 25upx;

		.top {
			display: flex;
			justify-content: space-between;

			.name {
				height: 31upx;
				font-size: 32upx;
				font-weight: bold;
				color: rgba(0, 0, 0, 1);
			}

			.phone {
				height: 25upx;
				font-size: 32upx;
				font-weight: bold;
				color: rgba(0, 0, 0, 1);
				margin-right: 22upx;
			}
		}

		.bottom {
			display: flex;
			height: 72upx;
			width: 100%;
			margin-top: 26upx;

			.icon_right {
				height: 48upx;
				width: 48upx;

				> image {
					height: 100%;
					width: 100%;
				}
			}

			.address {
				flex: 1;
				margin-top: 5upx;

				> text {
					font-size: 28upx;
					font-weight: bold;
					color: rgba(102, 102, 102, 1);
				}
			}
		}
	}

	.goods_list {
		padding: 26upx 31upx 33upx 21upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx;
		// width: 100%;
		height: 322upx;
		margin-top: 20upx;

		.info {
			display: flex;

			.img {
				height: 165upx;
				width: 165upx;

				> image {
					height: 100%;
					width: 100%;
				}
			}

			.detail {
				margin-left: 15upx;
				display: flex;
				flex-direction: column;

				.title {
					width: 478upx;
					height: 66upx;
					font-size: 28upx;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					line-height: 36upx;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				.type {
					width: 122upx;
					height: 35upx;
					background: rgba(244, 244, 244, 1);
					border-radius: 18upx;
					font-size: 22upx;
					font-weight: 500;
					color: rgba(170, 169, 169, 1);
					text-align: center;
					margin-top: 10upx;
				}

				.note {
					margin-top: 26upx;
					display: flex;
					justify-content: space-between;

					.total {
						flex: 1;
						height: 22px;
						font-size: 28upx;
						font-weight: bold;
						color: rgba(233, 144, 64, 1);
						line-height: 42upx;
					}

					.num {
						width: 26upx;
						height: 20upx;
						font-size: 28upx;
						font-weight: 500;
						color: rgba(233, 144, 64, 1);
						line-height: 42upx;
					}
				}
			}
		}

		.comment {
			margin-top: 50upx;
		}
	}

	.money_options {
		// width: 100%;
		height: 351upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx;
		margin-top: 20upx;
		padding-top: 10upx;

		.com_money_sty {
			height: 60upx;
			// width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 21upx;

			.com_tx_sty {
				height: 25upx;
				font-size: 26upx;
				font-weight: 500;
				color: rgba(102, 102, 102, 1);
				line-height: 25upx;
			}

			.com_sum_sty {
				height: 22upx;
				font-size: 28upx;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				line-height: 22upx;
			}
		}
		.receipt {
			margin-top: 56upx;
			.top {
				display: flex;
				justify-content: space-between;
				height: 40upx;
				// width: 100%;
				padding: 0 21upx;
				> text {
					height: 25upx;
					font-size: 26upx;
					font-weight: 500;
					color: rgba(102, 102, 102, 1);
				}
				.img {
					height: 40upx;
					width: 40upx;
					// border: 1px dashed #888888;
					display: flex;
					align-items: center;
					justify-content: center;
					padding-left: 7upx;
					overflow: hidden;
				}
			}
			.note {
				width: 278upx;
				height: 20upx;
				font-size: 20upx;
				font-weight: 500;
				color: rgba(153, 153, 153, 1);
				padding: 0 21upx;
			}
		}
	}
	// 支付方式
	.payment_methods {
		padding: 0 27upx 0 20upx;
		// width:100%;
		height: 255upx;
		border-radius: 20upx;
		margin-top: 20upx;
		margin-bottom: 98upx;
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
	// 提交订单
	.submit {
		// width:100%;
		height: 98upx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(206, 206, 206, 0.49);
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0 27upx 0 73upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left {
			display: flex;
			align-items: center;
			height: 100%;
			.tx {
				height: 26upx;
				font-size: 28upx;
				font-weight: 500;
				color: rgba(102, 102, 102, 1);
				line-height: 26upx;
			}
			.total {
				height: 28upx;
				font-size: 36upx;
				font-weight: bold;
				color: rgba(233, 144, 64, 1);
				line-height: 28upx;
			}
		}
		.right {
			> button {
				width: 275yupx;
				height: 80upx;
				background: linear-gradient(90deg, rgba(242, 44, 4, 1) 0%, rgba(234, 141, 63, 1) 100%);
				border-radius: 40upx;
				text-align: center;
				line-height: 80upx;
				font-size: 36upx;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
			}
		}
	}
}
</style>
