<template>
	<view class="footprint">
		<view class="info-box" v-for="(item, index) in 5" :key="index">
			<view class="img">
				<view class="checkbox" v-if="check"></view>
				<image src="../../static/img/footprint.png" mode=""></image>
			</view>
			<view class="commodity">
				<view class="title">北纯 五常稻花香 东北大米2.5kg （无添加 长粒 米 五常大米 稻花香米 新老包装随机发货）</view>
				<view class="price">￥198.00</view>
			</view>
		</view>

		<view class="select">
			<view class="all">
				<view class=""></view>
				全选
			</view>
			<view class="del">删除</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			check: false
		};
	},
	methods: {},
	onNavigationBarButtonTap(e) {
		console.log('编辑');
		this.check = !this.check;
	}
};
</script>

<style lang="scss" scoped>
.footprint {
	height: 100%;
	overflow: hidden;
}
.info-box {
	display: flex;
	align-items: center;
	height: 160upx;
	box-sizing: border-box;
	margin-top: 22upx;
	padding: 0 20upx;
	.img {
		display: flex;
		align-items: center;
		justify-content: center;
		image {
			width: 160upx;
			height: 160upx;
		}
	}
	.commodity {
		margin-left: 30upx;
		.title {
			line-height: 1.4;
			color: #000000;
			font-size: 24upx;
		}
		.price {
			padding-top: 20upx;
			color: #ff7b4c;
			font-size: 28upx;
		}
	}
	.checkbox {
		width: 36upx;
		height: 36upx;
		box-sizing: border-box;
		border: 1upx solid rgba(153, 153, 153, 1);
		border-radius: 50%;
		margin-right: 20upx;
	}
}

.select {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
	height: 100upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.all {
		display: flex;
		align-items: center;
		justify-content: center;
		& > view {
			width: 36upx;
			height: 36upx;
			box-sizing: border-box;
			border: 1upx solid rgba(153, 153, 153, 1);
			border-radius: 50%;
			margin: 0 14upx 0 20upx;
		}
	}
	.del {
		width: 160upx;
		height: 100upx;
		line-height: 100upx;
		background-color: #cccccc;
		box-sizing: border-box;
		border: 1upx solid rgba(248, 248, 248, 1);
		color: #ffffff;
		text-align: center;
		font-size: 28upx;
	}
}
</style>
