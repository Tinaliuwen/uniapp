<template>
	<view class="confirm_order">
		<!-- 金额-数量 信息 -->
		<view class="money_options">
			<!-- 商品金额 -->
			<view class="money com_money_sty">
				<text class="title com_tx_sty">订单总额</text>
				<text class="com_sum_sty price">￥{{ payDetail.pay_price }}</text>
			</view>
			<!-- 邮费 -->
			<view class="postage com_money_sty">
				<text class="com_tx_sty">订单编号</text>
				<text class="com_sum_sty">{{ payDetail.order_no }}</text>
			</view>
			<!-- 商品金额 -->
			<view class="com_money_sty">
				<text class="com_tx_sty">创建时间</text>
				<text class="com_sum_sty">{{ payDetail.create_at }}</text>
			</view>
		</view>
		<!-- 支付方式 -->
		<view class="payment_methods" >
			<radio-group @change="paymentType">
				<!-- 积分支付 -->
				<!-- v-if="item.key == 'base_balance'" -->
				<view class="balance com_sty_row"  v-for="(item, index) in payWays" :key="index">
					<view class="left">
						<image :src="item.icon" mode="aspectFit"></image>
						<view class="text" v-if="item.key == 'base_balance'">
							<text class="text-top">{{item.name}}</text>
							<view>
								当前积分:
								<text class="up">￥{{integral}}</text>
							</view>
						</view>
						<view v-else>
						<text>{{ item.name }}</text>
						</view>
					</view>
					<view class="right"><radio :value="item.key" color="#ff594d" style="transform: scale(0.8);"></radio></view>
				</view>
				<!-- 微信支付 -->
				<!-- <view class="webchat com_sty_row" v-else>
					<view class="left">
						<image :src="item.icon" mode="aspectFit"></image>
						<text>{{ item.name }}</text>
					</view>
					<view class="right"><radio value="webchat" color="#ff594d" style="transform: scale(0.8);"></radio></view>
				</view> -->
				<!-- 支付宝支付 -->
				<!-- <view class="alipay com_sty_row">
					<view class="left">
						<image src="../../static/img/alipay2x.png" mode="aspectFit"></image>
						<text>支付宝支付</text>
					</view>
					<view class="right"><radio value="alipay" color="#ff594d"  style="transform: scale(0.8);"></radio></view>
				</view> -->
			</radio-group>
		</view>
		<!-- 确认付款 -->
		<!-- <view class="submit">
					<view class="pay"><button>确认付款</button></view>
				</view> -->
		<view class="mask" v-show="isMask">
			<view class="mask_top"></view>
			<view class="background">
				<view class="remind">提醒</view>
				<view class="bg"><image class="bg-img" src="../../static/img/pay-bg.png" mode=""></image></view>
				<view class="confirm">
					<view class="confirm-text">确认使用积分支付吗</view>
					<view class="submit" @click="handlePaySubmit">确认付款</view>
				</view>
			</view>
		</view>

		<!-- <view class="submit-btn" @click="isMask=!isMask">确认付款</view> -->
		<view class="submit-btn" @click="showMask">确认付款</view>
	</view>
</template>

<script>
import service from '@/store/service.js';
export default {
	data() {
		return {
			isMask: false, //遮罩
			oid: '',
			payDetail: [],
			value: '',
			type: '',
			payWays:[],
			money:0,
			integral:'',
		};
	},
	onLoad: function(e) {
			var self = this;
			self.$http .post(service.api.main.user).then(function(res) {
				if(res.code == 1){
					res = res.data;
					self.integral = res.credit2;
				}else{
					self.$api.msg(res.msg);
				}
			});
		self.oid = e.orderid;
		// console.log(this.oid,233);
		self.getPayDetail();
	},
	methods: {
		paymentType(e) {
			const paymentType = e.detail.value;
			console.log(paymentType,111);
			this.type = paymentType;
		},
		getPayDetail() {
			var self = this;
			self.$http
				.post(service.api.order.payInfo, {
					order_id: this.oid
				})
				.then(function(res) {
					// console.log(res);
					var list = res.data;
					self.money=list
					self.payDetail = list.order;
					self.payWays=list.payment_method
					if (res.data == 0) {
						uni.showModal({
							icon: 'none',
							title: res.info
						});
					}
				});
		},
		showMask() {
			var self = this;
			var value = self.type;
			// console.log();
			// console.log(value);
			if (value == 'base_balance') {
				// console.log(222);
				// self.isMask=!isMask
				self.isMask = !self.isMask;
			} else if (value != '') {
				this.handlePay();
			}
			// if()
		},
		handlePaySubmit() {
			// console.log(333);
			this.handlePay();
		},
		handlePay() {
			var self = this;
			self.$http
				.post(service.api.order.pay, {
					order_id: self.oid,
					pay_type:self.type
				})
				.then(function(res) {
					// console.log(res);

					if (res.code == 1) {
						uni.navigateTo({
							url: '../createOrder/pay'
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: res.info
						});
					}
					// var list = res.data;
					// self.payDetail = list;
				});
		}
	}
};
</script>

<style lang="less" scoped>
.confirm_order {
	// margin: 0 20upx;

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
		// height: 264upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx;
		// padding-top: 10upx;
		padding: 30upx 0;
		position: relative;
		margin: 20upx 20upx 0;

		.com_money_sty {
			height: 60upx;
			// width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 21upx;
			margin-bottom: 10upx;

			.com_tx_sty {
				font-size: 28upx;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				line-height: 42upx;
			}

			.com_sum_sty {
				// height: 20upx;
				font-size: 26upx;
				font-weight: 500;
				color: rgba(102, 102, 102, 1);
				line-height: 42upx;
			}
			.price {
				font-size: 26upx;
				font-weight: bold;
				color: #ff594d;
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
		padding: 30upx 27upx 20upx 20upx;
		// width:100%;
		// height: 255upx;
		border-radius: 20upx;
		background-color: #ffffff;
		margin: 20upx 20upx 98upx;
		// 共有样式

		.com_sty_row {
			// height: 80upx;
			width: 100%;
			padding: 0 19upx 0 16upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20upx;
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
				.text {
					display: flex;
					flex-direction: column;
					line-height: 40upx;
					margin-left: 8upx;
					color: #666;
					font-size: 26upx;
				}
				.text-top {
					color: #333;
				}
				.up {
					font-size: 26upx;
					color: #ff594d;
					line-height: 25upx;
				}
			}
			.right {
			}
		}
	}
}
// 确认付款
.confirm {
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
}
.confirm-text {
	margin-top: -150upx;
	color: #333;
	font-size: 30upx;
	margin-bottom: 88upx;
}
.submit {
	background: linear-gradient(90deg, rgba(233, 144, 64, 1) 0%, rgba(255, 123, 76, 1) 100%);
	box-shadow: 0px 0px 31upx 0px rgba(254, 209, 173, 1);
	border-radius: 50upx;
	width: 90%;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	// margin: 0 32upx 0 28upx;
	height: 100upx;
	// font-size: 36upx;
}
.submit-btn {
	background: #ff594d;
	border-radius: 10upx;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 20upx;
	height: 100upx;
	font-size: 36upx;
}
.bg {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.background {
	background-color: #fff;
	height: 760upx;
	border-radius: 10upx;
	// margin: 0 68upx;
	position: absolute;
	top: 294upx;
	left: 68upx;
	width: 615upx;
	// margin-top: 260upx;
}
.bg-img {
	height: 400upx;
}
.remind {
	font-size: 36upx;
	font-weight: bold;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 60upx;
	padding-bottom: 100upx;
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
	// background: rgba(0, 0, 0, 1);
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
