<template>
	<view class="person">
		<view class="person-box" v-for="(item,index) in 5" :key='index'>
			<view class="photo">
				<image src="../../static/img/avatar.png" mode=""></image>
			</view>
			<view class="info">
				<view>
					<text class="name">Lorem Ipsum</text><text class="phone">159****6569</text>
				</view>
				<view>
					<text class="subtitle">参团编号：</text><text class="number">001</text>
				</view>
				<view>
					<text class="subtitle">参团时间：</text><text class="time"> 2020-07-6 16:16:33</text>
				</view>
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

		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		// overflow: hidden;
		background-color: #ffffff;

		.person {
			height: calc(100vh - 88rpx);
			background-color: #ffffff;
			overflow: auto;
		}
	}

	.person-box {
		display: flex;
		align-items: center;
		padding: 20rpx;
		border-bottom: 20rpx solid #F4F4F4;

		.photo {
			width: 140rpx;
			height: 140rpx;
			margin-right: 18rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.info {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			height: 140rpx;
			padding: 10rpx 0;

			view {
				line-height: 1.2;
			}

			.name {
				color: #333333;
				font-size: 36rpx;
			}

			.subtitle {
				color: #333333;
				font-size: 24rpx;
			}

		}

		.info {

			.phone {
				color: #999999;
				font-size: 24rpx;
				margin-left: 28rpx;
			}

			.number {
				color: #000000;
				font-size: 26rpx;
				font-weight: bold;
			}

			.time {
				color: #333333;
				font-size: 26rpx;
			}
		}

	}
</style>
