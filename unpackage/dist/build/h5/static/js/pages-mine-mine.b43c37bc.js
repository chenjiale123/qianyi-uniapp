(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-mine"],{"2d99":function(t,i,a){"use strict";var e=a("3922"),n=a.n(e);n.a},"37ed":function(t,i,a){i=t.exports=a("2350")(!1),i.push([t.i,"Page[data-v-ff42ce2a]{width:100%;height:100%;background:#f2f2f2}.whole[data-v-ff42ce2a]{background:#f2f2f2;width:100%;height:100%}.content[data-v-ff42ce2a]{width:100%}.qie[data-v-ff42ce2a]{font-size:%?26?%;font-family:PingFang-SC-Bold;font-weight:700;color:#fff;position:absolute;top:%?105?%;right:%?30?%}.switch[data-v-ff42ce2a]{width:%?32?%;height:%?24?%;position:absolute;top:%?108?%;right:%?150?%}.content>.top[data-v-ff42ce2a]{width:100%;height:%?276?%;background:-webkit-gradient(linear,left top,left bottom,from(#91e573),to(#3db2a3));background:-o-linear-gradient(top,#91e573 0,#3db2a3 100%);background:linear-gradient(180deg,#91e573,#3db2a3);position:relative;padding-top:%?30?%;-webkit-box-sizing:border-box;box-sizing:border-box}.top>.touxiang[data-v-ff42ce2a]{width:%?132?%;height:%?132?%;background:-o-linear-gradient(135deg,#d0d8e1 0,#eef4ff 100%);background:linear-gradient(-45deg,#d0d8e1,#eef4ff);border-radius:50%;margin-left:%?32?%}.touxiang>uni-image[data-v-ff42ce2a]{width:100%;height:100%;border-radius:50%}.top>.title[data-v-ff42ce2a]{position:absolute;font-size:%?36?%;top:%?48?%;left:%?192?%;color:#fff}.top>.small[data-v-ff42ce2a]{position:absolute;font-size:%?24?%;top:%?112?%;left:%?192?%;color:#fff}.top>.small1[data-v-ff42ce2a]{display:inline-block;width:%?132?%;height:%?38?%;position:absolute;font-size:%?24?%;top:%?112?%;left:%?192?%;color:#fff}.contain[data-v-ff42ce2a]{width:93%;margin:0 auto}.contain>.form[data-v-ff42ce2a]{width:100%;height:%?140?%;position:relative;top:%?-65?%;background:#fff;border-radius:%?10?%}.contain>.form>uni-view[data-v-ff42ce2a]{width:25%;height:100%;text-align:center;float:left}.contain>.form>uni-view>uni-image[data-v-ff42ce2a]{width:%?50?%;height:%?50?%;margin-top:%?25?%}.contain>.form>uni-view>uni-text[data-v-ff42ce2a]{font-size:%?24?%;display:block;margin-top:%?12?%}.dingdan[data-v-ff42ce2a]{width:100%;height:%?190?%;background:#fff}.dingdan>uni-text[data-v-ff42ce2a]{font-size:%?32?%;color:#1a1a1a;float:left;margin-left:%?20?%}.dingdan>.right[data-v-ff42ce2a]{width:%?140?%;height:%?25?%;float:right}.dingdan>.right>uni-text[data-v-ff42ce2a]{font-size:%?26?%;color:#666}.dingdan>.right>uni-image[data-v-ff42ce2a]{width:%?12?%;height:%?20?%;margin-left:%?19?%}.dingdan>.list[data-v-ff42ce2a]{width:100%;height:%?90?%;padding-top:%?76?%;-webkit-box-sizing:border-box;box-sizing:border-box}.dingdan>.list>uni-view[data-v-ff42ce2a]{width:25%;height:%?90?%;text-align:center;float:left}.dingdan>.list>uni-view>uni-image[data-v-ff42ce2a]{width:%?50?%;height:%?50?%}.dingdan>.list>uni-view>uni-text[data-v-ff42ce2a]{font-size:%?24?%;display:block}.love[data-v-ff42ce2a]{text-align:center;width:100%;height:100%;margin-top:%?50?%}.love>uni-text[data-v-ff42ce2a]{font-size:%?36?%;color:#1a1a1a;z-index:999;position:relative}.love>uni-image[data-v-ff42ce2a]{display:block;width:%?142?%;height:%?20?%;text-align:center;position:relative;top:%?-15?%;margin:0 auto}.love>.li[data-v-ff42ce2a]{width:%?336?%;height:%?446?%;float:left;background:#fff;-webkit-box-shadow:0 %?6?% %?12?% 0 rgba(0,0,0,.08);box-shadow:0 %?6?% %?12?% 0 rgba(0,0,0,.08);border-radius:%?10?%;text-align:left;margin-top:%?30?%;margin-right:%?12?%}.love>.li>uni-image[data-v-ff42ce2a]{border-radius:%?10?%;width:%?336?%;height:%?336?%}.love>.li>uni-text[data-v-ff42ce2a]{width:80%;margin:0 auto;overflow:hidden;display:block;font-size:%?26?%;color:#1a1a1a;height:%?72?%;margin-top:%?24?%;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}",""])},3922:function(t,i,a){var e=a("37ed");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var n=a("4f06").default;n("14299aaf",e,!0,{sourceMap:!1,shadowMode:!1})},"97c8":function(t,i,a){"use strict";a.r(i);var e=a("a4c1"),n=a.n(e);for(var o in e)"default"!==o&&function(t){a.d(i,t,function(){return e[t]})}(o);i["default"]=n.a},a4c1:function(t,i,a){"use strict";var e=a("288e");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n=e(a("e19e")),o={data:function(){return{data3:"",api:"",user:""}},onShow:function(){var t=this;console.log(this.qiniu),n.default.get("/QianYi_Shop/selectRecommendGoods?page=1").then(function(i){t.data3=i.data.data.goodsList,console.log(i.data)}).catch(function(t){console.log(t)}),uni.getStorageSync("user")&&(this.name=uni.getStorageSync("user").infoNickname,this.user=!0,this.touxiang=this.qiniu+uni.getStorageSync("user").infoIcon,this.huiyuan=uni.getStorageSync("user").membersLevel,console.log(this.touxiang))},methods:{show:function(){uni.navigateTo({url:"../login/login"})},coupon:function(){uni.navigateTo({url:"../favorable/favorable"})},yuan:function(){uni.navigateTo({url:"../wish/wish"})},lasty:function(){uni.navigateTo({url:"../lasty/lasty"})},wuliu:function(){uni.navigateTo({url:"../logistics/logistics"})},techan:function(){uni.navigateTo({url:"../SpecialOrders/SpecialOrders"})},pingjia:function(){uni.navigateTo({url:"../assess/assess"})},address:function(){uni.navigateTo({url:"../delivery/delivery"})}}};i.default=o},c1d9:function(t,i,a){"use strict";a.r(i);var e=a("e65c"),n=a("97c8");for(var o in n)"default"!==o&&function(t){a.d(i,t,function(){return n[t]})}(o);a("2d99");var s=a("2877"),c=Object(s["a"])(n["default"],e["a"],e["b"],!1,null,"ff42ce2a",null);i["default"]=c.exports},e65c:function(t,i,a){"use strict";var e=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",{staticClass:"whole"},[a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"top"},[a("v-uni-view",{staticClass:"touxiang"},[t.user?a("v-uni-image",{attrs:{src:t.touxiang}}):a("v-uni-image",{attrs:{src:"../../static/image/greylogo@2x.png"}})],1),t.user?a("v-uni-text",{staticClass:"title"},[t._v(t._s(t.name))]):a("v-uni-text",{staticClass:"title",on:{click:function(i){i=t.$handleEvent(i),t.show(i)}}},[t._v("点此登录")]),t.user?a("v-uni-image",{staticClass:"switch",attrs:{src:"../../static/image/switch@2x.png"}}):t._e(),t.user?a("v-uni-text",{staticClass:"qie",on:{click:function(i){i=t.$handleEvent(i),t.zhuxiao(i)}}},[t._v("切换账号")]):t._e(),t.user&&0==t.huiyuan?a("v-uni-image",{staticClass:"small1",attrs:{src:"../../static/image/Silvermember@2x.png"}}):t._e(),t.user&&1==t.huiyuan?a("v-uni-image",{staticClass:"small1",attrs:{src:"../../static/image/Goldmembership@2x.png"}}):t._e(),t.user&&2==t.huiyuan?a("v-uni-image",{staticClass:"small1",attrs:{src:"../../static/image/Platinummember@2x.png"}}):t._e(),t.user&&3==t.huiyuan?a("v-uni-image",{staticClass:"small1",attrs:{src:"../../static/image/Diamondmembership@2x.png"}}):t._e(),t.user?t._e():a("v-uni-text",{staticClass:"small"},[t._v("登录更精彩")])],1),a("v-uni-view",{staticClass:"contain"},[a("v-uni-view",{staticClass:"form"},[a("v-uni-view",{on:{click:function(i){i=t.$handleEvent(i),t.coupon(i)}}},[a("v-uni-image",{attrs:{src:"../../static/image/kqicon@2x.png"}}),a("v-uni-text",[t._v("优惠券")])],1),a("v-uni-view",{on:{click:function(i){i=t.$handleEvent(i),t.yuan(i)}}},[a("v-uni-image",{attrs:{src:"../../static/image/xydicon@2x.png"}}),a("v-uni-text",[t._v("心愿")])],1),a("v-uni-view",{on:{click:function(i){i=t.$handleEvent(i),t.lasty(i)}}},[a("v-uni-image",{attrs:{src:"../../static/image/access@2x.png"}}),a("v-uni-text",[t._v("最近访问")])],1),a("v-uni-view",{on:{click:function(i){i=t.$handleEvent(i),t.wuliu(i)}}},[a("v-uni-image",{attrs:{src:"../../static/image/service@2x.png"}}),a("v-uni-text",[t._v("物流消息")])],1)],1),a("v-uni-view",{staticClass:"dingdan"},[a("v-uni-text",[t._v("我的订单")]),a("v-uni-view",{staticClass:"right",on:{click:function(i){i=t.$handleEvent(i),t.all(i)}}},[a("v-uni-text",[t._v("查看全部")]),a("v-uni-image",{attrs:{src:"../../static/image/fanhui@2x.png"}})],1),a("v-uni-view",{staticClass:"list"},[a("v-uni-view",{on:{click:function(i){i=t.$handleEvent(i),t.techan(i)}}},[a("v-uni-image",{attrs:{src:"../../static/image/productorder@2x.png"}}),a("v-uni-text",[t._v("特产订单")])],1),a("v-uni-view",{on:{click:function(i){i=t.$handleEvent(i),t.jingdian(i)}}},[a("v-uni-image",{attrs:{src:"../../static/image/attractionsorder@2x.png"}}),a("v-uni-text",[t._v("景点订单")])],1),a("v-uni-view",{on:{click:function(i){i=t.$handleEvent(i),t.pingjia(i)}}},[a("v-uni-image",{attrs:{src:"../../static/image/message@2x.png"}}),a("v-uni-text",[t._v("待评价")])],1),a("v-uni-view",{on:{click:function(i){i=t.$handleEvent(i),t.address(i)}}},[a("v-uni-image",{attrs:{src:"../../static/image/address@2x.png"}}),a("v-uni-text",[t._v("收货地址")])],1)],1)],1),a("v-uni-view",{staticClass:"love"},[a("v-uni-text",[t._v("猜你喜欢")]),a("v-uni-image",{attrs:{src:"../../static/image/tab@2x.png"}}),t._l(t.data3,function(i,e){return a("v-uni-view",{key:e,staticClass:"li",on:{click:function(i){i=t.$handleEvent(i),t.detail(i)}}},[a("v-uni-image",{attrs:{src:t.qiniu+i.imageThumb}}),a("v-uni-text",[t._v(t._s(i.goodsName))])],1)})],2)],1)],1)],1)},n=[];a.d(i,"a",function(){return e}),a.d(i,"b",function(){return n})}}]);