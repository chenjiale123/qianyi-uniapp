(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/order"],{"1da0":function(e,t,o){"use strict";var s=o("6b5e"),a=o.n(s);a.a},"6b5e":function(e,t,o){},"929f":function(e,t,o){"use strict";(function(e,s){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=d(o("e19e"));function d(e){return e&&e.__esModule?e:{default:e}}var n={data:function(){return{tabCurrentIndex:0,price:"",num:"",Id:"",shopId:"",detail:"",number:"",all:"",all_:"",yunfei:"",ad:"",show:!1,currentTab:0,able:"",unable:"",newArr:[],countMoney:0,yan:"",id1:"",id2:"",show2:!1,xianshi:!1,guiId:"",show1:!1,navList:[{text:"全部",orderList:[]},{text:"待付款",orderList:[]}]}},onLoad:function(t){var o=this,s=this,d=wx.getStorageSync("user").loginId||0;a.default.post("/QianYi_Shop/selectAddressByUserId",{page:1,userId:105}).then(function(t){o.list=t.data.data.shopAddressList,console.log(e(t," at pages\\order\\order.vue:229"))}).catch(function(t){console.log(e(t," at pages\\order\\order.vue:235"))}),this.price=t.price,this.num=t.num,this.Id=t.id,this.shopId=t.shopId,this.guiId=t.guiId,console.log(e(t," at pages\\order\\order.vue:245"));d=wx.getStorageSync("user").loginId||0;a.default.get("/QianYi_Shop/selectIstest?userId="+d+"&goodsSpecId="+this.guiId+"&shopId="+this.shopId+"&goodsId="+this.Id+"&goodsNum="+this.num+"&type=2").then(function(t){console.log(e(t," at pages\\order\\order.vue:251")),s.navList[0].orderList=t.data.data.shopCouponsList}).catch(function(t){console.log(e(t," at pages\\order\\order.vue:259"))});d=wx.getStorageSync("user").loginId||0;a.default.get("/QianYi_Shop/selectIstest?userId="+d+"&goodsSpecId="+this.guiId+"&shopId="+this.shopId+"&goodsId="+this.Id+"&goodsNum="+this.num+"&type=1").then(function(t){console.log(e(t," at pages\\order\\order.vue:265")),s.navList[1].orderList=t.data.data.shopCouponsList}).catch(function(t){console.log(e(t," at pages\\order\\order.vue:273"))});d=wx.getStorageSync("user").loginId||0;a.default.get("/QianYi_Shop/insertSingleShopOrderGoods?userId="+d+"&goodsSpecId="+this.guiId+"&shopId="+this.shopId+"&goodsId="+this.Id+"&number="+this.num).then(function(t){console.log(e(t," at pages\\order\\order.vue:280")),o.detail=t.data.data.orderEdit[0].specificationGoodsList,o.number=t.data.data.orderEdit[0].number,o.all=t.data.data.calculationAmount.goodsMoneyAll,o.all_=t.data.data.calculationAmount.MoneyAll,o.yunfei=t.data.data.calculationAmount.freightMoneyAll,o.ad=t.data.data.orderEdit[0].shopAddressList}).catch(function(t){console.log(e(t," at pages\\order\\order.vue:297"))})},methods:{tabClick:function(e){this.tabCurrentIndex=e},changeTab:function(e){this.tabCurrentIndex=e.target.current},buy:function(){this.show1=!this.show1},close1:function(){this.show1=!1},add:function(){s.navigateTo({url:"/pages/addressAdd/addressAdd"})},radioChange:function(t,o){console.log(e(t,o," at pages\\order\\order.vue:330"))},radio:function(t){this.list1=this.list[t],this.index1=t,console.log(e(t," at pages\\order\\order.vue:336"))},sure:function(e){this.ad=this.list1,this.xianshi=!1},edit:function(t,o){var s=this;console.log(e(t," at pages\\order\\order.vue:349"));var a=o;console.log(e(s.list[a]," at pages\\order\\order.vue:351")),wx.navigateTo({url:"/pages/addressEdit/addressEdit?name="+s.list[a].consigneeName+"&phone="+s.list[a].consigneePhone+"&path="+s.list[a].areaIdPath+"&detail="+s.list[a].address+"&moren="+s.list[a].isDefault+"&id="+s.list[a].id+"&type="+s.list[a].type,success:function(e){},fail:function(e){},complete:function(e){}})},address:function(){s.navigateTo({url:"/pages/addressAdd/addressAdd",success:function(e){},fail:function(e){},complete:function(e){}})},address1:function(){this.xianshi=!0},dingdan:function(){var t=this;console.log(e(this.ad.id," at pages\\order\\order.vue:378"));var o=wx.getStorageSync("user").loginId||0;a.default.get("/QianYi_Shop/placeShopOrderGoods?userId="+o+"&goodsSpecId="+this.guiId+"&addressId="+this.ad.id+"&goodsId="+this.Id+"&shopId="+this.shopId+"&goodsNumber="+this.number+"&couponsId="+this.id1+"&shopCarId=0&paymentAmount="+this.all_+"&orderRemarks="+this.yan).then(function(o){console.log(e(o," at pages\\order\\order.vue:385")),a.default.post("/QianYi_Shop/pay/wechat/createOrder?orderId="+o.data.data.shopOrderId+"&type=0").then(function(o){console.log(e(o," at pages\\order\\order.vue:387")),t.appid=o.data.appid,t.timestamp=o.data.timestamp,t.noncestr=o.data.noncestr,t.package=o.data.package,t.sign=o.data.sign}),console.log(e(o.data.timestamp.toString()," at pages\\order\\order.vue:399"))}).catch(function(t){console.log(e(t," at pages\\order\\order.vue:424"))})},goodsdagou:function(t){var o=this,s=(o.num,o.navList[1].orderList);t=t;console.log(e(t," at pages\\order\\order.vue:442")),console.log(e(s[t].id," at pages\\order\\order.vue:443"));var a=o.newArr,d=s[t].selected;console.log(e(d," at pages\\order\\order.vue:447")),s[t].selected=!d,d?a.pop():a.push(t),console.log(e(a," at pages\\order\\order.vue:454")),console.log(e(a.length," at pages\\order\\order.vue:455")),o.cardTeams=s,o.newArr=a,o.id1=s[t].id},getPlus:function(e){var t=this;t.number++,this.number=t.number,this.again(),this.getTotalPrice()},getMain:function(e){var t=this;t.number--,t.number<=0&&(t.number=1),t.again(),this.getTotalPrice()},getTotalPrice:function(){var e=this.number,t=this.specPrice,o=e*t;this.all=o,this.all_=o-this.countMoney+this.yunfei},again:function(){var t=this,o=this,s=wx.getStorageSync("user").loginId||0;a.default.get("/QianYi_Shop/selectIstest?userId="+s+"&goodsSpecId="+this.guiId+"&shopId="+this.shopId+"&goodsId="+this.Id+"&goodsNum="+this.number+"&type=1").then(function(s){console.log(e(s," at pages\\order\\order.vue:516")),t.unable=s.data.data.shopCouponsList,o.navList[1].orderList=s.data.data.shopCouponsList}).catch(function(t){console.log(e(t," at pages\\order\\order.vue:524"))})}}};t.default=n}).call(this,o("0de9")["default"],o("6e42")["default"])},9752:function(e,t,o){"use strict";o.r(t);var s=o("929f"),a=o.n(s);for(var d in s)"default"!==d&&function(e){o.d(t,e,function(){return s[e]})}(d);t["default"]=a.a},b812:function(e,t,o){"use strict";(function(e){o("dec9"),o("921b");s(o("66fd"));var t=s(o("d42d"));function s(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("6e42")["createPage"])},c445:function(e,t,o){"use strict";var s=function(){var e=this,t=e.$createElement;e._self._c},a=[];o.d(t,"a",function(){return s}),o.d(t,"b",function(){return a})},d42d:function(e,t,o){"use strict";o.r(t);var s=o("c445"),a=o("9752");for(var d in a)"default"!==d&&function(e){o.d(t,e,function(){return a[e]})}(d);o("1da0");var n=o("2877"),r=Object(n["a"])(a["default"],s["a"],s["b"],!1,null,null,null);t["default"]=r.exports}},[["b812","common/runtime","common/vendor"]]]);