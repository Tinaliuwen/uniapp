<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="item in flist" :key="item.id" class="f-item b-b" :class="{ active: item.id === currentId }" @click="tabtap(item)">{{ item.title }}</view>
			<!-- @click="buttom(item.id)" -->
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
			<!-- <view class="lunbo" v-for="item in goodsCate" :key="item.id"><image class="img" :src="item.logo"></image></view> -->
			<!-- <view class="lunbo" v-for="item in goodsCate" :key="item.id"><image class="img" src="../../static/img/points/banner.png"></image></view> -->
			<view v-for="item in slist" :key="item.id" class="s-list" :id="'main-' + item.id">
				<text class="s-item">{{ item.title }}</text>
				<view class="t-list">
					<view @click="navToList(item.id, titem.id)" v-if="titem.pid === item.id" class="t-item" v-for="titem in tlist" :key="titem.id">
						<image :src="titem.logo"></image>
						<text>{{ titem.title }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
import service from '@/store/service.js';
export default {
	data() {
		return {
			sizeCalcState: false,
			tabScrollTop: 0,
			currentId: 1,
			flist: [],
			slist: [],
			tlist: [],
			goodsCate: [],
			cateList: []
			// {
			// 	id: 1,
			// 	name: '手机数码'
			// },
			// {
			// 	id: 2,
			// 	name: '礼品鲜花'
			// },
			// {
			// 	id: 3,
			// 	name: '男装女装'
			// },
			// {
			// 	id: 4,
			// 	name: '母婴用品'
			// },
			// {
			// 	id: 5,
			// 	pid: 1,
			// 	name: '手机通讯'
			// },
			// {
			// 	id: 6,
			// 	pid: 1,
			// 	name: '运营商'
			// },
			// {
			// 	id: 8,
			// 	pid: 5,
			// 	name: '全面屏手机',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 9,
			// 	pid: 5,
			// 	name: '游戏手机',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 10,
			// 	pid: 5,
			// 	name: '老人机',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 11,
			// 	pid: 5,
			// 	name: '拍照手机',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 12,
			// 	pid: 5,
			// 	name: '女性手机',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 14,
			// 	pid: 6,
			// 	name: '合约机',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 15,
			// 	pid: 6,
			// 	name: '选好卡',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 16,
			// 	pid: 6,
			// 	name: '办套餐',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 17,
			// 	pid: 2,
			// 	name: '礼品'
			// },
			// {
			// 	id: 18,
			// 	pid: 2,
			// 	name: '鲜花'
			// },
			// {
			// 	id: 19,
			// 	pid: 17,
			// 	name: '公益摆件',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 20,
			// 	pid: 17,
			// 	name: '创意礼品',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 21,
			// 	pid: 18,
			// 	name: '鲜花',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 22,
			// 	pid: 18,
			// 	name: '每周一花',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 23,
			// 	pid: 18,
			// 	name: '卡通花束',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 24,
			// 	pid: 18,
			// 	name: '永生花',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 25,
			// 	pid: 3,
			// 	name: '男装'
			// },
			// {
			// 	id: 26,
			// 	pid: 3,-
			// 	name: '女装'
			// },
			// {
			// 	id: 27,
			// 	pid: 25,
			// 	name: '男士T恤',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 28,
			// 	pid: 25,
			// 	name: '男士外套',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 29,
			// 	pid: 26,
			// 	name: '裙装',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 30,
			// 	pid: 26,
			// 	name: 'T恤',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 31,
			// 	pid: 26,
			// 	name: '上装',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 32,
			// 	pid: 26,
			// 	name: '下装',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 33,
			// 	pid: 4,
			// 	name: '奶粉'
			// },
			// {
			// 	id: 34,
			// 	pid: 4,
			// 	name: '营养辅食'
			// },
			// {
			// 	id: 35,
			// 	pid: 4,
			// 	name: '童装'
			// },
			// {
			// 	id: 39,
			// 	pid: 4,
			// 	name: '喂养用品'
			// },
			// {
			// 	id: 36,
			// 	pid: 33,
			// 	name: '有机奶粉',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 37,
			// 	pid: 34,
			// 	name: '果泥/果汁',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 39,
			// 	pid: 34,
			// 	name: '面条/粥',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 42,
			// 	pid: 35,
			// 	name: '婴童衣橱',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 43,
			// 	pid: 39,
			// 	name: '吸奶器',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 44,
			// 	pid: 39,
			// 	name: '儿童餐具',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 45,
			// 	pid: 39,
			// 	name: '牙胶安抚',
			// 	picture: '../../static/order/pic.png'
			// },
			// {
			// 	id: 46,
			// 	pid: 39,
			// 	name: '围兜',
			// 	picture: '../../static/order/pic.png'
			// }
		};
	},
	onLoad() {
		this.loadData();
		this.getGoodsCate();
		this.getSubGoodsCate();
	},
	methods: {
		buttom(id) {
			const query = uni.createSelectorQuery().in(this);
			query
				.select('#main-' + id)
				.boundingClientRect(data => {
					console.log(data);
					uni.pageScrollTo({
						scrollTop: 1000,
						duration: 300
					});
				})
				.exec();
		},
		getGoodsCate() {
			var self = this;
			self.$http.get(service.api.category.goodsCate, {}).then(function(res) {
				console.log(res);

				var list = res.data;
				self.goodsCate = list;
				if(list.logo){
					// self.goodsLogo=
				}
			});
		},
		getSubGoodsCate() {
			var self = this;
			self.$http
				.get(service.api.category.subGoodsCate, {
					is_recommend: 0
				})
				.then(function(res) {
					console.log(res);

					var list = res.data;
					self.currentId = list[0].id;
					//self.flist = list;
					list.forEach(li => {
						self.flist.push(li);
						//self.slist.push(li);
						var lis = li.sub;
						lis.forEach(ls => {
							//ls.pname = li.title;
							self.slist.push(ls);
							var box = ls.sub;
							if (box) {
								box.forEach(bo => {
									self.tlist.push(bo);
								});
							}
						});
					});
				});
		},
		async loadData() {
			this.cateList.forEach(item => {
				if (!item.pid) {
					this.flist.push(item); //pid为父级id, 没有pid或者pid=0是一级分类
				} else if (!item.picture) {
					this.slist.push(item); //没有图的是2级分类
				} else {
					this.tlist.push(item); //3级分类
				}
			});
		},
		//一级分类点击
		tabtap(item) {
			if (!this.sizeCalcState) {
				this.calcSize();
			}

			this.currentId = item.id;
			console.log(this.currentId);
			// console.log(this.slist,111);
			let index = this.slist.findIndex(sitem => sitem.pid === item.id);
			console.log(this.slist);
			console.log(index, 333);
			this.tabScrollTop = this.slist[index].top;
		},
		//右侧栏滚动
		asideScroll(e) {
			if (!this.sizeCalcState) {
				this.calcSize();
			}
			let scrollTop = e.detail.scrollTop;
			let tabs = this.slist.filter(item => item.top <= scrollTop).reverse();
			if (tabs.length > 0) {
				this.currentId = tabs[0].pid;
			}
		},
		//计算右侧栏每个tab的高度等信息
		calcSize() {
			let h = 0;
			this.slist.forEach(item => {
				let view = uni.createSelectorQuery().select('#main-' + item.id);
				view
					.fields(
						{
							size: true
						},
						data => {
							item.top = h;
							h += data.height;
							item.bottom = h;
						}
					)
					.exec();
			});
			this.sizeCalcState = true;
		},
		navToList(sid, tid) {
			uni.navigateTo({
				url: `/pages/category/list?fid=${this.currentId}&sid=${sid}&tid=${tid}`
			});
		}
	}
};
</script>

<style lang="scss">
.lunbo {
	height: 197upx;
	width: 528upx;
	padding: 31upx 21upx 0;
	box-sizing: border-box;

	> image {
		height: 100%;
		width: 100%;
	}
}
page,
.content {
	height: 100%;
	background-color: #f8f8f8;
}

.content {
	display: flex;
}

.left-aside {
	flex-shrink: 0;
	width: 200upx;
	height: 100%;
	background-color: #fff;
}

.f-item {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100upx;
	font-size: 28upx;
	color: #303133;
	position: relative;
	border-bottom: 1px solid rgba(223, 223, 223, 1);

	&.active {
		color: #ff594d;
		background: #f8f8f8;

		&:before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			height: 36upx;
			width: 8upx;
			background-color: #ff9933;
			border-radius: 0 4px 4px 0;
			opacity: 0.8;
		}
	}
}

.right-aside {
	flex: 1;
	overflow: hidden;
	padding-left: 20upx;
	margin-bottom: 150upx;
}

.s-item {
	display: flex;
	align-items: center;
	height: 80upx;
	padding-top: 8upx;
	font-size: 28upx;
	color: #303133;
}

.t-list {
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	background: #fff;
	padding-top: 12upx;
	min-height: 100px;
	&:after {
		content: '';
		flex: 99;
		height: 0;
	}
}

.t-item {
	align-items: center;
	flex-shrink: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 25%;
	font-size: 26upx;
	color: #666;
	// padding-bottom: 57upx;

	image {
		width: 107upx;
		height: 107upx;
	}
}
.img {
	height: 197upx;
	width: 528upx;
}
</style>
