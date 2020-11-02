<template>
	<view class="order">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabIndex == index }" @click="tabClick(index)">{{ item.text }}</view>
		</view>
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<!-- 全部 -->
			<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" :scroll-y="true" @scrolltolower="scrolltolower">
					<view class="order-item" v-for="(item, index) in listData" :key="index">
						<view class="order-top">
							<view class="num">订单单号：{{ item.order_no }}</view>
							<view class="state" v-if="item.status == 0">已取消</view>
							<view class="state" v-if="item.status == 3">待发货</view>
							<view class="state" v-if="item.status == 4">待收货</view>
							<view class="state" v-if="item.status == 9 && item.is_delis == 0">去发货</view>
							<view class="state" v-if="item.status == 9 && item.is_delis == 1">已发货</view>
							<view class="state" v-if="item.status == 5 && item.is_listout == 0">已完成</view>
							<view class="state" v-if="item.status == 5 && item.is_listout == 1">待审核</view>
						</view>
						<view class="order-center" v-for="(it,idx) in item.allGoods" :key="idx">
							<view class="img">
								<image class="order-img" :src="it.goods_logo" mode=""></image>
							</view>
							<view class="center-right">
								<view class="title">{{ it.goods_title }}</view>
								<view class="detail">
									<view class="detail-price">￥{{ item.pay_price }}</view>
									<view class="detail-num">x{{ it.number_goods }}</view>
								</view>
							</view>
						</view>
						<view class="total">
							共{{item.goods_count}}件，合计：
							<view class="money">￥{{ item.pay_price }}</view>
						</view>

						<view class="bottom_all">
							<view class="bottom" v-if="item.status == 0">
								<view class="warn" style="margin-right: 24rpx;" @click="handleRemoveOrder(item.id)">删除订单</view>
							</view>
						<!-- 	<view class="bottom" v-if="item.status == 2">
								<view class="back" @click="cancel(item.id)">取消订单</view>
							</view> -->
							<view class="bottom" v-if="item.status != 9">
								<view class="warn btn-cha" @click="jump('/pages/order/details?orderid=' + item.id + '&status=' + item.status, item.id)">查看订单</view>
							</view>
							<view class="bottom" v-if="item.status == 9 && item.is_delis == 0">
								<view class="warn weituo" @click="jump('/pages/order/details?orderid=' + item.id + '&status=' + item.status, item.id)">去发货</view>
							</view>
							<!-- <view class="bottom" v-if="item.status == 3"><view class="warn">提醒发货</view></view> -->
							<view class="bottom" v-if="item.status == 9 && item.is_delis == 1">
								<view class="warn btn-cha" @click="jump('/pages/order/details?orderid=' + item.id + '&status=' + item.status, item.id)">查看订单</view>
								<view class="warn weituo" @click="watchLogistics(item.id)">查看物流</view>
							</view>
							<view class="bottom" v-if="item.status == 4">
								<view class="warn" @click="confirmReceipt(item.id)">确认收货</view>
							</view>
							<view class="bottom" v-if="item.status == 5 ||item.status == 3 || item.status == 4">
								<view class="back" @click="watchLogistics(item.id)">查看物流</view>
							</view>
							<!-- <view class="bottom" v-if="item.status == 5 && item.is_listout == 0">
								<view class="back weituo" @click="entrust(item.id,item.pay_price)">委托代卖</view>
							</view> -->
						</view>

					</view>
					<view class="not-data" v-if="listData.length == 0">您还没有相关订单</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<view class="mask" v-if="isMask">
			<view class="mask_top"></view>
			<view class="mask_content">
				<view class="title">
					<text>请选择取消订单原因</text>
				</view>
				<!-- 选择项 -->
				<view class="options">
					<radio-group @change="_returnReason">
						<view class="list" v-for="(item, index) in reasonList" :key="index">
							<text class="common_text_style">{{ item.title }}</text>
							<radio :value="item.title" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
					</radio-group>
					<!-- 确认按钮 -->
					<view class="btn">
						<view class="confirm" @tap="maskShow(false)">取消</view>
						<view class="confirm confirm-btn" @tap="handleCancelOrder">确定</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 委托弹框 -->
		<view class="mask" v-if="iswask">
			<view class="mask_top"></view>
			<view class="mask_content" style="margin-bottom: 360rpx;">
				<view class="title">
					<text style="color: #ff594d;font-size: 38rpx;">委托代卖</text>
				</view>
				<!-- 选择项 -->
				<view class="options">
					<u-select v-model="show" mode="single-column" ref='select' confirm-color='#ff495d' :list="wei_list" @confirm="confirm"></u-select>
					<view class="options_inp">
						<button type="default" @click="click_wei">点击选择价格比例</button>
					</view>
					<view class="options_bao foot">
						价格比例为：{{label}} <text style="font-size: 26rpx;margin-left: 20rpx;">手续费率（{{value}}%）</text>
					</view>
					<view class="options_bao footw">
						委托价格：{{total}} <text style="font-size: 26rpx;margin-left: 20rpx;">手续费（{{charge}}）</text>
					</view>
					<!-- 服务协议 -->
					<view class="agreement">
						<label class="radio" @click="checked = !checked">
							<checkbox color="#7f3d73" v-bind:checked="checked" style="transform:scale(0.8);" />
						</label>
						阅读并同意
						<text @click="jump('./agreewei')">《委托协议》</text>
					</view>
					<!-- 服务协议 -->
					<!-- 确认按钮 -->
					<view class="btn">
						<view class="confirm" @tap="maskShow(false)">取消</view>
						<view class="confirm confirm-btn" @tap="entrust_tap">去支付</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '@/store/service.js';
	export default {
		data() {
			return {
				tabIndex: 0,
				cancelOrder: false,
				isMask: false, //遮罩
				iswask: false,
				show: false,
				listData: [],
				wei_price: '',
				goodsData: [],
				total: 0, //委托价格
				charge: 0, //手续费
				value: 0,
				label: 0,
				checked: false,
				type: 0,
				page: 1,
				last_page: 1,
				is_delis: 0, //发货
				returnReason: '',
				id: '',
				wei_id: '',
				charge_id: 0,
				iscomment: '',
				navList: [{
						text: '全部',
						state: '0'
					},
					{
						text: '待发货',
						state: '2'
					},
					{
						text: '待收货',
						state: '3'
					},
					{
						text: '已完成',
						state: '4'
					},
					// {
					// 	text: '去发货',
					// 	state: '10'
					// },

				],
				reasonList: [{
						title: '我不想买了',
						state: '1'
					},
					{
						title: '信息填写错误，重拍',
						state: '2'
					},
					{
						title: '卖家缺货',
						state: '3'
					},
					{
						title: '同城见面交易',
						state: '4'
					},
					{
						title: '其他原因',
						state: '0'
					}
				],
				page: 1,
				last_page: 2,
				wei_list: [],
			};
		},
		onShow(){
			this.listData = [];
			this.page = 1
			this.getList();
		},
		onLoad(option) {
			if (option.id) {
				this.tabIndex = option.id;
			}
			this.type = 1;
			this.all = option.all;
			console.log(option);
			
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: './myGroup'
			});
		},
		onReachBottom() {
			var self = this;
			console.log(151);
			// if(self.page < self.last_page){
			// 	self.page = self.page + 1
			// 	self.getGoodsCate()
			// }else{
			// 	uni.showToast({
			// 	    title: '没有数据了',
			// 	    duration: 2000,
			// 		icon:'none'
			// 	});
			// }

		},
		methods: {
			scrolltolower(e) {
				var self = this
				console.log('滚动到底部==>>', e);
				console.log(self.page, self.last_page, 123);
				if (self.page < self.last_page) {
					self.page = self.page + 1
					self.getList()
				} else {
					uni.showToast({
						title: '没有数据了',
						duration: 2000,
						icon: 'none'
					});
				}
			},
			savetype(e) {
				this.checked = e.type;
			},
			// onReachBottom(){
			// 	console.log(123);
			// },
			jump(url, id) {
				console.log(url)
				uni.navigateTo({
					url: url
				});
			},
			//swiper 切换
			changeTab(e) {
				this.tabClick(e.target.current);
				this.listData = [];
				this.page = 1
				this.getList();
			},
			tabClick(index) {
				this.tabIndex = index;
				console.log(this.tabIndex, 123);
			},
			//确定取消订单
			confirm() {
				this.isMask = !this.isMask;
			},
			// 遮罩
			maskShow(boolean) {
				console.log(3453);
				this.isMask = false;
				this.iswask = false;
				if (boolean) {}
			},
			// 退货原因
			_returnReason(returnReason) {
				if (returnReason) {
					this.returnReason = returnReason.detail.value;
					console.log(returnReason.detail.value, 233);
				}
			},
			getList() {
				var self = this;
				// console.log(self.navList[self.tabIndex].state);
				self.$http.post(service.api.order.orderList, {
						type: self.navList[self.tabIndex].state,
						all: self.all,
						page: self.page
					})
					.then(function(res) {
						// console.log(res);
						var list = res.data.data;
						// self.listData = [];
						// self.listData = list;

						self.last_page = res.data.last_page
						self.goodsData = list.allGoods
						if (self.page <= self.last_page) {
							self.listData = self.listData.concat(list);
							console.log(self.listData);
							// console.log(self.goodsCate);
						}
						console.log(self.goodsData);
						self.listData.forEach(item => {
							// console.log(item,222);
							item.allGoods.forEach(it => {
								// console.log(it,444);
								self.iscomment = it.iscomment
								// console.log(self.iscomment,555);
							})
						})
					});
			},
			cancel(id) {
				// console.log(id,888);
				this.isMask = !this.isMask;
				this.id = id;
			},
			joinGroup(id) {
				console.log(id);
				uni.navigateTo({
					// url: '../createOrder/orderDetail?orderid=' + id
					url: '../category/orderDetail?orderid=' + id
				});
			},
			handleCancelOrder() {
				var self = this;
				self.isMask = !self.isMask;
				// console.log(self.returnReason,1111);
				self.$http
					.post(service.api.order.cancel, {
						order_id: self.id,
						cancel_desc: self.returnReason
					})
					.then(function(res) {
						// console.log(res);
						if (res.code == 1) {
							uni.showToast({
								icon: 'none',
								title: '取消成功'
							});
							setTimeout(function() {
								self.getList();
							}, 500)
						} else {
							uni.showToast({
								icon: 'none',
								title: res.info
							});
						}
					});
			},
			entrust(id, pay_price) {
				var self = this;
				self.value = 0;
				self.label = 0;
				self.total = 0;
				self.charge = 0;
				var arr = [];
				self.wei_id = id
				self.wei_price = pay_price
				self.$http.get(service.api.order.entrust, {
						order_id: self.wei_id
					})
					.then(function(res) {
						if (res.code == 1) {
							self.iswask = !self.iswask;
							var list = res.data
							// list = Array.from(list);
							list.forEach(it => {
								var s = {
									'value': it.charge,
									'label': it.priceper + '%',
									'id': it.id
								}
								arr.push(s)
								self.wei_list = arr

							})

						} else {
							uni.showToast({
								icon: 'none',
								title: res.info
							});
						}
					}); 
			},
			// 委托选择
			confirm(e) {
				var self = this;
				self.value = e[0].value
				self.label = e[0].label
				var total_n = parseFloat(self.wei_price)
				var total_o = parseFloat(self.wei_price) * (parseFloat(self.label) / 100)
				self.total = total_n + total_o
				self.charge = parseFloat(self.wei_price) * self.value / 100
				console.log(parseFloat(self.wei_price) ,self.value);
				self.wei_list.forEach(it => {
					if (it.label == e[0].label) {
						self.charge_id = it.id
					}
				})

			},
			click_wei() {
				this.show = !this.show
			},
			entrust_tap() {
				var self = this;
				if (self.charge_id == 0) {
					self.$api.msg('请选择比例')
					return;
				}
				if (self.checked == false) {
					self.$api.msg('您还未同意《委托协议》');
					return;
				}
				this.iswask = !this.iswask
				uni.navigateTo({
					url: '../createOrder/orderDetail?order_id=' + self.wei_id + '&entrust_id=' + self.charge_id + '&charge=' + self.charge
				})
			},
			handleRemoveOrder(oid) {
				console.log(oid);
				var self = this;
				self.$http
					.post(service.api.order.detele, {
						order_id: oid
					})
					.then(function(res) {
						console.log(res);
						if (res.code == 1) {
							uni.showToast({
								icon: 'none',
								title: res.info
							});
							setTimeout(function() {
								self.getList();
							}, 500);
						}
					});
			},
			watchLogistics(oid) {
				uni.navigateTo({
					url: '../afterService/logistics?oid=' + oid
				})
			},
			confirmReceipt(id) {
				console.log(id);
				var self = this;
				self.$http
					.post(service.api.order.confirm, {
						order_id: id
					})
					.then(function(res) {
						console.log(res);
						if (res.code == 1) {
							uni.showToast({
								icon: 'none',
								title: res.info
							});
							setTimeout(function() {
								self.getList();
							}, 500);
						}
					});
			},
			handleConfirm(id) {
				uni.navigateTo({
					url: '/pages/shopComment/shopComment'
				})
			},
		}
	};
</script>

<style lang="scss" scoped>
	.list-scroll-content {
		height: 100%;
	}
 
	page {
		height: 100%;

		.order {
			height: 100%;
			position: fixed;
			z-index: 100;
			width: 100%;
		}
	}

	// 协议
	.agreement {
		margin: 20upx 0;
		padding: 0px 16px;
		color: #999999;
		font-size: 30upx;
		text-align: left;

		text {
			color: #ff594d;
		}
	}

	.weituo {
		background: #ff594d;
		color: #fff !important;
		border: 0px !important;
	}

	.btn-cha {
		color: #646464 !important;
		border: 2rpx solid #646464 !important;
	}

	.swiper-box {
		height: 100%;
		padding-top: 90upx;
		box-sizing: border-box;
		padding-bottom: 90upx;
	}

	.bottom_all {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		justify-content: flex-end;
		margin-right: -20rpx;
	}

	uni-swiper-item {
		overflow: auto;
	}

	.navbar {
		width: 100%;
		display: flex;
		height: 40px;
		// padding: 0 5px;
		background: #f3f3f3;
		box-shadow: 0px 4upx 8upx #dcdfe6;
		position: fixed;
		// top: 88upx;
		z-index: 200;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: #303133;
			position: relative;

			&.current {
				color: #ff594d;

				&:after {
					// content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 50px;
					height: 0;
					/* border-bottom: 2px solid #fa436a; */
					border-bottom: 4upx solid #ff594d;
				}
			}
		}
	}

	.order-list {
		margin-top: 110upx;
	}

	.order-item {
		margin-bottom: 20upx;
		margin: 20upx;
		background-color: #fff;
		padding: 30upx 22upx 24upx 22upx;
		border-radius: 20upx;
	}

	.order-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.num {
		font-size: 26upx;
		color: #666666;
	}

	.state {
		color: #ff594d;
		font-weight: bold;
	}

	.order-center {
		border-bottom: 1px solid rgba(237, 237, 237, 1);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.img {
		width: 190upx;
		margin-top: 30upx;
		margin-bottom: 24upx;
	}

	.order-img {
		width: 190upx;
		height: 187upx;
	}

	.center-right {
		flex: 1;
		margin-left: 25upx;
	}

	.title {
		color: #333;
		font-size: 26upx;
		font-weight: bold;
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

	.total {
		display: flex;
		justify-content: flex-end;
		color: #333;
		// font-weight: bold;
		padding: 20upx 0;
	}

	.bottom {
		display: flex;
		justify-content: flex-end;
	}

	.money {
		color: #ff594d;
		font-weight: bold;
	}

	.back {
		border: 1px solid #999;
		border-radius: 16px;
		width: 165rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		font-size: 28rpx;
		box-sizing: border-box;
		color: #666;
		margin-right: 20rpx;
	}

	.warn {
		border: 1px solid #ff594d;
		border-radius: 33upx;
		width: 165rpx;
		height: 60rpx;
		font-size: 28rpx;
		line-height: 60rpx;
		text-align: center;
		box-sizing: border-box;
		color: #ff594d;
		margin-right: 20rpx;
	}

	.cancel-order {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.63);
		z-index: 1000;

		.cause {
			width: 630upx;
			height: 761upx;
			background-color: #fff;
			border-radius: 12upx;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -315upx;
			margin-top: -380.5upx;

			.title {
				width: 100%;
				height: 105upx;
				line-height: 105upx;
				text-align: center;
				color: #333333;
				font-size: 32upx;
				font-weight: bold;
				border-bottom: 2upx solid rgba(241, 241, 241, 1);
			}

			.cause-box {
				display: flex;
				justify-content: space-between;
				padding: 23upx 22upx 23upx 38upx;
			}

			.btn {
				display: flex;
				padding: 60upx 0 40upx 0;

				.cancel {
					flex: 1;
					text-align: center;
					color: #333333;
					font-size: 32upx;
				}

				.confirm {
					flex: 1;
					text-align: center;
					color: #fff;
					font-size: 32upx;
				}
			}
		}
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
			margin: 0 60upx 240upx 60upx;
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
				height: 70upx;
				width: 100%;
				display: flex;
				justify-content: center;
				// padding: 0 15upx 0 272upx;
				align-items: center;
				box-sizing: border-box;
				padding-bottom: 30upx;
				// border-bottom: 1px solid #f1f1f1;

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

		.options_bao {
			padding-left: 40rpx;
			font-size: 30rpx;
		}

		.foot {
			margin-top: 40rpx;
			margin-bottom: 10rpx;
			border-top: 2rpx solid #B6B6B6;
			width: 88%;
			padding: 0px;
			padding-top: 20rpx;
			margin-left: 6%;
		}

		.options_inp {
			font-size: 30rpx;
			display: flex;
			margin-top: 40rpx;

			.input {
				border-bottom: 2rpx solid #999;
				width: 20%;
				margin-left: 70rpx;
				text-align: center;
			}
		}

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
			width: 30%;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 50rpx;
			background: none;
			border: 2rpx solid #000;
			margin-left: 10%;
			color: #000;
		}

		.confirm-btn {
			border: 0rpx solid #000;
			background: #ff594d;
			margin-right: 10%;
			color: #fff;
		}
	}

	.not-data {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 200upx;
	}

	uni-checkbox /deep/ .uni-checkbox-input {
		border-radius: 50%;
	}

	uni-checkbox /deep/ .uni-checkbox-input::before {
		// content: '';
		// width: 40upx;
		// height: 40upx;
		border-radius: 50%;
		background-color: #ff594d;
	}

	/deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		border: 0px;
	}

	uni-checkbox:not([disabled]) /deep/ .uni-checkbox-input:hover {
		// border-color: #ff594d;
	}
</style>
