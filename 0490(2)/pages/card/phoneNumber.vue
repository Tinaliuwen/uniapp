<template>
	<view class="phone-number">
		<view class="card" v-for="(item, index) in mobileList" :key="index">
			<view class="card-top">
				<view class="top-left">
					<text class="menu">{{ item.package_name }}</text>
					<text>{{ item.add_time }}</text>
				</view>

				<view class="top-right" v-if="item.status == -1">待审核</view>
				<view class="adopt" v-else-if="item.status == 1">已通过</view>
				<view class="reject" v-else>已驳回</view>
			</view>
			<view class="content">
				<view class="card-center">
					<view>姓名：{{ item.name }}</view>
					<view class="phone">手机号：{{ item.phone }}</view>
				</view>
				<view class="">详细地址：{{ item.region }}</view>
			</view>
		</view>
		<view class="not" v-if="mobileList.length == 0">
			<view class="not-number">你暂时还没有申请手机号</view>
			<view class="apply" @click="jump('/pages/card/applyCard')">去申请</view>
		</view>

	</view>
</template>

<script>
import service from '@/store/service.js';
export default {
	data() {
		return {
			mobileList: [],
			isLoading: false,
			scroll: false,
			status: 0,
			pages: 1,
			limit: 2,
			page: 0,
			out: 0
		};
	},
	onLoad: function() {
		this.getMobile();
	},
		onReachBottom() {
			this.getMobile();
		},
	methods: {
		jump(url, id) {
			uni.navigateTo({
				url: url
			});
		},
		getMobile() {
			var self = this;
			if (self.isLoading) {
				return;
			}
			if (self.page < self.pages) {
				self.out = 0;
				self.isLoading = true;
				self.scroll = false;
				self.status = 1;
				var page = self.page + 1;
				self.$http
					.get(service.api.mobile.getMobile, {
						page: page,
						num: self.limit
					})
					.then(function(res) {
						console.log(res);
						if (res.code == 1) {
							var list = res.data;
							if(list.length > 0){
								list.forEach(item=>{
									//console.log(item)
									self.mobileList.push(item);
								})
								self.pages = page + 1
							}else{
								self.pages = page;
								// self.mobileList.length=list.length
								// console.log(self.mobileList.length);
							}
							
							self.page = page;
							self.scroll = true;
							self.isLoading = false;
							self.out = 1;
						}
					});
				}
		},
	}
};
</script>

<style scoped>
page {
	/* background-color: #ededed; */
}
.phone-number {
	padding-left: 18upx;
	padding-right: 22upx;
}
.card {
	background-color: #fff;
	color: #999;
	padding: 0 26upx;
	border: 1px solid #cbcbcb;
	border-radius: 10upx;
	box-shadow: 0px 9px 38px 0px rgba(203, 203, 203, 0.78);
	margin-top: 20upx;
}
.card-top {
	display: flex;
	flex-direction: row;
	align-items: center;
	border-bottom: 1px solid #f4f4f4;
	padding: 32upx 0 14upx;
	justify-content: space-between;
}
.top-left {
	display: flex;
	flex-direction: column;
}
.menu {
	color: #333;
	font-weight: bold;
}
.top-right {
	color: #fea856;
}
.adopt {
	color: #08c11d;
}
.reject {
	color: #666;
}
.content {
	display: flex;
	flex-direction: column;
	padding: 25upx 0 30upx;
}
.card-center {
	display: flex;
	justify-content: space-between;
}
.phone {
	padding-right: 22upx;
}
.not {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.not-number {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 200upx;
	font-size: 30upx;
}
.apply {
	margin-top: 100upx;
	height: 100upx;
	font-size: 36upx;
	color: #333333;
	font-weight: bold;
	line-height: 100upx;
	border-radius: 10upx;
	background: linear-gradient(90deg, rgba(64, 136, 248, 1) 0%, rgba(110, 121, 255, 1) 100%);
	color: #fff;
	text-align: center;
	width: 80%;
	/* margin: 0 20upx 80upx; */
}
</style>
