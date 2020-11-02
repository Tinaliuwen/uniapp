<template>
	<view class="review">
		<!-- 已取消 -->
		<view class="state" v-if="status == -1"></view>
		<!-- 待付款 -->
		<view v-if="status == 0">
			<view class="state">
				<view>
					<view class="success">待付款</view>
					<view class="total-price">订单金额：{{ orderDetail.groupsprice }} 元</view>
				</view>
				<image class="pay-img" src="../../static/order/pay.png" mode=""></image>
			</view>
			<view class="content">
				<view class="center">
					<image class="icon" src="../../static/img/location.png" mode=""></image>
					<view class="container">
						<view class="text">
							<view class="name">{{ address.username }}</view>
							<view>{{ address.mobile }}</view>
						</view>
						<view class="address">{{ address.addressList }}</view>
					</view>
				</view>

				<image class="right" src="../../static/img/right.png" mode=""></image>
			</view>
			<view class="order-center" @click="jump(orderDetail.goodsid)">
				<view class="img"><image class="order-img" src="../../static/order/pic.png" mode=""></image></view>
				<view class="center-right">
					<view class="title">{{ orderDetail.title }}</view>
					<view class="detail">
						<view class="detail-price">￥{{ orderDetail.groupsprice }}</view>
						<view class="detail-num">x1</view>
					</view>
				</view>
			</view>
			<view class="content-center">
				<view class="price">
					<view class="price-text">订单总价（含运费）</view>
					<view class="price-text">￥{{ orderDetail.groupsprice }}</view>
				</view>
				<view class="price" style="margin: 10upx 0;">
					<view class="price-text">运费</view>
					<view class="price-text">￥{{ orderDetail.freight }}</view>
				</view>
				<view class="price" v-if="orderDetail.discount != 0.0">
					<view class="price-text">商品优惠</view>
					<view class="price-text">-￥{{ orderDetail.discount }}</view>
				</view>
				<view class="total">
					<view class="total-text">实付款</view>
					<view class="total-price-right">￥{{ orderDetail.price }}</view>
				</view>
			</view>
			<view class="order-bottom">
				<view class="time" style="color: #333;">订单编号： {{ orderDetail.orderno }}</view>
				<view class="time" style="color: #333;">创建时间： {{ orderDetail.createtime }}</view>
				<view class="bottom">
					<view class="back" @click="jumpUrl('/pages/order/address')">修改地址</view>
					<view class="back" @click="cancel(orderDetail.id)">取消订单</view>
					<view class="warn" @click="joinGroup(orderDetail.id)">去参团</view>
				</view>
			</view>
		</view>
		<!-- 已付款 -->
		<view v-if="status == 1">
			<view class="state">
				<view>
					<view class="success">已付款</view>
					<view class="total-price">订单金额 : {{ orderDetail.groupsprice }} 元</view>
				</view>
				<image class="pay-img1" src="../../static/order/pay1.png" mode=""></image>
			</view>
			<view class="content">
				<view class="center">
					<image class="icon" src="../../static/img/location.png" mode=""></image>
					<view class="container">
						<view class="text">
							<view class="name">{{ address.username }}</view>
							<view>{{ address.mobile }}</view>
						</view>
						<view class="address">{{ address.addressList }}</view>
					</view>
				</view>

				<image class="right" src="../../static/img/right.png" mode=""></image>
			</view>

			<!-- <view class="group-info">
				<view>参团信息</view>
				<view class="info-list">
					<view class="group-img">
						<image src="../../static/img/avatar.png" mode=""></image>
						<image src="../../static/img/avatar.png" mode=""></image>
						<image src="../../static/img/avatar.png" mode=""></image>
						<image src="../../static/img/avatar.png" mode=""></image>
					</view>
					<view class="group-more">
						··· 共87人参团
						<image src="../../static/icon/right.png" mode=""></image>
					</view>
				</view>
				<view class="start">
					<text>100人</text>
					成团，还需
					<text>36人</text>
					即可开团
				</view>
				<view class="invite">
					<image src="../../static/img/wx.png" mode=""></image>
					邀请微信群好友一起成团
				</view>
			</view> -->

			<view class="order-center" @click="jump(orderDetail.goodsid)">
				<view class="img"><image class="order-img" :src="orderDetail.thumb" mode=""></image></view>
				<view class="center-right">
					<view class="title">{{ orderDetail.title }}</view>
					<view class="detail">
						<view class="detail-price">￥{{ orderDetail.groupsprice }}</view>
						<view class="detail-num">x1</view>
					</view>
				</view>
			</view>
			<view class="content-center">
				<view class="price">
					<view class="price-text">订单总价（含运费）</view>
					<view class="price-text">￥{{ orderDetail.groupsprice }}</view>
				</view>
				<view class="price" style="margin: 10upx 0;">
					<view class="price-text">运费</view>
					<view class="price-text">￥{{ orderDetail.freight }}</view>
				</view>
				<view class="price" v-if="orderDetail.discount != 0.0">
					<view class="price-text">商品优惠</view>
					<view class="price-text">-￥{{ orderDetail.discount }}</view>
				</view>
				<view class="total">
					<view class="total-text">实付款</view>
					<view class="total-price-right">￥{{ orderDetail.price }}</view>
				</view>
			</view>
			<view class="order-bottom">
				<view class="time" style="color: #333;">订单编号： {{ orderDetail.orderno }}</view>
				<view class="time" style="color: #333;">创建时间： {{ orderDetail.createtime }}</view>
				<!-- <view class="time">订单编号：SH20200214578963548</view> -->
				<!-- <view class="time">创建时间：2020-11-22 11:46</view> -->
				<view class="bottom"><view class="warn">邀请好友</view></view>
			</view>
		</view>
		<!-- 待发货 -->
		<view v-if="status == 2">
			<view class="state">
				<view>
					<view class="success">待发货</view>
					<view class="total-price">收货信息已提交，请耐心等待</view>
				</view>
				<image class="pay-img" src="../../static/order/delivery.png" mode=""></image>
			</view>
			<view class="content">
				<view class="center">
					<image class="icon" src="../../static/img/location.png" mode=""></image>
					<view class="container">
						<view class="text">
							<view class="name">{{ address.username }}</view>
							<view>{{ address.mobile }}</view>
						</view>
						<view class="address">{{ address.addressList }}</view>
					</view>
				</view>

				<image class="right" src="../../static/img/right.png" mode=""></image>
			</view>
			<view class="order-center" @click="jump(orderDetail.goodsid)">
				<view class="img"><image class="order-img" :src="orderDetail.thumb" mode=""></image></view>
				<view class="center-right">
					<view class="title">{{ orderDetail.title }}</view>
					<view class="detail">
						<view class="detail-price">￥{{ orderDetail.groupsprice }}</view>
						<view class="detail-num">x1</view>
					</view>
				</view>
			</view>
			<view class="content-center">
				<view class="price">
					<view class="price-text">订单总价（含运费）</view>
					<view class="price-text">￥{{ orderDetail.groupsprice }}</view>
				</view>
				<view class="price" style="margin: 10upx 0;">
					<view class="price-text">运费</view>
					<view class="price-text">￥{{ orderDetail.freight }}</view>
				</view>
				<view class="price" v-if="orderDetail.discount != 0.0">
					<view class="price-text">商品优惠</view>
					<view class="price-text">-￥{{ orderDetail.discount }}</view>
				</view>
				<view class="total">
					<view class="total-text">实付款</view>
					<view class="total-price-right">￥{{ orderDetail.price }}</view>
				</view>
			</view>
			<view class="order-bottom">
				<view class="time" style="color: #333;">订单编号： {{ orderDetail.orderno }}</view>
				<view class="time" style="color: #333;">创建时间： {{ orderDetail.createtime }}</view>
				<!-- <view class="time">订单编号：SH20200214578963548</view> -->
				<!-- <view class="time">创建时间：2020-11-22 11:46</view> -->
				<view class="bottom"><view class="warn">提醒发货</view></view>
			</view>
		</view>
		<!-- 未中标 -->
		<view v-if="status == 3">
			<view class="state">
				<view>
					<view class="success">未中标</view>
					<view class="total-price">订单金额 : {{ orderDetail.groupsprice }} 元</view>
				</view>
				<image class="pay-img" src="../../static/order/not.png" mode=""></image>
			</view>
			<view class="content">
				<view class="center">
					<image class="icon" src="../../static/img/location.png" mode=""></image>
					<view class="container">
						<view class="text">
							<view class="name">{{ address.username }}</view>
							<view>{{ address.mobile }}</view>
						</view>
						<view class="address">{{ address.addressList }}</view>
					</view>
				</view>

				<image class="right" src="../../static/img/right.png" mode=""></image>
			</view>

			<!-- <view class="group-info">
					<view>参团信息</view>
					<view class="info-list">
						<view class="group-img">
							<image src="../../static/img/avatar.png" mode=""></image>
							<image src="../../static/img/avatar.png" mode=""></image>
							<image src="../../static/img/avatar.png" mode=""></image>
							<image src="../../static/img/avatar.png" mode=""></image>
						</view>
						<view class="group-more">
							··· 共87人参团
							<image src="../../static/icon/right.png" mode=""></image>
						</view>
					</view>
					<view class="start">
						<text>100人</text>
						成团，还需
						<text>36人</text>
						即可开团
					</view>
					<view class="invite">
						<image src="../../static/img/wx.png" mode=""></image>
						邀请微信群好友一起成团
					</view>
				</view> -->

			<view class="order-center" @click="jump(orderDetail.goodsid)">
				<view class="img"><image class="order-img" :src="orderDetail.thumb" mode=""></image></view>
				<view class="center-right">
					<view class="title">{{ orderDetail.title }}</view>
					<view class="detail">
						<view class="detail-price">￥{{ orderDetail.groupsprice }}</view>
						<view class="detail-num">x1</view>
					</view>
				</view>
			</view>
			<view class="content-center">
				<view class="price">
					<view class="price-text">订单总价（含运费）</view>
					<view class="price-text">￥{{ orderDetail.groupsprice }}</view>
				</view>
				<view class="price" style="margin: 10upx 0;">
					<view class="price-text">运费</view>
					<view class="price-text">￥{{ orderDetail.freight }}</view>
				</view>
				<view class="price" v-if="orderDetail.discount != 0.0">
					<view class="price-text">商品优惠</view>
					<view class="price-text">-￥{{ orderDetail.discount }}</view>
				</view>
				<view class="total">
					<view class="total-text">实付款</view>
					<view class="total-price-right">￥{{ orderDetail.price }}</view>
				</view>
			</view>
			<view class="order-bottom">
				<view class="time">
					<text>订单编号：</text>
					{{ orderDetail.orderno }}
				</view>
				<view class="time">
					<text>创建时间：</text>
					{{ orderDetail.createtime }}
				</view>
				<!-- <view class="time">订单编号：SH20200214578963548</view> -->
				<!-- <view class="time">创建时间：2020-11-22 11:46</view> -->
				<view class="bottom"><view class="warn" @click="jumpUrl('/pages/groupShopping/groupShopping')">继续拼团</view></view>
			</view>
		</view>
		<!-- 已发货 -->
		<view v-if="status == 4">
			<view class="state">
				<view>
					<view class="success">待收货</view>
					<view class="total-price">订单金额 : {{ orderDetail.groupsprice }} 元</view>
				</view>
				<image class="pay-img" src="../../static/order/delivery2.png" mode=""></image>
			</view>
			<!-- <view class="content">
				<view class="center">
					<image class="icon" src="../../static/order/delivery1.png" mode=""></image>
					<view class="container">
						<view class="text"><view class="message">您已提交订单，请等待物流信息更新</view></view>
						<view class="update-time">更新时间：{{orderDetail.sendtime}}</view>
					</view>
				</view>

				<image class="right" src="../../static/img/right.png" mode=""></image>
			</view> -->
			<view class="content">
				<view class="center">
					<image class="icon" src="../../static/img/location.png" mode=""></image>
					<view class="container">
						<view class="text">
							<view class="name">{{ address.username }}</view>
							<view>{{ address.mobile }}</view>
						</view>
						<view class="address">{{ address.addressList }}</view>
					</view>
				</view>

				<image class="right" src="../../static/img/right.png" mode=""></image>
			</view>
			<view class="order-center" @click="jump(orderDetail.goodsid)">
				<view class="img"><image class="order-img" :src="orderDetail.thumb" mode=""></image></view>
				<view class="center-right">
					<view class="title">{{ orderDetail.title }}</view>
					<view class="detail">
						<view class="detail-price">￥{{ orderDetail.groupsprice }}</view>
						<view class="detail-num">x1</view>
					</view>
				</view>
			</view>
			<view class="content-center">
				<view class="price">
					<view class="price-text">订单总价（含运费）</view>
					<view class="price-text">￥{{ orderDetail.groupsprice }}</view>
				</view>
				<view class="price" style="margin: 10upx 0;">
					<view class="price-text">运费</view>
					<view class="price-text">￥{{ orderDetail.freight }}</view>
				</view>
				<view class="price" v-if="orderDetail.discount != 0.0">
					<view class="price-text">商品优惠</view>
					<view class="price-text">-￥{{ orderDetail.discount }}</view>
				</view>
				<view class="total">
					<view class="total-text">实付款</view>
					<view class="total-price-right">￥{{ orderDetail.price }}</view>
				</view>
			</view>
			<view class="order-bottom">
				<view class="time" style="color: #333;">订单编号： {{ orderDetail.orderno }}</view>
				<view class="time" style="color: #333;">创建时间： {{ orderDetail.createtime }}</view>
				<!-- <view class="time">订单编号：SH20200214578963548</view> -->
				<!-- <view class="time">创建时间：2020-11-22 11:46</view> -->
				<view class="bottom">
					<!-- <view class="back">查看物流</view> -->
					<view class="warn" @click="handleConfirm(orderDetail.id)">确认收货</view>
				</view>
			</view>
		</view>
		<!-- 已完成 -->
		<view v-if="status == 5">
			<view class="state">
				<view>
					<view class="success">已完成</view>
					<view class="total-price">订单金额 : {{ orderDetail.groupsprice }} 元</view>
				</view>
				<image class="pay-img" src="../../static/order/comment.png" mode=""></image>
			</view>
			<!-- <view class="content">
				<view class="center">
					<image class="icon" src="../../static/order/delivery1.png" mode=""></image>
					<view class="container">
						<view class="text"><view class="message">您已提交订单，请等待物流信息更新</view></view>
						<view class="update-time">更新时间：{{orderDetail.sendtime}}</view>
					</view>
				</view>
			
				<image class="right" src="../../static/img/right.png" mode=""></image>
			</view> -->
			<view class="content">
				<view class="center">
					<image class="icon" src="../../static/img/location.png" mode=""></image>
					<view class="container">
						<view class="text">
							<view class="name">{{ address.username }}</view>
							<view>{{ address.mobile }}</view>
						</view>
						<view class="address">{{ address.addressList }}</view>
					</view>
				</view>
			
				<image class="right" src="../../static/img/right.png" mode=""></image>
			</view>
			<view class="order-center" @click="jump(orderDetail.goodsid)">
				<view class="img"><image class="order-img" :src="orderDetail.thumb" mode=""></image></view>
				<view class="center-right">
					<view class="title">{{ orderDetail.title }}</view>
					<view class="detail">
						<view class="detail-price">￥{{ orderDetail.groupsprice }}</view>
						<view class="detail-num">x1</view>
					</view>
				</view>
			</view>
			<view class="content-center">
				<view class="price">
					<view class="price-text">订单总价（含运费）</view>
					<view class="price-text">￥{{ orderDetail.groupsprice }}</view>
				</view>
				<view class="price" style="margin: 10upx 0;">
					<view class="price-text">运费</view>
					<view class="price-text">￥{{ orderDetail.freight }}</view>
				</view>
				<view class="price" v-if="orderDetail.discount != 0.0">
					<view class="price-text">商品优惠</view>
					<view class="price-text">-￥{{ orderDetail.discount }}</view>
				</view>
				<view class="total">
					<view class="total-text">实付款</view>
					<view class="total-price-right">￥{{ orderDetail.price }}</view>
				</view>
			</view>
			<view class="order-bottom">
				<view class="time" style="color: #333;">订单编号： {{ orderDetail.orderno }}</view>
				<view class="time" style="color: #333;">创建时间： {{ orderDetail.createtime }}</view>
				<!-- <view class="time">订单编号：SH20200214578963548</view> -->
				<!-- <view class="time">创建时间：2020-11-22 11:46</view> -->
				<view class="bottom">
					<!-- <view class="back">查看物流</view> -->
					<view class="warn" v-if="orderDetail.iscomment==1" @click="handleConfirm(orderDetail.id)">去评价</view>
					<view class="warn" v-if="orderDetail.iscomment==2"  @click="handleConfirm(orderDetail.id)">追加评价</view>
				</view>
			</view>
		</view>
		<view class="mask" v-if="isMask">
			<view class="mask_top"></view>
			<view class="mask_content">
				<!-- 标题 -->
				<view class="title">
					<text>请选择取消订单原因</text>
					<!-- <image src="../../static/icon/cha.png" mode="aspectFit" @tap="maskShow(false)"></image> -->
				</view>
				<!-- 选择项 -->
				<view class="options">
					<radio-group @change="_returnReason">
						<view class="list" v-for="(item, index) in reasonList" :key="index">
							<text class="common_text_style">{{ item.title }}</text>
							<radio :value="item.state" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
					</radio-group>

					<!-- <view class="list">
							<text class="common_text_style">信息填写错误，重拍</text>
							<radio value="信息填写错误，重拍" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
						<view class="list">
							<text class="common_text_style">卖家缺货</text>
							<radio value="卖家缺货" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
						<view class="list">
							<text class="common_text_style">同城见面交易</text>
							<radio value="同城见面交易" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
						<view class="list list_end">
							<text class="common_text_style">其他原因</text>
							<radio value="其他原因" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view> -->
					<!-- 确认按钮 -->
					<view class="btn">
						<view class="confirm" @tap="maskShow(false)">取消</view>
						<view class="confirm confirm-btn" @tap="handleCancelOrder">确定</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import service from '@/store/service.js';
export default {
	data() {
		return {
			status: 0,
			orderid: 0,
			orderDetail: '',
			address: '',
			isMask: false, //遮罩
			id: '',
			reasonList: [
				{
					title: '我不想买了',
					state: '1'
				},
				{
					title: '信息填写错误，重拍',
					state: '2'
				},
				{
					title: '卖家缺货',
					state: '3'
				},
				{
					title: '同城见面交易',
					state: '4'
				},
				{
					title: '其他原因',
					state: '0'
				}
			]
			// address:"orderDetail.address.username"
		};
	},
	onLoad: function(e) {
		// console.log(e);
		this.status = e.status;
		// console.log(this.status);
		this.orderid = e.orderid;
		// console.log(this.orderid);
		this.getOrderDetail();
	},
	onShow: function() {
		if (this.status == -1) {
			uni.setNavigationBarTitle({
				title: '已取消'
			});
		} else if (this.status == 0) {
			uni.setNavigationBarTitle({
				title: '待付款'
			});
		} else if (this.status == 1) {
			uni.setNavigationBarTitle({
				title: '已付款'
			});
		} else if (this.status == 2) {
			uni.setNavigationBarTitle({
				title: '待发货'
			});
		} else if (this.status == 3) {
			uni.setNavigationBarTitle({
				title: '未中标'
			});
		} else if (this.status == 4) {
			uni.setNavigationBarTitle({
				title: '待收货'
			});
		} else {
			uni.setNavigationBarTitle({
				title: '待评价'
			});
		}
	},
	methods: {
		jump(id) {
			console.log(id);
			uni.navigateTo({
				// hundred/commodity?goodsid=1
				url: `../hundred/commodity?goodsid=${id}`
			});
		},
		jumpUrl(url, id) {
			uni.navigateTo({
				url: url
			});
		},
		getOrderDetail() {
			var self = this;
			self.$http
				.get(service.api.group.orderDetail, {
					orderid: self.orderid
				})
				.then(function(res) {
					// console.log(res);
					var list = res.data;
					self.orderDetail = list;
					self.address = list.address;
					self.address.addressList = self.address.province + self.address.city + self.address.area + self.address.address;
					// var address=self.orderDetail.address
					// console.log(addressList);
					// self.groudSwiper = list.images;
					// self.groudAvatar = list.teaming;
				});
		},
		cancel(id) {
			// console.log(id, 888);
			this.isMask = !this.isMask;
			this.id = id;
		},
		joinGroup(id) {
			// console.log(id);
			uni.navigateTo({
				url: '../createOrder/orderDetail?orderid=' + id
			});
		},
		// 遮罩
		maskShow(boolean) {
			// console.log(3453);
			this.isMask = false;
			if (boolean) {
			}
		},
		// 退货原因
		_returnReason(returnReason) {
			if (returnReason) {
				this.returnReason = returnReason.detail.value;
				console.log(returnReason.detail.value, 233);
			}
		},
		handleCancelOrder() {
			var self = this;
			self.isMask = !self.isMask;
			// console.log(self.returnReason,1111);
			self.$http
				.get(service.api.group.cancel, {
					orderid: self.id,
					status: self.returnReason
				})
				.then(function(res) {
					// console.log(res);
					if (res.code == 1) {
						uni.showToast({
							icon: 'none',
							title: '取消成功'
						});
					}
					setTimeout(function() {
						uni.navigateTo({
							url: './groupOrder'
						});
					}, 3000);
				});
		},
		handleConfirm(id) {
			console.log(111);
			var oid = id;
			console.log(oid);
			// console.log(self.id);
			var self = this;
			// self.isMask = !self.isMask;
			// console.log(self.returnReason,1111);
		// 	self.$http
		// 		.get(service.api.group.orderConfirm, {
		// 			orderid: oid
		// 			// status: self.returnReason
		// 		})
		// 		.then(function(res) {
		// 			// console.log(res);
		// 			if (res.code == 1) {
		// 				uni.showToast({
		// 					icon: 'none',
		// 					title: '确认收货成功'
		// 				});
		// 			}
		// 			setTimeout(function() {
		// 				uni.navigateTo({
		// 					url: './groupOrder'
		// 				});
		// 			}, 3000);
		// 		});
		}
	}
};
</script>

<style lang="scss" scoped>
.message {
	color: #ff594d;
}
.update-time {
	font-size: 22upx;
	color: #999;
}
.state {
	// background: rgb(218,98,25);
	background: linear-gradient(90deg, rgba(218, 98, 25, 1) 35%, rgba(241, 146, 81, 1) 100%);
	height: 206upx;
	display: flex;
	// flex-direction: column;
	justify-content: space-between;
	// align-items: flex-start;
	align-items: center;
	color: #fff;
	margin-bottom: 20upx;
	// box-sizing: border-box;
	// padding-left: 24upx;
	padding: 0 20upx 0 24upx;
	box-sizing: content-box;
}
.pay-img1 {
	width: 240upx;
	height: 240upx;
}
.pay-img {
	width: 235upx;
	height: 138upx;
}
.success {
	font-size: 42upx;
	// margin-top: 45upx;
	font-weight: bold;
}
.total-price {
	font-size: 24upx;
}

.group-info {
	width: 100vw;
	height: 510upx;
	background-color: #fff;
	box-sizing: border-box;
	padding: 22upx 20upx;
	margin-bottom: 20upx;
	.info-list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 44upx 10upx;
		.group-img {
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
		margin-left: 140upx;
		color: #35393b;
		font-size: 30upx;
		font-weight: bold;
		& > text {
			color: #ff594d;
		}
	}
}
.invite {
	width: 620upx;
	height: 100upx;
	background: linear-gradient(90deg, rgba(255, 153, 51, 1) 0%, rgba(255, 102, 51, 1) 100%);
	border-radius: 50upx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-size: 36upx;
	margin: 52upx auto 0 auto;
	image {
		width: 58upx;
		height: 48upx;
		margin-right: 10upx;
	}
}

.content {
	display: flex;
	align-items: center;
	background-color: #fff;
	justify-content: space-between;
	padding: 0 20upx;
	margin-bottom: 20upx;
	height: 160upx;
}
.center {
	display: flex;
	align-items: center;
}
.icon {
	width: 40upx;
	height: 40upx;
	margin-right: 20upx;
}
.text {
	display: flex;
	font-size: 30upx;
	font-weight: bold;
	color: #333;
}
.name {
	margin-right: 32upx;
}
.address {
	color: #666;
	font-size: 26upx;
}
.right {
	width: 40upx;
	height: 40upx;
}
.order-center {
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20upx;
}
.img {
	width: 190upx;
	margin-top: 30upx;
	margin-bottom: 24upx;
}
.order-img {
	width: 100%;
	height: 190upx;
}
.center-right {
	flex: 1;
	margin-left: 25upx;
}
.title {
	color: #333;
	font-size: 30upx;
	font-weight: 500;
	margin-bottom: 20upx;
}
.detail {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.detail-price {
	color: #333;
	font-size: 32upx;
	font-weight: bold;
}
.detail-num {
	color: #333;
	font-size: 24upx;
	font-weight: bold;
}
.content-center {
	background-color: #fff;
	margin-bottom: 20upx;
}
.price,
.total {
	display: flex;
	justify-content: space-between;
	padding: 0 20upx;
}
.total {
	margin-top: 10upx;
	padding-bottom: 30upx;
}
.total-text {
	color: #333;
	font-weight: 500;
}
.total-price-right {
	color: #ff594d;
	font-size: 32upx;
	font-weight: bold;
}
.order-bottom {
	background-color: #fff;
	padding: 30upx 0;
	padding-bottom: 24upx;
}
.time {
	/* font-size: 26upx; */
	margin-top: 10upx;
	padding: 0 20upx;
	// color: #333;
}
.time > text {
	color: #999999;
}
.price-text {
	color: #999;
}
.money {
	color: #35393b;
	font-weight: bold;
}
.bottom {
	display: flex;
	justify-content: flex-end;
	margin-top: 50upx;
	padding-top: 26upx;
	padding-bottom: 30upx;
	box-sizing: border-box;
	border-top: 1upx solid rgba(241, 241, 241, 1);
	border-bottom: 1upx solid rgba(241, 241, 241, 1);
}
.back {
	border: 1px solid #999;
	border-radius: 33upx;
	padding: 0 20upx;
	height: 56upx;
	display: flex;
	align-items: center;
	color: #666;
	margin-right: 24upx;
}
.warn {
	border: 1px solid #ff594d;
	border-radius: 33upx;
	padding: 0 20upx;
	height: 56upx;
	display: flex;
	align-items: center;
	color: #ff594d;
	margin-right: 20upx;
}
// 遮罩样式
.mask {
	position: fixed;
	top: 0;
	// right: 60upx;
	// left: 60upx;
	bottom: 0;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	z-index: 99;

	.mask_top {
		opacity: 0.53;
		background: rgba(0, 0, 0, 1);
		flex: 1;
	}

	.mask_content {
		height: 760upx;
		margin: 0 60upx 300upx 60upx;
		// width: 100%;
		background-color: #ffffff;
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(255, 255, 255, 1);
		border-radius: 12upx;
		padding-top: 42upx;
		// box-sizing: border-box;

		.title {
			height: 105upx;
			width: 100%;
			display: flex;
			justify-content: center;
			// padding: 0 15upx 0 272upx;
			align-items: center;
			box-sizing: border-box;
			padding-bottom: 30upx;
			border-bottom: 1px solid #f1f1f1;

			> text {
				height: 34upx;
				font-size: 32upx;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				line-height: 34upx;
			}

			> image {
				height: 58upx;
				width: 58upx;
			}
		}
	}
}

.options {
	margin-top: 10upx;

	.list {
		height: 100upx;
		width: 100%;
		padding: 0 30upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		color: #333;
		font-size: 32upx;
		// border-bottom: 1px solid rgba(244, 244, 244, 1);
	}

	.list_end {
		border-bottom: 0;
	}
}

.btn {
	display: flex;
	justify-content: space-between;
	align-items: center;
	// width: 710upx;
	height: 100upx;
	// background: linear-gradient(90deg, rgba(233, 144, 64, 1) 0%, rgba(255, 123, 76, 1) 100%);
	// border-radius: 10upx;
	font-size: 36upx;
	font-weight: 500;
	text-align: center;
	line-height: 100upx;
	// color: rgba(255, 255, 255, 1);
	margin: 25upx auto;
	color: #333;
	font-size: 32upx;

	.confirm {
		width: 50%;
	}

	.confirm-btn {
		color: #000;
		font-weight: bold;
	}
}
// 待付款
// .state {
// 	background: linear-gradient(90deg, rgba(218, 98, 25, 1) 35%, rgba(241, 146, 81, 1) 100%);
// 	height: 186upx;
// 	display: flex;
// 	/* flex-direction: column; */
// 	/* justify-content: space-around; */
// 	justify-content: space-between;
// 	align-items: center;
// 	padding: 0 27upx;
// 	box-sizing: border-box;
// 	color: #fff;
// 	margin-bottom: 20upx;
// }
// .success {
// 	font-size: 42upx;
// 	/* margin-top: 45upx; */
// 	/* font-weight: bold; */
// }
// .total-price {
// 	font-size: 24upx;
// }

// .content {
// 	display: flex;
// 	align-items: center;
// 	background-color: #fff;
// 	justify-content: space-between;
// 	padding: 0 20upx;
// 	margin-bottom: 20upx;
// 	height: 160upx;
// }
// .center {
// 	display: flex;
// 	align-items: center;
// }
// .icon {
// 	width: 50upx;
// 	height: 50upx;
// 	margin-right: 20upx;
// }
// .text {
// 	display: flex;
// 	font-size: 30upx;
// 	font-weight: bold;
// 	color: #333;
// }
// .message {
// 	color: #ff594d;
// }
// .update-time {
// 	font-size: 22upx;
// 	color: #999;
// }
// .name {
// 	margin-right: 32upx;
// }
// .address {
// 	color: #666;
// 	font-size: 26upx;
// }
// .right {
// 	width: 40upx;
// 	height: 40upx;
// }
// .order-center {
// 	background-color: #fff;
// 	display: flex;
// 	justify-content: space-between;
// 	align-items: center;
// 	padding: 0 20upx;
// }
// .img {
// 	width: 190upx;
// 	margin-top: 30upx;
// 	margin-bottom: 24upx;
// }
// .order-img {
// 	width: 145.3upx;
// 	height: 144.7upx;
// }
// .center-right {
// 	/* flex: 1; */
// 	margin-left: 25upx;
// 	/* padding: 20upx 0; */
// 	box-sizing: border-box;
// }
// .title {
// 	color: #333;
// 	font-size: 32upx;
// 	font-weight: 500;
// 	margin-bottom: 14upx;
// 	line-height: 1.5;
// }
// .detail {
// 	display: flex;
// 	justify-content: space-between;
// 	align-items: center;
// }
// .detail-price {
// 	color: #333;
// 	font-size: 32upx;
// 	font-weight: bold;
// }
// .detail-num {
// 	color: #333;
// 	font-size: 24upx;
// 	font-weight: bold;
// }
// .content-center {
// 	background-color: #fff;
// 	margin-bottom: 20upx;
// }
// .price,
// .total {
// 	display: flex;
// 	justify-content: space-between;
// 	padding: 0 20upx;
// }
// .total {
// 	margin-top: 40upx;
// 	padding-bottom: 30upx;
// }
// .total-text {
// 	color: #333;
// 	font-weight: 500;
// }
// .total-price-right {
// 	color: #ff594d;
// 	font-size: 32upx;
// 	font-weight: bold;
// }
// .order-bottom {
// 	background-color: #fff;
// 	padding: 30upx 0;
// }
// .copy {
// 	display: flex;
// 	align-items: center;
// 	font-size: 28upx;
// 	padding: 0 20upx;
// }
// .copy > view:nth-child(1) text {
// 	color: #999999;
// }
// .copy-text {
// 	border: 1px solid #797979;
// 	border-radius: 20upx;
// 	width: 78upx;
// 	height: 38upx;
// 	line-height: 38upx;
// 	text-align: center;
// 	margin-left: 14upx;
// 	color: #797979;
// 	box-sizing: border-box;
// 	font-size: 20upx;
// }
// .time {
// 	margin-top: 10upx;
// 	font-size: 28upx;
// 	padding: 0 20upx;
// }
// .time > text {
// 	color: #999999;
// }
// .price-text {
// 	color: #999;
// }
// .money {
// 	color: #35393b;
// 	font-weight: bold;
// }
// .bottom {
// 	display: flex;
// 	justify-content: flex-end;
// 	margin-top: 50upx;
// 	padding-top: 26upx;
// 	border-top: 1px solid rgba(241, 241, 241, 1);
// }
// .back {
// 	border: 1px solid #999;
// 	border-radius: 27upx;
// 	width: 159upx;
// 	height: 56upx;
// 	line-height: 56upx;
// 	text-align: center;
// 	box-sizing: border-box;
// 	color: #666;
// 	margin-right: 24upx;
// }
// .warn {
// 	border: 1px solid #ff594d;
// 	border-radius: 33upx;
// 	width: 159upx;
// 	height: 56upx;
// 	line-height: 56upx;
// 	text-align: center;
// 	box-sizing: border-box;
// 	color: #ff594d;
// 	margin-right: 20upx;
// }
</style>
