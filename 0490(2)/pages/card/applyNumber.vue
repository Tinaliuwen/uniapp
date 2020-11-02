<template>
	<view class="apply-number">
		<view v-if="show">
			<image class="banner" src="../../static/card/banner1.png" mode=""></image>
			<view class="bg">
				<view class="input">
					<view class="name">姓名：</view>
					<view><input type="text" v-model="name" class="input-value" value="" placeholder="请填写您的姓名" /></view>
				</view>
				<view class="input">
					<view class="name">手机号码：</view>
					<view><input type="text" v-model="phone" class="input-value" value="" placeholder="请填写您的手机号码" /></view>
				</view>
				<view class="input">
					<view class="name">所在地区：</view>
					<view>
						<view class="input-value" @click="addPicker">{{ province }}{{ city }}{{ area }}</view>
					</view>
				</view>

				<view class="input">
					<view class="name">详细地址：</view>
					<view><input type="text" class="input-value" value="" placeholder="如：广东省广州市天河区中山大道中369号" /></view>
				</view>
			</view>
			<view style="height: 20upx;background-color: #f4f4f4;"></view>
			<view class="add-pic">
				<view class="upload">
					<view class="upload-text">上传付款凭证</view>
					<view class="button">
						<view style="font-size: 20upx;" @click="jump('/pages/service/about')">查看付款账号</view>
						<image class="more" src="../../static/card/more.png" mode=""></image>
					</view>
				</view>
				<!-- <image class="add" src="../../static/card/add.png" mode=""></image> -->
				<!-- <view > -->
				<!-- <view class="submit">提交申请</view> -->
				<view class="uploading-box-img" @click="choose">
					<view v-if="imgsrc == ''"><image class="add" src="../../static/card/add.png" mode=""></image></view>
					<image class="add1" src="../../static/card/add.png" :src="imgsrc" mode="widthFix" v-else></image>
				</view>
				<view class="submit" @click="handleApplyNumber" v-if="imgsrc == ''">提交申请</view>
				<view class="submit1" @click="handleApplyNumber" v-else>提交申请</view>
				<!-- </view> -->
			</view>
		</view>

		<view class="appointment" v-else>
			<image class="img" src="../../static/img/appointment.png" mode=""></image>
			<view class="content">
				<text class="tips">申请提交成功</text>
				<text class="wait">正在审核中，请等待.…</text>
			</view>
		</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" :separ="separ"></mpvue-city-picker>
	</view>
</template>

<script>
import service from '@/store/service.js';
import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';
export default {
	components: {
		mpvueCityPicker
	},
	data() {
		return {
			cityPickerValueDefault: [0, 0, 0],
			themeColor: '#1577FF',
			name: '',
			phone: '',
			separ: '',
			province: '',
			city: '',
			area: '选择您的所在地区',
			address: '',
			imgsrc: '',
			show: true
		};
	},
	methods: {
		jump(url) {
			uni.navigateTo({
				url: url
			});
		},
		choose() {
			var self = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: res => {
					var imageSrc = res.tempFilePaths[0];
					self.$http.upload(service.api.upload.uploadImg + '?token=' + uni.getStorageSync('token'), imageSrc, 'image').then(function(res) {
						console.log(res);
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '凭证上传成功'
						});
						if (res.code == 1) {
							self.imgsrc = res.data;
						}
					});
				},
				fail: err => {
					console.log('chooseImage fail', err);
				}
			});
		},
		eleType(id, index) {
			this.id = id;
			this.typeIndex = index;
		},
		// 城市三级联动选择
		addPicker() {
			this.$refs.mpvueCityPicker.show();
		},
		//城市三级联动数据返回
		onConfirm(e) {
			this.province = e.label.province;
			this.city = e.label.city;
			this.area = e.label.area;
		},
		handleApplyNumber() {
			var self = this;
			self.$http
				.post(service.api.card.applyNumber, {
					voucher: self.imgsrc,
					name: self.name,
					phone: self.phone,
					region: self.province + self.city + self.area + self.address
				})
				.then(function(res) {
					// console.log(res);
					if (res.code == 1) {
						self.show = false;
						setTimeout(function() {
							uni.navigateTo({
								url: './jobNumber'
							});
						}, 5000);
					} else {
						uni.showToast({
							icon: 'none',
							title: res.info
						});
					}
				});
		}
	}
};
</script>

<style scoped>
page {
	background-color: #fff;
}
.banner {
	width: 100%;
	height: 270upx;
}
.input {
	display: flex;
	align-items: center;
	border-bottom: 1px solid #f4f4f4;
	height: 110upx;
}
.name {
	color: #333;
	font-weight: bold;
	padding-left: 20upx;
	width: 200upx;
}
.upload {
	display: flex;
	padding-top: 60upx;
	padding-bottom: 38upx;
}
.upload-text {
	color: #333333;
	font-weight: bold;
	font-size: 32upx;
	margin-left: 18upx;
}
.button {
	display: flex;
	align-items: center;
	color: #ad6928;
	background-color: #ffe9d4;
	border-radius: 20upx;
	margin-left: 12upx;
	padding: 0 22upx;
}
.more {
	width: 15upx;
	height: 15upx;
	padding-left: 8upx;
}
.add {
	width: 195upx;
	height: 195upx;
	padding-left: 20upx;
	margin-bottom: 80upx;
}
.add1 {
	width: 195upx;
	height: 195upx;
	margin-left: 20upx;
	margin-bottom: 80upx;
}
.submit,
.submit1 {
	height: 100upx;
	font-size: 36upx;
	color: #333333;
	font-weight: bold;
	line-height: 100upx;
	border-radius: 10upx;
	background-color: #e4e4e4;
	text-align: center;
	margin: 0 20upx 80upx;
}
.submit1 {
	background: linear-gradient(90deg, rgba(64, 136, 248, 1) 0%, rgba(110, 121, 255, 1) 100%);
	color: #fff;
	font-weight: 500;
}
.input-value {
	font-size: 28upx;
	color: #999;
}
/* 提交成功 */
.appointment {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.img {
	padding-top: 240upx;
	height: 355rpx;
}
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #333333;
	font-size: 32rpx;
	font-weight: bold;
}
.wait {
	font-weight: 100;
}
</style>
