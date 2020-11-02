<template>
	<view class="confirm_order">
		<!-- 联系人 -->
		<view class="contact" @click="jump('/pages/order/address?save=1')">
			<view class="top">
				<text class="name">{{ address.name }}</text>
				<text class="phone">{{ address.phone }}</text>
			</view>
			<view class="bottom">
				<!-- 地址 -->
				<view class="address">
					<text>{{ address.province + address.city + address.area + address.address }}</text>
				</view>
				<!-- 右箭头 -->
				<view class="icon_right"><image src="../../static/img/right.png" mode="aspectFit"></image></view>
			</view>
		</view>
		<!-- 商品信息 -->
		<view class="goods_list">
			<view class="info">
				<view class="img"><image :src="groudList.thumb" mode="aspectFit"></image></view>
				<view class="detail">
					<!-- 标题 -->
					<text class="title">{{ groudList.title +groudList.title}}</text>
					
					<!-- 套餐类型 -->
					<!-- <text class="type">标准套餐</text> -->
					<!-- 金额数量 -->
					<view class="note">
						<text class="total">￥{{ groudList.groupsprice }}</text>
						<text class="num">×{{ groudList.goodsnum }}</text>
					</view>
				</view>
			</view>
			<!-- 	<view class="comment">
				<view style="width: 140upx;">买家留言：</view>
				<input style="flex: 1;color: #999;font-size: 26upx;" type="text" value="" v-model="text" placeholder="选填，填写内容与商家协商确认" />
			</view> -->
		</view>
		<!-- 金额-数量 信息 -->
		<view class="money_options">
			<!-- 商品金额 -->
			<view class="money com_money_sty">
				<text class="title com_tx_sty">商品金额：</text>
				<text class="com_sum_sty">￥{{ groudList.groupsprice }}</text>
			</view>
			<!-- 邮费 -->
			<view class="postage com_money_sty">
				<text class="com_tx_sty">邮费</text>
				<text class="com_sum_sty" v-if="groudList.freight == 0.0">包邮</text>
				<text class="com_sum_sty" v-else>{{ groudList.freight }}元</text>
			</view>
			<!-- 商品金额 -->

			<view class="com_money_sty" v-if="groudList.isdiscount == 1">
				<view class="com_tx_sty" v-if="groudList.headstype == 0" style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
				<view style="color: #ff594d;margin-left: 10upx;">	团长优惠
					{{ groudList.headsdiscount }}折</view>
				<view class="com_sum_sty">-￥{{ groudList.discountmoney }}</view>
				</view>
			<view class="discount"  v-if="groudList.headstype == 1">
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
		<!-- 提交订单 -->
		<view class="submit">
			<view class="left">
				<text class="tx">合计：</text>
				<text class="total">￥{{ groudList.price }}</text>
			</view>
			<view class="right"><button @click="handleSubmit">提交订单</button></view>
		</view>
	</view>
</template>

<script>
import service from '@/store/service.js';
export default {
	data() {
		return {
			text: '',
			checked: false,
			id: '',
			tid: 0,
			groudList: [],
			oid: '',
			groudId: '',
			teamid: 0,
			address:''
		};
	},
	onLoad: function(e) {
		// console.log(e);
		this.id = e.goodsid;
		this.teamid = e.teamid;
		if (this.teamid == undefined) {
			this.teamid = 0;
		} else {
			this.teamid = this.teamid;
		}
		this.handleCreateOrder();
	},
	onShow: function() {
		this.address = uni.getStorageSync("address");
	},
	methods: {
		jump(url){
			uni.navigateTo({
				url:url
			})
		},
		paymentType(e) {
			const paymentType = e.detail.value;
			// console.log(paymentType);
		},
		handleCreateOrder() {
			var self = this;
		//获取所有地址
		self.$http
			.post(service.api.address.addressList, )
			.then(function(res) {
				var list = res.data;
					var item = [];
					var type = 0;
					if (list.length > 0) {
						// console.log(2233);
						for (let i = 0; i < list.length; i++) {
							if (list[i].is_default == 1) {
								item = list[i];
								type = 1;
							}
						}
						if (type == 0) {
							console.log(22);
							item = list[0];
							type = 1;
						}
					}
				
					if (type == 1) {
						uni.setStorageSync('address', item);
						self.address = item;
					} else {
						uni.showModal({
							content: '你还没有设置收货地址，请先去设置收货地再购买！',
							cancelText: '取消',
							confirmText: '确认',
							confirmColor: '#FFAE00',
							cancelColor: '#D2D2D2',
							success: function(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: "/pages/user/address"
									})
								}
							}
						});
					}
				});

			self.$http
				.get(service.api.group.confirmDetail, {
					goodsid: this.id,
					teamid: this.teamid
				})
				.then(function(res) {
					// console.log(res.data.categroy);
					// console.log(res);
					var list = res.data;
					self.groudList = list;
				});
		},
		handleSubmit(id) {
			// console.log(id);
			var self = this;
			console.log(this.id);
			console.log(this.teamid);
			self.$http
				.post(service.api.group.confirm, {
					goodsid: this.id,
					teamid: this.teamid,
					username: '兮兮林',
					mobile: 15912548789,
					province: '广东省',
					city: '广州市',
					area: '天河区',
					address: '太古里北区N8楼9层'

					// teamid:0
				})
				.then(function(res) {
					// console.log(res.data.categroy);
					// console.log(res);
					var list = res.data;
					self.groudId = list;
					if (res.code == 1) {
						uni.navigateTo({
							url: './orderDetail?orderid=' + self.groudId.orderid
							// url:'./orderDetail?orderid='+24
						});
					} else {
						// console.log(3333);
						uni.showToast({
							icon: 'none',
							title: res.info
						});
					}
				});
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
		height: 200upx;
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
		// height: 322upx;
		height: 200upx;
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
				justify-content: space-around;

				.title {
					width: 478upx;
					// height: 66upx;
					font-size: 28upx;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					line-height: 40upx;
					text-overflow: ellipsis;
					overflow: hidden;
					height: 80upx;
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
.discount{
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
