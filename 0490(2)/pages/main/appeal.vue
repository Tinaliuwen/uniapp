<template>
	<view>
		<u-card :title="title" :sub-title="item.is_reply == 1 ? '已完成':'申诉中'" :sub-title-color="item.is_reply == 1 ? '#FF5A4E':'#666666'" v-for="(item,index) in appeal_list" :key='index'>
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">{{item.remark}}</view>
				</view>
				<view class="card_status">{{item.createtime}}</view>
				<view class="cald_list" v-if="item.type == 0">
					<view class="order">{{item.ordersn}}</view>
					<image class="img" :src=item.goods_logo mode=""></image>
					<view class="count">
						<text style="display: flex;">{{item.goods_title}}</text>
						<text>价格：{{item.price_real}}</text>
					</view>
				</view>
				<view class="reply" v-if="item.is_reply   == 1">
					系统回复：<text style="color: #666666;">{{item.replys}}</text>
				</view>
			</view>	
			
		</u-card>
		<view class="empty" v-if="show == 1">
			<image class="img" src="../../static/card/empty@2x.png" mode=""></image>
			暂无数据
		</view>
	</view>
</template>

<script>
	import service from '@/store/service.js';
	export default {
		data() {
			return {
				title: '申诉说明',
				subTitle: '已完成',
				status:0, //是否订单申诉 0 是 1否
				replys:1, // 是否有回复 0否 1是
				appeal_list:[],
				show:0,
				
			};
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/pages/main/myappeal'
			});
		},
		onShow:function () {
			var self = this;
			self.$http.post(service.api.main.getAppealsList)
				.then(function(res) {
					if (res.code == 1) {
						self.appeal_list = res.data.data
						if(self.appeal_list.length == 0){
							self.show = 1
						}
						
					}else{
						self.$api.msg(res.info);
					}
				});
		}
	};
</script>

<style scoped lang="scss">
	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
	.card_status {
		text-align: right;
		font-size: 30rpx;
		margin-top: 20rpx;
		color: #999999;
		font-size: 26rpx;
	}
	
	/deep/.u-line-2 {
		overflow: visible;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: initial;
	}
	.cald_list {
		display: flex;
		flex-wrap: wrap;
		background: #F6F6F6;
		padding: 20rpx;
		margin-top: 20rpx;
		border-radius: 16rpx;
		.img{
			width: 100rpx;
			height: 100rpx;
		}
		.order {
			width: 100%;
			color: #999999;
			margin-bottom: 10rpx;
		}
		.count {
			font-size: 26rpx;
			padding: 10rpx 20rpx;
			color: #999999;
		}
	}
	.reply {
		margin-top: 16rpx;
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
