<template>
	<view class="about">
		<view class="logo">
			<image class="logo-img" src="../../static/img/logo.png" mode=""></image>
		</view>
		<view class="name">
			<view class="title">5G拼购</view>
			<view >1.01V 版本</view>
		</view>
		<view class="text">
			<view class="text-left">对公账号</view>
			<view class="text-right">127912817310301</view>
		</view>
		<view class="text">
			<view class="text-left">开户行</view>
			<view class="text-right">招商银行 武汉光谷科技支行</view>
		</view>
		<view class="text">
			<view class="text-left">企业名称</view>
			<view class="text-right">思麦网络科技（湖北）有限公司</view>
		</view>
		
		<view class="bottom">
			<view>思麦网络科技（湖北）有限公司   版权所有 </view>
			<view>C0pyright 2009-2015 Beauty d dsdhfskfbd</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.logo{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 30upx;
	}
	.logo-img{
		width: 262upx;
		height: 262upx;
		
	}
	.name{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #999;
		font-size: 24upx;
		font-weight: bold;
		margin-bottom: 40upx;
	}
	.title{
		padding-bottom: 20upx;
		font-size: 32upx;color: #333;
	}
	.text{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 25upx;
		padding-right: 20upx;
		border-bottom: 1px solid #ccc;
		height: 118upx;
		
	}
	.text-left{
		font-size:32upx;
		font-weight:500;
		color: #666;
	}
	.text-right{
		font-size:32upx;
		font-weight:500;
		color: #333;
	}
	.bottom{
		/* display: flex; */
		/* justify-content: center; */
		/* flex-direction: column; */
		/* align-items: center; */
		color: #999;
		font-size: 24upx;
		font-weight:500;
		position: fixed;
		bottom: 50upx;
		left: 136upx;
	}
</style>
