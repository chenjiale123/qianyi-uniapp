<template>
<view class="whole">
  <view class="content">

    <view class='succ'>

      <text>卖家退款中</text>
    </view>


    <view class='bm'>
      <image src='../../static/image/corrugated@2x.png'></image>
    </view>

  </view>
  <view class='center'>
    <view class='centerli' @click="kuaidi1">
      退款金额：
      <text>￥{{goods.backMoney}}</text>
    </view>
    <view class='centerli2'>
      <view class="li">
        <view class="left">
          退回至支付宝
        </view>
        <view class="right">
          未收到退款？
        </view>
      </view>
      <view class="jindu" v-if="goods.refundStatus==1">
        <view>
          <text class="txt5">卖家退款</text>
          <image src="../../static/image/reenhook@2x.png"></image>
          <text class="txt5">{{goods.createTime}}</text>
        </view>
        <view>
          <text >银行受理</text>
       
        </view>
        <view>
          <text>退款成功</text>
      
        </view>
      </view>
      <view class="jindu1" v-if="goods.refundStatus==2">
        <view>
          <text>卖家退款</text>
          <image src="../../static/image/reenhook@2x.png"></image>
          <text>{{goods.createTime}}</text>
        </view>
        <view>
          <text>银行受理</text>
          <image src="../../static/image/reenhook@2x.png"></image>
          <text>{{goods.createTime}}</text>
        </view>
        <view>
          <text class="txt5">退款成功</text>
          <image src="../../static/image/reenhook@2x.png"></image>
          <text class="txt5">{{goods.createTime}}</text>
        </view>
      </view>
    </view>
  </view>
  <view class='bj'>
    <view class='contain'>
      <view class='techan'>
        <text>退款信息</text>

        <view class='list' v-for="(item,index) in goods.shopOrderList.orderGoodsList" :key="index">
          <image :src='qiniu+item.goodsImg'></image>
          <view class='right1'>
            <text class='title'>{{item.goodsName}}</text>
            <text class='com'>{{item.goodsSpecnames}}</text>
          </view>



        </view>

      </view>
    </view>
  </view>
  <view class='bj'>
    <view class='contain'>
      <view class='lm'>
        <view class='lt'>
          <text class='left'>退款原因:</text>
          <text class='right'>{{reason}}</text>
        </view>
        <view class='lt'>
          <text class='left'>申请时间:</text>
          <text class='right'>{{goods.createTime}}</text>
        </view>
        <view class='lt'>
          <text class='left'>退款编号:</text>
          <text class='right'>{{goods.refundOrderNo}}</text>
        </view>

      </view>
    </view>
  </view>

</view>
</template>

<script>
	import uniRequest from 'uni-request';	
	export default{
			
				
			
		data(){
			return{
				id:"",
				    reason:'',
					goods:""
			}
		},
			
		onLoad(options){
			var that=this
			 var id1=options.id
			  
			 
			    uniRequest.get('/QianYi_Shop/selectOrderCourse?orderId='+id1).then(res => {
			      console.log(res)
			     
			
			
			        this.goods= res.data.data
			        this.reason= res.data.data.refundReson
			
			    
			      if (that.reason == 1) {
			      
			         this.reason='拍错/不想要'
			       
			      } else if (that.reason == 2) {
			       
			          this.reason= '与卖家协商退款'
			        
			      }
			      console.log(that.reason)
			
			
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
	  /* background:rgba(242,242,242,1); */
	  width: 100%;
	}
	.bj{
	  background: #fff;
	  margin-top: 20rpx;
	  width: 100%;
	  
	}
	.contain{
	width: 90%;
	margin: 0 auto;
	
	}
	.content{
	  width: 100%;
	  height: 310rpx;
	   background:linear-gradient(180deg,rgba(145,229,115,1) 0%,rgba(61,178,163,1) 100%);
	   text-align: center;
	   position: relative;
	}
	.succ{
	  width: 200rpx;
	  height: 40rpx;
	  padding-top: 80rpx;
	  box-sizing: border-box;
	margin: 0 auto;
	}
	.succ image{
	  width: 36rpx;
	  height: 36rpx;
	}
	.succ text{
	font-size:32rpx;
	font-family:PingFang-SC-Bold;
	font-weight:bold;
	color:rgba(255,255,255,1);
	}
	.content>image{
	  padding-top: 25rpx;
	  box-sizing: border-box;
	  width: 230rpx;
	  height: 160rpx;
	  float: right;
	margin-right: 40rpx;
	}
	.bm{
	  position: absolute;
	  width: 100%;
	  height: 88rpx;
	  bottom: 0;
	  left: 0;
	}
	.bm>image{
	  width: 100%;
	height: 100%;
	}
	.center{
	  width: 90%;
	  margin: 0 auto;
	  background: #fff;
	  position: relative;
	  top:-100rpx;
	  box-shadow:0px 5rpx 10rpx 0px rgba(61,178,163,0.1);
	border-radius:20rpx;
	height: auto
	
	}
	.centerli{
	  width: 100%;
	  height:140rpx;
	  padding-top: 38rpx;
	  box-sizing: border-box;
	  font-size:32rpx;
	font-family:PingFang-SC-Bold;
	font-weight:bold;
	color:rgba(26,26,26,1);
	text-align: center;
	}
	.centerli>text{
	 font-size:40rpx;
	font-family:PingFang-SC-Bold;
	font-weight:bold;
	color:rgba(245,49,49,1);
	text-align: center
	}
	
	.centerli2{
	  width: 100%;
	  height: 220rpx;
	
	}
	.centerli2>.li{
	  width: 100%;
	  height: 50rpx;
	}
	.centerli2>.li>.left{
	  float: left;
	  font-size:24rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(26,26,26,1);
	}
	.centerli2>.li>.right{
	  font-size:24rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(245,49,49,1);
	float: right;
	}
	.centerli2>.jindu{
	  width: 100%;
	  height: 168rpx;
	  margin-top: 30rpx;
	}
	.centerli2>.jindu>view{
	  width: 33.3%;
	  height: 100%;
	  float: left;
	  text-align: center;
	}
	.centerli2>.jindu>view>text{
	  display: block;
	font-size:24rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	margin-bottom: 20rpx;
	color: #999;
	}
	.centerli2>.jindu>view>.txt5{
	   display: block;
	font-size:24rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	margin-bottom: 20rpx;
	color: #000;
	}
	
	.centerli2>.jindu>view>image{
	  display: block;
	  width: 36rpx;
	  height: 36rpx;
	 
	  text-align: center;
	  margin: 0 auto;
	  margin-bottom: 20rpx;
	
	}
	.centerli2>.jindu1{
	  width: 100%;
	  height: 168rpx;
	  margin-top: 30rpx;
	}
	.centerli2>.jindu1>view{
	  width: 33.3%;
	  height: 100%;
	  float: left;
	  text-align: center;
	}
	.centerli2>.jindu1>view>text{
	  display: block;
	font-size:24rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	margin-bottom: 20rpx;
	color: #999;
	}
	.centerli2>.jindu1>view>.txt5{
	   display: block;
	font-size:24rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	margin-bottom: 20rpx;
	color: #000;
	}
	
	.centerli2>.jindu1>view>image{
	  display: block;
	  width: 36rpx;
	  height: 36rpx;
	 
	  text-align: center;
	  margin: 0 auto;
	  margin-bottom: 20rpx;
	
	}
	.techan{
	  position: relative;
	  top: -80rpx;
	}
	.techan>.tp{
	  width: 48rpx;
	  height: 48rpx;
	  float: left;
	
	}
	.techan>text{
	  font-size:28rpx;
	
	color:rgba(26,26,26,1);
	float: left;
	margin-left: 11rpx;
	}
	.techan>.ck{
	  width: 10rpx;
	  height:20rpx;
	  float: left;
	  margin-left: 27rpx;
	  margin-top: 20rpx;
	
	}
	.techan>.right{
	  width: 242rpx;
	  height: 23rpx;
	  float: right;
	}
	.techan>.right>text{
	  font-size:24rpx;
	
	color:rgba(153,153,153,1);
	}
	.list{
	  width: 100%;
	  height: 250rpx;
	  padding-top: 50rpx;
	  box-sizing: border-box;
	  margin-bottom: 20rpx;
	  position: relative;
	}
	.techan>.list>image{
	  width: 148rpx;
	  height: 148rpx;
	  float: left;
	    margin-top: 16rpx;
	
	}
	.techan>.list>.right1{
	  width: 480rpx;
	  height: 100%;
	  float: left;
	  margin-left: 24rpx;
	}
	.techan>.list>.right1>.title{
	  font-size: 24rpx;
	  color: #1a1a1a;
	  display: block
	}
	.techan>.list>.right1>.com{
	  font-size: 22rpx;
	  color: #999;
	}
	.techan>.list>.right2{
	  width: 100rpx;
	  height: 100%;
	  float: right;
	}
	.techan>.list>.right2>.num1{
	  font-size:24rpx;
	  display: block;
	
	color:rgba(245,49,49,1);
	float: right;
	margin-top: 16rpx;
	
	}
	.techan>.list>.right2>.num2{
	  font-size:24rpx;
	  display: block;
	  float: right;
	color:rgba(102,102,102,1);
	
	
	}
	.yun1{
	  width: 100%;
	  height: 86rpx;
	position: absolute;
	bottom: 140rpx
	
	}
	.yun2{
	    width: 100%;
	  height: 86rpx;
	position: absolute;
	bottom: 89rpx
	}
	.yun1>.left{
	  font-size:28rpx;
	float: left;
	font-weight:bold;
	color:rgba(26,26,26,1);
	}
	.yun1>.right{
	  font-size:26rpx;
	float: right;
	font-weight:500;
	color:rgba(51,51,51,1);
	}
	.yun2>.left{
	  font-size:28rpx;
	float: left;
	font-weight:bold;
	color:rgba(26,26,26,1);
	}
	.yun2>.right{
	  font-size:26rpx;
	float: right;
	font-weight:500;
	color:rgba(51,51,51,1);
	}
	.btn{
	  width: 100%;
	  height: 58rpx;
	  position: absolute;
	  bottom: 20rpx;
	}
	.btn>button{
	width:178rpx;
	height:58rpx;
	border:2rpx solid rgba(102,102,102,1);
	border-radius:29rpx;
	text-align: center;
	line-height: 58rpx;
	font-size:28rpx;
	
	font-weight:500;
	color:rgba(26,26,26,1);
	float: right
	}
	.btn>.etc{
	  width:168rpx;
	height:58rpx;
	border:2rpx solid #F53131;
	border-radius:29rpx;
	text-align: center;
	line-height: 58rpx;
	font-size:28rpx;
	
	font-weight:500;
	color:#F53131;
	}
	.lm{
	  position: relative;
	  top: -80rpx;
	}
	.lm>.lt{
	  width: 100%;
	  height: 98rpx;
	
	}
	.lm>.lt>text{
	  line-height: 98rpx;
	}
	.lm>.lt>.left{
	  font-size:28rpx;
	font-family:PingFang-SC-Bold;
	font-weight:bold;
	color:rgba(26,26,26,1);
	float: left;
	clear: both;
	}
	.lm>.lt>.right{
	  font-size:26rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(51,51,51,1);
	float: right;
	}
	

</style>
