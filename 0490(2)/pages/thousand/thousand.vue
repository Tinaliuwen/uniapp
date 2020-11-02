<template>
	<view class="thousand">
		<view class="navbar">
			<view class="nav-box">
				<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabIndex === index }"
				 @click="tabClick(index)">{{ item.text }}</view>
			</view>

		</view>

		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<!-- 新品 -->
			<swiper-item class="tab-content">
				<scroll-view class="list-scroll-content" scroll-y>

					<!-- 轮播图 -->
					<view class="swiper-section">
						<swiper :indicator-dots="true" :autoplay="false" :interval="3000" :duration="1000" indicator-active-color="#fff">
							<swiper-item>
								<view class="swiper-item">
									<image src="/static/img/banner.png" mode=""></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item">
									<image src="/static/img/banner.png" mode=""></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item">
									<image src="/static/img/points/banner.png" mode=""></image>
								</view>
							</swiper-item>
						</swiper>


					</view>

					<view class="type">
						<view class="synthesize active">
							综合
						</view>
						<view class="count">
							销量
						</view>
						<view class="price">
							价格<image src="/static/img/updown.png" mode=""></image>
						</view>
						<view class="screen" @click="screening = !screening">
							筛选<image src="/static/img/screen.png" mode=""></image>
						</view>
					</view>

					<view class="list">
						<view class="product" v-for="item in 5">
							<view class="shop_image">
								<image src="../../static/img/points/pic.png" mode="widthFix"></image>
								<view class="label">
									千元团
								</view>
							</view>
							<view class="commodity">
								<view class="t1">日本大米原装进口樱花大米2kg*2袋组合装...</view>
								<view class="l_price">
									<view><text class="t4"><text class="t5">￥</text>1296</text>
										<!-- <text class="t5">积分</text> -->
									</view>
									<text class="t2">￥2999</text>
								</view>
							</view>
						</view>
						<view class="more">
							没有更多的数据了~
						</view>
					</view>

				</scroll-view>
			</swiper-item>
			<!-- 平价包邮 -->
			<swiper-item class="tab-content">
				<scroll-view class="list-scroll-content" scroll-y>

				</scroll-view>
			</swiper-item>
			<!-- 今日特惠 -->
			<swiper-item class="tab-content">
				<scroll-view class="list-scroll-content" scroll-y>



				</scroll-view>
			</swiper-item>
			<!-- 健康杂粮 -->
			<swiper-item class="tab-content">
				<scroll-view class="list-scroll-content" scroll-y>

				</scroll-view>
			</swiper-item>
			<!-- 精选好油 -->
			<swiper-item class="tab-content">
				<scroll-view class="list-scroll-content" scroll-y>

				</scroll-view>
			</swiper-item>
		</swiper>


		<!-- 筛选块 -->
		<view class="screen-box" v-if="screening" @click.self="screening = !screening">
			<view class="box">
				<view class="classify title">
					分类
				</view>
				<view class="classify-type">
					<view class="classify-box" v-for="(item,index) in navList" :key='index'>
						{{item.text}}
					</view>
				</view>
				<view class="price title">
					价格区间（元）
				</view>
				<view class="section">
					<view class="">
						最低价
					</view>
					<view class="">
						最高价
					</view>
				</view>
				<view class="btn">
					<view class="">
						重置
					</view>
					<view class="">
						完成
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
				cancelOrder: false,
				screening: false,
				navList: [{
						text: '新品尝鲜',
						state: '0'
					},
					{
						text: '平价包邮',
						state: '1'
					},
					{
						text: '今日特惠',
						state: '2'
					},
					{
						text: '健康杂粮',
						state: '3'
					},
					{
						text: '精选好油',
						state: '4'
					},
					{
						text: '优质大米',
						state: '5'
					}
				]

			};
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
				this.tabIndex = index
			}

		}
	};
</script>

<style lang="scss" scoped>
	page {
		height: 100%;

		.thousand {
			height: 100%;
			position: fixed;
			z-index: 100;
			width: 100%;
		}
	}

	.swiper-box {
		height: 100%;
		padding-top: 80upx;
		box-sizing: border-box;
	}

	.swiper-section {
		width: 100vw;
		height: 330rpx;
		padding-top: 40rpx;
		background-color: #ffffff;

		// padding: 0 20rpx;
		swiper {
			height: 330rpx;
		}

		.swiper-item {
			width: 100vw;
			height: 330rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	uni-swiper-item {
		overflow: auto;
	}

	.navbar {
		width: 100%;
		display: flex;
		height: 40px;
		padding: 0px 5px 10px 5px;
		background: #ffffff;
		position: fixed;
		top: 88upx;
		z-index: 200;
		overflow-x: auto;

		.nav-box {
			overflow-x: auto;
			display: flex;
			overflow-y: hidden;

			&::-webkit-scrollbar {
				display: none
			}
		}


		.nav-item {
			// flex: 1;
			width: 120upx;
			display: flex;
			justify-content: center;
			align-items: center;
			white-space: nowrap;
			height: 100%;
			font-size: 15px;
			color: #303133;
			position: relative;
			padding: 0 20upx;

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

	.type {
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: #ffffff;
		padding: 24rpx 0;
		font-size: 24upx;
		color: #999999;

		.active {
			color: #E41D18;
		}

		.price {
			image {
				width: 14rpx;
				height: 20rpx;
				margin-left: 4rpx;
			}
		}

		.screen {
			image {
				width: 24rpx;
				height: 24rpx;
				vertical-align: middle;
				margin-left: 4rpx;
			}
		}

	}

	.list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		padding: 10upx 20upx 0 20upx;
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
						color: #B7B7B7;
						text-decoration: line-through;
						margin-left: 20upx;
					}

					.t4 {
						color: #E78C3A;
						font-weight: bold;
						font-size: 36upx;
					}

					.t5 {
						color: #E78C3A;
						font-size: 26upx;
					}

					.t3 {
						color: #FFD200;
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
		}

		.more {
			width: 100vw;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			font-size: 24upx;
			color: #666666;
		}
	}

	.screen-box {
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;

		.box {
			float: right;
			width: 80%;
			height: 100vh;
			background-color: #ffffff;



			.classify-type {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-wrap: wrap;
				padding: 0 20upx;

				.classify-box {
					width: 174upx;
					height: 82upx;
					line-height: 82upx;
					text-align: center;
					border-radius: 6upx;
					background-color: #F0F0F0;
					font-size: 24upx;
					margin-top: 20upx;
				}
			}

			.section {
				height: 92upx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin: 0 20upx;
				background-color: #F4F4F4;

				&>view {
					width: 240upx;
					height: 60upx;
					line-height: 60upx;
					text-align: center;
					background-color: #ffffff;
					color: #999999;
					font-size: 24upx;
				}

			}

			.btn {
				width: 80%;
				height: 78upx;
				display: flex;
				position: absolute;
				bottom: 0;
				right: 0;

				&>view {
					flex: 1;
					line-height: 78upx;
					text-align: center;
					color: #ffffff;
					font-size: 32upx;

					&:nth-child(1) {
						background: linear-gradient(90deg, rgba(244, 199, 69, 1), rgba(239, 156, 47, 1));
					}

					&:nth-child(2) {
						background: linear-gradient(90deg, rgba(235, 98, 44, 1), rgba(236, 122, 49, 1));
					}
				}
			}
		}
	}



	.title {
		color: #666666;
		font-size: 24upx;
		padding: 20upx 20upx;
	}

	.classify {
		padding: 40upx 20upx 0 20upx;
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
