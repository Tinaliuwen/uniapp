<template>
	<view class="shopping-cart">
		<view class="consume-img">
			<image class="img" src="../../static/order/pay-success.png" mode=""></image>
			<!-- <view class="text">
				付款成功
			</view> -->
		</view>
		<view class="shopping">
			<view class="shopping-text" @click="shopping">继续购物</view>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			shopping(){
				uni.switchTab({
					url:'../main/index'
				})
			}
		}
	}
</script>

<style scoped>
	.consume-img{
		display: flex;
		/* flex-direction: column; */
		justify-content: center;
		align-items: center;
		margin-top: 240upx;
	}
	.img{
		width: 522upx;
		height: 331upx;
	}
	.text{
		color: #333;
		font-weight: bold;
	}
	.shopping{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 105upx;
	}
	.shopping-text{
		width: 240upx;
		height: 74upx;
		line-height: 74upx;
		text-align: center;
		color: #fff;
		border-radius:38upx;
		background-color: #ff594d;
	}
</style>
