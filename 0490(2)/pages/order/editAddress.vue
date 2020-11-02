<template>
	<view class="address">
		<view class="input">
			<view class="name">姓名:</view>
			<input type="text" class="tips" v-model="name" placeholder="请填写收货人姓名" />
		</view>
		<view class="input">
			<view class="name">电话:</view>
			<input type="text" class="tips" v-model="phone" placeholder="请填写收货人电话" />
		</view>
		<view class="input">
			<view class="name">所在地区：</view>
			<view>
				<view class="tips" @click="addPicker">{{ province }}{{ city }}{{ area }}</view>
			</view>
		</view>
		<view class="input">
			<view class="name">详细地址:</view>
			<input type="text" class="tips" v-model="address" placeholder="例如：广东省广州市天河区" />
		</view>
		<view class="input">
			<view class="name">门牌号:</view>
			<input type="text" class="tips" v-model="house" placeholder="例如：中山大道389号" />
		</view>
		<view class="default">
			<view class="default-text">设置为默认地址</view>
			<view class="li-right"><switch class="switch" :checked="defaule" color="#ff594d" @change="switchChange" /></view>
		</view>
		<view class="save" @click="addAddress">确认修改</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" :separ="separ"></mpvue-city-picker>
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
			default:0
		};
	},
	components: {
		mpvueCityPicker
	},
	onLoad: function(e) {
		this.id = e.id;
			if (this.id > 0) {
				var title = '编辑收货地址';
				var self = this;
				self.$http.post(service.api.address.addressList, {
					id:e.id
				}).then(function(res) {
					console.log(res,666);
						
					// var list = res.data;
					// self.addressList = list;
					// self.addressList.forEach(item=>{
					// 	console.log(item);
					// 	console.log(item.province);
						// var address=item.province+item.city+item.area+item.address
						// console.log(address);
					// })
					// if(list.logo){
						// self.goodsLogo=
					// }
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
			if(type){
				this.default=1
			}else{
				this.default=0
			}
			console.log(this.default)
		},
		addAddress(){
			var self = this;
			self.$http.post(service.api.address.modifyAddress, {
				name:self.name,
				phone:self.phone,
				province:self.province,
				city:self.city,
				area:self.area,
				address:self.address,
				is_default:self.default
			}).then(function(res) {
				console.log(res);
					
						uni.showToast({
							icon:'none',
							title:res.info
						})
						if(res.code==1){
							setTimeout(function(){
								uni.navigateTo({
									url:'./address',
									})
								},2000)
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
		},
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
	background: linear-gradient(90deg, rgba(233, 144, 64, 1) 0%, rgba(255, 123, 76, 1) 100%);
	border-radius: 10upx;
	margin: 0 20upx;
	height: 100upx;
}
</style>
