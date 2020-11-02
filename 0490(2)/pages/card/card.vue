<template>
	<view class="card">
		<view class="card-top">
			<swiper :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item>
					<view class="swiper-item"><image class="banner" src="../../static/card/banner.png" mode=""></image></view>
				</swiper-item>
			</swiper>
			<view class="icon-item">
				<view class="icon" @click="jump('/pages/card/phoneNumber')">
					<image class="icon-img" src="../../static/card/phone_number.png" mode=""></image>
					<text>我的手机号</text>
				</view>
				<view class="icon" @click="jump('/pages/card/jobNumber')">
					<image class="icon-img" src="../../static/card/job_number.png" mode=""></image>
					<text>我的工号</text>
				</view>
				<!-- <view class="icon" @click="jump('/pages/card/card')"> -->
				<view class="icon">
					<image class="icon-img" src="../../static/card/menu.png" mode=""></image>
					<text>选套餐</text>
				</view>
			</view>
		</view>
		<view class="appointment">
			申请专区
			<view class="border"></view>
		</view>
		<view class="appointment-card">
			<view class="card-content" @click="jump('/pages/card/applyCard')">
				<view class="content-text">
					<view class="text1">预约开卡</view>
					<view class="text2">拿积分+奖励，可购物</view>
				</view>
				<view class="pic">
					<image class="img" src="../../static/card/appointment.png" mode=""></image>
					<image class="right" src="../../static/card/right.png" mode=""></image>
				</view>
			</view>
			<view class="card-content" @click="jump('/pages/card/applyNumber')">
				<view class="content-text">
					<view class="text1">申请工号</view>
					<view class="text2">获取团队的30米粒</view>
				</view>
				<view class="pic">
					<image class="img" src="../../static/card/apply.png" mode=""></image>
					<image class="right" src="../../static/card/right.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="menu">
			<view class="appointment">
				套餐专区
				<view class="border"></view>
			</view>
			<!-- <view class="more">
				查看更多
				<image class="more-icon" src="../../static/card/next.png" mode=""></image>
			</view> -->
		</view>
		<view class="hot">
			<view class="hot-menu" v-for="(item, index) in packageList" :key="index">
				<image class="menu-bg" :src="'../../static/card/b' + item.imgtype + '.png'" mode=""></image>
				<view class="tag" v-if="item.is_hot == 1">
					<image class="hot-tag" src="../../static/card/rectangle.png" mode=""></image>
					<view class="hot-text">{{ item.is_hot_text }}</view>
				</view>

				<view class="menu-left">
					<view class="money">{{ item.name }}</view>
					<view :class="'tips' + item.imgtype">{{ item.integral_text }}</view>
				</view>

				<view class="menu-right">
					<view>{{ item.title }}</view>
					<view>{{ item.subtitle }}</view>
					<view class="button" @click="jump('/pages/card/applyCard?id=' + item.id, item.id)">预约开卡</view>
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
			packageList: []
		};
	},

	onLoad: function() {
		this.dataList();
	},
	methods: {
		jump(url, id) {
			uni.navigateTo({
				url: url
			});
			// console.log(id);
		},
		dataList() {
			var self = this;
			// console.log(service.api.card.packageList);
			// self.$http
			// 	.post(service.api.login.login, {
			// 		account: 13242765183,
			// 		password: 123456
			// 	})
				// .then(function(res) {
				// 	uni.setStorageSync('token', res.data.token);
				// 	uni.setStorageSync('authorization', 'Bearer ' + res.data.token);
					self.$http.get(service.api.card.packageList, {}).then(function(res) {
						// console.log(res);

						var list = res.data;
						var id = 0;
						for (var i = 0; i < list.length; i++) {
							if (id < 4) {
								id++;
							} else {
								id = 1;
							}
							list[i].imgtype = id;
						}
						if (res.code == 1) {
							self.packageList = list;
						}
					});
				// });
		}
	}
};
</script>

<style scoped>
.card {
}
.card-top {
	background-color: #fff;
}
swiper {
	width: 710upx;
	padding: 18upx;
	height: 255upx;
	padding-bottom: 38upx;
}
.banner {
	width: 100%;
	height: 255upx;
}
.icon-item {
	display: flex;
	flex-direction: row;
}
.icon {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 33.33%;
}
.icon-img {
	width: 88upx;
	height: 88upx;
	padding-bottom: 14upx;
}
.icon-item {
	padding-bottom: 42upx;
}
.icon text {
	font-size: 24upx;
	color: #333;
	font-weight: 500;
}
.appointment {
	font-size: 36upx;
	font-weight: bold;
	padding: 40upx 0 34upx 23upx;
	position: relative;
}
.border {
	width: 147upx;
	border-bottom: 19upx solid rgba(249, 194, 107, 1);
	opacity: 0.23;
	position: absolute;
	top: 42px;
	left: 10px;
}
.appointment-card {
	display: flex;
	flex-direction: row;
}
.card-content {
	width: 345upx;
	background-color: #fff;
	margin-left: 22upx;
	border-radius: 30upx;
}
.content-text {
	margin-top: 45upx;
	margin-left: 48upx;
}
.text1 {
	font-weight: bold;
	padding-bottom: 18upx;
}
.text2 {
	color: #999999;
	font-size: 24upx;
	font-weight: 500;
}
.pic {
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 18upx;
	padding-bottom: 34upx;
}
.img {
	width: 208upx;
	height: 173upx;
	padding-right: 20upx;
}
.right {
	width: 41upx;
	height: 41upx;
}
.menu {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.more {
	color: #999;
	font-size: 24upx;
}
.more-icon {
	width: 12upx;
	height: 21upx;
	padding-left: 10upx;
	padding-right: 20upx;
}
.hot {
	margin-bottom: 45upx;
}
.hot-menu {
	height: 284upx;
	display: flex;
	flex-wrap: wrap;
	position: relative;
	margin-bottom: 30upx;
}
.hot-menu1 {
	height: 284upx;
	display: flex;
	flex-wrap: wrap;
	position: relative;
	margin-bottom: 40upx;
}
.hot-tag {
	width: 146upx;
	height: 44upx;
	z-index: 1000;
}
.hot-text {
	color: #ffffff;
	font-weight: bold;
	position: absolute;
	top: -4upx;
	left: 16upx;
	z-index: 2000;
}
.menu-bg {
	width: 100%;
	height: 284upx;
	margin: 0 20upx;
}
.tag {
	position: absolute;
	top: -20upx;
	left: 20upx;
}

.menu-left {
	display: flex;
	/* align-items: center; */
	flex-direction: column;
	position: absolute;

	top: 86upx;
	left: 50upx;
	/* 	top: 50%;
	left: 50%;
	width: 200upx;
	margin-top: -100upx;
	margin-left:-100px; */
}
.money {
	color: #fff;
	font-weight: bold;
	font-size: 40upx;
}
.tips1,
.tips2,
.tips3,
.tips4 {
	padding: 4upx 20upx;
	margin-top: 28upx;
	font-size: 24upx;
	background: rgba(255, 255, 255, 1);
	border-radius: 20upx 0 20upx 0;
	color: #7274eb;
}
.tips2 {
	color: #d5891b;
}
.tips3 {
	color: #0d7abf;
}
.tips4 {
	color: #c2190e;
}
.menu-right {
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	margin-left: 36upx;
	position: absolute;
	top: 60upx;
	right: 80upx;
	color: #666666;
}
.button {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 40upx;
	color: #ff9500;
	border: 1px solid rgba(255, 185, 86, 1);
	border-radius: 28upx;
	width: 182upx;
	height: 52upx;
}
</style>
