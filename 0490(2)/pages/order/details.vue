<template>
	<div class="container">
		<view class="top" v-if="order_no != ''">
			<image src="/static/order/pay.png" v-if="status == 2" mode="" class="o-img"></image>
			<image src="/static/order/delivery.png" v-if="status == 3" mode="" class="o-img"></image>
			<image src="/static/order/comment.png" v-if="status == 5" mode="" class="o-img"></image>
			<image src="/static/order/delivery2.png" v-if="status == 4" mode="" class="o-img"></image>
			<view class="status" v-if="status == -1"></view>
			<view class="status" v-if="status == 0">订单已取消</view>
			<view class="status" v-if="status == 1">订单待审核</view>
			<view class="status" v-if="status == 6">订单待上架</view>
			<view class="status" v-if="status == 8 && is_paysti == 0">订单待审核</view>
			<view class="status" v-if="status == 8 && is_paysti == 1">订单已确认</view>
			<view class="status" v-if="status == 9  && is_delis == 0">订单去发货</view>
			<view class="status" v-if="status == 9  && is_delis == 1">订单已发货</view>
			<view class="status" v-if="status == 7">订单出售中</view>
			<view class="status" v-if="status == 10">订单已收款</view>

			<view class="status" v-if="status == 2">
				<block v-if="pay_state == 0 && it_possible == 0">等待付款</block>
				<block v-if="pay_state == 1">订单未审核</block>
				<block v-if="pay_state == 2">订单已审核</block>
				<block v-if="pay_state == 3">审核不通过</block>
				<block v-if="pay_state == 0 && it_possible == 1">订单已过期</block>
			</view>

			<view class="status" v-if="status == 3">已审核待发货</view>
			<view class="status" v-if="status == 4">已审核待发货</view>

			<view class="status" v-if="status == 5">
				<block v-if="refund_state == 0">订单已完成</block>
				<block v-if="refund_state == 1">订单待退款</block>
				<block v-if="refund_state == 2">订单已退款</block>
			</view>


			<view class="money">
				订单金额：
				<block>￥{{realprice}}</block>
				<!-- {{realprice}} -->
			</view>
		</view>

		<view class="li-top" v-if="name  != ''">
			<image src="../../static/icon/store.png" mode="widthFix"></image>
			<view class="li-center">收货人信息</view>
		</view>

		<view class="wrapper" v-if="name  != ''">
			<view class="u-box">
				<text class="name">收货人：{{name}}</text>
				<text class="mobile">{{phone}}</text>
			</view>

			<view class="address-box">
				<text class="address">收货地址：{{province}} {{city}} {{area}} {{address}}</text>
			</view>
		</view>


		<view class="li-top" v-if="express_info.length > 0" @click="express()">
			<image src="../../static/icon/store.png" mode="widthFix"></image>
			<view class="li-center">物流信息</view>
			<uni-icons size="20" type="forward" class="top-icon"></uni-icons>
		</view>

		<view class="express" v-if="express_info.length > 0">
			<view class="exp-top">{{exp_text}}</view>
			<view class="exp-time">{{exp_time}}</view>
		</view>

		<view class="li-top" v-if="goodsList.length > 0">
			<image src="../../static/icon/store.png" mode="widthFix"></image>
			<view class="li-center">订单详情</view>
		</view>

		<view class="li" v-if="goodsList.length > 0">
			<view class="li-cen" v-for="(li,idx) in goodsList" :key="idx" :style="idx > 0 ? 'border-top: 2upx solid #F2F2F2;' : ''">
				<image :src="li.goods_logo" mode="" class="cen-img"></image>

				<view class="cen-right">
					<view class="clamps title">{{li.goods_title}}</view>
					<view class="price">
						<block v-if="type == 1">价格：<text>￥{{li.price_selling}}</text></block>
						<block v-if="type == 2">价格：<text>￥{{li.price_selling}}</text></block>
						<block v-if="type == 3">价格：<text>{{money}} {{li.credit}} {{score}}</text></block>
						<text style="color: #808080;float: right;">共{{li.number_goods}}件</text>
					</view>
					<view class="price spec">
						价格：{{li.price_selling}}
					</view>
				</view>
			</view>

			<!-- <view class="remark">备注：{{remark}}</view> -->
		</view>

		<view class="shop_price" v-if="order_no != ''">
			<!-- <view>商品小计：<text>￥{{realprice}}</text></view> -->
			<!-- <view v-if="type != 3">订单运费：<text>￥{{priceexpress}}</text></view> -->
			<view v-if="type != 3">商品金额：<text>￥{{realprice}}</text></view>
			<view v-if="status == 7 || status == 8 || status == 9">出售金额：<text>￥{{discount}}</text></view>
		</view>

		<view class="order" v-if="order_no != ''">
			<view class="type">订单单号：{{order_no}}<text class="copy" @click="copy_z(order_no)">复制</text></view>
			<view class="type">创建时间：{{create_at}}</view>
			<view class="jxtime" v-if="status == 2">
				支付倒计时：<uni-countdown :count="count_down" type="4" fontColor="#F10B26" ref='jxtime' v-if="count == 1"></uni-countdown>
			</view>
			<!-- <view class="type" v-if="status >= 3">支付单号：{{pay_no}}</view> -->
			<!-- 	<view class="type" v-if="status >= 3">审核时间：{{pay_at}}</view>
			<view class="type" v-if="status == 0">取消时间：{{cancel_at}}</view>
			<view class="type" v-if="status == 0">取消原因：{{cancel_desc}}</view> -->

			<block v-if="status == 6 && refund_state == 2">
				<view class="type">退款单号：{{refund_no}}</view>
				<view class="type">退款金额：{{refund_price}}</view>
				<view class="type">退款时间：{{refund_at}}</view>
				<view class="type">退款原因：{{refund_desc}}</view>
			</block>

			<!-- 	<view class="type" v-if="status >= 4">发货单号：{{express_send_no}}</view>
			<view class="type" v-if="status >= 4">发货时间：{{express_send_at}}</view> -->
			<view class="wz_border"></view>
			<view class="seller">
				<view class="type wz_rev" style="height: 80rpx;" v-if="status != 8">卖家昵称：<view class="wz_right">{{seller}}</view>
				</view>
				<view class="type wz_rev" v-if="status == 8">买家昵称：<view class="wz_right">{{seller}}</view>
				</view>
				<!-- ios -->
				<!-- <view class="type wz_rev" style="height: 80rpx;" v-if="status != 8">支付宝账号：<view class="wz_right">
					<a href="alipayqr://platformapi/startapp?saId=20000116" @click='href'>{{zfb}}</a>
					<text class="copy" @click="copy(zfb)">复制</text></view>
				</view> -->
				<!-- 安卓 -->
				<view class="type wz_rev" style="height: 80rpx;" v-if="status != 8">支付宝账号：<view class="wz_right">
						<a @click='href'>{{zfb}}</a>
						<text class="copy" @click="copy(zfb)">复制</text></view>
				</view>

				<view class="type wz_rev" style="height: 80rpx;" v-if="status != 8">银行卡卡号：<view class="wz_right"><a @click='bank_ca'>{{bank_card}}</a><text
						 class="copy" @click="copy_bank(bank_card)">复制</text></view>
				</view>
				<view class="type wz_rev" style="display: flex;flex-wrap: wrap;" v-if="status != 8">
					<view class="wz_texte">
						卡号所属银行：
					</view>
					<view class="wz_right wz_text">{{bank_name}}</view>
					<view class="wz_copy"><text class="copy" @click="copy_z(bank_name)">复制</text></view>
				</view>
			</view>
			<!-- <view class="wrap" v-if="status != 2 && status != 8">
				<view>支付宝收款：</view>
				<view class="u-avatar-wrap">
					<image class="u-avatar-demo" @click="per_zfb" :src="avatar"></image>
				</view> -->
			<!-- <text class="up_zfb" @click="up_zfb" v-show="show_zfb"v-if='status_zfb == 1'>上传</text> -->
			<!-- </view> -->
			<!-- 	<view class="wrap" v-if="status != 2 && status != 8">
				<view>微信收款：</view>
				<view class="u-avatar-wrap">
					<image class="u-avatar-demo" @click="per_wx" :src="avatar_wx"></image>
				</view>
			</view> -->
			<!-- <view class="wrap" v-if="it_possible == 0 && status != 2 && status != 8">
				<view>上传付款凭证：</view>
				<view class="u-avatar-wrap">
					<image class="u-avatar-demo" @click="per_pay" :src="avatar_pay"></image>
				</view>
				<text class="up_zfb" v-if="status == 2" @click="up_pay">上传</text>
			</view> -->
			<!-- <view class="wrap" v-if="status == 8">
				<view>买家付款凭证信息：</view>
				<view class="u-avatar-wrap">
					<image class="u-avatar-demo" @click="all_v" :src="all_voucher"></image>
				</view>
			</view> -->
			<!-- #ifdef APP-PLUS -->
			<view class="wz_code" v-if="status == 2 ">
				<text style="font-size: 28rpx;">付款操作说明：</text>
				<text>1.点击复制按钮</text>
				<text>2.点击支付宝账号跳转付款</text>
				<text>3.返回商城点击我已付款</text>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="wz_code" v-if="status == 2 ">
				<text style="font-size: 28rpx;">付款操作说明：</text>
				<text>1.点击复制按钮</text>
				<text>2.到支付宝粘贴账号付款</text>
				<text>3.返回商城点击我已付款</text>
			</view>
			<!-- #endif -->
		</view>

		<view v-if="status != 6 && status != 3 && status != 0 && status != 4  && status != 10 && is_remks == 0">
			<view class="li-bum" ref='li_bum'>
				<view class="btn-right" @click="express()" v-if="status == 4 && pay_state == 2">查看物流</view>
				<view class="btn-right" @click="confirm()" v-if="status == 4 && pay_state == 2">确认收货</view>
				<!-- <view class="btn-right" @click="query()">查询订单</view> -->

				<!-- <view class="btn-right" @click="pay()" v-if="status == 1">去审核</view> -->
				<!-- <view v-if="is_delis == 1"> -->
				<view class="btn-right" @click="sales()" v-if="status == 5 && refund_state == 0">申请退货</view>
				<view class="btn-left" @click="cancel()" v-if="status == 2 && it_possible == 0">取消订单</view>
				<view class="btn-left" @click="deleter()" v-if="status == 5 && refund_state != 1">删除订单</view>
				<view class="btn-left" @tap="btn_appeal" v-if="is_remks == 0 && status == 8">我未收款，订单投诉</view>
				<view class="btn-left" @tap="btn_appeal" v-if="is_remks == 0 && status == 1">投诉</view>
				<view class="btn-left" :class="wz_fu == 1 ? 'btn-ti' :'btn-ti2'" v-if="status == 2 && it_possible == 0" @tap="btn_ti">我已付款</view>
				<view class="btn-left btn-ti" v-if="status == 8 && is_paysti == 0" @tap="btn_que">我已收款</view>
				<!-- </view> -->
				<view class="btn_huo" @tap="btn_huo" v-if="status == 9 && is_delis == 0">去发货</view>


			</view>
		</view>
		<!-- 申诉 -->
		<view class="mask" v-if="isMask">
			<view class="mask_top" @tap="maskShow(false)"></view>
			<view class="mask_content">
				<view class="title">
					<text>请填写投诉订单原因</text>
				</view>
				<!-- 选择项 -->
				<view class="options">
					<textarea class="text_tar" v-model="text_mgs" placeholder="请填写..." />
					<!-- 确认按钮 -->
					<view class="btn">
						<view class="confirm" @tap="maskShow(false)">取消</view>
						<view class="confirm confirm-btn" style="color: #DC2430;" @tap="handleCancelOrder">确定</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 收货 -->
		<view class="mask" v-if="isshmsk">
			<view class="mask_top"  @tap="maskShow(false)"></view>
			<view class="mask_content isshmsk">
				<view class="title">
					<text>请填写发货信息</text>
				</view>
				<!-- 选择项 -->
				<view class="options">
					<view>
						<text class="options_1">填写物流单号</text>
						<input class="options_text" type="text"v-model="expre_no" placeholder="填写物流订单" />
					</view>
					<view>
						<text class="options_1" style="margin-top: 10rpx;">填写物流名称</text>
						<input class="options_text" type="text" v-model="exprs_co" placeholder="(如:顺丰物流)" />
					</view>
					<!-- 确认按钮 -->
					<view class="btn">
						<view class="confirm" @tap="maskShow(false)">取消</view>
						<view class="confirm confirm-btn" style="color: #fff;" @tap="ok_fa">确定</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 模态框 -->
		<u-modal v-model="show_modal" :show-cancel-button='true'confirm-color='#ff594d' @confirm="ti_modal" :content="content"></u-modal>
	</div>
</template>

<script>
	import service from '@/store/service.js';
	import uniCountdown from '@/components/uni-count.vue';
	import {antiShake} from '@/store/rest.js'; //防抖
	export default {
		//components: {},
		data() {
			return {
				id: 0,
				show_zfb: true,
				show_wx: true,
				isMask: false, //遮罩
				expre_no:'',//物流单号
				exprs_co:'',//物流信息
				isshmsk:false,
				all_voucher:'',
				seller: '小七',
				bank_name:'民生银行',
				bank_card:'6478552524635524',
				text_mgs:'',
				zfb: '1588886435334',
				province: '',
				city: '',
				area: '',
				address: '',
				name: '',
				discount:'0.00',
				phone: '',
				pay_state: '',
				is_paysti:'',
				is_delis:0,//发货
				goodsList: [],
				goods_logo: '',
				goods_title: '',
				number_goods: '',
				price_selling: '',
				priceselling: '0.00',
				priceexpress: '0.00',
				realprice: '0.00',
				remark: '',
				order_no: '',
				create_at: '',
				pay_no: '',
				pay_at: '',
				payment_voucher: '',
				cancel_at: '',
				cancel_desc: '',
				refund_no: '',
				refund_price: '',
				refund_at: '',
				refund_desc: '',
				express_send_no: '',
				express_send_at: '',
				express_info: [],
				status: -1,
				exp_text: '',
				exp_time: '',
				refund_state: '',
				type: 0,
				count_down:0,//拍卖时间
				count:0,
				money: '',
				score: '',
				credit: '',
				avatar: '',
				avatar_wx: '',
				show_modal: false,
				content: '是否取消订单？',
				avatar_pay: '',
				zf_img: '',
				zf_imgwx: '',
				zf_imgpay: '',
				img_status: 1,
				status_zfb: 1,
				is_remks:1,
				it_possible:0,
				status_wx: 1,
				kong_ :false,
				li_bum:'',
				is_caws:0,
				wz_fu:0
			}
		},
		onLoad: function(e) {
			var self = this;
			
			// self.avatar = uni.getStorageSync('storage_img');
			// self.avatar_wx = uni.getStorageSync('storage_imgwx');
			// self.avatar_pay = uni.getStorageSync('storage_imgpay');
			// console.log(self.avatar_wx,self.avatar);
			// if(self.avatar == underfind){
			// 	self.img_status = 0;
			// }
			// if(self.avatar_wx !=' '){
			// 	self.show_wx = !self.show_wx
			// }
			self.zf_imgpay = uni.getStorageSync('storage_setimgpay');
			self.zf_img = uni.getStorageSync('storage_setimg');
			self.zf_imgwx = uni.getStorageSync('storage_setimgwx');
			self.money = service.config.money;
			self.score = service.config.score;
			self.id = e.orderid;
			self.$http.post(service.api.order.orderDetail, {
				'order_id': e.orderid
			}).then(function(res) {
				if (res.code == 1) {
					res = res.data;
					var res_address = res.seller_tion
					var res_info = res.order_inftion
					self.status = res.status;

					if(self.status == 9 || self.status == 8){
						self.province = res_address.express_province;
						self.name = res_address.express_name;
						self.phone = res_address.express_phone;
						self.city = res_address.express_city;
						self.area = res_address.express_area;
						self.address = res_address.express_address;
						self.seller = res_info.nickname
						self.zfb = res_info.alipay_account;
						self.avatar = res_info.alipay_code;
						self.avatar_wx = res_info.wechat_code;
					}else{
						self.province = res.express_province;
						self.name = res.express_name;
						self.phone = res.express_phone;
						self.city = res.express_city;
						self.area = res.express_area;
						self.address = res.express_address;
						self.seller = res.nickname
						self.zfb = res.alipay_account;
						self.avatar = res.alipay_code;
						self.avatar_wx = res.wechat_code;
					}
					self.bank_name = res.banlpay_zes;
					self.bank_card = res.banlpay_code;
					self.is_caws = res.is_caws;
					// console.log(self.id);
					self.is_remks = res.is_remks;
					self.count_down = res.jxltime
					self.count = 1;
					
					self.avatar_pay = res.payment_voucher;
					self.all_voucher = res.all_voucher;
					
					self.goodsList = res.allGoods;
					self.credit = res.credit;
					self.is_paysti =res.is_paystil
					self.priceselling = res.price_goods;
					self.priceexpress = res.price_express;
					self.realprice = res.pay_price;
					self.discount = res.discount;
					self.remark = res.remark;
					
					self.order_no = res.order_no;
					
					
					self.create_at = res.create_at;
					self.pay_no = res.pay_no;
					self.pay_at = res.pay_at;
					self.cancel_at = res.cancel_at;
					self.cancel_desc = res.cancel_desc;
					self.refund_no = res.refund_no;
					self.refund_price = res.refund_price;
					self.refund_at = res.refund_at;
					self.refund_desc = res.refund_desc;
					self.express_send_no = res.express_send_no;
					self.express_send_at = res.express_send_at;
					self.pay_state = res.pay_state;
					self.it_possible = res.it_possible;
					self.refund_state = res.refund_state;
					self.type = res.type;
					self.is_delis = res.is_delis
				} else {
					uni.showToast({
						icon: 'none',
						title: res.info
					});
				}
			});
			self.$http.post(service.api.order.express, {
				'order_id': e.id
			}).then(function(res) {
				if (res.code == 1) {
					res = res.data;
					self.express_info = res.express_info;
				} else {
					uni.showToast({
						icon: 'none',
						title: res.info
					});
				}
			});
		},
		created() {
			this.zfb_img()
			this.wx_img()
		},
		mounted(){

			// this.$nextTick(function () {
			// 	console.log(this.$refs.li_bum);
			// 	if(this.$refs.li_bum.$children.length != 0){
			// 		this.kong_ = true
			// 	}else{
			// 		this.kong_ = false
			// 	}
			// })
		},
		components: {
			uniCountdown
		},
		methods: {
			copy_z(url) {
				var self = this;
				uni.setClipboardData({
					data: url,
					success: function(res) {
						uni.showToast({
							icon: 'none',
							title: '复制成功'
						})
					}
				});
			},
			copy_bank(url){
				var self = this;
				uni.setClipboardData({
					data: url,
					success: function(res) { 
						uni.showToast({
							icon: 'none',
							title: '复制成功'
						})
						// #ifdef APP-PLUS
						setTimeout(function() {
							self.wz_fu = 1
						}, 1500);
						// #endif
						
					}
				});
			},
			copy(url) {
				var self = this;
				uni.setClipboardData({
					data: url,
					success: function(res) { 
						uni.showToast({
							icon: 'none',
							title: '复制成功'
						})
						// #ifdef H5
						setTimeout(function() {
							self.wz_fu = 1
						}, 1500);
						// #endif
						
					}
				});
			},
			bank_ca(){
				var self = this;
				// #ifdef APP-PLUS
				if(self.status == 2){
					// setTimeout(function() {
						self.wz_fu = 1
					// }, 1000);
				}
				// #endif
			},
			// 支付宝调取
			href(){
				var self = this;
				// #ifdef APP-PLUS
				if(self.status == 2){
					setTimeout(function() {
						self.wz_fu = 1
					}, 1500);
					 plus.runtime.openURL('alipayqr://platformapi/startapp?saId=20000116')
				}
				// #endif
				
				
				// self.$http.post(service.api.order.getOrderCon,{
				// 	orderid: self.id
				// }).then(function(res) {
				// 	if (res.code == 1) {
						
				// 	} else {
				// 		self.$api.msg(res.msg);
				// 	} 
				// });
			},
			//申请退款
			refund(id, index) {
				service.upload(this, service.api.order.refund, {
					"order_id": id
				}, 'POST', '', '', function(self, res) {
					uni.showToast({
						icon: 'none',
						title: res.info
					});
					if (res.code == 1) {
						self.status = 3;
					}
				});
			},
			//申请退货
			sales(id, index) {
				uni.setStorageSync('oid', id);
				uni.navigateTo({
					url: '/pages/order/sales'
				});
			},
			//订单确认收货
			confirm() {
				service.upload(this, service.api.order.confirm, {
					"order_id": this.id
				}, 'POST', '', '', function(self, res) {
					uni.showToast({
						icon: 'none',
						title: res.info
					});
					if (res.code == 1) {
						self.status = 5;
					}
				});
			},
			//订单付款
			pay() {
				service.upload(this, service.api.order.confirm, {
					"order_id": this.id
				}, 'POST', '', '', function(self, res) {
					uni.showToast({
						icon: 'none',
						title: res.info
					});
					if (res.code == 1) {
						self.status = 3;
					}
				});
			},
			//物流查询
			express() {
				uni.setStorageSync('oid', this.id);
				uni.navigateTo({
					url: '/pages/order/express'
				});
			},
			//取消订单
			cancel() {
				// let orderid = this.id
				let self = this;
				self.show_modal = true
				// uni.showModal({
				//     title: '提示',
				//     content: '是否要取消订单',
				//     success: function (res) {
				//         if (res.confirm) {
				//            service.upload(this, service.api.order.cancel, {
				//            	"order_id": self.id
				//            }, 'POST', '', '', function(self, res) {
				//            	uni.showToast({
				//            		icon: 'none',
				//            		title: res.info
				//            	});
				//            	uni.setStorageSync('ordertime', 0)
				//            	if (res.code == 1) {
				//            		setTimeout(function() {
				//            			uni.navigateBack({
				//            				delta: 1
				//            			});
				//            		}, 1000);
				//            	}
				//            });
				//         } else if (res.cancel) {
				//             console.log('用户点击取消');
				//         }
				//     }
				// });
			},
			ti_modal() {
				var self = this;
				// console.log(self.id_modal);
				service.upload(this, service.api.order.cancel, {
					"order_id": self.id
				}, 'POST', '', '', function(self, res) {
					uni.showToast({
						icon: 'none',
						title: res.info
					});
					uni.setStorageSync('ordertime', 0)
					if (res.code == 1) {
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 1000);
					}
				});
			},
			//删除订单
			deleter() {
				service.upload(this, service.api.order.deleter, {
					"order_id": this.id
				}, 'POST', '', '', function(self, res) {
					uni.showToast({
						icon: 'none',
						title: res.info
					});
					uni.setStorageSync('ordertime', 0)
					if (res.code == 1) {
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 1000);
					}
				});
			},
			// 上传支付宝
			up_zfb() {
				var self = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: res => {
						console.log(res.tempFilePaths[0]);
						self.avatar = res.tempFilePaths[0];
						self.zf_img = res.tempFilePaths;
						uni.setStorageSync('storage_img', self.avatar)
						uni.setStorageSync('storage_setimg', self.zf_img)
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
			// 上传微信
			up_wx() {
				var self = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: res => {
						self.avatar_wx = res.tempFilePaths[0];
						self.zf_imgwx = res.tempFilePaths;
						uni.setStorageSync('storage_imgwx', self.avatar_wx)
						uni.setStorageSync('storage_setimgwx', self.zf_imgwx)
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
			},
			// 上传凭证
			up_pay() {
				var self = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: res => {
						var avatar_payy = res.tempFilePaths[0];
						self.zf_imgpay = res.tempFilePaths;
						self.$http.upload(service.api.upload.image, avatar_payy, 'image').then(function(res) {
							if (res.code == 1) {
								res = res.data;
								self.avatar_pay = res.img_url;
								uni.setStorageSync('storage_imgpay', self.avatar_pay)

							} else {
								self.$api.msg(res.info);
							}
							uni.setStorageSync('storage_setimgpay', self.zf_imgpay)
						});

					}
				});
			},
			per_pay() {
				var photo_arr = new Array();
				var current = this.avatar_pay;
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
			all_v() {
				var photo_arr = new Array();
				var current = this.all_voucher;
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
			//提交
			btn_ti() {
				var self = this;
				console.log(self.id, self.avatar_pay);
				self.$http.post(service.api.main.wzsubmit, {
					order_id: self.id,
					payment_voucher: self.avatar_pay
				}).then(function(res) {
					if (res.code == 1) {
						self.$api.msg(res.info)
						setTimeout(function() {
							uni.switchTab({
								url: '/pages/main/user'
							})
						}, 2000);
					} else {
						self.$api.msg(res.info)
					}
				})

			},
			//确定取消订单
			confirm() {
				this.isMask = !this.isMask;
			},
			// 遮罩
			maskShow(boolean) {
				console.log(3453);
				this.isMask = false;
				this.isshmsk = false;
				if (boolean) {
				}
			},
			// 申诉
			btn_appeal(){
				this.isMask = !this.isMask;
			},
			//确认收款
			btn_que:antiShake(function(){
				var self = this;
				self.$http.post(service.api.order.gweenMembers, {
					order_id: self.id,
				}).then(function(res) {
					if (res.code == 1) {
						self.$api.msg('收款成功')
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/order/order?all=0',
							});
						}, 1500);
						// self.is_paysti = 1
					} else {
						self.$api.msg(res.info)
					}
				})
			}),
			//去发货
			btn_huo(){
				var self = this;
				self.isshmsk = !self.isshmsk;
			},
			ok_fa(){
				var self = this;
				console.log(self.exprs_co);
				self.$http.post(service.api.order.geteTihuoGoods, {
					orderid: self.id,
					exprs_co:self.exprs_co,
					expre_no:self.expre_no
					
				}).then(function(res) {
					if (res.code == 1) {
						self.$api.msg(res.info)
						self.isshmsk = !self.isshmsk;
						setTimeout(function() {
							uni.switchTab({
								url: '/pages/main/user'
							});
						}, 2000);
					} else {
						self.$api.msg(res.info)
					}
				})
				
			},
			handleCancelOrder(){
				var self = this;
				// console.log(self.$refs.text_mgs.valueSync,self.order_no);
				console.log(self.text_mgs);
				self.$http.post(service.api.order.appeal, {
					order_id: self.id,
					remark: self.text_mgs
				}).then(function(res) {
					if (res.code == 1) {
						self.$api.msg(res.info)
						console.log(123456);
						self.isMask = !self.isMask;
						setTimeout(function() {
							// uni.navigateTo({
							// 	url: '/pages/main/appeal',
							// });
							uni.switchTab({
								url: '/pages/main/user'
							});
						}, 2000);
					} else {
						self.$api.msg(res.info)
					}
				})
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
					this.avatar = '/static/card/add.png'

					return false;
				}
			},
			wx_img() {
				console.log(123);
				var ImgObjwx = new Image(); //判断图片是否存在  
				ImgObjwx.src = this.avatar_wx;
				//存在图片
				if (ImgObjwx.fileSize > 0 || (ImgObjwx.width > 0 && ImgObjwx.height > 0)) {
					console.log("有图片");
					this.status_wx = 0
					return true;
				} else {
					this.status_wx = 1
					this.avatar_wx = '/static/card/add.png'
					console.log("没有图片");

					return false;
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
	page {
		background: #F2F2F2;
	}
	.wz_text {
		width: 70%;
		/* height: 110rpx; */
		text-align: right;
		position: static !important;
	}
	.wz_copy{
		width: 100%;
		text-align: right;
		margin-top: 5px;
	}
	.wz_texte {
		width: 30%;
		display: initial;
		
	}
	.jxtime {
		background: white;
		display: flex;
	}
	.text_tar {
		padding: 20rpx;
	}
	.options_1{
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #242424;
		padding-left: 44rpx;
		margin-top: 30rpx;
		display: inline-block;
	}
	.options_text {
		padding: 20rpx;
		margin: 20rpx 44rpx;
		border-radius: 12rpx;
		background: rgb(247, 247, 247);
	}
	/*  遮罩样式 */
	.mask {
		position: fixed;
		top: 0;
		/* // right: 60upx; */
		/* // left: 60upx; */
		bottom: 0;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		z-index: 99;

		.mask_top {
			opacity: 0.53;
			background: rgba(0, 0, 0, 1);
			flex: 1;
		}

		.mask_content {
			margin: 0 60upx 360upx 60upx;
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
		.btn {
			display: flex;
			padding: 60upx 0 40upx 0;
		
			.cancel {
				flex: 1;
				text-align: center;
				color: #333333;
				font-size: 32upx;
			}
		
			.confirm {
				flex: 1;
				text-align: center;
				color: #000000;
				font-size: 32upx;
			}
		}
	}
	.isshmsk {
		
		.confirm-btn{
			background: #FF5A4E;
			border: 0px !important;
		}
		.confirm{		
			height: 80rpx;
			color: #6D6D6D;
			line-height: 80rpx;
			margin: 0px 46rpx;
			border-radius: 40rpx;
			border: 1px solid #D5D5D5;
		}
	}
	.btn_huo {
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		background: rgb(255, 89, 77);
		color: white;
		font-size: 36rpx;
	}

	.container {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		flex: 1;
	}

	.top {
		color: #FFFFFF;
		height: 200upx;
		font-size: 30upx;
		padding: 0 40upx;
		/* text-align: center; */
		margin-bottom: 20upx;
		background: #f85a5e;
	}
	.wz_code {
		padding: 6rpx 16rpx;
		font-size: 28rpx;
		margin-top: 12rpx;
		border-radius: 8rpx;
		color: #666666;
		display: flex;
		flex-wrap: wrap;
		background: #f6f6f6;
		
		text {
			width: 100%;
			font-size: 26rpx;
		}
	}
	.o-img {
		float: right;
		width: 240upx;
		height: 140upx;
		margin: 30upx 0;
	}

	.wz_border {
		width: 105%;
		margin-left: -2.5%;
		margin-top: 20rpx;
		background: rgb(242, 242, 242);
		height: 20rpx;
	}

	.status {
		margin-top: 50upx;
		text-indent: bold;
		font-size: 44upx;
		height: 60upx;
		line-height: 60upx;
	}

	.money {
		margin-top: 20upx;
	}

	.btn-ti {
		border: 0px !important;
		color: #fff !important;
		background: #ff594d;
	}
	.btn-ti2 {
		border: 0px !important;
		color: #FFFFFF !important;
		background: #999999;
		pointer-events: none;
	}

	.seller {
		background: white;
		margin-top: 20rpx;
		/* padding: 20rpx; */
		line-height: 42rpx;

		.wz_rev {
			width: 100%;
			position: relative;
		}

		.wz_right {
			display: initial;
			position: absolute;
			right: 0px;
			
			a{
				text-decoration: none;
				color: #000000;
				cursor:pointer
			}
		}
	}

	.wrap {
		display: flex;
		height: 90rpx;
		line-height: 90rpx;
		position: relative;

		.u-avatar-wrap {
			position: absolute;
			right: 0px;
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
			color: #818181;
			height: 40rpx;
			line-height: 40rpx;
			margin-top: 24rpx;
			padding: 0 20rpx;
			/* margin-left: 30rpx; */
			border-radius: 30rpx;
			border: 2rpx solid #818181;
		}

	}

	.address-box {
		margin-top: 20upx;
		display: flex;
		align-items: center;

		.tag {
			font-size: 24upx;
			color: #f85a5e;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #f85a5e;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}

		.address {
			padding-right: 10upx;
			font-size: 28upx;
			color: #909399;
		}
	}

	.wrapper,
	.express {
		border-top: 2upx solid #F1F1F1;
		background: #FFFFFF;
		margin-bottom: 20upx;
		padding: 0 20upx 20upx;
	}

	.exp-top {
		color: #f85a5e;
	}

	.exp-time {
		color: #888888;
		font-size: 28upx;
	}

	.u-box {
		font-size: 30upx;
		color: #303133;
		margin: 10upx 0;

		.name {
			margin-right: 30upx;
		}
	}

	.icon-bianji {
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: #909399;
		padding-left: 30upx;
	}

	.add-btn {
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: #f85a5e;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

	.swiper-box {
		height: 100%;
	}

	.list-scroll-content {
		height: 100%;
	}

	.center {
		width: 100%;
		height: 100%;
		z-index: 120;
		padding-top: 80upx;
		position: absolute;
	}

	/* .list{
		margin-bottom: 100upx;
	} */
	.li {
		background: #FFFFFF;
		/* border-radius: 20upx; */
		padding: 0 0 20upx;
		margin-bottom: 20upx;
		/* margin: 0 20upx; */
		/* box-shadow: 0px 0px 5px #D3D3D3; */
	}

	.li-top {
		background: #FFFFFF;
		font-size: 28upx;
		padding: 20upx;
		display: flex;
	}

	.li-top image {
		width: 30upx;
		height: 30upx;
		margin: 4upx;
	}

	.li-center {
		width: calc(100% - 70upx);
	}

	.li-right {
		width: 120upx;
		color: #f85a5e;
		text-align: right;
	}

	.li-cen {
		display: flex;
		margin: 0 20upx;
		padding: 10upx 0;
		border-top: 2upx solid #F1F1F1;
	}

	.cen-img {
		width: 160upx;
		height: 160upx;
	}

	.cen-right {
		padding: 0upx 20upx;
		padding-right: 0;
		width: calc(100% - 180upx);
	}

	.title {
		height: 80upx;
		font-size: 28upx;
		line-height: 40upx;
	}

	.clamps {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.price {
		color: #808080;
		font-size: 28upx;
		line-height: 40upx;

		text {
			color: #F53F3F;
			/* float: right; */
		}
	}

	.spec {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}

	.li-bum {
		height: 130upx;
		background: #fff;
		padding: 10upx 0;
		border-top: 20upx solid #F2F2F2;
	}

	.btn-left,
	.btn-right {
		float: right;
		/* width: 180upx; */
		height: 66upx;
		padding: 0px 20rpx;
		margin-top: 10rpx;
		text-align: center;
		line-height: 66upx;
		margin-right: 20upx;
		border-radius: 30upx;
	}

	.btn-left {
		font-size: 32upx;
		color: #7e7e7e;
		/* margin-top: 16rpx; */
		border: 2upx solid #7e7e7e;
	}

	.btn-right {
		font-size: 28upx;
		color: #f85a5e;
		border: 2upx solid #f85a5e;
	}

	.remark {
		font-size: 28upx;
		padding: 20upx 20upx 0;
		border-top: 2upx solid #F1F1F1;
	}

	.shop_price {
		width: 100%;
		/* height: 183rpx; */
		line-height: 50upx;
		box-sizing: border-box;
		padding: 0 20rpx;
		display: flex;
		margin-bottom: 20upx;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		background: #FFFFFF;
		border-bottom: 2rpx solid #F2F2F2;
	}

	.shop_price view {
		width: 100%;
		color: #333333;
		font-size: 28rpx;
	}

	.shop_price text {
		float: right;
		padding-left: 10rpx;
		color: #F53F3F;
		font-size: 28rpx;
	}

	.order {
		font-size: 28upx;
		padding: 20upx;
		line-height: 50upx;
		background: #FFFFFF;
	}

	.top-icon {
		float: right;
	}

	.copy {
		color: #333;
		padding: 0 20upx;
		background: #ebebeb;
		margin-left: 30upx;
		border-radius: 30upx;
	}
</style>
