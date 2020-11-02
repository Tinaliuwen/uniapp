<template>
	<view class="withdraw-details">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabIndex === index }" @click="tabClick(index)">{{ item.text }}</view>
		</view>
		<view class="center">
			<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
				<!-- <swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex"> -->
				<swiper-item class="tab-content">
					<scroll-view class="list-scroll-content" scroll-y>
						<!-- <view class="consume"> -->
						<view style="height: 80upx;"></view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现200元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state1">审核中</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现300元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state2">已完成</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现600元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state3">失败了</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现690元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state2">已完成</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现690元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state2">已完成</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现690元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state2">已完成</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现690元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state2">已完成</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现690元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state2">已完成</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现690元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state2">已完成</view>
							</view>
						<!-- </view> -->
					</scroll-view>
				</swiper-item>
				<swiper-item class="tab-content">
					<scroll-view class="list-scroll-content" scroll-y>
						<view style="height: 80upx;"></view>
						<view class="consume">
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现200元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state1">审核中</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现200元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state1">审核中</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现200元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state1">审核中</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现200元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state1">审核中</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现690元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state2">已完成</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="tab-content">
					<scroll-view class="list-scroll-content" scroll-y>
						<view style="height: 80upx;"></view>
						<view class="consume">
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现300元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state2">已完成</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现300元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state2">已完成</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现300元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state2">已完成</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现300元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state2">已完成</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="tab-content">
					<scroll-view class="list-scroll-content" scroll-y>
						<view style="height: 80upx;"></view>
						<view class="consume">
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现600元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state3">失败了</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现600元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state3">失败了</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现600元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state3">失败了</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现600元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state3">失败了</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现600元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state3">失败了</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现600元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state3">失败了</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现600元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state3">失败了</view>
							</view>
							<view class="consume-item">
								<view class="consume-left">
									<view class="num">发起提现600元</view>
									<view class="time">2020-06-22 14:02:26</view>
								</view>
								<view class="state3">失败了</view>
							</view>
						</view>
					</scroll-view>
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
					text: '审核中',
					state: '1'
				},
				{
					text: '已完成',
					state: '2'
				},
				{
					text: '已失败',
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
	}
	
	.swiper-box {
		height: 100%;
		// padding-top: 90upx;
		box-sizing: border-box;
		padding-bottom: 20upx;
		// margin-bottom: 90upx;
	}
	
	uni-swiper-item {
		overflow: auto;
	}
	
.navbar {
	width: 100%;
	display: flex;
	height: 40px;
	// top: 80upx;
	// padding: 0 5px;
	background: #fff;
	box-shadow: 0px 4upx 8upx #dcdfe6;
	position: fixed;
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
				width: 60px;
				height: 0;
				border-bottom: 2px solid #ff594d;
				/* border-bottom: 2px solid #fa436a; */
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
.consume{
	// margin-top: 80upx;
}
.consume-item {
	background-color: #fff;
	// margin-top: 20upx;
	display: flex;
	justify-content: space-between;
	padding: 28upx 22upx 22upx;
	border-bottom: 1px solid #f4f4f4;
}
.num {
	font-weight: bold;
}
.time {
	color: #999;
	font-size: 24upx;
	font-weight: 500;
}
.state1,
.state2,
.state3 {
	display: flex;
	align-items: center;
}
.state1 {
	color: #ff594d;
}
.state2 {
	color: #ff594d;
}
.state3 {
	color: #666666;
}
</style>
