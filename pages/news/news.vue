<template>
	<view class="contain">
	  <view class='list' @click='detail(item)'v-for="(item,index) in aritle"  :key="index" >
	    <view class='left'>
	      <text class='title'>{{item.title}}</text>
	      <image src='../../static/image/liulan@2x.png'></image>
	      <text class='people'>{{item.click}}人已浏览</text>
	    </view>
	    <image :src='item.preview'></image>
	  </view>
	 
	</view>
</template>

<script>
		import uniRequest from 'uni-request';
	export default{
			
				
			
		data(){
			return{
				  aritle:[],
				  item:''
			}
		},
			
		onLoad(){
			 var that = this
			 
			    uniRequest.post('/QianYi_Shop/selectArticle?page=1').then(res => {
			      console.log(res)
			     
			        this.aritle= res.data.data.ArticleList
			     
			
			    }).catch(e => {
			      console.log(e)
			    })
		},
			
		methods:{
			detail:function(item){
			 
			    this.item= JSON.stringify(item)
			  
		
			  var app = getApp();
			  app.line = this.item;
			uni.navigateTo({
			  url: '/pages/newsdetail/newsdetail?item1='+this.item,
			  success: function(res) {},
			  fail: function(res) {},
			  complete: function(res) {},
			})
			},
		}
		
	}
</script>

<style>
	.contain{
	    width: 90%;
	  margin: 0 auto;
	  position: relative;
	
	}
	.list{
	  width: 100%;
	  height: 174rpx;
	  margin-bottom: 60rpx;
	}
	.list .left{
	  width: 414rpx;
	  height: 100%;
	  float: left;
	}
	.left>.title{
	font-size:32rpx;
	
	font-weight:bold;
	color:rgba(26,26,26,1);
	display: block;
	}
	.left>image{
	  margin-top: 37rpx;
	  width: 28rpx;
	  height: 28rpx;
	}
	.left>.people{
	 font-size: 24rpx;
	 color: #999;
	 margin-left: 10rpx;
	}
	.list>image{
	  width: 232rpx;
	  height: 174rpx;
	  float: right;
	}

</style>
