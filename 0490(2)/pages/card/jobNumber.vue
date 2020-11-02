<template>
	<view class="job-number">
		<view v-if="jobNumber.length != undefined">
			<image class="job-bg" src="../../static/img/job_number.png" mode=""></image>
			<view class="number">
				<text class="text">我的工号</text>
				<text class="num">{{ jobNumber }}</text>
			</view>
		</view>
		<view class="not" v-else>
			<view class="not-number">你暂时还没有申请工号</view>
			<view class="apply" @click="jump('/pages/card/applyNumber')">去申请</view>
		</view>
	</view>
</template>

<script>
import service from '@/store/service.js';
export default {
	data() {
		return {
			jobNumber: []
		};
	},
	onLoad: function() {
		this.getJobNumber();
	},
	methods: {
		jump(url, id) {
			uni.navigateTo({
				url: url
			});
		},
		getJobNumber() {
			var self = this;
			self.$http.get(service.api.card.jobNumber, {}).then(function(res) {
				// console.log(res);
				var list = res.data;
				self.jobNumber = list;
				console.log(self.jobNumber.length);
			});
		}
	}
};
</script>

<style scoped>
.job-number {
	width: 712upx;
	height: 230upx;
	padding: 20upx;
	position: relative;
}
.job-bg {
	width: 712upx;
	height: 230upx;
}
.number {
	display: flex;
	flex-direction: column;
	color: #ffffff;
	/* padding-left: 55rpx; */
	position: absolute;
	top: 70upx;
	left: 55upx;
}
.text {
	font-size: 28rpx;
	padding-bottom: 36rpx;
}
.num {
	font-size: 36rpx;
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
