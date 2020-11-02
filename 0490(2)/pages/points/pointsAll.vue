<template>
	<view class="consume">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabIndex === index }" @click="tabClick(index)">{{ item.text }}</view>
		</view>
		<view class="center">
			
			<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
				<swiper-item class="tab-content" v-for="(item, index) in navList" :key="index">
					<!-- <view class="swiper-item"> -->
						<scroll-view class="list-scroll-content" scroll-y>
							<view style="height: 80upx;"></view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">注册成为VIP</view>
									<view class="time">2020-06-28 14:25:02</view>
								</view>
								<view class="price">+100.00</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">注册成为VIP</view>
									<view class="time">2020-06-28 14:25:02</view>
								</view>
								<view class="price">+100.00</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">注册成为VIP</view>
									<view class="time">2020-06-28 14:25:02</view>
								</view>
								<view class="price">+100.00</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">注册成为VIP</view>
									<view class="time">2020-06-28 14:25:02</view>
								</view>
								<view class="price">+100.00</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">注册成为VIP</view>
									<view class="time">2020-06-28 14:25:02</view>
								</view>
								<view class="price">+100.00</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">开户129套餐</view>
									<view class="time">2020-06-28 14:25:02</view>
								</view>
								<view class="price">+400.00</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">开户159套餐</view>
									<view class="time">2020-06-28 14:25:02</view>
								</view>
								<view class="price">+600.00</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">开户199套餐</view>
									<view class="time">2020-06-28 14:25:02</view>
								</view>
								<view class="price">+800.00</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">兑换东北珍珠米10斤装五谷稻米...</view>
									<view class="bottom"><view class="time">SH202006281234567899</view></view>
								</view>
								<view class="money">
									<view>-1296</view>
									<view class="time">2020-06-28 14:25:02</view>
								</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">兑换东北珍珠米10斤装五谷稻米兑换东北珍珠米10斤装五谷稻米......</view>
									<view class="time">SH202006281234567899</view>
								</view>
								<view class="money">
									<view>-1296</view>
									<view class="time">2020-06-28 14:25:02</view>
								</view>
							</view>
						</scroll-view>
					<!-- </view> -->
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabIndex: 0,
			navList: [
				{
					text: '全部',
					state: '0'
				},
				{
					text: '收入',
					state: '1'
				},
				{
					text: '兑换',
					state: '3'
				}
			]
		};
	},
	methods: {
		//swiper 切换
		changeTab(e) {
			this.tabClick(e.target.current);
		},
		//顶部tab点击
		tabClick(index) {
			this.change(index);
		},
		change(type) {
			this.tabIndex = type;
			
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	height: 100%;
	background-color: #fff;
}
.consume{
	height: 100%;
}
.consume-item {
	background-color: #fff;
	/* margin-top: 20upx; */
	display: flex;
	justify-content: space-between;
	padding: 28upx 22upx 22upx;
	border-bottom: 1px solid #f4f4f4;
}
.num {
	color: #666;
	width: 450upx;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow: hidden;
}
.time {
	color: #b6b6b6;
	font-size: 24upx;
	font-weight: 500;
}
.price {
	display: flex;
	align-items: center;
	color: #ff594d;
}
.money {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	color: #ff594d;
}
.consume-img {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 296upx;
}
.img {
	width: 522upx;
	height: 350upx;
}
.text {
	color: #333;
	font-weight: bold;
}

.navbar {
	display: flex;
	height: 40px;
	padding: 0 5px;
	background: #fff;
	box-shadow: 0px 4upx 8upx #dcdfe6;
	position: fixed;
	width: 100%;
	z-index: 200;
	.nav-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: 15px;
		color: #303133;
		position: relative;
		&.current {
			color: #ff594d;
			&:after {
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				width: 50px;
				height: 0;
				/* border-bottom: 2px solid #fa436a; */
				border-bottom: 2px solid #ff594d;
			}
		}
	}
}
.center {
	width: 100%;
	height: 100%;
	z-index: 120;
	// padding-top: 80upx;
	position: absolute;
}
.swiper-box {
	height: 100%;
}
.list-scroll-content {
	height: 100%;
}
</style>
