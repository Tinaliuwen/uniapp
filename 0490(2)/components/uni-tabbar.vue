<template>
	<view >
		<view class="footer" :style="{
			background:style.background,
			'border-top':style.border,
			height:style.height
		}">
			
			<view class="footer_item" :style="{width:width+'%'}" v-for="(item,index) in tabBarList" :key="index">
				<view class="items" @tap="jump(item.pages)" :style="{
					background:style.background
				}">
					<image :src="index == status ? item.selected : item.iconPath" 
						:style="{
							width:[item.big == 0 ? style.imgWidth : style.bigWidth],
							height:[item.big == 0 ? style.imgWidth : style.bigWidth],
							'margin-top':[item.big == 0 ? style.imgTop : style.bigTop],
							'border-radius':[item.big == 0 ? '0upx' : style.bigRadius],
							'background':style.bigBack,
						}" mode="" :class="item.big == 0 ? '' : 'big'"></image>
						
					<view :style="{
							width:[item.big == 0 ? style.imgWidth : style.bigWidth],
							height:[item.big == 0 ? style.imgWidth : style.bigWidth],
							'margin-top':[item.big == 0 ? style.imgTop : style.bigmar],
							'border-radius':[item.big == 0 ? '0upx' : style.bigRadius],
							'background':style.bigBack,
						}" class="big-back" :class="item.big == 0 ? '' : 'big'" v-if="item.big == 1"></view>
						
					<view class="item-text" :style="{
						color : [index == status ? item.selectColor : item.color],
						'font-size' : style.fontSize
					}">
						<view :class="item.big == 0 ? '' : 'big-text'">{{item.text}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view :style="{height:height}"></view>
	</view>
</template>

<script>
	import tabbar from '@/store/tabbar.js';
	export default {
		name: "UniTabbar",
		data() {
			return {
				tabBarList: [],
				style:[],
				width:100
			}
		},
        props: {
			/* 列表下标 */
			type: {
			    type: String
			},
            /* 按钮下标 */
            status: {
                type: String
            },
            /* 底部留空高度 */
            height: {
                type: String,
				default: '110upx'
            },
        },
		created() {
			this.init()
		},
		methods:{
			jump:function(url){
				this.$emit('onTabbar',url);
				uni.switchTab({
					url: url
				});
			},
			init(){
				uni.hideTabBar();
				var list = tabbar.tabbarData[this.type];
				this.style = tabbar.colorData[0];
				this.tabBarList = list
				var num = list.length;
				this.width = 100 / num;
			},
			order(){
			}
		}
	}
</script>

<style>
	.footer{
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 1000;
		position: fixed;
		
	}
	.footer_item{
		float: left;
		text-align: center;
		z-index: 1000;
		position: relative;
	}
	.footer_item image{
		z-index: 950;
		position: relative;
	}
	.footer_item .big{
		padding: 20upx;
		/* box-shadow: 0 -10upx 20upx #666666; */
	}
	.item-text{
		line-height : 40upx;
		margin-top : -10upx;
	}
	.big-text{
		z-index: 1000;
		position: relative;
		margin-top : -30upx;
	}
	.items{
		z-index: 200;
		position: relative;
		
	}
	.big-back{
		z-index: 100;
		margin: 0 auto 10upx;
		position: relative;
		border-top: 4upx solid #666666;
		/* box-shadow: 0 0 20upx #666666; */
	}
</style>
