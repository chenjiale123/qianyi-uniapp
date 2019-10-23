<template>
	<view class="contain">
	<image src="../../static/image/xfzd.png" class="la" @click="top"></image>
	
	  <form >
	    <image class='sousuo' src='../../static/image/sousuo01@2x.png'></image>
	    <input placeholder='搜索你心仪的商品' @confirm="show" :value="searchValue" formType='submit' v-model="searchValue"></input>
	  </form>
	  <view class="hide" v-if="com">
	    <view class="his" v-if="searchRecord.length!==0">
	      <text>历史记录</text>
	      <image src="../../static/image/shanchu@2x.png" @click="del"></image>
	    </view>
	    <view class="jilu">
	      <button v-for="(item,index) in searchRecord" :key="index">
	        {{item.value}}
	      </button>
	    </view>
	    <text class="etc">热门搜索</text>
	    <view class="hot">
	      <button v-for="(item,index) in hot" @click="remen(item.content)" :key="index">
	        {{item.content}}
	        <image src="../../static/image/huoyan@2x.png"></image>
	      </button>
	    </view>
	  </view>
	  <view class="hide1" v-if="!com">
	    <view class="list" v-for="(item,index) in goodsList" v-if="goodsList!==null" @click="detail(item.id)" >
	      <image :src="qiniu+item.imageThumb"></image>
	      <view class="txt">
	        <image src="../../static/image/xpbq@2x.png"></image>
	        {{item.goodsName}}
	      </view>
	      <view class="price">
	        ￥{{item.discountPrice}}
	        <text>满减</text>
	      </view>
	    </view>
	    <view class="list1" v-if="goodsList.length==0">
	   <image src="http://dev.static.qianyipan.com/image/jpg/wuneirong@2x.png"></image>
	    
	    </view>
	  </view>
	</view>
</template>

<script>
		import uniRequest from 'uni-request';
	export default{
			
				
			
		data(){
			return{
				    com: true,
				    hot: '',
				    goodsList: '',
				    inputVal: '',
				    searchRecord: [],
					searchValue:''
			}
		},
			
		onLoad(){
			 var that = this
			 
			    uniRequest.post('/QianYi/selectHomeTopSearch?type=1&page=1').then(res => {
			      console.log(res)
			      
			        this.hot= res.data.data.hotSearchList
			
			      
			
			    }).catch(e => {
			      console.log(e)
			    })
			    this.openHistorySearch()
		},
			
		methods:{
			 top:function(){
			    uni.pageScrollTo({
			      scrollTop: 0
			    })
			  },
			  remen:function(content){
		         console.log(content)
			     this.searchValue=content
			     this.com=false
			 
			    var userId = uni.getStorageSync('user').loginId || 0
			
			    uniRequest.post('/QianYi/selectHomeSearchBykeyword?keyword=' + content + '&type=1&page=1&userId='+userId).then(res => {
			      console.log(res)
			      
			        this.goodsList= res.data.data.goodsList
			
			   
			
			    }).catch(e => {
			      console.log(e)
			    })
			  },
			  detail: function(id) {
			    uni.navigateTo({
			      url: '/pages/shopTetail/shopTetail?id=' + id,
			      success: function(res) {},
			      fail: function(res) {},
			      complete: function(res) {},
			    })
			  },
			  openHistorySearch: function() {
			    
			      this.searchRecord= uni.getStorageSync('searchRecord') || [] //若无储存则为空
		
			  },
			  del: function() {
			    uni.clearStorageSync('searhRecord')
			    
			      this.searchRecord= []
			   
			    this.onLoad()
			    console.log('111')
			  },
			  show: function(e) {
			     console.log(e)
			      this.com= false
			
			    var userId = uni.getStorageSync('user').loginId || 0
			
			    uniRequest.post('/QianYi/selectHomeSearchBykeyword?keyword=' + e.detail.value + '&type=1&page=1&userId='+userId).then(res => {
			      console.log(res)
			  
			        this.goodsList=res.data.data.goodsList
			
			     
			
			    }).catch(e => {
			      console.log(e)
			    })
			    var that = this
			    var inputVal = e.detail.value
			    var searchRecord = this.searchRecord
			    if (inputVal == '') {
			      //输入为空时的处理
			    } else {
			      //将搜索值放入历史记录中,只能放前五条
			      if (searchRecord.length < 5) {
			        searchRecord.unshift({
			          value: inputVal,
			          id: searchRecord.length
			        })
			      } else {
			        searchRecord.pop() //删掉旧的时间最早的第一条
			        searchRecord.unshift({
			          value: inputVal,
			          id: searchRecord.length
			        })
			      }
			      //将历史记录数组整体储存到缓存中
			      uni.setStorageSync('searchRecord', searchRecord)
			    }
			
			
			
			
			  },
		}
		
	}
</script>

<style>
	.contain{
	    width: 94%;
	  margin: 0 auto;
	  position: relative
	
	}
	.contain>.la{
	  width: 114rpx;
	  height: 114rpx;
	  position: fixed;
	 bottom: 100rpx;
	 z-index: 999999;
	 right: 0
	}
	input{
	  width: 100%;
	  height: 66rpx;
	  background: #f2f2f2;
	  border-radius: 34rpx;
	  margin: 0 auto;
	}
	input[placeholder]{
	  font-size: 28rpx;
	  color: #b3b3b3;
	  padding-left: 70rpx;
	  box-sizing: border-box;
	}
	.contain>.show{
	  width: 100%;
	  height:302rpx;
	
	  border-radius: 10rpx;
	 display: block;
	 margin: 40rpx auto;
	
	}
	.contain .sousuo{
	  width: 28rpx;
	  height: 28rpx;
	  position: absolute;
	  top:18rpx;
	  left: 28rpx;
	}
	.hot{
	  width: 100%;
	  height: auto;
	}
	.his{
	  width: 100%;
	  height: 40rpx;
	  margin-top: 28rpx;
	
	}
	.his>text{
	  float: left;
	font-size:32rpx;
	font-family:PingFang-SC-Bold;
	font-weight:bold;
	color:rgba(26,26,26,1);
	}
	.his>image{
	  width: 36rpx;
	  height: 36rpx;
	  float: right;
	  position: relative;
	  z-index: 99999999999999999999999999;
	}
	button{
	  background:rgba(242,242,242,1);
	border-radius:10rpx;
	padding: 5rpx 5rpx;
	font-size:28rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(51,51,51,1);
	text-align: center;
	  float: left;
	margin-left: 24rpx;
	margin-top: 20rpx;
	}
	.etc{
	  margin-top: 180rpx;
	}
	.contain text{
	  display: block;
	font-size:32rpx;
	font-family:PingFang-SC-Bold;
	font-weight:bold;
	color:rgba(26,26,26,1);
	}
	.jilu{
	  margin-top: 40rpx;
	  width: 100%;
	  height: auto;
	}
	button{
	  background:rgba(242,242,242,1);
	border-radius:10rpx;
	padding: 19rpx;
	font-size:28rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(51,51,51,1);
	text-align: center;
	  float: left;
	margin-left: 24rpx;
	
	}
	button>image{
	  width: 30rpx;
	  height: 30rpx;
	  margin-left: 10rpx;
	}
	.list{
	  width: 336rpx;
	  height: 510rpx;
	  float: left;
	  margin-left: 15rpx;
	  margin-top: 20rpx;
	  box-shadow:0px 6px 12px 0px rgba(0, 0, 0, 0.1);
	border-radius:10px;
	}
	.list1{
	  width: 100%;
	  height: 100%;
	
	
	  box-shadow:0px 6px 12px 0px rgba(0, 0, 0, 0.1);
	border-radius:10px;
	}
	.list>image{
	width:336rpx;
	height:336rpx;
	border-radius:10rpx;
	}
	.list>.txt{
	  width: 284rpx;
	  height: 64rpx;
	  margin: 0 auto;
	  margin-top: 24rpx;
	  display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	  font-size:26rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(26,26,26,1);
	}
	.list>.txt>image{
	  width:54rpx;
	height:26rpx;
	  display: inline-block;
	
	
	}
	
	.list>.price{
	  margin-top: 30rpx;
	  font-size:36rpx;
	font-family:PingFang-SC-Bold;
	font-weight:bold;
	color:rgba(245,49,49,1);
	}
	.list>.price>text{
	  display: inline-block;
	  width:54rpx;
	height:26rpx;
	border:1px solid rgba(245,49,49,1);
	border-radius:6rpx;
	font-size:20rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(245,49,49,1);
	text-align: center;
	line-height: 26rpx;
	}
</style>
