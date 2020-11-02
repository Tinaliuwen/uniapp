<template>
	<view class="container">
		<view class="top">
			<image :src="image" mode="widthFix" class="image"></image>
			
			<view class="right">
				<view class="title">{{title}}</view>
				
				<view class="bum">
					<view class="time">{{createtime}}</view>
					<!-- <view class="eyes">
						<image src="/static/img/points/collect.png" mode=""></image>
						{{red}}
					</view> -->
				</view>
			</view>
		</view>
		
		<view class="content">
			<view v-html="content"></view>
		</view>
	</view>
</template>

<script>
	import service from '@/store/service.js';
	export default {
		components: {
			
		},
		data() {
			return {
				id:'',
				red:0,
				createtime:'',
				image:'',
				title:'',
				content:'',
			}
        },
		onLoad:function(e){
			var self = this;
			self.id = e.id;
			self.$http.get(service.api.service.details,{
				'id':e.id
			}).then(function(res) {
				if(res.code == 1){
					res = res.data;
					self.red = res.visits;
					self.createtime = res.createtime;
					self.image = res.logo;
					self.title = res.title;
					self.content = res.content;
					//var content = res.content.split('<img');
					//console.log(content)
					
				}else{
					uni.showToast({
						icon: 'none',
						title: res.info
					});
				}
			});
		},
        methods: {
			/* 顶部导航栏操作 */
			onClick(e){
				if(e.type == 0){//返回上一页
					uni.navigateBack({
						delta:1
					});
				}else if(e.type == 2){ //分享
					this.$refs.share.toggleMask();
				}
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: #f2f2f2;
	}
	.top{
		background: #FFFFFF;
		.image{
			width: 100%;
			height: 400upx;
		}
		.right{
			margin: 0 40upx;
			padding-bottom: 10upx;
			width: calc(100% - 80upx);
			.title{
				font-weight: bold;
				font-size: 34upx;
				line-height: 50upx;
				overflow:hidden; 
				text-overflow:ellipsis;
				display:-webkit-box; 
				-webkit-box-orient:vertical;
				-webkit-line-clamp:2; 
			}
			.bum{
				color: #888888;
				display: flex;
				font-size: 28upx;
				line-height: 60upx;
				margin-top: 10upx;
				.time{
					width: 60%;
				}
				.eyes{
					width: 40%;
					display: flex;
					text-align: right;
					image{
						width: 60upx;
						height: 60upx;
					}
				}
			}
		}
	}
	.content{
		margin-top: 20upx;
		/* text-indent: 80upx; */
		background: #FFFFFF;
		padding: 20upx 30upx 50upx;
	}
</style>
