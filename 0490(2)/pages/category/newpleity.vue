<template>
	<view class="commodity">
		<!-- 轮播图 -->
		<view class="swiper-section">
			<swiper :indicator-dots="true" :autoplay="false" :interval="3000" :duration="1000" indicator-active-color="#fff">
				<swiper-item v-for="(item, index) in dataList.image" :key="index">
					<view class="swiper-item">
						<image :src="item" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="commodity-info">
			<view class="info-top">
				<view class="title-box">
					<view class="title">
						{{ dataList.title }}
					</view>
				</view>
				<view class="subhead">{{ groudList.description }}</view>
				<view class="price">
					<view class="">
						<text>￥{{ Math.floor(discount * newlist.price_market * 100) / 100 }}</text>
						<text></text>
						<!-- <text>￥{{newlist.price_cost}}</text> -->
					</view>
				</view>

				<!-- <view class="count">
					<view>已售{{ dataList.number_sales }}件</view>
					<view>库存{{ dataList.number_stock }}件</view>
				</view> -->
			</view>
			<view class="jxtime">
				<!-- 拍卖倒计时：<uni-countdown :count="count_down" type="4" fontColor="#ff594d" v-if="count == 1"></uni-countdown> -->
				作品拥有方：<text style="color:#ff594d;">{{dataList.nickname}}</text>
			</view>
			<!-- <view class="info-intro"> -->
				<!-- <view class="type">
					<view>
						<text>服务</text>
						<text>
							极速退款
							<b style="margin:0 18rpx">·</b>
							7天退换货
							<b style="margin:0 18rpx">·</b>
							48小时发货
						</text>
					</view>
				</view> -->
			<!-- 	<view class="type">
					<view>
						<text>运费</text>
						<text v-if="dataList.price_express == 0.0">包邮</text>
						<text v-else>0元</text>
					</view>
				</view>
			</view> -->

			<!-- 商品详情评价 -->
			<view class="info-detail-evaluate" :style="{ height: height + 'px' }">
				<view class="navbar">
					<!-- <view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabIndex === index }"
					 @click="tabClick(index)">{{ item.text }}</view> -->
					 商品详情
				</view>
				
				<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
					<swiper-item class="tab-content">
						<scroll-view class="list-scroll-content" scroll-y>
							<!-- 详情 -->
							<view class="detail" v-html="dataList.content"></view>
						</scroll-view>
					</swiper-item>
					
				</swiper>
			</view>

			<!-- 底部兑换 -->
			<view class="btn" v-if="stock == 0">
				<view class="btn_null">
					商品已经售空
				</view>
			</view>
			<view class="btn" v-if="stock > 0">
				<view class="to">
					<view class="home" @click="jumpUrl('/pages/main/index')">
						<view class="">
							<image src="../../static/img/points/home.png" mode=""></image>
						</view>
						<view class="">首页</view>
					</view>
					<!-- <view class="home" >
						<view class="" v-if="is_collection==0" @click="toggleSpec(3)">
							<image src="../../static/img/points/collect.png" mode=""></image>
						</view>
						<view class="" v-else @click="cancelCollection(dataList.id)">
							<image src="../../static/icon/collection.png" mode=""></image>
						</view>
						<view class="" v-if="is_collection==0" >收藏</view>
						<view class="" v-else>已收藏</view>
					</view> -->
				</view>
				<view class="conversion" style="background-color: rgba(255,89,77,.4);color: #ff594d;" @click="toggleSpec(1)" v-if="btntype == 1">加入购物车</view>
				<view class="conversion" @click.stop="jump('/pages/category/createOrder')">立即拍卖</view>
			</view>
			 <!-- :class="this.auction == 0 ? 'auction':''" -->
		</view>

		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec(num)">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image :src="dataList.logo" class="logo-img"></image>
					<view class="right">
						<text class="price">¥{{ Math.floor(discount * newlist.price_market * 100) / 100}}</text>
						<!-- <text class="stock">库存：{{goodList.number_stock}}</text> -->
						<view class="selected">
							已选：
							<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
								{{sItem.name}}
							</text>
							<!-- <text>{{numberValue}}件</text> -->
						</view>
					</view>
				</view>
				<view v-for="(item,index) in specList" :key="index" class="attr-list">
					<text>{{item.name}}</text>
					<view class="item-list">
						<text v-for="(childItem, childIndex) in item.list" v-if="childItem.pid === item.id" :key="childIndex" class="tit"
						 :class="{selected: childItem.selected}" @click="selectSpec(index, childIndex, childItem.id)">
							{{childItem.name}}
						</text>
					</view>
				</view>

				<view class="num-value">
					<view class="text">数量&nbsp;:&nbsp;&nbsp;{{numberValue}}件</view>
					<view>
						<uni-number-box :value="numberValue" @change="change" />
					</view>
				</view>

				<button class="btn" @click.stop="addcard(dataList.id)" v-if="num == 1">完成</button>
				<button class="btn" @click.stop="_collection(dataList.id)" v-if="num == 3">确定</button>
				<!-- <button class="btn" v-else>完成2</button> -->
				<button class="btn" @click.stop="jump('/pages/category/createOrder')" v-if="num == 2">完成</button>
			</view>
		</view>
		<!-- 拼团规则 -->
		<view class="group-rule" v-if="groupRule">
			<view class="box">
				<view class="title">拼团规则</view>
				<view class="content">
					<view class="img"></view>
					<view class="state">
						<view class="state-box">
							<view class="state-type">一键参团</view>
							<view class="state-explain">选择拼团商品下单参团，分享链接到朋友圈或 发送给好友邀请参团</view>
						</view>
						<view class="state-box">
							<view class="state-type">一键参团</view>
							<view class="state-explain">选择拼团商品下单参团，分享链接到朋友圈或 发送给好友邀请参团</view>
						</view>
						<view class="state-box">
							<view class="state-type">一键参团</view>
							<view class="state-explain">选择拼团商品下单参团，分享链接到朋友圈或 发送给好友邀请参团</view>
						</view>
						<view class="state-box">
							<view class="state-type">一键参团</view>
							<view class="state-explain">选择拼团商品下单参团，分享链接到朋友圈或 发送给好友邀请参团</view>
						</view>
					</view>
				</view>
				<view class="know" @click="groupRule = !groupRule">我知道了</view>
			</view>
		</view>
		<!-- 查看更多 -->
		<view class="more-info" v-if="groupMore">
			<view class="group-info">
				<view class="group-more">
					<view class="close" @click="handleClose">
						<image src="../../static/img/close.png" class="close-img" mode=""></image>
					</view>
					<view class="title">正在拼团</view>
					<view class="group-list">
						<view class="list-item" v-for="(item, index) in groudTeam" :key="index">
							<view style="display: flex">
								<image :src="item.avatar == '' ? '/static/face.png' : item.avatar" mode=""></image>
								<view class="name">
									<view>
										<text class="name1">{{ item.nickname }}</text>
										<text class="name2">还差{{ item.teamnum }}人</text>
									</view>

									<view class="time">
										<view>剩余</view>
										<view>
											<uni-countdown :count="item.time" type="4" fontColor="#666"></uni-countdown>
										</view>
									</view>
								</view>
							</view>
							<view class="group-shopping" @click="jump('/pages/createOrder/createOrder?goodsid=' + id + '&teamid=' + item.teamid, item.teamid, id)">去参团</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="close-icon">
			<!-- 		<view class="close" @click="handleClose"><image src="../../static/img/close.png" class="close-img" mode=""></image></view> -->
		</view>
	</view>
	<!-- </view> -->
</template>

<script>
	import service from '@/store/service.js';
	import uniCountdown from '@/components/uni-count.vue';
	import uniRate from '@/components/uni-rate/uni-rate.vue';
	export default {
		data() {
			return {
				price:0,
				oprice:0,
				tabIndex: 0,
				selType: false,
				typeIndex: 0,
				groupRule: false,
				groupMore: false,
				count: 1,
				id: 2,
				gid: 0,
				height: 0,
				is_collection:'',
				groudList: [],
				groudSwiper: [],
				groudAvatar: [],
				groudTeam: [],
				goodComment: [],
				stock:1,
				imgList: [],
				// dataList: [],
				specs: [],
				type: 0,
				num: 1,
				numberValue: 1,
				specClass: 'none',
				specSelected: [],
				specList: [],
				specChildList: [],
				title: '商品详情',
				icon: '/static/icon/left.png',
				url_left: '',
				/* /pages/life/shop */
				dataList: '',
				is_identific:1,
				goodList: [],
				newlist:[],
				datagoods:[],
				discount:1,
				auction:0,//是否可以拍卖
				count_down:0,//拍卖时间
				count:0,
				navList: [{
						text: '商品详情',
						state: '0'
					},
					// {
					// 	text: '商品评价',
					// 	state: '1'
					// }
				],
				typeList: [{
						text: '皇妃品种  20g',
						state: '0'
					},
					{
						text: '皇妃品种  30g',
						state: '1'
					},
					{
						text: '皇妃品种  40g',
						state: '2'
					},
					{
						text: '四川高粱皇妃品种  30g',
						state: '3'
					}
				],
				btntype:0,
				numtype:1,
			};
		},
		components: {
			uniCountdown,
			uniRate
		},
		onLoad: function(e) {
			if(e.type){
				this.btntype = e.type;
			}
			if(e.num){
				this.numtype = e.type;
			}
			// console.log(e);
			this.gid = e.id;
			this.is_identific = e.is_identific
			console.log(this.is_identific);
			// this.getGroupList();
			this.getGoodsDetail();
			this.getGoodsComment();
			var height = uni.getSystemInfoSync().windowHeight - 50;
			this.height = height;
			// this.minhei = uni.getSystemInfoSync().windowHeight - 40
		},
		methods: {
			cancelCollection(id){
				var self =this
				self.$http
					.post(service.api.collection.removeGoodsCollection, {
						goodsid: id, 
					})
					.then(function(res) {
						uni.showToast({
							icon: 'none',
							title: res.info
						})
						if(res.code==1){
							setTimeout(function(){
								self.getGoodsDetail()
							},500)
						}
						
					// 	console.log(res,123);
					// 	if (res.code == 0) {
					// 		console.log(res, 77777);
					// 		console.log(self.selType,3333);
					// 			// self.specClass = !self.specClass;
					// 			self.specClass = 'none'
					// 		uni.showToast({
					// 			icon: 'none',
					
					// 			title: res.info
					// 		})
					// 		// self.toggleSpec(self.num)
					// 	}
					});
			},
			stopPrevent() {

			},
			jumpUrl(url) {
				uni.switchTab({
					url: url
				});
			},
			changeTab(e) {
				this.tabClick(e.target.current);
			},
			tabClick(index) {
				this.tabIndex = index;
			},
			eleType(index) {
				console.log(index);
				this.typeIndex = index;
			},
			//立即购买
			pay() {
				console.log(this.count);
				uni.navigateTo({
					url: './createOrder'
				});
			},
			addCart() {
				var self = this;
				this.type = 1;
				this.selType = !this.selType;
			},
			cartConfirm() {
				var self = this;
				// console.log(self.id,233);
				self.$http
					.post(service.api.cart.addToCart, {
						// goodsid: self.gid,
						goodsid: self.gid,
						optionid: 20,
						total: self.count
					})
					.then(function(res) {
						if (res.code == 0) {
							console.log(res, 77777);
							self.selType = !self.selType;
							uni.showToast({
								icon: 'none',
								title: res.info
							})
							// uni.showToast({
							// 	icon:'none',
							// 	title:res.info
							// })
						}

						// var list = res.data.data;
						// self.goodComment = list;
					});
			},
			handleClose() {
				this.groupMore = !this.groupMore;
			},
			// getGroupList() {
			// 	var self = this;
			// 	self.$http
			// 		.get(service.api.group.goodsInfo, {
			// 			goodsid: self.id
			// 		})
			// 		.then(function(res) {
			// 			var list = res.data;
			// 			self.groudList = list;
			// 			self.groudList.groupsprice - self.groupsprice * self.groudList.headsdiscount;
			// 			var groupsprice = parseInt(self.groudList.groupsprice);
			// 			var discount = self.groudList.headsdiscount / 10;
			// 			self.groudList.discountPrice = groupsprice - groupsprice * discount;
			// 			self.groudSwiper = list.images;
			// 			self.groudAvatar = list.teaming;
			// 			var list = list.comment;
			// 			if (list.length > 0) {
			// 				list.forEach(item => {
			// 					var ctime = new Date(item.createtime.substring(0, 10));
			// 					var atime = new Date(item.append_time.substring(0, 10));
			// 					var time = parseInt(Math.abs(atime - ctime) / 1000 / 60 / 60 / 24);
			// 					if (time == 0) {
			// 						time += 1;
			// 					}
			// 					item.count = time;
			// 					self.imgList = item;
			// 				});
			// 				self.groudComment = list;
			// 			}
			// 		});
			// },
			getGoodsDetail() {
				var self = this;
				self.$http
					.post(service.api.main.getNewGoodDetail, {
						goodsid: self.gid,
						is_identific:this.is_identific
					})
					.then(function(res) {
						self.dataList = res.data
						self.goodList = res.data;
						self.newlist = res.data.list[0]
						console.log(self.dataList,132);
						self.is_collection = res.data.is_collection;
						self.imgList = res.data.logo;
						self.auction = res.data.is_bays
						self.count_down = res.data.jxltime
						self.count = 1;
						self.stock =res.data.number_stock
						var price = res.data.list[0].price_market;
						self.goodList.price_market = price;
						self.price=res.data.list[0].price_market
						//self.oprice=res.data.list[0].price_cost;
						var list = res.data.specs
						for (var i = 0; i < list.length; i++) {
							list[i].id = i;
							list[i].list.forEach(item => {
								item.selected = false;
								item.pid = i;
							})
						}
						console.log(123);
						self.specList = list;
						self.listgoods = res.data.list
						var lists = res.data.lists;
						lists.forEach(item=>{
							var text = '';
							var data = [];
							item.forEach(li=>{
								if (text != '') {
									var num = ';;'+li.group+'::' + li.name;
								} else {
									var num = li.group+'::' +li.name;
								}
								text += num
							})
							data = {
								data : item,
								title : text,
								status : item[0].status,
							}
							self.datagoods.push(data)
							
						})
						uni.setStorageSync('order_data', res.data)
					});
			},
			_collection(id){
				console.log(id,1);
				console.log(this.goodList.id,2);
				var self = this;
				this.specClass = !this.specClass;
				// console.log(self.id,233);
				self.$http
					.post(service.api.collection.addCollection, {
						goodsid: id,
						optionid: this.goodList.id,
					})
					.then(function(res) {
						console.log(res,123);
						if (res.code == 0) {
							console.log(res, 77777);
							console.log(self.selType,3333);
								// self.specClass = !self.specClass;
								self.specClass = 'none'
								setTimeout(function(){
									self.getGoodsDetail()
								},500)
							uni.showToast({
								icon: 'none',
								title: res.info
							})
							// self.toggleSpec(self.num)
						}
					});
			},
			getGoodsComment() {
				var self = this;
				console.log(self.gid, 666);
				self.$http
					.post(service.api.category.goodComment, {
						goodsid: self.gid
					})
					.then(function(res) {
						console.log(res);
						var list = res.data.data;
						self.goodComment = list;
						// 	console.log(list.list,234);
						// 	list.list.forEach(item=>{
						// 		// console.log(item);
						// 		self.goodDetail.price=item.price_market[0]
						// 		console.log(self.goodDetail.price);
						// 		self.goodDetail.oprice=item.price_original[0]
						// 		console.log(self.goodDetail.oprice);
						// 	})
					});
			},
			change(value) {
				this.numberValue = value
			},
			// 规格弹窗开关
			toggleSpec(num) {
				console.log(num,123);
				//this.specClass = !this.specClass;
				this.num = num;
				if(this.specClass === 'show'){
					this.specClass = 'hide';
					
					setTimeout(() => {
						this.specClass = 'none';
						
					}, 250);
				}else if(this.specClass === 'none'){
					this.specClass = 'show';
					
				}
			},
			//选择规格
			selectSpec(index, idx, pid) {
				let list = this.specList;
				list[index].list.forEach(item => {
					this.$set(item, 'selected', false);
				})
				this.$set(list[index].list[idx], 'selected', true);
				//存储已选择
				/**
				 * 修复选择规格存储错误
				 * 将这几行代码替换即可
				 * 选择的规格存放在specSelected中
				 */
				//this.specSelected = [];
				var data = [];
				var datas = this.specSelected;
				var text = '';
				this.specList.forEach(item => {
					item.list.forEach(li => {
						if (li.selected == true) {
							if (text != '') {
								var num = ';;'+li.group+'::' + li.name;
							} else {
								var num = li.group+'::' +li.name;
							}
							text += num
							data.push(li);
						}
					})
				})
				var status = 0;
				console.log(this.datagoods,555);
				this.datagoods.forEach(item => {
					if (item.title == text) {
						if(item.status == true){
							status = 1;
							/* this.goodList = item; */
						}
					}
				});
				if(data.length == this.specList.length){
					if(status == 0){
						this.specSelected = datas;
						this.$set(list[index].list[idx], 'selected', false);
					}else{
						this.specSelected = data;
						this.listgoods.forEach(item => {
							if (item.goods_spec == text) {
								this.goodList = item;
							}
						});
					}
				}else{
					this.specSelected = data;
				}
			},
			addcard(id) {
				var self = this
				console.log(id,34);
				console.log(this.goodList.id);
				console.log(this.numberValue);
				if (this.numberValue == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择购买数量'
					});
					return;
				}
				if (this.specSelected.length != this.specList.length) {
					uni.showToast({
						icon: 'none',
						title: '规格未选择完整'
					});
					return;
				}
				self.$http
					.post(service.api.cart.addToCart, {
						// goodsid: self.gid,
						goodsid: id,
						optionid: this.goodList.id,
						total: this.numberValue
					})
					.then(function(res) {
						if (res.code == 0) {
							console.log(res, 77777);
							// self.selType = !self.selType;
							//self.specClass = 'hide';
							uni.showToast({
								icon: 'none',
								title: res.info
							})
							self.toggleSpec(self.num)
						}
					})
			},
			// 跳转确认订单
			jump(url) {
				var self=this
				// if (this.numberValue == 0) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '请选择购买数量'
				// 	});
				// 	return;
				// }
				// if (this.specSelected.length != this.specList.length) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '规格未选择完整'
				// 	});
				// 	return;
				// }
				var data = self.dataList.id+','+self.goodList.list[0].id+','+self.numberValue+','+self.is_identific;
				// self.toggleSpec(self.num)
				uni.navigateTo({
					url: url + '?data='+data
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.auction {
		pointer-events: none;
		background-color: #999999 !important;
	}
	.close-icon {
		position: relative;
	}

	.swiper-box {
		height: 100%;
	}
	.jxtime {
		background: white;
		display: flex;
		margin-top: 20rpx;
		padding: 16rpx;
	}
	.list-scroll-content {
		height: 100%;
	}

	.commodity {
		position: relative;

		.swiper-section {
			width: 100vw;
			height: 754rpx;
			// padding: 0 20rpx;
			swiper {
				height: 754rpx;
			}

			.swiper-item {
				width: 100vw;
				height: 754rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.commodity-info {
			position: absolute;
			top: 678rpx;
			left: 0;
			width: 100vw;
			// height: 100%;
			border-radius: 30rpx 30rpx 0rpx 0rpx;
			background-color: #f4f4f4;

			.info-top {
				width: 100%;
				// height: 374rpx;
				background-color: #ffffff;
				border-radius: 30rpx 30rpx 0px 0px;

				.title-box {
					display: flex;
					align-items: center;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 20rpx 20rpx;

					.title {
						color: #000000;
						font-size: 36rpx;
						font-weight: bold;
						line-height: 1.3;
						display: flex;

						.num {
							background-color: #fff;
							color: #ff594d;
							font-size: 30upx;
							margin-right: 30upx;
						}
					}

					image {
						width: 96rpx;
						height: 96rpx;
						margin-left: 104rpx;
					}
				}

				.subhead {
					width: 530rpx;
					color: #999999;
					font-size: 28rpx;
					line-height: 1.2;
					padding: 0 20rpx;
				}

				.price {
					padding: 0 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 26upx;

					&>view:nth-child(1) text:nth-child(1) {
						color: #ff594d;
						font-size: 42rpx;
					}

					&>view:nth-child(2) text:nth-child(1) {
						color: #ff594d;
						font-size: 32rpx;
					}

					&>view text:nth-child(2) {
						color: #ff594d;
						font-size: 24rpx;
						margin: 0 26rpx 0 10rpx;
					}

					&>view text:nth-child(3) {
						color: #cccccc;
						font-size: 28rpx;
						vertical-align: center;
						text-decoration: line-through;
					}
				}

				.count {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 20rpx;
					font-size: 28rpx;
					color: #666666;
					margin-top: 30rpx;
					padding-bottom: 28upx;
				}
			}

			.info-intro {
				margin-top: 20rpx;
				background-color: #ffffff;
				padding: 20rpx 0;

				.type {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 20rpx;

					&>view text:nth-child(1) {
						font-size: 28rpx;
						color: #666666;
						margin-right: 40rpx;
					}

					&>view text:nth-child(2) {
						font-size: 28rpx;
						color: #333333;
						margin-right: 40rpx;
					}

					&>view:nth-child(2) {
						image {
							width: 48rpx;
							height: 48rpx;
						}
					}
				}

				&>view:nth-child(2) {
					padding: 20rpx 20rpx;
				}
			}

			.info-detail-evaluate {
				width: 100%;
				height: 100%;
				background-color: #ffffff;
				border-top: 20rpx solid #f4f4f4;
				// margin-top: 20rpx;
				margin-bottom: 100rpx;
				position: absolute;

				.navbar {
					width: 100%;
					display: flex;
					height: 80rpx;
					line-height: 80rpx;
					padding: 0 10rpx;
					font-size: 32rpx;

					.nav-item {
						flex: 1;
						display: flex;
						justify-content: center;
						align-items: center;
						height: 100%;
						font-size: 15px;
						color: #303133;
						position: relative;

						&.current {
							color: #ff594d;

							&:after {
								content: '';
								position: absolute;
								left: 50%;
								bottom: 0;
								transform: translateX(-50%);
								width: 60px;
								height: 0;
								/* border-bottom: 2px solid #fa436a; */
								border-bottom: 6upx solid #ff594d;
								border-radius: 4upx 4upx 0upx 0upx;
							}
						}
					}
				}

				.evaluate {
					padding: 20rpx;
					margin-bottom: 100rpx;

					.title {
						color: #333333;
						font-size: 30rpx;
						font-weight: bold;
					}

					.user-info {
						display: flex;

						.photo {
							margin-right: 20rpx;

							image {
								width: 74rpx;
								height: 74rpx;
								margin-top: 13rpx;
								border-radius: 50%;
							}
						}

						.info {
							width: 100%;

							.user-name {
								width: 100%;
								display: flex;
								justify-content: space-between;

								.name {
									color: #333333;
									font-size: 32rpx;
								}

								.time {
									color: #666666;
									font-size: 28rpx;
								}
							}

							.content {
								color: #666666;
								font-size: 28rpx;
							}

							.img {
								display: flex;
								align-items: center;
								margin-top: 10rpx;

								// width: 600upx;
								image {
									width: 192rpx;
									margin-right: 10upx;
									// width: 33.33%;
									height: 192rpx;
								}
							}

							.merchant {
								// width: 100%;
								height: 80rpx;
								line-height: 80rpx;
								// text-align: center;
								background: rgba(240, 238, 239, 1);
								color: #666666;
								font-size: 24rpx;
								margin-top: 20rpx;
								padding-left: 20upx;
								// margin-right: 20upx;
							}

							.add-comment {
								color: #ff594d;
								text-align: right;
								margin-top: 10upx;
								margin-bottom: 10upx;
							}

							.comment-list {
								color: #666;
							}
						}
					}
				}
			}

			.btn {
				width: 100%;
				height: 100rpx;
				background-color: #ffffff;
				position: fixed;
				bottom: 0;
				left: 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border: 1rpx solid rgba(204, 204, 204, 0.77);
				box-sizing: border-box;

				.conversion {
					width: 300rpx;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #ff594d;
					color: #ffffff;
				}

				.to {
					width: calc(900rpx - 500rpx);
					display: flex;
					align-items: center;
					justify-content: center;

					.home {
						flex: 1;

						&>view:nth-child(1) {
							display: flex;
							align-items: center;
							justify-content: center;

							image {
								width: 58rpx;
								height: 58rpx;
							}
						}

						&>view:nth-child(2) {
							color: #666666;
							font-size: 24rpx;
							text-align: center;
						}
					}
				}
				.btn_null {
					width: 100%;
					line-height: 100rpx;
					text-align: center;
					background: #000000;
					color: #ffffff;
					font-size: 32rpx;
				}
			}
		}

		.info-rule {
			margin-top: 20rpx;
			margin-bottom: 20upx;
			width: 100vw;
			background-color: #ffffff;

			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx 20rpx 0;

				&>view:nth-child(1) {
					color: #333333;
					font-size: 28rpx;
				}

				&>view:nth-child(2) {
					image {
						width: 48rpx;
						height: 48rpx;
					}
				}
			}

			.step {
				display: flex;
				justify-content: space-around;
				align-items: center;
				padding: 10rpx 40rpx 20rpx 40rpx;

				image {
					width: 48rpx;
					height: 48rpx;
				}
			}
		}

		.info-group {
			width: 100vw;
			height: 510upx;
			background-color: #fff;
			box-sizing: border-box;
			padding: 22upx 20upx;

			// margin-bottom: 20upx;
			.info-list {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 44upx 10upx;

				.group-img {
					display: flex;
					align-items: center;

					image {
						width: 80upx;
						height: 80upx;
						margin: 0 10upx;
					}
				}

				.group-more {
					display: flex;
					align-items: center;
					color: #666666;

					image {
						width: 40upx;
						height: 40upx;
					}
				}
			}

			.start {
				width: 100vw;
				text-align: center;
				color: #35393b;
				font-size: 30upx;
				font-weight: bold;

				&>text {
					color: #ff3333;
				}
			}

			.invite {
				// width: 620upx;
				// height: 100upx;
				// background: linear-gradient(90deg, rgba(255, 153, 51, 1) 0%, rgba(255, 102, 51, 1) 100%);
				// border-radius: 10upx;
				// display: flex;
				// align-items: center;
				// justify-content: center;
				// color: #fff;
				// font-size: 36upx;
				// margin: 52upx auto 0 auto;

				image {
					width: 58upx;
					height: 48upx;
					margin-right: 10upx;
				}
			}
		}
	}

	.ele {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: -1000;

		.box {
			width: 100vw;
			height: 855rpx;
			position: absolute;
			left: 0;
			bottom: 0;
			background-color: #ffffff;
			border-radius: 30rpx 30rpx 0px 0px;
			transform: translateY(120%);
			transition: all 0.3s linear;

			.photo {
				image {
					width: 286rpx;
					height: 296rpx;
					position: absolute;
					top: -64rpx;
					left: 20rpx;
				}

				.price {
					position: absolute;
					left: 334rpx;
					top: 112rpx;

					&>view:nth-child(1) {
						color: #ff594d;
						font-size: 48rpx;
					}

					&>view:nth-child(2) {
						color: #333333;
						font-size: 24rpx;
					}
				}
			}

			.type {
				margin: 274rpx 20rpx 15rpx 20rpx;
				overflow: auto;
				height: 300upx;

				.title {}

				.name {
					display: flex;
					flex-wrap: wrap;
					margin-left: 10upx;
					// justify-content: space-between;

					.active {
						border: 1rpx solid rgba(233, 144, 64, 1);
						color: #ff594d;
					}

					&>view {
						height: 68rpx;
						line-height: 68rpx;
						padding: 0 30rpx;
						border: 1rpx solid rgba(204, 204, 204, 1);
						border-radius: 35rpx;
						font-size: 24rpx;
						margin: 15rpx 0;
					}
				}
			}

			.count {
				padding: 50rpx 20rpx 0 20rpx;
				display: flex;
				justify-content: space-between;

				.num {
					display: flex;
					justify-content: center;
					align-items: center;

					&>view {
						width: 82rpx;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						background: rgba(236, 236, 236, 1);
						border-radius: 20rpx;
						margin: 0 10rpx;
					}
				}
			}

			.btn {
				width: 700rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background: linear-gradient(-90deg, rgba(242, 44, 4, 1) 0%, rgba(234, 141, 63, 1) 100%);
				border-radius: 40rpx;
				color: #ffffff;
				font-size: 36rpx;
				position: absolute;
				bottom: 38rpx;
				left: 25rpx;
			}
		}

		.active {
			transform: translateY(0) !important;
		}
	}

	.block {
		z-index: 1000;
	}

	.group-rule {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;

		.box {
			width: 536rpx;
			height: 788rpx;
			background-color: #ffffff;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-left: -268rpx;
			margin-top: -394rpx;
			border-radius: 10rpx;

			.title {
				width: 100%;
				height: 92rpx;
				line-height: 92rpx;
				text-align: center;
				background-color: #ff594d;
				color: #000000;
				font-size: 32rpx;
				border-radius: 10rpx 10rpx 0 0;
			}

			.content {
				padding: 0 28rpx 40rpx 28rpx;
				display: flex;

				.img {
					width: 100rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.state {
					margin-left: 20rpx;

					.state-box {
						margin-top: 36rpx;

						.state-type {
							color: #333333;
							font-size: 24rpx;
						}

						.state-explain {
							color: #999999;
							font-size: 20rpx;
							line-height: 30rpx;
						}
					}
				}
			}

			.know {
				text-align: center;
				font-size: 28rpx;
				color: #333333;
			}
		}
	}

	.group {
		display: flex;
		justify-content: space-between;
		margin: 60upx 50upx 0;
		font-size: 36upx;

		// text-align: center;
		// align-items: center;
		.group-list {
			width: 305upx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: rgba(255, 255, 255, 1);
			border: 1px solid rgba(51, 51, 51, 1);
			border-radius: 10upx;
			color: #333;
			margin-right: 42upx;
		}

		.invite {
			width: 305upx;
			height: 88upx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: linear-gradient(90deg, rgba(255, 153, 51, 1) 0%, rgba(255, 102, 51, 1) 100%);
			border-radius: 10upx;
			color: #fff;
			// width: 620upx;
			// height: 100upx;
			// background: linear-gradient(90deg, rgba(255, 153, 51, 1) 0%, rgba(255, 102, 51, 1) 100%);
			// border-radius: 10upx;
			// display: flex;
			// align-items: center;
			// justify-content: center;
			// color: #fff;
			// font-size: 36upx;
			// margin: 52upx auto 0 auto;
		}
	}

	/deep/uni-swiper .uni-swiper-dots-horizontal {
		bottom: 50px;
	}

	// 查看更多
	.more-info {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;

		.group-info {
			border-radius: 20upx;
			width: 630rpx;

			max-height: 788rpx;
			background-color: #ffffff;
			position: absolute;
			top: 50%;
			left: 50%;
			// margin-left: -315rpx;
			// margin-top: -394rpx;
			transform: translate(-50%, -50%);

			.group-more {
				border-radius: 20rpx;
				background-color: #fff;
				position: relative;

				.title {
					border-bottom: 1px solid #f4f4f4;
					height: 130upx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 36upx;
					font-weight: bold;
					color: #2e2a2a;
				}
			}

			.group-list {
				max-height: 560upx;
				overflow: scroll;
				// display: flex;
				// justify-content: space-between;
				// align-items: center;
				border-bottom: 1px solid #f4f4f4;
				padding: 20upx 0;
				margin: 0 20upx;

				.list-item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1px solid #f4f4f4;
					padding: 20upx 0;

					image {
						width: 80upx;
						height: 80upx;
						border-radius: 20upx;
					}

					.name {
						display: flex;
						flex-direction: column;
						margin-left: 20upx;

						.name1 {
							color: #2e2a2a;
						}

						.name2 {
							color: #ff594d;
							margin-left: 20upx;
						}

						.time {
							display: flex;
							flex-direction: row;
							font-size: 24upx;
							color: #666;
						}
					}
				}
			}
		}
	}

	.group-shopping {
		background: linear-gradient(90deg, rgba(255, 153, 51, 1) 0%, rgba(255, 102, 51, 1) 100%);
		border-radius: 10upx;
		width: 120upx;
		height: 46upx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
	}

	.close {
		width: 54upx;
		height: 54upx;
		position: absolute;
		right: -10upx;
		top: -20upx;

		.close-img {
			width: 54upx;
			height: 54upx;
		}
	}

	.rebate {
		background: rgba(255, 247, 238, 1);
		border-radius: 3upx;
		color: #ff594d;
		padding: 14upx;
		margin-left: 22upx;
	}

	.discount-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: rgba(255, 232, 205, 1);
		border-radius: 5upx;
		padding: 22upx;
		margin: 44upx 22upx 0;
		color: #ff594d;
	}

	.discount {
		padding: 0 20upx;
		font-size: 24upx;
	}

	.discount1 {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.detail {
		margin-bottom: 50upx;
	}

	.not-data {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20upx;
	}

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;

			.btn {
				width: 80%;
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: linear-gradient(-90deg, rgba(242, 44, 4, 1) 0%, rgba(234, 141, 63, 1) 100%);
				// font-size: $font-base + 2upx;
				color: #fff;
				font-size: 36rpx;
				margin: 30upx auto 20upx;
				margin-right: 100upx;
				
				// width: 700rpx;
				// height: 80rpx;
				// line-height: 80rpx;
				// text-align: center;
				// background: linear-gradient(-90deg, rgba(242, 44, 4, 1) 0%, rgba(234, 141, 63, 1) 100%);
				// border-radius: 100upx;
				// color: #ffffff;
				// font-size: 36rpx;
				// position: absolute;
				// bottom: 38rpx;
				// left: 25rpx;
			}
		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}

			100% {
				transform: translateY(0%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}

	/* 规格选择弹窗 */
	.attr-content {
		padding: 10upx 30upx;

		.a-t {
			display: flex;

			image {
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;
				;
			}

			.right {
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				// font-size: $font-sm + 2upx;
				// color: $font-color-base;
				line-height: 42upx;

				.price {
					// font-size: $font-lg;
					// color: $uni-color-primary;
					margin-bottom: 10upx;
				}

				.selected-text {
					margin-right: 10upx;
				}
			}
		}

		.attr-list {
			display: flex;
			flex-direction: column;
			// font-size: $font-base + 2upx;
			// color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}

		.item-list {
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;

			text {
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 100upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				// font-size: $font-base;
				// color: $font-color-dark;
			}

			.selected {
				background: pink;
				// color: $uni-color-primary;
			}
		}
	}

	.logo-img {
		width: 100upx;
		height: 100upx;
		background: #ffffff;
	}

	.num-value {
		margin-top: 40upx;
		display: flex;
		justify-content: space-between;
		text-align: center;
		align-items: center;
	}

	.num-value {
		margin-right: 40upx;
	}
</style>
