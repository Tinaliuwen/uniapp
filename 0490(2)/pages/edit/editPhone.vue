<template>
	<view>
		<view class="content">原手机号码：15925647895</view>
		<view class="content">
			<input type="text" value="" placeholder="输入新手机号码" />
		</view>
		<view class="content code">
			<input type="text" value="" placeholder="输入验证码" />
			<view class="btn">
				验证码
			</view>
		</view>
		<view class="confirm">
			确认修改
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	page{
		background-color: #fff
	}
.content{
	height: 100upx;
	display: flex;
	align-items: center;
	margin-left: 20upx;
	margin-right: 20upx;
	border-bottom: 1px solid #f4f4f4;
}
.code{
	display: flex;
	justify-content: space-between;
	margin-bottom: 180upx;
}
.btn{
	background:linear-gradient(90deg,rgba(255,153,51,1),rgba(255,102,51,1));
	border-radius:28upx;
	width: 124upx;
	height: 56upx;
	text-align: center;
	color: #fff;
}
.confirm{
	background:linear-gradient(90deg,rgba(255,153,51,1),rgba(255,102,51,1));
	border-radius:50upx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-size:36upx;
	height: 100upx;
	margin: 0 65upx;
}
</style>
