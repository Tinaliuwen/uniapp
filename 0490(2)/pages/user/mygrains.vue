<template>
	<view class="mygrains">
		<view class="head">
			<view class="header"></view>
			<view class="header-center">
				<view class="center-top">
					<text>账户米粒(颗)</text>
					<text>{{ rice }}</text>
				</view>
				<view class="center-bottom">
					<text @click="jump('/pages/myRice/transferBalance')">转出积分</text>
					<view @click="jump('/pages/myRice/transferDetail')">
						<text>转出明细</text>
						<image src="../../static/icon/right1.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 	<scroll-view scroll-y="true" class="uni-scroll-view" >
			<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id" :data-current="index" @click="tapTab(index,tab.id)">{{tab.name}}</view>
		</scroll-view> -->
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabIndex === index }" @click="tabClick(index)">{{ item.text }}</view>
		</view>
		<view class="center">
			<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
				<swiper-item class="tab-content" v-for="(item, index) in navList" :key="index">
					<!-- <view class="swiper-item"> -->
					<scroll-view class="list-scroll-content" scroll-y="true">
						<!-- <view style="height: 112upx;"></view> -->
						<view class="consume-item" v-for="(item, index) in alreadyList" :key="index">
							<view class="consume-left">
								<view class="num">{{ item.desc }}</view>
								<view class="time">SH202006281234567899</view>
							</view>
							<view class="money">
								<!-- <view class="time">SH202006281234567899</view> -->
								<view class="price">-{{ item.amount }}</view>
								<view class="time">{{ item.add_time }}</view>
							</view>
						</view>
					</scroll-view>
					<!-- </view> -->
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import service from '@/store/service.js';
export default {
	data() {
		return {
			tabIndex: 0,
			isClickChange: false,
			tabid: 1,
			rice: '',
			alreadyList: '',
			isLoading: false,
			scroll: false,
			status: 0,
			pages: 1,
			limit: 5,
			page: 0,
			out: 0,
			appurl: '',
			navList: [
				{
					text: '待结算',
					state: '0'
				},
				{
					text: '预结算',
					state: '1'
				},
				{
					text: '已结算',
					state: '2'
				}
			]
		};
	},
	onLoad: function() {
		this.getRice();
		this.change(0);
	},
	methods: {
		jump(url) {
			uni.navigateTo({
				url: url
			});
		},
		changeTab(e) {
			this.tabClick(e.target.current);
		},
		//顶部tab点击
		tabClick(index) {
			this.change(index);
		},
		change(type) {
			this.tabIndex = type;
			if (type == 0) {
				this.appurl = '';
			} else if (type == 1) {
				this.appurl = '';
			} else {
				this.appurl = service.api.rice.already;
			}
			this.alreadyList = [];
			this.isLoading = false;
			this.scroll = false;
			this.pages = 1;
			this.page = 0;
			this.loadHistory();
		},
		loadHistory() {
			var self = this;
			if (self.isLoading) {
				return;
			}
			if (self.page < self.pages) {
				self.out = 0;
				self.isLoading = true;
				self.scroll = false;
				self.status = 1;
				var page = self.page + 1;
				self.$http
					.get(self.appurl, {
						page: self.page,
						num: self.limit
					})
					.then(function(res) {
						if (res.code == 1) {
							var list = res.data;
							list.forEach(item => {
								//console.log(item)
								self.alreadyList.push(item);
							});
							self.page = page;
							self.pages = page + 1;
							self.scroll = true;
							self.isLoading = false;
							self.out = 1;
						}
					});
			}
		},
		// tapTab(index, id) {
		// 	this.tabid = id;
		// 	if (this.tabIndex == index) {
		// 		this.isClickChange = true;
		// 		this.tabIndex = index;
		// 	}
		// },
		// 米粒数量
		getRice() {
			var self = this;
			self.$http.get(service.api.rice.rice, {}).then(function(res) {
				var list = res.data;
				// console.log(list);
				self.rice = list;
			});
		},
		// 已结算
		getAlready() {
			var self = this;
			self.$http.get(service.api.rice.already, {}).then(function(res) {
				var list = res.data;
				// console.log(list);
				// self.rice = list;
				self.alreadyList = list;
			});
		}
	}
};
</script>

<style lang="less" scoped>
.page .active {
	color: #ff3c40;
}
.head{}
.header {
	position: relative;
	width: 100%;
	height: 368upx;
	background: url(../../static/img/bgc.png) no-repeat;
	background-size: 100% 100%;
}

.header-center {
	position: absolute;
	display: flex;
	flex-direction: column;
	left: 0;
	right: 0;
	top: 48upx;
	width: 710upx;
	height: 321upx;
	margin: 0 auto;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0upx 0upx 14upx 0upx rgba(255, 177, 174, 0.1);
	border-radius: 10px;
	.center-top {
		display: flex;
		flex-direction: column;
		text-align: center;
		text:first-child {
			font-size: 32upx;
			margin-top: 48upx;
		}

		text:last-child {
			font-size: 66upx;
		}
	}
	.center-bottom {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 20upx 0;
		// height: 90upx;
		border-top: 1px solid #f3f3f3;
		text {
			font-size: 32upx;
			font-weight: bold;
			color: #e98f3f;
		}
		view {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 140upx;
			height: 44upx;
			margin: 0 22upx 0 136upx;
			border: 1px solid #ff594d;
			color: #d16f19;
			border-radius: 20upx;
			text {
				font-size: 24upx;
				font-weight: bold;
			}
			image {
				width: 10upx;
				height: 18upx;
				margin-left: 4upx;
			}
		}
	}
}

.consume-item {
	background-color: #fff;
	padding: 28upx 22upx 22upx;
	border-bottom: 1px solid #f4f4f4;
	margin: 0 20upx;
	border-radius: 10upx;
	display: flex;
	justify-content: space-between;
}
.consume-item:nth-last-child(1) {
	border-bottom: none;
}
.consume-left {
	display: flex;
	// justify-content: space-between;
	flex-direction: column;
	justify-content: space-around;
}
.num {
	color: #333;
	// width: 450upx;
}
.time {
	color: #666666;
	font-size: 24upx;
	font-weight: 500;
}
.price {
	color: #333;
	font-weight: bold;
	display: flex;
	justify-content: flex-end;
}
.money {
	display: flex;
	flex-direction: column;

	// align-items: right;
	// justify-content: space-between;
	color: #ff594d;
	// margin-top: 20upx;
}
.consume-img {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 296upx;
}
.img {
	width: 522upx;
	height: 350upx;
}
.text {
	color: #333;
	font-weight: bold;
}

.navbar {
	background-color: #f3f3f3;
	display: flex;
	// height: 56px;
	// padding: 0 5px;
	justify-content: space-between;
	// box-shadow: 0px 4upx 8upx #dcdfe6;
	position: relative;
	// width: 100%;
	z-index: 200;
	padding: 28upx 0;
	// height: 112upx;
	// width: 100upx;
	.nav-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: 15px;
		color: #303133;
		position: relative;
		border-radius: 28upx;
		margin: 0 40upx;
		&.current {
			color: #fff;
			background: linear-gradient(90deg, rgba(233, 144, 64, 1), rgba(255, 127, 77, 1));
			&:after {
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				width: 50px;
				height: 0;
				/* border-bottom: 2px solid #fa436a; */
				// border-bottom: 2px solid #ff594d;
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
	margin-bottom: 80upx;
}
.swiper-box {
	height: 100%;
}
.list-scroll-content {
	height: 100%;
}
</style>
