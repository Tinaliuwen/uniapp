<template>
	<view class="container">
		<view class="header">
			<view class="header-left">
				<view class="left-img" @click="jump('/pages/setting/update')">
					<view>
						<image :src="avatar == '' ? '/static/face.png' : avatar" mode="widthFix"></image>
						<view class="left-text"><text>{{level}}</text></view>
					</view>
					<view class="center">
					<view class="">{{nickname}}</view>
					<view class="">{{identification}}{{account}}</view>
					</view>
				</view>
				
				<view class="right">
					<view class="rig">
						<image src="../../static/icon/set.png" mode="widthFix"  @click="jump('/pages/setting/setting')"></image>
					</view>
					
					<view class="integral" @click="jump('/pages/user/integral')">
						<view class="text">我的积分</view>
						<view class="number">{{integral}}</view>
					</view>
				</view>
			</view>

			<view class="header-botton">
				<view class="order"  @click="jump('/pages/order/order?id=0')">
					<text>我的订单</text>
					<view class="order-rigth">
						<text>查看全部订单</text>
						<image src="../../static/icon/right.png" mode="widthFix"></image>
					</view>
				</view>

				<view class="mem">
					<view class="mem-box"  @click="jump('/pages/order/order?id=1')">
						<view class="mem-top">
							<view class="mem-num" v-if="count.count_1 > 0">{{count.count_1}}</view>
						</view>
						<image src="../../static/img/icon6.png" mode="widthFix"></image>
						<text>待付款</text>
					</view>
					<view class="mem-box" @click="jump('/pages/order/order?id=2')">
						<view class="mem-top">
							<view class="mem-num" v-if="count.count_2 > 0">{{count.count_2}}</view>
						</view>
						<image src="../../static/user/icon2.png" mode="widthFix"></image>
						<text>待发货</text>
					</view>
					<view class="mem-box" @click="jump('/pages/order/order?id=3')">
						<view class="mem-top">
							<view class="mem-num" v-if="count.count_3 > 0">{{count.count_3}}</view>
						</view>
						<image src="../../static/user/icon3.png" mode="widthFix"></image>
						<text>待收货</text>
					</view>
					<view class="mem-box" @click="jump('/pages/order/order?id=4')">
						<!-- <view class="mem-top">
							<view class="mem-num" v-if="count.count_4 > 0">{{count.count_4}}</view>
						</view> -->
						<image src="../../static/user/icon4.png" mode="widthFix"></image>
						<text>已完成</text> 
					</view>
					<!-- <view class="mem-box" @click="jump('/pages/order/order?id=5')">
						<image src="../../static/img/icon5.png" mode="widthFix"></image>
						<text>退/换货</text> 
					</view> -->
				</view>

				<view class="" style="width: 100%; height: 30upx; background-color: #F4F4F4;"></view>

				<view class="mem-botton">
					<text class="mem-botton-text">我的服务</text>
					<view class="mem-box" @click="jump('/pages/service/service')">
						<image src="../../static/user/service1.png" mode="widthFix"></image>
						<text>客服中心</text>
					</view>
					<!-- #ifdef APP-PLUS -->
					<view class="mem-box"  @click="jump('/pages/service/introduce')">
						<image src="../../static/user/service2.png" mode="widthFix"></image>
						<text>企业介绍</text>
					</view>
					<!-- #endif -->
					<view class="mem-box"  @click="jump('/pages/service/certificate')">
						<image src="../../static/user/service3.png" mode="widthFix"></image>
						<text>资质证照</text>
					</view>
					<!-- #ifdef APP-PLUS -->
					<view class="mem-box"  @click="jump('/pages/index/education?type=0')">
						<image src="../../static/user/service4.png" mode="widthFix"></image>
						<text>素材库</text>
					</view>
					<!-- #endif -->
				</view>

				<view class="" style="width: 100%; height: 30upx; background-color: #F4F4F4;"></view>

				<view class="mem-botton" style="margin-bottom: 180upx;">
					<text class="mem-botton-text">我的工具</text>
					<view class="mem-box"  @click="jump('/pages/order/address')">
						<image src="../../static/user/tool1.png" mode="widthFix"></image>
						<text>收货地址</text>
					</view>
					<view class="mem-box" @click="jump('/pages/user/upgrade')">
						<image src="../../static/user/tool9.png" mode="widthFix"></image>
						<text>合作区</text>
					</view>
					<!-- #ifdef APP-PLUS -->
					<view class="mem-box"  @click="jumper(qrcode)">
						<image src="../../static/user/tool2.png" mode="widthFix"></image>
						<text>邀请码</text>
					</view>
					<view class="mem-box" @click="jump('/pages/service/myTeam?id='+user_id)">
						<image src="../../static/user/tool3.png" mode="widthFix"></image>
						<text>我的团队</text>
					</view>
					<view class="mem-box" @click="jump('/pages/user/integral')">
						<image src="../../static/user/tool4.png" mode="widthFix"></image>
						<text>我的积分</text>
					</view>
					<view class="mem-box"  @click="jump('/pages/user/accredit?type=0')">
						<image src="../../static/user/tool5.png" mode="widthFix"></image>
						<text>授权书</text>
					</view>
					<view class="mem-box"  @click="jump('/pages/service/upgrade')">
						<image src="../../static/user/tool6.png" mode="widthFix"></image>
						<text>升级</text>
					</view>
					<view class="mem-box"  @click="jump('')"><!-- /pages/service/declaration -->
						<image src="../../static/user/tool7.png" mode="widthFix"></image>
						<text>报单中心</text>
					</view>
					<view class="mem-box"  @click="jump('/pages/index/cart')"><!-- /pages/service/declaration -->
						<image src="../../static/user/tool8.png" mode="widthFix"></image>
						<text>购物车</text>
					</view>
					<!-- #endif -->
				</view>
			</view>
		</view>
		
		<!-- #ifdef APP-PLUS -->
		<tabbar status="4" type="0"></tabbar>
		<!-- #endif -->
		
		<!-- #ifndef APP-PLUS -->
		<tabbar status="4" type="1"></tabbar>
		<!-- #endif -->
	</view>
</template>

<script>
import service from '@/store/service.js';
	export default {
		data() {
			return {
				avatar:'',
				level:'',
				nickname:'',
				integral:'0.00',
				identification:'',
				account:'',
				user_id:0,
				count:'',
				qrcode:'',
			}
		},
		onShow:function(){
			var self = this;
			self.$http.post(service.api.service.member).then(function(res) {
				if(res.code == 1){
					res = res.data;
					self.avatar = res.avatar;
					self.level = res.levelname;
				}else{
					self.$api.msg(res.msg);
				}
			});
			self.$http.post(service.api.main.number).then(function(res) {
				if(res.code == 1){
					self.count = res.data;
				}else{
					self.$api.msg(res.msg);
				}
			});
			self.$http .post(service.api.main.user).then(function(res) {
				if(res.code == 1){
					res = res.data;
					self.user_id = res.id;
					self.nickname = res.nickname;
					self.integral = res.credit2;
					self.identification = res.identification;
					self.account = res.account;
					if(res.is_agent == 0){
						self.qrcode = '';
					}else{
						self.qrcode = '/pages/service/qrcode';
					}
				}else{
					self.$api.msg(res.msg);
				}
			});
		},
		methods: {
			jumper(url) {
				if(url == ''){
					this.$api.msg('当前用户无推广权限');
					return;
				}
				uni.navigateTo({
					url: url
				})
			},
			jump(url) {
				if(url == ''){
					this.$api.msg('该功能暂未开放');
					return;
				}
				uni.navigateTo({
					url: url
				})
			},
			switcher(url) {
				if(url == ''){
					this.$api.msg('该功能暂未开放');
					return;
				}
				uni.switchTab({
					url: url
				})
			},
		}
	}
</script>

<style lang="less">
	page {
		width: 100%;
		height: 100%;
	}

	.header {
		height: 370upx;
		background: url(../../static/user/user.png) no-repeat;
		background-size: 100% 100%;

		.header-left {
			margin-left: 27upx;
			display: flex;
			justify-content: space-between;

			.left-img {
				position: relative;
				display: flex;
				align-items: center;
				margin-top: 80upx;
				margin-left: 20upx;
				image {
					width: 108upx;
					height: 108upx;
					border-radius: 54upx;
					margin-left: 14upx;
				}

				.left-text {
					width: 160upx;
					height: 44upx;
					line-height: 44upx;
					text-align: center;
					position: absolute;
					left: -30upx;
					bottom: 0;
					top: 90upx;
					background-color: #ff594d;
					border-radius: 34upx;
					padding: 0 20upx;

					text {
						color: #FFFFFF;
					}
				}
			}

			.center {
				margin-left: 30upx;
				margin-top: -20upx;
				font-size: 34upx;
				color: #FFFFFF;
			}

			.right {
				align-self: ;
				margin: 20upx 0upx 0 0;
				.rig{
					height: 50upx;
				}
				image {
					width: 48upx;
					height: 48upx;
					float: right;
					margin-right: 40upx;
				}
				.integral{
					/* width: 180upx; */
					color: #FFFFFF;
					line-height: 50upx;
					text-align: center;
					margin-top: 20upx;
					.number{
						font-weight: bold;
						min-width: 120upx;
						font-size: 34upx;
						background: #ff594d;
						border-radius: 26upx 0 0 26upx;
						padding: 0 20upx;
					}
				}
			}
		}

		.header-center {
			display: flex;
			justify-content: space-around;
			color: #FFFFFF;
			margin: 53upx 0 40upx;

			.item-text {
				display: flex;
				flex-direction: column;
				text-align: center;

				.text1 {
					font-size: 36upx;
				}

				.text2 {
					font-size: 22upx;
				}
			}
		}

		.header-botton {
			width: 94%;
			// width:710upx;
			// height:265upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 10upx;
			margin: 60upx auto 0;

			.order {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 22upx 0 20upx 20upx;
				border-bottom: 1px solid #F4F4F4;

				text {
					// margin-left: 20upx;
					color: #333333;
					font-size: 28upx;
					font-weight: bold;
				}

				.order-rigth {
					display: flex;
					justify-content: center;
					line-height: 48upx;
					image {
						width: 48upx;
						height: 48upx;
					}

					text {
						font-size: 24upx;
						color: #999999;
					}
				}
			}

			.mem {
				display: flex;
				justify-content: space-around;

				.mem-box {
					display: flex;
					flex-direction: column;
					margin: 40upx 0 36upx;
					
					image {
						align-self: center;
						width: 60upx;
						height: 60upx;
					}
					.mem-top{
						height: 2upx;
					}
					.mem-num{
						width: 32upx;
						border: 4upx solid #FFFFFF;
						color: #FFFFFF;
						position: relative;
						z-index: 100;
						margin: -10upx;
						font-size: 24upx;
						text-align: center;
						line-height: 32upx;
						border-radius: 20upx;
						background: #e42329;
						float: right;
					}
				}
			}

			.mem-botton {
				flex-wrap: wrap;
				/* margin-bottom: 180upx; */

				.mem-botton-text {
					width: 100%;
					font-size: 28upx;
					color: #333333;
					font-weight: bold;
					margin: 30upx 0 0 24upx;
				}

				display: flex;
				flex-wrap: wrap;

				.mem-box {
					display: flex;
					width: 25%;
					flex-direction: column;
					margin: 20upx 0;

					image {
						align-self: center;
						width: 60upx;
						height: 60upx;
					}

					text {
						text-align: center;
					}
				}
			}
		}
	}
	.cen{
		width: 100%;
		height: 192upx;
		border-radius: 10upx;
		background: #f3f3f3;
	}
</style> 
