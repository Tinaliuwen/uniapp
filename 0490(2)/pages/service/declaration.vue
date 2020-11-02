<template>
  <view class="container">
    <view class="section">
      <view class="content u-f-jsb">
        <view class="left">
          <image src="/static/img/up_good.png" mode=""></image>
          <view class="name u-line-clamp">袋鼠妈妈 孕妇护肤品天然纯保湿补水专用化妆品水乳套装</view>
        </view>
        <view class="right u-f1 u-f-jsb u-f-column">
          <view class="price">2980</view>
          <view class="bag">合伙人大礼包</view>
          <view class="btn" @click="declar(1)">为他报单</view>
        </view>
      </view>
    </view>
	
	<view class="popup" v-if="popup == 1">
		<view class="back" @click="shut"></view>
		<view class="box">
			<view class="li">
				<view class="text">填写代理名称</view>
				<input class="input" type="text" placeholder-class="place" v-model="fullname" placeholder="请输入代理昵称"></input>
			</view>
			
			<view class="li">
				<view class="text">填写代理账户</view>
				<input class="input" type="text" placeholder-class="place" v-model="account" placeholder="请输入代理手机号码"></input>
			</view>
			
			<view class="btn">为他报单</view>
			
			<view class="textarea">一旦报单成功积分扣除，请确认对方账户！</view>
		</view>
	</view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				fullname: '',
				account: '',
				popup:0,
			}
		},
		onShow:function(){
			
		},
		methods:{
			shut(){
				this.popup = 0;
			},
			declar(){
				this.popup = 1;
			}
		}
	}
</script>


<style lang="scss" scoped>
  .container{
    padding-bottom: 30rpx;
    // background-color: $uni-color-base;
   /* background-color: #ff594d; */
    .header{
      image{
        width: 750rpx;
        height: 575rpx;
      }
    }
    
    .section{
      /* background-color: #ff594d; */
      
      .top{
        .title{
          position: relative;
          width: 100%;
          height: 70rpx;

          view{
            position: relative;
            font-size: 36rpx;
            color: #FFFDD5;
            // text-shadow:0px 2px 6px rgba(212,28,21,1);
            
            &:before,&:after{
              position: absolute;
              top: 30rpx;
              content: '';
              display: block;
              width: 200rpx;
              height: 6rpx;
              border-radius: 3rpx;
            }
            
            &:before{
              left: -215rpx;
              background: linear-gradient(right,#FFFDD5,rgba(0,0,0,0));
            }
            
            &:after{
              right: -215rpx;
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
        width: 710rpx;
        height: 400rpx;
        padding: 20rpx;
        margin: 20rpx auto;
        border-radius: 20rpx;
        box-sizing: border-box;
        background-color: $uni-text-color-inverse;
		box-shadow: 0 10upx 30upx rgba(#fe5f54 , 0.7);
		
        
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
            background:#fe5e53;
          }
        }
      }
    }
  }
  .popup,.back{
	  position: fixed;
	  z-index: 200;
	  height: 100%;
	  width: 100%;
	  top: 0;
	  left: 0;
	  .box{
		margin: calc(100% - 400upx) 30upx;
		padding: 10upx 0;
		border-radius: 10upx;
		background: #FFFFFF;
		/* height: 400upx; */
		position: relative;
		z-index: 300;
		.li{
			display: flex;
			height: 60upx;
			padding: 0 20upx;
			margin-top: 40upx;
			line-height: 60upx;
			border-bottom: 2upx solid #F2F2F2;
			.text{
				width: 35%;
				color: #333333;
				font-size: 30upx;
				font-weight: bold;
				text-align: center;
			}
			.input{
				width: 65%;
				height: 60upx;
				color: #999999;
				line-height: 60upx;
				
			}
		}
		.btn{
			height: 80upx;
			color: #FFFFFF;
			font-size: 32upx;
			font-weight: bold;
			text-align: center;
			line-height: 80upx;
			background: #f04346;
			border-radius: 10upx;
			margin: 50upx 30upx 30upx;
		}
		.textarea{
			color: #999999;
			font-size: 28upx;
			text-align: center;
			line-height: 60upx;
			
		}
	}
  }
  .back{
	  background: rgba(#000000, .4);
  }
</style>
