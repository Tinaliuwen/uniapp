<template>
	<view class="service_container" :class="{'service_container_mask':isMask}">
		<!-- 标题 -->
		<view class="title">选择需要售后服务的商品</view>
		<!-- 售后商品 -->
		<view class="content">
			<!-- 订单号 -->
			<view class="order">
				<checkbox value="orderNmu"></checkbox>
				<text class="order_text">订单号：</text>
				<text class="order_num">SH2020070312456987</text>
			</view>
			<!-- 商品列表 -->
			<view class="shop_list">
				<view class="img">
					<image src="../../static/order/pic.png" mode="aspectFit"></image>
				</view>
				<view class="detail">
					<view class="name">塞外香宁夏吴忠大米富硒长粒香米新米真空中国蟹田米2.5kg/袋包装</view>
					<!-- 套餐类型 -->
					<view class="type">
						<text class="type_name">标准套餐</text>
						<text class="type_num">x1</text>
					</view>
					<view class="info">
						<view class="price">￥1299.00</view>
						<view class="seleted">
							<checkbox value=""></checkbox>
						</view>
					</view>
				</view>
			</view>

			<view class="shop_list">
				<view class="img">
					<image src="../../static/order/pic.png" mode="aspectFit"></image>
				</view>
				<view class="detail">
					<view class="name">塞外香宁夏吴忠大米富硒长粒香米新米真空中国蟹田米2.5kg/袋包装</view>
					<!-- 套餐类型 -->
					<view class="type">
						<text class="type_name">标准套餐</text>
						<text class="type_num">x1</text>
					</view>
					<view class="info">
						<view class="price">￥1299.00</view>
						<view class="seleted">
							<checkbox value=""></checkbox>
						</view>
					</view>
				</view>
			</view>
			<view class="shop_list">
				<view class="img">
					<image src="../../static/order/pic.png" mode="aspectFit"></image>
				</view>
				<view class="detail">
					<view class="name">塞外香宁夏吴忠大米富硒长粒香米新米真空中国蟹田米2.5kg/袋包装</view>
					<!-- 套餐类型 -->
					<view class="type">
						<text class="type_name">标准套餐</text>
						<text class="type_num">x1</text>
					</view>
					<view class="info">
						<view class="price">￥1299.00</view>
						<view class="seleted">
							<checkbox value=""></checkbox>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 退货选择区 -->
		<view class="options">
			<!-- 退货类型 -->
			<view class="return_type">
				<view class="return_type_left">
					<text>退货类型：</text>
				</view>
				<view class="return_type_right" @tap="_returnType">
					<input type="text" :value="returnType" disabled placeholder="请选择" placeholder-class="placeholder-class" />
					<image src="../../static/img/right.png" mode="aspectFit"></image>
				</view>
			</view>
			<!-- 退货原因 -->
			<view class="return_reason">
				<view class="return_reason_left">
					<text>退货原因：</text>
				</view>
				<view class="return_reason_right" @tap="maskShow(true)">
					<input type="text" disabled :value="returnReason" placeholder="请选择" placeholder-class="placeholder-class" />
					<image src="../../static/img/right.png" mode="aspectFit"></image>
				</view>
			</view>
			<!-- 退货凭证 -->
			<view class="return_proof">
				<!-- 标题 -->
				<view class="return_proof_title">
					图片凭证：
				</view>
				<!-- 上传区域 -->
				<view class="upload">
					<image src="../../static/img/proof.png"></image>
					<text>（可上传2张）</text>
				</view>
			</view>
		</view>
		<!-- 提交按钮 -->
		<view class="submit">
			提交申请
		</view>
		<!-- 遮罩 -->
		<view class="mask" v-show="isMask">
			<view class="mask_top"></view>
			<view class="mask_content">
				<!-- 标题 -->
				<view class="title">
					<text>选择退货原因</text>
					<image src="../../static/icon/cha.png" mode="aspectFit" @tap="maskShow(false)"></image>
				</view>
				<!-- 相泽祥 -->
				<view class="options">
					<radio-group @change="_returnReason">
						<view class="list">
							<text class="common_text_style">不想要了/拍错了</text>
							<radio value="不想要了/拍错了" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
						<view class="list">
							<text class="common_text_style">与卖家描述的不符</text>
							<radio value="与卖家描述的不符" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
						<view class="list">
							<text class="common_text_style">7天无理由退换货</text>
							<radio value="7天无理由退换货" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
						<view class="list">
							<text class="common_text_style">质量问题</text>
							<radio value="质量问题" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
						<view class="list list_end">
							<text class="common_text_style">少件/漏发</text>
							<radio value="少件/漏发" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
					</radio-group>
					<!-- 确认按钮 -->
					<view class="confirm" @tap="maskShow(false)">
						确定
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
				isMask: false, //遮罩
				returnType: '', //退货类型
				returnReason: '', //退原因
			};
		},
		methods: {
			// 退货类型
			_returnType() {
				uni.navigateTo({
					url: './returnType'
				})
			},
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
			},
			// 图片上传
			// 提交
		},
		onLoad(params) {
			this.returnType = params.type
		}
	};
</script>

<style lang="less" scoped>
	// common 样式
	.placeholder-class {
		width: 83upx;
		height: 26upx;
		font-size: 28upx;
		font-weight: 500;
		color: rgba(202, 202, 202, 1);
		line-height: 26upx;
	}

	.service_container {
		padding: 40upx 20upx 0;
		overflow: hidden;

		.title {
			height: 30upx;
			font-size: 28upx;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
		}

		.content {
			padding: 24upx 20upx 29upx;
			border-radius: 20upx;
			background: rgba(255, 255, 255, 1);
			margin-top: 30upx;

			.order {
				height: 80upx;
				width: 100%;
				border-bottom: 1px solid rgba(244, 244, 244, 1);
				margin-bottom: 31upx;

				.order_text {
					height: 26upx;
					font-size: 28upx;
					font-weight: 500;
					color: #9a9a9a;
					line-height: 42upx;
				}

				.order_num {
					height: 26upx;
					font-size: 28upx;
					font-weight: 500;
					color: #666666;
					line-height: 42upx;
				}
			}

			.shop_list {
				display: flex;
				margin-bottom: 34upx;

				&:last-child {
					margin-bottom: 5upx;
				}

				.detail {
					flex: 1;
					padding: 0 24upx;

					.name {
						height: 66upx;
						font-size: 28upx;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
						line-height: 36upx;
					}

					.type {
						display: flex;
						justify-content: space-between;
						margin-top: 16upx;

						.type_name {
							height: 35upx;
							width: 140upx;
							background: rgba(244, 244, 244, 1);
							border-radius: 18upx;
							font-size: 22upx;
							font-weight: 500;
							color: rgba(170, 169, 169, 1);
							line-height: 35upx;
							text-align: center;
						}

						.type_num {
							height: 35upx;
							width: 100upx;
							font-size: 28upx;
							font-weight: 500;
							color: rgba(233, 144, 64, 1);
							line-height: 35upx;
							text-align: right;
						}
					}

					.info {
						display: flex;
						justify-content: space-between;

						.price {
							width: 160upx;
							height: 22upx;
							font-size: 28upx;
							font-weight: bold;
							color: rgba(233, 144, 64, 1);
							line-height: 42upx;
							margin-top: 18upx;
						}

						.seleted {
							height: 41upx;
							width: 41upx;
						}
					}
				}

				.img {
					height: 165upx;
					width: 165upx;
					border-radius: 20upx;
					overflow: hidden;

					image {
						height: 100%;
						width: 100%;
					}
				}
			}
		}

		.options {
			width: 100%;
			height: 429upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 20upx;
			margin-top: 20upx;
		}

		.submit {
			width: 710upx;
			height: 100upx;
			background: linear-gradient(90deg, rgba(233, 144, 64, 1) 0%, rgba(255, 123, 76, 1) 100%);
			border-radius: 10upx;
			text-align: center;
			font-size: 36upx;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			line-height: 100upx;
			margin: 58upx auto 70upx;
		}

		.options {
			.return_type {
				display: flex;
				height: 100upx;
				width: 100%;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid rgba(244, 244, 244, 1);
				padding-left: 21upx;
				box-sizing: border-box;

				.return_type_left {
					>text {
						width: 119upx;
						height: 26upx;
						font-size: 28upx;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
						line-height: 42upx;
					}
				}

				.return_type_right {
					flex: 1;
					display: flex;
					justify-content: space-between;

					>input {
						flex: 1;
						padding-left: 35upx;
						padding-top: 6upx;
						font-size: 28upx;
						font-weight: 500;
						color: rgba(102, 102, 102, 1);
					}

					>image {
						height: 48upx;
						width: 48upx;
					}
				}
			}

			.return_reason {
				display: flex;
				height: 100upx;
				width: 100%;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid rgba(244, 244, 244, 1);
				padding-left: 21upx;
				box-sizing: border-box;

				.return_reason_left {
					>text {
						width: 119upx;
						height: 26upx;
						font-size: 28upx;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
						line-height: 42upx;
					}
				}

				.return_reason_right {
					flex: 1;
					display: flex;
					justify-content: space-between;

					>input {
						flex: 1;
						padding-left: 35upx;
						padding-top: 6upx;
						font-size: 28upx;
						font-weight: 500;
						color: rgba(102, 102, 102, 1);
					}

					>image {
						height: 48upx;
						width: 48upx;
					}
				}
			}

			.return_proof {
				height: 160upx;
				width: 100%;
				padding-left: 22upx;
				box-sizing: border-box;
				display: flex;
				padding-top: 37upx;

				.return_proof_title {
					height: 26upx;
					font-size: 28upx;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					line-height: 26upx;
				}

				.upload {
					height: 160upx;
					width: 180upx;
					background: rgba(244, 244, 244, 1);
					display: flex;
					flex-direction: column;
					align-items: center;

					>image {
						height: 44upx;
						width: 49upx;
						margin-top: 33upx;
					}

					>text {
						font-size: 24upx;
						font-weight: 500;
						color: rgba(192, 192, 192, 1);
						line-height: 24upx;
						margin-top: 29upx;
						white-space: nowrap;
					}
				}
			}
		}

		// 遮罩样式
		.mask {
			position: fixed;
			top: 0;
			right: 0;
			left: 0;
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
				height: 863upx;
				width: 100%;
				background-color: #FFFFFF;
				position: absolute;
				bottom: 0;
				right: 0;
				left: 0;
				background: rgba(255, 255, 255, 1);
				border-radius: 20upx 20upx 0px 0px;
				padding-top: 56upx;
				box-sizing: border-box;

				.title {
					height: 58upx;
					width: 100%;
					display: flex;
					justify-content: space-between;
					padding: 0 15upx 0 272upx;
					align-items: center;
					box-sizing: border-box;

					>text {
						height: 34upx;
						font-size: 36upx;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
						line-height: 34upx;
					}

					>image {
						height: 58upx;
						width: 58upx;
					}
				}
			}

			.options {
				margin-top: 70upx;

				.list {
					height: 100upx;
					width: 100%;
					padding: 0 30upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					border-bottom: 1px solid rgba(244, 244, 244, 1);
					;
				}

				.list_end {
					border-bottom: 0;
				}
			}

			.confirm {
				width: 710upx;
				height: 100upx;
				background: linear-gradient(90deg, rgba(233, 144, 64, 1) 0%, rgba(255, 123, 76, 1) 100%);
				border-radius: 10upx;
				font-size: 36upx;
				font-weight: 500;
				text-align: center;
				line-height: 100upx;
				color: rgba(255, 255, 255, 1);
				margin: 25upx auto;
			}
		}
	}

	.service_container_mask {
		height: 1000upx;
		overflow: hidden;
	}
</style>
