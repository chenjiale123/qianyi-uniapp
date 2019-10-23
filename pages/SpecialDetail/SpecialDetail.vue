<template>
<view class="whole">
  <view class="content">
 
    <view class='succ'>
      <image src='../../static/image/successfulicon@2x.png'></image>
      <text>交易成功</text>
    </view>
    <image src='http://dev.static.qianyipan.com/image/jpg/carillustrations@2x.png'></image>

    <view class='bm'>
      <image src='../../static/image/corrugated@2x.png'></image>
    </view>

  </view>
  <view class='center'>
    <view class='centerli' @click="kuaidi1">
      <image src='../../static/image/latestlogistics@2x.png' class='tp1'></image>
      <view class='right'>
        <text class='tx1'>{{kuaidi.data[0].context}}</text>
        <text>{{kuaidi.data[0].time}}</text>
      </view>
      <image src='../../static/image/Myaddress@2x.png' class='tp2'></image>
    </view>
    <view class='centerli2'>
      <image src='../../static/image/ilocation@2x.png'></image>
      <view class='right2'>
        <text class='tx1'>{{goods1.consigneeName}}</text>
        <text class='tx1'>{{goods1.consigneePhone}}</text>
        <text>{{goods1.consigneeAddress}}</text>
      </view>
    </view>
  </view>
  <view class='bj'>
    <view class='contain'>
      <view class='techan'>
        <image src='../../static/image/Thestoreicon@2x.png' class='tp'></image>
        <text>特产</text>
        <image src='../../static/image/fanhui@2x.png' class='ck'></image>

        <view class='list' v-for="(item,index) in goods1.orderGoodsList" :key="index">
          <image :src='qiniu+item.goodsImg'></image>
          <view class='right1'>
            <text class='title'>{{item.goodsName}}</text>
            <text class='com'>{{item.goodsSpecnames}}</text>
          </view>
          <view class='right2'>
            <text class='num1'  style="float:right;">{{item.goodsRealPrice}}</text>
            <text class='num2'  style="float:right;margin-top:20rpx;clear:both">×{{item.goodsNum}}</text>
          </view>


        </view>
        <view class='yun1'>
          <text class='left'>运费</text>
          <text class='right'>￥{{goods1.deliverMoney}}</text>
        </view>
        <view class='yun2'>
          <text class='left'>实付款(含运费)</text>
          <text class='right'>￥{{goods1.totalMoney}}</text>
        </view>
        <view class='btn'>
          <button open-type='contact'>联系卖家</button>
     
        </view>
      </view>
    </view>
  </view>
  <view class='bj'>
    <view class='contain'>
      <view class='lm'>
        <view class='lt'>
          <text class='left'>订单编号:</text>
          <text class='right'>{{goods1.expressNo}}</text>
        </view>
        <view class='lt'>
          <text class='left'>创建时间:</text>
          <text class='right'>{{goods1.createTime}}</text>
        </view>
        <view class='lt'>
          <text class='left'>支付时间:</text>
          <text class='right'>{{goods1.createTime}}</text>
        </view>
        <view class='lt'>
          <text class='left'>成交时间:</text>
          <text class='right'>{{goods1.deliveryTime}}</text>
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
				id1:'',
				goods1:"",
				kuaidi:""
			}
		},
			
		onLoad(options){
			var that = this
			
			
			
			      this.id1= options.id
			 
			    uniRequest.post('/QianYi_Shop/selectOrderInfo?id=' + this.id1).then(res => {
			      console.log( this.kuaidi)
			        
			
			
			        this.goods1= res.data.data
					this.kuaidi= JSON.parse(res.data.data.expressLogistics)
					if(res.data.data.expressLogistics.data){
						this.kuaidi.data=JSON.parse(res.data.data.expressLogistics).data
					}else{
						this.kuaidi.data=[{
							context:'暂无',
							time:new Date()
						}]
					}
			       
			
			   
			
			
			    }).catch(e => {
			      console.log(e)
			    })

		},
			
		methods:{
			kuaidi1:function(){
			uni.navigateTo({
			  url: '/pages/kuaidi/kuaidi?id=' + this.id1,
			  success: function(res) {},
			  fail: function(res) {},
			  complete: function(res) {},
			})
			},
			tuikuan:function(){
			uni.navigateTo({
			  url: '/pages/refund/refund?id=' + this.id1,
			  success: function(res) {},
			  fail: function(res) {},
			  complete: function(res) {},
			})
			},
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
	  float: left;
	  margin-left: 40rpx;
	}
	.succ image{
	  width: 36rpx;
	  height: 36rpx;
	}
	.succ text{
	  font-size:32rpx;
	
	font-weight:bold;
	color:rgba(255,255,255,1);
	position: relative;
	top: -8rpx;
	left: 20rpx;
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
	  height:210rpx;
	  padding-top: 38rpx;
	  box-sizing: border-box;
	}
	.centerli>.tp1{
	  width: 40rpx;
	  height: 40rpx;
	  float: left;
	  margin-left: 11rpx;
	}
	.centerli>.right{
	  width: 568rpx;
	  float: left;
	  margin-left: 11rpx;
	
	
	}
	.centerli>.right>text{
	  font-size:24rpx;
	
	font-weight:400;
	color:rgba(26,26,26,1);
	display: block;
	}
	.centerli>.right>.tx1{
	  font-size:28rpx;
	
	font-weight:bold;
	color:rgba(26,26,26,1);
	}
	.centerli>.tp2{
	    width: 40rpx;
	  height: 40rpx;
	  float: right;
	
	}
	.centerli2{
	  width: 100%;
	  height: 170rpx;
	
	}
	.centerli2>image{
	      width: 40rpx;
	  height: 40rpx;
	  float: left;
	  margin-left: 11rpx;
	}
	.centerli2>.right2{
	    width: 588rpx;
	  float: left;
	  margin-left: 11rpx;
	}
	.centerli2>.right2>text{
	  font-size:24rpx;
	
	font-weight:400;
	color:rgba(26,26,26,1);
	display: block;
	}
	.centerli2>.right2>.tx1{
	  font-size:28rpx;
	display: inline-block;
	margin-right: 22rpx;
	font-weight:bold;
	color:rgba(26,26,26,1);
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
	  margin-left: 20rpx;
	  margin-top: 14rpx;
	
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
	  height: 200rpx;
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
	  width: 380rpx;
	  height: 100%;
	  float: left;
	  margin-left: 24rpx;
	  position: relative;
	  top: 6rpx;
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
	  /* clear: both */
	  /* position: relative */
	}
	.techan>.list>.right2>.num1{
	  font-size:24rpx;
	  display: block;
	
	color:rgba(245,49,49,1);
	/* float: right; */
	/* margin-top: 16rpx; */
	
	
	}
	.techan>.list>.right2>.num2{
	  font-size:24rpx;
	  display: block;
	  /* float: right; */
	color:rgba(102,102,102,1);
	
	
	}
	.yun1{
	  width: 100%;
	  height: 86rpx;
	margin-top: 50rpx
	
	
	}
	.yun2{
	    width: 100%;
	  height: 86rpx;
	margin-top: 20rpx;
	
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
	
	float: right; 
	}
	.btn>button{
	width:178rpx;
	height:58rpx;
	border:2rpx solid rgba(102,102,102,1);
	border-radius:29rpx;
	text-align: center;
	line-height: 58rpx;
	font-size:28rpx;
	z-index: 9999;
	font-weight:500;
	color:rgba(26,26,26,1);
	float: right
	}
	.btn>contact-button{
	  
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
	  /* top: -80rpx; */
	}
	.lm>.lt{
	  width: 100%;
	  height: 98rpx;
	  /* border-bottom: 1px solid rgb(230, 229, 229); */
	  line-height: 98rpx;
	  /* margin-bottom: 20rpx; */
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
