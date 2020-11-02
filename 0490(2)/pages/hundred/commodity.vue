<template>
	<view class="commodity">
		<!-- 轮播图 -->
		<view class="swiper-section">
			<swiper :indicator-dots="true" :autoplay="false" :interval="3000" :duration="1000" indicator-active-color="#fff">
				<swiper-item v-for="(item, index) in groudSwiper" :key="index">
					<view class="swiper-item"><image :src="item" mode=""></image></view>
				</swiper-item>
				<!-- 	<swiper-item>
					<view class="swiper-item"><image src="/static/img/up_bg.png" mode=""></image></view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item"><image src="/static/img/up_bg.png" mode=""></image></view>
				</swiper-item> -->
			</swiper>
		</view>

		<view class="commodity-info">
			<view class="info-top">
				<view class="title-box">
					<view class="title ">
						<!-- <view class="num">{{ groudList.groupnum }}人团</view> -->
						{{ groudList.title }}
					</view>
					<view class="share"><image src="../../static/img/share.png" mode=""></image></view>
				</view>
				<view class="subhead">{{ groudList.description }}</view>
				<view class="price">
					<view class="">
						<text>￥{{ groudList.groupsprice }}</text>
						<text></text>
						<text>￥{{ groudList.price }}</text>
					</view>
					<view class="">
						<text>{{ groudList.groupnum }}人团</text>
					</view>
				</view>
				<text class="rebate">未中标者返利￥10</text>
				<view class="discount-content" v-if="groudList.isdiscount == 1">
					<view class="discount1" v-if="groudList.headstype == 0">
						<view class="discount">团长开团享{{ groudList.headsdiscount }}折</view>
						<view class="discount">优惠价:￥{{ groudList.discountPrice }}</view>
					</view>

					<view class="discount1" v-if="groudList.headstype == 1">
						<view class="discount">团长开团享优惠</view>
						<view class="discount">优惠价:￥{{ groudList.headsmoney }}</view>
					</view>
					<!-- 	<view class="discount"  v-if="groudList.headstype == 1">
						<view style="color: #666;font-size: 26upx;">团长优惠</view>
						<view class="com_sum_sty">-￥{{ groudList.discountmoney }}</view>
					</view> -->
				</view>

				<view class="count">
					<view>已有{{ groudList.teamnum }}人参团</view>
					<view>库存{{ groudList.stock }}件</view>
				</view>
			</view>
			<view class="info-intro">
				<!-- <view class="type" @click="selType = !selType">
					<view>
						<text>规格</text>
						<text>当季香米5kg</text>
					</view>
					<view class="img"><image src="../../static/icon/right.png" mode=""></image></view>
				</view> -->
				<view class="type">
					<view>
						<text>服务</text>
						<text>
							极速退款
							<b style="margin:0 18rpx">·</b>
							7天退换货
							<b style="margin:0 18rpx">·</b>
							48小时发货
						</text>
					</view>
				</view>
				<view class="type">
					<view>
						<text>运费</text>
						<text v-if="groudList.freight == 0.0">包邮</text>
						<text v-else>{{ groudList.freight }}元</text>
					</view>
				</view>
			</view>

			<!-- 拼团规则 -->
			<view class="info-rule">
				<view class="title" @click="groupRule = !groupRule">
					<view>拼团规则</view>
					<view><image style="margin:6upx auto;" src="../../static/icon/right.png" mode=""></image></view>
				</view>
				<view class="step">
					一键参团
					<image src="../../static/img/_next.png" mode=""></image>
					品种发货
					<image src="../../static/img/_next.png" mode=""></image>
					未中退款
					<image src="../../static/img/_next.png" mode=""></image>
					发放米粒
				</view>
			</view>

			<view class="info-group" v-if="groudList.teaming_num != 0">
				<view>参团信息</view>
				<!-- <view class="info-list" @click="$router.push('/pages/hundred/person')"> -->
				<view class="info-list">
					<view class="group-img" v-for="(item, index) in groudAvatar" :key="index">
						<image style="border-radius:50%;" :src="item.avatar == '' ? '/static/face.png' : item.avatar" mode=""></image>
						<!-- <image src="../../static/img/avatar.png" mode=""></image>
						<image src="../../static/img/avatar.png" mode=""></image>
						<image src="../../static/img/avatar.png" mode=""></image> -->
					</view>
					<view>···</view>
					<view class="group-more" @click="groupMore = !groupMore">
						查看更多
						<image src="../../static/icon/right.png" mode=""></image>
					</view>
				</view>
				<view class="start">
					<text>{{ groudList.teaming_num }}</text>
					人在拼团，可直接参与
					<!-- <text>100人</text>成团，还需<text>36人</text>即可开团 -->
				</view>
				<view class="group">
					<view class="group-list" @click="jump('/pages/createOrder/createOrder?goodsid=' + id, id)">我要开团</view>
					<view class="invite" @click="groupMore = !groupMore">一键参团</view>
				</view>
			</view>

			<!-- 商品详情评价 -->
			<view class="info-detail-evaluate" :style="{'min-height':minhei+'px'}">
				<view class="navbar">
					<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabIndex === index }" @click="tabClick(index)">{{ item.text }}</view>
				</view>
				<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
					<swiper-item class="tab-content">
						<scroll-view class="list-scroll-content" scroll-y>
							<!-- 详情 -->
							<view class="detail" v-html="groudList.content"></view>
						</scroll-view>
					</swiper-item>
					<swiper-item class="tab-content">
						<scroll-view class="list-scroll-content" scroll-y>
							<!-- 评价 -->
							<view class="evaluate" v-for="(item, index) in groudComment" :key="index">
								<view class="title">用户评价 （{{ groudList.comment_num }}）</view>
								<view class="user-info">
									<view class="photo"><image :src="item.avatar == '' ? '/static/face.png' : item.avatar" mode=""></image></view>
									<view class="info">
										<view class="user-name">
											<view class="name">
												<view class="">{{ item.nickname }}</view>
												<!-- <view class="">☆☆☆☆☆</view> -->
												<uni-rate disabled="true" :value="item.level" size="14" margin="2" style="margin-top: 40upx;margin-bottom: 20upx;"></uni-rate>
											</view>
											<view class="time">{{ item.createtime }}</view>
										</view>

										<view class="content">{{ item.content }}</view>
										<view class="img" v-if="item.images.length > 0">
											<view v-for="(item, index) in item.images" :key="index" v-if="index < 3"><image :src="item" mode=""></image></view>
										</view>

										<view class="merchant" v-if="item.reply_content != ''">{{ item.reply_content }}</view>
										<view class="img" v-if="item.reply_images.length > 0">
											<view v-for="(item, index) in item.reply_images" :key="index"><image :src="item" mode=""></image></view>
										</view>
										<view class="add-comment" v-if="item.append_time != ''">用户{{ item.count }}天后追评</view>
										<view class="comment-list">
											{{ item.append_content }}
											<!-- <view class="img" v-if="item.append_images.length>0">
												<view class="img" v-for="(item, index) in item.append_images" :key="index"><image :src="item" mode=""></image></view>
											</view> -->
										</view>
										<view class="merchant">
											{{ item.append_reply_content }}
											<view class="img" style="margin-bottom: 100upx;" v-if="item.append_reply_images.length > 0">
												<view v-for="(item, index) in item.append_reply_images" :key="index"><image :src="item" mode=""></image></view>
											</view>
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
					<view class="home" @click="jumpUrl('/pages/main/index')">
						<view class=""><image src="../../static/img/points/home.png" mode=""></image></view>
						<view class="">首页</view>
					</view>
					<view class="home">
						<view class=""><image src="../../static/img/points/collect.png" mode=""></image></view>
						<view class="">收藏</view>
					</view>
				</view>
				<view class="conversion" @click="jump('/pages/createOrder/createOrder?goodsid=' + id, id)">我要开团</view>
			</view>
		</view>
		<!-- 规则选择 -->
		<!-- <view class="ele" :class="{ block: selType }" @click.self="selType = !selType">
			<view class="box" :class="{ active: selType }">
				<view class="photo">
					<image src="../../static/img/points/commodity.png" mode=""></image>
					<view class="price">
						<view>￥1299.00</view>
						<view>已选：皇妃品种20g</view>
					</view>
				</view>
				<view class="type">
					<view class="tilte">规格</view>
					<view class="name">
						<view v-for="(item, index) in typeList" :key="index" :class="{ active: typeIndex === index }" @click="eleType(index)">{{ item.text }}</view>
					</view>
				</view>
				<view class="count">
					<view class="sum">数量</view>
					<view class="num">
						<text style="width: 30rpx;text-align: center;" @click="count--">-</text>
						<view class="">{{ count }}</view>
						<text style="width: 30rpx;text-align: center;" @click="count++">+</text>
					</view>
				</view>

				<view class="btn" @click="pay">立即购买</view>
			</view>
		</view> -->

		<!-- 拼团规则 -->
		<view class="group-rule" v-if="groupRule">
			<view class="box">
				<view class="title">拼团规则</view>
				<view class="content">
					<view class="img"></view>
					<view class="state">
						<view class="state-box">
							<view class="state-type">一键参团</view>
							<view class="state-explain">选择拼团商品下单参团，分享链接到朋友圈或 发送给好友邀请参团</view>
						</view>
						<view class="state-box">
							<view class="state-type">一键参团</view>
							<view class="state-explain">选择拼团商品下单参团，分享链接到朋友圈或 发送给好友邀请参团</view>
						</view>
						<view class="state-box">
							<view class="state-type">一键参团</view>
							<view class="state-explain">选择拼团商品下单参团，分享链接到朋友圈或 发送给好友邀请参团</view>
						</view>
						<view class="state-box">
							<view class="state-type">一键参团</view>
							<view class="state-explain">选择拼团商品下单参团，分享链接到朋友圈或 发送给好友邀请参团</view>
						</view>
					</view>
				</view>
				<view class="know" @click="groupRule = !groupRule">我知道了</view>
			</view>
		</view>
		<!-- 查看更多 -->
		<view class="more-info" v-if="groupMore">
			<view class="group-info">
				<view class="group-more">
					<view class="close" @click="handleClose"><image src="../../static/img/close.png" class="close-img" mode=""></image></view>
					<view class="title">正在拼团</view>
					<view class="group-list">
						<view class="list-item" v-for="(item, index) in groudTeam" :key="index">
							<view style="display: flex">
								<image :src="item.avatar == '' ? '/static/face.png' : item.avatar" mode=""></image>
								<view class="name">
									<view>
										<text class="name1">{{ item.nickname }}</text>
										<text class="name2">还差{{ item.teamnum }}人</text>
									</view>

									<view class="time">
										<view>剩余</view>
										<view><uni-countdown :count="item.time" type="4" fontColor="#666"></uni-countdown></view>
									</view>
								</view>
							</view>
							<view class="group-shopping" @click="jump('/pages/createOrder/createOrder?goodsid=' + id + '&teamid=' + item.teamid, item.teamid, id)">去参团</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="close-icon"><!-- 		<view class="close" @click="handleClose"><image src="../../static/img/close.png" class="close-img" mode=""></image></view> --></view>
	</view>
	<!-- </view> -->
</template>

<script>
import service from '@/store/service.js';
import uniCountdown from '@/components/uni-countdown.vue';
import uniRate from '@/components/uni-rate/uni-rate.vue';
export default {
	data() {
		return {
			tabIndex: 1,
			selType: false,
			typeIndex: 0,
			groupRule: false,
			groupMore: false,
			count: 1,
			id: 2,
			groudList: [],
			groudSwiper: [],
			groudAvatar: [],
			groudTeam: [],
			groudComment: [],
			imgList: [],
			minhei:0,
			navList: [
				{
					text: '商品详情',
					state: '0'
				},
				{
					text: '商品评价',
					state: '1'
				}
			],
			typeList: [
				{
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
		};
	},
	components: {
		uniCountdown,
		uniRate
	},
	onLoad: function(e) {
		this.id = Number(e.goodsid);
		this.getGroupList();
		this.getGroupTeam();
		this.minhei = uni.getSystemInfoSync().windowHeight - 40
	},
	methods: {
		jump(url, id, tid) {
			uni.navigateTo({
				url: url
			});
		},
		jumpUrl(url) {
			uni.switchTab({
				url: url
			});
		},
		
		changeTab(e) {
			this.tabClick(e.target.current);
		},
		tabClick(index) {
			this.tabIndex = index;
			uni.pageScrollTo({
				scrollTop: 1000,
				duration: 300
			});
		},
		eleType(index) {
			this.typeIndex = index;
		},
		//立即购买
		// pay() {
		// 	// console.log(this.count);
		// },
		handleClose() {
			this.groupMore = !this.groupMore;
		},
		getGroupList() {
			var self = this;
			self.$http
				.get(service.api.group.goodsInfo, {
					goodsid: self.id
				})
				.then(function(res) {
					var list = res.data;
					self.groudList = list;
					self.groudList.groupsprice - self.groupsprice * self.groudList.headsdiscount;
					var groupsprice = parseInt(self.groudList.groupsprice);
					var discount = self.groudList.headsdiscount / 10;
					self.groudList.discountPrice = groupsprice - groupsprice * discount;
					self.groudSwiper = list.images;
					self.groudAvatar = list.teaming;
					console.log(list, 222);

					if (list.teaming.length > 0) {
						list.forEach(item => {
							var ctime = new Date(item.createtime.substring(0, 10));
							var atime = new Date(item.append_time.substring(0, 10));
							var time = parseInt(Math.abs(atime - ctime) / 1000 / 60 / 60 / 24);
							if (time == 0) {
								time += 1;
							}
							item.count = time;
							self.imgList = item;
						});
					}
					var list = list.comment;
					console.log(list, 222);
					self.groudComment = list;
				});
		},
		getGroupTeam() {
			var self = this;
			self.$http
				.get(service.api.group.teaming, {
					goodsid: self.id
				})
				.then(function(res) {
					var list = res.data;
					self.groudTeam = list;
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.close-icon {
	position: relative;
}
.swiper-box {
	height: 100%;
}

.list-scroll-content {
	height: 100%;
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
		// height: 100%;
		border-radius: 30rpx 30rpx 0rpx 0rpx;
		background-color: #f4f4f4;

		.info-top {
			width: 100%;
			// height: 374rpx;
			background-color: #ffffff;
			border-radius: 30rpx 30rpx 0px 0px;

			.title-box {
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 20rpx 20rpx;

				.title {
					color: #000000;
					font-size: 36rpx;
					font-weight: bold;
					line-height: 1.3;
					display: flex;
					.num {
						background-color: #fff;
						color: #ff9933;
						font-size: 30upx;
						margin-right: 30upx;
					}
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
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 26upx;

				& > view:nth-child(1) text:nth-child(1) {
					color: #f4821b;
					font-size: 42rpx;
				}

				& > view:nth-child(2) text:nth-child(1) {
					color: #f4821b;
					font-size: 32rpx;
				}

				& > view text:nth-child(2) {
					color: #f4821b;
					font-size: 24rpx;
					margin: 0 26rpx 0 10rpx;
				}

				& > view text:nth-child(3) {
					color: #cccccc;
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
				margin-top: 30rpx;
				padding-bottom: 28upx;
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

				& > view text:nth-child(1) {
					font-size: 28rpx;
					color: #666666;
					margin-right: 40rpx;
				}

				& > view text:nth-child(2) {
					font-size: 28rpx;
					color: #333333;
					margin-right: 40rpx;
				}

				& > view:nth-child(2) {
					image {
						width: 48rpx;
						height: 48rpx;
					}
				}
			}

			& > view:nth-child(2) {
				padding: 20rpx 20rpx;
			}
		}

		.info-detail-evaluate {
			width: 100%;
			height: 100%;
			background-color: #ffffff;
			border-top: 20rpx solid #f4f4f4;
			// margin-top: 20rpx;
			margin-bottom: 100rpx;
			position: absolute;

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
							border-radius: 50%;
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
							margin-top: 10rpx;
							// width: 600upx;
							image {
								width: 192rpx;
								margin-right: 10upx;
								// width: 33.33%;
								height: 192rpx;
							}
						}

						.merchant {
							// width: 100%;
							height: 80rpx;
							line-height: 80rpx;
							// text-align: center;
							background: rgba(240, 238, 239, 1);
							color: #666666;
							font-size: 24rpx;
							margin-top: 20rpx;
							padding-left: 20upx;
							// margin-right: 20upx;
						}
						.add-comment {
							color: #ff9933;
							text-align: right;
							margin-top: 10upx;
							margin-bottom: 10upx;
						}
						.comment-list {
							color: #666;
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
				background-color: #ff9933;
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

					& > view:nth-child(1) {
						display: flex;
						align-items: center;
						justify-content: center;

						image {
							width: 58rpx;
							height: 58rpx;
						}
					}

					& > view:nth-child(2) {
						color: #666666;
						font-size: 24rpx;
						text-align: center;
					}
				}
			}
		}
	}

	.info-rule {
		margin-top: 20rpx;
		margin-bottom: 20upx;
		width: 100vw;
		background-color: #ffffff;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 20rpx 0;

			& > view:nth-child(1) {
				color: #333333;
				font-size: 28rpx;
			}

			& > view:nth-child(2) {
				image {
					width: 48rpx;
					height: 48rpx;
				}
			}
		}

		.step {
			display: flex;
			justify-content: space-around;
			align-items: center;
			padding: 10rpx 40rpx 20rpx 40rpx;

			image {
				width: 48rpx;
				height: 48rpx;
			}
		}
	}

	.info-group {
		width: 100vw;
		height: 510upx;
		background-color: #fff;
		box-sizing: border-box;
		padding: 22upx 20upx;

		// margin-bottom: 20upx;
		.info-list {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 44upx 10upx;

			.group-img {
				display: flex;
				align-items: center;

				image {
					width: 80upx;
					height: 80upx;
					margin: 0 10upx;
				}
			}

			.group-more {
				display: flex;
				align-items: center;
				color: #666666;

				image {
					width: 40upx;
					height: 40upx;
				}
			}
		}

		.start {
			width: 100vw;
			text-align: center;
			color: #35393b;
			font-size: 30upx;
			font-weight: bold;

			& > text {
				color: #ff3333;
			}
		}

		.invite {
			// width: 620upx;
			// height: 100upx;
			// background: linear-gradient(90deg, rgba(255, 153, 51, 1) 0%, rgba(255, 102, 51, 1) 100%);
			// border-radius: 10upx;
			// display: flex;
			// align-items: center;
			// justify-content: center;
			// color: #fff;
			// font-size: 36upx;
			// margin: 52upx auto 0 auto;

			image {
				width: 58upx;
				height: 48upx;
				margin-right: 10upx;
			}
		}
	}
}

.ele {
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: -1000;

	.box {
		width: 100vw;
		height: 855rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		background-color: #ffffff;
		border-radius: 30rpx 30rpx 0px 0px;
		transform: translateY(120%);
		transition: all 0.3s linear;

		.photo {
			image {
				width: 286rpx;
				height: 296rpx;
				position: absolute;
				top: -64rpx;
				left: 20rpx;
			}

			.price {
				position: absolute;
				left: 334rpx;
				top: 112rpx;

				& > view:nth-child(1) {
					color: #ff594d;
					font-size: 48rpx;
				}

				& > view:nth-child(2) {
					color: #333333;
					font-size: 24rpx;
				}
			}
		}

		.type {
			padding: 274rpx 20rpx 15rpx 20rpx;

			.title {
			}

			.name {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.active {
					border: 1rpx solid rgba(233, 144, 64, 1);
					color: #ff594d;
				}

				& > view {
					height: 68rpx;
					line-height: 68rpx;
					padding: 0 30rpx;
					border: 1rpx solid rgba(204, 204, 204, 1);
					border-radius: 35rpx;
					font-size: 24rpx;
					margin: 15rpx 0;
				}
			}
		}

		.count {
			padding: 50rpx 20rpx 0 20rpx;
			display: flex;
			justify-content: space-between;

			.num {
				display: flex;
				justify-content: center;
				align-items: center;

				& > view {
					width: 82rpx;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					background: rgba(236, 236, 236, 1);
					border-radius: 20rpx;
					margin: 0 10rpx;
				}
			}
		}

		.btn {
			width: 700rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			background: linear-gradient(-90deg, rgba(242, 44, 4, 1) 0%, rgba(234, 141, 63, 1) 100%);
			border-radius: 40rpx;
			color: #ffffff;
			font-size: 36rpx;
			position: absolute;
			bottom: 38rpx;
			left: 25rpx;
		}
	}
	.active {
		transform: translateY(0) !important;
	}
}

.block {
	z-index: 1000;
}

.group-rule {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1000;

	.box {
		width: 536rpx;
		height: 788rpx;
		background-color: #ffffff;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -268rpx;
		margin-top: -394rpx;
		border-radius: 10rpx;

		.title {
			width: 100%;
			height: 92rpx;
			line-height: 92rpx;
			text-align: center;
			background-color: #ffb46a;
			color: #000000;
			font-size: 32rpx;
			border-radius: 10rpx 10rpx 0 0;
		}

		.content {
			padding: 0 28rpx 40rpx 28rpx;
			display: flex;

			.img {
				width: 100rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.state {
				margin-left: 20rpx;

				.state-box {
					margin-top: 36rpx;

					.state-type {
						color: #333333;
						font-size: 24rpx;
					}

					.state-explain {
						color: #999999;
						font-size: 20rpx;
						line-height: 30rpx;
					}
				}
			}
		}

		.know {
			text-align: center;
			font-size: 28rpx;
			color: #333333;
		}
	}
}

.group {
	display: flex;
	justify-content: space-between;
	margin: 60upx 50upx 0;
	font-size: 36upx;
	// text-align: center;
	// align-items: center;
	.group-list {
		width: 305upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(51, 51, 51, 1);
		border-radius: 10upx;
		color: #333;
		margin-right: 42upx;
	}
	.invite {
		width: 305upx;
		height: 88upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(90deg, rgba(255, 153, 51, 1) 0%, rgba(255, 102, 51, 1) 100%);
		border-radius: 10upx;
		color: #fff;
		// width: 620upx;
		// height: 100upx;
		// background: linear-gradient(90deg, rgba(255, 153, 51, 1) 0%, rgba(255, 102, 51, 1) 100%);
		// border-radius: 10upx;
		// display: flex;
		// align-items: center;
		// justify-content: center;
		// color: #fff;
		// font-size: 36upx;
		// margin: 52upx auto 0 auto;
	}
}
/deep/uni-swiper .uni-swiper-dots-horizontal {
	bottom: 50px;
}
// 查看更多
.more-info {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1000;
	.group-info {
		border-radius: 20upx;
		width: 630rpx;

		max-height: 788rpx;
		background-color: #ffffff;
		position: absolute;
		top: 50%;
		left: 50%;
		// margin-left: -315rpx;
		// margin-top: -394rpx;
		transform: translate(-50%, -50%);
		.group-more {
			border-radius: 20rpx;
			background-color: #fff;
			position: relative;
			.title {
				border-bottom: 1px solid #f4f4f4;
				height: 130upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 36upx;
				font-weight: bold;
				color: #2e2a2a;
			}
		}
		.group-list {
			max-height: 560upx;
			overflow: scroll;
			// display: flex;
			// justify-content: space-between;
			// align-items: center;
			border-bottom: 1px solid #f4f4f4;
			padding: 20upx 0;
			margin: 0 20upx;
			.list-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #f4f4f4;
				padding: 20upx 0;
				image {
					width: 80upx;
					height: 80upx;
					border-radius: 20upx;
				}
				.name {
					display: flex;
					flex-direction: column;
					margin-left: 20upx;
					.name1 {
						color: #2e2a2a;
					}
					.name2 {
						color: #ff9933;
						margin-left: 20upx;
					}
					.time {
						display: flex;
						flex-direction: row;
						font-size: 24upx;
						color: #666;
					}
				}
			}
		}
	}
}
.group-shopping {
	background: linear-gradient(90deg, rgba(255, 153, 51, 1) 0%, rgba(255, 102, 51, 1) 100%);
	border-radius: 10upx;
	width: 120upx;
	height: 46upx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
}
.close {
	width: 54upx;
	height: 54upx;
	position: absolute;
	right: -10upx;
	top: -20upx;
	.close-img {
		width: 54upx;
		height: 54upx;
	}
}
.rebate {
	background: rgba(255, 247, 238, 1);
	border-radius: 3upx;
	color: #ff9933;
	padding: 14upx;
	margin-left: 22upx;
}
.discount-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: rgba(255, 232, 205, 1);
	border-radius: 5upx;
	padding: 22upx;
	margin: 44upx 22upx 0;
	color: #ff7f00;
}
.discount {
	padding: 0 20upx;
	font-size: 24upx;
}
.discount1 {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.detail {
	margin-bottom: 50upx;
}
</style>
