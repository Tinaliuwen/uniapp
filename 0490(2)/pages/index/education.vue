<template>
    <div class="container">
		<view class="center">
			<view class="list goods-list">
				<view class="offer-li" v-for="(item, index) in messageList" :key="index" @click="$jump('/pages/index/message?id='+item.id)" v-if="tabIndex == 0">
					<view class="image">
						<image :src="item.logo" mode="aspectFill"></image>
					</view>
					
					<view class="information">
						<view class="title clamp">{{item.title}}</view>
						<view class="content clamp">{{item.abstract}}</view>
						<view class="time clamp">{{item.createtime}}</view>
					</view>
				</view>
			</view>
			
			<uni-load-more :status="status"></uni-load-more>
		</view>
    </div>
</template>

<script>
	import service from '@/store/service.js';
	import navbarNav from "@/components/uni-navbar.vue";
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
    export default { 
		components:{
			uniLoadMore,
			uniIcons,
			navbarNav,
		},
        data() {
            return {
				tabIndex: 0,
				messageList:[],
				isLoading:false,
				scroll:false,
				status:0,
				limit:15,
				pages:1,
				page:0,
				out:1,
				url:'',
			}
        },
		onLoad:function(e){
			this.loadHistory();
		},
		onReachBottom() {
			this.loadHistory();
		},
		methods:{
			//加载历史数据
			loadHistory(e){
				var self = this;
				if(self.isLoading){
					return ;
				}
				if(self.page < self.pages){
					self.out = 0;
					self.isLoading = true;
					self.scroll = false;
					self.status = 1;
					var page = self.page+1;
					self.$http.get(service.api.service.education,{
						'page':page,
						'limit':self.limit,
						'keywords':self.keywords,
					}).then(function(res) {
						if (res.code == 1) {
							var list = res.data;
							for(let i = 0;i < list.length;i++){
								//将数据逐条写入数组
								self.messageList.push(list[i]);
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
						}
					});
				}else{
					self.status = 2;
				}
			},
		}
    }
</script>

<style lang='scss' scoped>
	page{
		background: #F2F2F2;
	}
	.container{
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		flex: 1; 
	}
	
	.swiper-box{
		height: 100%;
	}
	.list-scroll-content{
		height: 100%;
	}
	.center{
		width: 100%;
		z-index: 120;
		position: absolute;
	}
	.center{
		width: 100%;
		.li,.offer-li{
			display: flex;
			margin:  20upx 3% 0;
			padding: 10upx 10upx;
			background: #FFFFFF;
			border-radius: 20upx;
			border-bottom: 2upx solid #F8F8F8;
			.icon{
				width: 60upx;
				height: 210upx;
				image{
					width: 40upx;
					height: 40upx;
					margin: 85upx 0;
				}
			}
			.image{
				width: 210upx;
				height: 210upx;
				image{
					width: 100%;
					height: 100%;
					opacity: 1;
				}
			}
			.information{
				width: calc(100% - 210upx);
				.title{
					font-size: 28upx;
					color: #303133;
					height: 70upx;
					line-height: 40upx;
					padding: 10upx;
					padding-right: 0;
				}
				.price-box{
					padding: 0 10upx;
					align-items: center;
					justify-content: space-between;
					.price{
						color: #999999;
						padding: 0 6upx;
						font-size: 24upx;
						line-height: 34upx;
						display: flex;
						text{
							/* font-weight: bold; */
							font-size: 26upx;
							color: #ff0000;
						}
						.chumb{
							max-width: calc(100% - 120upx);
							display: block;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
					}
				}
				
				.btn{
					float: right;
					width: 160upx;
					color: #FFFFFF;
					font-size: 24upx;
					transform:scale(0.9);
					margin-right: 10upx;
					text-align: center;
					line-height: 56upx;
					background: #4e0745;
					margin-top: -54upx;
					border-radius: 30upx;
				}
				.clamp{
					overflow:hidden; 
					text-overflow:ellipsis;
					display:-webkit-box; 
					-webkit-box-orient:vertical;
					-webkit-line-clamp:2; 
				}
			}
			/* height: ; */
		}
		.offer-li{
			width: calc(100% - 40upx);
			margin: 0upx 0% 0;
			border-radius: 0upx;
			padding: 20upx;
			.content,.time{
				color: #999999;
				padding: 0 6upx;
				font-size: 26upx;
				line-height: 34upx;
				height: 70upx;
			}
			.time{
				margin-top: 20upx;
				height: 30upx;
			}
			.information{
				width: calc(100% - 210upx);
				.price-box{
					.price{
						display: block;
						line-height: 40upx;
						font-size: 28upx;
					}
				}
			}
		}
	}
</style>