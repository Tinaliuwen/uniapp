<template>
	<view class="my-team">
		<view style="background: #FFFFFF;">
			<view class="bg-img">
				<view class="bg">
					<image class="icon" :src="avatar == '' ? '/static/face.png' : avatar" mode=""></image>
					<view class="text">
						<view class="name">

							{{nickname}}

							<!-- {{wz_name}} -->
							<text>{{level_name}}</text>
						</view>
						<view class="grade">账号：{{mobile}}</view>
						<view class="grade">上级：{{superior}}</view>
					</view>
				</view>
				<view class="order-item">
					<view class="order-text">
						<view class="num">{{credit2}}</view>
						<view class="order">累计余额</view>
					</view>
					<!-- 	<view class="order-text">
					<view class="num">{{quarter}}</view>
					<view class="order">季度PV</view>
				</view> -->
					<view class="order-text">
						<view class="num">{{today_income}}</view>
						<view class="order">当日余额</view>
					</view>
				</view>
			</view>
		</view>
		<view class="head-center">
			<!-- #ifdef H5 -->
			<view class="heades"></view>
			<!-- #endif -->
			<!-- <view class="head-search"> -->
			<!-- border:style.border, -->
			<!-- <uni-icons size="24" type="search" class="search-icon" color="#999999"></uni-icons>
				<input class="search-input" type="text" :placeholder-style="'color: #999999;'" v-model="keywords" placeholder="请输入查询内容"></input>
				<view class="search-btn" @click="search()">搜索</view>
			</view> --> 
		</view>
			<view class="box">
				<view class="navbar">
					<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabIndex === index }" @tap="tabClick(index)">{{ item.text }}</view>
				</view>
				<view class="center">
					<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
						<swiper-item class="tab-content" v-for="(item, index) in navList" :key="index">
							<view class="swiper-item">
								<scroll-view @scrolltolower="scrolltolower" class="list-scroll-content" scroll-y="true">
									<!-- <view style="height: 112upx;"></view> -->
									<view v-for="(item, index) in teamList" :key="index" class="consume-item" @click="vip_tap(item.id,tabIndex)">
										<view class="item-left">
											<image style="width: 76upx;height: 76upx;margin-right: 20upx;" :src="item.avatar == '' ? '/static/face.png' : item.avatar"
											 mode=""></image>
											<view class="consume-left">
												<view class="item-text">
													<view class="number">昵称：{{item.nickname}}</view>
												</view>
												<!-- <view class="time">交易详情：{{item.level_name}}</view> -->
												<view class="tag">手机号：{{item.account}}</view>
											</view>

										</view>
										<image class="mem-right" src="../../static/img/right.png" mode=""></image>
									</view>
									<view class="wz_shu" v-if="wz_shu == 0">暂无数据~</view>
								</scroll-view>
							</view>
						</swiper-item>
					</swiper>
					<!-- <uni-load-more :status="status"></uni-load-more> -->
				</view>
			</view>

	</view>
</template>

<script>
	import service from '@/store/service.js';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {antiShake} from '@/store/rest.js'; //防抖
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				tabIndex: 0,
				info: [],
				mid: 0,
				num: '',
				avatar: '',
				nickname: "",
				mobile: '',
				level_name: "",
				nowmonth: 0,
				quarter: 0,
				nowyear: 0,
				teamList: [],
				isLoading: false,
				scroll: false,
				status: 0,
				last_page: 2,
				page: 1,
				pages: 1,
				limit: 5,
				wz_name: '',
				out: 0,
				keywords: '',
				_type: 1,
				wz_shu: '',
				credit2: '',
				today_income: '',
				superior: '',
				url: '',
				navList: [{
						text: '一级',
						state: '0'
					},
					{
						text: '二级',
						state: '1'
					}
				],
				img_index: []
			};
		},
		onLoad: function(e) {
			var self = this;

			self.$http.get(service.api.service.achieve, {
				'season': 'nowmonth'
			}).then(function(res) {
				if (res.code == 1) {
					res = res.data;
					self.nowmonth = res //.achievement;
				} else {
					self.$api.msg(res.msg);
				}
			});
			self.$http.get(service.api.service.achieve, {
				'season': 'quarter'
			}).then(function(res) {
				if (res.code == 1) {
					res = res.data;
					self.quarter = res //.achievement;
				} else {
					self.$api.msg(res.msg);
				}
			});
			self.$http.get(service.api.service.achieve, {
				'season': 'nowyear'
			}).then(function(res) {
				if (res.code == 1) {
					res = res.data;
					self.nowyear = res //.achievement;
				} else {
					self.$api.msg(res.msg);
				}
			});
			self.$http.post(service.api.main.user).then(function(res) {
				if (res.code == 1) {
					res = res.data;
					self.mid = res.id
					self.avatar = res.avatar;
					self.level_name = res.level_name;
					if (self.level_name == null) {
						self.level_name = '默认等级'
					}
					self.nickname = res.nickname;
					self.wz_name = res.name;
					self.credit2 = res.credit2;
					self.today_income = res.today_income;
					self.mobile = res.account;
					self.superior = res.superior;
					self.search();
				} else {
					self.$api.msg(res.msg);
				}
			});

		},
		// onReachBottom() {
		// 	if (this.keywords == '') {
		// 		this.loadHistory();
		// 	}
		// },

		methods: {
			
			search() {
				this.teamList = [];
				this.isLoading = false;
				this.scroll = false;
				this.status = 0;
				// this.pages = 1;
				// this.page = 0;
				this.out = 0;
				this.page = 1
				if (this.keywords == '') {
					this.loadHistory();
				} else {
					var self = this;
					self.$http.get(service.api.service.teamtwo, {
						mid: self.mid,
						mobile: self.keywords
					}).then(function(res) {
						if (res.code == 1) {
							self.teamList.push(res.data);
						} else {
							uni.showToast({
								icon: 'none',
								title: res.info
							});
						}
						self.status = 2;
					});
				}
			},
			//顶部tab点击
			tabClick(index) {
				this.change(index);
				var self = this;
				self.page = 1
				self.$http.get(service.api.service.team, {
					mid: self.mid,
					mobile: self.keywords,
					type: index + 1,
					page: self.page
				}).then(function(res) {
					if (res.code == 1) {
						var list = res.data.data;
						self.last_page = res.data.last_page
						console.log(self.last_page, 1234);
						if (list.length == 0) {
							self.wz_shu = 0
						} else {
							self.wz_shu = 1
						}
						self.teamList = []
						// self.teamList = list.concat(res.data)
						for (let i = 0; i < list.length; i++) {
							//将数据逐条写入数组
							self.teamList.push(list[i]);
						}
						// self.pages = res.data.last_page;
						// self.page = page;
						self.scroll = true;
						self.isLoading = false;
						self.out = 1;

						// if (list.total == 0) {
						// 	self.status = 3;
						// } else if (self.page == self.pages) {
						// 	self.status = 2;
						// } else {
						// 	self.status = 0;
						// }
					} else {
						uni.showToast({
							icon: 'none',
							title: res.info
						});
						self.status = 2;
					}
				});
			},
			// ab() {
			// 	this.loadHistory()
			// },
			change(type) {
				this.tabIndex = type;
				// this.loadHistory()
			},
			loadHistory() {
				var self = this;
				// if (self.isLoading) {
				// 	console.log(123);
				// 	return;
				// }
				// if (self.page < self.last_page) {
				console.log(1234);
				self.out = 0;
				self.isLoading = true;
				self.scroll = false;
				self.status = 1;
				// var page = self.page + 1;
				self.$http.get(service.api.service.team, {
					mid: self.mid,
					mobile: self.keywords,
					type: self.tabIndex + 1,
					page: self.page
				}).then(function(res) {
					if (res.code == 1) {
						var list = res.data.data;
						self.last_page = res.data.last_page
						if (self.page <= self.last_page) {
							self.teamList = self.teamList.concat(list);
						}
						if (list.length == 0) {
							self.wz_shu = 0
						} else {
							self.wz_shu = 1
						}
						console.log(self.wz_shu);

						// self.pages = res.data.last_page;
						// self.page = page;
						self.scroll = true;
						self.isLoading = false;
						self.out = 1;

						// if (list.total == 0) {
						// 	self.status = 3;
						// } else if (self.page == self.pages) {
						// 	self.status = 2;
						// } else {
						// 	self.status = 0;
						// }
					} else {
						uni.showToast({
							icon: 'none',
							title: res.info
						});
						self.status = 2;
					}
				});
				// } else {
				// 	self.status = 2;
				// }
			},
			jump(url) {
				uni.navigateTo({
					url: url
				})
			},
			vip_tap(id, tabIndex) {
				// console.log(id,tabIndex+1);
				var tpye = tabIndex + 1
				uni.navigateTo({
					url: '/pages/order/entrust?id=' + id + '&type=' + tpye
				})
			},
			changeTab(e) {
				this.tabClick(e.target.current);
			},

			tapTab(index, id) {
				this.tabid = id;
				if (this.tabIndex == index) {
					this.isClickChange = true;
					this.tabIndex = index;
				}
			},
			scrolltolower:antiShake(function(){
				var self = this;
				if (self.page < self.last_page) {
					self.page = self.page + 1
					self.loadHistory()
				} else {
					uni.showToast({
						title: '没有数据了',
						duration: 2000,
						icon: 'none'
					});
				}
			})

		}
		// getTeams() {
		// 	var self = this;
		// 	self.$http
		// 		.get(service.api.user.getMyTeam, {
		// 			// goodsid: self.id
		// 		})
		// 		.then(function(res) {
		// 			var list = res.data;
		// 			self.num=list
		// 			self.info = list.info;
		// 			console.log(self.num,66);
		// 			// self.navList[0].text = '直推('+self.num.direct+')'
		// 			self.navList[1].text = ''
		// 			self.navList[1].text = ''
		// 		});
		// },

	};
</script>

<style lang="scss" scoped>
	page {
		background: #FFFFFF;
	}

	/deep/uni-swiper .uni-swiper-wrapper {
		overflow: inherit;
	}

	/deep/uni-swiper-item {
		overflow: inherit;
	}

	// .swiper-item:last-child {
	// 	margin-bottom: 50rpx;
	// }

	.bg-img {
		position: relative;
		width: 100%;
		height: 350upx;
		background: url(../../static/user/team.png) no-repeat;
		background-size: 100% 100%;
		border-bottom: 2upx solid #F4F4F4;
	}

	.bg {
		display: flex;
		padding: 20upx 30upx 0;
	}

	.icon {
		width: 105upx;
		height: 105upx;
		border-radius: 54upx;
		margin: 25upx 20upx 0 25upx;
	}

	.wz_shu {
		width: 100%;
		text-align: center;
		padding-top: 200rpx;
		font-size: 30rpx;
	}

	.text {
		width: calc(100% - 170upx);
		margin-left: 20upx;
		margin-top: 30upx;
	}

	.name {
		font-weight: bold;
		color: #fff;
		font-size: 30upx;

		text {
			margin-left: 30upx;
			height: 50upx;
			font-size: 26upx;
			padding: 4upx 20upx;
			line-height: 50upx;
			background: #ffc000;
			border-radius: 26upx;
		}
	}

	.grade {
		color: #FFFFFF;
		font-size: 26upx;
	}

	.order-item {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.order-text {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #fff;
		margin-top: 30upx;
	}

	.num {
		font-size: 36upx;
		font-weight: bold;
	}

	.order {
		font-size: 24upx;
	}

	.navbar {
		background-color: #FFFFFF;
		display: flex;
		// height: 56px;
		// padding: 0 5px;
		justify-content: space-between;
		// box-shadow: 0px 4upx 8upx #dcdfe6;
		position: relative;
		// width: 100%;
		z-index: 200;
		padding: 28upx;

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
			border-radius: 50upx;
			margin: 0 106upx;
			padding: 10rpx;

			&.current {
				color: #fff;
				background: #ff594d;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 50px;
					height: 0;
					/* border-bottom: 2px solid #fa436a; */
					// border-bottom: 2px solid #e99040;
				}
			}
		}
	}

	.center {
		width: 100%;
		height: 63%;
		z-index: 120;
		overflow: auto;
		border-radius: 18rpx;
		position: absolute;
		margin-bottom: 90rpx;
	}

	.swiper-box {
		height: 100%;
	}

	.list-scroll-content {
		height: calc(100vh - 680rpx);
		overflow: auto;
	}

	.head-center {
		top: 0;
		width: 90%;
		z-index: 500;
		padding: 0 5%;
		position: fixed;
		font-size: 32upx;
		font-weight: 700;
		overflow: hidden;
		text-align: center;
		background: #FFFFFF;
		white-space: nowrap;
		text-overflow: ellipsis;
		border-bottom: 2upx solid #F2F2F2;
	}

	.heades {
		width: 100%;
		height: calc(var(--status-bar-height) + 86upx);
	}

	.head-search {
		width: 95%;
		height: 60upx;
		display: flex;
		margin: 12upx auto;
		background: #ffffff;
		border-radius: 30upx;
		border: 2upx solid #999999;
	}

	.search-icon {
		margin: 6upx 0 6upx 10upx;
	}

	.search-btn {
		padding: 0 20upx;
		line-height: 48upx;
		margin: 6upx 10upx 6upx 0;
	}

	.search-input {
		height: 48upx;
		margin: 6upx 0;
		color: #999999;
		padding: 0 16upx;
		text-align: left;
		font-size: 28upx;
		line-height: 48upx;
		background: #ffffff;
		width: calc(100% - 196upx);
	}

	.search-btn {
		color: #999999;
		font-size: 28upx;
		background: #FFFFFF;
		border-radius: 0 10upx 10upx 0;
	}

	.consume-item:nth-last-child(1) {
		border-bottom: none;
	}

	.consume-item {
		background-color: #fff;
		display: flex;
		position: relative;
		justify-content: space-between;
		padding: 28upx 22upx 22upx;
		border-bottom: 1px solid #f4f4f4;
		margin: 0 20upx;
		border-radius: 10upx;

		.mem-right {
			width: 36rpx;
			height: 50rpx;
			position: absolute;
			right: 0rpx;
			top: 40rpx;
		}
	}

	.item-left {
		display: flex;
	}

	.item-text {
		display: flex;
		align-items: center;
	}

	.number {
		font-size: 26upx;
		color: #666;
	}

	.tag {
		// border: 1px solid #ffb463;
		border-radius: 17upx;
		// width: 86upx;
		height: 34upx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: red;
		font-size: 22upx;
		margin-top: 10upx;
	}

	.time {
		color: #999;
		font-size: 24upx;
		font-weight: 500;
	}

	.price {
		display: flex;
		align-items: center;
		color: #333;
		font-size: 26upx;
	}

	.money {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		color: #e99040;
	}
</style>
