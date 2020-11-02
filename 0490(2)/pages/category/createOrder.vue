<template>
	<view class="confirm_order">
		<!-- 联系人 -->
		<view class="contact" @click="jump('/pages/order/address?save=1')">
			<view class="top" v-if="addtype == 1">
				<text class="name">{{ address.name }}</text>
				<text class="phone">{{ address.phone }}</text>
			</view>
			<view class="bottom">
				<!-- 地址 -->
				<view class="address" v-if="addtype == 1">
					<text>{{ address.province + address.city + address.area + address.address }}</text>
				</view>
				<view class="address" v-else>
					<text>还未设置收货地址，点击前往设置</text>
				</view>
				<!-- 右箭头 -->
				<view class="icon_right">
					<image src="../../static/img/right.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<!-- 商品信息 -->
		<view class="goods_list">
			<view class="info" v-for="(item, index) in groudList.allGoods" :key="index">
				<view class="img">
					<image :src="item.logo" mode="aspectFit"></image>
				</view>
				<view class="detail">
					<!-- 标题 -->
					<text class="title">{{ item.title }}</text>
					<!-- 套餐类型 -->
					<!-- <text class="type">标准套餐</text> -->
					<!-- 金额数量 -->
					<view class="note">
						<text class="total">￥{{ item.price_market }}</text>
						<text class="num">×{{ item.total }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="money com_money_sty message" style="padding-top: 40upx;">
			<view style="width: 140upx;">买家留言：</view>
			<input style="flex: 1;color: #999;font-size: 26upx;" type="text" value="" v-model="text" placeholder="选填，填写内容与商家协商确认" />
		</view>
		<!-- 金额-数量 信息 -->
		<view class="money_options">
			<!-- 商品金额 -->
			<view class="money com_money_sty">
				<text class="title com_tx_sty">商品金额：</text>
				<text class="com_sum_sty">￥{{ groudList.pricemarket }}</text>
			</view>
			<!-- 邮费 -->
			<view class="postage com_money_sty">
				<text class="com_tx_sty">邮费</text>
				<text class="com_sum_sty" v-if="groudList.priceexpress == 0">包邮</text>
				<text class="com_sum_sty" v-else>{{ groudList.priceexpress }}元</text>
			</view>
			<!-- 商品金额 -->

			<view class="com_money_sty" v-if="groudList.isdiscount == 1">
				<view class="com_tx_sty" v-if="groudList.headstype == 0" style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
					<view style="color: #ff594d;margin-left: 10upx;">团长优惠 {{ groudList.headsdiscount }}折</view>
					<view class="com_sum_sty">-￥{{ groudList.discountmoney }}</view>
				</view>
				<view class="discount" v-if="groudList.headstype == 1">
					<view style="color: #666;font-size: 26upx;">团长优惠</view>
					<!-- <view style="color: #ff594d;margin-left: 10upx;">{{ groudList.headsmoney }}元</view> -->
					<view class="com_sum_sty">-￥{{ groudList.discountmoney }}</view>
				</view>
			</view>
			<!-- 发票 -->
			<!-- <view class="receipt">
				<view class="top">
					<text>发票</text>
					<view class="img" @click="checked = !checked"><radio color="#ff594d" :checked="checked"  style="transform: scale(0.8);"></radio></view>
				</view>
				<text class="note">注：需要发票，请联系客服获取</text>
			</view> -->
		</view>
		<!-- 服务协议 -->
		<view class="agreement">
			<label class="radio" @click="checked = !checked">
				<checkbox color="#7f3d73" v-bind:checked="checked" style="transform:scale(0.8);" />
			</label>
			我已阅读并同意
			<text @click="jump('./agreeorder')">《购买协议》</text>
		</view>
		<!-- 服务协议 -->

		<!-- 提交订单 -->
		<view class="submit">
			<view class="left">
				<text class="tx">合计：</text>
				<text class="total">￥{{ groudList.pricemarket }}</text>
			</view>
			<view class="right"><button @click="handleSubmit">提交订单</button></view>
		</view>
	</view>
</template>

<script>
	import service from '@/store/service.js';
	import {
		antiShake
	} from '@/store/rest.js'; //防抖
	export default {
		data() {
			return {
				text: '',
				checked: false,
				type: 0,
				id: '',
				tid: 0,
				groudList: [],
				oid: '',
				groudId: '',
				teamid: 0,
				address: '',
				dataList: '',
				addtype: 0,
				is_identific: 0 //新人标识
			};
		},
		onShow: function() {
			this.handleCreateOrder();
		},
		onLoad: function(e) {
			var self = this;
			var data = e.data;
			self.type = 1;
			data = self.update(data, service.config.segm);

			var list = [];
			data.forEach(item => {
				var li = self.update(item, ',');
				data = {
					goodsid: Number(li[0]),
					optionid: Number(li[1]),
					total: Number(li[2]),
					is_identific: Number(li[3])
				}
				list.push(data)
			})
			self.dataList = list;

			this.handleCreateOrder();
			self.is_identific = list[0].is_identific;
		},
		methods: {
			savetype(e) {
				this.checked = e.type;
			},
			//选择地址
			saveaddress(e) {
				this.address = e.item;
				this.addtype = 1;
			},
			//将字符串数据处理成数组
			update(content, text, replace) {
				var array = content.split(text);
				console.log(content, 111);
				return array;
			},
			jump(url) {
				uni.navigateTo({
					url: url
				})
			},
			paymentType(e) {
				const paymentType = e.detail.value;
				// console.log(paymentType);
			},
			handleCreateOrder() {
				var self = this;
				self.$http
					.post(service.api.order.caculate, {
						goods: self.dataList,
					}).then(function(res) {
						if (res.code == 1) {
							var list = res.data;
							self.groudList = list;
							self.address = list.addressInfo;
							if (list.addressInfo != null) {
								self.addtype = 1;
							} else {
								self.addtype = 0;
							}
						} else {
							self.$api.msg(res.info);
						}

					});
			},
			handleSubmit: antiShake(function(id) {
				var self = this;
				if (self.checked == false) {
					self.$api.msg('您还未同意《购买协议》');
					return;
				}
				if (self.address == null) {
					uni.showToast({
						icon: 'none',
						title: '请设置收货地址'
					});
					return;
				}
				self.$http
					.post(service.api.order.create, {
						goods: self.dataList,
						remark: self.text,
						address_id: self.address.id,
					})
					.then(function(res) {
						if (res.code == 0) {
							uni.showToast({
								icon: 'none',
								title: res.info
							});
						}
						var list = res.data;
						self.groudId = list;
						var orderid = res.data.order_id
						// console.log(self.groudId,9000);
						if (res.code == 1) {
							console.log(orderid);
							if (self.is_identific == 1) {
								uni.navigateTo({
									// url: './orderDetail?orderid=' + 69521772677015
									url: '/pages/newPeople/newdetails?orderid=' + orderid
									// url:'./orderDetail?orderid='+24
								});
							} else {
								uni.navigateTo({
									// url: './orderDetail?orderid=' + 69521772677015
									url: '/pages/order/details?orderid=' + orderid
									// url:'./orderDetail?orderid='+24
								});
							}

						} else {
							// console.log(3333);
							uni.showToast({
								icon: 'none',
								title: res.info
							});
						}
					});

			}),
		}
	};
</script>

<style lang="less" scoped>
	.confirm_order {
		padding: 20upx;
		padding-bottom: 120upx;

		// 联系人
		.contact {
			width: 100%;
			height: 170upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 20upx;
			box-sizing: border-box;
			padding: 20upx 0 20upx 20upx;

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
					margin-top: 6upx;

					>image {
						height: 100%;
						width: 100%;
					}
				}

				.address {
					flex: 1;
					margin-top: 5upx;

					>text {
						font-size: 28upx;
						font-weight: bold;
						color: rgba(102, 102, 102, 1);
					}
				}
			}
		}

		// 协议
		.agreement {
			margin: 20upx 0;
			color: #999999;
			font-size: 30upx;
			text-align: left;

			text {
				color: #ff594d;
			}
		}

		.goods_list {
			padding: 0upx 31upx 0upx 21upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 20upx 20upx 0 0;
			// width: 100%;
			// height: 322upx;
			/* height: 160upx; */
			margin-top: 20upx;

			.info {
				display: flex;
				padding: 10upx 0;
				border-bottom: 2upx solid #f2f2f2;

				.img {
					height: 165upx;
					width: 165upx;

					>image {
						height: 100%;
						width: 100%;
					}
				}

				.detail {
					margin-left: 15upx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;

					.title {
						width: 478upx;
						// height: 66upx;
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
							color: #ff594d;
							line-height: 42upx;
						}

						.num {
							width: 26upx;
							height: 20upx;
							font-size: 28upx;
							font-weight: 500;
							color: #ff594d;
							line-height: 42upx;
						}
					}
				}
			}

			.comment {
				margin-top: 50upx;
				display: flex;
				align-items: center;
			}
		}

		.money_options {
			// width: 100%;
			// height: 351upx;
			// height: 200upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 20upx;
			margin-top: 20upx;
			padding: 30upx 0;

			.com_money_sty {
				// height: 60upx;
				// width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 25upx 21upx;

				.com_tx_sty {
					// height: 25upx;
					font-size: 26upx;
					font-weight: 500;
					color: rgba(102, 102, 102, 1);
					line-height: 25upx;
				}

				.com_sum_sty {
					// height: 22upx;
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

					>text {
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

					>image {
						height: 58upx;
						width: 58upx;
					}

					>text {
						height: 25upx;
						font-size: 26upx;
						font-weight: 500;
						color: rgba(102, 102, 102, 1);
						line-height: 25upx;
						margin-left: 8upx;
					}
				}

				.right {}
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
					color: #ff594d;
					line-height: 28upx;
				}
			}

			.right {
				>button {
					width: 275yupx;
					height: 80upx;
					background: #ff594d;
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

	.discount {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.message {
		display: flex;
		align-items: center;
		background-color: #fff;
		padding: 20upx 0 30upx 20upx;
		border-radius: 0 0 20upx 20upx;

	}
	uni-checkbox /deep/ .uni-checkbox-input {
		border-radius: 50%;
		width: 50upx;
		height: 50upx;
	}
	
	/deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		border-color: #ff594d;
	}
</style>
