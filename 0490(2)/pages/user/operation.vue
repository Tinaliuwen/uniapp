<template>
	<view class="transfer-balance">
		<view class="" v-if="type == 0"></view>

		<view v-else-if="type == 1">
			<view class="balance">
				<view class="rice">
					<text class="text">可转让余额:</text>
					<text class="price">{{ integral }}</text>
				</view>
			</view>

			<view class="balance">
				<view class="rice1"><text class="text1">转让余额</text></view>
				<view class="input">
					<view class="text">代理手机号</view>
					<input type="text" v-model="mobile" class="input-value" value="" placeholder="请输入代理手机号码" />
					<view class="all"></view>
				</view>

				<view class="input">
					<view class="text">转让数量</view>
					<input type="text" v-model="amount" class="input-value" value="" placeholder="请输入转让的余额" />
					<view class="all">
						<text>|</text>
						<text class="all-text" @click="getAll(integral)">全部</text>
					</view>
				</view>

				<view class="transfer" @click="roll" v-if="status == 1">转让</view>
				<view class="transfer" v-else>转让</view>

				<view class="tips">余额转让到对方账户不可逆转，请确认对方账户！</view>

				<view style="height: 60upx;"></view>
			</view>
		</view>

		<view v-else-if="type == 2">
			<view class="balance">
				<view class="rice">
					<text class="text">可提现余额:</text>
					<text class="price">{{ integral }}</text>
				</view>
			</view>

			<view class="balance">
				<view class="rice1"><text class="text1">余额提现</text></view>
				<view class="input">
					<view class="text">支付宝账号</view>
					<!-- <input type="text" v-model="cardname" class="input-value" value="" placeholder="请输入开户行名称" /> -->
					<view>{{zfb}}</view>

				</view>

				<view class="input">
					<view class="text">支付宝收款</view>
					<!-- <input type="text" v-model="nickname" class="input-value" value="" placeholder="请输入真实姓名" /> -->
					<image class="u-avatar-demo" @click="per_zfb" :src="avatar"></image>
				</view>

				<view class="input">
					<view class="text">微信收款</view>
					<!-- <input type="text" v-model="account" class="input-value" value="" placeholder="请输入提现的银行账号" /> -->
					<image class="u-avatar-demo" @click="per_wx" :src="avatar_wx"></image>
				</view>

				<view class="input">
					<view class="text">提现数量</view>
					<input type="text" v-model="amount" class="input-value" value="" placeholder="请输入提现的余额" @input="wither" />
					<view class="all">
						<!-- <text>|</text>
						<text class="all-text" @click="getAll(integral)">全部</text> -->
					</view>
				</view>
				<view class="wzradio" @change="radioGroupChange">
					<u-radio-group v-model="fk_value" >
						<u-radio v-for="(item, index) in fk_list" :key="index" @change="radioChange" active-color="#ff594d" :name="index" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</view>

				<view class="transfer" @click="withdrawal" v-if="status == 1">提现</view>
				<view class="transfer" v-else>提现</view>

				<!-- <view class="tips">提现手续费6%，提现周期为T+1个工作日！</view> -->
				<view class="tips">佣金提现金额不少于100，需实际交易三天</view>

				<view style="height: 60upx;"></view>
			</view>
		</view>

		<view v-else>
			<view class="balance">
				<view class="rice1"><text class="text1">充值余额</text></view>
				<view class="input">
					<view class="text">充值数量</view>
					<input type="text" v-model="number" class="input-value" value="" placeholder="请输入充值余额数量" />
					<view class="all"></view>
				</view>

				<view class="input">
					<view class="text">上传凭证</view>
					<view class="input-value" @click="cloose">
						<image :src="imgsrc != '' ? imgsrc : '/static/card/add.png'" mode="" class="input-img"></image>
					</view>
					<view class="all"></view>
				</view>
				<view style="height: 60upx;"></view>

				<view class="tips">数量要求：最小1000，最大值600000，基数10000</view>

				<view class="transfer" @click="recharge" v-if="status == 1">充值</view>
				<view class="transfer" v-else>充值</view>

				<view style="height: 60upx;"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '@/store/service.js';
	export default {
		data() {
			return {
				type: 3,
				integral: '0.00',
				mobile: '',
				account: '',
				cardname: '',
				nickname: '',
				avatar: '',
				avatar_wx: '',
				amount: '',
				zfb: '',
				number: '',
				imgsrc: '',
				status: 1,
				fk_list: [{
						name: '支付宝账号',
						disabled: false
					},
					{
						name: '支付宝收款',
						disabled: false
					},
					{
						name: '微信收款',
						disabled: false
					}
				],
				fk_value: '默认'
			};
		},
		onShow() {
			var self = this;
			self.$http.post(service.api.main.user).then(function(res) {
				if (res.code == 1) {
					res = res.data;
					self.integral = res.credit2;
					self.zfb = res.alipay_account;
					self.avatar = res.alipay_code;
					self.avatar_wx = res.wechat_code;
					if (self.zfb == '' || self.avatar == '' || self.avatar_wx == '') {
						uni.showToast({
							icon :'none',
						    title: '请先填写三种收款信息',
						    duration: 3500
						});
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/main/distribution'
							})
						}, 3500);

					}
				} else {
					self.$api.msg(res.msg);
				}
			});
		},
		onLoad: function(e) {
			var self = this;
			self.type = e.type;
		},
		methods: {
			wither(e) {
				var number = e.detail.value;
				if (number > 100) {
					number = parseInt(number / 100) * 100;
				}
				this.amount = number;
			},
			cloose() {
				var self = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						var imageSrc = res.tempFilePaths[0];
						self.$http.upload(service.api.upload.image, imageSrc, 'image').then(function(res) {
							if (res.code == 1) {
								res = res.data;
								self.imgsrc = res.img_url;
								uni.hideToast()
							} else {
								self.$api.msg(res.info);
							}
						});
					},
					fail: (err) => {
						console.log('chooseImage fail', err)
					}
				})
			},
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
			// 转出余额
			roll() {
				var self = this;
				if (self.mobile == '') {
					self.$api.msg('代理手机号码不能为空');
					return;
				}
				if (self.amount == '' || self.amount < 1) {
					self.$api.msg('转让的余额不能小于0');
					return;
				}
				self.$http.post(service.api.upload.give, {
						number: self.amount,
						mobile: self.mobile
					})
					.then(function(res) {
						self.$api.msg(res.info);
						if (res.code == 1) {
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								});
							}, 1500);
						}
					});
			},
			//余额提现
			withdrawal() {
				var self = this;
				if (self.amount == '') {
					self.$api.msg('提现的余额数量不能为空');
					return;
				}
				if (self.amount < 100) {
					self.$api.msg('提现的余额数量不能小于100');
					return;
				}
				if (self.amount > self.integral) {
					self.$api.msg('提现的余额不足');
					return;
				}
				
				if (self.fk_value == '默认') {
					self.$api.msg('请选择一种收款方式');
					return;
				}
				self.$http.post(service.api.upload.withdrawal, {
					number: self.amount,
					type: self.fk_value
				}).then(function(res) {
					self.$api.msg(res.info);
					if (res.code == 1) {
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 1500);
					}
				});
			},
			radioChange(e) {
				this.fk_value = e
				console.log(this.fk_value);
			},
			 radioGroupChange(e){
				 
			 },
			//充值余额
			recharge() {
				var self = this;
				if (self.number == '') {
					self.$api.msg('充值的余额数量不能为空');
					return;
				}
				if (self.imgsrc == '') {
					self.$api.msg('付款凭证未上传');
					return;
				}
				self.$http.post(service.api.upload.recharge, {
						number: self.number,
						img: self.imgsrc
					})
					.then(function(res) {
						self.$api.msg(res.info);
						if (res.code == 1) {
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								});
							}, 1500);
						}
					});
			},
			per_zfb() {
				var photo_arr = new Array();
				var current = this.avatar;
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
			per_wx() {
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
			}
		}
	};
</script>

<style scoped>
	.u-avatar-demo {
		width: 60rpx;
		height: 60rpx;
	}
	.wzradio {
		text-align: center;
		margin-top: 30rpx;
	}
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
		width: 140upx;
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
		padding: 20upx 0;
	}

	.input-value {
		font-size: 28upx;
		color: #999;
		width: calc(100% - 220upx);
	}

	.input-img {
		width: 200upx;
		height: 200upx;
	}

	.all {
		width: 80upx;
		color: #ff594d;
	}

	.all-text {
		margin-left: 8upx;
	}

	.transfer {
		color: #fff;
		background: #ff594d;
		border-radius: 50upx;
		height: 100upx;
		width: 618upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 36upx;
		margin: 30upx 46upx 30upx 46upx;
	}

	.tips {
		display: flex;
		justify-content: center;
		font-size: 24upx;
		color: #999;
	}
</style>
