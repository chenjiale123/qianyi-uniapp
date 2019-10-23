<template>
	<view class="whole">
	
	<view class="contail">
	    <view class='list' v-for="(item,index) in jindian" :key="index" @click="detail(item.id)"  v-if="jindian!==null">
	      <image :src='qiniu+shit[index]'></image>
	      <view class='right'>
	        <text class='title'>{{item.scenicName}}</text>
	        <view class='fw'>自然风光</view>
	        <view class='fen'>
	          <image src='../../static/image/pingfen01@2x.png' ></image>
	          <text class='pinfen'>{{item.score}}分</text>
	        </view>
	
	        <view class='intro'>
	          <text>{{item.distance/1000}}km</text>
	          <text>{{item.city}}</text>
	        </view>
	        <view class='price' @click='price'>
	          <text class='small'>￥</text>
	          <text class='big'>{{item.ticketPrice}}</text>
	        </view>
	        <text class='ka'>随买随用</text>
	      </view>
	    </view>
	      <view class="list1" v-if="jindian==null">
	       <image src="../../static/image/screening@2x.png"></image>
	      </view>  
	</view>
	</view>

</template>

<script>
		import uniRequest from 'uni-request';
	export default{
			
				
			
		data(){
			return{
				jindian:[],
				img:'',
				shit:''
			}
		},
			
		onLoad(options){
			 var that = this
			  
			var id=options.id
			    var city = options.city
			    var startLonLat = options.startLonLat
			    var that = this
			    console.log(startLonLat)
			    uniRequest.get('/QianYi/forYourChoice?city=' + city + '&page=1&startLonLat=' + startLonLat+'&label='+id).then(res => {
			
			      var shit = []
			      
			        this.jindian= res.data.data.scenicList
			        // img: res.data.scenicList.pictureUrl.split(',')[0]
			      
			      for (let key in this.jindian) {
			      
			          this.img= this.jindian[key]["pictureUrl"].split(',')[0]
			
			
			       
			        shit.push(this.img)
			
			      }
			      console.log(shit)
			     
			        this.shit= shit
			      
			    }).catch(e => {
			      console.log(e)
			    })
		},
			
		methods:{
			 detail: function (id) {
			    var userId = uni.getStorageSync('user').loginId || 0
			
			    if (userId == 0) {
			      uni.navigateTo({
			        url: '/pages/loginway/loginway',
			        success: function (res) { },
			        fail: function (res) { },
			        complete: function (res) { },
			      })
			    } else {
			      uni.navigateTo({
			        url: '/pages/detail/detail?id=' + id,
			        success: function (res) { },
			        fail: function (res) { },
			        complete: function (res) { },
			      })
			    }
			  },
		}
		
	}
</script>

<style>
	/* pages/listJD/listJD.wxss */
	Page{
	    width: 100%;
	  height: 100%;
	}
	.whole{
	  /* background:rgba(242,242,242,1); */
	  width: 100%;
	  height: 100%;
	  position: relative;
	    padding-top: 24rpx;
	  box-sizing: border-box;
	}
	
	.contail{
	width: 94%;
	margin: 0 auto;
	
	}
	.list{
	
	  padding: 0;
	  width: 100%;
	  height: 196rpx;
	
	  margin-bottom: 60rpx;
	  /* box-shadow:0px 6rpx 12rpx 0px rgba(0, 0, 0, 0.1); */
	
	}
	.list1{
	
	  padding: 0;
	  width: 100%;
	  height: 400rpx;
	
	  margin-bottom: 60rpx;
	  /* box-shadow:0px 6rpx 12rpx 0px rgba(0, 0, 0, 0.1); */
	
	}
	.list>image{
	  width: 248rpx;
	  height: 196rpx;
	  border-radius: 10rpx;
	  margin-left: 20rpx;
	  margin-top: 12rpx;
	
	}
	.list1>image{
	  width: 100%;
	  height: 100%;
	  /* border-radius: 10rpx;
	  margin-left: 20rpx;
	  margin-top: 12rpx; */
	
	}
	.list>.right{
	  width: 400rpx;
	  height:100%;
	  float: right;
	
	}
	.list>.right>.title{
	  font-size:32rpx;
	
	color:rgba(26,26,26,1);
	
	}
	.list>.right>.fw{
	width:100rpx;
	height:30rpx;
	background:rgba(235,252,227,1);
	border-radius:6rpx;
	font-size:22rpx;
	
	color:rgba(93,191,57,1);
	text-align: center;
	display: inline-block;
	margin-left: 17rpx;
	
	}
	.list>.right>.fen>image{
	  width: 26rpx;
	  height: 26rpx;
	  
	}
	.list>.right>.fen>.pinfen{
	
	font-size:24rpx;
	
	color:rgba(255,127,102,1);
	
	}
	.list>.right>.intro>text{
	
	font-size:24rpx;
	
	font-weight:500;
	color:rgba(153,153,153,1);
	margin-right: 30rpx;
	
	}
	.list>.right>.price{
	display: inline-block;
	}
	.list>.right>.price>.small{
	  font-size: 24rpx;
	  color:rgba(245,49,49,1);
	
	}
	.list>.right>.price>.big{
	  font-size: 40rpx;
	  color:rgba(245,49,49,1);
	
	}
	.ka{
	  width:96rpx;
	height:26rpx;
	border:1px solid rgba(61,178,163,1);
	border-radius:6rpx;
	font-size:20rpx;
	
	color:rgba(61,178,163,1);
	text-align: center;
	line-height: 26rpx;
	margin-left: 12rpx;
	position: relative;
	top:-5rpx;
	
	
	}

</style>
