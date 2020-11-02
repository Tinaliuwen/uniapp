<template>
	<view class="transfer-balance">
		<view class="balance">
			<view class="rice">
				<text class="text">可转出米粒:</text>
				<text class="price">{{ rice }}</text>
			</view>
			<view class="top">
				<view class="top-text">
					<view class="rice-text">米粒</view>
					<view class="txt">从</view>
				</view>

				<image class="img" src="../../static/img/pic.png" mode=""></image>
				<view class="top-text">
					<view class="rice-text">余额</view>
					<view class="txt">转出到</view>
				</view>
			</view>
		</view>
		<view>
			<view class="balance">
				<view class="rice1"><text class="text1">转出米粒</text></view>
				<view class="input">
					<input type="text" v-model="amount" class="input-value" value="" placeholder="请输入转出的米粒" />
					<view class="all">
						<text>|</text>
						<text class="all-text" @click="getAll(rice)">全部</text>
					</view>
				</view>

				<view class="transfer" @click="getCashDetail">转出</view>
				<view class="tips">只有将米粒转出到余额才可以进行消费、提现</view>
			</view>
		</view>
	</view>
</template>

<script>
import service from '@/store/service.js';
export default {
	data() {
		return {
			cashDetail: [],
			amount: '',
			rice: ''
		};
	},
	onLoad: function() {
		// this.getCashDetail();
		this.getRice();
	},
	methods: {
		//全部米粒
		getAll(num) {
			// console.log(num);
			this.amount = num;
		},
		// 米粒数量
		getRice() {
			var self = this;
			self.$http.get(service.api.rice.rice, {}).then(function(res) {
				var list = res.data;
				console.log(list);
				self.rice = list;
			});
		},
		// 转出米粒
		getCashDetail() {
			var self = this;
			if (self.amount == '') {
				uni.showToast({
					icon: 'none',
					title: '提现金额不能为空'
				});
				return;
			}
			self.$http
				.get(service.api.rice.cashDetail, {
					amount: self.amount
				})
				.then(function(res) {
					uni.showToast({
						icon: 'none',
						title: res.info
					});
					if (res.code == 1) {
						setTimeout(function() {
							uni.navigateTo({
								url: '../user/mygrains'
							});
						}, 2000);
					}
					// console.log(res);
					// var list = res.data;
					// self.cashDetail = list;
				});
		}
	}
};
</script>

<style scoped>
.balance {
	background-color: #fff;
	border-radius: 20upx;
	margin: 30upx 20upx;
}
.rice {
	padding: 30upx;
	border-bottom: 1px solid #f4f4f4;
}
.text {
	font-size: 26upx;
	font-weight: bold;
	margin-right: 16upx;
}
.rice1 {
	padding: 30upx;
}
.text1 {
	font-size: 28upx;
	font-weight: bold;
}

.price {
	font-size: 32upx;
	font-weight: bold;
	color: #ff594d;
}
.img {
	width: 68upx;
	height: 16upx;
}
.top {
	display: flex;
	align-items: center;
	justify-content: space-around;
	height: 160upx;
}
.top-text {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.rice-text {
	color: #333;
	font-size: 32upx;
	font-weight: bold;
}
.txt {
	font-size: 24upx;
	color: #666;
}
.input {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 30upx;
	border-bottom: 1px solid #f4f4f4;
	padding-bottom: 20upx;
}
.input-value {
	font-size: 28upx;
	color: #999;
}
.all {
	color: #ff594d;
}
.all-text {
	margin-left: 8upx;
}
.transfer {
	color: #fff;
	background: #ff594d;
	border-radius: 10upx;
	margin: 0 46upx;
	height: 100upx;
	width: 618upx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 36upx;
	margin: 96upx 46upx 30upx 46upx;
}
.tips {
	display: flex;
	justify-content: center;
	font-size: 24upx;
	color: #999;
	padding-bottom: 115upx;
}
</style>
