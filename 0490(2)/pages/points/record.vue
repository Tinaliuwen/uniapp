<template>
	<view class="order">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabIndex === index }" @click="tabClick(index)">{{ item.text }}</view>
		</view>
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<!-- 全部 -->
			<swiper-item class="tab-content">
				<scroll-view class="list-scroll-content" scroll-y>
					<view class="order-item">
						<view class="order-top">
							<view class="num">兑换单号：SH2020062812345698</view>
							<view class="state">待发货</view>
						</view>
						<view class="order-center">
							<view class="img">
								<image class="order-img" src="../../static/order/pic.png" mode=""></image>
							</view>
							<view class="center-right">
								<view class="title">塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装</view>
								<view class="detail">
									<view class="detail-price">1296积分</view>
									<view class="detail-num">x1</view>
								</view>
							</view>
						</view>
						<view class="total">
							共1件，合计：
							<view class="money">1296积分</view>
						</view>
						<view class="bottom">
							<view class="warn">提醒发货</view>
						</view>
					</view>
					<view class="order-item">
						<view class="order-top">
							<view class="num">兑换单号：SH2020062812345698</view>
							<view class="state">已发货</view>
						</view>
						<view class="order-center">
							<view class="img">
								<image class="order-img" src="../../static/order/pic.png" mode=""></image>
							</view>
							<view class="center-right">
								<view class="title">塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装</view>
								<view class="detail">
									<view class="detail-price">129元 + 1296积分</view>
									<view class="detail-num">x1</view>
								</view>
							</view>
						</view>
						<view class="total">
							共1件，合计：
							<view class="money">129元 + 1296积分</view>
						</view>
						<view class="bottom">
							<view class="back">查看物流</view>
							<view class="warn">确认收货</view>
						</view>
					</view>
					<view class="order-item">
						<view class="order-top">
							<view class="num">兑换单号：SH2020062812345698</view>
							<view class="state">已完成</view>
						</view>
						<view class="order-center">
							<view class="img">
								<image class="order-img" src="../../static/order/pic.png" mode=""></image>
							</view>
							<view class="center-right">
								<view class="title">塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装</view>
								<view class="detail">
									<view class="detail-price">1296积分</view>
									<view class="detail-num">x1</view>
								</view>
							</view>
						</view>
						<view class="total">
							共1件，合计：
							<view class="money">1296积分</view>
						</view>
						<view class="bottom">
							<view class="back">查看物流</view>
							<view class="warn">评价</view>
						</view>
					</view>
					<view class="order-item">
						<view class="order-top">
							<view class="num">兑换单号：SH2020062812345698</view>
							<view class="state">待付款</view>
						</view>
						<view class="order-center">
							<view class="img">
								<image class="order-img" src="../../static/order/pic.png" mode=""></image>
							</view>
							<view class="center-right">
								<view class="title">塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装</view>
								<view class="detail">
									<view class="detail-price">129元 + 1296积分</view>
									<view class="detail-num">x1</view>
								</view>
							</view>
						</view>
						<view class="total">
							共1件，合计：
							<view class="money">129元 + 1296积分</view>
						</view>
						<view class="bottom">
							<view class="back" @click="jump('/pages/order/address')">修改地址</view>
							<view class="back" @click="cancelOrder=!cancelOrder">取消订单</view>
							<view class="warn">去参团</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 代付款 -->
			<swiper-item class="tab-content">
				<scroll-view class="list-scroll-content" scroll-y>
					<view class="order-item">
						<view class="order-top">
							<view class="num">订单单号：SH2020062812345698</view>
							<view class="state">待付款</view>
						</view>
						<view class="order-center" @click="jump('/pages/order/pay')">
							<view class="img">
								<image class="order-img" src="../../static/order/pic.png" mode=""></image>
							</view>
							<view class="center-right">
								<view class="title">塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装</view>
								<view class="detail">
									<view class="detail-price">1296积分</view>
									<view class="detail-num">x1</view>
								</view>
							</view>
						</view>
						<view class="total">
							共1件，合计：
							<view class="money">1296积分</view>
						</view>
						<view class="bottom">
							<view class="back" @click="jump('/pages/order/address')">修改地址</view>
							<view class="back" @click="cancelOrder=!cancelOrder">取消订单</view>
							<view class="warn">去付款</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 代发货 -->
			<swiper-item class="tab-content">
				<scroll-view class="list-scroll-content" scroll-y>

					<view class="order-item">
						<view class="order-top">
							<view class="num">订单单号：SH2020062812345698</view>
							<view class="state">待发货</view>
						</view>
						<view class="order-center" @click="jump('/pages/order/delivery')">
							<view class="img">
								<image class="order-img" src="../../static/order/pic.png" mode=""></image>
							</view>
							<view class="center-right">
								<view class="title">塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装</view>
								<view class="detail">
									<view class="detail-price">1296积分</view>
									<view class="detail-num">x1</view>
								</view>
							</view>
						</view>
						<view class="total">
							共1件，合计：
							<view class="money">1296积分</view>
						</view>
						<view class="bottom">
							<view class="back" @click="jump('/pages/order/sale')">申请售后</view>
							<view class="warn">提醒发货</view>
						</view>
					</view>

				</scroll-view>
			</swiper-item>
			<!-- 代收货 -->
			<swiper-item class="tab-content">
				<scroll-view class="list-scroll-content" scroll-y>
					<view class="order-item">
						<view class="order-top">
							<view class="num">订单单号：SH2020062812345698</view>
							<view class="state">已发货</view>
						</view>
						<view class="order-center" @click="jump('/pages/order/receive')">
							<view class="img">
								<image class="order-img" src="../../static/order/pic.png" mode=""></image>
							</view>
							<view class="center-right">
								<view class="title">塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装</view>
								<view class="detail">
									<view class="detail-price">1296积分</view>
									<view class="detail-num">x1</view>
								</view>
							</view>
						</view>
						<view class="total">
							共1件，合计：
							<view class="money">1296积分</view>
						</view>
						<view class="bottom">
							<view class="back" @click="jump('/pages/order/sale')">申请售后</view>
							<view class="back">查看物流</view>
							<view class="warn">确认收货</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 已完成 -->
			<swiper-item class="tab-content">
				<scroll-view class="list-scroll-content" scroll-y>
					<view class="order-item">
						<view class="order-top">
							<view class="num">订单单号：SH2020062812345698</view>
							<view class="state">已完成</view>
						</view>
						<view class="order-center" @click="jump('/pages/order/comment')">
							<view class="img">
								<image class="order-img" src="../../static/order/pic.png" mode=""></image>
							</view>
							<view class="center-right">
								<view class="title">塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装</view>
								<view class="detail">
									<view class="detail-price">1296积分</view>
									<view class="detail-num">x1</view>
								</view>
							</view>
						</view>
						<view class="total">
							共1件，合计：
							<view class="money">1296积分</view>
						</view>
						<view class="bottom">
							<view class="back">查看物流</view>
							<view class="warn">评价</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>

		<view class="cancel-order" v-if="cancelOrder">
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
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 0,
				cancelOrder:false,
				navList: [{
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
		onLoad(option){
			this.$nextTick(function(){
				if(option.id){
					this.tabIndex = option.id
				}
			})
		},
		methods: {
			jump(url) {
				uni.navigateTo({
					url: url
				})
			},
			//swiper 切换
			changeTab(e) {
				this.tabClick(e.target.current);
			},
			tabClick(index) {
				console.log(index)
				// uni.pageScrollTo({
				// 	scrollTop: 0, //距离页面顶部的距离
				// 	duration: 100
				// });
				this.tabIndex = index
			},
			//确定取消订单
			confirm(){
				this.cancelOrder = !this.cancelOrder
				
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
	}

	uni-swiper-item {
		overflow: auto;
	}

	.navbar {
		width: 100%;
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #f3f3f3;
		box-shadow: 0px 4upx 8upx #dcdfe6;
		position: fixed;
		top: 88upx;
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
					width: 60px;
					height: 0;
					/* border-bottom: 2px solid #fa436a; */
					border-bottom: 2upx solid #ff594d;
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
