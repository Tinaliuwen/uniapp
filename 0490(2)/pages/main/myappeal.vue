<template>
	<view>
		<textarea class="text" v-model="textarea" maxlength='500' placeholder="请输入您的反馈内容（500字以内）" placeholder-style="color:#C1C1C1" />
		<button class="btn" @tap="ok_up" type="primary">提交</button>
	</view>
</template>

<script>
	import service from '@/store/service.js';
	export default {
		data() {
			return {
				textarea:'',
				user_id:''
			}
		},
		onShow :function(){
			var self = this;
			self.$http .post(service.api.main.user).then(function(res) {
				if(res.code == 1){
					res = res.data;
					self.user_id = res.id;
					
				}else{
					self.$api.msg(res.msg);
				}
			});
		},
		methods: {
			ok_up() {
				var self = this;
				self.$http.post(service.api.main.getReprTation, {
						remark:self.textarea,
						type:1
					})
					.then(function(res) {
						if (res.code == 1) {
							self.$api.msg('提交成功');
							setTimeout(function() {
								uni.switchTab({
									url: '/pages/main/user'
								});
							}, 2000);
							
						}else{
							self.$api.msg(res.info);
						}
					});
			},
		}
	}
</script>

<style lang="less" scoped>
	.text {
		width: 96%;
		height: 400rpx;
		background: #fff;
		padding: 20rpx;
	}
	.btn {
		margin: 80rpx;
		background:#ff594d;
		border-radius: 50rpx;
	}
</style>
