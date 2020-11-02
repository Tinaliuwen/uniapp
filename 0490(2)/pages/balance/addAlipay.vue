<template>
	 <view class="bank-card">
		 <view class="card">
		 	<view class="card-left">
		 		<view>姓名：</view>
		 		<input type="text" value=""/>
		 	</view>
		 	<view class="card-left">
		 		<view>支付宝账号：</view>
		 		<input type="text" value=""/>
		 	</view>
		 	<view class="card-left">
		 		<view>确认支付宝账号：</view>
		 		<input type="text" value=""/>
		 	</view>
		 </view>
	 <view class="submit">
	 	提交
	 </view>
	 </view>
</template>

<script>
</script>

<style scoped>
	.card{
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.card-left{
		display: flex;
		align-items: center;
		height: 100upx;
		border-bottom: 1px solid #F4F4F4;
		color: #666666;
		padding-left: 18upx;
	}
	.submit{
		background:linear-gradient(90deg,rgba(233,144,64,1),rgba(255,123,76,1));
		border-radius:10upx;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 182upx 32upx 0 28upx;
		height: 100upx;
		font-size: 36upx;
		font-weight: bold;
	}
</style>
