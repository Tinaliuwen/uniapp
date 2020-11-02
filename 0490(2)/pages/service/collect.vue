<template>
	<view>
		<view class="footprint" v-if="footList.length != 0">
			<view class="info-box" v-for="(item, index) in footList" :key="index" >
				<view class="img">
					<view class="checkbox" v-if="check">
						<u-checkbox-group @change="checkboxGroupChange" active-color="#ff594d">
							<u-checkbox @change="checkboxChange" v-model="item.check" :name="item.id" :class="{ checkBox: check }"></u-checkbox>
						</u-checkbox-group>
					</view>
					<!-- <image src="../../static/my/commodity.png" mode=""></image> -->
					<image :src="item.logo" mode="" @click="jump(item.goodsid)"></image>
				</view>
				<view class="commodity" @click="jump(item.goodsid)">
					<view class="title">{{ item.title }}</view>
					<view class="title" style="margin-top: 20upx;">{{ item.goods_spec }}</view>
					<view class="price">￥{{ item.price_market }}</view>
				</view>
			</view>

			<view class="select" v-if="check">
				<view class="all" @click="eleAll">
					<u-checkbox-group><u-checkbox v-model="checkAll" :name="allText" @change="checkboxChangeAll"></u-checkbox></u-checkbox-group>
					{{ allText }}
				</view>
				<view class="del " :class="{ active: usable }" @click="del">删除</view>
			</view>
		</view>
		<view class="not-collection" v-else>暂无收藏哦~</view>
	</view>
</template>

<script>
import service from '@/store/service.js';
export default {
	data() {
		return {
			value: '',
			checkAll: false,
			allText: '全选',
			check: false,
			usable: false,
			footList: [],
			arrList: [],
			arrall:[]
			// 	{
			// 		id: 1,
			// 		img: '../../static/my/commodity.png',
			// 		title: '花香 东北大米2.5kg （无添加 长粒 米 五常大米 稻花香米 新老包装随机发货）',
			// 		price: '1.00',
			// 		check: false
			// 	},
			// 	{
			// 		id: 2,
			// 		img: '../../static/my/commodity.png',
			// 		title: '北纯 五常稻花香 东北大米2.5kg （无添加 长粒 米 五常大米 稻花香米 新老包装随机发货）',
			// 		price: '98.00',
			// 		check: false
			// 	},
			// 	{
			// 		id: 3,
			// 		img: '../../static/my/commodity.png',
			// 		title: '北纯 五常稻花香 东北大米2.5kg （无添加 长粒 米 五常大米 稻花香米 新老包装随机发货）',
			// 		price: '18.00',
			// 		check: false
			// 	},
			// 	{
			// 		id: 4,
			// 		img: '../../static/my/commodity.png',
			// 		title: '北纯 五常稻花香 东北大米2.5kg （无添加 长粒 米 五常大米 稻花香米 新老包装随机发货）',
			// 		price: '198.00',
			// 		check: false
			// 	},
			// 	{
			// 		id: 5,
			// 		img: '../../static/my/commodity.png',
			// 		title: '北纯 五常稻花香 东北大米2.5kg （无添加 长粒 米 五常大米 稻花香米 新老包装随机发货）',
			// 		price: '198.00',
			// 		check: false
			// 	},
			// 	{
			// 		id: 6,
			// 		img: '../../static/my/commodity.png',
			// 		title: '北纯 五常稻花香 东北大米2.5kg （无添加 长粒 米 五常大米 稻花香米 新老包装随机发货）',
			// 		price: '198.00',
			// 		check: false
			// 	},
			// 	{
			// 		id: 7,
			// 		img: '../../static/my/commodity.png',
			// 		title: '北纯 五常稻花香 东北大米2.5kg （无添加 长粒 米 五常大米 稻花香米 新老包装随机发货）',
			// 		price: '198.00',
			// 		check: false
			// 	},
			// 	{
			// 		id: 8,
			// 		img: '../../static/my/commodity.png',
			// 		title: '北纯 五常稻花香 东北大米2.5kg （无添加 长粒 米 五常大米 稻花香米 新老包装随机发货）',
			// 		price: '198.00',
			// 		check: false
			// 	}
			// ]
		};
	},
	onLoad: function() {
		this.getCollection();
	},
	onShow(){
		this.getCollection();
	},
	watch: {
		checkBox() {
			if (this.checkBox.length > 0) {
				this.usable = true;
			} else {
				this.usable = false;
			}

			if (this.checkBox.length === this.footList.length) {
				this.checkAll = true;
			} else {
				this.checkAll = false;
			}
		}
	},
	computed: {
		checkBox() {
			let arr = [];
			this.footList.forEach(item => {
				if (item.check) {
					arr.push(item.id);
				}
			});
			// console.log(arr,555);

			this.arrList = arr;
			return arr
		}
	},
	methods: {
		jump(id) {
			uni.navigateTo({
				url: `/pages/category/commodity?id=${id}`
			});
		},
		getCollection() {
			this.$http
				.post(service.api.collection.myCollection, {
					// goodsid: self.gid
				})
				.then(res => {
					console.log(res);
					this.footList = res.data.data;
					this.footList.forEach(item => {
						// console.log(item, 111);
						item.check = false;
					});
				});
		},
		// 选中某个复选框时，由checkbox时触发
		checkboxChange(e) {
			var list = this.footList;
			this.footList = [];
			list.forEach(item => {
				if (item.id == e.name) {
					if (e.value == true) {
						item.check = false;
					} else {
						item.check = true;
					}
					//item.check = ? false : true;
				}
			});
			this.footList = list;
			console.log('触发1', e);
			console.log(this.arrList);
		},
		// 选中任一checkbox时，由checkbox-group触发
		checkboxGroupChange(e) {
			// console.log('触发2', e);
		},
		checkboxChangeAll(e) {
			let arr_all = [];
			var _this = this;
			_this.footList.forEach(it =>{
				arr_all.push(it.id)
			})
			_this.arrall = arr_all
			_this.checkAll = !_this.checkAll;
			if(!_this.checkAll){
				_this.arrList.length = _this.arrall.length
				_this.arrList = _this.arrall
				_this.usable = true;
				// console.log(_this.arrList.length,'true');
				
			}else {
				_this.arrList.length = 0
				_this.usable = false;
				// console.log(_this.arrList.length,'false');
			}
		},
		//全选
		eleAll() {
			let taht = this;
			let arr_all = [];
			taht.checkAll = !taht.checkAll;
			if (taht.checkAll) {
				taht.footList.forEach(item => {
					arr_all.push(item.id)
					item.check = true;
				});
				taht.arrList.length = arr_all.length
				taht.arrList = arr_all
				taht.usable = true;
			} else {
				taht.footList.forEach(item => {
					item.check = false;
				});
				taht.arrList.length = 0
				taht.usable = false;
			}
		},
		//删除
		del() {
			let that = this;
			// console.log(that.arrall.length,123);
			console.log(that.arrList.length);
			if (that.arrList.length == 0) {
				console.log(222);
				return;
			} else {
				console.log('删除');
				this.$http
					.post(service.api.collection.removeMyCollection, {
						ids: that.arrList
					})
					.then(res => {
						console.log(res);
						uni.showToast({
							icon: 'none',
							title: res.info
						});
						if (res.code == 1) {
							var list = that.footList;
							that.footList = [];
							list.forEach(item => {
								if (item.check == false) {
									that.footList.push(item);
								}
							});
						}
						/* that.checkBox.map(item => {
					that.footList = that.footList.filter(t => t.id != item);
				}); */
						// this.footList = res.data.data
					});
			}
		}
	},
	onNavigationBarButtonTap(e) {
		this.check = !this.check;
		console.log(e,1);
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #fff;
}
.footprint {
	height: 100%;
	overflow: hidden;
	padding-bottom: 100upx;
}

.info-box {
	display: flex;
	align-items: center;
	height: 160upx;
	box-sizing: border-box;
	margin-top: 22upx;
	padding: 0 20upx;
	margin-bottom: 50upx;
	.img {
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 160upx;
			height: 160upx;
		}
	}

	.commodity {
		margin-left: 30upx;

		.title {
			line-height: 1.4;
			color: #000000;
			font-size: 24upx;
		}

		.price {
			padding-top: 20upx;
			color: #ff594d;
			font-size: 28upx;
		}
	}

	.checkbox {
		// width: 36upx;
		// height: 36upx;
		// box-sizing: border-box;
		// border: 1upx solid rgba(153, 153, 153, 1);
		// border-radius: 50%;
		// margin-right: 20upx;
	}
}

.select {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
	height: 100upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;

	.all {
		display: flex;
		align-items: center;
		justify-content: center;

		& > view {
			// width: 36upx;
			// height: 36upx;
			// box-sizing: border-box;
			// border: 1upx solid rgba(153, 153, 153, 1);
			// border-radius: 50%;
			margin: 0 0 0 20upx;
		}
	}

	.del {
		width: 160upx;
		height: 80upx;
		line-height: 80upx;
		background-color: #cccccc;
		box-sizing: border-box;
		border: 1upx solid rgba(248, 248, 248, 1);
		color: #ffffff;
		text-align: center;
		border-radius: 50rpx;
		font-size: 32upx;
	}

	.active {
		background: #ff594d;
	}
}
.not-collection {
	display: flex;
	background: #FFFFFF;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: -400rpx;
	bottom: 0;
	left: 0;
	right: 0;
}
/deep/.u-checkbox__icon-wrap {
	border-radius: 50%; 
}
/deep/.u-checkbox__icon-wrap--checked {
	background-color: #ff594d !important;
	border-color: #ff594d !important;
}
</style>
