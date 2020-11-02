<template>
	<view class="logistics">
		<view class="expressage">
			<view class="picture">
			   <image src="../../static/kuaidid.png" mode=""></image>
			</view>
			<view class="title">{{title}}</view>
			<view class="num">
				<view>单号：{{order}}</view>
				<!-- <view class="copy" @click="copy">复制</view> -->
			</view>
		</view>
		<view class="address">
			<view class="picture">
				<image class="picture" src="../../static/icon/daohang12.png" mode=""></image>
			</view>
			<view class="num">
				<view>收货地址： {{address}}</view>
			</view>
		</view>
		<!-- 步骤信息 -->
		<view class="info">
			<u-time-line v-if="orderInfo.length!=0">
				<u-time-line-item nodeTop="18"  v-for='(item,index) in orderInfo' :key='index'>
					<template v-slot:node v-if="item.icon">
						<!-- 此处自定义了左边内容，用一个图标替代 -->
						<!-- 有图标 -->
						<view class="u-node" style="background: #F8124A;" v-if="item.icon">
							<!-- 此处为uView的icon组件 -->
							<u-icon name="car-fill" color="#fff" :size="24"></u-icon>
						</view>
						<!-- 此处没有自定义左边的内容，会默认显示一个点 -->
						<!-- 没有图标 -->
						<!-- <view class="" v-else></view> -->
					</template>
					
					<template v-slot:content >
						<!-- 当前活跃状态 -->
						<view v-if="item.state">
							<view class="no">{{item.status}}</view>
							<view class="u-order-desc" style="color: #F8124A;">{{item.context}}</view>
							<view class="u-order-time" style="color: #F8124A;">{{item.time}}</view>
						</view>
						<!-- 过去状态 -->
						<view v-else>
							<view class="u-order-title">{{item.status}}</view>
							<view class="u-order-desc">{{item.context}}</view>
							<view class="u-order-time">{{item.time}}</view>
						</view>
					</template>
					
				</u-time-line-item>
			</u-time-line>
			<view v-else>
				暂无物流信息！
			</view>
		</view>
	</view>
</template>

<script>
	import service from '@/store/service.js';
	export default {
		data() {
			return {
				title:'',
				active:0,
				company:'',
				order:'',
				orderInfo:[],
				address:''
			}
		},
		components: {},
		onLoad(e) {
			this.getExpressQuery(e.oid)
		},
		methods: {
				getExpressQuery(oid){
				this.$http
					.post(service.api.order.expressQuery, {
						order_id: oid
					})
					.then(res => {
						console.log(res);
						const order = res.data.order
						this.address = order.express_province+order.express_city+order.express_area+order.express_address
						this.order = order.express_send_no
						this.title = order.express_company_title
						this.orderInfo = res.data.express_info
						this.orderInfo.map(item=>{
							if(item == this.orderInfo[this.orderInfo.length-1]){
								this.$set(item,'state',true)
							}
							
						})
						
					});
				},
			//复制
			copy() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/uni.css';

	page {
		height: 100%;
		overflow: hidden;

		.logistics {
			height: 100%;
			background-color: #F4F4F4;
			overflow: auto;

			.expressage {
				position: relative;
				width: 690upx;
				height: 152upx;
				background-color: #ffffff;
				border-radius: 14upx;
				margin: 30upx auto;
				box-sizing: border-box;
				.picture{
					position: absolute;
					top: 40upx;
					left: 10upx;
					width: 78upx;
					height: 78upx;
					
					    image{
							width: 90upx;
							height: 78upx;
							border: 1upx solid #EEEEEE;
						}
				}
				.title {
					position: absolute;
					top: 32upx;
					left: 127upx;
					font-size: 29upx;
					color: #F8124A;
					font-weight: bold;
				}

				.num {
					position: absolute;
					top: 85upx;
					left:0upx;
					margin-left: 128upx;
					color: rgba(0,0,0,.9);
					font-size: 28upx;
					display: flex;
					justify-content: space-between;
				}
			}

		}
	}

    .copy{
		position: absolute;
		left: 400upx;
		width:78upx;
		height:42upx;
		text-align: center;
		line-height: 35upx;
		border:1upx solid rgba(181,181,181,1);
		border-radius:6px;
		color: #666666;
	}
	.info {
		margin: 30upx;
		padding: 30upx 45upx;
		background-color: #ffffff;
		border-radius: 14upx;

	}

	//时间轴
	.u-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}

	.u-order-title {
		font-size: 32rpx;
	}
	.no{
		color: #F8124A;
		font-size: 32rpx;
	}

	.u-order-desc {
		color: #656565;
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}

	.u-order-time {
		color: #999999;
		font-size: 26rpx;
	}

	/deep/.u-node {
		position: absolute;
		top: -6px;
	}
	.address{
			position: relative;
			width: 690upx;
			height: 100upx;
			line-height: 50rpx;
			background-color: #ffffff;
			border-radius: 14upx;
			margin: 30upx auto;
			box-sizing: border-box;
			.picture{
				position: absolute;
				top: 14upx;
				left: 15upx;
				width: 48upx;
				height: 48upx;
				
				    image{
						width: 48upx;
						height: 48upx;
					}
			}
			.title {
				position: absolute;
				top: 32upx;
				left: 127upx;
				font-size: 29upx;
				color: #26B614;
				font-weight: bold;
			}
	
			.num {
	            position: absolute;
				top: 26upx;
				left: 96upx;
				color: rgba(0,0,0,.7);
				font-size: 28upx;
			}
		}
</style>
