(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-addressEdit-addressEdit"],{"0487":function(t,e,i){"use strict";var a=i("b82f"),n=i.n(a);n.a},3064:function(t,e,i){"use strict";var a=i("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("f499"));i("7f7f");var o=a(i("e19e")),d=a(i("f7d9")),c=a(i("cff4")),l=a(i("6e8e")),s={components:{mpvuePicker:d.default,mpvueCityPicker:c.default},data:function(){return{pickerText:"",people:"",phone:"",ad:"",detail:"",qian:"",people1:"",phone1:"",ad1:"",detail1:"",qian1:"",kai1:!1,condition:!1,condition1:!1,index1:"",bq:"",index2:"",bqId:"",title:"mpvue-picker 使用示例",pickerSingleArray:[{label:"中国",value:1},{label:"俄罗斯",value:2},{label:"美国",value:3},{label:"日本",value:4}],mulLinkageTwoPicker:l.default,cityPickerValueDefault:[0,0,1],themeColor:"#007AFF",mode:"",deepLength:1,pickerValueDefault:[0],pickerValueArray:[],address:""}},onLoad:function(t){t.id;this.id=t.id,this.people=t.name,this.phone=t.phone,this.address=t.path,this.detail=t.detail,this.kai1=t.moren},methods:{onBackPress:function(){return this.$refs.mpvuePicker.showPicker?(this.$refs.mpvuePicker.pickerCancel(),!0):this.$refs.mpvueCityPicker.showPicker?(this.$refs.mpvueCityPicker.pickerCancel(),!0):void 0},showMulLinkageThreePicker:function(){this.$refs.mpvueCityPicker.show()},onConfirm:function(t){this.pickerText=(0,n.default)(t),this.address=JSON.parse(this.pickerText).label,console.log(JSON.parse(this.pickerText).label)},radio:function(t){this.index2=t,console.log(t)},radioChange:function(t){console.log(t),this.index1=t.detail.value},srue:function(){this.condition1=!1,this.bq=this.index1,this.bqId=this.index2,console.log(this.bqId)},quxiao:function(){this.condition1=!1},kai:function(t){this.kai1=t.detail.value,console.log(t)},open:function(){this.condition=!this.condition},open1:function(){this.condition1=!0},save:function(){0==this.kai1?this.kai1=0:this.kai1=1;var t=uni.getStorageSync("user").loginId||0;o.default.get("/QianYi_Shop/updateShopAddress?userId="+t+"&consigneeName="+this.people+"&consigneePhone="+this.phone+"&areaIdPath="+this.address+"&address="+this.detail+"&isDefault="+this.kai1+"&effectiveState=1&type="+this.bqId+"&id="+this.id).then(function(t){console.log(t),uni.showToast({title:t.data.msg,icon:"none"}),uni.navigateBack()}).catch(function(t){console.log(t)})}}};e.default=s},"7a44":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,"uni-page-body[data-v-25d537ec]{width:100%;height:100%}.whole[data-v-25d537ec]{background:#f2f2f2;width:100%;position:relative;height:100%}.contain[data-v-25d537ec]{width:90%;margin:0 auto;position:relative}.bj[data-v-25d537ec]{background:#fff;margin-top:%?20?%;width:100%}.ad[data-v-25d537ec],.bq[data-v-25d537ec],.ph[data-v-25d537ec],.pl[data-v-25d537ec]{width:100%;height:%?110?%;border-bottom:1px solid #e6e6e6}.ad[placeholder][data-v-25d537ec],.bq[placeholder][data-v-25d537ec],.ph[placeholder][data-v-25d537ec],.pl[placeholder][data-v-25d537ec]{font-size:%?28?%;font-weight:500;color:#666;line-height:%?110?%}uni-textarea[data-v-25d537ec]{width:100%;height:%?180?%;font-size:%?28?%;font-weight:500;color:#666;margin-top:%?42?%}.moren[data-v-25d537ec]{margin-top:%?40?%}.moren>uni-text[data-v-25d537ec]{font-size:%?32?%;font-weight:500;color:#1a1a1a}.moren>uni-switch[data-v-25d537ec]{width:%?88?%;height:%?46?%;float:right}.lx[data-v-25d537ec]{width:%?40?%;height:%?40?%;position:absolute;right:0;top:%?65?%}.jp[data-v-25d537ec]{width:%?22?%;height:%?22?%;position:absolute;right:0;top:%?0?%}uni-button[data-v-25d537ec]{width:100%;height:%?110?%;margin-top:%?30?%;line-height:%?110?%;text-align:center;font-size:%?32?%;font-weight:500;color:#1a1a1a}uni-picker[data-v-25d537ec]{width:%?22?%;height:%?22?%;position:absolute;right:0;top:%?265?%}.citypicker[data-v-25d537ec]{position:fixed;bottom:0;width:100%;height:%?480?%;background:#fff;z-index:99;overflow:hidden}.cityheader[data-v-25d537ec]{width:100%;height:%?100?%;position:absolute;top:%?100?%;background:#fff;z-index:999}.city-true[data-v-25d537ec]{position:absolute;color:#7bcf43;right:%?34?%;z-index:9999}.city-cancel[data-v-25d537ec]{float:left;position:absolute;left:%?34?%;z-index:9999}.open[data-v-25d537ec]{width:100%;height:100%;position:absolute;top:0;left:0;background:rgba(0,0,0,.2);z-index:999}.openIn[data-v-25d537ec]{width:%?560?%;height:%?760?%;background:#fff;border-radius:%?20?%;position:absolute;margin:0 auto;margin-top:%?-340?%;left:50%;margin-left:%?-280?%;top:50%}.In[data-v-25d537ec]{width:90%;margin:0 auto;padding-top:%?20?%;-webkit-box-sizing:border-box;box-sizing:border-box;text-align:center}.In>uni-text[data-v-25d537ec]{font-size:%?36?%;font-weight:500;color:#1a1a1a;text-align:center;margin:0 auto}.In uni-label[data-v-25d537ec]{width:100%;margin-bottom:%?60?%}.In uni-label>uni-text[data-v-25d537ec]{width:%?64?%;height:%?64?%;background:#999;border-radius:50%;display:inline-block;font-size:%?36?%;font-weight:700;color:#fff;text-align:center;line-height:%?64?%}.In uni-label>uni-image[data-v-25d537ec]{width:%?64?%;height:%?64?%;border-radius:50%;display:inline-block;margin-top:%?30?%;position:relative;top:%?24?%}.In uni-label>.txt[data-v-25d537ec]{width:%?284?%;height:%?27?%;font-size:%?26?%;font-weight:500;color:#666;display:inline-block;margin-left:%?30?%;text-align:center;background:none}.In uni-label>uni-radio[data-v-25d537ec]{margin-left:%?30?%}.In>.btn1[data-v-25d537ec]{width:100%;height:%?90?%;background:-o-linear-gradient(98deg,#3db3a3 0,#91e673 100%);background:linear-gradient(-8deg,#3db3a3,#91e673);border-radius:%?45?%;font-size:%?36?%;font-weight:500;color:#fff;text-align:center;line-height:%?90?%}.In>.btn2[data-v-25d537ec]{width:100%;height:%?90?%;background:#fff;border-radius:%?45?%;font-size:%?36?%;font-weight:500;color:#666;text-align:center;line-height:%?90?%}.zhezao[data-v-25d537ec]{width:100%;height:100%;position:absolute;top:0;left:0;background:rgba(0,0,0,.2)}",""])},b148:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"whole"},[i("v-uni-form",[i("v-uni-view",{staticClass:"bj"},[i("v-uni-view",{staticClass:"contain"},[i("v-uni-input",{staticClass:"pl",attrs:{placeholder:"收货人",value:t.people},model:{value:t.people,callback:function(e){t.people=e},expression:"people"}}),i("v-uni-input",{staticClass:"ph",attrs:{placeholder:"手机号码",value:t.phone},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}}),i("v-uni-input",{staticClass:"ad",attrs:{placeholder:"选择",value:t.address},on:{click:function(e){e=t.$handleEvent(e),t.showMulLinkageThreePicker(e)}}}),i("v-uni-picker",[i("v-uni-image",{staticClass:"jp",attrs:{src:"../../static/image/jump@2x.png"}})],1),i("v-uni-textarea",{attrs:{placeholder:"详细地址：如道路、门牌号、小区、楼栋号、单元室等",value:t.detail},model:{value:t.detail,callback:function(e){t.detail=e},expression:"detail"}})],1)],1),i("v-uni-view",{staticClass:"bj"},[i("v-uni-view",{staticClass:"contain"},[i("v-uni-input",{staticClass:"bq",attrs:{placeholder:"地址标签",value:t.index1},on:{focus:function(e){e=t.$handleEvent(e),t.open1(e)}}}),i("v-uni-view",{staticClass:"moren"},[i("v-uni-text",[t._v("设为默认地址")]),i("v-uni-switch",{attrs:{value:t.kai1},on:{change:function(e){e=t.$handleEvent(e),t.kai(e)}}})],1)],1),i("v-uni-button",{on:{click:function(e){e=t.$handleEvent(e),t.save(e)}}},[t._v("修改")])],1)],1),i("mpvue-city-picker",{ref:"mpvueCityPicker",attrs:{themeColor:t.themeColor,pickerValueDefault:t.cityPickerValueDefault},on:{"":function(e){e=t.$handleEvent(e)},onConfirm:function(e){e=t.$handleEvent(e),t.onConfirm(e)}}}),t.condition1?i("v-uni-view",{staticClass:"open"},[i("v-uni-view",{staticClass:"openIn"},[i("v-uni-view",{staticClass:"In"},[i("v-uni-text",[t._v("地址标签")]),i("v-uni-radio-group",{on:{change:function(e){e=t.$handleEvent(e),t.radioChange(e)}}},[i("v-uni-label",{staticClass:"tp"},[i("v-uni-text",[t._v("自")]),i("v-uni-text",{staticClass:"txt"},[t._v("自定义")]),i("v-uni-radio",{attrs:{value:"自"},on:{click:function(e){e=t.$handleEvent(e),t.radio(4)}}})],1),i("v-uni-label",{staticClass:"tp"},[i("v-uni-image",{attrs:{src:"../../static/image/homeicon@2x.png"}}),i("v-uni-text",{staticClass:"txt"},[t._v("家")]),i("v-uni-radio",{attrs:{value:"家"},on:{click:function(e){e=t.$handleEvent(e),t.radio(0)}}})],1),i("v-uni-label",{staticClass:"tp"},[i("v-uni-image",{attrs:{src:"../../static/image/companyicon@2x.png"}}),i("v-uni-text",{staticClass:"txt"},[t._v("公司")]),i("v-uni-radio",{attrs:{value:"公司"},on:{click:function(e){e=t.$handleEvent(e),t.radio(1)}}})],1),i("v-uni-label",{staticClass:"tp"},[i("v-uni-image",{attrs:{src:"../../static/image/schoolicon@2x.png"}}),i("v-uni-text",{staticClass:"txt"},[t._v("学校")]),i("v-uni-radio",{attrs:{value:"学校"},on:{click:function(e){e=t.$handleEvent(e),t.radio(2)}}})],1)],1),i("v-uni-button",{staticClass:"btn1",on:{click:function(e){e=t.$handleEvent(e),t.srue(e)}}},[t._v("确定")]),i("v-uni-button",{staticClass:"btn2",on:{click:function(e){e=t.$handleEvent(e),t.quxiao(e)}}},[t._v("取消")])],1)],1)],1):t._e()],1)},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},b82f:function(t,e,i){var a=i("7a44");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("79e4c212",a,!0,{sourceMap:!1,shadowMode:!1})},e988:function(t,e,i){"use strict";i.r(e);var a=i("b148"),n=i("f114");for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);i("0487");var d=i("2877"),c=Object(d["a"])(n["default"],a["a"],a["b"],!1,null,"25d537ec",null);e["default"]=c.exports},f114:function(t,e,i){"use strict";i.r(e);var a=i("3064"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);e["default"]=n.a}}]);