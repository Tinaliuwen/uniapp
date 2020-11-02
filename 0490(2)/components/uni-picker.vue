<template>
    <view class="mpvue-picker">
        <view :class="{'pickerMask':showPicker}" @click="maskClick" catchtouchmove="true"></view>
        <view class="mpvue-picker-content " :class="{'mpvue-picker-view-show':showPicker}">
            <view class="mpvue-picker__hd" catchtouchmove="true">
                <view class="mpvue-picker__action" @click="pickerCancel(pickIndex)">取消</view>
				<input type="text" v-model="screen" class="pvue-picker__input" v-if="type == 1" 
					@input="input" :placeholder="placeholder" :style="styler"
				></input>
				<view class="pvue-picker__input1" v-else></view>
                <view class="mpvue-picker__action" :style="{color:themeColor}" @click="pickerConfirm(pickIndex)">确定</view>
            </view>
			
            <picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChange" v-if="pickerArray.length > 0">
                <picker-view-column>
					<view class="picker-item" v-for="(item,index) in pickerArray" :key="index">
						{{item.label}}
					</view>
				</picker-view-column>
            </picker-view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
				screen:'',
                pickerChangeValue: [],
                pickerValue: [],
                pickerListChange: true,
                modeChange: false,
                pickerArray: [],
				/* 是否显示控件 */
				showPicker: false,
				pickIndex:[0]
            };
        },
        props: {
			type:{//筛选功能：1，打开，0关闭
                type: [String, Number],
                default: 0
			},
			styler: {//筛选框边框样式
                type: String,
                default: 'border: 2upx solid #f4f4f4;font-size: 28upx;'
            },
			placeholder: {//筛选框提示文字
                type: String,
                default: '请输入筛选内容'
            },
            /* picker 数值 */
            pickerList: {
                type: Array,
                default(){
					return []
				}
            },
            /* 默认值 */
            pickerNumber: {
                type: Array,
                default(){
                	return []
                }
            },
            /* 主题色 */
            themeColor: {
                type: String,
                default: '#7f3e74'
            }
        },
        watch: {
            pickerList(oldVal, newVal) {
                this.pickerListChange = true;
            },
            mode(oldVal, newVal) {
                this.modeChange = true;
            },
			pickerList(val){
				this.initPicker(val);
			}
        },
        methods: {
			input(e){
				var text = e.detail.value;
				var list = this.pickerList;
				this.pickerArray = [];
				if(text != ''){
					var id = 0;
					for(var i = 0; i < list.length;i++){
						var label = list[i].label;
						var array = label.indexOf(text);
						if(array >= 0){
							this.pickerArray.push(list[i])
						}
					}
				}else{
                    this.initPicker(list);
				}
				
			},
            initPicker(valueArray) {
				for(var i = 0; i < valueArray.length;i++){
					valueArray[i].index = i;
				}
                let pickerList = valueArray;
                this.pickerValue = this.pickerNumber;
				this.pickerArray = valueArray;
            },
            show() {
				setTimeout(() => {
                    this.initPicker(this.pickerList);
					if (this.pickerListChange || this.modeChange) {
						this.showPicker = true;
						this.pickerListChange = false;
						this.modeChange = false;
					} else {
						this.showPicker = true;
					}
				}, 0);
			},
            maskClick() {
                this.pickerCancel();
            },
            pickerCancel(index) {
                this.showPicker = false;
                this._initPickerVale();
                let pickObj = {
					index: this.getPickerValue(this.pickerValue).index,
                    type: this.getPickerValue(this.pickerValue).type,
					title: this.getPickerValue(this.pickerValue).title,
					item: this.getPickerValue(this.pickerValue).item
                };
				this.screen = '';
				var list = this.pickerList;
				this.pickerArray = list;
                this.$emit('onCancel', pickObj);
            },
            pickerConfirm(index) {
                this.showPicker = false;
                this._initPickerVale();
                let pickObj = {
					index: this.getPickerValue(this.pickerValue).index,
                    type: this.getPickerValue(this.pickerValue).type,
					title: this.getPickerValue(this.pickerValue).title,
					item: this.getPickerValue(this.pickerValue).item
                };
				this.screen = '';
				var list = this.pickerList;
				this.pickerArray = list;
                this.$emit('onConfirm', pickObj);
            },
            showPickerView() {
                this.showPicker = true;
            },
            pickerChange(e) {
				var index = e.mp.detail.value;
				this.pickIndex = index;
                this.pickerValue = index;
                let pickObj = {
					index: this.getPickerValue(this.pickerValue).index,
                    type: this.getPickerValue(this.pickerValue).type,
					title: this.getPickerValue(this.pickerValue).title,
					item: this.getPickerValue(this.pickerValue).item
                };
                this.$emit('onChange', pickObj);
            },
            // 获取 pxikerLabel
            getPickerValue(value) {
				let pickerIndex = this.pickerArray[value].index;
				let pickerType = this.pickerArray[value].value;
				let pickerTitle = this.pickerArray[value].label;
				let pickerItem = this.pickerArray[value].item;
                return {
					index: pickerIndex,
					type: pickerType,
                    title: pickerTitle,
                    item: pickerItem
                };
            },
            // 初始化 pickerValue 默认值
            _initPickerVale() {
                if (this.pickerValue.length === 0) {
					this.pickerValue = [0];
                }
            }
        }
    };
</script>

<style>
    .pickerMask {
        position: fixed;
        z-index: 1000;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
    }

    .mpvue-picker-content {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        transition: all 0.3s ease;
        transform: translateY(100%);
        z-index: 3000;
    }

    .mpvue-picker-view-show {
        transform: translateY(0);
    }

    .mpvue-picker__hd {
        display: flex;
        padding: 10upx 30upx;
		line-height: 60upx;
        background-color: #fff;
        position: relative;
        text-align: center;
        font-size: 34upx;
    }

	.uni-picker-view-mask{
		padding-top: 400upx;
	}
    .mpvue-picker__hd:after {
        content: ' ';
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 2upx;
        border-bottom: 2upx solid #e5e5e5;
        color: #e5e5e5;
        transform-origin: 0 100%;
        transform: scaleY(0.5);
    }

    .mpvue-picker__action {
        display: block;
		width: 100upx;
        flex: 1;
        color: #1aad19;
    }
	.pvue-picker__input,.pvue-picker__input1{
		width: calc(100% - 280upx);
		margin: 0 40upx;
	}
	.pvue-picker__input{
		color: #888888;
		height: 56upx;
		line-height: 56upx;
		border-radius: 10upx;
	}

    .mpvue-picker__action:first-child {
        text-align: left;
        color: #888;
    }

    .mpvue-picker__action:last-child {
        text-align: right;
    }

    .picker-item {
        text-align: center;
        line-height: 80upx;
        font-size: 32upx;
    }

    .mpvue-picker-view {
        position: relative;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 476upx;
        background-color: rgba(255, 255, 255, 1);
    }
</style>
