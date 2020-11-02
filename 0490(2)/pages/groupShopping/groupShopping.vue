<template>
	<view class="container">
		<!-- 搜索框 -->
		<view class="search-section">
			<view class="search-input u-f-ajc">
				<uni-icons type="search" color="#999999" size="20"></uni-icons>
				<text>请输入您喜欢的商品</text>
			</view>
		</view>

		<!-- 轮播图 -->
		<view class="swiper-section">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-active-color="#fff">
				<swiper-item v-for="(item, index) in swiper" :key="index">
					<view class="swiper-item"><image :src="item.thumb" mode=""></image></view>
				</swiper-item>
				<!-- <swiper-item>
					<view class="swiper-item"><image src="/static/img/banner.png" mode=""></image></view>
				</swiper-item> -->
			</swiper>
		</view>

		<!-- 千元团购 -->
		<view class="group-section" v-for="(item, index) in groudTitle" :key="index">
			<view class="group-header u-f-jsb" >
				<view class="title">{{ item.name }}</view>
				<view class="sub-title u-f1">{{ item.description }}</view>
				<image src="/static/img/more.png" mode="" @click="$router.push('/pages/hundred/hundred')"></image>
			</view>
			<view class="list">
				<view class="product" v-for="(it, idx) in item.merge_goods" :key="idx" @click="jump('/pages/hundred/commodity?goodsid='+it.id,it.id)">
					<view class="shop_image">
						<image :src="it.thumb" mode="widthFix"></image>
						<!-- <view class="label">千元团</view> -->
					</view>
					<view class="commodity">
						<view class="t1">{{ it.title }}</view>
						<view class="l_price">
							<view>
								<text class="t4">
									<text class="t5">￥</text>
									{{ it.groupsprice }}
								</text>
							</view>
							<text class="t2">￥{{ it.price }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 百元团购 -->
		<!-- <view class="group-section">
			<view class="group-header u-f-jsb">
				<view class="title">尊享百元拼团购</view>
				<view class="sub-title u-f1">好货一起拼，抢到就是赚钱</view>
				<image src="/static/img/more.png" mode="" @click="$router.push('/pages/hundred/hundred')"></image>
			</view>
			<view class="list">
				<view class="product" v-for="item in 4" @click="jump('/pages/hundred/commodity')">
					<view class="shop_image">
						<image src="../../static/img/points/pic.png" mode="widthFix"></image>
						<view class="label">百元团</view>
					</view>
					<view class="commodity">
						<view class="t1">日本大米原装进口樱花大米2kg*2袋组合装...</view>
						<view class="l_price">
							<view>
								<text class="t4">
									<text class="t5">￥</text>
									1296
								</text>
							</view>
							<text class="t2">￥2999</text>
						</view>
					</view>
				</view>
			</view>
		</view> -->
		<view class="goods-section"><uni-load-more :status="status"></uni-load-more></view>

		<!-- #ifndef APP-PLUS -->
		<tabbar :current-page="0"></tabbar>
		<!-- #endif -->
	</view>
</template>

<script>
import service from '@/store/service.js';
import uicons from '@/components/uni-icons/uni-icons.vue';
import uLodemore from '@/components/uni-load-more/uni-load-more.vue';

export default {
	components: { uicons, uLodemore },
	data() {
		return {
			// 千元购
			status: 'noMore',
			swiper: [],
			groudList: [],
			groudTitle: []
		};
	},
	onLoad: function() {
		this.getSwiper();
		this.getGroupList();
	},
	methods: {
		jump(url,id) {
			uni.navigateTo({
				url: url
			});
		},
		getSwiper() {
			var self = this;
			self.$http.get(service.api.main.swiperList, {}).then(function(res) {
				console.log(res);

				var list = res.data;
				self.swiper = list;
			});
		},
		getGroupList() {
			var self = this;
			self.$http.get(service.api.group.groupList, {}).then(function(res) {
				// console.log(res.data.categroy);

				var list = res.data.categroy;
				self.groudTitle = list;
				self.groudTitle.forEach(function(e) {
					// console.log(element,333);
					// console.log(e.merge_goods);
					self.groudList = e.merge_goods;
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.list {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	// padding: 10upx 20upx 0 20upx;
	box-sizing: border-box;
	border-radius: 10upx;

	.product {
		margin: 10rpx;
		box-sizing: border-box;
		width: calc(50% - 20upx);
		background: rgba(255, 255, 255, 1);
		border-radius: 10px;

		.name {
			font-size: 23upx;
			margin: 8rpx 0;
			color: #333333;
			font-weight: bold;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}

		.commodity {
			padding: 0 10upx;

			// display: flex;
			.t1 {
				height: 90rpx;
				font-size: 26rpx;
				color: #333333;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				// text-align: center;
			}

			.l_price {
				display: flex;
				align-items: center;
				// justify-content: space-between;
				// justify-content: space-around;
				// text-align: center;
				margin: 20rpx 0;

				.t2 {
					font-size: 20rpx;
					color: #b7b7b7;
					text-decoration: line-through;
					margin-left: 20upx;
				}

				.t4 {
					color: #e78c3a;
					font-weight: bold;
					font-size: 36upx;
				}

				.t5 {
					color: #e78c3a;
					font-size: 26upx;
				}

				.t3 {
					color: #ffd200;
					font-size: 24rpx;
				}

				image {
					width: 24rpx;
					height: 24rpx;
				}

				.card {
					// float: right;
					// width: 40upx;
					height: 40upx;
					margin-right: 20upx;
				}
			}
		}
	}
}
.shop_image {
	width: 100%;
	height: 330rpx;
	overflow: hidden;
	position: relative;

	.label {
		position: absolute;
		top: 0;
		left: 0;
		background: linear-gradient(90deg, rgba(233, 140, 35, 1), rgba(246, 183, 63, 1));
		border-radius: 10upx 0upx 20upx 0upx;
		width: 138upx;
		height: 46upx;
		line-height: 46upx;
		text-align: center;
		color: #ffffff;
	}
}

image {
	width: 100%;
	border-radius: 10upx 10upx 0px 0px;
	// height: 341upx;
	// margin: 10upx 10upx 0 10upx;
}

.container {
	background-color: $uni-bg-color;

	.search-section {
		width: 100vw;
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
		width: 100vw;
		height: 330rpx;
		padding: 0 20rpx;
		swiper {
			height: 330rpx;
		}
		.swiper-item {
			width: 710rpx;
			height: 330rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.menu-section {
		margin: 30rpx 0;
		.menu-item {
			image {
				width: 78rpx;
				height: 78rpx;
			}
		}
	}

	.notice-section {
		padding: 20rpx;
		.notice {
			width: 710rpx;
			height: 66rpx;
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
				background-color: #c3c3c3;
				margin: 0 15rpx;
			}

			.content {
				color: $uni-text-color;
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
						width: 84rpx;
						height: 36rpx;
						font-size: 20rpx;
						line-height: 36rpx;
						text-align: center;
						border-radius: 18rpx;
						background: linear-gradient(90deg, rgba(255, 138, 102, 1), rgba(253, 53, 29, 1));
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
				}
			}
		}
	}

	.goods-section {
		background-color: #f3f3f3;
		padding: 0 20rpx 150rpx;

		.goods-header {
			color: #262626;
			font-size: 34rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
		}

		.goods-list {
			margin-bottom: 50rpx;
			.goods-item {
				width: 345rpx;
				background-color: #ffffff;
				margin-bottom: 20rpx;

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
					padding: 14rpx 30rpx;
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
			}
		}
	}
}
</style>
