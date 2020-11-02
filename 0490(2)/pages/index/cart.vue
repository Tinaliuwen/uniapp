<template>
	<view class="container">
				<view class="" style="display: flex;justify-content: flex-end;margin: 0 20upx 20upx;padding-top: 20upx;" @click="message">{{ txt }}</view>
		<!-- 顶部 -->
		<view class="top" v-if="isTopShow">
			<view class="left">
				<checkbox value="" class="left_radio" :checked="seletedAll" @tap="_seletedAll"></checkbox>
				<text>全选</text>
			</view>
			<view class="right">
				<image src="../../static/img/shanchu.png" mode="aspectFill" @tap="_operateDelete"></image>
			</view>
		</view>
		<!-- 购物车列表 -->
		<checkbox-group @change="seletedStatus">
			<scroll-view scroll-y="true" class="shopping_container">
				<view class="shopping_list" v-for="(item, index) in goodList" :key="item.id">
					<scroll-view scroll-x="true" class="list">
						<view class="content">
							<view class="list_left">
								<checkbox :value="item.id" :checked="checkList.includes(item.id)" color="#ff594d"></checkbox>
							</view>
							<view class="list_right">
								<view class="img">
									<image :src="item.logo"></image>
								</view>
								<view class="detail">
									<view class="title">{{ item.title }}</view>
									<view class="type">{{ item.type }}</view>
									<view class="info">
										<view class="info_left">
											<text class="symbol">￥</text>
											<text class="price">{{ item.price_market }}</text>
										</view>
										<view class="info_operate">
											<view class="reduce" @tap="_reduce(item.id)">-</view>
											<view class="num"><input maxlength="99" :value="item.total" disabled="" /></view>
											<view class="add" @tap="_add(item.id)">+</view>
										</view>
									</view>
								</view>
							</view>
							<view class="list_operate">
								<view class="collection" @tap="_collection(item.goodsid, item.optionid)">
									<text>移入</text>
									<text>收藏夹</text>
								</view>
								<view class="delete" @tap="_delete(item.id)">删除</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</scroll-view>
		</checkbox-group>

		<!-- 空空如也遮罩 -->
		<view class="empty" v-if="isEmpty">
			<view class="img">
				<image src="../../static/card/empty@2x.png" mode="aspectFit"></image>
				<text class="empty_text">空空如也~</text>
			</view>
			<view class="btn" @click="jump">去逛逛吧！</view>
		</view>
		<!-- 结算区 -->
		<view class="account" v-if="isAccount">
			<view class="left">
				<view class="seleted_all">
					<checkbox :checked="seletedAll" @tap="_seletedAll"></checkbox>
					<text>全选</text>
				</view>
				<view class="total">
					<text class="total_text">合计：</text>
					<text class="total_num">￥{{ totalMoney }}</text>
				</view>
			</view>
			<view class="right">
				<button @click="goAccount">去结算({{ checkList.length }})</button>
			</view>
		</view>
		<!-- 结算操作 -->
		<view class="account_operate" v-else>
			<view class="left">
				<checkbox :checked="seletedAll" @tap="_seletedAll"></checkbox>
				<text>全选</text>
			</view>
			<view class="right">
				<view class="collection"><text @tap="_operateCollection">移入收藏夹</text></view>
				<view class="delete"><text @tap="_operateDelete">删除</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '@/store/service.js';
	export default {
		data() {
			return {
				isEmpty: false, //是否有商品
				isAccount: true, //是否显示结算
				isTopShow: true, //是否显示头部
				goodList: [],
				checkList: [], //选中值
				seletedAll: false, //全选状态
				txt:"管理",
				cartArr:[],
				goodsArr:[]
			};
		},
		methods: {
			jump(){
				uni.navigateTo({
					url:"/pages/main/index"
				})
			},
			goAccount(){
				var self=this;
				var segm = service.config.segm;
				let data = '';
				let num = 0;
				self.checkList.map((item, index) => {
					self.goodList.map((itemz, indez) => {
						if (Number(itemz.id) === Number(item)) {
							var text = itemz.goodsid+','+itemz.optionid+','+itemz.total;
							if(num == 0){
								data = data + text;
							}else{
								data = data + segm + text;
							}
							num++;
						}
					});
				});
				uni.navigateTo({
					url: '/pages/category/createOrder?data='+ data
				})
			},
			_operateCollection(){
				var self = this;
				self.checkList.map((item, index) => {
					self.goodList.map((itemz, indez) => {
						if (Number(itemz.id) === Number(item)) {
							self.$http
								.post(service.api.collection.addCollection, {
									goodsid: itemz.goodsid,
									optionid: itemz.optionid
								})
								.then(function(res) {
									uni.showToast({
										icon: 'none',
										title: res.info
									});
								});
						}
					});
				});
			},
			_collection(id, oid) {
				console.log(id);
				var self = this;
				// console.log(self.gid,666);
				self.$http.post(service.api.collection.addCollection, {
					goodsid: id,
					optionid: oid
				})
				.then(function(res) {
					console.log(res);
					uni.showToast({
						icon: 'none',
						title: res.info
					});
					// var list = res.data.data;
					// self.goodList = list;
				});
			},
			message() {
				console.log(111);
				if (this.txt === '管理') {
					this.txt = '完成';
					// let currentWebview = this.$scope.$getAppWebview();
					// currentWebview.setTitleNViewButtonStyle(0, {
					// text: '完成'
					// });
					this.isAccount = false;
					this.isTopShow = false;
				} else {
					this.txt = '管理';
					this.isAccount = true;
					this.isTopShow = true;
					}
				},
			// 删除
			_delete(id) {
					console.log(id);
							// this.goodList.splice(this.goodList.findIndex(item => item.id === id), 1);
							var self = this;
							// console.log(self.gid,666);
							self.$http
								.post(service.api.cart.removeCart, {
									ids: id
								})
								.then(function(res) {
									console.log(res);
									uni.showToast({
										icon: 'none',
										title: res.info
									});
									if (res.code == 1) {
										setTimeout(function() {
											self.getGoodList();
										}, 500);
									}
									// var list = res.data.data;
									// self.goodList = list;
								});
							// 显示为空
							if (this.goodList.length === 0) {
								this.isEmpty = true;
							}
						},
			// 全选
			_seletedAll() {
				let newArrs = []
				if (!this.seletedAll) {
					this.seletedAll = true;
					this.goodList.map(item => {
						this.checkList.push(item.id);
						this.cartArr.push(item.id)
					});
					this.checkList.map((item, index) => {
						this.goodList.map((itemz, indez) => {
							if (Number(itemz.id) === Number(item)) {
								let obj = {};
								obj.goodsid = itemz.goodsid;
								obj.optionid = itemz.optionid;
								obj.total = itemz.total;
								newArrs[indez] = obj;
							}
						});
					});
					console.log(this.cartArr,'del')
					console.log(newArrs)
					
				} else {
					this.seletedAll = false;
					this.checkList = [];
					this.cartArr=[]
				}
			},
			// 复选框选中状态
			seletedStatus(e) {
				
				this.checkList = e.detail.value;
				let idArrs = e.detail.value;
				this.cartArr=idArrs
				console.log(this.cartArr,'del')
				let newArrs = [];
				console.log(this.checkList);
				if (this.checkList.length === this.goodList.length) {
					this.seletedAll = true;
				} else {
					this.seletedAll = false;
				}
				idArrs.map((item, index) => {
					this.goodList.map((itemz, indez) => {
						if (Number(itemz.id) === Number(item)) {
							let obj = {};
							obj.goodsid = itemz.goodsid;
							obj.optionid = itemz.optionid;
							obj.total = itemz.total;
							newArrs[index] = obj;
						}
					});
				});
				console.log(newArrs,567)
				// this.goodsArr=newArrs
				// console.log(this.newArrs,4690);
			},
			// 删除所有商品
			_delGoodList() {
				uni.showModal({
					title: '提示',
					content: '真的要清空购物车吗？',
					success: res => {
						uni.showLoading({
							title: '清空中~'
						});
						if (res.confirm) {
							(this.goodList = []), (this.isEmpty = true);
						} else if (res.cancel) {
							console.log('用户点击了取消~');
						}
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
			// 商品 -
			_reduce(id) {
				let currentGood = this.goodList.filter(item => item.id === id);
				if (currentGood[0].total <= 1) {
					return;
				}
				currentGood[0].total--;
			},
			// 商品 +
			_add(id) {
				let currentGood = this.goodList.filter(item => item.id === id);
				console.log(currentGood[0].total);
				if (currentGood[0].total >= 99) {
					return;
				}
				currentGood[0].total++;
			},
			getGoodList() {
				this.$http.post(service.api.cart.myCart, {
					// goodsid: self.gid
				}).then(res => {
					if (res.code === 1) {
						res.data.data.map(item => {
							item.id = String(item.id)
						})
						this.goodList = res.data.data
						// this.goodList = res.data.data
						console.log(this.goodList, 66)
					} else {
						this.$api.msg(res.info)
					}
				})
			},

			/* 结算区删除操作 */
			_operateDelete() {
				if (this.checkList.length === this.goodList.length) {
					uni.showModal({
						title: '提示',
						content: '真的清空购物车吗？',
						success: res => {
							if (res.confirm) {
								uni.showLoading({
									title: '清空中',
									mask: true
								});
								
								var self = this;
								self.$http.post(service.api.cart.removeCart, {
									ids:this.cartArr
								}).then(function(res) {
									uni.showToast({
										icon: 'none',
										title: res.info
									});
									setTimeout(function(){
									self.getGoodList()	
									},500)
								});
							} else if (res.cancel) {
								console.log('用户点击了取消~');
							}
						}
					});
				} else if (this.checkList.length === 0) {
					uni.showToast({
						title: '您还未选中商品~',
						mask: true,
						icon: 'none'
					});
				} else {
					uni.showModal({
						title: '提示',
						content: '确定要删除吗？',
						success: res => {
							if (res.confirm) {
								console.log(this.cartArr);
								
								var self = this;
								self.$http.post(service.api.cart.removeCart, {
									ids:this.cartArr
								}).then(function(res) {
									uni.showToast({
										icon: 'none',
										title: res.info
									});
									setTimeout(function(){
									self.getGoodList()	
									},500)
									// this.goodList = this.goodList.filter(item => !this.checkList.includes(item.id));
									console.log(res,6688);
								
									// var list = res.data;
									// self.goodsCate = list;
								});
							} else if (res.cancel) {
								console.log('用户点击了取消~');
							}
						}
					});
				}
			}
		},
		computed: {
			totalMoney() {
				let sum = 0;
				this.goodList.map(currentItem => {
					if (this.checkList.includes(currentItem.id)) {
						sum += currentItem.total * currentItem.price_market;
					}
				});
				return sum;
			}
		},
		//自定义导航栏-管理
		onNavigationBarButtonTap(e) {
			// #ifdef APP-PLUS
			console.log(e.text);
			if (e.text === '管理') {
				e.text = '完成';
				let currentWebview = this.$scope.$getAppWebview();
				currentWebview.setTitleNViewButtonStyle(0, {
					text: '完成'
				});
				this.isAccount = false;
				this.isTopShow = false;
			} else {
				let currentWebview = this.$scope.$getAppWebview();
				currentWebview.setTitleNViewButtonStyle(0, {
					text: '管理'
				});
				e.text = '管理';
				this.isAccount = true;
				this.isTopShow = true;
			}
			// #endif
		},
		onLoad() {
			this.getGoodList()
		},
		onShow() {
			this.getGoodList()
		}
	};
</script>

<style scoped lang="less">
	.top {
		height: 48upx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 32upx;
		box-sizing: border-box;
		padding-left: 19upx;
		margin-bottom: 30upx;

		.left {
			display: flex;
			align-items: center;

			.left_radio {
				margin-top: -6upx;
			}

			>text {
				width: 108upx;
				font-size: 28upx;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
			}
		}

		.right {
			height: 48upx;
			width: 48upx;
			padding-right: 19upx;

			>image {
				height: 100%;
				width: 100%;
			}
		}
	}

	.shopping_container {
		height: 100%;
		margin-bottom: 16upx;
	}

	// 购物车列表
	.shopping_list {
		width: 710upx;
		height: 235upx;
		border-radius: 20upx;
		margin: 0 auto;
		overflow: auto;
		margin-bottom: 20upx;

		.list {
			height: 100%;
			width: 900upx;

			.content {
				height: 100%;
				width: 100%;
				display: flex;

				.list_left {
					height: 100%;
					width: 40upx;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-left: 10upx;
				}

				.list_right {
					width: 655upx;
					height: 235upx;
					background: rgba(255, 255, 255, 1);
					margin-left: 17upx;
					border-radius: 20upx;
					padding: 31upx 0 32upx 30upx;
					display: flex;
					box-sizing: border-box;

					.img {
						height: 172upx;
						width: 174upx;

						image {
							height: 100%;
							width: 100%;
						}
					}

					.detail {
						padding-left: 17upx;

						.title {
							width: 413upx;
							height: 70upx;
							font-size: 26upx;
							font-weight: 500;
							color: rgba(0, 0, 0, 1);
							line-height: 42upx;
							text-overflow: ellipsis;
						}

						.type {
							height: 23upx;
							font-size: 24upx;
							font-weight: 500;
							color: rgba(177, 177, 177, 1);
							line-height: 42upx;
							margin-top: 15upx;
						}

						.info {
							display: flex;
							justify-content: space-between;
							margin-top: 20upx;

							.info_left {
								.symbol {
									width: 15upx;
									height: 18upx;
									font-size: 24upx;
									font-weight: bold;
									color: #ff594d;
									line-height: 42upx;
								}

								.price {
									height: 28upx;
									font-size: 36upx;
									font-weight: bold;
									color: #ff594d;
									line-height: 42upx;
								}
							}

							.info_operate {
								box-sizing: border-box;
								display: flex;
								margin-right: 20upx;

								.reduce {
									width: 19upx;
									height: 3upx;
									font-size: 36upx;
									font-weight: 500;
									color: rgba(177, 177, 177, 1);
									line-height: 42upx;
								}

								.num {
									width: 71upx;
									height: 43upx;
									background: rgba(244, 244, 244, 1);
									border-radius: 22upx;
									margin: 0 11upx;
									text-align: center;
									line-height: 43upx;
								}

								.add {
									width: 19upx;
									width: 19upx;
									height: 19upx;
									font-size: 36upx;
									font-weight: 500;
									color: rgba(51, 51, 51, 1);
									line-height: 42upx;
								}
							}
						}
					}
				}

				.list_operate {
					display: flex;

					.collection {
						width: 95upx;
						height: 235upx;
						background: rgba(233, 144, 64, 1);
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(255, 255, 255, 1);
						line-height: 42upx;
					}

					.delete {
						width: 95upx;
						height: 235upx;
						background: rgba(233, 112, 64, 1);
						font-size: 24upx;
						ufont-weight: 500;
						color: rgba(255, 255, 255, 1);
						line-height: 42upx;
						line-height: 235upx;
						text-align: center;
					}
				}
			}
		}
	}

	// 结算
	.account {
		height: 100upx;
		width: 100%;
		box-shadow: 0 0upx 20upx #666666;
		padding: 16upx 20upx 16upx 19upx;
		display: flex;
		justify-content: space-between;
		// align-items: center;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0upx;
		box-sizing: border-box;
		background-color: #ffffff;
		// z-index: 999;

		.right {
			button {
				width: 226upx;
				height: 66upx;
				background: linear-gradient(90deg, rgba(243, 43, 3, 1) 0%, rgba(233, 144, 64, 1) 100%);
				border-radius: 33upx;
				font-size: 28upx;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				text-align: center;
				line-height: 66upx;
			}
		}

		.left {
			flex: 1;
			display: flex;
			margin-top: 10upx;

			.seleted_all {
				text {
					width: 55upx;
					height: 26upx;
					font-size: 28upx;
					font-weight: bold;
					color: rgba(51, 51, 51, 1);
				}
			}

			.total {
				margin-left: 53upx;

				.total_num {
					height: 22upx;
					font-size: 28upx;
					font-weight: bold;
					color: #ff594d;
				}

				.total_text {
					width: 67upx;
					height: 27upx;
					font-size: 28upx;
					font-weight: bold;
					color: rgba(51, 51, 51, 1);
				}
			}
		}
	}

	.account_operate {
		height: 100upx;
		width: 100%;
		box-shadow: 0 0upx 20upx #666666;
		padding: 16upx 20upx 16upx 19upx;
		display: flex;
		justify-content: space-between;
		// align-items: center;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0upx;
		box-sizing: border-box;
		background-color: #ffffff;

		.left {
			display: flex;

			>text {
				height: 26upx;
				font-size: 28upx;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				margin-top: 5upx;
			}
		}

		.right {
			display: flex;

			.collection {
				width: 191upx;
				height: 66upx;
				border: 1px solid rgba(234, 136, 59, 1);
				border-radius: 33upx;
				text-align: center;
				line-height: 66upx;

				>text {
					width: 138upx;
					height: 26upx;
					font-size: 28upx;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);

					background: linear-gradient(270deg, rgba(242, 44, 4, 1) 0%, rgba(234, 139, 60, 1) 99.365234375%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}

			.delete {
				width: 191upx;
				height: 66upx;
				border: 1px solid rgba(234, 136, 59, 1);
				border-radius: 33upx;
				text-align: center;
				line-height: 66upx;
				margin-left: 20upx;

				>text {
					width: 55upx;
					height: 26upx;
					font-size: 28upx;
					font-weight: 500;
					background: linear-gradient(270deg, rgba(242, 44, 4, 1) 0%, rgba(234, 139, 60, 1) 99.365234375%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}
		}
	}

	// 空空如也遮罩
	.empty {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		height: 100vh;
		width: 100%;
		z-index: 99;
		background-color: #ffffff;
		overflow: hidden;

		.img {
			width: 522upx;
			height: 315upx;
			margin: 280upx auto 116upx;
			position: relative;

			image {
				height: 100%;
				width: 100%;
			}

			.empty_text {
				position: absolute;
				top: 284upx;
				left: 181upx;
				width: 200upx;
				right: 182upx;
				height: 34upx;
				font-size: 36upx;
				font-weight: 500;
				font-weight: 500;
				color: rgba(102, 102, 102, 1);
			}
		}

		.btn {
			width: 240upx;
			height: 76upx;
			background: rgba(233, 144, 64, 1);
			border-radius: 38upx;
			font-size: 36upx;
			color: rgba(255, 255, 255, 1);
			font-weight: 500;
			text-align: center;
			line-height: 76upx;
			margin: 0 auto;
		}
	}
</style>
