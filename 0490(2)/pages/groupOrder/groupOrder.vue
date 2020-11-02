<template>
	<view class="order">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabIndex === index }" @click="tabClick(index)">{{ item.text }}</view>
		</view>
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<!-- 全部 -->
			<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y>
					<view class="order-item" v-for="(item, index) in listData" :key="index">
						<view class="order-top">
							<view class="num">订单单号：{{ item.orderno }}</view>
							<view class="state" v-if="item.status == -1">已取消</view>
							<view class="state" v-if="item.status == 0">待付款</view>
							<view class="state" v-if="item.status == 1">已付款</view>
							<view class="state" v-if="item.status == 2">待发货</view>
							<view class="state" v-if="item.status == 3">未中标</view>
							<view class="state" v-if="item.status == 4">已发货</view>
							<view class="state" v-if="item.status == 5">已完成</view>
						</view>
						<view class="order-center" @click="jump('/pages/groupOrder/group?orderid=' + item.id + '&status=' + item.status, item.id)">
							<view class="img"><image class="order-img" :src="item.thumb" mode=""></image></view>
							<view class="center-right">
								<view class="title">{{ item.title }}</view>
								<view class="detail">
									<view class="detail-price">￥{{ item.groupsprice }}</view>
									<view class="detail-num">x{{ item.goodsnum }}</view>
								</view>
							</view>
						</view>
						<view class="total">
							共1件，合计：
							<view class="money">￥{{ item.price }}</view>
						</view>
						<!-- <view class="bottom" v-if="item.status==1"> -->
						<!-- <view class="back" @click="jump('/pages/order/review')">退/换货</view> -->
						<!-- <view class="back">申请售后</view> -->
						<!-- <view class="warn">继续拼团</view> -->
						<!-- </view> -->
						<view class="bottom" v-if="item.status == -1"><view class="warn" @click="handleRemoveOrder(item.id)">删除订单</view></view>
						<view class="bottom" v-if="item.status == 0">
							<view class="back" @click="jump('/pages/order/address')">修改地址</view>
							<!-- <view class="back" @click="isMask = !isMask;">取消订单</view> -->
							<view class="back" @click="cancel(item.id)">取消订单</view>
							<view class="warn" @click="joinGroup(item.id)">去参团</view>
						</view>
						<view class="bottom" v-if="item.status == 1">
							<view class="back">等待开奖</view>
							<view class="warn">邀请好友</view>
						</view>
						<view class="bottom" v-if="item.status == 2"><view class="warn">提醒发货</view></view>
						<view class="bottom" v-if="item.status == 3"><view class="warn" @click="jump('/pages/groupShopping/groupShopping')">继续拼团</view></view>
						<view class="bottom" v-if="item.status == 4">
							<!-- <view class="back">查看物流</view> -->
							<view class="warn">确认收货</view>
						</view>
						<view class="bottom" v-if="item.status == 5">
							<!-- <view class="back">查看物流</view> -->
							<!-- <view class="warn">评价</view> -->
							<view class="warn" v-if="item.iscomment==1" @click="handleConfirm(item.id)">去评价</view>
							<view class="warn" v-if="item.iscomment==2"  @click="handleConfirm(item.id)">追加评价</view>
						</view>
					</view>
					<view class="not-data" v-if="listData.length == 0">您还没有相关订单</view>
					<!-- <view class="order-item">
						<view class="order-top">
							<view class="num">订单单号：SH2020062812345698</view>
							<view class="state">已发货</view>
						</view>
						<view class="order-center">
							<view class="img">
								<image class="order-img" src="../../static/order/pic.png" mode=""></image>
							</view>
							<view class="center-right">
								<view class="title">塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装</view>
								<view class="detail">
									<view class="detail-price">￥1296</view>
									<view class="detail-num">x1</view>
								</view>
							</view>
						</view>
						<view class="total">
							共1件，合计：
							<view class="money">￥1296</view>
						</view>
						<view class="bottom">
							<view class="back">查看物流</view>
							<view class="warn">确认收货</view>
						</view>
					</view>
					<view class="order-item">
						<view class="order-top">
							<view class="num">订单单号：SH2020062812345698</view>
							<view class="state">已完成</view>
						</view>
						<view class="order-center">
							<view class="img">
								<image class="order-img" src="../../static/order/pic.png" mode=""></image>
							</view>
							<view class="center-right">
								<view class="title">塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装</view>
								<view class="detail">
									<view class="detail-price">￥1296</view>
									<view class="detail-num">x1</view>
								</view>
							</view>
						</view>
						<view class="total">
							共1件，合计：
							<view class="money">￥1296</view>
						</view>
						<view class="bottom">
							<view class="back">查看物流</view>
							<view class="warn">评价</view>
						</view>
					</view>
					<view class="order-item">
						<view class="order-top">
							<view class="num">订单单号：SH2020062812345698</view>
							<view class="state">待付款</view>
						</view>
						<view class="order-center">
							<view class="img">
								<image class="order-img" src="../../static/order/pic.png" mode=""></image>
							</view>
							<view class="center-right">
								<view class="title">塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装</view>
								<view class="detail">
									<view class="detail-price">￥1296</view>
									<view class="detail-num">x1</view>
								</view>
							</view>
						</view>
						<view class="total">
							共1件，合计：
							<view class="money">￥1296</view>
						</view>
						<view class="bottom">
							<view class="back" @click="jump('/pages/order/address')">修改地址</view>
							<view class="back" @click="isMask=!isMask">取消订单</view>
							<view class="warn">去参团</view>
						</view>
					</view> -->
				</scroll-view>
			</swiper-item>
			<!-- 代付款 -->
			<!-- <swiper-item class="tab-content">
				<scroll-view class="list-scroll-content" scroll-y>
					<view class="order-item">
						<view class="order-top">
							<view class="num">订单单号：SH2020062812345698</view>
							<view class="state">待付款</view>
						</view>
						<view class="order-center" @click="jump('/pages/groupOrder/pay')">
							<view class="img">
								<image class="order-img" src="../../static/order/pic.png" mode=""></image>
							</view>
							<view class="center-right">
								<view class="title">塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装</view>
								<view class="detail">
									<view class="detail-price">￥1296</view>
									<view class="detail-num">x1</view>
								</view>
							</view>
						</view>
						<view class="total">
							共1件，合计：
							<view class="money">￥1296</view>
						</view>
						<view class="bottom">
							<view class="back" @click="jump('/pages/order/address')">修改地址</view>
							<view class="back" @click="isMask=!isMask">取消订单</view>
							<view class="warn">去参团</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item> -->
			<!-- 拼团中 -->
			<!-- 		<swiper-item class="tab-content">
				<scroll-view class="list-scroll-content" scroll-y>

					<view class="order-item">
						<view class="order-top">
							<view class="num">订单单号：SH2020062812345698</view>
							<view class="state">拼团中</view>
						</view>
						<view class="order-center" @click="jump('/pages/groupOrder/group')">
							<view class="img">
								<image class="order-img" src="../../static/order/pic.png" mode=""></image>
							</view>
							<view class="center-right">
								<view class="title">塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装</view>
								<view class="detail">
									<view class="detail-price">￥1296</view>
									<view class="detail-num">x1</view>
								</view>
							</view>
						</view>
						<view class="total">
							共1件，合计：
							<view class="money">￥1296</view>
						</view>
						<view class="bottom"> -->
			<!-- <view class="back" @click="jump('/pages/order/sale')">申请售后</view> -->
			<!-- 		<view class="warn">邀请好友</view>
						</view>
					</view>

				</scroll-view>
			</swiper-item> -->
			<!-- 代发货 -->
			<!-- <swiper-item class="tab-content">
				<scroll-view class="list-scroll-content" scroll-y>
					<view class="order-item">
						<view class="order-top">
							<view class="num">订单单号：SH2020062812345698</view>
							<view class="state">待发货</view>
						</view>
						<view class="order-center" @click="jump('/pages/groupOrder/delivery')">
							<view class="img">
								<image class="order-img" src="../../static/order/pic.png" mode=""></image>
							</view>
							<view class="center-right">
								<view class="title">塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装</view>
								<view class="detail">
									<view class="detail-price">￥1296</view>
									<view class="detail-num">x1</view>
								</view>
							</view>
						</view>
						<view class="total">
							共1件，合计：
							<view class="money">￥1296</view>
						</view>
						<view class="bottom"> -->
			<!-- <view class="back">申请售后</view> -->
			<!-- 	<view class="warn">提醒发货</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item> -->
			<!-- 代收货 -->
			<!-- <swiper-item class="tab-content">
				<scroll-view class="list-scroll-content" scroll-y>
					<view class="order-item">
						<view class="order-top">
							<view class="num">订单单号：SH2020062812345698</view>
							<view class="state">已完成</view>
						</view>
						<view class="order-center" @click="jump('/pages/groupOrder/receive')">
							<view class="img">
								<image class="order-img" src="../../static/order/pic.png" mode=""></image>
							</view>
							<view class="center-right">
								<view class="title">塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装</view>
								<view class="detail">
									<view class="detail-price">￥1296</view>
									<view class="detail-num">x1</view>
								</view>
							</view>
						</view>
						<view class="total">
							共1件，合计：
							<view class="money">￥1296</view>
						</view>
						<view class="bottom">
							<view class="back">查看物流</view>
							<view class="warn">确认收货</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item> -->
			<!-- 代评价 -->
			<!-- <swiper-item class="tab-content">
				<scroll-view class="list-scroll-content" scroll-y>
					<view class="order-item">
						<view class="order-top">
							<view class="num">订单单号：SH2020062812345698</view>
							<view class="state">待评价</view>
						</view>
						<view class="order-center" @click="jump('/pages/groupOrder/comment')">
							<view class="img">
								<image class="order-img" src="../../static/order/pic.png" mode=""></image>
							</view>
							<view class="center-right">
								<view class="title">塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装</view>
								<view class="detail">
									<view class="detail-price">￥1296</view>
									<view class="detail-num">x1</view>
								</view>
							</view>
						</view>
						<view class="total">
							共1件，合计：
							<view class="money">￥1296</view>
						</view>
						<view class="bottom">
							<view class="back">查看物流</view>
							<view class="warn">评价</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item> -->
		</swiper>

		<!-- <view class="cancel-order" v-if="cancelOrder">
			<view class="cause">
				<view class="title">
					请选择取消订单原因
				</view>
				<view class="cause-box" v-for="(item,index) in causeList" :key='index'>
					<view>
						{{item.title}}
					</view>
					<view class="">
						<label class="radio">
							<checkbox value="" id="check" /><text></text>
						</label>
					</view>
				</view>

				<view class="btn">
					<view class="cancel" @click="cancelOrder=!cancelOrder">
						取消
					</view>
					<view class="confirm" @click="confirm">
						确定
					</view>
				</view>

			</view>

		</view> -->
		<view class="mask" v-if="isMask">
			<view class="mask_top"></view>
			<view class="mask_content">
				<!-- 标题 -->
				<view class="title">
					<text>请选择取消订单原因</text>
					<!-- <image src="../../static/icon/cha.png" mode="aspectFit" @tap="maskShow(false)"></image> -->
				</view>
				<!-- 选择项 -->
				<view class="options">
					<radio-group @change="_returnReason">
						<view class="list" v-for="(item, index) in reasonList" :key="index">
							<text class="common_text_style">{{ item.title }}</text>
							<radio :value="item.state" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
					</radio-group>

					<!-- <view class="list">
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
						</view> -->
					<!-- 确认按钮 -->
					<view class="btn">
						<view class="confirm" @tap="maskShow(false)">取消</view>
						<view class="confirm confirm-btn" @tap="handleCancelOrder">确定</view>
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
			listData: [],
			returnReason: '',
			id: '',
			// reasonList[{
			// 	text:'我不想买了',
			// 	state:'1'
			// },{
			// 	text:'信息填写错误，重拍',
			// 	state:'2'
			// },
			// {
			// 	text:'卖家缺货',
			// 	state:'3'
			// },
			// {
			// 	text:'同城见面交易',
			// 	state:'4'
			// },{
			// 		text:'其他原因',
			// 		state:'0'
			// 	}
			// ],
			navList: [
				{
					text: '全部',
					state: 'all'
				},
				{
					text: '待付款',
					state: '0'
				},
				{
					text: '已付款',
					state: '1'
				},
				{
					text: '未中标',
					state: '3'
				},
				{
					text: '待发货',
					state: '2'
				},
				{
					text: '待收货',
					state: '4'
				}
			],
			reasonList: [
				{
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
			]
		};
	},
	onLoad(option) {
		this.$nextTick(function() {
			if (option.id) {
				this.tabIndex = option.id;
			}
		});
		this.getList();
	},
	onNavigationBarButtonTap(e) {
		// console.log('编辑');
		// this.check = !this.check;
		uni.navigateTo({
			url: './myGroup'
		});
	},
	methods: {
		jump(url, id) {
			uni.navigateTo({
				url: url
			});
		},
		//swiper 切换
		changeTab(e) {
			this.tabClick(e.target.current);
		},
		tabClick(index) {
			// uni.pageScrollTo({
			// 	scrollTop: 0, //距离页面顶部的距离
			// 	duration: 100
			// });
			this.tabIndex = index;
			this.getList();
		},
		//确定取消订单
		confirm() {
			this.isMask = !this.isMask;
		},
		// 遮罩
		maskShow(boolean) {
			console.log(3453);
			this.isMask = false;
			if (boolean) {
			}
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
			self.$http
				.get(service.api.group.list, {
					status: self.navList[self.tabIndex].state
					// goodsid: self.id
				})
				.then(function(res) {
					// console.log(res);
					var list = res.data.datas;
					self.listData = list;
					// console.log(self.groudList.teamnum);
					// self.groudSwiper = list.images;
					// self.groudAvatar = list.teaming;
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
				url: '../createOrder/orderDetail?orderid=' + id
			});
		},
		handleCancelOrder() {
			var self = this;
			self.isMask = !self.isMask;
			// console.log(self.returnReason,1111);
			self.$http
				.get(service.api.group.cancel, {
					orderid: self.id,
					status: self.returnReason
				})
				.then(function(res) {
					// console.log(res);
					if (res.code == 1) {
						uni.showToast({
							icon: 'none',
							title: '取消成功'
						});
					}
					self.getList();
				});
		},
		handleRemoveOrder(oid) {
			console.log(oid);
			var self = this;
			self.$http
				.get(service.api.group.remove, {
					orderid: oid
				})
				.then(function(res) {
					console.log(res);
					if (res.code == 1) {
						uni.showToast({
							icon: 'none',
							title: '删除成功'
						});
						setTimeout(function() {
							self.getList();
						}, 2000);
					}
				});
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	height: 100%;

	.order {
		height: 100%;
		position: fixed;
		z-index: 100;
		width: 100%;
	}
}

.swiper-box {
	height: 100%;
	padding-top: 90upx;
	box-sizing: border-box;
	padding-bottom: 90upx;
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
				content: '';
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
	font-weight: bold;
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
	border-radius: 33upx;
	width: 186upx;
	height: 65upx;
	line-height: 65upx;
	text-align: center;
	box-sizing: border-box;
	color: #666;
	margin-right: 24upx;
}

.warn {
	border: 1px solid #ff594d;
	border-radius: 33upx;
	width: 186upx;
	height: 65upx;
	line-height: 65upx;
	text-align: center;
	box-sizing: border-box;
	height: 65upx;
	color: #ff594d;
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
				color: #000000;
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
	content: '';
	width: 40upx;
	height: 40upx;
	border-radius: 50%;
	background-color: #ff594d;
}

uni-checkbox:not([disabled]) /deep/ .uni-checkbox-input:hover {
	border-color: #ff594d;
}
</style>
