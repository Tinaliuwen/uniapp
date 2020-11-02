<template name="uni-countdown">
	<view class="uni-countdown" :style="{color:fontColor}">
		<block v-if="type > 3">{{d}}:</block>
		<block v-if="type > 2">{{h}}:</block>
		<block v-if="type > 1">{{m}}:</block>
		<block v-if="type > 0">{{s}}</block>
		<block v-if="type == 0"></block>
	</view>
</template>
<script>
	export default {
		name: "uni-countdown",
		props: {
			bgrColor: {
				type: String,
				default: "#FFFFFF"
			},
			borderColor: {
				type: String,
				default: "#000000"
			},
			fontColor: {
				type: String,
				value: "#000000"
			},
			splitorColor: {
				type: String,
				default: "#000000"
			},
			count: {//倒计时总数
                type: [String, Number],
                default: ''
			},
			multiple:{//分割倍数
                type: [String, Number],
                default: 1
			},
			type:{//显示层级
                type: [String, Number],
                default: 0
			}
		},
		data() {
			return {
				time:3,
				setTime: null,
				d: '00',
				h: '00',
				m: '00',
				s: '00',
				leftTime: 0
			}
		},
		created: function(e) {
			this.time = this.type;
			this.countDown(this,this.count);
		},
		beforeDestroy() {
			clearInterval(this.setTime)
		},
		methods: {
			countDown: function(self,leftTime) {
				if (leftTime > 0) {
					var days = parseInt(leftTime / self.multiple / 24 / 60 / 60, 10);
					var hours = parseInt(leftTime / self.multiple / 60 / 60 % 60, 10);
					var minutes = parseInt(leftTime / self.multiple / 60 % 60, 10);
					var seconds = parseInt(leftTime / self.multiple % 60, 10);
				} else {
					var days = 0,
						hours = 0,
						minutes = 0,
						seconds = 0;
				}
				if(self.type <= 3){
					hours += days * 24;
				}
				if(self.type <= 2){
					minutes += hours * 60;
				}
				if(self.type <= 1){
					seconds += minutes * 60;
				}
				if (days < 10) {
					days = '0' + days;
				}
				if (hours < 10) {
					hours = '0' + hours;
				}
				if (minutes < 10) {
					minutes = '0' + minutes;
				}
				if (seconds < 10) {
					seconds = '0' + seconds;
				}
				
				self.d = days;
				self.h = hours;
				self.m = minutes;
				self.s = seconds;
				if(leftTime > 0){
					setTimeout(function(){
						self.countDown(self,leftTime - self.multiple)
					},1000);
				}
			}
		}
	}
</script>
<style>
	.uni-countdown {
        display: flex;
		padding: 2upx 0;
		flex-wrap: nowrap;
		justify-content: center;
	}

	.uni-countdown-splitor {
		width: auto !important;
		justify-content: center;
		line-height: 44upx;
		padding: 0 5upx;
	}

	.uni-countdown-numbers {
		line-height: 44upx;
		width: auto !important;
		padding: 0 10upx;
		justify-content: center;
		height: 44upx;
		border-radius: 8upx;
		margin: 0 5upx;
		border: 1px solid #000000;
		font-size: 22upx;
	}
</style>
