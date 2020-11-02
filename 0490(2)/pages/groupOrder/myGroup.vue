<template>
	<view class="order">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabIndex === index }" @click="tabClick(index)">{{ item.text }}</view>
		</view>
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<!-- 组团中 -->
			<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y>
					<view class="order-item" v-for="(item, index) in teamsData" :key="index">
						<view class="order-top">
							<view class="num">订单单号：{{ item.orderno }}</view>
							<view class="state" v-if="item.success == -1">组团失败</view>
							<view class="state" v-if="item.success == 0">组团中</view>
							<view class="state" v-if="item.success == 1">组团成功</view>
						</view>
						<view class="order-center">
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
						<view class="bottom" v-if="item.success == 0"><view class="warn" @click="sharer(item)">邀请好友</view></view>
						<view class="bottom" v-if="item.success != 0"><view class="warn" @click="jump('/pages/groupShopping/groupShopping')">继续拼团</view></view>
					</view>
					<view class="not-data" v-if="teamsData.length == 0">您还没有相关订单</view>
				</scroll-view>
			</swiper-item>
			<!-- 组团失败 -->
			<!-- <swiper-item class="tab-content">
				<scroll-view class="list-scroll-content" scroll-y>
					<view class="order-item">
						<view class="order-top">
							<view class="num">订单单号：SH2020062812345698</view>
							<view class="state">组团失败</view>
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
						<view class="bottom">
							<view class="warn">继续拼团</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item> -->
			<!-- 组团成功 -->
			<!-- <swiper-item class="tab-content">
				<scroll-view class="list-scroll-content" scroll-y>
					<view class="order-item">
						<view class="order-top">
							<view class="num">订单单号：SH2020062812345698</view>
							<view class="state">组团成功</view>
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
						<view class="bottom">
							<view class="warn">继续拼团</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item> -->
		</swiper>
		<uniShare ref="share" @onShare="onShare"></uniShare>
	</view>
</template>

<script>
import service from '@/store/service.js';
import uniShare from '@/components/uni-share.vue';
export default {
	data() {
		return {
			tabIndex: 0,
			cancelOrder: false,
			isMask: false, //遮罩
			teamsData: [],
			navList: [
				{
					text: '组团中',
					state: '0'
				},
				{
					text: '组团失败',
					state: '-1'
				},
				{
					text: '组团成功',
					state: '1'
				}
			],
			good: []
		};
	},
	components: {
		uniShare
	},
	onLoad(option) {
		this.$nextTick(function() {
			if (option.id) {
				this.tabIndex = option.id;
			}
		});
		this.getTeams();
	},
	onNavigationBarButtonTap(e) {
		// console.log('编辑');
		// this.check = !this.check;
		console.log(111);
		uni.navigateTo({
			url: './myGroup'
		});
	},
	methods: {
		jump(url) {
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
			this.getTeams();
		},
		//确定取消订单
		confirm() {
			this.isMask = !this.isMask;
		},
		// 遮罩
		maskShow(boolean) {
			this.isMask = boolean;
			if (boolean) {
			}
		},
		// 退货原因
		_returnReason(returnReason) {
			if (returnReason) {
				this.returnReason = returnReason.detail.value;
			}
		},
		getTeams() {
			var self = this;
			self.$http
				.get(service.api.group.teams, {
					// success:self.success[self.tabIndex].state
					// goodsid: self.id
					status: self.navList[self.tabIndex].state
				})
				.then(function(res) {
					console.log(res);
					var list = res.data.datas;
					self.teamsData = list;
					// console.log(self.groudList.teamnum);
					// self.groudSwiper = list.images;
					// self.groudAvatar = list.teaming;
				});
		},

		sharer(item) {
			this.good = item;
			this.$refs.share.toggleMask();
			/* this.mode = 'selector';
							this.deepLength = 1;
							this.pickerValueDefault = [0];
							this.$refs.mpvuePicker.show(); */
		},
		onShare(e) {
			console.log(e);
			var self = this;
			if (e.type == 1) {
				var title = '拼团分享';
			} else {
				var title = self.good.title;
			}
			if (e.code == 'qq') {
				self.tapShare('qq', e.code, title);
			} else if (e.code == 'weibo') {
				self.tapShare('sinaweibo', e.code, title);
			} else {
				self.tapShare('weixin', e.code, title);
			}
		},
		//分享视频到微信
		tapShare(type, code, title) {
			var url = service.api.root + '/h5/#/pages/hundred/commodity?goodsid=' + this.good.goodsid;
			console.log(url);
			uni.share({
				provider: type,
				scene: code,
				type: 0,
				href: service.api.root + '/h5/#/pages/hundred/commodity?goodsid=' + this.good.goodsid,
				title: title,
				summary: this.content,
				imageUrl: this.good.thumb,
				success: function(res) {
					this.forward();
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				}
			});
		},
		//分享成功
		forward() {
			service.upload(
				this,
				service.api.raise.share,
				{
					crowdid: this.crowdid
				},
				'GET',
				'',
				'',
				function(self, res) {
					uni.showToast({
						icon: 'none',
						title: res.info
					});
					if (res.code == 1) {
						var num = self.share;
						self.share = num + 1;
					}
				}
			);
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
	//top: 88upx;
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
