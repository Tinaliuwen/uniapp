<template>
	<view class="wz_box">
		<view class="seller">
			 <!-- :class="[ok_upa == 0 ? 'no_xiu wz_right':'wz_right']" -->
			<view class="type wz_rev" style="height: 90rpx;line-height: 90rpx;">支付宝账号：
				<input class="wz_right" style="width: 60%;" ref='input_val' v-model="input_deval" type="text" placeholder="输入支付宝账号" placeholder-style="text-align: right;" />
			</view>
		</view>
		<view class="seller">
			<view class="type wz_rev" style="height: 90rpx;line-height: 90rpx;">银行卡卡号：
				<input  class="wz_right" style="width: 50%;"maxlength='19' ref='input_val' v-model="input_card" type="number" placeholder="输入银行卡卡号" placeholder-style="text-align: right;" />
			</view>
		</view>
		<view class="seller">
			<view class="type wz_rev" style="height: 150rpx;line-height: 80rpx;">卡号所属银行：
				<textarea class="wz_right" style="width: 70%;height: 110rpx;" ref='input_val' v-model="input_bank" placeholder="输入卡号所属银行"placeholder-style="text-align: right;" />
			</view>
		</view>
		<view class="wrap">
			<view>支付宝收款：</view>
			<view class="u-avatar-wrap">
				<image class="u-avatar-demo" @click="per_zfb" :src="avatar"></image>
			</view>
			<!-- <text class="up_zfb" @click="up_zfb" v-if='status_zfb == 1'>上传</text> -->
			<text class="up_zfb" @click="up_zfb">上传</text>
		</view>
		<view class="wrap">
			<view>微信收款：</view>
			<view class="u-avatar-wrap">
				<image class="u-avatar-demo" @click="per_wx" :src="avatar_wx"></image>
			</view>
			<!-- <text class="up_zfb" @click="up_wx" v-if='status_wx == 1'>上传</text> -->
			<text class="up_zfb" @click="up_wx">上传</text>
		</view>
		<!-- <button class="btn" @tap="ok_up" v-if="ok_upa == 1" type="primary">确认添加</button> -->
		<button class="btn" @tap="ok_up"  type="primary">确认添加</button>
	</view>
</template>

<script>
	import service from '@/store/service.js';
	export default {
		data() {
			return {
				//'
				input_deval: '',
				input_card:'',
				input_bank:'',
				show_zfb: true,
				show_wx: true,
				avatar: '',
				status:1,
				status_zfb: 0,
				status_wx: 0,
				avatar_wx: '',
				zf_img: '',
				zf_imgwx: '',
				titleValue: '',
				ok_upa:0
			}
		},
		onShow:function () {
			// this.getuser();
		},
		onLoad: function() {
			var self = this;
			// self.input_deval = self.$refs.input_val.cachedValue
			
			// self.avatar = uni.getStorageSync('storage_img');
			// self.avatar_wx = uni.getStorageSync('storage_imgwx');
			self.zf_img = uni.getStorageSync('storage_setimg');
			self.zf_imgwx = uni.getStorageSync('storage_setimgwx');

		},
		created() {
			this.zfb_img()
			this.wx_img();
			
		},
		mounted(){
			this.getuser();
			
		},
		methods: {
			getuser(){
				
				var self = this;
				self.$http .post(service.api.main.user).then(function(res) {
					if(res.code == 1){
						var res =res.data
						console.log(res.alipay_account);
						self.input_deval = res.alipay_account;
						self.input_card = res.bank_account;
						self.input_bank = res.bank_user;
						self.avatar = res.alipay_code;
						self.avatar_wx=res.wechat_code;
						if(self.input_deval != ''){
							self.status_wx = 0;
							self.status_zfb = 0;
							self.ok_upa = 0;
						}else{
							self.status_wx = 1;
							self.status_zfb = 1;
							self.ok_upa = 1;
						}
						if(res.is_agent == 0){
							self.qrcode = '';
						}else{
							self.qrcode = '/pages/service/qrcode';
						}
					}else{
						self.$api.msg(res.msg);
					}
				});
			},
			error(index) {
				this.avatar[index]['img'] = '../../static/img/qrcode.png'; //如果么有图片默认
			},
			// 上传支付宝
			up_zfb() {
				var self = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'],
					sourceType: ['album','camera'],
					success: res => {
						self.status_zfb = 0;
						var avatar_payy = res.tempFilePaths[0];
						self.zf_img = res.tempFilePaths;
						self.$http.upload(service.api.upload.image,avatar_payy,'image').then(function(res) {
							if(res.code == 1){
								res = res.data;
								self.avatar = res.img_url;
								console.log(self.avatar_pay);
								uni.setStorageSync('storage_img', self.avatar)
								
							}else{
								self.$api.msg(res.info);
							}
							uni.setStorageSync('storage_setimg', self.zf_img)
						});
						
					}
				});
			},
			per_zfb() {
				console.log(2);
				this.status_zfb = 0;
				var photo_arr = new Array();
				var current = this.avatar;
				photo_arr.push(current);
				uni.previewImage({
					urls: photo_arr,
					current:current,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: data => {
							console.log(1);
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							
							console.log(err.errMsg);
						}
					}
				});
			},
			// 上传微信
			up_wx() {
				var self = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'],
					sourceType: ['album','camera'],
					success: res => {
						self.status_wx = 0;
						var avatar_payy = res.tempFilePaths[0];
						self.zf_imgwx = res.tempFilePaths;
						self.$http.upload(service.api.upload.image,avatar_payy,'image').then(function(res) {
							if(res.code == 1){
								res = res.data;
								self.avatar_wx = res.img_url;
								console.log(self.avatar_pay);
								uni.setStorageSync('storage_imgwx', self.avatar_wx)
								
							}else{
								self.$api.msg(res.info);
							}
							uni.setStorageSync('storage_setimgwx', self.zf_imgwx)
						});
						
					}
				});
			},
			per_wx() {
				this.status_wx = 0;
				var photo_arr = new Array();
				var current = this.avatar_wx;
				photo_arr.push(current);
				uni.previewImage({
					urls: photo_arr,
					current: current,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: data => {
							
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			ok_up() {
				var self = this;
				// self.status_wx = 0;self.status_zfb = 0;
				console.log(self.input_deval);
				self.$http.post(service.api.main.updateHyiInfo, {
						alipay_account:self.input_deval,
						bank_user:self.input_bank,
						bank_account:self.input_card,
						alipay_code:self.avatar,
						wechat_code:self.avatar_wx
					})
					.then(function(res) {
						if (res.code == 1) {
							self.$api.msg('添加成功');
							setTimeout(function() {
								uni.switchTab({
									url: '/pages/main/user'
								});
							}, 2000);
							
						}else{
							self.$api.msg(res.info);
						}
					});
			},
			// 进来判断是否有图片
			zfb_img() {
				var ImgObj = new Image(); //判断图片是否存在
				ImgObj.src = this.avatar;
				if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
					this.status_zfb = 0
					console.log("有图片");
					return true;
				} else {
					this.status_zfb = 1
					console.log("没有图片");
					// this.avatar = '/static/card/add.png'
					
					return false;
				}
			},
			wx_img() {
				var ImgObjwx = new Image(); //判断图片是否存在  
				ImgObjwx.src = this.avatar_wx;
				//存在图片
				if (ImgObjwx.fileSize > 0 || (ImgObjwx.width > 0 && ImgObjwx.height > 0)) {
					console.log("有图片");
					this.status_wx = 0
					return true;
				} else {
					this.status_wx = 1
					// this.avatar_wx = '/static/card/add.png'
					console.log("没有图片");
					
					return false;
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.wz_box {
		background: #fff;
		// margin-top: 20rpx;
		padding-bottom: 80rpx;
	}
	.no_xiu{
		pointer-events: none;
	}
	/deep/.uni-textarea-textarea{
		text-align: right;
	}
	.seller {
		// margin-top: 20rpx;
		/* padding: 20rpx; */
		padding: 0px 20rpx;
		line-height: 42rpx;
		border-bottom: 2rpx solid #f1f1f1;

		.wz_rev {
			width: 100%;
			position: relative;
		}

		.wz_right {
			display: initial;
			position: absolute;
			right: 0px;
			border-radius: 10rpx;
			height: 50rpx;
			top: 20rpx;
			font-size: 28rpx;
		}
	}

	.wrap {
		display: flex;
		height: 90rpx;
		line-height: 90rpx;
		padding: 0px 20rpx;
		position: relative;
		border-bottom: 2rpx solid #f1f1f1;

		.u-avatar-wrap {
			position: absolute;
			right: 100rpx;
			top: 14rpx;
		}

		.u-avatar-demo {
			width: 60rpx;
			height: 60rpx;
		}

		.updateT {
			width: 30%;
			height: 64rpx;
			border-radius: 40rpx;
			line-height: 64rpx;
			background: none;
			font-size: 28rpx;
			color: #7e7e7e;
			border: 2rpx solid #7e7e7e;
		}

		.up_zfb {
			color: red;
			height: 90rpx;
			line-height: 90rpx;
			// margin-top: 24rpx;
			padding: 0 20rpx;
			position: absolute;
			right: 0px;
			/* margin-left: 30rpx; */
			border-radius: 30rpx;
			// border: 2rpx solid #818181;
		}

	}

	.btn {
		margin: 80rpx 20rpx;
		background:#ff594d;
		border-radius: 50rpx;
	}

	/deep/.uni-input-input {
		// background: #F3F3F3;
		// padding: 10rpx 6rpx;
		text-align: right;
		width: 100%;
	}
</style>
