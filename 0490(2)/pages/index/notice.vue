<template>
	<view class="agreement">
		<view class="content">
			<view class="u-content">
				<view v-html="content"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '@/store/service.js';
	export default {
		data() {
			return {
				content:'',
				id:0
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getProtocol()
		},
		methods: {
			
			getProtocol(){
				var self = this;
				self.$http.post(service.api.main.getNoticestail,{
					id:this.id
				}).then(function(res) {
					if(res.code == 1){
						res = res.data;
						var content = res[0].detail
						content = self.update(content,'\r\n','');
						content = self.update(content,'pre','div');
						content = self.update(content,'code','div');
						self.content = content;
					}else{
						self.$api.msg(res.info);
					}
				});
			},
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
			},
			yes(type){
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2];
				prevPage.savetype({ type: type })
				uni.navigateBack({//返回
					delta: 1
				})
			},
			jump(url){
				uni.navigateTo({
					url:url
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/uni.css';
	page{
		background: #FFFFFF;
	}
	.agreement {
		// padding: 0 50upx; 
		padding-bottom: 50upx;

		.content {
			padding: 20upx;

			p {
				text-indent: 2em;
				font-size: 28upx;
				color: #333333;
			}

		}
		
		.btn{
			display: flex;
			justify-content: space-around;
			margin-top: 100upx;
			
			
			.refuse{
				width: 200upx;
				height: 82upx;
				line-height: 82upx;
				text-align: center;
				color: #999999;
				background-color: #F3F3F3;
				border-radius: 40upx;
				font-size: 32upx;
				
			}
			
			.consent{
				width: 200upx;
				height: 82upx;
				line-height: 82upx;
				text-align: center;
				color: #FFFFFF;
				background-color: #6565FF;
				border-radius: 40upx;
				font-size: 32upx;
			}
			
		}

	}
</style>
