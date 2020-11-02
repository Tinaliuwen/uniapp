<template>
	<view class="address">
		<view class="content" v-for="(item, index) in addressList" :key="index">
			<view @click="saver(index)">
				<view class="name">
					<view class="title">{{ item.name }}</view>
					<view class="phone">{{ item.phone }}</view>
				</view>
				<!-- 广东省广州市天河区中山大道中398号晨竣商务大厦**号 -->
				<view class="address-detail">{{ item.province + item.city + item.area + item.address }}</view>
			</view>
			<view class="setting">
				<label class="radio" @click="_default(item)">
					<radio value="" color="#ff594d" :checked="item.is_default === 0 ? false : true" style="transform:scale(0.7);"
					 :name="item.id" />
					设为默认
				</label>
				<!-- <view class="setting-left"></view> -->
				<view class="edit" @click="editAddress(item.id)">
					<image class="icon" src="../../static/img/bianji.png" mode=""></image>
					<view>编辑</view>
				</view>
				<view class="edit" @click="delAddress(item.id)">
					<image class="icon" src="../../static/img/shanchu.png" mode=""></image>
					<view class="del">删除</view>
				</view>
			</view>
		</view>
		<view class="not-data" v-if="addressList.length == 0">暂无收货地址</view>
		<!-- <view class="content">
			<view class="name">
				<view class="title">牛哄哄</view>
				<view class="phone">130000000001</view>
			</view>
			<view class="address-detail">广东省广州市天河区中山大道中398号晨竣商务大厦**号</view>
			<view class="setting">
				<view class="setting-left">设为默认</view>
				<view class="edit" @click="edit(id)">
					<image class="icon" src="../../static/img/bianji.png" mode=""></image>
					<view>编辑</view>
				</view>
				<view class="edit">
					<image class="icon" src="../../static/img/shanchu.png" mode=""></image>
					<view class="del">删除</view>
				</view>
			</view>
		</view> -->
		<!-- 模态框 -->
		<u-modal v-model="show_modal" :show-cancel-button='true' confirm-color='#ff594d'  @confirm="ti_modal" :content="content"></u-modal>
	</view>
</template>

<script>
	import service from '@/store/service.js';
	export default {
		data() {
			return {
				addressList: [],
				address: '',
				checked: false,
				save: 0,
				show_modal: false,
				content: '确定删除？',
				id_modal: ''
			};
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/pages/order/addAddress?id=0'
			});
		},
		onLoad: function(e) {
			if (e) {
				this.save = e.save;
			}
		},
		onShow: function() {
			this.getaddressList();
		},
		methods: {
			_default(item) {
				var self = this;
				self.$http
					.post(service.api.address.setAddress, {
						id: item.id
					})
					.then(function(res) {
						if (res.code === 1) {
							self.addressList.forEach(i => {
								i.is_default = 0;
								console.log(i.is_default, 123);
							});
							item.is_default = 1;
						} else {
							self.$api.msg(res.info);
						}
					});
			},
			saver(index) {
				// if (this.save == 1) {
				let add = uni.setStorageSync('address', this.addressList[index]);
				console.log(add, index);
				uni.navigateBack({
					delta: 1
				});
				// }
			},
			getaddressList() {
				var self = this;
				self.$http.post(service.api.address.addressList, {}).then(function(res) {
					// console.log(res, 356);

					var list = res.data;
					self.addressList = list;
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
			},
			editAddress(id) {
				uni.navigateTo({
					url: `./addAddress?id=${id}`
				});
			},
			delAddress(id) {
				// console.log(1121);
				var self = this;
				self.id_modal = id
				self.show_modal = true
				// uni.showModal({
				// 	title: '提示',
				// 	content: '确定删除？',
				// 	confirmColor:'#ff594d',
				// 	success: function(res) {
				// 		if (res.confirm) {
				// 			// console.log('用户点击确定');
				// 			self.$http
				// 				.post(service.api.address.deteleAddress, {
				// 					id: id
				// 				})
				// 				.then(function(res) {
				// 					// console.log(res);
				// 					uni.showToast({
				// 						icon: 'none',
				// 						title: res.info
				// 					});
				// 					setTimeout(function() {
				// 						if (res.code == 1) {
				// 							self.getaddressList();
				// 						}
				// 					}, 400);
				// 				});
				// 		} else if (res.cancel) {
				// 			// console.log('用户点击取消');
				// 		}
				// 	}
				// });

				// var list = res.data;
				// self.addressList = list;
				// self.addressList.forEach(item=>{
				// 	console.log(item);
				// 	console.log(item.province);
				// 	var address=item.province+item.city+item.area+item.address
				// 	console.log(address);
				// })
				// if(list.logo){
				// self.goodsLogo=
				// }
			},
			ti_modal() {
				var self = this;
				// console.log(self.id_modal);
				self.$http
					.post(service.api.address.deteleAddress, {
						id: self.id_modal
					})
					.then(function(res) {
						// console.log(res);
						uni.showToast({
							icon: 'none',
							title: res.info
						});
						setTimeout(function() {
							if (res.code == 1) {
								self.getaddressList();
							}
						}, 400);
					});
			},
		}
	};
</script>

<style scoped>
	.content {
		background-color: #fff;
		border-radius: 10upx;
		margin: 20upx;
		padding: 30upx 56upx 26upx 36upx;
	}

	.name {
		display: flex;
		align-items: center;
		font-weight: bold;
	}

	.title {
		font-size: 30upx;
	}

	.phone {
		margin-left: 32upx;
		font-size: 30upx;
	}

	.address-detail {
		border-bottom: 1px solid #f4f4f4;
		padding-bottom: 20upx;
		color: #666;
	}

	.setting {
		display: flex;
		justify-content: space-between;
		padding-top: 26upx;
	}

	.setting-left {
		color: #333;
	}

	.icon {
		width: 54upx;
		height: 50upx;
		/* margin-right: 20upx; */
	}

	.edit {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #999;
	}

	.del {
		margin-right: 24upx;
	}

	.not-data {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 200upx;
	}

	/deep/ .uni-modal__btn .uni-modal__btn_primary {
		color: #ff9933 !important;
	}
</style>
