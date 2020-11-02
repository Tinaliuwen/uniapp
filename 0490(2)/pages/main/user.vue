<template>
	<view class="container">
		<view class="header">
			<view class="header-left">
				<view class="left-img" @click="jump('/pages/setting/setting')">
					<view>
						<image :src="avatar == '' ? '/static/face.png' : avatar" mode="widthFix"></image>
						<view class="left-text"><text style="color: rgb(187, 111, 74);">{{level}}</text></view>
					</view>
					<view class="center">
						<view>{{nickname}}</view>
						<view class="">{{account}}</view>
						<!-- <view class="wz_shang">上级：123</view> -->
					</view>
				</view>
 
				<view class="right">
					<view class="rig">
						<image src="../../static/icon/set.png" mode="widthFix" @click="jump('/pages/setting/setting')"></image>
					</view>

					<view class="integral" @click="jump('/pages/user/integral')">
						<view class="text">我的余额</view>
						<view class="number">{{integral}}</view>
					</view>
				</view>
			</view>

			<!-- 拍卖订单 -->
			<view class="header-botton">
				<view class="order" @click="jump('/pages/order/order?all=0')">
					<text>订单详情</text>
					<view class="order-rigth">
						<text>查看全部订单</text>
						<image src="../../static/icon/right.png" mode="widthFix"></image>
					</view>
				</view>

				<view class="mem">
					<view class="mem-box" @click="jump('/pages/order/order?id=1&all=0')">
						<view class="mem-top">
							<view class="mem-num" v-if="count.count_1 > 0">{{count.count_1}}</view>
						</view>
						<image class="img" src="../../static/icon/inco_2.png" mode="widthFix"></image>
						<text>待付款</text>
					</view>
					<view class="mem-box" @click="jump('/pages/order/order?id=2&all=0')">
						<view class="mem-top">
							<view class="mem-num" v-if="count.count_6 > 0">{{count.count_6}}</view>
						</view>
						<image class="img" src="../../static/icon/icon_4.png" mode="widthFix"></image>
						<text>待审核</text>
					</view>
					<view class="mem-box" @click="jump('/pages/order/order?id=3&all=0')">
						<view class="mem-top">
							<view class="mem-num" v-if="count.count_7 > 0">{{count.count_7}}</view>
						</view>
						<image class="img" src="../../static/icon/icon_3.png" mode="widthFix"></image>
						<text>待上架</text>
					</view>
					<view class="mem-box" @click="jump('/pages/order/order?id=4&all=0')">
						<view class="mem-top">
							<view class="mem-num" v-if="count.count_8 > 0">{{count.count_8}}</view>
						</view>
						<image class="img" src="../../static/icon/icon_15.png" mode="widthFix"></image>
						<text>出售中</text>
					</view>
					<view class="mem-box" @click="jump('/pages/order/order?id=5&all=0')">
						<view class="mem-top">
							<view class="mem-num" v-if="count.count_9 > 0">{{count.count_9}}</view>
						</view>
						<image class="img" src="../../static/icon/6.png" mode="widthFix"></image>
						<text>待收款</text>
					</view>
				</view>

				<view class="" style="width: 100%; height: 20upx; background-color: #F4F4F4;"></view>
				<!-- 我的订单 -->
				<view class="order" @click="jump('/pages/order/ordertwo?all=1')">
					<text>我的订单</text>
					<view class="order-rigth">
						<text>查看全部订单</text>
						<image src="../../static/icon/right.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="mem">
					<view class="mem-box" @click="jump('/pages/order/ordertwo?id=1&all=1')">
						<view class="mem-top">
							<view class="mem-num" v-if="count.count_2 > 0">{{count.count_2}}</view>
						</view>
						<image src="../../static/icon/icon_1.png" mode="widthFix"></image>
						<text>待发货</text>
					</view>
					<view class="mem-box" @click="jump('/pages/order/ordertwo?id=2&all=1')">
						<view class="mem-top">
							<view class="mem-num" v-if="count.count_3 > 0">{{count.count_3}}</view>
						</view>
						<image src="../../static/icon/icon_5.png" mode="widthFix"></image>
						<text>待收货</text>
					</view>
					<view class="mem-box" @click="jump('/pages/order/ordertwo?id=3&all=1')">
						<view class="mem-top">
							<view class="mem-num" v-if="count.count_4 > 0">{{count.count_4}}</view>
						</view>
						<image src="../../static/icon/icon_16.png" mode="widthFix"></image>
						<text>已完成</text>
					</view>
					<!-- <view class="mem-box" @click="jump('/pages/order/ordertwo?id=4&all=1')">
						<view class="mem-top">
							<view class="mem-num" v-if="count.count_10 > 0">{{count.count_10}}</view>
						</view>
						<image src="../../static/icon/icon_9.png" mode="widthFix"></image>
						<text>去发货</text>
					</view> -->
				</view>
				<view class="" style="width: 100%; height: 20upx; background-color: #F4F4F4;"></view>
				<view class="mem-botton">
					<text class="mem-botton-text">常用功能</text>
					<view class="mem">
						<!-- <view class="mem-box" @click="shou" v-if="rantaut == false" style="cursor:pointer">
							<a :href="this.aliyunsq"  style='text-align: center; width: 100%;line-height:1.5;color: #000000;'>
								<image src="../../static/icon/icon_17.png" mode="widthFix"></image>
								<text style="width: 100%;display: inline-block;">支付宝授权</text>
							</a>
						</view> -->
						<view class="mem-box" @click="shou" style="cursor:pointer">
							<image src="../../static/icon/icon_17.png" mode="widthFix"></image>
							<text style="width: 100%;display: inline-block;">支付宝授权</text>
						</view>
						
						<view class="mem-box" @click="jump('/pages/newPeople/neworder')">
							<image src="../../static/icon/icon_14.png" mode="widthFix"></image>
							<text>新人订单</text>
							<!-- <image class="mem-right" src="../../static/img/right.png" mode=""></image> -->
						</view> 
						<view class="mem-box" @click="jump('/pages/main/appeal')">
							<image src="../../static/icon/icon_10.png" mode="widthFix"></image>
							<text>我的申诉</text>
							<!-- <image class="mem-right" src="../../static/img/right.png" mode=""></image> -->
						</view>
 
						<view class="mem-box" @click="jumper(qrcode)">
							<image src="../../static/icon/icon_13.png" mode="widthFix"></image>
							<text>我的推广</text>
							<!-- <image class="mem-right" src="../../static/img/right.png" mode=""></image> -->
						</view> 
						<view class="mem-box" @click="jump('/pages/main/distribution')">
							<image src="../../static/icon/icon_12.png" mode="widthFix"></image>
							<text>收款信息</text>
							<!-- <image class="mem-right" src="../../static/img/right.png" mode=""></image> -->
						</view>
						<view class="mem-box" @click="jump('/pages/service/service')">
							<image src="../../static/icon/icon_8.png" mode="widthFix"></image>
							<text>联系客服</text>
							<!-- <image class="mem-right" src="../../static/img/right.png" mode=""></image> -->
						</view>
						<view class="mem-box" @click="jump('/pages/order/address')">
							<image src="../../static/icon/icon_7.png" mode="widthFix"></image>
							<text>地址管理</text>
							<!-- <image class="mem-right" src="../../static/img/right.png" mode=""></image> -->
						</view>
						
						<view class="mem-box" @click="jump('/pages/service/collect')">
							<image src="../../static/icon/icon_11.png" mode="widthFix"></image>
							<text>我的收藏</text>
							<!-- <image class="mem-right" src="../../static/img/right.png" mode=""></image> -->
						</view>
					</view>

				</view>

				<view style="height: 160upx; background: #F2F2F2;"></view>
			</view>
		</view>

	</view>
</template>

<script>
	import service from '@/store/service.js';
	export default {
		data() {
			return {
				avatar: '',
				level: '',
				aliyunsq:'',
				nickname: '',
				integral: '0.00',
				identification: '',
				account: '',
				user_id: 0,
				count: '',
				wz_name:'',
				qrcode: '',
				rantaut:''
			}
		},
		onShow: function() {
			var self = this;
			self.$http.post(service.api.service.member).then(function(res) {
				
				if (res.code == 1) {
					res = res.data;
					// self.avatar = res.avatar;
				} else {
					self.$api.msg(res.msg);
				}
			});
			self.$http.post(service.api.main.number).then(function(res) {
				console.log(5555);
				if (res.code == 1) {
					self.count = res.data;
				} else {
					self.$api.msg(res.msg);
				}
			});
			self.$http.post(service.api.main.user).then(function(res) {
				
				if (res.code == 1) {
					res = res.data;
					self.user_id = res.id;
					if (res.level_name == null) {
						self.level = '默认等级';
					} else {
						self.level = res.level_name;
					}
					self.avatar = res.avatar;
					self.nickname = res.nickname;
					// if(self.nickname == undefined ){
					// 	self.$api.msg('请先登录绑定');
					// 	setTimeout(function() {
					// 		uni.reLaunch({
					// 			url: '/pages/login/bind'
					// 		})
					// 	}, 1500); 
					// }
					self.wz_name = res.name;
					self.aliyunsq = res.aliyunsq
					self.integral = res.credit2;
					self.rantaut = res.rantaut;
					self.identification = res.identification;
					self.account = res.account;
					if (res.is_agent == 0) {
						self.qrcode = '';
					} else {
						self.qrcode = '/pages/service/qrcode';
					}
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
		methods: {
			jumper(url) {
				if (url == '') {
					this.$api.msg('当前用户无推广权限');
					return;
				}
				uni.navigateTo({
					url: url
				})
			},
			jump(url) {
				if (url == '') {
					this.$api.msg('该功能暂未开放');
					return;
				}
				uni.navigateTo({
					url: url
				})
			},
			shou(){
				var self =this;
				// var url = 'alipays://platformapi/startapp?appId=20000067&url=https%3A%2F%2Fopenauth.alipay.com%2Foauth2%2FpublicAppAuthorize.htm%3Fapp_id%3D2021001197619025%26scope%3Dauth_user%26redirect_uri%3Dhttp%3A%2F%2F0532.nethhw168.com%2Fapi%2Fslogling'
				if(self.rantaut == false){
					
					// #ifdef H5
					uni.setClipboardData({
						data: 'http://www.sz-photography.cn/h5/#/pages/login/login',
						success: function(res) {
							uni.showToast({
								icon: 'none',
								title: '已复制链接请退出打开浏览器粘贴打开',
								duration:4000
							})
						}
					});
					window.location.href = self.aliyunsq  
					// #endif
					
					// #ifdef APP-PLUS
					 plus.runtime.openURL(this.aliyunsq)
					// #endif
					
				}else{
					self.$api.msg('您已授权!'); 
				}
				
				// window.location.href = self.aliyunsq  
				// var self =this;
				// self.$http.post(service.api.order.dsadsdsad).then(function(res) {
				// 	if (res.code == 1) {
				// 		
				// 	} else {
				// 		self.$api.msg(res.info);
				// 	}
				// });
				
			},
			switcher(url) {
				if (url == '') {
					this.$api.msg('该功能暂未开放');
					return;
				}
				uni.switchTab({
					url: url
				})
			},
		},
		// onReachBottom(){
		// 		uni.showToast({
		// 			image:'../../static/img/shipping.png',
		// 			title:"亲~已经到底了",
		// 			duration:2000
		// 		})

		// }
	}
</script>

<style lang="less">
	page {
		width: 100%;
		height: 100%; 
	}
	.savatar{
		color: #08C11D;
	}
	.aavatar{
		color: #0D7ABF;
	}
	/deep/uni-tabbar {
		display: block !important;
	}
	.mem-box text {
		font-size: 24rpx;
	}
	.header {
		height: 370upx;
		background: url(../../static/user/set.png) no-repeat;
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
					width: 100upx !important;
					height: 100upx !important;
					border-radius: 50%;
					margin-left: 14upx;
					border: 4rpx solid #fff;
				}

				.left-text {
					width: 180upx;
					height: 44upx;
					line-height: 44upx;
					text-align: center;
					position: absolute;
					left: -20upx;
					bottom: 0;
					top: 90upx;
					background-color: #FCDB87;
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
				.wz_shang {
					// position: absolute;
					// bottom: -12px;
					// right: -8px;
					// font-size: 17px;
				}
			}

			.right {
				align-self: ;
				margin: 20upx 0upx 0 0;

				.rig {
					height: 50upx;
				}

				image {
					width: 48upx;
					height: 48upx;
					float: right;
					margin-right: 40upx;
				}

				.integral {
					/* width: 180upx; */
					color: #FFFFFF;
					line-height: 50upx;
					text-align: center;
					margin-top: 20upx;

					.number {
						font-weight: 600;
						min-width: 60px;
						font-size: 17px;
						color: #F73D31;
						background: #FEE1DF;
						border-radius: 13px 0 0 13px;
						padding: 0 10px;
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
				padding: 30upx 0 20upx 20upx;
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
				flex-wrap: wrap;
				justify-content: space-around;

				.mem-box {
					display: flex;
					line-height:2;
					flex-direction: column;
					margin: 32rpx 0 22rpx;

					image {
						align-self: center;
						width: 60upx;
						height: 60upx;
					}
					.img {
						width: 70upx;
						height: 70upx;
					}
					.mem-top {
						height: 2upx;
					}

					.mem-num {
						width: 40upx;
						border: 4upx solid #FFFFFF;
						color: #FFFFFF;
						position: relative;
						z-index: 100;
						margin: -10upx;
						font-size: 24upx;
						text-align: center;
						line-height: 30upx;
						border-radius: 20upx;
						background: #e42329;
						float: right;
					}
				}
			}

			.mem-botton {
				flex-wrap: wrap;

				// margin-top: 40rpx;
				/* margin-bottom: 180upx; */
				.mem-botton-text {
					width: 100%;
					font-weight: bold;
					font-size: 30rpx;
					color: #333333;
					margin: 30rpx 0rpx 0rpx 0rpx;
					padding-left: 24rpx;
					padding-bottom: 12rpx;
					// border-bottom: 2rpx solid rgb(245, 245, 245);
				}

				display: flex;
				flex-wrap: wrap;

				.mem-box {
					display: -webkit-flex;
					display: flex;
					width: 25%;
					-webkit-box-orient: vertical;
					-webkit-box-direction: normal;
					padding: 10rpx;
					line-height: 60rpx;
					margin: 0px;
					margin-top: 12rpx;

					.mem-right {
						position: absolute;
						right: 20px;
					}

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

	.cen {
		width: 100%;
		height: 192upx;
		border-radius: 10upx;
		background: #f3f3f3;
	}
</style>
