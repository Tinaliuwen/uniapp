<template>
	<view class="apply-number">
		<view v-if="show">
			<image class="banner" src="../../static/card/banner2.png" mode=""></image>
			<view class="bg">
				<view class="input">
					<view class="name">姓名：</view>
					<view><input type="text" class="input-value" v-model="name" value="" placeholder="请填写您的姓名" /></view>
				</view>
				<view class="input">
					<view class="name">手机号码：</view>
					<view><input type="text" class="input-value" value="" v-model="phone" placeholder="请填写您的手机号码" /></view>
				</view>

				<view class="input">
					<view class="name">所在地区：</view>
					<view>
						<view class="input-value" @click="addPicker">{{ province }}{{ city }}{{ area }}</view>
					</view>
				</view>

				<view class="input">
					<view class="name">详细地址：</view>
					<view><input type="text" class="input-value" value="" v-model="address" placeholder="如：广东省广州市天河区中山大道中369号" /></view>
				</view>
			</view>
			<view style="height: 20upx;background-color: #f4f4f4;"></view>
			<view class="choose">
				<view class="upload"><view class="upload-text">选择套餐</view></view>
				<view class="tags">
					<view class="tag" v-for="(item, index) in menu" :key="index" :class="{ active: item.id === id }" @click="eleType(item.id, index)">{{ item.name }}</view>
					<!-- 	<view class="tag tag-choose">159套餐卡</view>
				<view class="tag">199套餐卡</view>
				<view class="tag">299套餐卡</view>
				<view class="tag">399套餐卡</view>
				<view class="tag">599套餐卡</view> -->
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
				<view class="uploading-box-img" @click="choose">
					<view v-if="imgsrc == ''"><image class="add" src="../../static/card/add.png" mode=""></image></view>
					<image class="add1" src="../../static/card/add.png" :src="imgsrc" mode="widthFix" v-else></image>
				</view>

				<view class="submit" @click="handleApplyCard" v-if="imgsrc == ''">提交申请</view>
				<view class="submit1" @click="handleApplyCard" v-else>提交申请</view>
			</view>
		</view>
		<view class="appointment" v-else>
			<image class="img" src="../../static/img/appointment.png" mode=""></image>
			<view class="content">
				<text class="tips">预约提交成功</text>
				<text class="wait">正在审核中，请等待.…</text>
			</view>
		</view>
		<mpvue-city-picker
			:themeColor="themeColor"
			ref="mpvueCityPicker"
			:pickerValueDefault="cityPickerValueDefault"
			@onCancel="onCancel"
			@onConfirm="onConfirm"
			:separ="separ"
		></mpvue-city-picker>
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
			menu: '',
			typeIndex: 0,
			imgsrc: '',
			id: 1,
			show: true,
		
		};
	},
	onLoad: function(e) {
		this.getList();
		this.id= Number(e.id);
		// console.log(e.id)
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
						// console.log(res);
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
		getList() {
			var self = this;
			self.$http.get(service.api.card.packageList, {}).then(function(res) {
				// console.log(res);

				var list = res.data;
				self.menu = list;
			});
		},
		handleApplyCard() {
			var self = this;
			self.$http
				.post(service.api.card.applyCard, {
					package_id: self.id,
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
								url: './phoneNumber'
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
	height: 333upx;
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
	padding-top: 35upx;
	padding-bottom: 35upx;
}
.choose {
	padding-bottom: 16upx;
}
.upload-text {
	color: #333333;
	font-weight: bold;
	font-size: 32upx;
	margin-left: 18upx;
}
.tags {
	display: flex;
	flex-wrap: wrap;
	padding-left: 38upx;
}
.tag {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 180upx;
	border: 1px solid #999;
	border-radius: 27upx;
	margin-right: 64upx;
	margin-bottom: 38upx;
	color: #333;
	font-weight: bold;
}
.tag:nth-of-type(3n) {
	margin-right: 0;
}
.active {
	background-color: #fea856;
	color: #fff;
	border: none;
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
	margin-left: 20upx;
	margin-bottom: 80upx;
	border: 1px dashed #888;
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
.uploading-text {
	width: 90%;
	margin: 0 auto;
	/* font-weight: 700; */
	font-size: 40rpx;
	margin-top: 40rpx;
}
.qrcode {
	width: 300upx;
	height: 300upx;
	margin: 0 auto;
}
.uploading-box-img {
	width: 195upx;
	height: 195upx;
	margin-left: 20upx;
	margin-bottom: 80upx;
}
.uploading-img,
.uploading-img1 {
	width: 100%;
	height: 300rpx;
}
.uploading-img1 {
	box-shadow: 0 0 4upx #52baf6;
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
