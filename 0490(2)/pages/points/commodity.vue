<template>
	<view class="commodity">
		<!-- 轮播图 -->
		<view class="swiper-section">
			<swiper :indicator-dots="true" :autoplay="false" :interval="3000" :duration="1000" indicator-active-color="#fff">
				<swiper-item>
					<view class="swiper-item">
						<image src="/static/img/up_bg.png" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="/static/img/up_bg.png" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="/static/img/up_bg.png" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="commodity-info">
			<view class="info-top">
				<view class="title-box">
					<view class="title">
						柴火大院 柴火长粒香米 东北大米
						当季新米 东北大米 当季新米
					</view>
					<view class="share">
						<image src="../../static/img/share.png" mode=""></image>
					</view>
				</view>
				<view class="subhead">
					吃大米就选优质东北大米，做十月稻田会员
					享吃免费大米一年份权益！

				</view>
				<view class="price">
					<text>1299.00</text>
					<text>积分</text>
					<text>￥1600.00</text>
				</view>
				<view class="count">
					<view>
						已售1091件
					</view>
					<view>
						库存35件
					</view>
				</view>
			</view>
			<view class="info-intro">
				<view class="type" @click="openType">
					<view>
						<text>规格</text>
						<text>当季香米5kg</text>
					</view>
					<view class="img">
						<image src="../../static/icon/right.png" mode=""></image>
					</view>
				</view>
				<view class="type">
					<view>
						<text>服务</text>
						<text>极速退款 <b style="margin:0 18rpx">·</b> 7天退换货 <b style="margin:0 18rpx">·</b> 48小时发货</text>
					</view>
				</view>
				<view class="type">
					<view>
						<text>运费</text>
						<text>全场包邮</text>
					</view>
				</view>
			</view>
			<!-- 商品详情评价 -->
			<view class="info-detail-evaluate">
				<view class="navbar">
					<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabIndex === index }"
					 @click="tabClick(index)">{{ item.text }}</view>
				</view>
				<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
					<swiper-item class="tab-content">
						<scroll-view class="list-scroll-content" scroll-y>
							<!-- 详情 -->
							<view class="detail">
								1111111111
							</view>


						</scroll-view>
					</swiper-item>
					<swiper-item class="tab-content">
						<scroll-view class="list-scroll-content" scroll-y>
							<!-- 评价 -->
							<view class="evaluate">
								<view class="title">
									用户评价 （547）
								</view>
								<view class="user-info">
									<view class="photo">
										<image src="../../static/img/avatar.png" mode=""></image>
									</view>
									<view class="info">
										<view class="user-name">
											<view class="name">
												<view class="">
													少年刘姥姥
												</view>
												<view class="">
													☆☆☆☆☆
												</view>

											</view>
											<view class="time">
												2020.07.04
											</view>
										</view>

										<view class="content">
											此大米晶莹剔透，色泽透亮，让人喜欢。看着这晶
											莹剔透的大米，我仿佛闻到了米饭的香味。大米是
											生活中做米饭的佳品,其颗粒饱满、质地坚硬、色泽
											清白透饭粒油亮、香味浓郁

										</view>

										<view class="img">
											<image src="../../static/img/footprint.png" mode=""></image>
											<image src="../../static/img/footprint.png" mode=""></image>
											<image src="../../static/img/footprint.png" mode=""></image>

										</view>
										<view class="merchant">
											亲，感谢您对我们的认可，我们会再接在励的！
										</view>


									</view>
								</view>
							</view>

						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
			<!-- 底部兑换 -->
			<view class="btn">
				<view class="to">
					<view class="home">
						<view class="">
							<image src="../../static/img/points/home.png" mode=""></image>
						</view>
						<view class="">
							首页
						</view>
					</view>
					<view class="home">
						<view class="">
							<image src="../../static/img/points/collect.png" mode=""></image>
						</view>
						<view class="">
							收藏
						</view>
					</view>
				</view>
				<view class="conversion">
					立即兑换
				</view>

			</view>

		</view>
		<!-- 规则选择 -->
		<view class="ele" @click.self="cancel" v-if="selType">
			<view class="box">
				
				<view class="photo">
					<image src="../../static/img/points/commodity.png" mode=""></image>
					<view class="price">
						<view>
							￥1299.00
						</view>
						<view>
							已选：皇妃品种20g
						</view>
					</view>
				</view>
				<view class="type">
					<view class="tilte">
						规格
					</view>
					<view class="name">
						<view  v-for="(item,index) in typeList" :key="index" :class="{active:typeIndex === index}" @click="eleType(index)">
							{{item.text}}
						</view>
						
					</view>
				</view>
				<view class="count">
					<view class="sum">
						数量
					</view>
					<view class="num">
						- <view class="">
							1
						</view>
						+
					</view>
				</view>
				
				<view class="btn">
					立即购买
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 1,
				selType:false,
				typeIndex:0,
				navList: [{
						text: '商品详情',
						state: '0'
					},
					{
						text: '商品评价',
						state: '1'
					}
				],
				typeList: [{
						text: '皇妃品种  20g',
						state: '0'
					},
					{
						text: '皇妃品种  30g',
						state: '1'
					},
					{
						text: '皇妃品种  40g',
						state: '2'
					},
					{
						text: '四川高粱皇妃品种  30g',
						state: '3'
					}
				]
			}
		},
		methods: {
			changeTab(e) {
				this.tabClick(e.target.current);
			},
			tabClick(index) {
				this.tabIndex = index
			},
			eleType(index){
				this.typeIndex = index
			},
			//规格
			openType(){
				this.selType = !this.selType
			},
			//关闭规格
			cancel(){
				this.selType = !this.selType
			}
		}
	}
</script>

<style lang="scss" scoped>

	.swiper-box {
		height: 500px;
	}

	.commodity {
		position: relative;

		.swiper-section {
			width: 100vw;
			height: 754rpx;

			// padding: 0 20rpx;
			swiper {
				height: 754rpx;
			}

			.swiper-item {
				width: 100vw;
				height: 754rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.commodity-info {
			position: absolute;
			top: 678rpx;
			left: 0;
			width: 100vw;
			height: 100%;
			border-radius: 30rpx 30rpx 0rpx 0rpx;
			background-color: #F4F4F4;

			.info-top {
				width: 100%;
				height: 374rpx;
				background-color: #FFFFFF;
				border-radius: 30rpx 30rpx 0px 0px;

				.title-box {
					display: flex;
					align-items: center;
					box-sizing: border-box;
					padding: 20rpx 20rpx;


					.title {
						color: #000000;
						font-size: 36rpx;
						font-weight: bold;
						line-height: 1.3;
					}

					image {
						width: 96rpx;
						height: 96rpx;
						margin-left: 104rpx;
					}
				}

				.subhead {
					width: 530rpx;
					color: #999999;
					font-size: 28rpx;
					line-height: 1.2;
					padding: 0 20rpx;
				}

				.price {
					padding: 0 20rpx;

					&>text:nth-child(1) {
						color: #F4821B;
						font-size: 42rpx;
					}

					&>text:nth-child(2) {
						color: #F4821B;
						font-size: 24rpx;
						margin: 0 26rpx 0 10rpx;
					}

					&>text:nth-child(3) {
						color: #CCCCCC;
						font-size: 28rpx;
						vertical-align: center;
						text-decoration: line-through;
					}
				}

				.count {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 20rpx;
					font-size: 28rpx;
					color: #666666;
					margin-top: 10rpx;
				}
			}

			.info-intro {
				margin-top: 20rpx;
				background-color: #ffffff;
				padding: 20rpx 0;

				.type {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 20rpx;

					&>view text:nth-child(1) {
						font-size: 28rpx;
						color: #666666;
						margin-right: 40rpx;
					}

					&>view text:nth-child(2) {
						font-size: 28rpx;
						color: #333333;
						margin-right: 40rpx;
					}

					&>view:nth-child(2) {
						image {
							width: 48rpx;
							height: 48rpx;
						}
					}



				}

				&>view:nth-child(2) {
					padding: 40rpx 20rpx;
				}

			}

			.info-detail-evaluate {
				width: 100%;
				// height: auto;
				background-color: #FFFFFF;
				margin-top: 20rpx;
				margin-bottom: 100rpx;

				.navbar {
					width: 100%;
					display: flex;
					height: 40px;
					padding: 0 5px;


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
								border-bottom: 6upx solid #ff594d;
								border-radius: 4upx 4upx 0upx 0upx;
							}
						}
					}
				}

				.evaluate {
					padding: 20rpx;
					margin-bottom: 100rpx;

					.title {
						color: #333333;
						font-size: 30rpx;
						font-weight: bold;
					}

					.user-info {
						display: flex;

						.photo {
							margin-right: 20rpx;

							image {
								width: 74rpx;
								height: 74rpx;
								margin-top: 13rpx;
							}
						}

						.info {
							width: 100%;

							.user-name {
								width: 100%;
								display: flex;
								justify-content: space-between;

								.name {
									color: #333333;
									font-size: 32rpx;

								}

								.time {
									color: #666666;
									font-size: 28rpx;
								}
							}

							.content {
								color: #666666;
								font-size: 28rpx;
							}

							.img {
								display: flex;
								align-items: center;
								justify-content: space-around;
								margin-top: 30rpx;

								image {
									width: 192rpx;
									height: 192rpx;
								}
							}

							.merchant {
								width: 100%;
								height: 80rpx;
								line-height: 80rpx;
								text-align: center;
								background: rgba(240, 238, 239, 1);
								color: #666666;
								font-size: 24rpx;
								margin-top: 30rpx;

							}
						}
					}
				}

			}

			.btn {
				width: 100%;
				height: 100rpx;
				background-color: #ffffff;
				position: fixed;
				bottom: 0;
				left: 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border: 1rpx solid rgba(204, 204, 204, 0.77);
				box-sizing: border-box;

				.conversion {
					width: 480rpx;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #FF9933;
					font-size: 36rpx;
					color: #ffffff;

				}

				.to {
					width: calc(750rpx - 500rpx);
					display: flex;
					align-items: center;
					justify-content: center;

					.home {
						flex: 1;

						&>view:nth-child(1) {
							display: flex;
							align-items: center;
							justify-content: center;

							image {
								width: 58rpx;
								height: 58rpx;
							}
						}

						&>view:nth-child(2) {
							color: #666666;
							font-size: 24rpx;
							text-align: center;
						}
					}
				}
			}
		}
	
		.ele{
			width: 100vw;
			height: 100vh;
			position: fixed;
			top: 0;
			left: 0;
			background: rgba(0,0,0,0.5);
			z-index: 1000;
			
			.box{
				width: 100vw;
				height: 855rpx;
				position: absolute;
				left: 0;
				bottom: 0;
				background-color: #ffffff;
				border-radius:30rpx 30rpx 0px 0px;
				
				.photo{
					
					image{
						width: 286rpx;
						height: 296rpx;
						position: absolute;
						top: -64rpx;
						left: 20rpx;
					}
					
					.price{
						position: absolute;
						left: 334rpx;
						top: 112rpx;
						&>view:nth-child(1){
							color: #ff594d;
							font-size: 48rpx;
						}
						&>view:nth-child(2){
							color: #333333;
							font-size: 24rpx;
						}
					}
					
				}
				.type{
					padding: 274rpx 20rpx 15rpx 20rpx;
					.title{
						
					}
					.name{
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;
						
						.active{
							border:1rpx solid rgba(233,144,64,1);
							color: #ff594d;
						}
						
						&>view{
							height: 68rpx;
							line-height: 68rpx;
							padding: 0 30rpx;
							border:1rpx solid rgba(204,204,204,1);
							border-radius:35rpx;
							font-size: 24rpx;
							margin: 15rpx 0;
						}
						
					}
				}
				
				.count{
					padding: 50rpx 20rpx 0 20rpx;
					display: flex;
					justify-content: space-between;
					
					.num{
						display: flex;
						justify-content: center;
						align-items: center;

						&>view{
							width: 82rpx;
							height: 40rpx;
							line-height: 40rpx;
							text-align: center;
							background:rgba(236,236,236,1);
							border-radius:20rpx;
							margin: 0 10rpx;
						}
					}
				}
				
				.btn{
					width: 700rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					background:linear-gradient(-90deg,rgba(242,44,4,1) 0%,rgba(234,141,63,1) 100%);
					border-radius:40rpx;
					color: #ffffff;
					font-size: 36rpx;
					position: absolute;
					bottom: 38rpx;
					left: 25rpx;
				}
				
			}
		}
	}



	/deep/uni-swiper .uni-swiper-dots-horizontal {
		bottom: 50px;
	}
</style>
