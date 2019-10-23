<template>
	<view class='whole'>
	<view class='contain'>
	  <view class='list' v-for="(item,index) in discourt" :key="index">
	    <view class='quan'>{{item.couponMoney}} </view>
	    <text class='type1'>满 {{item.couponFullMoney}} 元可用</text>
	    <text class='type2'>商品领取</text>
	    <text class='type3'>将于{{item.endDate}} 过期</text>
	    <button class='btn1'> 使用</button>
	  </view>
	   <view class='list' v-for="(item,index) in disuser" :key="index">
	    <view class='quan'>{{item.couponMoney}} </view>
	    <text class='type1'>满 {{item.couponFullMoney}} 元可用</text>
	    <text class='type2'>商品领取</text>
	    <text class='type3'>将于{{item.endDate}} 过期</text>
	    <button class='btn1'> 使用</button>
	  </view>
	  <view class='list' v-for="(item,index) in disshop" :key="index">
	    <view class='quan1'>{{item.couponMoney}}</view>
	    <text class='type1'>满 {{item.couponFullMoney}} 元可用</text>
	    <text class='type2'>商品领取</text>
	    <text class='type3'>将于{{item.endDate}}过期</text>
	    <button class='btn2'>过期</button>
	  </view>
	   <view class='list' v-for="(item,index) in disablestroy" :key="index">
	    <view class='quan1'>{{item.couponMoney}}</view>
	    <text class='type1'>满 {{item.couponFullMoney}} 元可用</text>
	    <text class='type2'>商品领取</text>
	    <text class='type3'>将于{{item.endDate}}过期</text>
	    <button class='btn2'>过期</button>
	  </view>
	  <view class="list1" v-if="discourt==''&&disuser==''&&disshop==''&&disablestroy==''">
	       <image src="http://dev.static.qianyipan.com/image/jpg/wukajuan@2x.png"></image></view>
	  <!-- <text class='last'>没有更多了</text> -->
	</view>
	</view>
</template>

<script>
		import uniRequest from 'uni-request';
	export default{
			
				
			
		data(){
			return{
				   disshop:[] ,
				    disablest:[],
				    discourt: [],
				    disuser:[]
			}
		},
			
		onLoad(){
			    var that = this
			
			    var userId = uni.getStorageSync('user').loginId || 0
			
			    uniRequest.post('/QianYi_Shop/selectShopUserCoupon?userId='+userId).then(res => {
			
			      
			        this.disshop= res.data.data.disabledShopUserCouponsList
			        this.disablestroy= res.data.data.disabledStoresCouponsList
			        this.discourt= res.data.data.discountStoresCouponsList
			        this.disuser= res.data.data.shopUserCouponsList
			     
			 
			
			    }).catch(e => {
			      console.log(e)
			    })
		},
			
		methods:{
		}
		
	}
</script>

<style>
	.whole{
	  background:rgba(242,242,242,1);
	  width: 100%;
	}
	.contain{
	  width: 94%;
	  margin: 0 auto;
	}
	.list{
	  width: 100%;
	  height: 188rpx;
	position: relative;
	border-bottom: 1px solid rgba(242,242,242,1);
	}
	.quan{
	  position: absolute;
	  width: 148rpx;
	  height: 148rpx;
	  background: #ff7f66;
	  top: 20rpx;
	  left: 0;
	  border-radius: 16rpx;
	  color: #fff;
	  font-size: 40rpx;
	text-align: center;
	line-height: 148rpx;
	
	}
	.quan1{
	  position: absolute;
	  width: 148rpx;
	  height: 148rpx;
	  background: #ccc;
	  top: 20rpx;
	  left: 0;
	  border-radius: 16rpx;
	  color: #fff;
	  font-size: 40rpx;
	text-align: center;
	line-height: 148rpx;
	
	}
	
	.type1{
	position: absolute;
	top:44rpx;
	left: 178rpx;
	font-size: 28rpx;
	color: #1a1a1a;
	
	}
	.type2{
	  position: absolute;
	  top: 90rpx;
	  left: 178rpx;
	  font-size: 22rpx;
	  color: #999;
	}
	.type3{
	  position: absolute;
	  top: 122rpx;
	  left: 178rpx;
	  font-size: 22rpx;
	  color: #999;
	}
	.btn1{
	  width: 166rpx;
	  height: 66rpx;
	  background: #91e573;
	  border-radius: 32rpx;
	  color: #fff;
	  line-height: 66rpx;
	  text-align: center;
	  position: absolute;
	  right:0;
	  top: 62rpx;
	}
	.btn2{
	  width: 166rpx;
	  height: 66rpx;
	  background: #f2f2f2;
	  border-radius: 32rpx;
	  color: #999;
	  line-height: 66rpx;
	  text-align: center;
	  position: absolute;
	  right:0;
	  top: 62rpx;
	}
	.last{
	  display: block;
	  margin: 0 auto;
	  text-align: center;
	  color: #999;
	  font-size: 22rpx;
	}
</style>
