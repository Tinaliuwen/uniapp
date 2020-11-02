<template>
	<view v-if="show" class="mask" @click="toggleMask" @touchmove.stop.prevent="stopPrevent"
		:style="{backgroundColor: backgroundColor}"
	>
		<view 
			class="mask-content"
			@click.stop.prevent="stopPrevent"
			:style="{transform: transform}"
		>
			<scroll-view class="view-content" scroll-y>
				<view class="share-header">分享到</view>
				
				<view class="share-list">
					<view 
						v-for="(item, index) in shareList" :key="index"
						class="share-item" 
						@click="shareToFriend(item)"
						:style="{'min-width':width}"
					>
						<image :src="item.image" mode=""></image>
						<text>{{item.name}}</text>
					</view>
				</view>
				
				<view class="bottom b-t" @click="toggleMask">取消</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import service from '@/store/service.js';
	export default {
		data() {
			return {
				transform: 'translateY(50vh)',
				timer: 0,
				backgroundColor: 'rgba(0,0,0,0)',
				show: false,
				width:'25%',
				shareList:[],
			};
		},
		props:{
			contentHeight:{
				type: Number,
				default: 400
			},
			//是否是tabbar页面
			hasTabbar:{
				type: Boolean,
				default: false
			},
		},
		created() {
			var list = [{
				type:1,
				name:'微信好友',
				code:'WXSceneSession',
				image:'/static/image/wechat.png',
			},{
				type:0,
				name:'微信朋友圈',
				code:'WXSenceTimeline',
				image:'/static/image/friend.png',
			},{
				type:0,
				name:'微信收藏',
				code:'WXSceneFavorite',
				image:'/static/image/collect.png',
			}];
			if(list.length < 4){
				this.width = (100 / list.length) + '%';
			}else{}
			this.shareList = list;//uni.upx2px(this.contentHeight)
			const height = (210 + 160 * list.length) + 'upx';
			this.config = {
				height: height,
				transform: `translateY(${height})`,
				backgroundColor: 'rgba(0,0,0,.4)',
			}
			this.transform = this.config.transform;
		},
		methods:{
			toggleMask(){
				//防止高频点击
				if(this.timer == 1){
					return;
				}
				this.timer = 1;
				setTimeout(()=>{
					this.timer = 0;
				}, 500)
				
				if(this.show){
					this.transform = this.config.transform;
					this.backgroundColor = 'rgba(0,0,0,0)';
					setTimeout(()=>{
						this.show = false;
						this.hasTabbar && uni.showTabBar();
						this.$emit('onMask');
					}, 200)
					return;
				}
				
				this.show = true;
				//等待mask重绘完成执行
				if(this.hasTabbar){
					uni.hideTabBar({
						success: () => {
							setTimeout(()=>{
								this.backgroundColor = this.config.backgroundColor;
								this.transform = 'translateY(0px)';
							}, 10)
						}
					});
				}else{
					setTimeout(()=>{
						this.backgroundColor = this.config.backgroundColor;
						this.transform = 'translateY(0px)';
					}, 10)
				}
			},
			//防止冒泡和滚动穿透
			stopPrevent(){},
			//分享操作
			shareToFriend(item){
				this.show = false;
				this.$emit('onShare',item);
			},
		}
	}
</script>

<style lang='scss'>
	.mask{
		position:fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display:flex;
		justify-content: center;
		align-items: flex-end;
		z-index: 998;
		transition: .3s;
		.bottom{
			position:absolute;
			left: 0;
			bottom: 0;
			display:flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 90upx;
			background: #fff;
			z-index: 9;
			font-size: 30upx;
			color: #303133;
		}
	}
	
	.mask-content{
		width: 100%;
		/* height: 580upx; */
		transition: .3s;
		background: #fff;
		&.has-bottom{
			padding-bottom: 90upx;
		}
		.view-content{
			height: 100%;
		}
	}
	.share-header{
		height: 110upx;
		font-size: 30upx;
		color: #303133;
		display:flex;
		align-items:center;
		justify-content: center;
		padding-top: 10upx;
		&:before, &:after{
			content: '';
			width: 240upx;
			heighg: 0;
			border-top: 1px solid #606266;
			transform: scaleY(.5);
			margin-right: 30upx;
		}
		 &:after{
			 margin-left: 30upx;
			 margin-right: 0;
		 }
	}
	.share-list{
		display:flex;
		flex-wrap: wrap;
		margin-bottom: 90upx;
	}
	.share-item{
		display:flex;
		/* min-width: 25%; */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 160upx;
		image{
			width: 80upx;
			height: 80upx;
			margin-bottom: 16upx;
		}
		text{
			font-size: 28upx;
			color: #606266;
		}
	}
</style>
