<template>
	<view class="transfer-balance">
		
		<view v-if="type == 0" class="audit">
			<image src="/static/user/audit.png" mode="widthFix" class="image"></image>
			
			<view class="audit-text">
				授权书申请审核中请耐心等待审核结果
			</view>
			
			<!-- <view class="transfer" @click="outupd">重新提交</view> -->
		</view>
		
		<view v-else-if="type == 1" class="cert">
			<image src="/static/user/cert2.png" mode="widthFix" class="cert-img"></image>
			
			<view class="cert-img">
				<view class="name">{{username}}</view>
				<view class="idcard">{{idcard}}</view>
				<view class="wechat">{{wechat}}</view>
				<view class="level">{{level}}</view>
				
				<view class="time">
					<view class="box" v-for="(item,index) in timeList" :key="index">
						<text>{{item.year}}</text>年
						<text>{{item.month}}</text>月
						<text>{{item.day}}</text>日<block v-if="index == 0">至</block>
					</view>
				</view>
			</view>
		</view>
		<view class="btn" @click="outupd" v-if="type == 1">重新提交申请</view>
		
		<view v-else-if="type == -1 || type == 2 || type == 3">
			<view class="balance">
				<view class="rice1">
					<text class="text1">上传审核信息</text>
				</view>
				
				<view class="input">
					<view class="text">级别</view>
					<view class="input-value" @click="choose()">{{levelname}}</view>
				</view>
				
				<view class="input">
					<view class="text">微信号</view>
					<input type="text" v-model="wechat" class="input-value" value="" placeholder="请输入微信号" />
				</view>
				
				<view class="input">
					<view class="text">真实姓名</view>
					<input type="text" v-model="username" class="input-value" value="" placeholder="请输入真实姓名" />
				</view>
				
				<view class="input">
					<view class="text">身份证号</view>
					<input type="text" v-model="idcard" class="input-value" value="" placeholder="请输入身份证号" />
				</view>
				
				<view style="height: 60upx;"></view>

				<view class="transfer" @click="submit" v-if="ststus == 1">提交</view>
				<view class="transfer" v-else>提交</view>
				
				<view style="height: 60upx;"></view>
			</view>
		</view>
		
		<view class="" v-else></view>
		
		<pickerNav ref="mpvuePicker" :pickerNumber="pickerNumber"
		 @onConfirm="onConfirm" :pickerList="levelList" type='0'></pickerNav>
	</view>
</template>

<script>
import service from '@/store/service.js';
import pickerNav from "@/components/uni-picker.vue";
export default {
	components: {
		pickerNav,
	},
	data() {
		return {
			type:10,
			level:'',
			wechat:'',
			username:'',
			idcard:'',
			timeList:[],
			ststus:1,
			levelname:'请选择授权级别',
			levelid:0,
			levelList:[],
			transform: 'translateY(400px)',
			pickerNumber:[0],
		};
	},
	onLoad: function(e) {
		var self = this;
		self.$http.get(service.api.service.accredit).then(function(res) {
			res = res.data;
			self.type = res.status;
			if(res.status == 1){
				self.level = res.level;
				self.username = res.name;
				self.wechat = res.wechat_number;
				self.idcard = res.identity_number;
				self.update(res.start_time);
				self.update(res.end_time);
			}
		});
		
		self.$http.get(service.api.upload.level).then(function(res) {
			res = res.data;
			res.forEach(item=>{
				self.levelList.push({
					label: item.levelname,
					value: item.level
				})
			})
		});
	},
	methods: {
		choose(){
			this.$refs.mpvuePicker.show();
		},
		onConfirm(e){
			this.levelname = e.title;
			this.levelid = e.type;
		},
		outupd(){
			this.type = 2;
		},
		update(timer){
			var timestr = new Date(parseInt(timer) * 1000);
		　　var year = timestr.getFullYear();
		　　var month = timestr.getMonth()+1;
			if(month < 10){
				month = '0'+month;
			}
		　　var date = timestr.getDate();
			if(date < 10){
				date = '0'+date;
			}
			this.timeList.push({
				year:year,
				month:month,
				day:date,
			})
		},
		// 米粒数量
		getRice() {
			var self = this;
			self.$http.get(service.api.rice.rice, {}).then(function(res) {
				var list = res.data;
				console.log(list);
				self.rice = list;
			});
		},
		//审核数据提交
		submit(){
			var self = this;
			if (self.levelid == 0) {
				self.$api.msg('授权级别未选择');
				return;
			}
			if (self.wechat == '') {
				self.$api.msg('微信号不能为空');
				return;
			}
			if (self.username == '') {
				self.$api.msg('真实姓名不能为空');
				return;
			}
			if (self.idcard == '') {
				self.$api.msg('身份证号不能为空');
				return;
			}
			self.ststus = 0;
			self.$http.post(service.api.service.jurisd, {
				"status": self.type > 1 ? 2 : 1,
				'level':self.levelid,
				'name':self.username,
				'wechat_number':self.wechat,
				'identity_number':self.idcard,
			}).then(function(res) {
				self.$api.msg(res.info);
				if(res.code == 1){
					setTimeout(function(){
						self.type = 0;
					},1500);
				}else{
					self.status = 1;
				}
			});
		},
	}
};
</script>

<style scoped>
.balance {
	background-color: #fff;
	border-radius: 20upx;
	margin: 30upx 20upx;
}
.rice {
	padding: 30upx;
	border-bottom: 1px solid #f4f4f4;
}
.text {
	width: 140upx;
	font-size: 26upx;
	font-weight: bold;
	margin-right: 16upx;
}
.rice1 {
	padding: 30upx;
}
.text1 {
	font-size: 28upx;
	font-weight: bold;
}

.price {
	font-size: 32upx;
	font-weight: bold;
	color: #ff594d;
}
.img {
	width: 68upx;
	height: 16upx;
}
.top {
	display: flex;
	align-items: center;
	justify-content: space-around;
	height: 160upx;
}
.top-text {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.rice-text {
	color: #333;
	font-size: 32upx;
	font-weight: bold;
}
.txt {
	font-size: 24upx;
	color: #666;
}
.input {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 30upx;
	border-bottom: 1px solid #f4f4f4;
	padding: 20upx 0;
}
.input-value {
	font-size: 28upx;
	color: #999;
	width: calc(100% - 140upx);
}
.input-img{
	width: 200upx;
	height: 200upx;
}
.all {
	width: 80upx;
	color: #ff594d;
}
.all-text {
	margin-left: 8upx;
}
.transfer {
	color: #fff;
	background: #ff594d;
	border-radius: 10upx;
	height: 100upx;
	width: 618upx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 36upx;
	margin: 30upx 46upx 30upx 46upx;
}
.tips {
	display: flex;
	justify-content: center;
	font-size: 24upx;
	color: #999;
}
.audit{
	width: 100%;
	height: 100%;
	position: fixed;
	background: #FFFFFF;
}
.image{
	width: 360upx;
	height: 360upx;
	margin: 150upx calc(50% - 180upx) 50upx;
}
.audit-text{
	font-weight: bold;
	text-align: center;
	font-size: 32upx;
	color: #e02328;
}
.cert-img{
	position: absolute;
	top: 0;
	height: 1064upx;
	width: 100%;
	z-index: 200;
	color: #e02328;
}
.btn{
	color: #FFFFFF;
	line-height: 80upx;
	text-align: center;
	font-size: 32upx;
	padding-top: 1064upx;
	background: #fb0b18;
}
.name,.idcard,.wechat,.level,.time{
	z-index: 300;
	font-weight: bold;
	position: relative;
	
}
.name{
	height: 40upx;
	width: 120upx;
	margin-top: 330upx;
	text-align: center;
	margin-left: 300upx;
}
.idcard,.wechat{
	margin-top: 14upx;
	margin-left: 320upx;
	height: 40upx;
}
.wechat{
	margin-top: 6upx;
}
.level{
	font-size: 50upx;
	text-align: center;
	line-height: 70upx;
	margin-top: 60upx;
}
.time{
	margin-left: 208upx;
	margin-top: 170upx;
	font-size: 24upx;
	display: flex;
	width: 560upx;
	font-weight: bold;
	font-weight: 100;
	transform:scale(0.75);
}
.box{
	width: 50%;
	display: flex;
	color: #333333;
}
.box text{
	color: #e02328;
	padding: 0 6upx;
	/* margin-right: 30upx; */
}
</style>
