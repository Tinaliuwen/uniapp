<template>
	<view>
		<view class="list" v-for="(item,index) in ent_list" :key='index'>
			<view class="list_top">
				<view>
					<image class="img_tou" :src="item.avatar == '' ? '/static/face.png' : item.avatar"  mode=""></image>
					<text style="margin-left: 100rpx;">{{item.nickname}}</text>
					<view class="list_fan" v-if="type != 4">返佣：<text>￥{{item.money}}</text></view>
				</view>
			</view>
			<view class="cald_list">
				<image class="img" :src=item.goods_logo mode=""></image>
				<view class="count">
					<text style="display: flex;">{{item.goods_title}}</text>
					<text>￥{{item.price_real}}</text>
				</view>
			</view>
			<view class="list_dan">订单号：<text>{{item.order_no}}</text></view>
			<view class="list_dan">下单时间：<text>{{item.create_at}}</text></view>
			<view class="wz_dai" v-if="item.status == 1">待结算</view>
			<view class="wz_dai" v-if="item.status == 2">已结算</view>
		</view>
		<view class="empty" v-if="show == 1">
			<image class="img" src="../../static/card/empty@2x.png" mode=""></image>
			暂无详情
		</view>
	</view>
</template>

<script>
	import service from '@/store/service.js';
	export default {
	
		data() {
			return {
				dan_num:7,
				price:130.450,
				time:'2020-7',
				id:0,
				type:1,
				show:0,
				types:1,
				order_cout:417,
				order_price:13465138.54,
				ent_list:[
					// {
					// 	image:'../../static/img/dan.jpg',
					// 	price:'54.52',
					// 	namew:'皮皮丹',
					// 	name:'大豆',
					// 	num_pirce:'1573.51',
					// 	order_num:'wx159486890855464605',
					// 	time:'2020-07-16 12：09'
					// },
					// {
					// 	image:'../../static/img/s.jpg',
					// 	price:'13.35',
					// 	namew:'克鲁尼',
					// 	name:'大米',
					// 	num_pirce:'5464.51',
					// 	order_num:'wx159486890855464605',
					// 	time:'2020-07-16 12：09'
					// },
					// {
					// 	image:'../../static/img/a.jpg',
					// 	price:'22.35',
					// 	namew:'冯大伟',
					// 	name:'红海',
					// 	num_pirce:'1453.51',
					// 	order_num:'wx159486890855464605',
					// 	time:'2020-07-16 12：09'
					// }
				]
			}
		},
		onLoad:function (e){
			var self = this;
			self.id = e.id;
			self.type = e.type;
			self.$http.get(service.api.order.orderDividends, {
				id:self.id,
				type:self.type
			}).then(function(res) {
				if (res.code == 1) {
					console.log(res.data.create_at);
					self.ent_list = res.data;
					
				} else {
					self.$api.msg(res.info);
					self.show = 1
				}
			});
		},
		methods: {
			
		},
		onReachBottom(){
			console.log(1);
		}
	}
</script>

<style scoped lang="less">
	.header {
		width: 100%;
		background:#D64431 ;
		color: #ffffff;
		position: relative;
		font-size: 26rpx;
		padding: 46rpx;
		.text {
			font-size: 38rpx;
		}
		.hea_vie {
			margin-top: 18rpx;
		}
		.img {
			width: 150rpx;
			height: 150rpx;
			position: absolute;
			right: 40rpx;
			top: 20rpx;
		}
	}
	.wz_dai{
		right: 30rpx;
		bottom: 20rpx;
		color: #ff594d;
		color: rgb(255, 89, 77);
		position: absolute;
	}
	.time_num {
		width: 100%;
		background:none ;
		color: #000000;
		line-height: 1.5;
		font-size: 26rpx;
		padding: 30rpx;
		.time_text {
			color: #9F9F9F;
		}
	}
	.list {
		background: #FFFFFF;
		padding: 20rpx 30rpx;
		position: relative;
		margin-bottom: 14rpx;
		margin-top: 20rpx;
		.list_top{
			height: 80rpx;
			line-height: 80rpx;
			.img_tou {
				width: 70rpx;
				height: 70rpx;
				position: absolute;top: 20rpx;
				border-radius: 50%;
				// box-shadow: 0px 0px 8rpx 4rpx #B6B6B6;
			}
			.list_fan {
				float: right;
				text {
					color: red;
				}
			}
		}
		
		.cald_list {
			display: flex;
			flex-wrap: wrap;
			margin-top: 20rpx;
			border-top: 2rpx solid #F5F5F5;
			border-bottom: 2rpx solid #F5F5F5;
			padding: 20rpx 0px;
			margin-bottom: 22rpx;
			.img{
				width: 110rpx;
				height: 110rpx;
			}
			.order {
				width: 100%;
				color: #999999;
				margin-bottom: 10rpx;
			}
			.count {
				font-size: 26rpx;
				padding: 10rpx 20rpx;
				color: #000000;
				line-height: 1.6;
			}
		}
		.list_dan {
			color: rgb(149, 149, 149);
			margin-top: 10rpx;
			text {
				color: rgb(99, 99, 99);
			}
		}
	}
	.empty{
		text-align: center;
		font-size: 36rpx;
		.img {
			width: 100%;
			margin-top: 240rpx;
		}
	}
</style>
