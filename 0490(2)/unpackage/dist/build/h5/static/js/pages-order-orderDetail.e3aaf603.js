(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order-orderDetail"],{"34ce":function(t,i,e){var a=e("3f00");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=e("4f06").default;s("19ef93ef",a,!0,{sourceMap:!1,shadowMode:!1})},"3f00":function(t,i,e){var a=e("24fb");i=a(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.navbar[data-v-1f179227]{display:-webkit-box;display:-webkit-flex;display:flex;height:40px;padding:0 5px;background:#fff;box-shadow:0 %?4?% %?8?% #dcdfe6;position:fixed;width:100%;z-index:200}.navbar .nav-item[data-v-1f179227]{-webkit-box-flex:1;-webkit-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:100%;font-size:15px;color:#303133;position:relative}.navbar .nav-item.current[data-v-1f179227]{color:#ff594d}.navbar .nav-item.current[data-v-1f179227]:after{content:"";position:absolute;left:50%;bottom:0;-webkit-transform:translateX(-50%);transform:translateX(-50%);width:50px;height:0;\r\n  /* border-bottom: 2px solid #fa436a; */border-bottom:2px solid #ff594d}.center[data-v-1f179227]{width:100%;height:100%;z-index:120;position:absolute}.swiper-box[data-v-1f179227]{height:100%}.list-scroll-content[data-v-1f179227]{height:100%}.order-item[data-v-1f179227]{margin-bottom:%?20?%;margin:%?20?%;background-color:#fff;padding:%?30?% %?22?% %?24?% %?22?%;border-radius:%?20?%}.order-top[data-v-1f179227]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.num[data-v-1f179227]{font-size:%?26?%;color:#666}.state[data-v-1f179227]{color:#ff594d;font-weight:700}.order-center[data-v-1f179227]{border-bottom:1px solid #ccc;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.img[data-v-1f179227]{width:%?190?%;margin-top:%?30?%;margin-bottom:%?24?%}.order-img[data-v-1f179227]{width:100%;height:%?190?%}.center-right[data-v-1f179227]{-webkit-box-flex:1;-webkit-flex:1;flex:1;margin-left:%?25?%}.title[data-v-1f179227]{color:#333;font-size:%?26?%;font-weight:700;margin-bottom:%?20?%}.detail[data-v-1f179227]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.detail-price[data-v-1f179227]{color:#333;font-size:%?32?%;font-weight:700}.detail-num[data-v-1f179227]{color:#333;font-size:%?24?%;font-weight:700}.total[data-v-1f179227]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;color:#333;font-weight:700;padding:%?20?% 0}.bottom[data-v-1f179227]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end}.money[data-v-1f179227]{color:#ff594d;font-weight:700}.back[data-v-1f179227]{border:1px solid #999;border-radius:%?33?%;padding:0 %?45?%;height:%?65?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;color:#666;margin-right:%?24?%}.warn[data-v-1f179227]{border:1px solid #ff594d;border-radius:%?33?%;padding:0 %?45?%;height:%?65?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;color:#ff594d}.cancel-order[data-v-1f179227]{position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,.63);z-index:1000}.cancel-order .cause[data-v-1f179227]{width:%?630?%;height:%?761?%;background-color:#fff;border-radius:%?12?%;position:absolute;left:50%;top:50%;margin-left:%?-315?%;margin-top:%?-380.5?%}.cancel-order .cause .title[data-v-1f179227]{width:100%;height:%?105?%;line-height:%?105?%;text-align:center;color:#333;font-size:%?32?%;font-weight:700;border-bottom:%?2?% solid #f1f1f1}.cancel-order .cause .cause-box[data-v-1f179227]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:%?23?% %?22?% %?23?% %?38?%}.cancel-order .cause .btn[data-v-1f179227]{display:-webkit-box;display:-webkit-flex;display:flex;padding:%?60?% 0 %?40?% 0}.cancel-order .cause .btn .cancel[data-v-1f179227]{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:center;color:#333;font-size:%?32?%}.cancel-order .cause .btn .confirm[data-v-1f179227]{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:center;color:#000;font-size:%?32?%}.mask[data-v-1f179227]{position:fixed;top:0;bottom:0;height:100%;width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;z-index:300}.mask .mask_top[data-v-1f179227]{opacity:.53;background:#000;-webkit-box-flex:1;-webkit-flex:1;flex:1}.mask .mask_content[data-v-1f179227]{height:%?760?%;margin:0 %?60?% %?300?% %?60?%;background-color:#fff;position:absolute;bottom:0;right:0;left:0;background:#fff;border-radius:%?12?%;padding-top:%?42?%}.mask .mask_content .title[data-v-1f179227]{height:%?105?%;width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;box-sizing:border-box;padding-bottom:%?30?%;border-bottom:1px solid #f1f1f1}.mask .mask_content .title > uni-text[data-v-1f179227]{height:%?34?%;font-size:%?32?%;font-weight:700;color:#333;line-height:%?34?%}.mask .mask_content .title > uni-image[data-v-1f179227]{height:%?58?%;width:%?58?%}.options[data-v-1f179227]{margin-top:%?10?%}.options .list[data-v-1f179227]{height:%?100?%;width:100%;padding:0 %?30?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;box-sizing:border-box;color:#333;font-size:%?32?%}.options .list_end[data-v-1f179227]{border-bottom:0}.btn[data-v-1f179227]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:%?100?%;font-size:%?36?%;font-weight:500;text-align:center;line-height:%?100?%;margin:%?25?% auto;color:#333;font-size:%?32?%}.btn .confirm[data-v-1f179227]{width:50%}.btn .confirm-btn[data-v-1f179227]{color:#000;font-weight:700}',""]),t.exports=i},4370:function(t,i,e){"use strict";var a;e.d(i,"b",(function(){return s})),e.d(i,"c",(function(){return n})),e.d(i,"a",(function(){return a}));var s=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",{staticClass:"order"},[a("v-uni-view",{staticClass:"navbar"},t._l(t.navList,(function(i,e){return a("v-uni-view",{key:e,staticClass:"nav-item",class:{current:t.tabIndex===e},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.tabClick(e)}}},[t._v(t._s(i.text))])})),1),a("v-uni-view",{staticClass:"center"},[a("v-uni-swiper",{staticClass:"swiper-box",attrs:{current:t.tabIndex,duration:"300"},on:{change:function(i){arguments[0]=i=t.$handleEvent(i),t.changeTab.apply(void 0,arguments)}}},t._l(t.navList,(function(i,s){return a("v-uni-swiper-item",{key:s,staticClass:"tab-content"},[a("v-uni-scroll-view",{staticClass:"list-scroll-content",attrs:{"scroll-y":"true"}},[a("v-uni-view",{staticStyle:{height:"80upx"}}),a("v-uni-view",{staticClass:"order-item"},[a("v-uni-view",{staticClass:"order-top"},[a("v-uni-view",{staticClass:"num"},[t._v("订单单号：SH2020062812345698")]),a("v-uni-view",{staticClass:"state"},[t._v("待发货")])],1),a("v-uni-view",{staticClass:"order-center"},[a("v-uni-view",{staticClass:"img"},[a("v-uni-image",{staticClass:"order-img",attrs:{src:e("c6c5"),mode:""}})],1),a("v-uni-view",{staticClass:"center-right"},[a("v-uni-view",{staticClass:"title"},[t._v("塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装")]),a("v-uni-view",{staticClass:"detail"},[a("v-uni-view",{staticClass:"detail-price"},[t._v("￥1296")]),a("v-uni-view",{staticClass:"detail-num"},[t._v("x1")])],1)],1)],1),a("v-uni-view",{staticClass:"total"},[t._v("共1件，合计："),a("v-uni-view",{staticClass:"money"},[t._v("￥1296")])],1),a("v-uni-view",{staticClass:"bottom"},[a("v-uni-view",{staticClass:"back"},[t._v("退/换货")]),a("v-uni-view",{staticClass:"warn"},[t._v("提醒发货")])],1)],1),a("v-uni-view",{staticClass:"order-item"},[a("v-uni-view",{staticClass:"order-top"},[a("v-uni-view",{staticClass:"num"},[t._v("订单单号：SH2020062812345698")]),a("v-uni-view",{staticClass:"state"},[t._v("已发货")])],1),a("v-uni-view",{staticClass:"order-center"},[a("v-uni-view",{staticClass:"img"},[a("v-uni-image",{staticClass:"order-img",attrs:{src:e("c6c5"),mode:""}})],1),a("v-uni-view",{staticClass:"center-right"},[a("v-uni-view",{staticClass:"title"},[t._v("塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装")]),a("v-uni-view",{staticClass:"detail"},[a("v-uni-view",{staticClass:"detail-price"},[t._v("￥1296")]),a("v-uni-view",{staticClass:"detail-num"},[t._v("x1")])],1)],1)],1),a("v-uni-view",{staticClass:"total"},[t._v("共1件，合计："),a("v-uni-view",{staticClass:"money"},[t._v("￥1296")])],1),a("v-uni-view",{staticClass:"bottom"},[a("v-uni-view",{staticClass:"back"},[t._v("查看物流")]),a("v-uni-view",{staticClass:"warn"},[t._v("确认收货")])],1)],1),a("v-uni-view",{staticClass:"order-item"},[a("v-uni-view",{staticClass:"order-top"},[a("v-uni-view",{staticClass:"num"},[t._v("订单单号：SH2020062812345698")]),a("v-uni-view",{staticClass:"state"},[t._v("已完成")])],1),a("v-uni-view",{staticClass:"order-center"},[a("v-uni-view",{staticClass:"img"},[a("v-uni-image",{staticClass:"order-img",attrs:{src:e("c6c5"),mode:""}})],1),a("v-uni-view",{staticClass:"center-right"},[a("v-uni-view",{staticClass:"title"},[t._v("塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装")]),a("v-uni-view",{staticClass:"detail"},[a("v-uni-view",{staticClass:"detail-price"},[t._v("￥1296")]),a("v-uni-view",{staticClass:"detail-num"},[t._v("x1")])],1)],1)],1),a("v-uni-view",{staticClass:"total"},[t._v("共1件，合计："),a("v-uni-view",{staticClass:"money"},[t._v("￥1296")])],1),a("v-uni-view",{staticClass:"bottom"},[a("v-uni-view",{staticClass:"back"},[t._v("查看物流")]),a("v-uni-view",{staticClass:"warn"},[t._v("评价")]),a("v-uni-view",{staticClass:"warn"},[t._v("追加评价")])],1)],1),a("v-uni-view",{staticClass:"order-item"},[a("v-uni-view",{staticClass:"order-top"},[a("v-uni-view",{staticClass:"num"},[t._v("订单单号：SH2020062812345698")]),a("v-uni-view",{staticClass:"state"},[t._v("待付款")])],1),a("v-uni-view",{staticClass:"order-center"},[a("v-uni-view",{staticClass:"img"},[a("v-uni-image",{staticClass:"order-img",attrs:{src:e("c6c5"),mode:""}})],1),a("v-uni-view",{staticClass:"center-right"},[a("v-uni-view",{staticClass:"title"},[t._v("塞外香宁夏吴忠大米富硒长粒香米新米 真空中国蟹田米2.5kg/袋包装")]),a("v-uni-view",{staticClass:"detail"},[a("v-uni-view",{staticClass:"detail-price"},[t._v("￥1296")]),a("v-uni-view",{staticClass:"detail-num"},[t._v("x1")])],1)],1)],1),a("v-uni-view",{staticClass:"total"},[t._v("共1件，合计："),a("v-uni-view",{staticClass:"money"},[t._v("￥1296")])],1),a("v-uni-view",{staticClass:"bottom"},[a("v-uni-view",{staticClass:"back"},[t._v("修改地址")]),a("v-uni-view",{staticClass:"back",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.isMask=!t.isMask}}},[t._v("取消订单")]),a("v-uni-view",{staticClass:"warn"},[t._v("去付款")])],1)],1)],1)],1)})),1)],1),a("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.isMask,expression:"isMask"}],staticClass:"mask"},[a("v-uni-view",{staticClass:"mask_top"}),a("v-uni-view",{staticClass:"mask_content"},[a("v-uni-view",{staticClass:"title"},[a("v-uni-text",[t._v("请选择取消订单原因")])],1),a("v-uni-view",{staticClass:"options"},[a("v-uni-radio-group",{on:{change:function(i){arguments[0]=i=t.$handleEvent(i),t._returnReason.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"list"},[a("v-uni-text",{staticClass:"common_text_style"},[t._v("我不想买了")]),a("v-uni-radio",{staticStyle:{transform:"scale(0.7)"},attrs:{value:"我不想买了",color:"#ff594d"}})],1),a("v-uni-view",{staticClass:"list"},[a("v-uni-text",{staticClass:"common_text_style"},[t._v("信息填写错误，重拍")]),a("v-uni-radio",{staticStyle:{transform:"scale(0.7)"},attrs:{value:"信息填写错误，重拍",color:"#ff594d"}})],1),a("v-uni-view",{staticClass:"list"},[a("v-uni-text",{staticClass:"common_text_style"},[t._v("卖家缺货")]),a("v-uni-radio",{staticStyle:{transform:"scale(0.7)"},attrs:{value:"卖家缺货",color:"#ff594d"}})],1),a("v-uni-view",{staticClass:"list"},[a("v-uni-text",{staticClass:"common_text_style"},[t._v("同城见面交易")]),a("v-uni-radio",{staticStyle:{transform:"scale(0.7)"},attrs:{value:"同城见面交易",color:"#ff594d"}})],1),a("v-uni-view",{staticClass:"list list_end"},[a("v-uni-text",{staticClass:"common_text_style"},[t._v("其他原因")]),a("v-uni-radio",{staticStyle:{transform:"scale(0.7)"},attrs:{value:"其他原因",color:"#ff594d"}})],1)],1),a("v-uni-view",{staticClass:"btn"},[a("v-uni-view",{staticClass:"confirm",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.maskShow(!1)}}},[t._v("取消")]),a("v-uni-view",{staticClass:"confirm confirm-btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.maskShow(!1)}}},[t._v("确定")])],1)],1)],1)],1)],1)},n=[]},4623:function(t,i,e){"use strict";var a=e("34ce"),s=e.n(a);s.a},"84d8":function(t,i,e){"use strict";e.r(i);var a=e("4370"),s=e("d841");for(var n in s)"default"!==n&&function(t){e.d(i,t,(function(){return s[t]}))}(n);e("4623");var o,c=e("f0c5"),l=Object(c["a"])(s["default"],a["b"],a["c"],!1,null,"1f179227",null,!1,a["a"],o);i["default"]=l.exports},b0ca:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a={data:function(){return{tabIndex:0,cancelOrder:!1,isMask:!1,navList:[{text:"全部",state:"0"},{text:"待付款",state:"1"},{text:"待发货",state:"2"},{text:"待收货",state:"3"},{text:"待评价",state:"4"}],causeList:[{title:"我不想买了",check:!0},{title:"信息填写错误，重拍",check:!1},{title:"卖家缺货",check:!1},{title:"同城见面交易",check:!1},{title:"其他原因",check:!1}]}},onLoad:function(){this.getList()},methods:{changeTab:function(t){this.tabClick(t.target.current)},tabClick:function(t){this.change(t)},change:function(t){this.tabIndex=t},maskShow:function(t){this.isMask=t},_returnReason:function(t){t&&(this.returnReason=t.detail.value)},getList:function(){var t=this;t.$http.get(service.api.order.orderList,{status:t.navList[t.tabIndex].state}).then((function(i){var e=i.data.datas;t.listData=e}))}}};i.default=a},c6c5:function(t,i,e){t.exports=e.p+"static/img/pic.f3322482.png"},d841:function(t,i,e){"use strict";e.r(i);var a=e("b0ca"),s=e.n(a);for(var n in a)"default"!==n&&function(t){e.d(i,t,(function(){return a[t]}))}(n);i["default"]=s.a}}]);