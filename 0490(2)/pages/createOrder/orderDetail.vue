<template>
	<view class="confirm_order">
		<!-- 金额-数量 信息 -->
		<view class="money_options">
			<!-- 商品金额 -->
			<view class="money com_money_sty">
				<text class="title com_tx_sty">手续费</text>
				<text class="com_sum_sty price">{{ charge }}</text>
			</view>
			<!-- 邮费 -->
			<view class="postage com_money_sty">
				<text class="com_tx_sty">订单编号</text>
				<text class="com_sum_sty">{{ payDetail.order_no }}</text>
			</view>
		</view>
		<!-- 支付方式 -->
		<view class="payment_methods">
			<radio-group @change="paymentType">
				<!-- 拼豆支付 -->

				<!-- 微信/支付宝支付 -->
				<view class="webchat com_sty_row" v-for="(item, index) in payment_method" :key="index">
					<view class="left">
						<image src="/static/icon/weixin.png" mode="aspectFit"></image>
						<text>{{ item.name }}</text>
					</view>
					<view class="right">
						<radio :value="item.key" color="#ff594d" style="transform: scale(0.8);"></radio>
					</view>
				</view>
			</radio-group>
		</view>
		<view class="mask" v-show="isMask">
			<view class="mask_top">
				<image src="../../static/icon/close.png" mode="" @click="isMask = !isMask"></image>
			</view>
			<view class="background">
				<view class="remind">提醒</view>
				<view class="bg">
					<image class="bg-img" src="../../static/img/pay-bg.png" mode=""></image>
				</view>
				<view class="confirm">
					<view class="confirm-text">确认使用拼豆支付吗</view>
					<view class="submit" @click="handlePaySubmit">确认付款</view>
				</view>
			</view>
		</view>

		<!-- <view class="submit-btn" @click="isMask=!isMask">确认付款</view> -->
		<view class="submit-btn" @click="showMask">确认付款</view>
	</view>
</template>

<script>
	import service from '@/store/service.js';
	import {antiShake} from '@/store/rest.js'; //防抖

	// #ifdef H5
	import wx from 'weixin-js-sdk';
	// #endif

	let timeStamp = Date.parse(new Date()) / 1000;
	export default {
		data() {
			return {
				isMask: false, //遮罩
				oid: '',
				payDetail: [],
				value: '',
				type: '',
				money: '',
				charge: 0,
				entrust_id: 0,
				payment_method: [],
			};
		},
		onLoad: function(e) {
			this.oid = e.order_id;
			this.charge = e.charge
			this.entrust_id = e.entrust_id
			this.getPayDetail();

		},
		methods: {
			wexinPay(data, cb, errorCb) {
				//获取后台传入的数据
				let appId = data.appId;
				let timestamp = data.timeStamp;
				let nonceStr = data.nonceStr;
				let signature = data.signature;
				let packages = data.package;
				let paySign = data.paySign;
				let signType = data.signType;
				console.log('发起微信支付', 233);
				//下面要发起微信支付了
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: appId, // 必填，公众号的唯一标识
					timestamp: timestamp, // 必填，生成签名的时间戳
					nonceStr: nonceStr, // 必填，生成签名的随机串
					signature: signature, // 必填，签名，见附录1
					jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				wx.ready(function() {
					wx.chooseWXPay({
						timeStamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
						nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
						package: packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
						signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
						paySign: paySign, // 支付签名
						success: function(res) {
							// 支付成功后的回调函数
							cb(res);
						},
						fail: function(res) {
							//失败回调函数
							errorCb(res);
						}
					});
				});
				wx.error(function(res) {
					// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
					/*alert("config信息验证失败");*/
				});
			},
			paymentType(e) {
				const paymentType = e.detail.value;
				console.log(paymentType);
				this.type = paymentType;
			},
			getPayDetail() {
				var self = this;
				// uni.getSystemInfoSync().platform == 'ios'
				self.$http
					.get(service.api.group.payDetail, {
						orderid: this.oid
					})
					.then(function(res) {
						var list = res.data.order;
						var list_ = res.data.payment_method
						self.payment_method = list_;
						console.log(list, 222);
						self.payDetail = list;
						self.payment_method = list_
						console.log(self.payment_method, 123);
						if (res.data == 0) {
							uni.showModal({
								icon: 'none',
								title: res.info
							});
						}
					});
			},
			 showMask:antiShake(function(){
				console.log(1);
				var self = this;
				var value = self.type;
				// console.log();
				// console.log(value);
				
				this.handlePay();
				
			}),
			handlePaySubmit() {
				this.handlePay();
			},

			// #ifdef APP-PLUS
			handlePay() {
				var self = this;
				console.log(this.type, 233);
				if (this.type == 'wechat_app') {

					self.$http
						.post(service.api.order.pay, {
							orderid: self.oid,
							pay_type: self.type,
							entrust_id: self.entrust_id,
							charge: self.charge,
						})
						.then(function(res) {
							console.log(res);
							// uni.showModal({
							//         content: JSON.stringify(res)
							// })
							if (res.code == 1) {
								console.log(res)
								let data = res.data.pay_data;
								console.log(data, 3333);
								let obj = {
									appid: data.appid,
									noncestr: data.nonceStr,
									package: data.package, // 固定值，以微信支付文档为主  
									partnerid: data.partnerid,
									prepayid: data.prepayid,
									timestamp: data.timeStamp,
									sign: data.paySign // 根据签名算法生成签名  
								}
								// let orderInfo = JSON.stringify(obj) 
								// console.log(obj, 455);
								uni.requestPayment({
									provider: 'wxpay',
									orderInfo: obj, //微信、支付宝订单数据  
									success: function(res) {
										// console.log(res, 666);
										uni.showToast({
											icon: 'none',
											title: res.info
										});
										setTimeout(function() {
											uni.navigateBack({
												delta: 1
											});
										}, 1500);
										
										console.log('success:' + JSON.stringify(res))
									},
									fail: function(err) {
										uni.showModal({
											content: "支付失败，请重新支付",
											showCancel: false
										})
										console.log('fail:' + JSON.stringify(err));
									}
								});
							} else {
								uni.showToast({
									icon: 'none',
									title: res.info
								});
							}
						});
				} else if (this.type == 'base_balance') {
					self.$http
						.post(service.api.order.pay, {
							order_id: this.oid,
							pay_type: this.type
						})
						.then(function(res) {
							if (res.code == 1) {
								uni.navigateTo({
									url: '../createOrder/pay'
								});
							} else {
								uni.showToast({
									icon: 'none',
									title: res.info
								});
							}
						});
				}
			}
			// #endif
			// #ifdef H5
			handlePay() {
				var self = this;
				console.log(this.type, 234);
				if (this.type == 'wechat_weixin') {
					self.$http
						.post(service.api.group.pay, {
							orderid: self.oid,
							pay_type: self.type,
							entrust_id: self.entrust_id,
							charge: self.charge,
						})
						.then(function(res) {
							if (res.code == 1) {
								if (res.data) {
									// 存储微信支付数据data
									let data = res.data;
									console.log(data, 111);
									console.log(timeStamp);
									let prepay = 'prepay_id=' + data.prepay_id;
									wx.config({
										debug: false, // 这里一般在测试阶段先用ture，等打包给后台的时候就改回false,
										appId: data.pay_data.appId, // 必填，公众号的唯一标识
										timestamp: data.pay_data.timeStamp, // 必填，生成签名的时间戳
										nonceStr: data.pay_data.nonceStr, // 必填，生成签名的随机串
										signature: data.pay_data.paySign, // 必填，签名
										jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
									});
									wx.ready(() => {
										// 		wx.checkJsApi({
										// 			jsApiList: ['chooseWXPay'],
										// 			success: function(res) {
										// 				console.log('seccess');

										// 			},
										// 			fail: function(res) {
										// 				console.log('fail');
										// 				console.log(res);
										// 			}
										// 		});

										wx.invoke(
											'getBrandWCPayRequest', {
												// "appId" : data.appid,     //公众号名称，由商户传入
												// "timeStamp":timeStamp,         //时间戳，自1970年以来的秒数
												// "nonceStr" : data.nonce_str, //随机串
												// "package" : data.prepay_id,
												// "signType" : "MD5",         //微信签名方式:
												// "paySign" : data.sign ,//微信签名
												appId: data.pay_data.appId,
												timeStamp: data.pay_data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
												nonceStr: data.pay_data.nonceStr, // 支付签名随机串，不长于 32 位
												package: data.pay_data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
												signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
												paySign: data.pay_data.paySign // 支付签名
											},
											function(res) {
												if (res.err_msg == 'get_brand_wcpay_request:ok') {
													uni.navigateTo({
														url: './pay'
													});
												} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
											}
										);
										//  wx.chooseWXPay({
										// 	// timestamp: data.pay_data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
										// 	// nonceStr: data.pay_data.nonceStr, // 支付签名随机串，不长于 32 位
										// 	// package: data.pay_data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
										// 	// signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
										// 	// paySign: data.pay_data.paySign, // 支付签名
										// appId: data.pay_data.appId,
										// timestamp: data.pay_data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
										// nonceStr: data.pay_data.nonceStr, // 支付签名随机串，不长于 32 位
										// package: data.pay_data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
										// signType:  'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
										// paySign: data.pay_data.paySign, // 支付签名
										// 	success: function(res) {
										// 		// 支付成功后的回调函数
										// 		console.log("调取成功");
										// 	},
										// 	fail: function(res) {
										// 		console.log('支付失败2');
										// 		console.log(res.errMsg);
										// 	}
										// });
									});
									wx.error(err => {
										console.log(err);
									});
									return;
									//函数为分装过得 (就是调用微信支付)
									// wx.config(
									// {
									// 	beta:true,
									//  appId: data.appid,
									//  nonceStr: data.nonce_str,
									//  package: 'prepay_id=' + data.prepay_id,
									//  paySign: 'MD5',
									//  signType: data.sign,
									//  timeStamp:'1597664082',
									//  jsApiList: [
									//            'openLocation',
									//            'chooseWXPay',
									//            'chooseImage',
									//            'uploadImage',
									// 		   'getBrandWCPayRequest'
									//          ]
									// },
									// wx.ready(function() {
									//     console.log('ready')
									// }),

									// res => {
									//  that.$router.push({ path: "http://rr0482.8396048.com/h5/#/pages/createOrder/pay" });
									// }

									// );
								}

								return;
								uni.navigateTo({
									url: './pay'
								});
							} else {
								uni.showToast({
									icon: 'none',
									title: res.info
								});
							}
						});
				} else if (this.type == 'base_balance') {
					self.$http
						.get(service.api.group.pay, {
							orderid: this.oid,
							payment: this.type
						})
						.then(function(res) {
							if (res.code == 1) {
								uni.navigateTo({
									url: './pay'
								});
							} else {
								uni.showToast({
									icon: 'none',
									title: res.info
								});
							}
						});
					// }
				}
			}
			// #endif

		}
	};
</script>

<style lang="less" scoped>
	.confirm_order {
		// margin: 0 20upx;

		// 联系人
		.contact {
			width: 100%;
			height: 180upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 20upx;
			padding-left: 21upx;
			box-sizing: border-box;
			padding-top: 25upx;

			.top {
				display: flex;
				justify-content: space-between;

				.name {
					height: 31upx;
					font-size: 32upx;
					font-weight: bold;
					color: rgba(0, 0, 0, 1);
				}

				.phone {
					height: 25upx;
					font-size: 32upx;
					font-weight: bold;
					color: rgba(0, 0, 0, 1);
					margin-right: 22upx;
				}
			}

			.bottom {
				display: flex;
				height: 72upx;
				width: 100%;
				margin-top: 26upx;

				.icon_right {
					height: 48upx;
					width: 48upx;

					>image {
						height: 100%;
						width: 100%;
					}
				}

				.address {
					flex: 1;
					margin-top: 5upx;

					>text {
						font-size: 28upx;
						font-weight: bold;
						color: rgba(102, 102, 102, 1);
					}
				}
			}
		}

		.goods_list {
			padding: 26upx 31upx 33upx 21upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 20upx;
			// width: 100%;
			height: 322upx;
			margin-top: 20upx;

			.info {
				display: flex;

				.img {
					height: 165upx;
					width: 165upx;

					>image {
						height: 100%;
						width: 100%;
					}
				}

				.detail {
					margin-left: 15upx;
					display: flex;
					flex-direction: column;

					.title {
						width: 478upx;
						height: 66upx;
						font-size: 28upx;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
						line-height: 36upx;
						text-overflow: ellipsis;
						overflow: hidden;
					}

					.type {
						width: 122upx;
						height: 35upx;
						background: rgba(244, 244, 244, 1);
						border-radius: 18upx;
						font-size: 22upx;
						font-weight: 500;
						color: rgba(170, 169, 169, 1);
						text-align: center;
						margin-top: 10upx;
					}

					.note {
						margin-top: 26upx;
						display: flex;
						justify-content: space-between;

						.total {
							flex: 1;
							height: 22px;
							font-size: 28upx;
							font-weight: bold;
							color: rgba(233, 144, 64, 1);
							line-height: 42upx;
						}

						.num {
							width: 26upx;
							height: 20upx;
							font-size: 28upx;
							font-weight: 500;
							color: rgba(233, 144, 64, 1);
							line-height: 42upx;
						}
					}
				}
			}

			.comment {
				margin-top: 50upx;
			}
		}

		.money_options {
			// width: 100%;
			// height: 264upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 20upx;
			// padding-top: 10upx;
			padding: 30upx 0;
			position: relative;
			margin: 20upx 20upx 0;

			.com_money_sty {
				height: 60upx;
				// width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 21upx;
				margin-bottom: 10upx;

				.com_tx_sty {
					font-size: 28upx;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					line-height: 42upx;
				}

				.com_sum_sty {
					// height: 20upx;
					font-size: 26upx;
					font-weight: 500;
					color: rgba(102, 102, 102, 1);
					line-height: 42upx;
				}

				.price {
					font-size: 26upx;
					font-weight: bold;
					color: #ff594d;
				}
			}

			.receipt {
				margin-top: 56upx;

				.top {
					display: flex;
					justify-content: space-between;
					height: 40upx;
					// width: 100%;
					padding: 0 21upx;

					>text {
						height: 25upx;
						font-size: 26upx;
						font-weight: 500;
						color: rgba(102, 102, 102, 1);
					}

					.img {
						height: 40upx;
						width: 40upx;
						// border: 1px dashed #888888;
						display: flex;
						align-items: center;
						justify-content: center;
						padding-left: 7upx;
						overflow: hidden;
					}
				}

				.note {
					width: 278upx;
					height: 20upx;
					font-size: 20upx;
					font-weight: 500;
					color: rgba(153, 153, 153, 1);
					padding: 0 21upx;
				}
			}
		}

		// 支付方式

		.payment_methods {
			padding: 30upx 27upx 20upx 20upx;
			// width:100%;
			// height: 255upx;
			border-radius: 20upx;
			background-color: #ffffff;
			margin: 20upx 20upx 98upx;
			// 共有样式

			.com_sty_row {
				// height: 80upx;
				width: 100%;
				padding: 0 19upx 0 16upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10upx;

				.left {
					display: flex;
					align-items: center;

					>image {
						height: 58upx;
						width: 58upx;
						margin-right: 30upx;
					}

					>text {
						height: 25upx;
						font-size: 26upx;
						font-weight: 500;
						color: rgba(102, 102, 102, 1);
						line-height: 25upx;
						margin-left: 10upx;
					}

					.text {
						display: flex;
						flex-direction: column;
						line-height: 40upx;
						margin-left: 8upx;
						color: #666;
						font-size: 26upx;
					}

					.text-top {
						color: #333;
					}

					.up {
						font-size: 26upx;
						color: #e99040;
						line-height: 25upx;
					}
				}

				.right {}
			}
		}
	}

	// 确认付款
	.confirm {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.confirm-text {
		margin-top: -150upx;
		color: #333;
		font-size: 30upx;
		margin-bottom: 88upx;
	}

	.submit {
		background: linear-gradient(90deg, rgba(233, 144, 64, 1) 0%, rgba(255, 123, 76, 1) 100%);
		box-shadow: 0px 0px 31upx 0px rgba(254, 209, 173, 1);
		border-radius: 50upx;
		width: 90%;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		// margin: 0 32upx 0 28upx;
		height: 100upx;
		// font-size: 36upx;
	}

	.submit-btn {
		background: #ff594d;
		border-radius: 50upx;
		color: #fff;
		display: flex;
		cursor: pointer;
		justify-content: center;
		align-items: center;
		margin: 0 20upx;
		height: 100upx;
		font-size: 36upx;
	}

	.bg {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.background {
		background-color: #fff;
		height: 760upx;
		border-radius: 10upx;
		// margin: 0 68upx;
		position: absolute;
		top: 294upx;
		left: 68upx;
		width: 615upx;
		// margin-top: 260upx;
	}

	.bg-img {
		height: 400upx;
	}

	.remind {
		font-size: 36upx;
		font-weight: bold;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 60upx;
		padding-bottom: 100upx;
	}

	// 遮罩样式
	.mask {
		position: fixed;
		top: 0;
		// right: 60upx;
		// left: 60upx;
		bottom: 0;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		z-index: 99;

		// background: rgba(0, 0, 0, 1);
		.mask_top {
			opacity: 0.53;
			background: rgba(0, 0, 0, 1);
			flex: 1;

			image {
				position: absolute;
				bottom: 150upx;
				left: 50%;
				transform: translateX(-40upx);
				width: 80upx;
				height: 80upx;
			}
		}

		.mask_content {
			height: 760upx;
			margin: 0 60upx 300upx 60upx;
			// width: 100%;
			background-color: #ffffff;
			position: absolute;
			bottom: 0;
			right: 0;
			left: 0;
			background: rgba(255, 255, 255, 1);
			border-radius: 12upx;
			padding-top: 42upx;

			// box-sizing: border-box;
			.title {
				height: 105upx;
				width: 100%;
				display: flex;
				justify-content: center;
				// padding: 0 15upx 0 272upx;
				align-items: center;
				box-sizing: border-box;
				padding-bottom: 30upx;
				border-bottom: 1px solid #f1f1f1;

				>text {
					height: 34upx;
					font-size: 32upx;
					font-weight: bold;
					color: rgba(51, 51, 51, 1);
					line-height: 34upx;
				}

				>image {
					height: 58upx;
					width: 58upx;
				}
			}
		}
	}

	.options {
		margin-top: 10upx;

		.list {
			height: 100upx;
			width: 100%;
			padding: 0 30upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			color: #333;
			font-size: 32upx;
			// border-bottom: 1px solid rgba(244, 244, 244, 1);
		}

		.list_end {
			border-bottom: 0;
		}
	}

	.btn {
		display: flex;
		justify-content: space-between;
		align-items: center;
		// width: 710upx;
		height: 100upx;
		// background: linear-gradient(90deg, rgba(233, 144, 64, 1) 0%, rgba(255, 123, 76, 1) 100%);
		// border-radius: 10upx;
		font-size: 36upx;
		font-weight: 500;
		text-align: center;
		line-height: 100upx;
		// color: rgba(255, 255, 255, 1);
		margin: 25upx auto;
		color: #333;
		font-size: 32upx;

		.confirm {
			width: 50%;
		}

		.confirm-btn {
			color: #000;
			font-weight: bold;
		}
	}
</style>
