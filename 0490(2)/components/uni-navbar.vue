<template>
	<view :class="'uni-navbar ' + [position == 'fixed' ? 'padd' : '']"  :style="{
		top:top,position:position
	 }">
		<scroll-view ref="tabbar1" id="tab-bar" class="tab-bar" 
			:scroll="false" :scroll-x="true" :show-scrollbar="false"
			:style="{ background:style.background, height:style.height ,width:width }">
			<view style="flex-direction: column;">
				<view style="flex-direction: row;">
					<view class="uni-tab-item" v-for="(tab,index) in navbarList" 
						:key="tab.id" :id="tab.id" :ref="'tabitem'+index" 
						:data-id="index" :data-current="index" @click="onClick(index, tab)" 
						:style="{
							width:tabwidth,
							'line-height' : style.line,
							'margin' : [margin ? margin : style.margin],
							'padding' : style.padding,
							'font-size' : style.size,
							'color' : [tabIndex == index ? color ? color : style.active : style.color],
							'border-bottom' : '4upx solid ' + [tabIndex == index ? style.active : style.background],
						}">
						<text class="uni-tab-item-title">{{tab.title}}</text><!-- :class="tabIndex == index ? 'uni-tab-item-title-active' : ''" -->
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import tabbar from '@/store/tabbar.js';
	export default {
		name: 'UniNavbar',
		props: {
			tabIndex:{//选择栏下标
				type: Number,
				default: 0
			},
			position:{//是否固定定位
				type: String,
				default: 'fixed'
			},
			top:{//距离顶部间距
				type: String,
				default: '88upx'
			},
			tabwidth:{//每一块的宽度
				type: String,
				default: ''
			},
			color:{//选中栏颜色
				type: String,
				default: ''
			},
			margin:{//外边距
				type: String,
				default: ''
			},
			navlist: {
				type: Array,
				default () {
					return [
						
					]
				}
			},
		},
		data() {
			return {
				navbarList:[],
				style:[],
				width:0,
			}
		},
		created() {
			this.navbarList = this.navlist;
			this.style = {
				background:'#ffffff',
				color:'#999999',
				active:'#4e0745',
				height:'86upx',
				line:'80upx',
				margin:'0 10upx',
				padding:'0 8upx',
				size:'30upx',
			};
			this.width = uni.getSystemInfoSync().windowWidth + 'px';
		},
		methods: {
			onClick(index,tab) {
				let item = {
					type:index,
					item:tab
				}
				this.$emit('onNavbar',item);
			}
		}
	}
</script>

<style>
	.uni-navbar {
		flex: 1;
		position: relative;
		flex-direction: column;
		overflow: hidden;
		z-index: 800;
	}
	.padd{
		padding-top: var(--status-bar-height);
	}
	.tab-bar {
		flex-direction: row;
		flex-direction: column;
		flex-direction: row;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	.tab-bar ::-webkit-scrollbar {
	    display: none;  
	    width: 0 !important;  
	    height: 0 !important;  
	    -webkit-appearance: none;  
	    background: transparent;  
	}
	/* #endif */
	
	
	.uni-tab-item {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		flex-wrap: nowrap;
		text-align: center;
	}
	
	.uni-tab-item-title {
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
	}
</style>
