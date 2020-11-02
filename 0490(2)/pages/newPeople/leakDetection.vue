<template>
  <view class="container">
	<!-- 捡漏 -->
	<view class="goods-section">
		<!-- <view class="goods-header">捡漏区</view> -->
		<view class="goods-list u-f-jsb u-f-fw">
			<view class="goods-item" @click="jumper(`/pages/category/commodity?id=${item.id}`)" v-for="(item,index) in goodsCate" :key="index">
				<image :src="item.logo" mode=""></image>
				<view class="title u-line-clamp">{{item.title}}</view>
				<view class="price u-f-ac">
					￥{{item.price_market}}
					<!-- <text>￥{{item.price_cost}}</text> -->
				</view>
				<view class="wz_img" v-for="(it,imgindex) in img_index" :key='imgindex' v-if="img_index[imgindex] == index">
					<image src="../../static/img/null.png" mode=""></image>
				</view>
			</view>
		</view>
		
		<!-- <uni-load-more :status="status"></uni-load-more> -->
	</view>
    
    <!-- <tabbar status="1" type="0"></tabbar> -->
  </view>
</template>

<script>
	import service from '@/store/service.js';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				integral: '',
				goodsCate:[],
				status:0,
				last_page:2,
				page:1,
				img_null:0,
				img_index:[],
			};
		},
		onShow:function(){
			var self = this;
			self.$http .post(service.api.main.user).then(function(res) {
				if(res.code == 1){
					res = res.data;
					self.integral = res.credit2;
				}else{
					self.$api.msg(res.msg);
				}
			});
		},
		onLoad: function() {
			var self = this;
			self.getGoodsCate()
		},
		methods: {
			getGoodsCate() {
				var self = this;
				self.$http.get(service.api.main.getGoodLouList, {
					type:3,
					page:self.page
				}).then(function(res) {
					console.log(res);
					var list = res.data.data;
					self.img_index=[];
					self.last_page = res.data.last_page
					if(self.page <= self.last_page){
						self.goodsCate = self.goodsCate.concat(list);
						self.goodsCate.forEach((it,index) => {
							if(it.number_stock == 0) {
								self.img_null = 0;
								self.img_index.push(index)
							}
						})
						// console.log(self.goodsCate);
					}
					
					// list.forEach(item =>{
					// 	if(item.is_leakarea == 1){
						
					// 	}
					// })
				});
			},
			jumper(url){
				uni.navigateTo({
					url:url
				})
			},
			onReachBottom(){
				var self = this;
				console.log(self.page,self.last_page);
				if(self.page < self.last_page){
					self.page = self.page + 1
					self.getGoodsCate()
				}else{
					uni.showToast({
					    title: '没有数据了',
					    duration: 2000,
						icon:'none'
					});
				}
				
			},
		}
	}
</script>

<style lang="scss">
	.container {
		padding-top: 20rpx;
	}
	.head,.gift{
		width: 100%;
		background: #FFFFFF;
	}
	.header {
		width: 100%;
		height: 270upx;
		background: url(../../static/user/back.png) no-repeat;
		background-size: 100% 100%;
	}

	.header-center {
		position: relative;
		display: flex;
		flex-direction: column;
		left: 0;
		right: 0;
		width: 710upx;
		height: 260upx;
		margin: 0 auto;
		margin-top: -240upx;
		border-radius: 10px;
		.center-top {
			display: flex;
			flex-direction: column;
			text-align: center;
			color: #FFFFFF;
			text:first-child {
				font-size: 32upx;
				margin-top: 48upx;
			}

			text:last-child {
				font-size: 66upx;
			}
		}
		.center-bottom {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding: 20upx 0;
			// height: 90upx;
			border-top: 1px solid #f3f3f3;
			text {
				font-size: 32upx;
				font-weight: bold;
				color: #e98f3f;
			}
			view {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 140upx;
				height: 44upx;
				margin: 0 22upx 0 136upx;
				border: 1px solid #ff594d;
				color: #d16f19;
				border-radius: 20upx;
				text {
					font-size: 24upx;
					font-weight: bold;
				}
				image {
					width: 10upx;
					height: 18upx;
					margin-left: 4upx;
				}
			}
		}
	}
	.gift{
		display: flex;
		.box{
			width: 50%;
			display: flex;
			padding: 30upx 0;
			image{
				width: 60upx;
				height: 60upx;
				margin: 6upx 0;
				margin-left: calc(50% - 140upx);
			}
			.right{
				width: 200upx;
				color: #333333;
				font-size: 30upx;
				font-weight: bold;
				margin-left: 20upx;
				.bom{
					font-size: 26upx;
					color: #999999;
				}
			}
		}
	}

	.goods-section {
		background-color: #f3f3f3;
		padding: 0 20rpx 30rpx;

		.goods-header {
			color: #262626;
			font-size: 34rpx;
			font-weight: bold;
			margin: 20rpx 0;
		}

		.goods-list {
			/* margin-bottom: 50rpx; */
			.goods-item {
				width: 345rpx;
				background-color: #ffffff;
				margin-bottom: 20rpx;
				border-radius: 10upx;
				position: relative;
				image {
					width: 100%;
					height: 330rpx;
					border-radius: 10upx 10upx 0upx 0upx;
				}

				.title {
					padding: 10rpx 30rpx 0;
					font-size: 26rpx;
					color: $uni-text-color;
					font-weight: bold;
					line-height: 1.4;
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
				}
				.wz_img {
					position: absolute;
					top: 64rpx;
					left: 64rpx;
					width: 210rpx;
					height: 210rpx;
					uni-image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>
