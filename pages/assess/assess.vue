<template>
<view class='whole'>

  <view class='bj' v-for="(item,index) in goods5" v-if="goods5!==null" :key="index">
    <view class="contain ">
      <view class='techan'>
        <image src='../../static/image/Thestoreicon@2x.png' class='tp'></image>
        <text>特产</text>
        <image src='../../static/image/fanhui@2x.png' class='ck'></image>
        <view class='right'>
          <text>待评价 </text>

        </view>
        <view class='list '>
          <view class="intop " @click="jdDetail(item.id) " >
            <view class="In " v-for="(item,index) in item.orderGoodsList" :key="index">
              <image :src='qiniu+item.goodsImg'></image>
              <view class='right1'>
                <text class='title'>{{item.goodsName}}</text>
                <text class='com'>{{item.goodsSpecnames}}</text>
              </view>
              <view class='right2'>
                <text class='num1'>{{item.goodsRealPrice}}</text>
                <text class='num2'>x{{item.goodsNum}}</text>
              </view>

            </view>

            <text class='all'>合计：{{item.realTotalMoney}} 共{{item.orderGoodsList.length}}件商品</text>

            <text class='all'></text>

          </view>
          <view class='btn'>


            <button @click="shanchu(item.id) " >删除</button>

            <button class='etc' @click='detail(item.id,item.goodsId)'  >评价</button>

          </view>
        </view>
      </view>
    </view>
  </view>
  <view class='bj' v-if="leng5==0">
    <image src="http://dev.static.qianyipan.com/image/jpg/wudingdan@2x.png "></image>
  </view>


</view>
</template>

<script>
		import uniRequest from 'uni-request';
	export default{

			
		data(){
			return{
				  goods5: [],
				    leng5: '',
			}
		},
			
		onLoad(){
			 var that = this
			  
			    var userId = uni.getStorageSync('user').loginId || 0
			
			    uniRequest.post('/QianYi_Shop/selectShopOrder?userId='+userId+'&orderStatus=2&page=1').then(res => {
			      console.log(res)
			     
			        this.goods5= res.data.data.orderList,
			        this.leng5= res.data.data.orderList.length
			
			      
			 
			
			
			    }).catch(e => {
			      console.log(e)
			    })
		},
			
		methods:{
			  detail: function (id,goodid) {
		
			 var id4=id
			   
			    uni.navigateTo({
			      url: '/pages/commentList/commentList?id=' + goodid + '&ding=' + id,
			      success: function (res) { },
			      fail: function (res) { },
			      complete: function (res) { },
			    })
			  
			  },
			  shanchu: function (id) {
			       uniRequest.post('/QianYi_Shop/updateShopOrderStatus?id=' + id + '&status=-3').then(res => {
			      console.log(res)
			      uni.showToast({
			        title: '删除成功',
			        icon: 'success'
			      })
			  uni.navigateTo({
			  	url:"./assess"
			  })
			
			    }).catch(e => {
			      console.log(e)
			    })
			  },
		}
		
	}
</script>

<style>
	Page{
	    width: 100%;
	    height: 100%;
	  background:rgba(242,242,242,1);
	
	}
	.whole{
	  background:rgba(242,242,242,1);
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
	overflow: auto;
	}
	.swiper{
	  width: 100%;
	/* overflow: hidden; */
	
	}
	.swiper-tab{
	width:180%;
	position: relative;
	
	
	}
	
	.swiper-tab-item{
	
	font-size: 25rpx;
	color: #333;
	float: left;
	margin-right: 57rpx;
	
	}
	.active{
	
	  display: inline-block;
	font-size: 36rpx;
	color:#1a1a1a;
	border-bottom: 5rpx solid rgba(61,179,163,1);
	box-shadow:0rpx 6rpx 20rpx 0rpx rgba(144,240,169,0.5);
	
	
	
	}
	swiper{
	  text-align: center;
	  height: 3300rpx;
	}
	.techan{
	  width: 100%;
	  height: 100%;
	  /* position: relative; */
	  margin-top: 20rpx;
	
	}
	.techan .tp{
	  width: 48rpx;
	  height: 48rpx;
	  float: left;
	
	}
	.techan text{
	  font-size:28rpx;
	
	color:rgba(26,26,26,1);
	float: left;
	margin-left: 11rpx;
	}
	.techan .ck{
	  width: 10rpx;
	  height:20rpx;
	  float: left;
	  margin-left: 27rpx;
	  margin-top: 20rpx;
	
	}
	.techan .right{
	
	  height: 23rpx;
	  float: right;
	}
	.techan .right>text{
	  font-size:24rpx;
	
	color:#f53131;
	}
	
	.techan>.list{
	  width: 100%;
	height: 100%;
	  padding-top: 50rpx;
	  /* box-sizing: border-box; */
	  margin-bottom: 20rpx;
	  position: relative;
	}
	.intop{
	      width: 100%;
	  height: 100%;
	}
	.techan>.list .In{
	    width: 100%;
	  height: 100%;
	}
	.techan>.list image{
	  width: 148rpx;
	  height: 148rpx;
	  float: left;
	    margin-top: 16rpx;
	    clear: both
	
	}
	.techan>.list .right1{
	  width: 380rpx;
	  height: 100%;
	  float: left;
	   text-align: left;
	  margin-left: 24rpx;
	  margin-top: 8rpx;
	    /* clear: both */
	
	}
	.techan>.list .right1>.title{
	  font-size: 24rpx;
	  color: #1a1a1a;
	 
	}
	.techan>.list .right1>.com{
	  font-size: 22rpx;
	  color: #999;
	  display: block;
	}
	.techan>.list .right2{
	  width: 100rpx;
	  height: 100%;
	  float: right;
	  position: relative
	}
	.techan>.list .right2>.num1{
	  font-size:24rpx;
	  display: block;
	
	color:rgba(245,49,49,1);
	float: right;
	margin-top: 16rpx;
	height: 40rpx;
	
	
	}
	.techan>.list .right2>.num2{
	  font-size:24rpx;
	  display: block;
	  float: right;
	color:rgba(102,102,102,1);
	/* margin-top: ; */
	position: absolute;
	right: 0;
	top: 40rpx
	}
	.techan>.list .all{
	  font-size:24rpx;
	width: 40%;
	height: 60rpx;
	color:rgba(26,26,26,1);
	margin-top: 40rpx;
	float: right;
	
	}
	.techan>.list .btn{
	  width: 82%;
	  height: 58rpx;
	  /* padding-top: 20rpx; */
	float: right;
	
	
	z-index: 999;
	
	}
	.techan>.list .btn>button{
	  width:178rpx;
	height:58rpx;
	border:2rpx solid rgba(102,102,102,1);
	border-radius:29rpx;
	float: right;
	line-height: 58rpx;
	text-align: center;
	font-size:28rpx;
	
	color:rgba(26,26,26,1);
	}
	.techan>.list .btn>.etc{
	  border:2rpx solid rgba(245,49,49,1);
	  color:rgba(245,49,49,1);
	  margin-right: 20rpx;
	}
	.jindian{
	  width: 100%;
	  height: 408rpx;
	  position: relative;
	  margin-top: 50rpx;
	
	}
	.jindian>.tp{
	  width: 48rpx;
	  height: 48rpx;
	  float: left;
	
	}
	.jindian>text{
	  font-size:28rpx;
	
	color:rgba(26,26,26,1);
	float: left;
	margin-left: 11rpx;
	}
	.jindian>.ck{
	  width: 10rpx;
	  height:20rpx;
	  float: left;
	  margin-left: 27rpx;
	    margin-top: 20rpx;
	
	}
	.jindian>.right{
	 
	  height: 23rpx;
	  float: right;
	}
	.jindian>.right>text{
	  font-size:24rpx;
	
	color:#f53131;
	}
	.jindian>.list{
	  width: 100%;
	  height: 188rpx;
	  padding-top: 50rpx;
	  box-sizing: border-box;
	  margin-bottom: 20rpx;
	}
	.jindian>.list image{
	  width: 148rpx;
	  height: 148rpx;
	  float: left;
	    margin-top: 16rpx;
	
	}
	.jindian>.list .right1{
	  width: 360rpx;
	  height: 100%;
	  float: left;
	  margin-left: 24rpx;
	}
	.jindian>.list .right1>.title{
	  font-size: 24rpx;
	  color: #1a1a1a;
	
	}
	.jindian>.list .right1>.com{
	  font-size: 22rpx;
	  color: #999;
	  display: block;
	  
	
	}
	.jindian>.list .right2{
	  width: 100rpx;
	  height: 100%;
	  float: right;
	}
	.jindian>.list .right2>.num1{
	  font-size:24rpx;
	  display: block;
	
	color:rgba(245,49,49,1);
	float: right;
	margin-top: 16rpx;
	
	}
	.jindian>.list .right2>.num2{
	  font-size:24rpx;
	  display: block;
	  float: right;
	color:rgba(102,102,102,1);
	
	
	}
	.jindian>.list .all{
	  font-size:24rpx;
	
	color:rgba(26,26,26,1);
	margin-top: 20rpx;
	float: right;
	
	}
	.jindian>.list .btn{
	  width: 59%;
	  height: 58rpx;
	  padding-top: 70rpx;
	position: absolute;
	bottom: 0rpx;
	right:0rpx;
	
	}
	.jindian>.list .btn>button{
	  width:178rpx;
	height:58rpx;
	border:2rpx solid rgba(102,102,102,1);
	border-radius:29rpx;
	float: right;
	line-height: 58rpx;
	text-align: center;
	font-size:28rpx;
	
	color:rgba(26,26,26,1);
	}
	.jindian>.list .btn>.etc{
	  border:2rpx solid rgba(245,49,49,1);
	  color:rgba(245,49,49,1);
	  margin-right: 20rpx;
	}
</style>
