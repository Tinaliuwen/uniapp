<template>
	<view class="shopComment-page">
		<view class="comment-content">
			<!-- 商品列表 -->
			<view class="comment-list" v-for="(item, index) in goodList" :key="item.id">
				<view class="top">
					<view class="top-left"><image :src="item.image" mode="aspectFit"></image></view>
					<view class="top-right">
						<view class="title">{{ item.title }}</view>
						<view class="price">￥{{ item.price }}</view>
						<view class="info">
							<view class="number">x{{ item.number }}</view>
							<view class="comment" v-if="isManyGoods" @tap="_isOpen(item.id)">
								<text>评价</text>
								<image src="../../static/icon/right1.png" mode="aspectFit" :class="{ 'arrow-top': item.isOpen }"></image>
							</view>
						</view>
					</view>
				</view>
				<view v-if="isManyGoods">
					<view class="bottom" v-if="item.isOpen">
						<!-- 评价 -->
						<view class="evalute" v-if="!isAddEvalution">
							<view class="title">评价</view>
							<view class="star"><uni-rate size="20" :value="item.star" margin="2" @change="_starChange" :params="item.id"></uni-rate></view>
						</view>
						<!-- 嗮图 -->
						<view class="share-img">
							<view class="title">晒图</view>
							<view class="img-content">
								<view class="img-content-list" v-for="(shareImgItem, indez) in item.shareImg" :key="indez">
									<image :src="shareImgItem" class="img-show"></image>
									<image @tap="_delete(item.id, indez)" src="../../static/icon/cha.png" class="delete"></image>
								</view>
								<view class="upload" @tap="_upload(item.id)">+</view>
							</view>
						</view>
						<!-- 评论 -->
						<view class="comment-info">
							<text>评论</text>
							<textarea placeholder="说点什么吧~" :data-id="item.id" @blur="_inputText" placeholder-class="placeholder"></textarea>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 整单评价 -->
		<view class="all-comment">
			<view class="title">整单评价</view>
			<view class="score" v-if="!isAddEvalution">
				<view class="title">
					<text>评分</text>
					<text>*</text>
				</view>
				<view class="star"><uni-rate size="20" margin="2" @change="_starChange" params="all"></uni-rate></view>
			</view>
			<view class="show-img">
				<view class="title">晒图</view>
				<view class="img-content">
					<view class="img-list" v-for="(imgItem, index) in allShareImg" :key="index">
						<image :src="imgItem"></image>
						<image @tap="_delete('all', index)" src="../../static/icon/cha.png" class="delete"></image>
					</view>
					<view class="upload" @tap="_upload('all')">+</view>
				</view>
			</view>
			<view class="comment">
				<view class="title">
					<text class="name">评价</text>
					<text class="icon">*</text>
				</view>
				<view class="info"><textarea data-id="all" placeholder="说点什么吧~" placeholder-class="placeholder" @blur="_inputText" /></view>
			</view>
		</view>
		<!-- 发布评价 -->
		<view class="submit" @tap="_submit">发布评价</view>
	</view>
</template>

<script>
import uniRate from '@/components/uni-rate/uni-rate.vue';
export default {
	data() {
		return {
			goodList: [
				{
					id: 1,
					title: '北纯 五常稻花香 东北大米2.5kg （无添加 长粒 米 五常大米 稻花香米 新老包装随机发货）',
					isOpen: true,
					price: 198.0,
					number: 2,
					image: '../../static/order/pic.png',
					star: null,
					comment: '',
					shareImg: ['../../static/order/pic.png', '../../static/order/pic.png', '../../static/order/pic.png']
				},
				{
					id: 2,
					title: '北纯 五常稻花香 东北大米2.5kg （无添加 长粒 米 五常大米 稻花香米 新老包装随机发货）',
					isOpen: true,
					price: 198.0,
					number: 1,
					image: '../../static/order/pic.png',
					star: null,
					comment: '',
					shareImg: ['../../static/order/pic.png']
				}
			],
			startValue: 0, //星星选中值
			isManyGoods: true, //是否展示评价按钮-----多商品展示---单商品隐藏
			isAddEvalution: false, //是否为追加评论
			allShareImg: ['../../static/order/pic.png'], //整单评论嗮图
			allComment: '' //整单评价
		};
	},
	components: { uniRate },
	methods: {
		// 图片上传
		_upload(id) {
			console.log(id);
			if (id == 'all') {
				uni.chooseImage({
					count: 5,
					sizeType: ['compressed'],
					success: res => {
						let tempFilePaths = res.tempFilePaths;
						this.allShareImg.push(...tempFilePaths);
						this.goodList.map(item => {
							item.shareImg = this.allShareImg;
						});
					},
					fail: error => {
						console.log(error);
					}
				});
			} else {
				this.goodList.map(item => {
					if (item.id === Number(id)) {
						uni.chooseImage({
							count: 5,
							sizeType: 'compressed',
							success: res => {
								console.log(res.tempFilePaths);
								let tempFilePaths = res.tempFilePaths;
								item.shareImg.push(...tempFilePaths);
							},
							fail: error => {
								console.log(error);
							}
						});
					}
				});
			}
		},
		// 图片删除
		_delete(id, index) {
			if (id == 'all') {
				this.allShareImg.splice(index, 1);
				this.goodList.map(item => {
					item.shareImg = this.allShareImg;
				});
			} else {
				this.goodList.map(item => {
					if (item.id === Number(id)) {
						item.shareImg.splice(index, 1);
					}
				});
			}
		},
		// 是否展开
		_isOpen(id) {
			this.goodList.map(item => {
				if (item.id === id) {
					item.isOpen ? (item.isOpen = false) : (item.isOpen = true);
					// if (item.isOpen) {
					// 	item.isOpen = false;
					// } else {
					// 	item.isOpen = true;
					// }
				}
			});
		},
		// star
		_starChange(e) {
			const star = e.value;
			const id = e.params;
			if (id === 'all') {
				this.goodList.map(item => {
					item.star = star;
				});
			} else {
				this.goodList.map(item => {
					if (item.id === Number(id)) {
						item.star = star;
					}
				});
			}
		},
		// 评价内容
		_inputText(e) {
			let id = e.currentTarget.dataset.id;
			let text = e.detail.value;
			if (id == 'all') {
				if (!text.trim() == '') {
					if (this.goodList.length === 1) {
						this.goodList.map(item => {
							item.comment = text;
						});
						console.log('单商品-----------------');
						console.log(this.goodList);
					} else {
						console.log('多商品-----------------');
						this.allComment = text;
						console.log(this.goodList);
					}
				}
			} else {
				this.goodList.map(item => {
					if (item.id === Number(id)) {
						item.comment = text;
					}
				});
			}
		},
		// 提交
		_submit() {
			if (this.isAddEvalution) {
				// 追加商品评论提交
				uni.showModal({
					content: '提交评价？',
					success: res => {
						console.log(res);
					},
					fail: res => {
						console.log(res);
					}
				});
			} else {
				// 商品评论提交
			}
		}
	},
	onReady() {
		this.goodList.length > 1 ? (this.isManyGoods = true) : (this.isManyGoods = false);
	},
	onLoad(options) {
		// if (options.type == 'isAddEvalution') {
		// 	this.isAddEvalution = true;
		// } else {
		// 	this.isAddEvalution = false;
		// }
	}
};
</script>

<style lang="less" scoped>
// 箭头样式
.arrow-top {
	transform: rotate(-90deg) !important;
}
.placeholder {
	font-size: 24upx;
	font-weight: 400;
	color: rgba(153, 153, 153, 1);
	line-height: 32upx;
}
.shopComment-page {
	// 评论内容区
	.comment-content {
		width: 100vw;
		background-color: #ffffff;
		// 评论列表
		.comment-list {
			box-sizing: border-box;
			// 头部
			.top {
				padding: 20upx 30upx 0;
				height: 180upx;
				width: 100vw;
				display: flex;
				.top-left {
					height: 160upx;
					width: 160upx;
					image {
						height: 100%;
						width: 100%;
					}
				}
				.top-right {
					flex: 1;
					padding: 10upx 30upx 0 30upx;
					box-sizing: border-box;
					.title {
						width: 500upx;
						font-size: 24upx;
						font-weight: 400;
						color: rgba(0, 0, 0, 1);
						line-height: 32upx;
					}
					.price {
						font-size: 28upx;
						font-weight: 500;
						color: rgba(255, 123, 76, 1);
						margin-top: 6upx;
						height: 22upx;
						margin-bottom: 6upx;
					}
					.info {
						display: flex;
						justify-content: space-between;
						padding-right: 30upx;
						.number {
							height: 19upx;
							font-size: 24upx;
							font-weight: 500;
							color: rgba(51, 51, 51, 1);
							line-height: 32upx;
							margin-top: 21upx;
						}
						.comment {
							width: 120upx;
							height: 48upx;
							border: 1px solid rgba(239, 124, 56, 1);
							border-radius: 24upx;
							display: flex;
							align-items: center;
							justify-content: center;
							> text {
								height: 23upx;
								font-size: 24upx;
								font-weight: 500;
								color: rgba(255, 102, 51, 1);
								line-height: 23upx;
							}
							> image {
								height: 22upx;
								width: 22upx;
								transform: rotate(90deg);
								margin-left: 11upx;
							}
						}
					}
				}
			}
			// 底部
			.bottom {
				padding: 21upx 0 0 21upx;
				width: vw;
				background: rgba(255, 255, 255, 1);
				box-sizing: border-box;
				.evalute {
					height: 71upx;
					width: 100%;
					display: flex;
					align-items: center;
					border-bottom: 1px solid rgba(248, 248, 248, 1);
					.title {
						font-size: 24upx;
						font-weight: 500;
						color: rgba(102, 102, 102, 1);
						line-height: 32upx;
					}
					.star {
						margin-left: 28upx;
						margin-top: 10upx;
					}
				}
				.share-img {
					height: 112upx;
					width: 100%;
					box-sizing: border-box;
					display: flex;
					.title {
						height: 22upx;
						font-size: 24upx;
						font-weight: 500;
						color: rgba(102, 102, 102, 1);
						margin-top: 10upx;
					}
					.img-content {
						display: flex;
						flex-wrap: wrap;
						flex: 1;
						margin-top: 16upx;
						margin-left: 25upx;
						.img-content-list {
							height: 80upx;
							width: 80upx;
							margin-right: 10upx;
							position: relative;
							.img-show {
								height: 100%;
								width: 100%;
							}
							.delete {
								height: 25upx;
								width: 25upx;
								position: absolute;
								top: 0;
								right: 0;
								opacity: 0.8;
								background-color: #ffffff;
							}
						}
						.upload {
							height: 80upx;
							width: 80upx;
							text-align: center;
							line-height: 70upx;
							font-size: 80upx;
							border: 1px solid #dddddd;
							color: #ebebeb;
						}
					}
				}
				.comment-info {
					display: flex;
					box-sizing: border-box;
					height: 125upx;
					margin-top: 19upx;
					border-bottom: 1px solid rgba(248, 248, 248, 1);
					border-top: 1px solid rgba(248, 248, 248, 1);
					> textarea {
						flex: 1;
						margin-left: 32upx;
						height: 100%;
						padding-top: 5upx;
						box-sizing: border-box;
					}
					> text {
						height: 23upx;
						font-size: 24upx;
						font-weight: 500;
						color: rgba(102, 102, 102, 1);
					}
				}
			}
		}
	}
	.all-comment {
		width: 100%;
		height: 380upx;
		background: rgba(255, 255, 255, 1);
		margin-top: 20upx;
		padding: 19upx 21upx;
		.title {
			font-size: 28upx;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			height: 66upx;
		}
		.score {
			display: flex;
			border-top: 1px solid rgba(248, 248, 248, 1);
			border-bottom: 1px solid rgba(248, 248, 248, 1);
			height: 61upx;
			.title {
				width: 100upx;
				display: flex;
				& text:first-child {
					height: 23upx;
					font-size: 24upx;
					font-weight: 500;
					color: rgba(102, 102, 102, 1);
				}
				& text:last-child {
					color: red;
				}
				> text {
					line-height: 61upx;
				}
			}
			.star {
				margin-top: 30upx;
				margin-left: 19upx;
			}
		}
		.show-img {
			display: flex;
			height: 112upx;
			width: 100%;
			border-bottom: 1px solid rgba(248, 248, 248, 1);
			.title {
				height: 22px;
				font-size: 24upx;
				font-weight: 500;
				color: rgba(102, 102, 102, 1);
				margin-top: 6upx;
			}
			.img-content {
				display: flex;
				flex: 1;
				padding-left: 35upx;
				margin-top: 16upx;
				.img-list {
					margin-right: 10upx;
					position: relative;
					> image {
						height: 80upx;
						width: 80upx;
					}
					.delete {
						height: 25upx;
						width: 25upx;
						position: absolute;
						top: 0;
						right: 0;
						opacity: 0.8;
						background-color: #ffffff;
					}
				}
				.upload {
					height: 80upx;
					width: 80upx;
					text-align: center;
					line-height: 70upx;
					font-size: 80upx;
					border: 1px solid #dddddd;
					color: #ebebeb;
				}
			}
		}
		.comment {
			box-sizing: border-box;
			height: 135upx;
			width: 100%;
			padding-top: 5upx;
			display: flex;
			overflow: hidden;
			.title {
				height: 30upx;
				display: flex;
				align-items: center;
				.name {
					font-size: 24upx;
					font-weight: 500;
					color: rgba(102, 102, 102, 1);
					line-height: 35upx;
					width: 50upx;
				}
				.icon {
					margin-top: 5upx;
					color: red;
				}
			}
			.info {
				flex: 1;
				margin-left: 20upx;
				> textarea {
					height: 100%;
					width: 100%;
				}
			}
		}
	}
	.submit {
		margin: 50upx auto 35upx;
		width: 710upx;
		height: 100upx;
		background: #ff594d;
		border-radius: 10upx;
		font-size: 36upx;
		font-weight: 500;
		text-align: center;
		line-height: 100upx;
		color: rgba(255, 255, 255, 1);
	}
}
</style>
