<template>
	<view class="container" v-if="apptype == 1">
		<!-- 轮播图 -->
		<view class="swiper-section">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-active-color="#fff">
				<swiper-item v-for="item in swiper" :key="item.id">
					<a class="swiper-item" :href="item.url">
						<image :src="item.img" mode=""></image>
					</a>
				</swiper-item>
			</swiper>
		</view>

		<!-- 	<view class="security">
			<view class="box" v-for="item in security" :key="item">
				<image src="/static/user/security.png" mode="widthFix"></image>
				{{item}}
			</view>
		</view> -->

		<!-- 头条 -->
		<view class="notice-section">
			<u-notice-bar mode="horizontal" type="none" ref='sd' @click="notice_click" index :duration='3000' bg-color='rgb(237, 237, 237)'
			 :is-circular="false" :list="list"></u-notice-bar>
		</view>
		<!-- <navigator url="/pages/main/gift">1465465</navigator> -->
		<!-- <a href="alipayqr://platformapi/startapp?saId=10000007" >asdadasd</a> -->
		<!-- 菜单 -->
		<view class="menu-section u-f-jsb">
			<view class="menu-item u-f1 u-f-jsb u-f-column" v-for="(mItem, mIndex) in menu_list" :key="mIndex" @click="jump(mItem.path)">
				<image :src="mItem.icon" mode=""></image>
				<view :class="'text_name_'+mIndex">{{ mItem.name }}</view>
			</view>
		</view>

		<!-- 精选商品 -->
		<view class="goods-section">
			<!-- <view class="goods-header">作品展示</view> -->
			<view class="goods-list u-f-jsb u-f-fw">
				<!-- <view class="goods-item" @click="jump(`/pages/category/commodity?id=${item.id}`)" v-for="(item,index) in goodsCate" -->
				<view class="goods-item" v-for="(item,index) in goodsCate" :key="index">
					<image :src="item.img" mode=""></image>
					<!-- <view class="title u-line-clamp">{{item.title}}</view> -->
					<!-- <view class="price u-f-ac">
						￥{{item.price_market}}
						<text>￥{{item.price_cost}}</text>
					</view>
 -->
					<!-- <view class="wz_img" v-for="(it,imgindex) in img_index" :key='imgindex' v-if="img_index[imgindex] == index">
						<image src="../../static/img/null.png" mode=""></image>
					</view> -->

				</view>
			</view>
		</view>
		<!-- 新人区 -->
		<!-- <view class="goods-section">
			<view class="goods-header">新人区</view>
			<view class="goods-list u-f-jsb u-f-fw">
				<view class="goods-item" @click="jump(`/pages/category/commodity?id=${item.id}`)" v-for="(item,index) in goodsCate" :key="index">
					<image :src="item.logo" mode=""></image>
					<view class="title u-line-clamp">{{item.title}}</view>
					<view class="price u-f-ac">
						￥{{item.price_market}}
						<text>￥{{item.price_cost}}</text>
					</view>
				</view>
			</view>
		</view> -->
		<!-- 拍卖区 -->
		<view class="goods-section" v-show="false">
			<view class="goods-header">拍卖区</view>
			<view class="goods-list u-f-jsb u-f-fw">
				<view class="goods-item" @click="jump(`/pages/category/commodity?id=${item.id}`)" v-for="(item,index) in goodPai"
				 :key="index">
					<image :src="item.logo" mode=""></image>
					<view class="title u-line-clamp">{{item.title}}</view>
					<view class="price u-f-ac">
						￥{{item.price_market}}
						<text>￥{{item.price_cost}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 捡漏区 -->
		<view class="goods-section" v-if="this.detection == 1" v-show="false">
			<view class="goods-header">捡漏区</view>
			<view class="goods-list u-f-jsb u-f-fw">
				<view class="goods-item" @click="jump(`/pages/category/commodity?id=${item.id}`)" v-for="(item,index) in goodJian"
				 :key="index">
					<image :src="item.logo" mode=""></image>
					<view class="title u-line-clamp">{{item.title}}</view>
					<view class="price u-f-ac">
						￥{{item.price_market}}
						<text>￥{{item.price_cost}}</text>
					</view>
				</view>
			</view>

			<!-- <uni-load-more :status="status"></uni-load-more> -->
		</view>
		<u-modal v-model="show" @confirm="wz_ok()" confirm-text='我知道了'title='温馨提示' :title-style="{color: '#242424','font-size':'44rpx'}" confirm-color='#FF594D' :content="content"></u-modal>
	</view>
</template>

<script>
	import service from '@/store/service.js';
	import uicons from '@/components/uni-icons/uni-icons.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';

	export default {
		components: {
			uicons,
			uniLoadMore
		},
		data() {
			return {
				security: ['正品保证', '全场包邮', '中国人保承保产品'],
				// 千元购
				status: 0,
				keywords: '',
				swiper: [],
				groudList: [],
				groudTitle: [],
				goodsCate: [],
				goodPai: [],
				goodJian: [],
				urltype: 0,
				detection: 0, //是否捡漏区
				newple: 0, //是否新人区
				title: '',
				apptype: 0,
				img_null: 0,
				img_index: [],
				// 菜单列表
				menu_list: [{
						icon: '/static/icon/shou1.png',
						name: '新人活动区',
						path: '/pages/newPeople/newpeople'
					},
					{
						icon: '/static/icon/shou2.png',
						name: '商城',
						path: '/pages/newPeople/auction'
					},
					{
						icon: '/static/icon/shou3.png',
						name: '名家展示',
						path: '/pages/newPeople/leakDetection'
					},
				],
				list: [
					'未填公告标题',

				],
				list_id: [],
				avatar:'',
				show: false,
				content: '请先完善收款信息'
			};
		},
		onLoad: function(e) {
			var self = this;

			if (e.icode) {
				self.icode = e.icode;
				uni.setStorageSync('icode', self.icode);
			}
			self.$http.member.info().then(info => {
				self.getGroupList();
			});
			self.$http.get(service.api.main.user).then(function(res) {
				if (res.code == 1) {
					self.avatar = res.data.alipay_account;
					if(self.avatar == ''){
						self.show = true;
					}
				} else {
					self.$api.msg(res.info);
				}
			});
			// uni.startPullDownRefresh();

		},
		onShow: function() {
			var self = this;
			//if(self.urltype == 1){
			var type = uni.getStorageSync('type');
			self.login(type);
			//}
		},
		onPullDownRefresh() {
			var self = this;
			// self.$http.member.info().then(info => {
			self.getGroupList();
			// });
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			login(type) {
				var self = this;
				service.upload(this, service.api.service.member, {}, 'POST', '', '', function(self, res) {
					if (res.code == 1) {
						self.apptype = 1;
						self.urltype = 1;
						self.getSwiper();
						self.getGoodsCate();
					} else {
						if (type == 2) {
							self.apptype = 0;
							self.$http.member.info().then(info => {
								self.urltype = 1;
								self.getSwiper();
								self.getGoodsCate();
								// self.getGoodsCate();
							});
						} else {
							uni.reLaunch({
								url: '/pages/login/login'
							})

						}
					}
				});

			},
			//跳转收款
			wz_ok(){
				uni.navigateTo({
					url: '/pages/main/distribution'
				});
			},
			notice_click(e) {
				var self = this;
				console.log(e);
				self.list_id.forEach(it => {
					if (e == it.index) {
						console.log(it.id);
						uni.navigateTo({
							url: '/pages/index/notice?id=' + it.id
						});
					}
				})

			},
			banner(url) {
				var url_ = url;
				if (url_ != "") {
					console.log(1);
					window.location.href = url_
				}

			},
			jump(url, id) {
				if (url == ' ') {
					uni.showToast({
						icon: 'none',
						title: '未开启',
						duration: 1500
					});
				}
				uni.navigateTo({
					url: url
				});
			},
			getSwiper() {
				var self = this;
				self.$http.get(service.api.main.swiper, {}).then(function(res) {

					var list = res.data;
					self.swiper = list;
				});
				self.$http.get(service.api.service.service).then(function(res) {
					if (res.code == 1) {
						self.title = res.data.notice_title
					} else {
						self.$api.msg(res.info);
					}
				});
			},
			getGroupList() {
				var self = this;
				var s = [];
				var id = [];
				self.$http.post(service.api.main.getNoticestail).then(function(res) {
					if (res.code == 1) {
						res.data.forEach((it, index) => {
							// console.log(index)
							var id_list = {
								'index': index,
								'id': it.id
							}
							id.push(id_list)
							s.push(it.title)
						})
						self.list = s
						self.list_id = id
					} else {
						self.$api.msg('请先登录');
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}, 1500);
					}
				});
			},
			getGoodsCate() {
				var self = this;
				self.$http.get(service.api.main.Leaarea, {
					type: 3
				}).then(function(res) {
					self.detection = res.data.leaarea
					self.newple = res.data.switchs
					if (self.detection == 0) {
						self.menu_list[2].path = ' '
					}
					if (self.newple == 0) {
						self.menu_list[0].path = ' '
					}
				})
				self.$http.get(service.api.order.getWorkslogo, {
					type: 3
				}).then(function(res) {
					// console.log(res.data,123);
					// self.img_index = [];
					self.goodsCate = res.data
					// self.goodsCate.forEach((it, index) => {
					// 	if (it.number_stock == 0) {
					// 		self.img_null = 0;
					// 		self.img_index.push(index)
					// 	}
					// })
					// console.log(self.img_index);

				})


				// self.$http.get(service.api.main.goodhotList, {
				// 	type: 3
				// }).then(function(res) {
				// 	// console.log(res.data.data,123);
				// 	self.img_index = [];
				// 	self.goodsCate = res.data.data
				// 	self.goodsCate.forEach((it, index) => {
				// 		if (it.number_stock == 0) {
				// 			self.img_null = 0;
				// 			self.img_index.push(index)
				// 		}
				// 	})
				// 	console.log(self.img_index);

				// })

				self.$http.get(service.api.main.goodsList, {
					type: 3
				}).then(function(res) {
					if (res.code == 1) {
						var list = res.data.data;
						self.goodPai = list
					} else {
						self.$api.msg(res.info);
					}
					// list.data.forEach(item =>{
					// 	if(item.is_leakarea == 1){
					// 		self.goodPai.push(item);
					// 	}else if (item.is_leakarea == 0){
					// 		self.goodJian.push(item);
					// 	}
					// })
				});
				self.$http.get(service.api.main.getGoodLouList, {
					type: 3
				}).then(function(res) {
					if (res.code == 1) {
						var list = res.data.data;
						self.goodJian = list
					} else {
						self.$api.msg(res.info);
					}
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background: #F2F2F2;
	}

	/deep/.u-news-item {
		width: 100%;
	}

	/deep/uni-tabbar {
		display: block !important;
	}

	.container {
		background-color: #F2F2F2;

		.search-section {
			background: #FFFFFF;
			/* width: 100vw; */
			padding: 30rpx;

			.search-input {
				width: 690rpx;
				height: 66rpx;
				background-color: #f1f1f1;
				border-radius: 33rpx;

				text {
					margin-left: 10rpx;
					color: $uni-text-color-grey;
				}
			}
		}

		.swiper-section {
			background: #FFFFFF;

			/* width: 100vw; */
			height: 360rpx;
			padding: 20upx 20rpx 0;

			swiper {
				height: 330rpx;
			}

			.swiper-item {
				width: 710rpx;
				height: 330rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 10upx;
				}
			}
		}

		.menu-section {
			background: #fff;
			padding: 20rpx 0rpx;
			margin-bottom: 20rpx;

			.menu-item {
				flex: 1;

				image {
					width: 100rpx;
					height: 100rpx;
				}
			}

			// .text_name_0 {
			// 	width: 140rpx;
			// }
			// .text_name_2 {
			// 	width: 112rpx;
			// }

		}

		.notice-section {
			background: #FFFFFF;
			padding: 20rpx;
			padding-top: 40rpx;

			.notice {
				width: 710rpx;
				height: 80rpx;
				border-radius: 33rpx;

				background-color: #f4f4f4;

				image {
					width: 121rpx;
					height: 32rpx;
					padding-left: 20rpx;
				}

				.line {
					width: 2rpx;
					height: 30rpx;
					margin: 0 15rpx;
					background-color: #c3c3c3;
				}

				.content {
					color: $uni-text-color;

					width: calc(100% - 150upx);
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					font-weight: bold;
				}
			}
		}

		.group-section {
			padding: 20rpx;
			border-bottom: 20rpx solid #f3f3f3;

			.group-header {
				.title {
					font-size: 32rpx;
					font-weight: bold;
					color: #000;
				}

				.sub-title {
					font-size: 22rpx;
					color: #999;
					margin-left: 20rpx;
				}

				image {
					width: 94rpx;
					height: 26rpx;
				}
			}

			.group-content {
				.group-item {
					width: 225rpx;

					image {
						width: 100%;
						height: 225rpx;
						margin: 20rpx 0 10rpx;
					}

					.content {
						box-sizing: border-box;
						width: 224rpx;
						height: 47rpx;
						padding: 0 10rpx;
						background: linear-gradient(90deg, rgba(255, 89, 77, 1), rgba(255, 99, 51, 1));
						border-radius: 0px 0px 18rpx 18rpx;

						.label {
							width: 88rpx;
							height: 36rpx;
							font-size: 20rpx;
							line-height: 36rpx;
							text-align: center;
							text-decoration: line-through;
							// border-radius: 18rpx;
							// background: linear-gradient(90deg, rgba(255, 138, 102, 1), rgba(253, 53, 29, 1));
						}

						.price,
						.label {
							color: #ffffff;
						}

						.label {
							font-size: 26rpx;
						}
					}

					.name {
						width: 224rpx;
						margin-top: 10rpx;
						// text-align: center;
					}
				}
			}
		}

		.goods-section {
			background-color: #f3f3f3;
			padding: 0 20rpx 30rpx;

			.goods-header {
				color: #262626;
				font-size: 34rpx;
				font-weight: bold;
				margin-bottom: 20rpx;
			}

			.goods-list {

				/* margin-bottom: 50rpx; */
				.goods-item {
					width: 100%;
					height: 330rpx;
					// background-color: #ffffff;
					// margin-bottom: 20rpx;
					position: relative;

					image {
						width: 100%;
						height: 330rpx;
					}

					.title {
						padding: 10rpx 30rpx 0;
						font-size: 26rpx;
						color: $uni-text-color;
						font-weight: bold;
						line-height: 1.4;
					}

					.price {
						padding: 14rpx 22rpx;
						font-size: 36rpx;
						font-weight: bold;
						color: #ff594d;

						text {
							font-size: 20rpx;
							color: #999;
							text-decoration: line-through;
							margin-left: 15rpx;
						}
					}

					.wz_img {
						position: absolute;
						top: 64rpx;
						left: 64rpx;
						width: 210rpx;
						height: 210rpx;

						uni-image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
	}

	.security {
		background: #FFFFFF;
		display: flex;
		padding-top: 20upx;

		.box {
			/* width: 30%; */
			display: flex;
			font-size: 26upx;
			padding: 0 24upx;
			line-height: 50upx;

			image {
				width: 50upx;
				height: 50upx;
				margin-right: 10upx;
			}
		}
	}
</style>
