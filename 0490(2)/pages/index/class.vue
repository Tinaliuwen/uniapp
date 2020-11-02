<template>
	<view class="container">
		<view class="carousel">
			<image :src="image" class="loaded" mode="widthFix"></image>
			<!-- <swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index" v-if="imgList.length > 0">
					<view class="image-wrapper">
						<image :src="item" class="loaded" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper> -->
		</view>
		
		<view class="information">
			<view class="title">
				<text v-if="city != ''">[{{city}}]</text>{{title}}
			</view>
			
			<view class="text">
				类型：{{type}}
			</view>
			
			<view class="text">
				价格：{{price}}
				<view class="btn" @click.stop="$jump('/pages/index/buy?id=' + id)">立即报名</view>
			</view>
			
			<view class="text">
				票数：{{total}}
			</view>
			
			<view class="text">
				地点：{{address}}
			</view>
			
			<view class="text">
				时间：{{time}}
			</view>
		</view>
			
		<view class="guess-section">
			<view class="top" style="border-top: 2upx solid #f2f2f2;">
				活动详情
			</view>
			
			<view class="top">
				<view class="border"></view>
			</view>
			
			<view class="content">
				<view v-html="content"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '@/store/service.js';
	export default{
		data() {
			return {
				id:0,
				imgList:[],
				image:'',
				city:'',
				title:'',
				type:'',
				price:'0.00',
				total:0,
				address:'',
				time:'',
				content:'',
			};
		},
		 onLoad:function(e){
			var self = this;
			self.id = e.id;
			self.$http.get(service.api.index.curritem,{
				'id':e.id
			}).then(function(res) {
				if(res.code == 1){
					var item = res.data
					self.imgList.push(item.image);
					self.image = item.image;
					self.city = item.city;
					self.title = item.title;
					self.price = item.price;
					self.total = item.votes;
					self.address = item.address;
					self.time = item.course_starttime;
					var content = '';
					content = self.update(item.content,'\r\n','');/* <div style="width:100%;height:1px;"></div> */
					content = self.update(content,'pre','div');
					content = self.update(content,'code','div');
					self.content = content;
					self.type = item.typename;
				}else{
					uni.showToast({
						icon: 'none',
						title: res.info
					});
				}
			});
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
				/* array.forEach(item=>{
					content = item +''+ replace;
				}) */
				
			}
		},

	}
</script>
<style lang='scss'>
	page{
		background: #FFFFFF;
	}
	/* 头部轮播图 */
	.carousel {
		/* height: 652upx; */
		position:relative;
		background: #FFFFFF;
		.loaded{
			height: 400upx;
			width: 100%;
		}
		swiper{
			height: 100%;
		}
		.image-wrapper{
			width: 100%;
			height: 100%;
			background: #FFFFFF;
		}
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.information{
		padding: 30upx;
		.title{
			font-size: 32upx;
			font-weight: bold;
			line-height: 60upx;
			text{
				color: #f10b26;
				margin-right: 10upx;
			}
		}
		.text{
			color: #606266;
			font-size: 30upx;
			line-height: 60upx;
			text{
				color: #f10b26;
			}
		}
		.btn{
			float: right;
			width: 180upx;
			color: #FFFFFF;
			font-size: 30upx;
			text-align: center;
			line-height: 60upx;
			background: #7f3e74;
			border-radius: 20upx;
		}
	}
	
	.guess-section{
		background: #FFFFFF;
		.top{
			display: flex;
			align-items: center;
			justify-content: center;
			line-height: 60upx;
			font-size: 30upx;
			font-weight: bold;
			padding: 20upx 0 10upx;
		}
		.border{
			width: 40upx;
			height: 6upx;
			margin-top: -40upx;
			background: #7f3e76;
		}
		.content{
			margin-top: 20upx;
			text-indent: 80upx;
			background: #FFFFFF;
			padding: 20upx 30upx 50upx;
		}
	}
</style>