<template>
	<view class="order">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabIndex === index }" @click="tabClick(index)">{{ item.text }}</view>
		</view>

		<view class="center">
			<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
				<swiper-item class="tab-content" v-for="(item, index) in navList" :key="index">
					<scroll-view class="list-scroll-content" scroll-y="true">
						<view style="height: 80upx;"></view>
						<view class="order-item">
							<view class="order-top">
								<view class="num">订单单号：SH2020062812345698</view>
								<view class="state">待发货</view>
							</view>
							<view class="order-center">
								<view class="img"><image class="order-img" src="../../static/order/pic.png" mode=""></image></view>
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
								<view class="back">退/换货</view>
								<view class="warn">提醒发货</view>
							</view>
						</view>
						<view class="order-item">
							<view class="order-top">
								<view class="num">订单单号：SH2020062812345698</view>
								<view class="state">已发货</view>
							</view>
							<view class="order-center">
								<view class="img"><image class="order-img" src="../../static/order/pic.png" mode=""></image></view>
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
								<view class="img"><image class="order-img" src="../../static/order/pic.png" mode=""></image></view>
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
								<view class="warn">追加评价</view>
							</view>
						</view>
						<view class="order-item">
							<view class="order-top">
								<view class="num">订单单号：SH2020062812345698</view>
								<view class="state">待付款</view>
							</view>
							<view class="order-center">
								<view class="img"><image class="order-img" src="../../static/order/pic.png" mode=""></image></view>
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
								<view class="back">修改地址</view>
								<view class="back" @click="isMask=!isMask">取消订单</view>
								<view class="warn">去付款</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<!-- <view class="cancel-order" v-if="cancelOrder">
			<view class="cause">
				<view class="title">
					请选择取消订单原因
				</view>
				<view class="cause-box" v-for="(item,index) in causeList" :key='index'>
					<view >
						{{item.title}}
					</view>
					<view class="">
						<label class="radio">
							<radio value="" id="check" color="#ff594d" /><text></text>
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
		<view class="mask" v-show="isMask">
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
			tabIndex: 0,
				cancelOrder:false,
				isMask: false, //遮罩
			navList: [
				{
					text: '全部',
					state: '0'
				},
				{
					text: '待付款',
					state: '1'
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
					text: '待评价',
					state: '4'
				}
			],
			causeList: [{
					title: '我不想买了',
					check: true
				},
				{
					title: '信息填写错误，重拍',
					check: false
				},
				{
					title: '卖家缺货',
					check: false
				},
				{
					title: '同城见面交易',
					check: false
				},
				{
					title: '其他原因',
					check: false
				}
			]
		};
	},
	onLoad:function(){
		this.getList()
	},
	methods: {
		//swiper 切换
		changeTab(e) {
			this.tabClick(e.target.current);
		},
		//顶部tab点击
		tabClick(index) {
			this.change(index);
		},
		change(type) {
			this.tabIndex = type;
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
			getList() {
					var self = this;
					self.$http
						.get(service.api.order.orderList, {
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
	}
};
</script>

<style lang="scss" scoped>
.navbar {
	display: flex;
	height: 40px;
	padding: 0 5px;
	background: #fff;
	box-shadow: 0px 4upx 8upx #dcdfe6;
	position: fixed;
	width: 100%;
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
				border-bottom: 2px solid #ff594d;
			}
		}
	}
}
.center {
	width: 100%;
	height: 100%;
	z-index: 120;
	// padding-top: 80upx;
	position: absolute;
}
.swiper-box {
	height: 100%;
}
.list-scroll-content {
	height: 100%;
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
	border-bottom: 1px solid #ccc;
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
	width: 100%;
	height: 190upx;
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
	padding: 0 45upx;
	height: 65upx;
	display: flex;
	align-items: center;
	color: #666;
	margin-right: 24upx;
}
.warn {
	border: 1px solid #ff594d;
	border-radius: 33upx;
	padding: 0 45upx;
	height: 65upx;
	display: flex;
	align-items: center;
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
		z-index: 300;
	
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
