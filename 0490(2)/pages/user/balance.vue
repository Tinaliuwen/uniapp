<template>
  <view class="container">
    <view class="header">
      <image class="header-img" src="/static/img/bal_bg.png" mode=""></image>
      <view class="header-wrapper u-f-jsb u-f-column">
        <view class="header-top">
          <view>账户积分(元)</view>
          <text>200.56</text>
        </view>
        <view class="header-bottom u-f-jsb">
          <navigator url="../balance/recharge" class="section u-f-ajc">
            <image src="/static/img/bal_icon01.png" mode=""></image>
            <text>充值</text>
          </navigator>
          <view class="line"></view>
          <navigator url="../balance/withdraw" class="section u-f-ajc">
            <image src="/static/img/bal_icon02.png" mode=""></image>
            <text>提现</text>
          </navigator>
        </view>
      </view>
    </view>
    
    <!-- 列表 -->
    <view class="list">
      <view v-for="(item,index) in list" :key="index" >
        <navigator :url="item.url" class="list-item u-f-jsb">
          <image :src="item.icon" mode=""></image>
          <text class="u-f1">{{item.title}}</text>
          <uni-icons type="arrowright" color="#656565" size="20"></uni-icons>
        </navigator>
        
      </view>
    </view>
    
  </view>
</template>

<script>
  import uicons from '@/components/uni-icons/uni-icons.vue';
  export default{
    components: { uicons },
    data(){
      return{
        list: [
          {
            title: '消费明细',
            icon: '/static/img/bal_icon03.png',
            url: '../balance/consumerDetails'
          },
          {
            title: '提现明细',
            icon: '/static/img/bal_icon04.png',
            url: '../balance/withdrawDetails'
          },
          {
            title: '充值明细',
            icon: '/static/img/bal_icon05.png',
            url: '../balance/rechargeDetails'
          },
          {
            title: '米粒转入',
            icon: '/static/img/bal_icon06.png',
            url: '../balance/transfer'
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container{
    .header{
      position: relative;
      width: 750rpx;
      height: 370rpx;
      
      .header-img{
        width: 100%;
        height: 100%;
      }
      
      .header-wrapper{
        box-sizing: border-box;
        position: absolute;
        bottom: 0rpx;
        left: 20rpx;
        width: 710rpx;
        height: 321rpx;
        padding: 70rpx 0 30rpx;
        background-color: $uni-bg-color;
        border-radius: 20rpx;
        
        .header-top{
          text-align: center;
          view{
            font-size: 32rpx;
            color: $uni-text-color;
          }
          
          text{
            font-size: 56rpx;
            color: $uni-text-color;
            font-weight: bold;
          }
        }
        
        .header-bottom{
          width: 80%;
          .section{
            image{
              width: 48rpx;
              height: 48rpx;
            }
            text{
              font-size: 32rpx;
              color: $uni-text-color;
            }
          }
          
          .line{
            width: 1px;
            height: 40rpx;
            background-color: #E8E3E3;
          }
        }
      }
    }
    
    .list{
      padding: 40rpx 20rpx;
      .list-item{
        height: 100rpx;
        padding: 0 20rpx;
        font-weight: bold;
        color: $uni-text-color;
        background-color: $uni-bg-color;
        margin-bottom: 20rpx;
        border-radius: 20rpx;
        
        image{
          width: 44rpx;
          height: 44rpx;
          margin-right: 26rpx;
        }
      }
    }
  }
</style>
