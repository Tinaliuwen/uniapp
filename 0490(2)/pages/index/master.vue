<template>
    <view class="container">
		<view style="height: 30upx;"></view>
			
		<view class="top">
			<image :src="image" mode="" class="top-img"></image>
			<view class="top-text" v-html="content">
			</view>
		</view>
		
		<view class="navbar">
			<view class="head">文章</view>
		</view>
		
		<view class="list">
			<view class="li" v-for="(item,index) in articleList" :key="index" @click="$jump('/pages/index/article?id=' + item.id)">
				<image :src="item.image" mode="" class="image"></image>
				<view class="right">
					<view class="title clamp">{{item.title}}</view>
					<view class="time">{{item.createtime}}</view>
				</view>
			</view>
			
			<uni-load-more :status="status"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import service from '@/store/service.js';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
    export default { 
		components:{
			uniLoadMore,
		},
        data() {
            return {
				id:'',
				image:'',
				content:'',
				articleList:[],
				isLoading:false,
				scroll:false,
				status:0,
				limit:15,
				pages:1,
				page:0,
				out:1,
			}
        },
		onLoad:function(e){
			var self = this;
			self.id = e.id;
			self.$http.get(service.api.index.bigitem,{
				id:e.id
			}).then(function(res) {//获取大咖详情
				if (res.code == 1) {
					res = res.data;
					self.image = res.image;
					var content = '';
					content = self.update(res.content,'\r\n','');
					content = self.update(content,'pre','div');
					content = self.update(content,'code','div');
					self.content = content;
				}else{
					uni.showToast({
						icon: 'none',
						title: res.info
					});
				}
			});
			self.loadHistory();
		},
		onReachBottom() {
			this.loadHistory();
		},
		methods:{
			update(content,text,replace){
				var array = content.split(text);
				var content = '';
				for(var i = 0;i< array.length;i++){
					if(i == 0){
						content += array[i]
					}else{
						content += replace + array[i];
					}
				}
				return content;
			},
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
					self.$http.get(service.api.index.article,{
						'page':page,
						'limit':self.limit,
						'bigshot_id':self.id,
					}).then(function(res) {
						if (res.code == 1) {
							var list = res.data.data;
							console.log(list)
							for(let i = 0;i < list.length;i++){
								//将数据逐条写入数组
								self.articleList.push(list[i]);
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
		},
    }
</script>

<style lang="scss">
	.top{
		display: flex;
		margin: 30upx;
		margin-top: 0;
		padding: 30upx;
		border-radius: 40upx;
		box-shadow:  0 0 20upx rgba(0, 0, 0, .4);
		.top-img{
			width: 180upx;
			height: 180upx;
			border-radius: 90upx;
		}
		.top-text{
			text-indent: 60upx;
			padding-left: 30upx;
			width: calc(100% - 210upx);
			font-size: 30upx;
			color: #323232;
		}
	}
	.navbar{
		padding: 10upx 0;
		border-bottom: 2upx solid #F2F2F2;
		.head{
			width: 140upx;
			margin: 0 20upx;
			font-weight: bold;
			text-align: center;
			line-height: 70upx;
			border-bottom: 6upx solid #7f3e74;
		}
	}
	.li{
		display: flex;
		padding: 20upx;
		border-bottom: 2upx solid #F2F2F2;
		.image{
			width: 250upx;
			height: 170upx;
		}
		.right{
			padding: 10upx;
			padding-right: 0;
			width: calc(100% - 270upx);
			.title{
				height: 100upx;
				font-size: 32upx;
				line-height: 50upx;
			}
			.time{
				color: #888888;
				font-size: 30upx;
			}
		}
	}
	.clamp{
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; 
	}
</style>
