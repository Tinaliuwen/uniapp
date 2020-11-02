<template>
	<view class="consume">
		<view class="consume-item" v-for="(item, index) in riceDetail" :key="index">
			<view class="consume-left">
				<view class="num">{{ item.desc }}</view>
				<view class="time">{{ item.add_time }}</view>
			</view>
			<view class="money" v-if="item.operate == 0">-{{ item.amount }}</view>
			<view class="money" v-else>+{{ item.amount }}</view>
		</view>
		<uni-load-more :status="status"></uni-load-more>
		<view class="not" v-if="riceDetail.length == 0"><view class="not-number">暂无转出记录</view></view>
	</view>
</template>

<script>
import service from '@/store/service.js';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
export default {
	data() {
		return {
			riceDetail: [],
			isLoading: false,
			scroll: false,
			status: 0,
			pages: 1,
			limit: 2,
			page: 0,
			out: 0
		};
	},
	components:{
				uniLoadMore,
			},
	onLoad: function() {
		this.getRiceDetail();
	},
	onReachBottom() {
		this.getRiceDetail();
	},
	methods: {
		getRiceDetail() {
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
					.get(service.api.rice.riceDetail, {
						page: page,
						num: self.limit,
						type: 7
					})
					.then(function(res) {
						console.log(res);
						if (res.code == 1) {
							var list = res.data;
							if (list.length > 0) {
								list.forEach(item => {
									//console.log(item)
									self.riceDetail.push(item);
								});
								self.pages = page + 1;
							} else {
								self.pages = page;
								//self.riceDetail.length = list.length;
								//console.log(self.riceDetail.length);
							}
							self.page = page;
							self.scroll = true;
							self.isLoading = false;
							self.out = 1;
							if(list.length == 0){
															self.status = 2;
														}else{
															self.status = 0;
														}
						}
					});
			}
		}
	}
};
</script>

<style scoped>
.consume-item {
	background-color: #fff;
	margin-top: 20upx;
	display: flex;
	justify-content: space-between;
	padding: 28upx 22upx 22upx;
}
.consume-left {
}
.num {
	font-weight: bold;
}
.time {
	color: #999;
	font-size: 24upx;
	font-weight: 500;
}
.money {
	display: flex;
	align-items: center;
	color: #ff594d;
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
