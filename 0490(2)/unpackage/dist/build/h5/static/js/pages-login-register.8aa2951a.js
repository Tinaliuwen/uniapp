(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-register"],{"11af":function(e,t,i){"use strict";var n=i("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(i("f550")),o={data:function(){return{openid:"",countDown:!1,timestamp:59,codeText:"验证码",invite:"",disabled:!1,phone:"",code:"",name:"",password:"",password2:"",pay:"",pay2:"",mid:"",icode:"",logo:""}},onLoad:function(e){this.invite=uni.getStorageSync("icode"),console.log(this.invite),this.openid=uni.getStorageSync("openid"),console.log(this.invite),e.val&&(this.openid=e.val)},methods:{getLogo:function(){var e=this;e.$http.get(a.default.api.login.info,{}).then((function(t){e.logo=t.data.site_icon}))},jump:function(e){uni.navigateTo({url:e})},register:function(){var e=this;e.phone?e.password?e.password==e.password2?e.$http.post(a.default.api.login.register,{icode:e.invite,account:e.phone,password:e.password,type:"",value:e.openid,code:e.code,nickname:e.name}).then((function(t){console.log(t),1==t.code?(e.$api.msg("绑定成功"),uni.setStorageSync("token",t.data.token),uni.setStorageSync("authorization","Bearer "+t.data.token),setTimeout((function(){uni.switchTab({url:"/pages/main/index"})}),500)):e.$api.msg(t.info)})):e.$api.msg("登录密码不一致"):e.$api.msg("请输入密码"):e.$api.msg("请输入手机号码")},getCode:function(){var e=this;""!=e.phone?/^1[3-9][0-9]\d{8,11}$/.test(e.phone)?e.$http.get(a.default.api.login.code,{mobile:e.phone,temp:"sms_reg"}).then((function(t){console.log(t),1===t.code?(e.countDown=!e.countDown,e.$api.msg("验证码发送成功"),e.codeText="重新获取验证码"):e.$api.msg(t.info)})):uni.showToast({icon:"none",title:"手机号码格式不正确"}):e.$api.msg("请输入手机号")},countDownEnd:function(){this.countDown=!this.countDown,console.log("重新获取验证码")},changes:function(){}}};t.default=o},"13c4":function(e,t,i){var n=i("57aa");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=i("4f06").default;a("25a42034",n,!0,{sourceMap:!1,shadowMode:!1})},"57aa":function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */@font-face{font-family:uniicons;font-weight:400;font-style:normal;src:url(https://img-cdn-qiniu.dcloud.net.cn/fonts/uni.ttf) format("truetype")}\r\n/*通用 */uni-view[data-v-f845c86e]{font-size:%?28?% \r\n\t/* line-height:1.8; */}uni-progress[data-v-f845c86e], uni-checkbox-group[data-v-f845c86e]{width:100%}uni-form[data-v-f845c86e]{width:100%}.uni-flex[data-v-f845c86e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}.uni-flex-item[data-v-f845c86e]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.uni-row[data-v-f845c86e]{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}.uni-column[data-v-f845c86e]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-link[data-v-f845c86e]{color:#576b95;font-size:%?26?%}.uni-center[data-v-f845c86e]{text-align:center}.uni-inline-item[data-v-f845c86e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.uni-inline-item uni-text[data-v-f845c86e]{margin-right:%?20?%}.uni-inline-item uni-text[data-v-f845c86e]:last-child{margin-right:%?0?%;margin-left:%?20?%}\r\n/* page */\r\n/* .uni-page-head{\r\n\tpadding:35upx; \r\n\ttext-align: center;\r\n}\r\n.uni-page-head-title {\r\n\tdisplay: inline-block;\r\n\tpadding: 0 40upx;\r\n\tfont-size: 30upx;\r\n\theight: 88upx;\r\n\tline-height: 88upx;\r\n\tcolor: #BEBEBE;\r\n\tbox-sizing: border-box;\r\n\tborder-bottom: 2upx solid #D8D8D8;\r\n}\r\n.uni-page-body {\r\n\twidth: 100%;\r\n\tflex-grow: 1;\r\n\toverflow-x: hidden;\r\n} */.uni-padding-wrap[data-v-f845c86e],.swiper[data-v-f845c86e]{width:100%}.banner-image[data-v-f845c86e]{width:100%;height:100%}.uni-word[data-v-f845c86e]{text-align:center;padding:%?200?% %?100?%}.uni-title[data-v-f845c86e]{font-size:%?30?%;font-weight:500;padding:%?20?% 0;line-height:1.5}.uni-text[data-v-f845c86e]{font-size:%?28?%}.uni-title uni-text[data-v-f845c86e]{font-size:%?24?%;color:#888}.uni-text-gray[data-v-f845c86e]{color:#ccc}.uni-text-small[data-v-f845c86e]{font-size:%?24?%}.uni-common-mb[data-v-f845c86e]{margin-bottom:%?30?%}.uni-common-pb[data-v-f845c86e]{padding-bottom:%?30?%}.uni-common-pl[data-v-f845c86e]{padding-left:%?30?%}.uni-common-mt[data-v-f845c86e]{margin-top:%?30?%}\r\n/* 背景色 */.uni-bg-red[data-v-f845c86e]{background:#f76260;color:#fff}.uni-bg-green[data-v-f845c86e]{background:#09bb07;color:#fff}.uni-bg-blue[data-v-f845c86e]{background:#007aff;color:#fff}\r\n/* 标题 */.uni-h1[data-v-f845c86e]{font-size:%?80?%;font-weight:700}.uni-h2[data-v-f845c86e]{font-size:%?60?%;font-weight:700}.uni-h3[data-v-f845c86e]{font-size:%?48?%;font-weight:700}.uni-h4[data-v-f845c86e]{font-size:%?36?%;font-weight:700}.uni-h5[data-v-f845c86e]{font-size:%?28?%;color:#8f8f94}.uni-h6[data-v-f845c86e]{font-size:%?24?%;color:#8f8f94}.uni-bold[data-v-f845c86e]{font-weight:700}\r\n/* 文本溢出隐藏 */.uni-ellipsis[data-v-f845c86e]{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}\r\n/* 竖向百分百按钮 */.uni-btn-v[data-v-f845c86e]{padding:%?10?% 0}.uni-btn-v uni-button[data-v-f845c86e]{margin:%?20?% 0}\r\n/* 表单 */.uni-form-item[data-v-f845c86e]{display:-webkit-box;display:-webkit-flex;display:flex;width:100%;padding:%?10?% 0}.uni-form-item .title[data-v-f845c86e]{padding:%?10?% %?25?%}.uni-label[data-v-f845c86e]{width:%?210?%;word-wrap:break-word;word-break:break-all;text-indent:%?20?%}.uni-input[data-v-f845c86e]{height:%?50?%;padding:%?15?% %?25?%;line-height:%?50?%;font-size:%?28?%;background:#fff;-webkit-box-flex:1;-webkit-flex:1;flex:1}uni-radio-group[data-v-f845c86e], uni-checkbox-group[data-v-f845c86e]{width:100%}uni-radio-group uni-label[data-v-f845c86e], uni-checkbox-group uni-label[data-v-f845c86e]{padding-right:%?20?%}.uni-form-item .with-fun[data-v-f845c86e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:nowrap;flex-wrap:nowrap;background:#fff}.uni-form-item .with-fun .uni-icon[data-v-f845c86e]{width:40px;height:%?80?%;line-height:%?80?%;-webkit-flex-shrink:0;flex-shrink:0}\r\n/* loadmore */.uni-loadmore[data-v-f845c86e]{height:%?80?%;line-height:%?80?%;text-align:center;padding-bottom:%?30?%}\r\n/*数字角标*/.uni-badge[data-v-f845c86e],\r\n.uni-badge-default[data-v-f845c86e]{font-family:Helvetica Neue,Helvetica,sans-serif;font-size:12px;line-height:1;display:inline-block;padding:3px 6px;color:#333;border-radius:100px;background-color:rgba(0,0,0,.15)}.uni-badge.uni-badge-inverted[data-v-f845c86e]{padding:0 5px 0 0;color:#929292;background-color:initial}.uni-badge-primary[data-v-f845c86e]{color:#fff;background-color:#007aff}.uni-badge-blue.uni-badge-inverted[data-v-f845c86e],\r\n.uni-badge-primary.uni-badge-inverted[data-v-f845c86e]{color:#007aff;background-color:initial}.uni-badge-green[data-v-f845c86e],\r\n.uni-badge-success[data-v-f845c86e]{color:#fff;background-color:#4cd964}.uni-badge-green.uni-badge-inverted[data-v-f845c86e],\r\n.uni-badge-success.uni-badge-inverted[data-v-f845c86e]{color:#4cd964;background-color:initial}.uni-badge-warning[data-v-f845c86e],\r\n.uni-badge-yellow[data-v-f845c86e]{color:#fff;background-color:#f0ad4e}.uni-badge-warning.uni-badge-inverted[data-v-f845c86e],\r\n.uni-badge-yellow.uni-badge-inverted[data-v-f845c86e]{color:#f0ad4e;background-color:initial}.uni-badge-danger[data-v-f845c86e],\r\n.uni-badge-red[data-v-f845c86e]{color:#fff;background-color:#dd524d}.uni-badge-danger.uni-badge-inverted[data-v-f845c86e],\r\n.uni-badge-red.uni-badge-inverted[data-v-f845c86e]{color:#dd524d;background-color:initial}.uni-badge-purple[data-v-f845c86e],\r\n.uni-badge-royal[data-v-f845c86e]{color:#fff;background-color:#8a6de9}.uni-badge-purple.uni-badge-inverted[data-v-f845c86e],\r\n.uni-badge-royal.uni-badge-inverted[data-v-f845c86e]{color:#8a6de9;background-color:initial}\r\n/*折叠面板 */.uni-collapse-content[data-v-f845c86e]{height:0;width:100%;overflow:hidden}.uni-collapse-content.uni-active[data-v-f845c86e]{height:auto}\r\n/*卡片视图 */.uni-card[data-v-f845c86e]{background:#fff;border-radius:%?8?%;box-shadow:0 %?2?% %?4?% rgba(0,0,0,.3)}.uni-card-content[data-v-f845c86e]{font-size:%?30?%}.uni-card-content.image-view[data-v-f845c86e]{width:100%;margin:0}.uni-card-content-inner[data-v-f845c86e]{position:relative;padding:%?30?%}.uni-card-footer[data-v-f845c86e],\r\n.uni-card-header[data-v-f845c86e]{position:relative;display:-webkit-box;display:-webkit-flex;display:flex;min-height:%?50?%;padding:%?20?% %?30?%;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.uni-card-header[data-v-f845c86e]{font-size:%?36?%}.uni-card-footer[data-v-f845c86e]{color:#6d6d72}.uni-card-footer[data-v-f845c86e]:before,\r\n.uni-card-header[data-v-f845c86e]:after{position:absolute;top:0;right:0;left:0;height:%?2?%;content:"";-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.uni-card-header[data-v-f845c86e]:after{top:auto;bottom:0}.uni-card-media[data-v-f845c86e]{-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.uni-card-media-logo[data-v-f845c86e]{height:%?84?%;width:%?84?%;margin-right:%?20?%}.uni-card-media-body[data-v-f845c86e]{height:%?84?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}.uni-card-media-text-top[data-v-f845c86e]{line-height:%?36?%;font-size:%?34?%}.uni-card-media-text-bottom[data-v-f845c86e]{line-height:%?30?%;font-size:%?28?%;color:#8f8f94}.uni-card-link[data-v-f845c86e]{color:#007aff}\r\n/* 列表 */.uni-list[data-v-f845c86e]{background-color:#fff;position:relative;width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-list[data-v-f845c86e]:after{position:absolute;z-index:10;right:0;bottom:0;left:0;height:1px;content:"";-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.uni-list[data-v-f845c86e]::before{position:absolute;z-index:10;right:0;top:0;left:0;height:1px;content:"";-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.uni-list-cell[data-v-f845c86e]{position:relative;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.uni-list-cell-hover[data-v-f845c86e]{background-color:#eee}.uni-list-cell-pd[data-v-f845c86e]{padding:%?22?% %?30?%}.uni-list-cell-left[data-v-f845c86e]{font-size:%?28?%;padding:0 %?30?%}.uni-list-cell-db[data-v-f845c86e],\r\n.uni-list-cell-right[data-v-f845c86e]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.uni-list-cell[data-v-f845c86e]::after{position:absolute;z-index:3;right:0;bottom:0;left:%?30?%;height:1px;content:"";-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.uni-list .uni-list-cell[data-v-f845c86e]:last-child::after{height:%?0?%}.uni-list-cell-last.uni-list-cell[data-v-f845c86e]::after{height:%?0?%}.uni-list-cell-divider[data-v-f845c86e]{position:relative;display:-webkit-box;display:-webkit-flex;display:flex;color:#999;background-color:#f7f7f7;padding:%?15?% %?20?%}.uni-list-cell-divider[data-v-f845c86e]::before{position:absolute;right:0;top:0;left:0;height:1px;content:"";-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.uni-list-cell-divider[data-v-f845c86e]::after{position:absolute;right:0;bottom:0;left:%?0?%;height:1px;content:"";-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.uni-list-cell-navigate[data-v-f845c86e]{font-size:%?30?%;padding:%?22?% %?30?%;line-height:%?48?%;position:relative;display:-webkit-box;display:-webkit-flex;display:flex;box-sizing:border-box;width:100%;-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.uni-list-cell-navigate[data-v-f845c86e]{padding-right:%?36?%}.uni-navigate-badge[data-v-f845c86e]{padding-right:%?50?%}.uni-list-cell-navigate.uni-navigate-right[data-v-f845c86e]:after{font-family:uniicons;content:"\\e583";position:absolute;right:%?24?%;top:50%;color:#bbb;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.uni-list-cell-navigate.uni-navigate-bottom[data-v-f845c86e]:after{font-family:uniicons;content:"\\e581";position:absolute;right:%?24?%;top:50%;color:#bbb;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.uni-list-cell-navigate.uni-navigate-bottom.uni-active[data-v-f845c86e]::after{font-family:uniicons;content:"\\e580";position:absolute;right:%?24?%;top:50%;color:#bbb;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.uni-collapse.uni-list-cell[data-v-f845c86e]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-list-cell-navigate.uni-active[data-v-f845c86e]{background:#eee}.uni-list.uni-collapse[data-v-f845c86e]{box-sizing:border-box;height:0;overflow:hidden}.uni-collapse .uni-list-cell[data-v-f845c86e]{padding-left:%?20?%}.uni-collapse .uni-list-cell[data-v-f845c86e]::after{left:%?52?%}.uni-list.uni-active[data-v-f845c86e]{height:auto}\r\n/* 三行列表 */.uni-triplex-row[data-v-f845c86e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-flex:1;-webkit-flex:1;flex:1;width:100%;box-sizing:border-box;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;padding:%?22?% %?30?%}.uni-triplex-right[data-v-f845c86e],\r\n.uni-triplex-left[data-v-f845c86e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-triplex-left[data-v-f845c86e]{width:84%}.uni-triplex-left .uni-title[data-v-f845c86e]{padding:%?8?% 0}.uni-triplex-left .uni-text[data-v-f845c86e], .uni-triplex-left .uni-text-small[data-v-f845c86e]{color:#999}.uni-triplex-right[data-v-f845c86e]{width:16%;text-align:right}\r\n/* 图文列表 */.uni-media-list[data-v-f845c86e]{padding:%?22?% %?30?%;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;width:100%;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}.uni-navigate-right.uni-media-list[data-v-f845c86e]{padding-right:%?74?%}.uni-pull-right[data-v-f845c86e]{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-webkit-flex-direction:row-reverse;flex-direction:row-reverse}.uni-pull-right>.uni-media-list-logo[data-v-f845c86e]{margin-right:%?0?%;margin-left:%?20?%}.uni-media-list-logo[data-v-f845c86e]{height:%?84?%;width:%?84?%;margin-right:%?20?%}.uni-media-list-logo uni-image[data-v-f845c86e]{height:100%;width:100%}.uni-media-list-body[data-v-f845c86e]{height:%?84?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;overflow:hidden}.uni-media-list-text-top[data-v-f845c86e]{width:100%;line-height:%?36?%;font-size:%?30?%}.uni-media-list-text-bottom[data-v-f845c86e]{width:100%;line-height:%?30?%;font-size:%?26?%;color:#8f8f94}\r\n/* 九宫格 */.uni-grid-9[data-v-f845c86e]{background:#f2f2f2;width:%?750?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;flex-wrap:wrap;border-top:%?2?% solid #eee}.uni-grid-9-item[data-v-f845c86e]{width:%?250?%;height:%?200?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;border-bottom:%?2?% solid;border-right:%?2?% solid;border-color:#eee;box-sizing:border-box}.no-border-right[data-v-f845c86e]{border-right:none}.uni-grid-9-image[data-v-f845c86e]{width:%?100?%;height:%?100?%}.uni-grid-9-text[data-v-f845c86e]{width:%?250?%;line-height:%?4?%;height:%?40?%;text-align:center;font-size:%?30?%}.uni-grid-9-item-hover[data-v-f845c86e]{background:rgba(0,0,0,.1)}\r\n/* 上传 */.uni-uploader[data-v-f845c86e]{-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-uploader-head[data-v-f845c86e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.uni-uploader-info[data-v-f845c86e]{color:#b2b2b2}.uni-uploader-body[data-v-f845c86e]{margin-top:%?16?%}.uni-uploader__files[data-v-f845c86e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;flex-wrap:wrap}.uni-uploader__file[data-v-f845c86e]{margin:%?10?%;width:%?210?%;height:%?210?%}.uni-uploader__img[data-v-f845c86e]{display:block;width:%?210?%;height:%?210?%}.uni-uploader__input-box[data-v-f845c86e]{position:relative;margin:%?10?%;width:%?208?%;height:%?208?%;border:%?2?% solid #d9d9d9}.uni-uploader__input-box[data-v-f845c86e]:before,\r\n.uni-uploader__input-box[data-v-f845c86e]:after{content:" ";position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:#d9d9d9}.uni-uploader__input-box[data-v-f845c86e]:before{width:%?4?%;height:%?79?%}.uni-uploader__input-box[data-v-f845c86e]:after{width:%?79?%;height:%?4?%}.uni-uploader__input-box[data-v-f845c86e]:active{border-color:#999}.uni-uploader__input-box[data-v-f845c86e]:active:before,\r\n.uni-uploader__input-box[data-v-f845c86e]:active:after{background-color:#999}.uni-uploader__input[data-v-f845c86e]{position:absolute;z-index:1;top:0;left:0;width:100%;height:100%;opacity:0}\r\n/*问题反馈*/.feedback-title[data-v-f845c86e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:%?20?%;color:#8f8f94;font-size:%?28?%}.feedback-star-view.feedback-title[data-v-f845c86e]{-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;margin:0}.feedback-quick[data-v-f845c86e]{position:relative;padding-right:%?40?%}.feedback-quick[data-v-f845c86e]:after{font-family:uniicons;font-size:%?40?%;content:"\\e581";position:absolute;right:0;top:50%;color:#bbb;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.feedback-body[data-v-f845c86e]{background:#fff}.feedback-textare[data-v-f845c86e]{height:%?200?%;font-size:%?34?%;line-height:%?50?%;width:100%;box-sizing:border-box;padding:%?20?% %?30?% 0}.feedback-input[data-v-f845c86e]{font-size:%?34?%;height:%?50?%;min-height:%?50?%;padding:%?15?% %?20?%;line-height:%?50?%}.feedback-uploader[data-v-f845c86e]{padding:%?22?% %?20?%}.feedback-star[data-v-f845c86e]{font-family:uniicons;font-size:%?40?%;margin-left:%?6?%}.feedback-star-view[data-v-f845c86e]{margin-left:%?20?%}.feedback-star[data-v-f845c86e]:after{content:"\\e408"}.feedback-star.active[data-v-f845c86e]{color:#ffb400}.feedback-star.active[data-v-f845c86e]:after{content:"\\e438"}.feedback-submit[data-v-f845c86e]{background:#007aff;color:#fff;margin:%?20?%}\r\n/* input group */.uni-input-group[data-v-f845c86e]{position:relative;padding:0;border:0;background-color:#fff}.uni-input-group[data-v-f845c86e]:before{position:absolute;top:0;right:0;left:0;height:%?2?%;content:"";-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.uni-input-group[data-v-f845c86e]:after{position:absolute;right:0;bottom:0;left:0;height:%?2?%;content:"";-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.uni-input-row[data-v-f845c86e]{position:relative;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;font-size:%?28?%;padding:%?22?% %?30?%;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.uni-input-group .uni-input-row[data-v-f845c86e]:after{position:absolute;right:0;bottom:0;left:%?30?%;height:%?2?%;content:"";-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.uni-input-row uni-label[data-v-f845c86e]{line-height:%?70?%}\r\n/* textarea */.uni-textarea[data-v-f845c86e]{width:100%;background:#fff}.uni-textarea uni-textarea[data-v-f845c86e]{width:96%;padding:%?18?% 2%;line-height:1.6;font-size:%?28?%;height:%?150?%}\r\n/* tab bar */.uni-tab-bar[data-v-f845c86e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;overflow:hidden;height:100%}.uni-tab-bar .list[data-v-f845c86e]{width:%?750?%;height:100%}.uni-swiper-tab[data-v-f845c86e]{width:100%;white-space:nowrap;line-height:%?100?%;height:%?100?%;border-bottom:1px solid #c8c7cc}.swiper-tab-list[data-v-f845c86e]{font-size:%?30?%;width:%?150?%;display:inline-block;text-align:center;color:#555}.uni-tab-bar .active[data-v-f845c86e]{color:#007aff}.uni-tab-bar .swiper-box[data-v-f845c86e]{-webkit-box-flex:1;-webkit-flex:1;flex:1;width:100%;height:calc(100% - %?100?%)}.uni-tab-bar-loading[data-v-f845c86e]{padding:%?20?% 0}\r\n/* comment */.uni-comment[data-v-f845c86e]{padding:%?5?% 0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-flex:1;-webkit-flex-grow:1;flex-grow:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-comment-list[data-v-f845c86e]{-webkit-flex-wrap:nowrap;flex-wrap:nowrap;padding:%?10?% 0;margin:%?10?% 0;width:100%;display:-webkit-box;display:-webkit-flex;display:flex}.uni-comment-face[data-v-f845c86e]{width:%?70?%;height:%?70?%;border-radius:100%;margin-right:%?20?%;-webkit-flex-shrink:0;flex-shrink:0;overflow:hidden}.uni-comment-face uni-image[data-v-f845c86e]{width:100%;border-radius:100%}.uni-comment-body[data-v-f845c86e]{width:100%}.uni-comment-top[data-v-f845c86e]{line-height:1.5em;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.uni-comment-top uni-text[data-v-f845c86e]{color:#0a98d5;font-size:%?24?%}.uni-comment-date[data-v-f845c86e]{line-height:%?38?%;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;display:-webkit-box!important;display:-webkit-flex!important;display:flex!important;-webkit-box-flex:1;-webkit-flex-grow:1;flex-grow:1}.uni-comment-date uni-view[data-v-f845c86e]{color:#666;font-size:%?24?%;line-height:%?38?%}.uni-comment-content[data-v-f845c86e]{line-height:1.6em;font-size:%?28?%;padding:%?8?% 0}.uni-comment-replay-btn[data-v-f845c86e]{background:#fff;font-size:%?24?%;line-height:%?28?%;padding:%?5?% %?20?%;border-radius:%?30?%;color:#333!important;margin:0 %?10?%}\r\n/* swiper msg */.uni-swiper-msg[data-v-f845c86e]{width:100%;padding:%?12?% 0;-webkit-flex-wrap:nowrap;flex-wrap:nowrap;display:-webkit-box;display:-webkit-flex;display:flex}.uni-swiper-msg-icon[data-v-f845c86e]{width:%?50?%;margin-right:%?20?%}.uni-swiper-msg-icon uni-image[data-v-f845c86e]{width:100%;-webkit-flex-shrink:0;flex-shrink:0}.uni-swiper-msg uni-swiper[data-v-f845c86e]{width:100%;height:%?50?%}.uni-swiper-msg uni-swiper-item[data-v-f845c86e]{line-height:%?50?%}\r\n/* product */.uni-product-list[data-v-f845c86e]{display:-webkit-box;display:-webkit-flex;display:flex;width:100%;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}.uni-product[data-v-f845c86e]{padding:%?20?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.image-view[data-v-f845c86e]{height:%?330?%;width:%?330?%;margin:%?12?% 0}.uni-product-image[data-v-f845c86e]{height:%?330?%;width:%?330?%}.uni-product-title[data-v-f845c86e]{width:%?300?%;word-break:break-all;display:-webkit-box;overflow:hidden;line-height:1.5;text-overflow:ellipsis;-webkit-box-orient:vertical;-webkit-line-clamp:2}.uni-product-price[data-v-f845c86e]{margin-top:%?10?%;font-size:%?28?%;line-height:1.5;position:relative}.uni-product-price-original[data-v-f845c86e]{color:#e80080}.uni-product-price-favour[data-v-f845c86e]{color:#888;text-decoration:line-through;margin-left:%?10?%}.uni-product-tip[data-v-f845c86e]{position:absolute;right:%?10?%;background-color:#f33;color:#fff;padding:0 %?10?%;border-radius:%?5?%}\r\n/* timeline */.uni-timeline[data-v-f845c86e]{margin:%?35?% 0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;position:relative}.uni-timeline-item[data-v-f845c86e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;position:relative;padding-bottom:%?20?%;box-sizing:border-box;overflow:hidden}.uni-timeline-item .uni-timeline-item-keynode[data-v-f845c86e]{width:%?160?%;-webkit-flex-shrink:0;flex-shrink:0;box-sizing:border-box;padding-right:%?20?%;text-align:right;line-height:%?65?%}.uni-timeline-item .uni-timeline-item-divider[data-v-f845c86e]{-webkit-flex-shrink:0;flex-shrink:0;position:relative;width:%?30?%;height:%?30?%;top:%?15?%;border-radius:50%;background-color:#bbb}.uni-timeline-item-divider[data-v-f845c86e]::before,\r\n\t.uni-timeline-item-divider[data-v-f845c86e]::after{position:absolute;left:%?15?%;width:%?1?%;height:100vh;content:"";background:inherit}.uni-timeline-item-divider[data-v-f845c86e]::before{bottom:100%}.uni-timeline-item-divider[data-v-f845c86e]::after{top:100%}.uni-timeline-last-item .uni-timeline-item-divider[data-v-f845c86e]:after{display:none}.uni-timeline-first-item .uni-timeline-item-divider[data-v-f845c86e]:before{display:none}.uni-timeline-item .uni-timeline-item-content[data-v-f845c86e]{padding-left:%?20?%}.uni-timeline-last-item .bottom-border[data-v-f845c86e]::after{display:none}.uni-timeline-item-content .datetime[data-v-f845c86e]{color:#ccc}\r\n/* 自定义节点颜色 */.uni-timeline-last-item .uni-timeline-item-divider[data-v-f845c86e]{background-color:#1aad19}\r\n/* uni-icon */.uni-icon[data-v-f845c86e]{font-family:uniicons;font-size:24px;font-weight:400;font-style:normal;line-height:1;display:inline-block;text-decoration:none;-webkit-font-smoothing:antialiased}.uni-icon.uni-active[data-v-f845c86e]{color:#007aff}.uni-icon-contact[data-v-f845c86e]:before{content:"\\e100"}.uni-icon-person[data-v-f845c86e]:before{content:"\\e101"}.uni-icon-personadd[data-v-f845c86e]:before{content:"\\e102"}.uni-icon-contact-filled[data-v-f845c86e]:before{content:"\\e130"}.uni-icon-person-filled[data-v-f845c86e]:before{content:"\\e131"}.uni-icon-personadd-filled[data-v-f845c86e]:before{content:"\\e132"}.uni-icon-phone[data-v-f845c86e]:before{content:"\\e200"}.uni-icon-email[data-v-f845c86e]:before{content:"\\e201"}.uni-icon-chatbubble[data-v-f845c86e]:before{content:"\\e202"}.uni-icon-chatboxes[data-v-f845c86e]:before{content:"\\e203"}.uni-icon-phone-filled[data-v-f845c86e]:before{content:"\\e230"}.uni-icon-email-filled[data-v-f845c86e]:before{content:"\\e231"}.uni-icon-chatbubble-filled[data-v-f845c86e]:before{content:"\\e232"}.uni-icon-chatboxes-filled[data-v-f845c86e]:before{content:"\\e233"}.uni-icon-weibo[data-v-f845c86e]:before{content:"\\e260"}.uni-icon-weixin[data-v-f845c86e]:before{content:"\\e261"}.uni-icon-pengyouquan[data-v-f845c86e]:before{content:"\\e262"}.uni-icon-chat[data-v-f845c86e]:before{content:"\\e263"}.uni-icon-qq[data-v-f845c86e]:before{content:"\\e264"}.uni-icon-videocam[data-v-f845c86e]:before{content:"\\e300"}.uni-icon-camera[data-v-f845c86e]:before{content:"\\e301"}.uni-icon-mic[data-v-f845c86e]:before{content:"\\e302"}.uni-icon-location[data-v-f845c86e]:before{content:"\\e303"}.uni-icon-mic-filled[data-v-f845c86e]:before,\r\n.uni-icon-speech[data-v-f845c86e]:before{content:"\\e332"}.uni-icon-location-filled[data-v-f845c86e]:before{content:"\\e333"}.uni-icon-micoff[data-v-f845c86e]:before{content:"\\e360"}.uni-icon-image[data-v-f845c86e]:before{content:"\\e363"}.uni-icon-map[data-v-f845c86e]:before{content:"\\e364"}.uni-icon-compose[data-v-f845c86e]:before{content:"\\e400"}.uni-icon-trash[data-v-f845c86e]:before{content:"\\e401"}.uni-icon-upload[data-v-f845c86e]:before{content:"\\e402"}.uni-icon-download[data-v-f845c86e]:before{content:"\\e403"}.uni-icon-close[data-v-f845c86e]:before{content:"\\e404"}.uni-icon-redo[data-v-f845c86e]:before{content:"\\e405"}.uni-icon-undo[data-v-f845c86e]:before{content:"\\e406"}.uni-icon-refresh[data-v-f845c86e]:before{content:"\\e407"}.uni-icon-star[data-v-f845c86e]:before{content:"\\e408"}.uni-icon-plus[data-v-f845c86e]:before{content:"\\e409"}.uni-icon-minus[data-v-f845c86e]:before{content:"\\e410"}.uni-icon-circle[data-v-f845c86e]:before,\r\n.uni-icon-checkbox[data-v-f845c86e]:before{content:"\\e411"}.uni-icon-close-filled[data-v-f845c86e]:before,\r\n.uni-icon-clear[data-v-f845c86e]:before{content:"\\e434"}.uni-icon-refresh-filled[data-v-f845c86e]:before{content:"\\e437"}.uni-icon-star-filled[data-v-f845c86e]:before{content:"\\e438"}.uni-icon-plus-filled[data-v-f845c86e]:before{content:"\\e439"}.uni-icon-minus-filled[data-v-f845c86e]:before{content:"\\e440"}.uni-icon-circle-filled[data-v-f845c86e]:before{content:"\\e441"}.uni-icon-checkbox-filled[data-v-f845c86e]:before{content:"\\e442"}.uni-icon-closeempty[data-v-f845c86e]:before{content:"\\e460"}.uni-icon-refreshempty[data-v-f845c86e]:before{content:"\\e461"}.uni-icon-reload[data-v-f845c86e]:before{content:"\\e462"}.uni-icon-starhalf[data-v-f845c86e]:before{content:"\\e463"}.uni-icon-spinner[data-v-f845c86e]:before{content:"\\e464"}.uni-icon-spinner-cycle[data-v-f845c86e]:before{content:"\\e465"}.uni-icon-search[data-v-f845c86e]:before{content:"\\e466"}.uni-icon-plusempty[data-v-f845c86e]:before{content:"\\e468"}.uni-icon-forward[data-v-f845c86e]:before{content:"\\e470"}.uni-icon-back[data-v-f845c86e]:before,\r\n.uni-icon-left-nav[data-v-f845c86e]:before{content:"\\e471"}.uni-icon-checkmarkempty[data-v-f845c86e]:before{content:"\\e472"}.uni-icon-home[data-v-f845c86e]:before{content:"\\e500"}.uni-icon-navigate[data-v-f845c86e]:before{content:"\\e501"}.uni-icon-gear[data-v-f845c86e]:before{content:"\\e502"}.uni-icon-paperplane[data-v-f845c86e]:before{content:"\\e503"}.uni-icon-info[data-v-f845c86e]:before{content:"\\e504"}.uni-icon-help[data-v-f845c86e]:before{content:"\\e505"}.uni-icon-locked[data-v-f845c86e]:before{content:"\\e506"}.uni-icon-more[data-v-f845c86e]:before{content:"\\e507"}.uni-icon-flag[data-v-f845c86e]:before{content:"\\e508"}.uni-icon-home-filled[data-v-f845c86e]:before{content:"\\e530"}.uni-icon-gear-filled[data-v-f845c86e]:before{content:"\\e532"}.uni-icon-info-filled[data-v-f845c86e]:before{content:"\\e534"}.uni-icon-help-filled[data-v-f845c86e]:before{content:"\\e535"}.uni-icon-more-filled[data-v-f845c86e]:before{content:"\\e537"}.uni-icon-settings[data-v-f845c86e]:before{content:"\\e560"}.uni-icon-list[data-v-f845c86e]:before{content:"\\e562"}.uni-icon-bars[data-v-f845c86e]:before{content:"\\e563"}.uni-icon-loop[data-v-f845c86e]:before{content:"\\e565"}.uni-icon-paperclip[data-v-f845c86e]:before{content:"\\e567"}.uni-icon-eye[data-v-f845c86e]:before{content:"\\e568"}.uni-icon-arrowup[data-v-f845c86e]:before{content:"\\e580"}.uni-icon-arrowdown[data-v-f845c86e]:before{content:"\\e581"}.uni-icon-arrowleft[data-v-f845c86e]:before{content:"\\e582"}.uni-icon-arrowright[data-v-f845c86e]:before{content:"\\e583"}.uni-icon-arrowthinup[data-v-f845c86e]:before{content:"\\e584"}.uni-icon-arrowthindown[data-v-f845c86e]:before{content:"\\e585"}.uni-icon-arrowthinleft[data-v-f845c86e]:before{content:"\\e586"}.uni-icon-arrowthinright[data-v-f845c86e]:before{content:"\\e587"}.uni-icon-pulldown[data-v-f845c86e]:before{content:"\\e588"}.uni-icon-scan[data-v-f845c86e]:before{content:"\\e612"}\r\n/* 分界线 */.uni-divider[data-v-f845c86e]{height:%?110?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;position:relative}.uni-divider__content[data-v-f845c86e]{font-size:%?28?%;color:#999;padding:0 %?20?%;position:relative;z-index:101;background:#f4f5f6}.uni-divider__line[data-v-f845c86e]{background-color:#ccc;height:1px;width:100%;position:absolute;z-index:100;top:50%;left:0;-webkit-transform:translateY(50%);transform:translateY(50%)}uni-page-body[data-v-f845c86e]{height:100%;overflow:hidden;background-color:#fff}.logo[data-v-f845c86e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.logo uni-image[data-v-f845c86e]{width:%?260?%;height:%?260?%;margin-top:%?80?%}.register[data-v-f845c86e]{height:100%;overflow:auto}.register .info[data-v-f845c86e]{padding:%?60?%}.register .info .box[data-v-f845c86e]{color:#999;border-bottom:%?2?% solid #f3f3f3;padding:%?26?% 0;position:relative}.register .info .box .title[data-v-f845c86e]{font-size:%?28?%}.register .info .box .inp .cl[data-v-f845c86e]{color:#999;font-size:%?32?%;font-weight:400}.register .info .box .inp uni-input[data-v-f845c86e]{color:#333;font-size:%?32?%;font-weight:700}.register .info .box .code[data-v-f845c86e]{width:%?136?%;height:%?58?%;line-height:%?58?%;text-align:center;background-color:#ff594d;border-radius:%?30?%;color:#fff;position:absolute;right:0;bottom:%?34?%}.register .info .more[data-v-f845c86e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;margin:%?20?% 0;color:#333}.register .info .more > uni-view[data-v-f845c86e]{font-size:%?32?%;color:#333}.register .btn[data-v-f845c86e]{width:%?630?%;height:%?100?%;line-height:%?100?%;text-align:center;background-color:#ff594d;border-radius:%?50?%;color:#fff;font-size:%?36?%;margin:%?20?% auto %?20?% auto;box-shadow:%?0?% %?4?% %?8?% %?0?% rgba(167,168,174,.3)}.register .agreement[data-v-f845c86e]{margin:%?20?% 0;color:#999;font-size:%?28?%;text-align:center;padding-bottom:%?40?%}.register .agreement uni-text[data-v-f845c86e]{color:#ff594d}body.?%PAGE?%[data-v-f845c86e]{background-color:#fff}',""]),e.exports=t},"99d2":function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return o})),i.d(t,"a",(function(){return n}));var n={uCountDown:i("b41d").default},a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"register"},[i("v-uni-view",{staticClass:"logo"},[i("v-uni-image",{attrs:{src:"/static/face.png",mode:""}})],1),i("v-uni-view",{staticClass:"info"},[i("v-uni-view",{staticClass:"box"},[i("v-uni-view",{staticClass:"title"},[e._v("邀请码")]),i("v-uni-view",{staticClass:"inp"},[i("v-uni-input",{attrs:{type:"text",value:"",placeholder:"请输入邀请码","placeholder-class":"cl",disabled:e.disabled},model:{value:e.invite,callback:function(t){e.invite=t},expression:"invite"}})],1)],1),i("v-uni-view",{staticClass:"box"},[i("v-uni-view",{staticClass:"title"},[e._v("真实姓名")]),i("v-uni-view",{staticClass:"inp"},[i("v-uni-input",{attrs:{type:"text",value:"",placeholder:"请输入真实姓名","placeholder-class":"cl"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1)],1),i("v-uni-view",{staticClass:"box"},[i("v-uni-view",{staticClass:"title"},[e._v("手机号码")]),i("v-uni-view",{staticClass:"inp"},[i("v-uni-input",{attrs:{type:"text",value:"",placeholder:"请输入手机号码","placeholder-class":"cl",maxlength:"11"},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}})],1)],1),i("v-uni-view",{staticClass:"box"},[i("v-uni-view",{staticClass:"title"},[e._v("验证码")]),i("v-uni-view",{staticClass:"inp"},[i("v-uni-input",{attrs:{type:"text",value:"",placeholder:"请输入验证码","placeholder-class":"cl"},model:{value:e.code,callback:function(t){e.code=t},expression:"code"}})],1),e.countDown?e._e():i("v-uni-view",{staticClass:"code",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.getCode.apply(void 0,arguments)}}},[e._v(e._s(e.codeText))]),e.countDown?i("v-uni-view",{staticClass:"code"},[i("u-count-down",{attrs:{timestamp:e.timestamp,"show-days":!1,"show-hours":!1,"show-minutes":!1,"bg-color":"#ff594d",color:"#fff"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.changes.apply(void 0,arguments)},end:function(t){arguments[0]=t=e.$handleEvent(t),e.countDownEnd.apply(void 0,arguments)}}})],1):e._e()],1),i("v-uni-view",{staticClass:"box"},[i("v-uni-view",{staticClass:"title"},[e._v("登录密码")]),i("v-uni-view",{staticClass:"inp"},[i("v-uni-input",{attrs:{type:"password",value:"",placeholder:"请输入登录密码","placeholder-class":"cl"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1)],1),i("v-uni-view",{staticClass:"box"},[i("v-uni-view",{staticClass:"title"},[e._v("确认登录密码")]),i("v-uni-view",{staticClass:"inp"},[i("v-uni-input",{attrs:{type:"password",value:"",placeholder:"请输入确认登录密码","placeholder-class":"cl"},model:{value:e.password2,callback:function(t){e.password2=t},expression:"password2"}})],1)],1)],1),i("v-uni-view",{staticClass:"btn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.register.apply(void 0,arguments)}}},[e._v("立即绑定")])],1)},o=[]},e06a:function(e,t,i){"use strict";i.r(t);var n=i("11af"),a=i.n(n);for(var o in n)"default"!==o&&function(e){i.d(t,e,(function(){return n[e]}))}(o);t["default"]=a.a},f0d1:function(e,t,i){"use strict";i.r(t);var n=i("99d2"),a=i("e06a");for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);i("f5a9");var c,r=i("f0c5"),d=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"f845c86e",null,!1,n["a"],c);t["default"]=d.exports},f5a9:function(e,t,i){"use strict";var n=i("13c4"),a=i.n(n);a.a}}]);