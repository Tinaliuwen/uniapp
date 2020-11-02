<template>
  <view class="container">
	<view class="head">
		<view class="header"></view>
		<view class="header-center">
			<block v-if="isheight == 0 || isheight == 1">
				<view :class="isheight == 1 ? 'center-top1' : 'center-top'">
					<image :src="avatar == '' ? '/static/face.png' : avatar" mode="" class="avatar"></image>
					<view class="level">
						{{level}}
					</view>
				</view>
			</block>
			
			<block v-if="isheight == 0">
				<view class="center-tops">
					<image src="/static/user/right.png" mode="widthFix"></image>
				</view>
				
				<view class="center-top">
					<image :src="avatar == '' ? '/static/face.png' : avatar" mode="" class="avatar"></image>
					<view class="level">
						{{apply}}
					</view>
				</view>
			</block>
		</view>
	</view>
	
	<block v-if="isheight == 0">
		<view class="box">
			<view class="lis">
				<view class="left">条件</view>
				<view class="center">要求</view>
				<view class="right">是否满足</view>
			</view>
			<view class="li" v-for="(item, index) in upgrade" :key="index"  v-if="item.type != 2">
				<view class="left">{{item.title}}</view>
				<view class="center">{{item.condtext}}</view>
				<view class="right">
					<text><block v-if="item.type == 1">V</block>
					<block v-else>X</block></text>
				</view>
			</view>
		</view>
	</block>
	
	<block v-if="isheight == 0">
		<block v-if="num == 0">
			<block v-if="state == 0">
				<view class="transfers">审核中</view>
			</block>
			<block v-else-if="state == 1">
				<view class="transfer" @click="submit" v-if="status == 1">申请</view>
				<view class="transfer" @click="submit" v-else>申请</view>
			</block>
			<block v-else>
				<view class="transfer" @click="submit" v-if="status == 1">重新申请</view>
				<view class="transfer" @click="submit" v-else>重新申请</view>
			</block>
		</block>
		<block v-else>
			<view class="transfers">条件未满足</view>
		</block>
	</block>
	<block v-else>
		<view class="transfer">已升级到最高级</view>
	</block>
  </view>
</template>

<script>
	import service from '@/store/service.js';
	export default {
		data() {
			return {
				status:1,
				state:1,
				avatar:'',
				level:'',
				apply:'',
				upgrade:[],
				isheight:2,
				num:0,
			};
		},
		onLoad: function() {
			var self = this;
			self.$http.post(service.api.service.member).then(function(res) {
				if(res.code == 1){
					res = res.data;
					self.avatar = res.avatar;
					self.level = res.levelname;
					self.state = res.jurisdiction;
				}else{
					self.$api.msg(res.msg);
				}
			});
			self.getGoodsCate()
		},
		methods: {
			getGoodsCate() {
				var self = this;
				self.upgrade = [];
				self.$http.post(service.api.service.upgrade).then(function(res) {
					if(res.code == 1){
						res = res.data;
						self.apply = res._apply_levelname_;
						if(!self.level){
							self.level = res._levelname_;
						}
						/* res.member_level = 2;
						res.line = 2;
						res.subordinate_level = 1; */
						if(res._levelname_ == '' || res._levelname_ == null){
							self.isheight = 1;
						}else{
							self.isheight = 0;
						}
						self.upgrade = [{
							type:res.member_level,
							title:'自身等级条件',
							condtext:res._levelname_,
						},{
							type:res.line,
							title:'下线满足n条线',
							condtext:res._line_number_,
						},{
							type:res.subordinate_level,
							title:'下级等级数量及要求',
							condtext:res._subordinate_line_number_+'个'+res._subordinate_levelname_,
						}];
						if(res.member_level == 0){
							self.num++;
						}
						if(res.line == 0){
							self.num++;
						}
						if(res.subordinate_level == 0){
							self.num++;
						}
						self.status = 1;
					}else{
						self.$api.msg(res.info);
					}
				});
			},
			jumper(url){
				uni.navigateTo({
					url:url
				})
			},
			submit(){
				var self = this;
				self.ststus = 0;
				self.$http.post(service.api.service.apply).then(function(res) {
					self.$api.msg(res.info);
					if(res.code == 1){
						setTimeout(function(){
							self.state = 0;
							self.getGoodsCate();
						},1500);
					}else{
						self.status = 1;
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.head,.gift{
		width: 100%;
		/* background: #FFFFFF; */
	}
	.header {
		width: 100%;
		height: 270upx;
		background: url(../../static/user/upgrade.png) no-repeat;
		background-size: 100% 100%;
	}

	.header-center {
		position: relative;
		display: flex;
		/* flex-direction: column; */
		left: 0;
		right: 0;
		width: 550upx;
		height: 260upx;
		margin: 0 auto;
		margin-top: -240upx;
		border-radius: 10px;
		.center-top,.center-top1 {
			width: 200upx;
			position: relative;
			/* display: flex; */
			align-items: center;
			margin-top: 40upx;
			/* padding: 0 calc(50% - 70upx); */

			image {
				margin: 0 30upx;
				width: 132upx;
				height: 132upx;
				border: 4upx solid #FFFFFF;
				border-radius: 70upx;
			}

			.level {
				width: 172upx;
				height: 40upx;
				color: #FFFFFF;
				margin: 0 10upx;
				line-height: 40upx;
				text-align: center;
				position: relative;
				margin-top: -30upx;
				border: 4upx solid #FFFFFF;
				background-color: #ffa442;
				border-radius: 34upx;

				text {
					color: #FFFFFF;
				}
			}
		}
		.center-top1 {
			margin: 40upx calc(50% - 100upx) 0;
		}
		.center-tops{
			image{
				margin-top: 80upx;
				width: 150upx;
				height: 70upx;
			}
		}
	}
	.box{
		margin: 10upx 30upx;
		border-radius: 10upx;
		background: #FFFFFF;
		box-shadow: 0 0 10upx rgba(#666666 , 0.2);
		.lis,.li{
			text-align: center;
			font-weight: bold;
			display: flex;
			height: 60upx;
			line-height: 60upx;
			.left{
				width: 45%;
			}
			.center{
				width: 35%;
			}
			.right{
				width: 20%;
				text{
					color: #e42e32;
					font-weight: bold;
				}
			}
		}
		.li{
			height: 80upx;
			font-weight: 100;
			line-height: 80upx;
			border-top: 2upx solid #F2F2F2;
		}
	}
.transfer,.transfers {
	color: #fff;
	background: #ff594d;
	border-radius: 10upx;
	height: 80upx;
	width: 80%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 36upx;
	margin: 30upx 10%;
}
.transfers {
	background: #AAAAAA;
}
</style>
