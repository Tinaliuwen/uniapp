<template>
	<view class="container">
		<view v-for="(item, index) in imageList" :key="index">
			<image :src="item" mode="widthFix" class="image"></image>
		</view>
		
	</view>
</template>

<script>
	import service from '@/store/service.js';
	export default {
		data() {
			return {
				imageList:[],
			};
		},
		onLoad:function(e){
			var self = this;
				self.$http.get(service.api.service.service).then(function(res) {
					if(res.code == 1){
						res = res.data;
						var content = res.qualifications_img;
						content = self.update(content,'|','');
						self.imageList = content;
					}else{
						self.$api.msg(res.info);
					}
				});
		},
		methods: {
			update(content,text,replace){
				var array = content.split(text);
				return array;
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
