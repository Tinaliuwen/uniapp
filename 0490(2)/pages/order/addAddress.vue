<template>
	<view class="address">
		<view class="input">
			<view class="name">姓名：</view>
			<input type="text" class="tips" v-model="name" placeholder="请填写收货人姓名" />
		</view>
		<view class="input">
			<view class="name">电话：</view>
			<input type="text" class="tips" v-model="phone" placeholder="请填写收货人电话" />
		</view>
		<view class="input">
			<view class="name">所在地区：</view>
			<view>
				<view class="tips" @click="addPicker">{{ province }}{{ city }}{{ area }}</view>
			</view>
		</view>
		<view class="input">
			<view class="name">详细地址：</view>
			<input type="text" class="tips" v-model="address" placeholder="例如：例如：中山大道389号" />
		</view>
		<!-- <view class="input">
			<view class="name">门牌号:</view>
			<input type="text" class="tips" v-model="house" placeholder="例如：中山大道389号" />
		</view> -->
		<view class="default">
			<view class="default-text">设置为默认地址</view>
			<view class="li-right"><switch class="switch" :checked="defaule" color="#ff594d" @change="switchChange" /></view>
		</view>
		<view class="save" @click="addAddress" v-if="id > 0">确认修改</view>
		<view class="save" @click="addAddress" v-else>保存并使用</view>
		<mpvue-city-picker :themeColor="themeColor"  ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" :separ="separ"></mpvue-city-picker>
	</view>
</template>

<script>
import service from '@/store/service.js';
import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';
export default {
	data() {
		return {
			cityPickerValueDefault: [0, 0, 0],
			themeColor: '#1577FF',
			separ: '',
			defaule: false,
			id: '',
			name: '',
			phone: '',
			province: '',
			city: '',
			area: '选择您的所在地区',
			address: '',
			house: '',
			show: true,
			default: 0
		};
	},
	components: {
		mpvueCityPicker
	},
	onLoad: function(e) {
		this.id = e.id;
		console.log(e);
		if (this.id > 0) {
			var title = '编辑收货地址';
			var self = this;
			self.$http
				.post(service.api.address.getAddress, {
					id: e.id
				})
				.then(function(res) {
					console.log(res, 666);

					var list = res.data;
					self.name = list.name;
					self.phone = list.phone;
					self.province = list.province;
					self.city = list.city;
					self.area = list.area;
					self.address = list.address;
					var type = list.is_default;
					console.log(type,444);
					if (type == 1) {
						self.defaule = true;
					} else {
						self.defaule = false;
					}
					// self.addressList = list;
				});
		} else {
			var title = '新增收货地址';
		}
		uni.setNavigationBarTitle({
			title: title
		});
	},
	methods: {
		//是否设为默认
		switchChange(e) {
			var type = e.detail.value;
			console.log(e.detail.value);
			this.defaule = type;
			if (type) {
				this.default = 1;
			} else {
				this.default = 0;
			}
			console.log(this.default);
		},
		addAddress() {
			var self = this;
			self.$http
				.post(service.api.address.modifyAddress, {
					name: self.name,
					phone: self.phone,
					province: self.province,
					city: self.city,
					area: self.area,
					address: self.address,
					is_default: self.default,
					id: self.id
				})
				.then(function(res) {
					console.log(res);

					uni.showToast({
						icon: 'none',
						title: res.info
					});
					if (res.code == 1) {
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							});
						}, 2000);
					}
					// var list = res.data;
					// self.addressList = list;
					// if(list.logo){
					// self.goodsLogo=
					// }
				});
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
		}
	}
};
</script>

<style scoped>
page {
	background-color: #fff;
}
.input {
	display: flex;
	align-items: center;
	height: 132upx;
	margin: 0 30upx;
	border-bottom: 1px solid #f5f5f5;
}
.name {
	width: 192upx;
	font-size: 30upx;
}
.tips {
	font-size: 28upx;
	color: #808080;
	flex: 1;
}
.default {
	height: 132upx;
	margin: 0 30upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 125upx;
}
.default-text {
	font-size: 30upx;
}
.save {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 36upx;
	color: #fff;
	background: #ff594d;
	border-radius: 50upx;
	margin: 0 20upx;
	height: 100upx;
}
</style>
