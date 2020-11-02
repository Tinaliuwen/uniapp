<template>
	<view class="apply-number">
		<view class="bg">
			<view class="input">
				<view class="name">店铺名称</view>
				<view><input type="text" class="input-value" v-model="shop" value="" placeholder="请输入店铺简称" /></view>
			</view>
			<view class="input">
				<view class="name">联系方式</view>
				<view><input type="text" value="" v-model="contact" class="input-value" placeholder="请输入真实手机号" /></view>
			</view>
			<!-- <view class="input">
				<view class="name">所属行业</view>
				<view class="return_type_right" @tap="_returnType">
					<input class="input-value"  type="text" :value="returnType" disabled placeholder="选择行业类型" placeholder-class="placeholder-class" />
					<image class="icon"  src="../../static/img/up.png" mode="aspectFit"></image>
				</view>
			</view> -->
			<view class="options">
				<!-- 退货原因 -->
				<view class="return_reason">
					<view class="return_reason_left"><text>所属行业</text></view>
					<view class="return_reason_right" @tap="maskShow(true)">
						<input type="text" disabled :value="returnReason" placeholder="请选择" placeholder-class="placeholder-class" />
						<image src="../../static/img/up.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<view class="input">
				<view class="name">商家地址</view>
				<view><input class="input-value" type="text" v-model="address" value="" placeholder="请输入所在地区" /></view>
			</view>
			<view class="address">
				<view><input type="text" class="input-value" value="" v-model="addressDetail" placeholder="详细地址 （如街道、小区、乡镇、村）" /></view>
			</view>
		</view>
		<view class="add-pic">
			<view class="upload"><view class="upload-text">店铺详细介绍</view></view>
			<view class="area"><textarea value="" class="textarea" v-model="recommend"  maxlength="30" placeholder="在此输入店铺详细介绍，不得超过30个字符" /></view>
			<!-- <view > -->

			<view class="text">
				<label class="radio" @click="checked = !checked"><checkbox value="" :checked="checked" style="transform:scale(0.7);" /></label>
				<text class="text1">我已阅读</text>
				<text class="text2" @click="agree">《入驻协议》</text>
			</view>
			<view class="submit">申请入驻</view>
			<!-- </view> -->
		</view>
		<!-- 遮罩 -->
		<view class="mask" v-show="isMask">
			<view class="mask_top"></view>
			<view class="mask_content">
				<!-- 标题 -->
				<view class="title">
					<view class="cancel" @tap="maskShow(false)">取消</view>
					<view style="font-size: 28upx;">选择行业类型</view>
					<!-- <image src="../../static/icon/cha.png" mode="aspectFit" @tap="maskShow(false)"></image> -->
					<!-- 确认按钮 -->
					<view class="confirm" @tap="maskShow(false)">确定</view>
				</view>
				<!-- 相泽祥 -->
				<view class="options">
					<radio-group @change="_returnReason">
						<view class="list">
							<text class="common_text_style">教育行业</text>
							<radio value="教育行业" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
						<view class="list">
							<text class="common_text_style">服装行业</text>
							<radio value="服装行业" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
						<view class="list">
							<text class="common_text_style">化妆品行业</text>
							<radio value="化妆品行业" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
						<view class="list">
							<text class="common_text_style">互联网行业</text>
							<radio value="互联网行业" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
						<view class="list">
							<text class="common_text_style">食品行业</text>
							<radio value="食品行业" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
						<view class="list list_end">
							<text class="common_text_style">其他行业</text>
							<radio value="其他行业" color="#ff594d" style="transform: scale(0.7);"></radio>
						</view>
					</radio-group>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			checked: false,
			isMask: false, //遮罩
			returnReason: '', //所属行业
			shop:'',
			contact:'',
			address:'',
			addressDetail:'',
			recommend:''
		};
	},
	methods: {
		agree() {
			uni.navigateTo({
				url: './agreement'
			});
		},
		// 遮罩
		maskShow(boolean) {
			this.isMask = boolean;
			if (boolean) {
			}
		},
		// 退货原因
		_returnReason(returnReason) {
			if (returnReason) {
				this.returnReason = returnReason.detail.value;
			}
		}
	}
};
</script>

<style lang="less" scoped>
page {
	background-color: #fff;
}
.banner {
	width: 100%;
	height: 270upx;
}
.input {
	display: flex;
	align-items: center;
	border-bottom: 1px solid #f4f4f4;
	height: 110upx;
}
.name {
	color: #666;
	padding-left: 20upx;
	width: 200upx;
	font-size: 28upx;
}
.icon {
	width: 22upx;
	height: 12upx;
	float: right;
	/* 	display: flex;
	align-items: center; */
}
.return_type_right {
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.upload {
	display: flex;
	padding-top: 60upx;
	/* padding-bottom: 38upx; */
}
.upload-text {
	color: #666666;
	margin-left: 18upx;
}
.button {
	display: flex;
	align-items: center;
	color: #ad6928;
	background-color: #ffe9d4;
	border-radius: 20upx;
	margin-left: 12upx;
	padding: 0 22upx;
}
.more {
	width: 15upx;
	height: 15upx;
	padding-left: 8upx;
}
.add {
	width: 195upx;
	height: 195upx;
	padding-left: 20upx;
}
.area {
	margin: 30upx 20upx;
}
.textarea {
	width: 92%;
	background-color: #f4f4f4;
	font-size: 28upx;
	padding: 30upx 30upx 0 20upx;
}
.submit {
	height: 100upx;
	font-size: 36upx;
	color: #fff;
	line-height: 100upx;
	border-radius: 10upx;
	background: linear-gradient(90deg, rgba(233, 144, 64, 1) 0%, rgba(255, 123, 76, 1) 100%);
	text-align: center;
	margin: 0 20upx 80upx;
}
/* input {
	font-size: 28upx;
} */
.text {
	margin-bottom: 117upx;
	font-size: 24upx;
	margin-left: 18upx;
}
.text1 {
}
.text2 {
	color: #ff594d;
}
.address {
	border-bottom: 1px solid #f4f4f4;
	height: 70upx;
	margin-top: 40upx;
	margin-left: 18upx;
}
.input-value {
	color: #d4d4d4;
	font-size: 28upx;
}
/* 所属行业 */
.return_reason {
	display: flex;
	height: 100upx;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid rgba(244, 244, 244, 1);
	padding-left: 21upx;
	box-sizing: border-box;

	.return_reason_left {
		width: 170upx;
		> text {
			width: 200upx;
			height: 26upx;
			font-size: 28upx;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 42upx;
		}
	}

	.return_reason_right {
		flex: 1;
		display: flex;
		align-items: center;
		margin-right: 20upx;
		justify-content: space-between;

		> input {
			flex: 1;
			padding-left: 35upx;
			padding-top: 6upx;
			font-size: 28upx;
			font-weight: 500;
			color: rgba(102, 102, 102, 1);
		}

		> image {
			height: 22upx;
			width: 22upx;
		}
	}
}
// 遮罩样式
.mask {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	z-index: 99;

	.mask_top {
		opacity: 0.53;
		background: rgba(0, 0, 0, 1);
		flex: 1;
	}

	.mask_content {
		height: 810upx;
		width: 100%;
		background-color: #ffffff;
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx 20upx 0px 0px;
		padding-top: 68upx;
		box-sizing: border-box;

		.title {
			height: 58upx;
			width: 100%;
			display: flex;
			justify-content: space-between;
			// padding: 0 15upx 0 272upx;
			padding: 0 20upx;
			align-items: center;
			box-sizing: border-box;
			color: #999;

			> text {
				height: 34upx;
				font-size: 36upx;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				line-height: 34upx;
			}

			> image {
				height: 58upx;
				width: 58upx;
			}
		}
	}

	.options {
		margin-top: 50upx;

		.list {
			height: 100upx;
			width: 100%;
			padding: 0 30upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			border-bottom: 1px solid rgba(244, 244, 244, 1);
			>text{
				font-size: 30upx;
			}
		}

		.list_end {
			border-bottom: 0;
		}
	}

	// .confirm {
	// 	width: 710upx;
	// 	height: 100upx;
	// 	background: linear-gradient(90deg, rgba(233, 144, 64, 1) 0%, rgba(255, 123, 76, 1) 100%);
	// 	border-radius: 10upx;
	// 	font-size: 36upx;
	// 	font-weight: 500;
	// 	text-align: center;
	// 	line-height: 100upx;
	// 	color: rgba(255, 255, 255, 1);
	// 	margin: 25upx auto;
	// }
	.confirm {
		color: #ff594d;
		font-size: 34upx;
	}
	.cancel {
		font-size: 34upx;
	}
}
</style>
