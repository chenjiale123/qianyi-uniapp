(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/commentList/commentList"],{"46ae":function(t,e,n){"use strict";var o=n("fdac"),i=n.n(o);i.a},"52cc":function(t,e,n){"use strict";n.r(e);var o=n("dde5"),i=n.n(o);for(var c in o)"default"!==c&&function(t){n.d(e,t,function(){return o[t]})}(c);e["default"]=i.a},"7c00":function(t,e,n){"use strict";n.r(e);var o=n("8cc8"),i=n("52cc");for(var c in i)"default"!==c&&function(t){n.d(e,t,function(){return i[t]})}(c);n("46ae");var s=n("2877"),u=Object(s["a"])(i["default"],o["a"],o["b"],!1,null,null,null);e["default"]=u.exports},"8cc8":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return i})},"988f":function(t,e,n){"use strict";(function(t){n("dec9"),n("921b");o(n("66fd"));var e=o(n("7c00"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},dde5:function(t,e,n){"use strict";(function(t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=s(n("a34a")),c=s(n("e19e"));function s(t){return t&&t.__esModule?t:{default:t}}function u(t,e,n,o,i,c,s){try{var u=t[c](s),a=u.value}catch(r){return void n(r)}u.done?e(a):Promise.resolve(a).then(o,i)}function a(t){return function(){var e=this,n=arguments;return new Promise(function(o,i){var c=t.apply(e,n);function s(t){u(c,o,i,s,a,"next",t)}function a(t){u(c,o,i,s,a,"throw",t)}s(void 0)})}}var r=function(){return Promise.all([n.e("common/vendor"),n.e("components/sunui-upimg/sunui-upimg-qiniu")]).then(n.bind(null,"fe2d"))},m=function(){return n.e("components/uni-rate/uni-rate").then(n.bind(null,"2388"))},l={components:{"sunui-upqiniu":r,uniRate:m},data:function(){return{goods1:[],qiniuArr:[],qiniuArr2:[],arrImgs:[],upImgQiniu:{},com:[],inputValue:"",pl:"",ding:""}},onReady:function(){this.arrImgs=[]},onLoad:function(e){var n=this,i=t.getStorageSync("user").loginId||0,s=(e.id,e.ding);this.ding=e.ding;var u=this;c.default.post("/QianYi_Shop/selectOrderInfo?id="+s).then(function(t){console.log(o(t," at pages\\commentList\\commentList.vue:100")),n.goods1=t.data.data.orderGoodsList;for(var e=0;e<u.goods1.length;e++){var c={commentsContents:"",commodityScore:5,commentsImagePath:"",goodsId:n.goods1[e].goodsId,creatorId:i,additionalEvaluation:0,logisticsScore:5,serviceScore:5};n.com.push(c)}}).catch(function(t){console.log(o(t," at pages\\commentList\\commentList.vue:117"))}),t.request({url:this.base+"QianYi/getIconToken",method:"GET",success:function(t){console.log(o(t," at pages\\commentList\\commentList.vue:124")),n.upImgQiniu={qiniuConfig:{uploadURL:"https://up-z2.qiniup.com",domain:"dev.static.qianyipan.com",region:"SCN",uptoken:t.data.data.token,key:(new Date).getTime(),shouldUseQiniuFileName:!1,fileHead:"file"},notli:!0,count:2,sourceType:"all",upBgColor:"#eee",upIconColor:"#fff",upIconName:"icon-shangchuantupian"}},fail:function(){},complete:function(){}})},methods:{uImageTap:function(){this.$refs.uImage.uploadimage(this.upImgQiniu)},delImgInfo:function(){var t=a(i.default.mark(function t(e){return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:console.log(o("你删除的图片地址为:",e,this.qiniuArr.splice(e.index,1)," at pages\\commentList\\commentList.vue:163"));case 1:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),upQiniuData:function(){var e=a(i.default.mark(function e(n,c){var s,u,a;return i.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:s=[],u=0,a=n.length;case 2:if(!(u<a)){e.next=15;break}if(e.prev=3,""==n[u].path_server){e.next=7;break}return e.next=7,s.push(n[u].path_server.split(","));case 7:e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](3),console.log(o("上传失败..."," at pages\\commentList\\commentList.vue:176"));case 12:u++,e.next=2;break;case 15:this.qiniuArr=s,this.com[c].commentsImagePath=s.join(","),s.length==this.upImgQiniu.count&&(console.log(o(s," at pages\\commentList\\commentList.vue:184")),t.showToast({title:"上传成功",icon:"none"}));case 18:case"end":return e.stop()}},e,this,[[3,9]])}));function n(t,n){return e.apply(this,arguments)}return n}(),getUpImgInfoQiniu:function(){console.log(o("七牛云转成一维数组:",this.qiniuArr.join().split(",")," at pages\\commentList\\commentList.vue:194")),console.log(o("七牛云转成一维数组2:",this.qiniuArr2.join().split(",")," at pages\\commentList\\commentList.vue:195"))},star1:function(t,e){console.log(o(t,e," at pages\\commentList\\commentList.vue:198")),this.com[t].commodityScore=e.value},star2:function(t,e){this.com[t].logisticsScore=e.value},star3:function(t,e){this.com[t].serviceScore=e.value},submit:function(){console.log(o(this.com," at pages\\commentList\\commentList.vue:210"));t.request({url:this.base+"QianYi_Shop/insertBatchShopComments?orderId="+this.ding+"&type=1",method:"POST",data:JSON.stringify(this.com),header:{"content-type":"application/json"},success:function(e){console.log(o(e," at pages\\commentList\\commentList.vue:224")),1==e.data.isSuc&&(t.showToast({title:e.data.msg,icon:"success",duration:2e3}),console.log(o("55555"," at pages\\commentList\\commentList.vue:233")))}})},bindKeyInput:function(t){this.com[t].commentsContents=this.pl}}};e.default=l}).call(this,n("6e42")["default"],n("0de9")["default"])},fdac:function(t,e,n){}},[["988f","common/runtime","common/vendor"]]]);