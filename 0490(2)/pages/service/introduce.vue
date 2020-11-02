<template>
	<view class="container">
		<view v-html="enterprise_content" class="content"></view>
	</view>
</template>

<script>
	import service from '@/store/service.js';
	export default {
		data() {
			return {
				enterprise_content:'',
			};
		},
		onLoad:function(e){
			var self = this;
				self.$http.get(service.api.service.service).then(function(res) {
					if(res.code == 1){
						res = res.data;
						var content = res.enterprise_content;
						content = self.update(content,'\r\n','');
						content = self.update(content,'pre','div');
						content = self.update(content,'code','div');
						self.enterprise_content = content;
					}else{
						self.$api.msg(res.info);
					}
				});
		},
		methods: {
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
			}
		}
	};
</script>

<style>
	.image{
		width: 100%;
	}
	.content{
		padding: 30upx;
	}
</style>
