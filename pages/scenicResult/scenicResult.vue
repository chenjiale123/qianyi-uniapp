<template>
	<view class="whole">
	  <view class='content'>
	    <view class='succ'>
	      <text class='title'>交易成功</text>
	
	    </view>
	 
	
	    <view class='bm'>
	      <image src='../../static/image/corrugated@2x.png'></image>
	    </view>
	  </view>
	  <view class='center'>
	    <view class='centerli'>
	      <view class='left'>
	        <text class='top'>{{jindian.scenicName}}</text>
	        <text class='top1'>{{jindian.createDate}}</text>
	      </view>
	      <image src='../../static/image/blackjump@2x.png'></image>
	    </view>
	    <view class='centerli2'>
	      <view class='left2'>
	        总金额
	        <text>￥{{jindian.price}}</text>
	      </view>
	      <view class='right2'>
	        <text>￥{{jindian.scenicSpotWithBLOBs.ticketPrice}}</text>×{{jindian.ticketNum}}张
	      </view>
	
	    </view>
	    <view class='centerli3'>
	      <text @click="quxiao(jindian.id)"  class="a">取消订单</text>
	      <text class="b">联系客服</text>
	      <button @click="tuikuan(jindian.id)" >退款</button>
	    </view>
	  </view>
	  <view class='bj'>
	    <view class='contain'>
	      <view class='list1'>
	        <text>入园须知</text>
	        <image src='../../static/image/tab.png'></image>
	
	        <view class='text'>
	          <text class='xiu'>入园方式：无需换票，快速入园</text>
	          <text class='ha'>凭商家确认短信、手机号在前台直接验证入园</text>
	          <text class='xiu'>商家短信：</text>
	          <text class='ha'>商家确认短信会在下单成功后3分钟内发送</text>
	          <text class='xiu'>景区开放时间：</text>
	          <text class='ha'>周一至周五   11:00~次日01:00开放；</text>
	          <text class='ha'>周一至周五   11:00~次日01:00开放；</text>
	
	        </view>
	
	      </view>
	
	
	    </view>
	  </view>
	  <view class='bj'>
	    <view class='contain'>
	      <view class='list2'>
	        <text>退款说明</text>
	        <image src='../../static/image/tab.png'></image>
	
	        <view class='text'>
	          <text class='xiu'>退款规则：随时退</text>
	          <text class='ha'>90天内支持随时退款，经核实如未取票，可免费取消；</text>
	          <text class='xiu'>极速处理：</text>
	          <text class='ha'>提交申请后一个工作日内完成退款申请的审核</text>
	          <text class='xiu'>额外说明：</text>
	          <text class='ha'>未使用可随时申请退款</text>
	          <text class='ha'>订单不支持部分退</text>
	          <text class='ha'>如需改期，请申请取消后重新预定</text>
	
	        </view>
	
	      </view>
	
	
	    </view>
	  </view>
	  <view class='bj'>
	    <view class='contain'>
	      <view class='list3'>
	        <text>游客信息</text>
	        <image src='../../static/image/tab.png'></image>
	
	        <view class='xinxi'>
	          <text>游客：{{jindian.buyers}}</text>
	          <text>手机号：{{jindian.buyersPhone}}</text>
	        </view>
	  
	      </view>
	
	
	    </view>
	
	  </view>
	    <view class='bj'>
	    <view class='contain'>
	      <view class='lt'>
	        <text class='left'>订单编号:</text>
	            <!-- <button class='right1'>复制  </button> -->
	        <text class='right'>{{jindian.orderno}}</text>
	    
	      </view>
	      <view class='lt'>
	        <text class='left'>下单时间:</text>
	        <text class='right'>{{jindian.createDate}}</text>
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
				id:'',
				jindian:{}
			}
		},
			
		onLoad(options){
			  var that=this
			   
			    var id=options.id
			    
			      this.id=id
			  
			    uniRequest.post('/QianYi/selectScenicOrderInfo?id='+this.id).then(res => {
			      console.log(res)
			
			this.jindian=res.data.data
			
			   
			
			
			    }).catch(e => {
			      console.log(e)
			    })
		},
			
		methods:{
			 quxiao: function (id) {
			    uniRequest.post('/QianYi/updateScenicOrder?orderId=' + id + '&orderStauts=-2').then(res => {
			      console.log(res)
			      uni.showToast({
			        title: '取消订单成功',
			        icon: 'success'
			      })
			        uni.navigateBack()
			    }).catch(e => {
			      console.log(e)
			    })
			  },
			  tuikuan: function (id) {
			   uni.showModal({
			      title: '提示',
			      content: '确认退款？',
			      success: function (res) {
			        if (res.confirm) {
			          uniRequest.post('/QianYi/updateRefundScenicOrder?orderId=' + id + '&refund=1').then(res => {
			            console.log(res)
			
			
			          }).catch(e => {
			            console.log(e)
			          })
			          // console.log('用户点击确定')
			        } else if (res.cancel) {
			          console.log('用户点击取消')
			        }
			      }
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
	  width: 80%;
	  height: 40rpx;
	
	  box-sizing: border-box;
	  float: left;
	  margin-left: 40rpx;
	  padding-top: 50rpx;
	
	}
	
	.succ>.span{
	  
	  text-align: left;
	  position: relative;
	  left: -10rpx;
	  
	font-size:28rpx;
	margin-right: 29rpx;
	font-weight:500;
	color:rgba(255,255,255,1);
	}
	.title{
	
	  text-align: left;
	  font-size:36rpx;
	
	font-weight:bold;
	display: block;
	color:rgba(255,255,255,1);
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
	  height: 345rpx;
	  margin: 0 auto;
	  background: #fff;
	  position: relative;
	  top:-100rpx;
	  box-shadow:0px 5rpx 10rpx 0px rgba(61,178,163,0.1);
	border-radius:20rpx;
	
	}
	.centerli{
	width: 100%;
	height: 120rpx;
	
	}
	.centerli>.left{
	  margin-top: 40rpx;
	  margin-left: 30rpx;
	  float: left;
	}
	.centerli>.left>.top{
	  font-size:32rpx;
	
	font-weight:bold;
	color:rgba(26,26,26,1);
	}
	.centerli>.left>.top1{
	  margin-top: 20rpx;
	  font-size:26rpx;
	font-weight:500;
	color:rgba(153,153,153,1);
	display: block;
	}
	.centerli>image{
	  width: 20rpx;
	  height: 28rpx;
	  float: right;
	  margin-right: 30rpx;
	  margin-top: 50rpx;
	}
	.centerli2{
	  widows: 100%;
	  height: 60rpx;
	  line-height: 60rpx;
	
	}
	.centerli2>.left2{
	  margin-top: 40rpx;
	margin-left: 30rpx;
	  font-size:32rpx;
	
	font-weight:500;
	color:rgba(26,26,26,1);
	width: 40%;
	float: left;
	clear: both
	}
	.centerli2>.left2>text{
	  font-size:24rpx;
	  margin-left: 25rpx;
	
	font-weight:bold;
	color:rgba(245,49,49,1);
	}
	.centerli2>.right2{
	    margin-top: 40rpx;
	/* margin-left: 30rpx; */
	  float: right;
	  margin-right: 30rpx;
	  font-size:26rpx;
	
	font-weight:500;
	color:#1A1A1A;
	}
	.centerli2>.right2>text{
	    font-size:26rpx;
	
	font-weight:500;
	color:#f53131;
	}
	.centerli3{
	  width: 100%;
	  height: 108rpx;
	margin-top: 60rpx;
	}
	.centerli3>.a{
	  /* display: inline-block; */
	  width: 30%;
	
	  font-size:28rpx;
	font-weight:500;
	color:rgba(26,26,26,1);
	/* margin-left: 30rpx; */
	
	text-align: center;
	float: left;
	clear: both;
	margin-top: 30rpx;
	
	}
	.centerli3>.b{
	margin-top: 30rpx;
	
	    /* display: inline-block; */
	  width: 30%;
	/* height: 100%; */
	text-align: center;
	  font-size:28rpx;
	font-weight:500;
	color:rgba(26,26,26,1);
	float: left;
	
	}
	.centerli3>button{
	  width:168rpx;
	height:58rpx;
	border:2rpx solid rgba(245,49,49,1);
	border-radius:29px;
	text-align: center;
	line-height: 58rpx;
	margin-top: 25rpx;
	color: #f53131;
	float: right;
	margin-right: 30rpx;
	font-size: 26rpx;
	}
	.list1{
	  position: relative;
	  top: -80rpx;
	
	}
	.list2{
	  position: relative;
	  top: -80rpx;
	  height: 495rpx;
	  margin-top: 20rpx;
	  
	
	}
	.list3{
	  position: relative;
	  top: -80rpx;
	  height: 343rpx;
	  margin-top: 20rpx;
	  
	
	}
	.list1>text,.list2>text,.list3>text{
	  font-size:36rpx;
	font-weight:bold;
	color:rgba(26,26,26,1);
	}
	.list1>image,.list2>image,.list3>image{
	  display: block;
	  width:142rpx;
	height:10rpx;
	position: relative;
	top: -6rpx;
	}
	.list1>.text,.list2>.text{
	margin-top: 4rpx;
	}
	.list1>.text>.xiu,.list2>.text>.xiu{
	  margin-top: 30rpx;
	  display: block;
	  font-size:28rpx;
	font-weight:500;
	color:rgba(26,26,26,1);
	}
	.list1>.text>.ha,.list2>.text>.ha{
	  display: block;
	  margin-top: 12rpx;
	  font-size:26rpx;
	font-weight:500;
	color:rgba(153,153,153,1);
	}
	.list3>.xinxi{
	  width: 100%;
	  height: 132rpx;
	  margin-top: 30rpx;
	}
	.list3>.xinxi>text{
	  font-size:28rpx;
	font-weight:500;
	color:rgba(26,26,26,1);
	display: block;
	}
	.lt{
	  width: 100%;
	  height: 98rpx;
	  border-bottom: 1px solid rgb(230, 230, 230);
	  position: relative;
	  top: -70rpx;
	}
	
	.lt>text{
	  line-height: 98rpx;
	}
	
	.lt>.left{
	  font-size:28rpx;
	font-family:PingFang-SC-Bold;
	font-weight:bold;
	color:rgba(26,26,26,1);
	float: left;
	}
	.lt>.right{
	  font-size:26rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(51,51,51,1);
	float: right;
	}
	.lt>.right1{
	  width:88rpx;
	height:38rpx;
	border:2rpx solid rgba(102,102,102,1);
	border-radius:19rpx;
	text-align: center;
	line-height: 38rpx;
	font-size: 22rpx;
	float: right;
	margin-top: 26rpx;
	}
</style>
