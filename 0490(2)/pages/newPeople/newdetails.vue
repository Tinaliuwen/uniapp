<template>
	<div class="container">
		<view class="top" v-if="order_no != ''">
			<image src="/static/order/pay.png" class="o-img"></image>
			<!-- <image src="/static/order/delivery.png" class="o-img"></image> -->
			<!-- <image src="/static/order/comment.png"  class="o-img"></image> -->
			<!-- <image src="/static/order/delivery2.png"  class="o-img"></image> -->
			
			<view  class="wzorder">
				<block>订单已完成</block>
			</view>


			<view class="money">
				订单金额：
				<block>￥{{realprice}}</block>
				<!-- {{realprice}} -->
			</view>
		</view>

		<view class="li-top" v-if="name  != ''">
			<image src="../../static/icon/store.png" mode="widthFix"></image>
			<view class="li-center">收货人信息</view>
		</view>

		<view class="wrapper" v-if="name  != ''">
			<view class="u-box">
				<text class="name">收货人：{{name}}</text>
				<text class="mobile">{{phone}}</text>
			</view>

			<view class="address-box">
				<text class="address">收货地址：{{province}} {{city}} {{area}} {{address}}</text>
			</view>
		</view>


		<view class="li-top" v-if="express_info.length > 0" @click="express()">
			<image src="../../static/icon/store.png" mode="widthFix"></image>
			<view class="li-center">物流信息</view>
			<uni-icons size="20" type="forward" class="top-icon"></uni-icons>
		</view>

		<view class="express" v-if="express_info.length > 0">
			<view class="exp-top">{{exp_text}}</view>
			<view class="exp-time">{{exp_time}}</view>
		</view>

		<view class="li-top" v-if="goodsList.length > 0">
			<image src="../../static/icon/store.png" mode="widthFix"></image>
			<view class="li-center">订单详情</view>
		</view>

		<view class="li" v-if="goodsList.length > 0">
			<view class="li-cen" v-for="(li,idx) in goodsList" :key="idx" :style="idx > 0 ? 'border-top: 2upx solid #F2F2F2;' : ''">
				<image :src="li.logo" mode="" class="cen-img"></image>
				<view class="cen-right">
					<view class="clamps title">{{li.title}}</view>
					<view class="price">
						<text style="color: #808080;float: right;">共1件</text>
					</view>
					<view class="price spec">
						价格：{{realprice}}
					</view>
				</view>
			</view>

			<!-- <view class="remark">备注：{{remark}}</view> -->
		</view>

		<view class="shop_price" v-if="order_no != ''">
			<view>商品小计：
				<text>￥{{realprice}}</text>
			</view>
			<view v-if="type != 3">订单总额：<text>￥{{realprice}}</text></view>
		</view>

		<view class="order" v-if="order_no != ''">
			<view class="type">订单单号：{{order_no}}<text class="copy" @click="copy(order_no)">复制</text></view>
			<view class="type">创建时间：{{create_at}}</view>
			
		
		<!-- 	<view class="wrap">
				<view>上传付款凭证：</view>
				<view class="u-avatar-wrap">
					<image class="u-avatar-demo" @click="per_pay" :src="avatar_pay"></image>
				</view>
				<text class="up_zfb" @click="up_pay">上传</text>
			</view> -->
		</view>
	</div>
</template>

<script>
	import service from '@/store/service.js';
	export default {
		components: {},
		data() {
			return {
				id: 0,
				show_zfb:true,
				show_wx:true,
				seller: '小七',
				zfb: '1588886435334',
				province: '',
				city: '',
				area: '',
				address: '',
				name: '',
				phone: '',
				pay_state: '',
				goodsList: [],
				goods_logo: '',
				goods_title: '',
				number_goods: '',
				price_selling: '',
				priceselling: '0.00',
				priceexpress: '0.00',
				realprice: '0.00',
				remark: '',
				order_no: '',
				create_at: '',
				pay_no: '',
				pay_at: '',
				cancel_at: '',
				cancel_desc: '',
				refund_no: '',
				refund_price: '',
				refund_at: '',
				refund_desc: '',
				express_send_no: '',
				express_send_at: '',
				express_info: [],
				status: -1,
				exp_text: '',
				exp_time: '',
				refund_state: '',
				type: 0,
				money: '',
				score: '',
				credit: '',
				avatar: '',
				avatar_wx: '',
				avatar_pay: '',
				zf_img: '',
				zf_imgwx: '',
				zf_imgpay: '',
				img_status:1,
				status_zfb: 1,
				status_wx: 1
			}
		},
		onLoad: function(e) {
			var self = this;
			self.avatar = uni.getStorageSync('storage_img');
			self.avatar_wx = uni.getStorageSync('storage_imgwx');
			self.avatar_pay = uni.getStorageSync('storage_imgpay');
			// console.log(self.avatar_wx,self.avatar);
			// if(self.avatar == underfind){
			// 	self.img_status = 0;
			// }
			// if(self.avatar_wx !=' '){
			// 	self.show_wx = !self.show_wx
			// }
			self.zf_imgpay = uni.getStorageSync('storage_setimgpay');
			self.zf_img = uni.getStorageSync('storage_setimg');
			self.zf_imgwx = uni.getStorageSync('storage_setimgwx');
			self.money = service.config.money;
			self.score = service.config.score;
			self.id = e.orderid;
			self.$http.post(service.api.order.getNewOrdeail, {
				'order_id': e.orderid
			}).then(function(res) {
				if (res.code == 1) {
					res = res.data;
					self.province = res.express_province;
					self.city = res.express_city;
					self.area = res.express_area;
					self.address = res.express_address;
					self.name = res.express_name;
					self.phone = res.express_phone;
					self.goodsList = res.allGoods;
					self.credit = res.credit;
					self.priceselling = res.price_goods;
					self.priceexpress = res.price_express;
					self.realprice = res.pay_price;
					self.remark = res.remark;
					self.order_no = res.order_no;
					self.create_at = res.create_at;
					self.pay_no = res.pay_no;
					self.pay_at = res.pay_at;
					self.cancel_at = res.cancel_at;
					self.cancel_desc = res.cancel_desc;
					self.refund_no = res.refund_no;
					self.refund_price = res.refund_price;
					self.refund_at = res.refund_at;
					self.refund_desc = res.refund_desc;
					self.express_send_no = res.express_send_no;
					self.express_send_at = res.express_send_at;
					self.status = res.status;
					self.pay_state = res.pay_state;
					self.refund_state = res.refund_state;
					self.type = res.type;
				} else {
					uni.showToast({
						icon: 'none',
						title: res.info
					});
				}
			});
			self.$http.post(service.api.order.express, {
				'order_id': e.id
			}).then(function(res) {
				if (res.code == 1) {
					res = res.data;
					self.express_info = res.express_info;
				} else {
					uni.showToast({
						icon: 'none',
						title: res.info
					});
				}
			});
		},
		methods: {
			copy(url) {
				uni.setClipboardData({
					data: url,
					success: function(res) {
						uni.showToast({
							icon: 'none',
							title: '复制成功'
						})
					}
				});
			},	
		}
	}
</script>

<style lang='scss' scoped>
	page {
		background: #F2F2F2;
	}
	.wzorder {
		font-size: 40rpx;
		margin-top: 50rpx;
	}
	.container {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		flex: 1;
	}

	.top {
		color: #FFFFFF;
		height: 200upx;
		font-size: 30upx;
		padding: 0 40upx;
		/* text-align: center; */
		margin-bottom: 20upx;
		background: #f85a5e;
	}

	.o-img {
		float: right;
		width: 240upx;
		height: 140upx;
		margin: 30upx 0;
	}
	.wz_border{
		width: 105%;
		margin-left: -2.5%;
		margin-top: 20rpx;
		background: rgb(242, 242, 242);
		height: 20rpx;
	}
	.status {
		margin-top: 50upx;
		text-indent: bold;
		font-size: 44upx;
		height: 60upx;
		line-height: 60upx;
	}

	.money {
		margin-top: 20upx;
	}

	.seller {
		background: white;
		margin-top: 20rpx;
		/* padding: 20rpx; */
		line-height: 42rpx;
		.wz_rev{
			width: 100%;
			position: relative;
		}
		.wz_right {
			display: initial;
			position: absolute;right: 0px;
		}
	}
	.wrap{
		display: flex;
		height: 90rpx;
		line-height: 90rpx;
		position: relative;
		.u-avatar-wrap {
			position: absolute;
			right: 0px;
		}
		
		.u-avatar-demo {
			width: 60rpx;
			height: 60rpx;
		}
		
		.updateT {
			width: 30%;
			height: 64rpx;
			border-radius: 40rpx;
			line-height: 64rpx;
			background: none;
			font-size: 28rpx;
			color: #7e7e7e;
			border: 2rpx solid #7e7e7e;
		}
		.up_zfb{
			color: #818181;
			height: 40rpx;
			line-height: 40rpx;
			margin-top: 24rpx;
			padding: 0 20rpx;
			/* margin-left: 30rpx; */
			border-radius: 30rpx;
			border: 2rpx solid #818181;
		}
		
	}
	
	.address-box {
		margin-top: 20upx;
		display: flex;
		align-items: center;

		.tag {
			font-size: 24upx;
			color: #f85a5e;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #f85a5e;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}

		.address {
			padding-right: 10upx;
			font-size: 28upx;
			color: #909399;
		}
	}

	.wrapper,
	.express {
		border-top: 2upx solid #F1F1F1;
		background: #FFFFFF;
		margin-bottom: 20upx;
		padding: 0 20upx 20upx;
	}

	.exp-top {
		color: #f85a5e;
	}

	.exp-time {
		color: #888888;
		font-size: 28upx;
	}

	.u-box {
		font-size: 30upx;
		color: #303133;
		margin: 10upx 0;

		.name {
			margin-right: 30upx;
		}
	}

	.icon-bianji {
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: #909399;
		padding-left: 30upx;
	}

	.add-btn {
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: #f85a5e;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

	.swiper-box {
		height: 100%;
	}

	.list-scroll-content {
		height: 100%;
	}

	.center {
		width: 100%;
		height: 100%;
		z-index: 120;
		padding-top: 80upx;
		position: absolute;
	}

	/* .list{
		margin-bottom: 100upx;
	} */
	.li {
		background: #FFFFFF;
		/* border-radius: 20upx; */
		padding: 0 0 20upx;
		margin-bottom: 20upx;
		/* margin: 0 20upx; */
		/* box-shadow: 0px 0px 5px #D3D3D3; */
	}

	.li-top {
		background: #FFFFFF;
		font-size: 28upx;
		padding: 20upx;
		display: flex;
	}

	.li-top image {
		width: 30upx;
		height: 30upx;
		margin: 4upx;
	}

	.li-center {
		width: calc(100% - 70upx);
	}

	.li-right {
		width: 120upx;
		color: #f85a5e;
		text-align: right;
	}

	.li-cen {
		display: flex;
		margin: 0 20upx;
		padding: 10upx 0;
		border-top: 2upx solid #F1F1F1;
	}

	.cen-img {
		width: 160upx;
		height: 160upx;
	}

	.cen-right {
		padding: 0upx 20upx;
		padding-right: 0;
		width: calc(100% - 180upx);
	}

	.title {
		height: 80upx;
		font-size: 28upx;
		line-height: 40upx;
	}

	.clamps {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.price {
		color: #808080;
		font-size: 28upx;
		line-height: 40upx;

		text {
			color: #F53F3F;
			/* float: right; */
		}
	}

	.spec {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}

	.li-bum {
		height: 120upx;
		background: #fff;
		padding: 10upx 0;
		border-top: 20upx solid #F2F2F2;
	}

	.btn-left,
	.btn-right {
		float: right;
		width: 180upx;
		height: 50upx;
		text-align: center;
		line-height: 50upx;
		margin-right: 20upx;
		border-radius: 30upx;
	}

	.btn-left {
		font-size: 28upx;
		color: #7e7e7e;
		margin-top: 16rpx;
		border: 2upx solid #7e7e7e;
	}

	.btn-right {
		font-size: 28upx;
		color: #f85a5e;
		border: 2upx solid #f85a5e;
	}

	.remark {
		font-size: 28upx;
		padding: 20upx 20upx 0;
		border-top: 2upx solid #F1F1F1;
	}

	.shop_price {
		width: 100%;
		height: 183rpx;
		line-height: 50upx;
		box-sizing: border-box;
		padding: 0 20rpx;
		display: flex;
		margin-bottom: 20upx;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		background: #FFFFFF;
		border-bottom: 2rpx solid #F2F2F2;
	}

	.shop_price view {
		width: 100%;
		color: #333333;
		font-size: 28rpx;
	}

	.shop_price text {
		float: right;
		padding-left: 10rpx;
		color: #F53F3F;
		font-size: 28rpx;
	}

	.order {
		font-size: 28upx;
		padding: 20upx;
		line-height: 50upx;
		background: #FFFFFF;
	}

	.top-icon {
		float: right;
	}

	.copy {
		color: #333;
		padding: 0 20upx;
		background: #ebebeb;
		margin-left: 30upx;
		border-radius: 30upx;
	}
</style>
