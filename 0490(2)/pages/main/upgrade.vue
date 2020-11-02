<template>
  <view class="container">
    <view class="header">
      <image src="/static/user/header.png" mode=""></image>
    </view>
    <!-- 市级代理权益 -->
    <view class="section" v-for="(item,index) in goodsCate" :key="index">
      <view class="top">
        <view class="title u-f-ajc">
          <view>{{item.levelname}}代理权益</view> 
        </view>
        <view class="sub-title">开通代理权益，即享{{item.levelname}}服务津贴</view>
      </view>
      <view class="content u-f-jsb" @click="jumper(`/pages/category/commodity?id=${item.id}&type=0&num=0`)">
        <view class="left">
          <image :src="item.logo" mode=""></image>
          <view class="name u-line-clamp">{{item.title}}</view>
        </view>
        <view class="right u-f1 u-f-jsb u-f-column">
          <view class="price">{{item.price_market}}</view>
          <view class="bag">{{item.levelname}}大礼包</view>
          <view class="btn">查看详情</view>
        </view>
      </view>
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
				integral: 1000,
				goodsCate:[],
				status:0,
			};
		},
		onLoad: function() {
			this.getGoodsCate()
		},
		methods: {
			getGoodsCate() {
				var self = this;
				self.$http.get(service.api.main.goodsList, {
					type:1
				}).then(function(res) {
					console.log(res);
			
					var list = res.data;
					self.goodsCate = list;
				});
			},
			jumper(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>


<style lang="scss" scoped>
	page{
		background:#ff594d;
	}
  .container{
    padding-bottom: 30rpx;
    // background-color: $uni-color-base;
    background-color: #ff594d;
    .header{
      image{
        width: 100%;
        height: 575rpx;
      }
    }
    
    .section{
      background-color: #ff594d;
      
      .top{
        .title{
          position: relative;
          width: 96%;
          height: 70rpx;

          view{
            position: relative;
            font-size: 36rpx;
            color: #FFFDD5;
            // text-shadow:0px 2px 6px rgba(212,28,21,1);
            
            &:before,&:after{
              position: absolute;
              top: 24rpx;
              content: '';
              display: block;
              width: 200rpx;
              height: 6rpx;
              border-radius: 3rpx;
            }
            
            &:before{
              left: -210rpx;
              background: linear-gradient(right,#FFFDD5,rgba(0,0,0,0));
            }
            
            &:after{
              right: -210rpx;
              background: linear-gradient(left,#FFFDD5,rgba(0,0,0,0)) ;
            }
          }
          
        }
        
        .sub-title{
          text-align: center;
          font-size: 24rpx;
          color:rgba(255,253,195,1);
        }
      }
      
      .content{
        box-sizing: border-box;
        width: 710rpx;
        height: 400rpx;
        background-color: $uni-text-color-inverse;
        padding: 20rpx;
        margin: 40rpx auto;
        border-radius: 20rpx;
        
        .left{
          width: 350rpx;
          
          image{
            width: 350rpx;
            height: 243rpx;
          }
          
          .name{
            font-size: 24rpx;
            color: $uni-text-color;
            font-weight: bold;
          }
        }
        
        .right{
          .price{
            font-size: 66rpx;
            font-weight: bold;
            color: #ff594d;
          }
          .bag{
            font-size: 32rpx;
            font-weight: bold;
            color: $uni-text-color;
          }
          .btn{
            width: 230rpx;
            height: 76rpx;
            line-height: 76rpx;
            text-align: center;
            border-radius: 38rpx;
            margin-top: 60rpx;
            color: $uni-text-color-inverse;
            // background:linear-gradient(-90deg,rgba(253,60,46,1),rgba(254,98,87,1));
            background:#ff594d;
          }
        }
      }
    }
  }
</style>
