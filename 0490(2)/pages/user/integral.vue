<template>
	<view class="mygrains">
		<view class="head">
			<view class="header"></view>
			<view class="header-center">
				<view class="center-top">
					<text>账户余额</text>
					<text>{{ integral }}</text>
				</view>
			</view>
			
			<view class="header-bottom">
				<!-- <view class="bom" @click="$jump('/pages/user/operation?type=1')">转让余额</view> -->
				<view class="bom" @click="$jump('/pages/user/operation?type=2')">提现余额</view>
				<!-- <view class="bom" @click="$jump('/pages/user/operation?type=3')">充值余额</view> -->
			</view>
		</view>
		
		<view class="title">余额明细</view>
		
		<view class="center">
			<view class="consume-item" v-for="(item, index) in alreadyList" :key="index"  @click="vip_tap(item.id,item.type)">
				<view class="consume-left">
					<view class="num" v-for="(text, idx) in item.list" :key="idx">{{text}}</view>
					<view style="color: #ff594d;" v-if="item.status == 1">待结算</view>
					<view style="color: #ff594d;" v-if="item.status == 2">已结算</view>
				</view>
				<view class="money">
					<view style="height: 100%;"></view>
					
					<view class="price"><block v-if="item.num > 0">+</block>{{item.money}}</view>
					<view class="time">{{item.createtime}}</view>
				</view>
			</view>
			
			<view style="background: #F2F2F2;">
				<uni-load-more :status="status"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
import service from '@/store/service.js';
import uicons from '@/components/uni-icons/uni-icons.vue';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';

export default {
	components: { uicons, uniLoadMore },
	data() {
		return {
			integral:'0.00',
			tabIndex: 0,
			isClickChange: false,
			tabid: 1,
			rice: '',
			alreadyList: [],
			isLoading: false,
			scroll: false,
			status: 0,
			status_:0,
			pages: 1,
			limit: 5,
			page: 0,
			out: 0,
			appurl: '',
			navList: [
				{
					text: '待结算',
					state: '0'
				},
				{
					text: '预结算',
					state: '1'
				},
				{
					text: '已结算',
					state: '2'
				}
			]
		};
	},
	onShow: function() {
		var self = this;
		self.$http .post(service.api.main.user).then(function(res) {
			if(res.code == 1){
				res = res.data;
				self.integral = res.credit2;
			}else{
				self.$api.msg(res.msg);
			}
		});
		//this.getRice();
		self.change(0);
	},
	
	methods: {
		jump(url) {
			uni.navigateTo({
				url: url
			});
		},
		onReachBottom() {
			// console.log(123);
			this.loadHistory();
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
			if (type == 0) {
				this.appurl = '';
			} else if (type == 1) {
				this.appurl = '';
			} else {
				this.appurl = service.api.rice.already;
			}
			this.alreadyList = [];
			this.isLoading = false;
			this.scroll = false;
			this.pages = 1;
			this.page = 0;
			this.loadHistory();
		},
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
				self.$http.get(service.api.service.integral, {
					page: page,
					num: self.limit,
					type: 1
				}).then(function(res) {
					if (res.code == 1) {
						var list = res.data.data;
						for(let i = 0;i < list.length;i++){
							//将数据逐条写入数组
							//list[i].remark = '鞍山风景东,方方式方法会改,掉的说法的健康,共和党开发规划';
							//list[i].num = -312.64545;
							list[i].list = self.update(list[i].remark,',');
							self.alreadyList.push(list[i]);
						}
						
						self.pages = res.data.last_page;
						self.page = page;
						self.scroll = true;
						self.isLoading = false;
						self.out = 1;
						
						if(res.data.total == 0){
							self.status = 3;
							console.log(self.status,123);
						}else if(self.page == self.pages){
							self.status = 2;
							console.log(self.status,123);
						}else{
							self.status = 0;
							console.log(self.status,123);
						}
					}else{
						uni.showToast({
							icon: 'none',
							title: res.info
						});
					}
				});
			}else{
				self.status = 2;
			}
		},
		vip_tap(id,type) {
			console.log(id,type);
			uni.navigateTo({
				url: '/pages/user/user_ent?id='+ id + '&type=' + type
			})
		},
		update(content,text,replace){ 
			var array = content.split(text);
			// console.log(content);
			return array;
			/* var content = '';
			for(var i = 0;i< array.length;i++){
				if(i == 0){
					content += array[i]
				}else{
					content += replace + array[i];
				}
			}
			return content; */
		},
		// tapTab(index, id) {
		// 	this.tabid = id;
		// 	if (this.tabIndex == index) {
		// 		this.isClickChange = true;
		// 		this.tabIndex = index;
		// 	}
		// },
		// 米粒数量
		getRice() {
			var self = this;
			self.$http.get(service.api.rice.rice, {}).then(function(res) {
				var list = res.data;
				// console.log(list);
				self.rice = list;
			});
		},
		// 已结算
		getAlready() {
			var self = this;
			self.$http.get(service.api.rice.already, {}).then(function(res) {
				var list = res.data;
				// console.log(list);
				// self.rice = list;
				self.alreadyList = list;
			});
		},
	}
};
</script>

<style lang="less" scoped>
.page .active {
	color: #ff3c40;
}
.head{}
.header {
	position: relative;
	width: 100%;
	height: 368upx;
	margin-bottom:30upx;
	background: url(../../static/user/upgrade.png) no-repeat;
	background-size: 100% 100%;
}

.header-center,.header-bottom {
	position: absolute;
	display: flex;
	flex-direction: column;
	left: 0;
	right: 0;
	top: 48upx;
	width: 710upx;
	/* height: 240upx; */
	margin: 0 auto;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0upx 0upx 14upx 0upx rgba(255, 177, 174, 0.1);
	border-radius: 10px;
	.center-top {
		display: flex;
		flex-direction: column;
		text-align: center;
		padding: 20px 0;
		text:first-child {
			font-size: 32upx;
			/* margin-top: 48upx; */
		}

		text:last-child {
			font-size: 66upx;
		}
	}
	.center-bottom {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 20upx 0;
		// height: 90upx;
		border-top: 1px solid #f3f3f3;
		text {
			font-size: 32upx;
			font-weight: bold;
			color: #e98f3f;
		}
		view {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 140upx;
			height: 44upx;
			margin: 0 22upx 0 136upx;
			border: 1px solid #ff594d;
			color: #d16f19;
			border-radius: 20upx;
			text {
				font-size: 24upx;
				font-weight: bold;
			}
			image {
				width: 10upx;
				height: 18upx;
				margin-left: 4upx;
			}
		}
	}
}
.header-bottom {
	top: 290upx;
	.bom{
		color: #e02328;
		font-size: 30upx;
		font-weight: bold;
		text-align: center;
		line-height: 90upx;
		border-bottom: 2upx solid #F2F2F2;
	}
}
.consume-item {
	padding: 28upx 16upx 22upx;
	border-bottom: 1px solid #f4f4f4;
	display: flex;
	min-height: 80upx;
	justify-content: space-between;
}
.consume-item:nth-last-child(1) {
	border-bottom: none;
}
.consume-left {
	display: flex;
	// justify-content: space-between;
	flex-direction: column;
	justify-content: space-around;
	width: 63%;
	margin-right: 2%;
}
.num {
	color: #333;
	// width: 450upx;
}
.time {
	color: #666666;
	font-size: 24upx;
	font-weight: 500;
	line-height: 36upx;
	text-align: right;
    text-overflow:ellipsis;
    white-space:nowrap;
}
.price {
	line-height: 40upx;
	color: #333;
	font-weight: bold;
	display: flex;
	margin-top: -80upx;
	justify-content: flex-end;
}
.money {
	/* display: flex; */
	flex-direction: column;

	width: 37%;
	// align-items: right;
	// justify-content: space-between;
	color: #ff594d;
	// margin-top: 20upx;
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
	.title{
		font-size: 32upx;
		font-weight: bold;
		margin-left: 20upx;
		line-height: 70upx;
	}
.center {
	width: calc(100% - 40upx);
	// height: auto;
	z-index: 120;
	// padding-top: 80upx;
	// position: absolute;
	margin: 0 20upx;
	// padding-bottom: 10rpx;
	// margin-bottom: 80upx; 
	background-color: #fff;
	border-radius: 20upx;
}
.swiper-box {
	height: 100%;
}
.list-scroll-content {
	height: 100%;
}
</style>
