<template>
	<view class="my-team">
		<view class="centers">
			合伙人
		</view>
		<view class="center">
			<swiper :current="0" class="swiper-box" duration="300" @change="changeTab">
				<swiper-item class="tab-content">
					<view class="swiper-item" v-for="(item, index) in teamList" :key="index">
						<scroll-view class="list-scroll-content" scroll-y="true">
							<!-- <view style="height: 112upx;"></view> -->
							<view class="consume-item">
								<view class="item-left">
									<image style="width: 76upx;height: 76upx;margin-right: 20upx;" :src="item.avatar == '' ? '/static/face.png' : item.avatar" mode=""></image>
									<view class="consume-left">
										<view class="item-text">
											<view class="number">
												{{item.nickname}}
												<text>账号：{{item.account}}</text>
											</view>
											
											<!-- <view class="tag">
												导购
											</view> -->
										</view>
										<view class="time"><!-- 代理级别： -->{{item.level_name}}<!-- 注册时间：{{item.create_at}} --></view>
									</view>
								</view>
								<view class="price">{{item.achievement}}</view>
							</view>
						</scroll-view>
					</view>
					
					<uni-load-more :status="status"></uni-load-more>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import service from '@/store/service.js';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';

export default {
	components: {
		uniLoadMore
	},
	data() {
		return {
			teamList: [],
			isLoading: false,
			scroll: false,
			status: 0,
			pages: 1,
			limit: 5,
			page: 0,
			out: 0,
		};
	},
	onLoad:function(e){
		var self = this;
		self.mid = e.id;
		self.loadHistory();
	},
	methods: {
		loadHistory() {
			var self = this;
			if (self.isLoading) {
				return;
			}
			if (self.page < self.pages) {
				self.out = 0;
				self.isLoading = true;
				self.scroll = false;
				self.status = 1;
				var page = self.page + 1;
				self.$http.get(service.api.service.team, {
					mid: self.mid
				}).then(function(res) {
					if (res.code == 1) {
						var list = res.data;
						for(let i = 0;i < list.length;i++){
							//将数据逐条写入数组
							self.teamList.push(list[i]);
						}
						
						self.pages = res.data.last_page;
						self.page = page;
						self.scroll = true;
						self.isLoading = false;
						self.out = 1;
						
						if(res.data.total == 0){
							self.status = 3;
						}else if(self.page == self.pages){
							self.status = 2;
						}else{
							self.status = 0;
						}
					}else{
						uni.showToast({
							icon: 'none',
							title: res.info
						});
						self.status = 2;
					}
				});
			}else{
				self.status = 2;
			}
		},
		jump(url){
			uni.navigateTo({
				url:url
			})
		},
		changeTab(e) {
			this.tabClick(e.target.current);
		},
		//顶部tab点击
		tabClick(index) {
			this.change(index);
		},
		change(type) {
			this.tabIndex = type;
		},
		tapTab(index, id) {
			this.tabid = id;
			if (this.tabIndex == index) {
				this.isClickChange = true;
				this.tabIndex = index;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.bg-img {
	position: relative;
	width: 100%;
	height: 350upx;
	background: url(../../static/user/team.png) no-repeat;
	background-size: 100% 100%;
}
.bg {
	display: flex;
	padding: 20upx 30upx 0;
}
.icon {
	width: 105upx;
	height: 105upx;
	margin: 25upx 20upx 0 25upx;
}
.centers{
	margin: 0 0upx;
	padding: 20upx;
	font-size: 34upx;
	font-weight: bold;
	background: #FFFFFF;
	border-bottom: 2upx solid #f4f4f4;
}
.text {
	width: calc(100% - 170upx);
	margin-left: 20upx;
	margin-top: 30upx;
}
.name {
	font-weight: bold;
	color: #fff;
	font-size: 30upx;
	text{
		margin-left: 30upx;
		height: 50upx;
		font-size: 26upx;
		padding: 4upx 20upx;
		line-height: 50upx;
		background: #ffc000;
		border-radius: 26upx;
	}
}
.grade {
	color: #FFFFFF;
	font-size: 26upx;
}
.order-item {
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.order-text {
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #fff;
	margin-top: 30upx;
}
.num {
	font-size: 36upx;
	font-weight: bold;
}
.order {
	font-size: 24upx;
}
/* .consume-item:nth-last-child(1) {
	border-bottom: none;
} */
.consume-item {
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	padding: 28upx 22upx 20upx;
	margin: 0 0upx;
	height: 80upx;
	border-radius: 10upx;
	border-bottom: 2upx solid #F4F4F4;
}
.item-left{
	display: flex;
}
.item-text{
	display: flex;
	align-items: center;
}
.number{
	font-weight: bold;
	font-size:30upx;
	color: #333;
	text{
		font-weight: 100;
		font-size: 24upx;
		padding-left: 20upx;
		color: #666;
	}
}
.tag{
	border: 1px solid #FFB463;
	border-radius:17upx;
	width: 86upx;
	height: 34upx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #FFAF62;
	font-size: 22upx;
	margin-left: 20upx;
}
.time {
	color: #999;
	font-size: 24upx;
	font-weight: 500;
}
.price {
	display: flex;
	align-items: center;
	color: #333;
	font-size: 26upx;
	color: #5670fe;
	height: 46upx;
	margin: 20upx 0;
	padding: 0 20upx;
	border-radius: 24upx;
	border: 2upx solid #5670fe;
}
.money {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	color: #ff594d;
}
.navbar {
	background-color: #f3f3f3;
	display: flex;
	// height: 56px;
	// padding: 0 5px;
	justify-content: space-between;
	// box-shadow: 0px 4upx 8upx #dcdfe6;
	position: relative;
	// width: 100%;
	z-index: 200;
	padding-bottom: 28upx;
	// height: 112upx;
	// width: 100upx;
	.nav-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: 15px;
		color: #303133;
		position: relative;
		border-radius: 28upx;
		margin: 0 80upx;
		&.current {
			color: #fff;
			background: linear-gradient(90deg, rgba(233, 144, 64, 1), rgba(255, 127, 77, 1));
			&:after {
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				width: 50px;
				height: 0;
				/* border-bottom: 2px solid #fa436a; */
				// border-bottom: 2px solid #ff594d;
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
