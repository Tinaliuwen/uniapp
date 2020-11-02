<template>
	<view class="return_of_goods">
		<view class="list" @tap="returnType('仅退款')">
			<view class="left">
				<image src="../../static/img/tuihuo11.png" mode="aspectFit"></image>
			</view>
			<view class="right">
				<text class="title">仅退款</text>
				<text class="info">未收到货，需要退款对应的款项</text>
			</view>
		</view>
		<view class="list" @tap="returnType('退货退款')">
			<view class="left">
				<image src="../../static/img/tuihuo22.png" mode=""></image>
			</view>
			<view class="right">
				<text class="title">退货退款</text>
				<text class="info">已收到货，需要退还已收到的货物</text>
			</view>
		</view>
		<view class="list" @tap="returnType('仅换货')">
			<view class="left">
				<image src="../../static/img/tuihuo33.png" mode="aspectFit"></image>
			</view>
			<view class="right">
				<text class="title">仅换货</text>
				<text class="info">已收到货，与卖家协商同意前提下申请</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			returnType(option){
				uni.navigateTo({
					url:"./afterService?type="+option
				})
			}
		}
	}
</script>

<style scoped lang="less">
.return_of_goods{
	.list{
		height: 153upx;
		width: 100%;
		padding: 30upx;
		display: flex;
		margin-bottom: 20upx;
		background-color: #FFFFFF;
		align-items: center;
		box-sizing: border-box;
		.left{
			height: 93upx;
			width: 93upx;
			image{
				height: 100%;
				width: 100%;
			}
		}
		.right{
			margin-left: 21upx;
			display: flex;
			flex-direction: column;
			.title{
				height:26upx;
				font-size:28upx;
				font-weight:500;
				color:rgba(102,102,102,1);
				line-height:42upx;
			}
			.info{
				font-size:22upx;
				font-weight:500;
				color:rgba(171,171,171,1);
				line-height:42upx;
				margin-top: 18upx;
			}
			
		}
	}
	
}
</style>
