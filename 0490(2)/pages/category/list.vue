<template>
	<view class="content">
		<view class="navbar" :style="{position:headerPosition,top:headerTop}">
			<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1,synthesis)">
				<text>销量</text>
				<view class="p-box" v-if="filterIndex === 1">
					<uni-icons size="16" type="arrowdown" class="icon" color="#fa436a" v-if="synthesis == 1"></uni-icons>
					<uni-icons size="16" type="arrowup" class="icon" color="#fa436a" v-else></uni-icons>
				</view>
			</view>
			
			<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2,synthesis)">
				<text>价格</text>
				<view class="p-box" v-if="filterIndex === 2">
					<uni-icons size="16" type="arrowdown" class="icon" color="#fa436a" v-if="synthesis == 1"></uni-icons>
					<uni-icons size="16" type="arrowup" class="icon" color="#fa436a" v-else></uni-icons>
				</view>
			</view>
			<view class="cate-item filter" @click="toggleCateMask('show')">
				筛选
				<image class="icon-filter" src="../../static/icon/shaixuan@x2.png"></image>
			</view>
		</view>
		<view class="goods-list">
			<view v-for="(item, index) in goodsCate" :key="index" class="goods-item" @click="navToDetailPage(item.id)">
				<view class="image-wrapper">
					<image :src="item.logo" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.title}}</text>
				<view class="price-box">
					<text class="price">{{item.price_market}}</text>
					<text class="old-price"> {{item.price_cost}}</text>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>

		<view class="cate-mask" :class="cateMaskState===0 ? 'none' : cateMaskState===1 ? 'show' : ''" @click="toggleCateMask">
			<view class="cate-content" @click.stop.prevent="stopPrevent" @touchmove.stop.prevent="stopPrevent">
				<scroll-view scroll-y class="cate-list">
					<view v-for="item in cateList" :key="item.id">
						<view class="cate-item b-b two">{{item.name}}</view>
						<view class="children-content">
							<view v-for="tItem in item.child" :key="tItem.id" class="cate-item b-b children-list" :class="{active: tItem.id==cateId}"
							 @click="changeCate(tItem)">
								<view class="cl">
									{{tItem.name}}
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

	</view>
</template>

<script>
	import service from '@/store/service.js';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	export default {
		components: {
			uniIcons,
			uniLoadMore
		},
		data() {
			return {
				cateMaskState: 0, //分类面板展开状态
				headerPosition: "fixed",
				headerTop: "0px",
				loadingType: 0, //加载更多状态
				filterIndex: 1,
				synthesis:1,
				cateId: 0, //已选三级分类id
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				cateList: [],
				goodsList: [],
				goodsCate:[],
				sid:0,
				mockCateGoryList: [{
						id: 1,
						name: '手机数码'
					},
					{
						id: 2,
						name: '礼品鲜花'
					},
					{
						id: 3,
						name: '男装女装'
					},
					{
						id: 4,
						name: '母婴用品'
					},
					{
						id: 5,
						pid: 1,
						name: '手机通讯'
					},
					{
						id: 6,
						pid: 1,
						name: '运营商'
					},
					{
						id: 8,
						pid: 5,
						name: '全面屏手机',
						picture: '../../static/order/pic.png'
					},
					{
						id: 9,
						pid: 5,
						name: '游戏手机',
						picture: '../../static/order/pic.png'
					},
					{
						id: 10,
						pid: 5,
						name: '老人机',
						picture: '../../static/order/pic.png'
					},
					{
						id: 11,
						pid: 5,
						name: '拍照手机',
						picture: '../../static/order/pic.png'
					},
					{
						id: 12,
						pid: 5,
						name: '女性手机',
						picture: '../../static/order/pic.png'
					},
					{
						id: 14,
						pid: 6,
						name: '合约机',
						picture: '../../static/order/pic.png'
					},
					{
						id: 15,
						pid: 6,
						name: '选好卡',
						picture: '../../static/order/pic.png'
					},
					{
						id: 16,
						pid: 6,
						name: '办套餐',
						picture: '../../static/order/pic.png'
					},
					{
						id: 17,
						pid: 2,
						name: '礼品',
					},
					{
						id: 18,
						pid: 2,
						name: '鲜花',
					},
					{
						id: 19,
						pid: 17,
						name: '公益摆件',
						picture: '../../static/order/pic.png'
					},
					{
						id: 20,
						pid: 17,
						name: '创意礼品',
						picture: '../../static/order/pic.png'
					},
					{
						id: 21,
						pid: 18,
						name: '鲜花',
						picture: '../../static/order/pic.png'
					},
					{
						id: 22,
						pid: 18,
						name: '每周一花',
						picture: '../../static/order/pic.png'
					},
					{
						id: 23,
						pid: 18,
						name: '卡通花束',
						picture: '../../static/order/pic.png'
					},
					{
						id: 24,
						pid: 18,
						name: '永生花',
						picture: '../../static/order/pic.png'
					},
					{
						id: 25,
						pid: 3,
						name: '男装'
					},
					{
						id: 26,
						pid: 3,
						name: '女装'
					},
					{
						id: 27,
						pid: 25,
						name: '男士T恤',
						picture: '../../static/order/pic.png'
					},
					{
						id: 28,
						pid: 25,
						name: '男士外套',
						picture: '../../static/order/pic.png'
					},
					{
						id: 29,
						pid: 26,
						name: '裙装',
						picture: '../../static/order/pic.png'
					},
					{
						id: 30,
						pid: 26,
						name: 'T恤',
						picture: '../../static/order/pic.png'
					},
					{
						id: 31,
						pid: 26,
						name: '上装',
						picture: '../../static/order/pic.png'
					},
					{
						id: 32,
						pid: 26,
						name: '下装',
						picture: '../../static/order/pic.png'
					},
					{
						id: 33,
						pid: 4,
						name: '奶粉',
					},
					{
						id: 34,
						pid: 4,
						name: '营养辅食',
					},
					{
						id: 35,
						pid: 4,
						name: '童装',
					},
					{
						id: 39,
						pid: 4,
						name: '喂养用品',
					},
					{
						id: 36,
						pid: 33,
						name: '有机奶粉',
						picture: '../../static/order/pic.png'
					},
					{
						id: 37,
						pid: 34,
						name: '果泥/果汁',
						picture: '../../static/order/pic.png'
					},
					{
						id: 39,
						pid: 34,
						name: '面条/粥',
						picture: '../../static/order/pic.png'
					},
					{
						id: 42,
						pid: 35,
						name: '婴童衣橱',
						picture: '../../static/order/pic.png'
					},
					{
						id: 43,
						pid: 39,
						name: '吸奶器',
						picture: '../../static/order/pic.png'
					},
					{
						id: 44,
						pid: 39,
						name: '儿童餐具',
						picture: '../../static/order/pic.png'
					},
					{
						id: 45,
						pid: 39,
						name: '牙胶安抚',
						picture: '../../static/order/pic.png'
					},
					{
						id: 46,
						pid: 39,
						name: '围兜',
						picture: '../../static/order/pic.png'
					},
				],
				mockGoodList: [{
						image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg",
						image2: "http://pic.rmb.bdstatic.com/819a044daa66718c2c40a48c1ba971e6.jpeg",
						image3: "http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg",
						title: "古黛妃 短袖t恤女夏装2019新款韩版宽松",
						price: 179,
						sales: 61,
						oldPrice: 20000
					},
					{
						image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg",
						image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
						image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
						title: "潘歌针织连衣裙",
						price: 78,
						sales: 16,
						oldPrice: 20000
					},
					{
						image: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg",
						image2: "http://m.360buyimg.com/n12/jfs/t247/42/1078640382/162559/3628a0b/53f5ad09N0dd79894.jpg%21q70.jpg",
						image3: "http://ikids.61kids.com.cn/upload/2018-12-29/1546070626796114.jpg",
						title: "巧谷2019春夏季新品新款女装",
						price: 108.8,
						sales: 5,
						oldPrice: 20000
					}, {
						image: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=756705744,3505936868&fm=11&gp=0.jpg",
						image2: "http://images.jaadee.com/images/201702/goods_img/30150_d85aed83521.jpg",
						image3: "http://img13.360buyimg.com/popWaterMark/jfs/t865/120/206320620/138889/dcc94caa/550acedcN613e2a9d.jpg",
						title: "私萱连衣裙",
						price: 265,
						sales: 88,
						oldPrice: 20000
					}, {
						image: "https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg",
						image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553418265666&di=d4a7f7eb0ae3c859edeb921641ee1c3a&imgtype=0&src=http%3A%2F%2Fimg003.hc360.cn%2Fy3%2FM02%2FF8%2F9F%2FwKhQh1TuSkGELIlQAAAAAPuLl4M987.jpg",
						image3: "http://img.ef43.com.cn/product/2016/8/05100204b0c.jpg",
						title: "娇诗茹 ulzzang原宿风学生潮韩版春夏短",
						price: 422,
						sales: 137,
						oldPrice: 20000

					}, {
						image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg",
						image2: "http://image5.suning.cn/uimg/b2c/newcatentries/0070158827-000000000622091973_2_800x800.jpg",
						image3: "http://img.61ef.cn/news/201903/20/2019032009251784.jpg",
						title: "古黛妃 短袖t恤女夏装2019新款韩版宽松",
						price: 179,
						sales: 95,
						oldPrice: 20000
					},
				],

			};
		},

		onLoad(options) {
			this.sid=options.tid
			// #ifdef H5
			this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight + 'px';
			// #endif
			this.cateId = options.tid;
			this.loadCateList(options.fid, options.sid);
			this.loadData();
			this.getGoodsCate();
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = "fixed";
			} else {
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom() {
			this.loadData();
		},
		methods: {
			//排序点击
			tabClick(index,idx){
				if(this.filterIndex === index){
					if(idx == 1){
						this.synthesis = 0;
					}else{
						this.synthesis = 1;
					}
					
				}else{
					this.filterIndex = index;
					this.synthesis = 1;
				}
				
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				});
				
				this.loading();
			},
			loading(){
				this.isLoading = false;
				this.scroll = false;
				this.pages = 1;
				this.page = 0;
				this.out = 0;
				this.goodsCate = [];
				this.getGoodsCate();
			},
			getGoodsCate() {
				var self = this;
					if(self.synthesis == 1){
						var order = 'desc';
					}else{
						var order = 'asc';
					}
					
					if(self.filterIndex == 1){
						var sort = 'sales';
					}else{
						var sort = 'price';
					}
				self.$http.post(service.api.category.goodList, {
					cate_ids:self.sid,
					'order':order,
					'sort':sort,
				}).then(function(res) {
					console.log(res);
			
					var list = res.data.data;
					self.goodsCate = list;
				});
			},
			//加载分类
			async loadCateList(fid, sid) {
				let list = this.mockCateGoryList;
				let cateList = list.filter(item => item.pid == fid);

				cateList.forEach(item => {
					let tempList = list.filter(val => val.pid == item.id);
					item.child = tempList;
				})
				this.cateList = cateList;
			},
			//加载商品 ，带下拉刷新和上滑加载
			async loadData(type = 'add', loading) {
				//没有更多直接返回
				if (type === 'add') {
					if (this.loadingType === 2) {
						return;
					}
					this.loadingType = 1;
				} else {
					this.loadingType = 0
				}

				let goodsList = this.mockGoodList;
				if (type === 'refresh') {
					this.goodsList = [];
				}
				//筛选，测试数据直接前端筛选了
				if (this.filterIndex === 1) {
					goodsList.sort((a, b) => b.sales - a.sales)
				}
				if (this.filterIndex === 2) {
					goodsList.sort((a, b) => {
						if (this.priceOrder == 1) {
							return a.price - b.price;
						}
						return b.price - a.price;
					})
				}

				this.goodsList = this.goodsList.concat(goodsList);

				//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
				this.loadingType = this.goodsList.length > 20 ? 2 : 0;
				if (type === 'refresh') {
					if (loading == 1) {
						uni.hideLoading()
					} else {
						uni.stopPullDownRefresh();
					}
				}
			},/* 
			//筛选点击
			tabClick(index) {
				console.log(index)
				if (this.filterIndex === index && index !== 2) {
					return;
				}
				this.filterIndex = index;
				if (index === 2) {
					this.priceOrder = this.priceOrder === 1 ? 2 : 1;
				} else {
					this.priceOrder = 0;
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.loadData('refresh', 1);
				// uni.showLoading({
				// 	title: '正在加载'
				// })
			}, */
			//显示分类面板
			toggleCateMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(() => {
					this.cateMaskState = state;
				}, timer)
			},
			//分类点击
			changeCate(item) {
				console.log(item)
				this.cateId = item.id;
				this.toggleCateMask();
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.loadData('refresh', 1);
				// uni.showLoading({
				// 	title: '正在加载'
				// })
			},
			//详情
			navToDetailPage(gid) {
				//测试数据没有写id，用title代替
				let id = gid;
				uni.navigateTo({
					url: `/pages/category/commodity?id=${gid}`
				})
			},
			stopPrevent() {}
		},
	}
</script>

<style lang="scss">
	.icon-up {
		height: 20upx;
		width: 20upx;
	}

	.icom-down {
		height: 20upx;
		width: 20upx;
	}

	page,
	.content {
		background: #f8f8f8;
	}

	.content {
		padding-top: 96upx;
	}

	.navbar {
		position: fixed;
		left: 0;
		top: var(--window-top);
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0, 0, 0, .06);
		z-index: 10;
		justify-content: space-around;

		.nav-item {
			// flex: 1;
			width: 20%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			position: relative;
			font-size: 24upx;
			font-weight: 500;
			color: rgba(153, 153, 153, 1);

			&.current {
				color: #fa436a;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid #fa436a;
				}
			}
		}

		.p-box {
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.yticon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;

				&.active {
					color: #fa436a;
				}
			}

			.icon-up {}


		}


		.cate-item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			// width: 80upx;
			position: relative;
			font-size: 44upx;


		}

		// 筛选的样式
		.filter {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			font-size: 24upx;
			font-weight: 500;
			flex-wrap: nowrap;
			color: rgba(153, 153, 153, 1);

			.icon-filter {
				height: 24upx;
				width: 24upx;
				margin-top: 5upx;
			}
		}
	}

	/* 分类 */
	.cate-mask {
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 95;
		transition: .3s;

		.cate-content {
			width: 630upx;
			height: 100%;
			background: #fff;
			float: right;
			transform: translateX(100%);
			transition: .3s;
			padding-top: 61upx;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.cate-content {
				transform: translateX(0);
			}
		}
	}

	.cate-list {
		display: flex;
		flex-direction: column;
		height: 100%;

		.cate-item {
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
			font-size: 28upx;
			color: #555;
			position: relative;
		}

		.two {
			height: 64upx;
			font-size: 30upx;
			font-size: 24upx;
			font-weight: 500;
			color: rgba(101, 101, 101, 1);
		}

		.children-content {
			display: flex;
			width: 100%;
			flex-wrap: wrap;
			padding: 10upx;
			.children-list{
				width: 32.3333%;
				height:101upx;
				border-radius:5upx;
				text-align: center;
				padding: 10upx;
				box-sizing: border-box;

				.cl{
					height: 100%;
					width: 100%;
					line-height: 81upx;
					background:rgba(239,239,239,1);
				}
				
			}
		}

		.active {
			color: #fa436a;
		}
	}

	/* 商品列表 */
	.goods-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		

		.goods-item {
			display: flex;
			flex-direction: column;
			width: 48%;
			/* padding-bottom: 40upx; */
			margin-bottom: 20upx;
			background: #fff;
			border-radius: 20upx;
			&:nth-child(2n+1) {
				margin-right: 4%;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 330upx;
			border-radius: 3upx;
			overflow: hidden;
			border-radius: 10upx 10upx 0px 0upx;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.title {
			padding: 10rpx 30rpx 0;
			font-size: 26rpx;
			color: $uni-text-color;
			font-weight: bold;
			line-height: 1.4;
		}


		.price-box {
			display: flex;
			align-items: center;
			padding-right: 10upx;
			font-size: 24upx;
			color: #909399;

			.old-price {
				text-decoration: line-through;
			}
		}

		.price {
			padding: 14rpx 30rpx;
			font-size: 36rpx;
			font-weight: bold;
			color: #ff594d;

			text {
				font-size: 20rpx;
				color: #999;
				text-decoration: line-through;
				margin-left: 15rpx;
			}

			&:before {
				content: '￥';
				font-size: 26upx;
			}
		}

		.old-price {
			margin-left: 29upx;

			&:before {
				content: '￥';
				font-size: 26upx;
			}
		}
	}
</style>
