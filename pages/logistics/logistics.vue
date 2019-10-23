<template>

<view class='whole'>

  <view class='bj' v-for=" (item,index) in wuliu" v-if="she!==false" :key="index">
    <view class="contain">
      <view class='wuliu' >
        <text class='time'>{{item.logisticsMessage.data[0].ftime}}</text>
        <view class='list'>
          <text class='tishi'>{{item.logisticsMessage.data[0].status}}</text>
          <text class='jinru'  @click='detail(item.id)'> 查看详情 </text>
          <image src='../..static/image/fanhui@2x.png' class='img1'></image>

          <image :src='qiniu+item.orderGoodsList[0].goodsImg' class='image2'></image>
          <text class='com'>{{item.logisticsMessage.data[0].context}}。</text>
        </view>

      </view>
    </view>

  </view>
    <view class='bj'  v-if="she==false">
 
     <image src="http://dev.static.qianyipan.com/image/jpg/wudingdan@2x.png "></image>
    </view>   


</view>
</template>

<script>
		import uniRequest from 'uni-request';
	export default{
			
				
			
		data(){
			return{
				leng:'',
				wuliu:'',
				she:false
			}
		},
			
		onLoad(){
			 var userId = uni.getStorageSync('user').loginId || 0
			
			    uniRequest.get('/QianYi_Shop/selectLogistics?userId='+userId).then(res => {
			
			
			      console.log(res)
			      if(res.data.isSuc==true){
			     
			          this.wuliu= res.data.data
			          this.she= res.data.isSuc
			       
			      }else{
			       this.she= res.data.isSuc
			      }
			    
			
			    }).catch(e => {
			      console.log(e)
			    })
		},
			
		methods:{
			detail:function(id){
			uni.navigateTo({
			  url: '/pages/kuaidi/kuaidi?id='+id,
			  success: function(res) {},
			  fail: function(res) {},
			  complete: function(res) {},
			})
			},
		}
		
	}
</script>

<style>
	/* pages/wuliu/wuliu.wxss */
	Page{
	  width: 100%;
	  height: 100%
	}
	.whole{
	  background:rgba(242,242,242,1);
	  width: 100%;
	  height: 100%
	}
	.bj{
	  background: #fff;
	  margin-top: 20rpx;
	  width: 100%;
	  
	}
	.contain{
	      width: 94%;
	  margin: 0 auto;
	}
	.wuliu{
	  width: 100%;
	  height:298rpx;
	}
	.wuliu .time{
	display: block;
	width: 298rpx;
	  font-size: 22rpx;
	  color: #666;
	  margin: 0 auto;
	  margin-top: 48rpx;
	
	}
	.list{
	  width: 100%;
	  height: 268rpx;
	  margin-top: 30rpx;
	  position: relative;
	}
	.list .tishi{
	position: absolute;
	  color: #1a1a1a;
	  font-size: 32rpx;
	top: 20rpx
	}
	.jinru{
	right:40rpx;
	top: 30rpx;
	  font-size: 24rpx;
	  color: #666;
	  position: absolute;
	
	}
	.list .img1{
	  position: absolute;
	  right: 10rpx;
	  width: 12rpx;
	  height: 20rpx;
	  top: 40rpx;
	}
	.list .image2{
	top: 80rpx;
	  width: 148rpx;
	  height: 148rpx;
	  left: 0;
	  position: absolute;
	
	
	}
	.list .com{
	  top:120rpx;
	  position: absolute;
	  right: 0;
	  font-size: 28rpx;
	  color: #1a1a1a;
	  width: 70%
	}
</style>
