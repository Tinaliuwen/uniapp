(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-newPeople-newdetails"],{"2cbb":function(e,t,o){"use strict";o.d(t,"b",(function(){return r})),o.d(t,"c",(function(){return a})),o.d(t,"a",(function(){return i}));var i={uniIcons:o("56f1").default},r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"container"},[""!=e.order_no?i("v-uni-view",{staticClass:"top"},[i("v-uni-image",{staticClass:"o-img",attrs:{src:"/static/order/pay.png"}}),i("v-uni-view",{staticClass:"wzorder"},[[e._v("订单已完成")]],2),i("v-uni-view",{staticClass:"money"},[e._v("订单金额："),[e._v("￥"+e._s(e.realprice))]],2)],1):e._e(),""!=e.name?i("v-uni-view",{staticClass:"li-top"},[i("v-uni-image",{attrs:{src:o("52d9"),mode:"widthFix"}}),i("v-uni-view",{staticClass:"li-center"},[e._v("收货人信息")])],1):e._e(),""!=e.name?i("v-uni-view",{staticClass:"wrapper"},[i("v-uni-view",{staticClass:"u-box"},[i("v-uni-text",{staticClass:"name"},[e._v("收货人："+e._s(e.name))]),i("v-uni-text",{staticClass:"mobile"},[e._v(e._s(e.phone))])],1),i("v-uni-view",{staticClass:"address-box"},[i("v-uni-text",{staticClass:"address"},[e._v("收货地址："+e._s(e.province)+" "+e._s(e.city)+" "+e._s(e.area)+" "+e._s(e.address))])],1)],1):e._e(),e.express_info.length>0?i("v-uni-view",{staticClass:"li-top",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.express()}}},[i("v-uni-image",{attrs:{src:o("52d9"),mode:"widthFix"}}),i("v-uni-view",{staticClass:"li-center"},[e._v("物流信息")]),i("uni-icons",{staticClass:"top-icon",attrs:{size:"20",type:"forward"}})],1):e._e(),e.express_info.length>0?i("v-uni-view",{staticClass:"express"},[i("v-uni-view",{staticClass:"exp-top"},[e._v(e._s(e.exp_text))]),i("v-uni-view",{staticClass:"exp-time"},[e._v(e._s(e.exp_time))])],1):e._e(),e.goodsList.length>0?i("v-uni-view",{staticClass:"li-top"},[i("v-uni-image",{attrs:{src:o("52d9"),mode:"widthFix"}}),i("v-uni-view",{staticClass:"li-center"},[e._v("订单详情")])],1):e._e(),e.goodsList.length>0?i("v-uni-view",{staticClass:"li"},e._l(e.goodsList,(function(t,o){return i("v-uni-view",{key:o,staticClass:"li-cen",style:o>0?"border-top: 2upx solid #F2F2F2;":""},[i("v-uni-image",{staticClass:"cen-img",attrs:{src:t.logo,mode:""}}),i("v-uni-view",{staticClass:"cen-right"},[i("v-uni-view",{staticClass:"clamps title"},[e._v(e._s(t.title))]),i("v-uni-view",{staticClass:"price"},[i("v-uni-text",{staticStyle:{color:"#808080",float:"right"}},[e._v("共1件")])],1),i("v-uni-view",{staticClass:"price spec"},[e._v("价格："+e._s(e.realprice))])],1)],1)})),1):e._e(),""!=e.order_no?i("v-uni-view",{staticClass:"shop_price"},[i("v-uni-view",[e._v("商品小计："),i("v-uni-text",[e._v("￥"+e._s(e.realprice))])],1),3!=e.type?i("v-uni-view",[e._v("订单总额："),i("v-uni-text",[e._v("￥"+e._s(e.realprice))])],1):e._e()],1):e._e(),""!=e.order_no?i("v-uni-view",{staticClass:"order"},[i("v-uni-view",{staticClass:"type"},[e._v("订单单号："+e._s(e.order_no)),i("v-uni-text",{staticClass:"copy",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.copy(e.order_no)}}},[e._v("复制")])],1),i("v-uni-view",{staticClass:"type"},[e._v("创建时间："+e._s(e.create_at))])],1):e._e()],1)},a=[]},"3e59":function(e,t,o){"use strict";var i=o("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(o("f550")),a={components:{},data:function(){return{id:0,show_zfb:!0,show_wx:!0,seller:"小七",zfb:"1588886435334",province:"",city:"",area:"",address:"",name:"",phone:"",pay_state:"",goodsList:[],goods_logo:"",goods_title:"",number_goods:"",price_selling:"",priceselling:"0.00",priceexpress:"0.00",realprice:"0.00",remark:"",order_no:"",create_at:"",pay_no:"",pay_at:"",cancel_at:"",cancel_desc:"",refund_no:"",refund_price:"",refund_at:"",refund_desc:"",express_send_no:"",express_send_at:"",express_info:[],status:-1,exp_text:"",exp_time:"",refund_state:"",type:0,money:"",score:"",credit:"",avatar:"",avatar_wx:"",avatar_pay:"",zf_img:"",zf_imgwx:"",zf_imgpay:"",img_status:1,status_zfb:1,status_wx:1}},onLoad:function(e){var t=this;t.avatar=uni.getStorageSync("storage_img"),t.avatar_wx=uni.getStorageSync("storage_imgwx"),t.avatar_pay=uni.getStorageSync("storage_imgpay"),t.zf_imgpay=uni.getStorageSync("storage_setimgpay"),t.zf_img=uni.getStorageSync("storage_setimg"),t.zf_imgwx=uni.getStorageSync("storage_setimgwx"),t.money=r.default.config.money,t.score=r.default.config.score,t.id=e.orderid,t.$http.post(r.default.api.order.getNewOrdeail,{order_id:e.orderid}).then((function(e){1==e.code?(e=e.data,t.province=e.express_province,t.city=e.express_city,t.area=e.express_area,t.address=e.express_address,t.name=e.express_name,t.phone=e.express_phone,t.goodsList=e.allGoods,t.credit=e.credit,t.priceselling=e.price_goods,t.priceexpress=e.price_express,t.realprice=e.pay_price,t.remark=e.remark,t.order_no=e.order_no,t.create_at=e.create_at,t.pay_no=e.pay_no,t.pay_at=e.pay_at,t.cancel_at=e.cancel_at,t.cancel_desc=e.cancel_desc,t.refund_no=e.refund_no,t.refund_price=e.refund_price,t.refund_at=e.refund_at,t.refund_desc=e.refund_desc,t.express_send_no=e.express_send_no,t.express_send_at=e.express_send_at,t.status=e.status,t.pay_state=e.pay_state,t.refund_state=e.refund_state,t.type=e.type):uni.showToast({icon:"none",title:e.info})})),t.$http.post(r.default.api.order.express,{order_id:e.id}).then((function(e){1==e.code?(e=e.data,t.express_info=e.express_info):uni.showToast({icon:"none",title:e.info})}))},methods:{copy:function(e){uni.setClipboardData({data:e,success:function(e){uni.showToast({icon:"none",title:"复制成功"})}})}}};t.default=a},"52d9":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABVklEQVRoge2Y3Y2DQAyEtwRKGM00QAehBDo4SkgJlHAlXAnpIJRAB5cOkg7uHm6JEAKiSPben0fyE4o9n/GCSUqhUCgUCv03AagAHIyjKmUeJK+SPiyD5BUASgA01uanANC4A6SUEsle0mAZJPsi5n+1AFRe4zOdA1cASZ0nQI7WE+DkDUDy1cW89/jMAN5dACS1JQD09TitPQDeSgG4jBHJW0EA2zEqOT4uY/QAYNjp5Pjgzm3+1nStyAvclpGW5Lg1yztnZ9DGe4Xkxcz8DKJZQkyHDUBN8rIwcsrXqmWnSY7T5rkEJHlzeQrNzHQkj8si+VpLsl8zkBvQr41GbsBRUuv+XQCgBnCQ9GKVU1KXP2p8Or8odh8Hw5z3c2GVc69YAKzkDIBnigXASs4AeKbY3wGQdDaKbwOwDn+AvGF6Afj9IzFX3oca40AR86FQKBQK/SR9AgpDtF03bL1PAAAAAElFTkSuQmCC"},"559b":function(e,t,o){var i=o("24fb");t=i(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-0bec10b4]{background:#f2f2f2}.wzorder[data-v-0bec10b4]{font-size:%?40?%;margin-top:%?50?%}.container[data-v-0bec10b4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-webkit-flex:1;flex:1}.top[data-v-0bec10b4]{color:#fff;height:%?200?%;font-size:%?30?%;padding:0 %?40?%;\r\n  /* text-align: center; */margin-bottom:%?20?%;background:#f85a5e}.o-img[data-v-0bec10b4]{float:right;width:%?240?%;height:%?140?%;margin:%?30?% 0}.wz_border[data-v-0bec10b4]{width:105%;margin-left:-2.5%;margin-top:%?20?%;background:#f2f2f2;height:%?20?%}.status[data-v-0bec10b4]{margin-top:%?50?%;text-indent:bold;font-size:%?44?%;height:%?60?%;line-height:%?60?%}.money[data-v-0bec10b4]{margin-top:%?20?%}.seller[data-v-0bec10b4]{background:#fff;margin-top:%?20?%;\r\n  /* padding: 20rpx; */line-height:%?42?%}.seller .wz_rev[data-v-0bec10b4]{width:100%;position:relative}.seller .wz_right[data-v-0bec10b4]{display:initial;position:absolute;right:0}.wrap[data-v-0bec10b4]{display:-webkit-box;display:-webkit-flex;display:flex;height:%?90?%;line-height:%?90?%;position:relative}.wrap .u-avatar-wrap[data-v-0bec10b4]{position:absolute;right:0}.wrap .u-avatar-demo[data-v-0bec10b4]{width:%?60?%;height:%?60?%}.wrap .updateT[data-v-0bec10b4]{width:30%;height:%?64?%;border-radius:%?40?%;line-height:%?64?%;background:none;font-size:%?28?%;color:#7e7e7e;border:%?2?% solid #7e7e7e}.wrap .up_zfb[data-v-0bec10b4]{color:#818181;height:%?40?%;line-height:%?40?%;margin-top:%?24?%;padding:0 %?20?%;\r\n  /* margin-left: 30rpx; */border-radius:%?30?%;border:%?2?% solid #818181}.address-box[data-v-0bec10b4]{margin-top:%?20?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.address-box .tag[data-v-0bec10b4]{font-size:%?24?%;color:#f85a5e;margin-right:%?10?%;background:#fffafb;border:1px solid #f85a5e;border-radius:%?4?%;padding:%?4?% %?10?%;line-height:1}.address-box .address[data-v-0bec10b4]{padding-right:%?10?%;font-size:%?28?%;color:#909399}.wrapper[data-v-0bec10b4],\r\n.express[data-v-0bec10b4]{border-top:%?2?% solid #f1f1f1;background:#fff;margin-bottom:%?20?%;padding:0 %?20?% %?20?%}.exp-top[data-v-0bec10b4]{color:#f85a5e}.exp-time[data-v-0bec10b4]{color:#888;font-size:%?28?%}.u-box[data-v-0bec10b4]{font-size:%?30?%;color:#303133;margin:%?10?% 0}.u-box .name[data-v-0bec10b4]{margin-right:%?30?%}.icon-bianji[data-v-0bec10b4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:%?80?%;font-size:%?40?%;color:#909399;padding-left:%?30?%}.add-btn[data-v-0bec10b4]{position:fixed;left:%?30?%;right:%?30?%;bottom:%?16?%;z-index:95;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:%?690?%;height:%?80?%;font-size:%?32?%;color:#fff;background-color:#f85a5e;border-radius:%?10?%;box-shadow:1px 2px 5px rgba(219,63,96,.4)}.swiper-box[data-v-0bec10b4]{height:100%}.list-scroll-content[data-v-0bec10b4]{height:100%}.center[data-v-0bec10b4]{width:100%;height:100%;z-index:120;padding-top:%?80?%;position:absolute}\r\n/* .list{\r\n\tmargin-bottom: 100upx;\r\n} */.li[data-v-0bec10b4]{background:#fff;\r\n  /* border-radius: 20upx; */padding:0 0 %?20?%;margin-bottom:%?20?%\r\n  /* margin: 0 20upx; */\r\n  /* box-shadow: 0px 0px 5px #D3D3D3; */}.li-top[data-v-0bec10b4]{background:#fff;font-size:%?28?%;padding:%?20?%;display:-webkit-box;display:-webkit-flex;display:flex}.li-top uni-image[data-v-0bec10b4]{width:%?30?%;height:%?30?%;margin:%?4?%}.li-center[data-v-0bec10b4]{width:calc(100% - %?70?%)}.li-right[data-v-0bec10b4]{width:%?120?%;color:#f85a5e;text-align:right}.li-cen[data-v-0bec10b4]{display:-webkit-box;display:-webkit-flex;display:flex;margin:0 %?20?%;padding:%?10?% 0;border-top:%?2?% solid #f1f1f1}.cen-img[data-v-0bec10b4]{width:%?160?%;height:%?160?%}.cen-right[data-v-0bec10b4]{padding:%?0?% %?20?%;padding-right:0;width:calc(100% - %?180?%)}.title[data-v-0bec10b4]{height:%?80?%;font-size:%?28?%;line-height:%?40?%}.clamps[data-v-0bec10b4]{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.price[data-v-0bec10b4]{color:grey;font-size:%?28?%;line-height:%?40?%}.price uni-text[data-v-0bec10b4]{color:#f53f3f\r\n  /* float: right; */}.spec[data-v-0bec10b4]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block}.li-bum[data-v-0bec10b4]{height:%?120?%;background:#fff;padding:%?10?% 0;border-top:%?20?% solid #f2f2f2}.btn-left[data-v-0bec10b4],\r\n.btn-right[data-v-0bec10b4]{float:right;width:%?180?%;height:%?50?%;text-align:center;line-height:%?50?%;margin-right:%?20?%;border-radius:%?30?%}.btn-left[data-v-0bec10b4]{font-size:%?28?%;color:#7e7e7e;margin-top:%?16?%;border:%?2?% solid #7e7e7e}.btn-right[data-v-0bec10b4]{font-size:%?28?%;color:#f85a5e;border:%?2?% solid #f85a5e}.remark[data-v-0bec10b4]{font-size:%?28?%;padding:%?20?% %?20?% 0;border-top:%?2?% solid #f1f1f1}.shop_price[data-v-0bec10b4]{width:100%;height:%?183?%;line-height:%?50?%;box-sizing:border-box;padding:0 %?20?%;display:-webkit-box;display:-webkit-flex;display:flex;margin-bottom:%?20?%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;background:#fff;border-bottom:%?2?% solid #f2f2f2}.shop_price uni-view[data-v-0bec10b4]{width:100%;color:#333;font-size:%?28?%}.shop_price uni-text[data-v-0bec10b4]{float:right;padding-left:%?10?%;color:#f53f3f;font-size:%?28?%}.order[data-v-0bec10b4]{font-size:%?28?%;padding:%?20?%;line-height:%?50?%;background:#fff}.top-icon[data-v-0bec10b4]{float:right}.copy[data-v-0bec10b4]{color:#333;padding:0 %?20?%;background:#ebebeb;margin-left:%?30?%;border-radius:%?30?%}body.?%PAGE?%[data-v-0bec10b4]{background:#f2f2f2}',""]),e.exports=t},"7e55":function(e,t,o){"use strict";o.r(t);var i=o("3e59"),r=o.n(i);for(var a in i)"default"!==a&&function(e){o.d(t,e,(function(){return i[e]}))}(a);t["default"]=r.a},a5b0:function(e,t,o){"use strict";o.r(t);var i=o("2cbb"),r=o("7e55");for(var a in r)"default"!==a&&function(e){o.d(t,e,(function(){return r[e]}))}(a);o("ce61");var s,n=o("f0c5"),d=Object(n["a"])(r["default"],i["b"],i["c"],!1,null,"0bec10b4",null,!1,i["a"],s);t["default"]=d.exports},c562:function(e,t,o){var i=o("559b");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var r=o("4f06").default;r("25a13682",i,!0,{sourceMap:!1,shadowMode:!1})},ce61:function(e,t,o){"use strict";var i=o("c562"),r=o.n(i);r.a},f550:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var config={verify:5,version:"1.0.00",langtype:0,ios:"",android:"",appname:"诗涧书画院",uploadtype:1,invite:0,segm:"*"},User_paw=function(e,t){var o=[];o.push(e),o.push(t),uni.setStorageSync("User_paw",o)},Memory=function(e){uni.setStorageSync("memory",e)},language=[{id:"zh-cn",name:"中文",code:"chn"},{id:"en-us",name:"English",code:"eng"}],root="http://www.sz-photography.cn",api={root:"http://www.sz-photography.cn",login:{login:root+"/api/login",wechat:root+"/api/login/wxlogin",register:root+"/api/register",code:root+"/api/code",bind:root+"/api/bind",forget:root+"/api/member/index/ForgetPassword",info:root+"info"},card:{packageList:root+"/api/unicom/application/packageList",jobNumber:root+"/api/unicom/application/getJobNumber",applyCard:root+"/api/unicom/application/accountOpenApply",applyNumber:root+"/api/unicom/application/jobNumberApply"},rice:{rice:root+"/api/unicom/application/getRice",riceDetail:root+"/api/unicom/application/riceLog",cashDetail:root+"/api/unicom/application/cash",already:root+"/api/member/index/myCreditList"},mobile:{getMobile:root+"/api/unicom/application/getMobile"},upload:{uploadImg:root+"/api/sms_store/order/uploadImg",image:root+"/api/member/index/upload",recharge:root+"/api/member/Index/PostCredit",withdrawal:root+"/api/member/Index/WithdrawalCredit",give:root+"/api/member/Index/Give",userinfo:root+"/api/member/index/updateUserInfo",code:root+"/api/code",register:root+"/api/register",update:root+"/api/member/index/updateUserInfo",bindMobile:root+"/api/member/index/bindMobile",level:root+"/api/team_range/Agent/TeamRangeLevel",logout:root+"/api/logout"},group:{groupList:root+"/api/groups/home/info",categroy:root+"/api/groups/goods/categroy",teaming:root+"/api/groups/goods/teaming",goodsList:root+"/api/groups/goods/list",goodsInfo:root+"/api/groups/goods/goodsInfo",confirmDetail:root+"/api/groups/order/confirmDetail",confirm:root+"/api/groups/order/confirm",payDetail:root+"/api/sms_store/order/payInfo",pay:root+"/api/sms_store/order/pay",list:root+"/api/groups/order/list",teams:root+"/api/groups/goods/teams",cancel:root+"/api/groups/order/cancel",orderDetail:root+"/api/groups/order/orderDetail",remove:root+"/api/groups/order/remove",orderConfirm:root+"/api/groups/order/orderConfirm"},category:{goodsCate:root+"/api/sms_store/index/getGoodsCate",subGoodsCate:root+"/api/sms_store/index/getSubGoodsCate",goodList:root+"/api/sms_store/index/getGoodList",goodDetail:root+"/api/sms_store/index/getGoodsDetail",goodComment:root+"/api/sms_store/index/getGoodsComment"},cart:{myCart:root+"/api/sms_store/member/myCart",addToCart:root+"/api/sms_store/member/addToCart",removeCart:root+"/api/sms_store/member/removeCart"},address:{addressList:root+"/api/sms_store/member/getAddressList",modifyAddress:root+"/api/sms_store/member/modifyAddress",deteleAddress:root+"/api/sms_store/member/deteleAddress",getAddress:root+"/api/sms_store/member/getAddress",setAddress:root+"/api/sms_store/member/setAddressDefault"},main:{number:root+"/api/sms_store/order/getOrderCount",goodsList:root+"/api/sms_store/index/getGoodList",getNewGoodDetail:root+"/api/sms_store/index/getNewGoodDetail",goodhotList:root+"/api/sms_store/index/getHotGoodList",user:root+"/api/member/index/info",swiper:root+"/api/sms_store/index/getBanner",swiperList:root+"/api/groups/goods/adv",Leaarea:root+"/api/sms_store/index/getLeaarea",getNewGoodList:root+"/api/sms_store/index/getNewGoodList",updateHyiInfo:root+"/api/member/index/updateHyiInfo",wzsubmit:root+"/api/sms_store/order/getUploadVoucher",getAppealsList:root+"/api/sms_store/order/getAppealsList",getReprTation:root+"/api/sms_store/order/getReprTation",getGoodLouList:root+"/api/sms_store/index/getGoodLouList",getNoticestail:root+"/api/sms_store/index/getNoticestail"},order:{caculate:root+"/api/sms_store/order/caculate",create:root+"/api/sms_store/order/create",payInfo:root+"/api/sms_store/order/payInfo",pay:root+"/api/sms_store/order/pay",orderList:root+"/api/sms_store/order/getOrderList",neworderList:root+"/api/sms_store/order/getOrdersNew",getNewOrdeail:root+"/api/sms_store/order/getNewOrdeail",detele:root+"/api/sms_store/order/detele",cancel:root+"/api/sms_store/order/cancel",confirm:root+"/api/sms_store/order/confirm",comment:root+"/api/sms_store/order/comment",orderDetail:root+"/api/sms_store/order/getOrderDetail",expressQuery:root+"/api/sms_store/order/expressQuery",appeal:root+"/api/sms_store/order/getRepresentation",entrust:root+"/api/sms_store/order/ationRules",geteryOgoods:root+"/api/sms_store/order/geteryOgoods",gweenMembers:root+"/api/sms_store/order/gweenMembers",geteTihuoGoods:root+"/api/sms_store/order/geteTihuoGoods",orderDividends:root+"/api/sms_store/order/orderDividends",getWorkslogo:root+"/api/sms_store/order/getWorkslogo",getOrderCon:root+"/api/sms_store/order/getOrderCon",getPaymeslo:root+"/api/sms_store/order/getPaymeslo"},collection:{addCollection:root+"/api/sms_store/member/addMyCollection",myCollection:root+"/api/sms_store/member/myCollection",removeMyCollection:root+"/api/sms_store/member/removeMyCollection",removeGoodsCollection:root+"/api/sms_store/member/removeGoodsCollection"},service:{qrcode:root+"/api/member/index/getMyCode",integral:root+"/api/member/index/myCreditList",team:root+"/api/team_range/Agent/subordinate",teamtwo:root+"/api/team_range/Agent/AgentMember",dendFembers:root+"/api/sms_store/order/dendFembers",achieve:root+"/api/team_range/Agent/getAchievement",agent:root+"/api/team_range/Agent/getAgent",jurisd:root+"/api/member/Jurisdiction/JurisdictionAdd",accredit:root+"/api/member/Jurisdiction/uncertainPower",education:root+"/api/single_page/Index/SourceMaterial",details:root+"/api/single_page/Index/GetSourceMaterial",service:root+"/api/single_page/Index/MyService",upgrade:root+"/api/plugins/AchievementApi/GetUpgrade",member:root+"/api/plugins/AchievementApi/GetMember",apply:root+"/api/plugins/AchievementApi/ApplyLevel"}},upload=function upload(self,url,data,type,path,name,_success){""==data||""==path?uni.request({url:url,method:type,data:data,header:{Authorization:"Bearer "+uni.getStorageSync("token"),"content-type":"application/json;charset=UTF-8"},success:function(e){e=e.data;400==e.code?(uni.showToast({icon:"none",title:e.info}),uni.setStorageSync("token",""),setTimeout((function(){uni.reLaunch({url:"/pages/login/login"})}),2e3)):_success(self,e)}}):uni.uploadFile({url:url,filePath:path,name:name,formData:data,header:{Authorization:"Bearer "+uni.getStorageSync("token"),"content-type":"application/json;charset=UTF-8"},success:function success(res){res=res.data,res=eval("("+res+")"),400==res.code?(uni.showToast({icon:"none",title:res.info}),uni.setStorageSync("token",""),setTimeout((function(){uni.reLaunch({url:"/pages/login/login"})}),2e3)):_success(self,res)}})},_default={root:root,api:api,upload:upload,config:config,User_paw:User_paw,Memory:Memory,language:language};exports.default=_default}}]);