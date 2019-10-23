<template>
<view class="whole">
 <view class="edit">
    <text @click="zhuanhua" v-if="show">编辑</text>
    <text @click="zhuanhua1" v-if="!show">完成</text>

  </view>
<view class="contain" v-if="she!==false">


  <view class="list">
  <view class="listIn" v-for="(item,index) in goods" v-if="goods.length!==0">
    <image :src="qiniu+item.imageThumb"></image>
    <text>{{item.goodsName}}</text>
    <view class="bom">
    <text>￥{{item.discountPrice}}</text>
 
         <checkbox-group class="checkbox-box"  @change='goodsdagou(index)' v-if="item.stock != 0&&!show" >
              <label class="checkbox checkboxHeight">
                <checkbox :checked="item.selected" />
              </label>
            </checkbox-group>
    </view>
  </view>
   <view class="listIn1" v-if="goods.length==0">
   <image src="http://dev.static.qianyipan.com/image/jpg/empty@2x.png"></image>
   </view>
  </view>
</view>
<view class="contain" v-if="she==false">
<image src="http://dev.static.qianyipan.com/image/jpg/wuneirong@2x.png"></image></view>

 <view class="zongjia" v-if="!show">
    <checkbox-group class="checkbox-box1"  @change='checkedAll'>
      <label class="checkbox checkboxHeight">
        <checkbox :checked="checked_all" />
      </label>
    </checkbox-group>

    <button @click="delItem(index)" class="dingdan1">删除</button>

  </view>
</view>

</template>

<script>
		import uniRequest from 'uni-request';
	export default{
			
				
			
		data(){
			return{
				   jiage: true ,
				    show: true,
				    goods: "",
				    checked_all: false,     //全选
				    newArr: [],            //复选框选中
				    countMoney: 0,
				    goodsList: "",
				    carId: '',
				    shopId: '',
				    selected: true,
				    she:false,
				    dl: true 
			}
		},
			
		onLoad(){
			var that = this
			 
			    var userId = uni.getStorageSync('user').loginId || 0
			    uniRequest.get('/QianYi_Shop/selectMyWishList?userId='+userId+'&page=1').then(res => {
			      if (res.data.isSuc == true) {
			 
			          this.she=res.data.isSuc
			          this.goods=res.data.data.shopGoodsList
			   
			        // that.onLoad()
			      } else {
			    
			          this.she= res.data.isSuc
			          // cardTeams: res.data.cartsList,
			      
			      }
			  
			
			    }).catch(e => {
			      console.log(e)
			    })
		},
			
		methods:{
			 zhuanhua: function () {
			   
			      this.jiage= false
			      this.show= false
			   
			  },
			  zhuanhua1: function () {
			this.jiage= true
			this.show= true
			  },
			  gouwu1:function(){
			
			  },
			
			  goodsdagou: function (index) {
			    // console.log(e)
			    var that = this
			  
			    var goods = that.goods
			    var index = index
			    console.log(index)
			    var arr = that.newArr
			    var selected = goods[index].selected
			   
			    goods[index].selected = !selected
			    if (!selected) {
			      arr.push(index)
			    } else {
			      arr.pop()
			    }
			    console.log(goods.length)
			    console.log(arr.length)
			    if (arr.length == goods.length) {
			
			     
			        this.checked_all= true
			     
			
			    } else {
			     
			        this.checked_all= false
			     
			    }
			 
			      this.goods= goods
			      this.newArr= arr
			  
			
			    var a = []
			
			    for (var index in arr) {
			      a.push(goods[index].id)
			
			    }
			    console.log(a)
			   
			      this.carId= a.join(',')
			   
			
			  },
			  // 全选
			  checkedAll: function () {
			    var that = this
			    var checked_all = that.checked_all
			    checked_all = !checked_all
			    var goods = that.goods
			    var arr = []
			    console.log(checked_all)
			    for (var i = 0; i < goods.length; i++) {
			      goods[i].selected = checked_all
			      console.log(checked_all)
			      if (checked_all) {
			        arr.push(i)
			      } else {
			        arr = []
			      }
			    }
			    console.log(arr)
			    
			      this.goods= goods
			      this.checked_all= checked_all
			      this.newArr= arr
			  
			    var a = []
			
			    for (var index in arr) {
			      a.push(goods[index].id)
			
			    }
			    console.log(a)
			 
			      this.carId= a.join(',')
			  
			
			
			  },
			  delItem: function (index) {
			    var that = this;
			    var index = index
			    var goods = that.goods
			    console.log(goods)
			    uni.showModal({
			      title: '提示',
			      content: '确定删除吗？',
			      cancelText: '否',
			      confirmText: '是',
			      success: function (res) {
			        if (res.confirm) {
			
			          console.log(index)
			          console.log(goods)
			          var userId = uni.getStorageSync('user').loginId || 0
			
			         uniRequest.post('/QianYi_Shop/deleteGoodsCollection?goodsId=' + that.carId+'&userId='+userId).then(res => {
			            goods.splice(index, 1);
			
			           
			              this.goods= goods
			            
			            that.onLoad()
			            console.log("111")
			         
			          }).catch(e => {
			            console.log(e)
			            console.log(goods[index].id)
			          })
			
			
			
			        }
			      }
			    })
			  },
			  dingdan1: function () {
			    var that = this
			    var userId = uni.getStorageSync('user').loginId || 0
			
			    uniRequest.get('/QianYi_Shop/delGoodsCarts?ids=' + this.goods[index].id + '&userId=' + userId).then(res => {
			
			
			      console.log(res)
			      this.onLoad()
			
			    }).catch(e => {
			      console.log(e)
			    })
			  },
		}
		
	}
</script>

<style>
	/* pages/yuan/yuan.wxss */
	Page{
	    width: 100%;
	  height: 100%;
	    background:rgba(242,242,242,1);
	     padding-bottom: 49rpx;
	}
	.whole{
	  width: 100%;
	  height: 100%;
	  background:rgba(242,242,242,1);
	  position: relative;
	    padding-bottom: 49rpx;
	}
	.contain{
	  width: 94%;
	  margin: 0 auto;
	  height: 100%;
	 padding-bottom: 49rpx;
	}
	.edit{
	  width: 100%;
	height:66rpx;
	background:rgba(255,255,255,1);
	/* border-radius:10px; */
	margin: 0 auto;
	line-height: 66rpx;
	}
	.edit>text{
	  float: right;
	  font-size:26rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(61,178,163,1);
	margin-right: 30rpx;
	}
	.list{
	  width: 100%;
	  height: auto;
	    padding-bottom: 90rpx;
	    overflow: hidden
	
	
	}
	.list>.listIn{
	 width:338rpx;
	height:510rpx;
	background:rgba(255,255,255,1);
	box-shadow:0px 6rpx 12rpx 0px rgba(0, 0, 0, 0.08);
	border-radius:10rpx;
	margin-left: 14rpx;
	float: left;
	margin-top: 18rpx;
	}
	.list>.listIn1{
	 width:100%;
	height:auto;
	background:rgba(255,255,255,1);
	
	}
	.listIn>image{
	 width:336rpx;
	height:336rpx;
	border-radius:10rpx;
	}
	.listIn>text{
	display: block;
	margin: 24rpx auto;
	  width:278rpx;
	height:64rpx;
	font-size:26rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(26,26,26,1);
	 display: -webkit-box;
	          -webkit-box-orient: vertical;
	            -webkit-line-clamp: 2;
	            overflow: hidden;
	}
	.bom{
	  width: 100%;
	  height: 48rpx;
	
	}
	.bom>text{
	  font-size:36rpx;
	font-family:PingFang-SC-Bold;
	font-weight:bold;
	color:rgba(245,49,49,1);
	float: left;
	margin-left: 20rpx;
	}
	.bom>button{
	  width:158rpx;
	height:48rpx;
	border:1px solid rgba(102,102,102,1);
	border-radius:24rpx;
	font-size:20rpx;
	text-align: center;
	line-height: 48rpx;
	float: right;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(102,102,102,1);
	}
	checkbox-group{
	    border-radius: 50%;
	      margin-bottom: 14rpx;
	}
	.checkbox-box{
	  float: right;
	  border-radius: 50%;
	  margin-right: 20rpx;
	  margin-bottom: 14rpx;
	  position: relative;
	  top: -8rpx;
	}
	.zongjia>.dingdan1{
	  width: 270rpx;
	  height: 98rpx;
	  float: right;
	  background:linear-gradient(-8deg,rgba(61,179,163,1) 0%,rgba(145,230,115,1) 100%);
	  font-size:36rpx;
	font-weight:500;
	color:rgba(255,255,255,1);
	line-height: 98rpx;
	text-align: center
	
	}
	.zongjia{
	  position: fixed;
	  bottom: 0;
	  width: 100%;
	  height: 98rpx;
	  background: #fff
	
	}
	.checkbox-box1{
	 width:36rpx;
	height:36rpx;
	float: left;
	  line-height: 98rpx;
	margin-left: 40rpx;
	  box-sizing: border-box;
	  border-radius: 50%;
	}
	.all{
	  line-height: 98rpx;
	  font-size:32rpx;
	font-weight:bold;
	color:rgba(51,51,51,1);
	margin-left: 40rpx;
	float: left
	}

</style>
