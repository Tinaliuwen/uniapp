<template>
	<view class="shopping-cart">
		<view class="consume-img">
			<image class="img" src="../../static/img/record.png" mode=""></image>
			<view class="text">
				空空如也~
			</view>
		</view>
		<view class="shopping">
			<view class="shopping-text">去逛逛吧！</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.consume-img{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 240upx;
	}
	.img{
		width: 522upx;
		height: 350upx;
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
		height: 76upx;
		line-height: 76upx;
		text-align: center;
		color: #fff;
		border-radius:38upx;
		background-color: #ff594d;
	}
</style>
