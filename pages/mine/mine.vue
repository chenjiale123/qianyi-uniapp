<template>
	<view class='whole'>
		<view class="content">
			<view class='top'>
				<view class='touxiang'>
					<image :src='touxiang' v-if="user"></image>
					<image src='../../static/image/greylogo@2x.png' v-else></image>

				</view>

				<text class='title' v-if="user">{{name}}</text>
				<text class='title' @click="show" v-else>点此登录</text>
				<image v-if="user" src="../../static/image/switch@2x.png" class="switch"></image>
				<text class='qie' v-if="user" @click="zhuxiao">切换账号</text>


				<image class='small1' v-if="user && huiyuan==0" src="../../static/image/Silvermember@2x.png"></image>
				<image class='small1' v-if="user && huiyuan==1" src="../../static/image/Goldmembership@2x.png"></image>
				<image class='small1' v-if="user && huiyuan==2" src="../../static/image/Platinummember@2x.png"></image>
				<image class='small1' v-if="user && huiyuan==3" src="../../static/image/Diamondmembership@2x.png"></image>
				<text class='small' v-if="!user">登录更精彩</text>
			</view>
			<view class='contain'>
				<view class='form'>
					<view @click="coupon">
						<image src='../../static/image/kqicon@2x.png'></image>
						<text>优惠券</text>
					</view>
					<view @click="yuan">
						<image src='../../static/image/xydicon@2x.png'></image>
						<text>心愿</text>
					</view>
					<view @click="lasty">
						<image src='../../static/image/access@2x.png'></image>
						<text>最近访问</text>
					</view>
					<view @click="wuliu">
						<image src='../../static/image/service@2x.png'></image>
						<text>物流消息</text>
					</view>

				</view>
				<view class='dingdan'>
					<text>我的订单</text>
					<view class='right' @click="all">
						<text>查看全部</text>
						<image src='../../static/image/fanhui@2x.png'></image>
					</view>
					<view class='list'>
						<view @click='techan'>
							<image src='../../static/image/productorder@2x.png'></image>
							<text>特产订单</text>
						</view>
						<view @click='jingdian'>
							<image src='../../static/image/attractionsorder@2x.png'></image>
							<text>景点订单</text>
						</view>
						<view @click='pingjia'>
							<image src='../../static/image/message@2x.png'></image>
							<text>待评价</text>
						</view>
						<view @click='address'>
							<image src='../../static/image/address@2x.png'></image>
							<text>收货地址</text>
						</view>

					</view>
				</view>
				<view class='love'>
					<text>猜你喜欢</text>
					<image src='../../static/image/tab@2x.png'></image>
					<view class='li' v-for="(item,index) in data3" @click="detail" :key="index">
						<image :src='qiniu+item.imageThumb'></image>
						<text>{{item.goodsName}}</text>
					</view>

				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {
		data() {
			return {
				data3:'',
				api:"",
				user:''
			}
		},

		onShow() {
			    var that = this
			   console.log(this.qiniu)
			   uniRequest.get('/QianYi_Shop/selectRecommendGoods?page=1').then(res => {
			
			      
			       that.data3= res.data.data.goodsList
			     
			      console.log(res.data)
			
			    }).catch(e => {
			      console.log(e)
			    })
				
				    if (uni.getStorageSync('user')) {
				
				   
				        this.name= uni.getStorageSync('user').infoNickname
				        this.user= true
				        this.touxiang= this.qiniu + uni.getStorageSync('user').infoIcon
				        this.huiyuan=uni.getStorageSync('user').membersLevel
						console.log(this.touxiang)
				    
				    }
				
				
		},

			
		methods: {
			show:function(){
				uni.navigateTo({
					url:"../login/login"
				})
		},
			
		coupon:function(){
			uni.navigateTo({
				url:'../favorable/favorable'
			})
		},
			
		yuan:function(){
			var userId = uni.getStorageSync('user').loginId || 0
			
			if (userId == 0) {
				uni.navigateTo({
					url: '/pages/login/login',
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			} else {
			uni.navigateTo({
				url:'../wish/wish'
			})
			}
			
		},
			
		lasty:function(){
			var userId = uni.getStorageSync('user').loginId || 0
			
			if (userId == 0) {
				uni.navigateTo({
					url: '/pages/login/login',
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			} else {
			uni.navigateTo({
				url:'../lasty/lasty'
			})
			}
			
		},
			
		wuliu:function(){
			var userId = uni.getStorageSync('user').loginId || 0
			
			if (userId == 0) {
				uni.navigateTo({
					url: '/pages/login/login',
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			} else {
			uni.navigateTo({
				url:"../logistics/logistics"
			})
			}
		
		},
		techan:function(){
			var userId = uni.getStorageSync('user').loginId || 0
			
			if (userId == 0) {
				uni.navigateTo({
					url: '/pages/login/login',
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			} else {
			uni.navigateTo({
				url:'../SpecialOrders/SpecialOrders'
			})
			}
		
		},
			
		pingjia:function(){
			var userId = uni.getStorageSync('user').loginId || 0
			
			if (userId == 0) {
				uni.navigateTo({
					url: '/pages/login/login',
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			} else {
			uni.navigateTo({
				url:"../assess/assess"
			})
			}
			
		},
			
		address:function(){
			var userId = uni.getStorageSync('user').loginId || 0
			
			if (userId == 0) {
				uni.navigateTo({
					url: '/pages/login/login',
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			} else {
			uni.navigateTo({
				url:"../delivery/delivery"
			})
			}
		
		},
			
		jingdian:function(){
			var userId = uni.getStorageSync('user').loginId || 0
			
			if (userId == 0) {
				uni.navigateTo({
					url: '/pages/login/login',
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			} else {
			uni.navigateTo({
				url:"../scenicOrders/scenicOrders"
			})
			}
			
		}
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
	  height: 100%;
	}
	.content{
	  width: 100%;
	
	}
	.qie{
	 font-size:26rpx;
	font-family:PingFang-SC-Bold;
	font-weight:bold;
	color:rgba(255,255,255,1);
	
	position: absolute;
	top: 105rpx;
	right: 30rpx;
	}
	.switch{
	  width: 32rpx;
	  height: 24rpx;
	  position: absolute;
	  top: 108rpx;
	right: 150rpx;
	}
	.content>.top{
	    width: 100%;
	  height: 276rpx;
	 background:linear-gradient(180deg,rgba(145,229,115,1) 0%,rgba(61,178,163,1) 100%);
	 position: relative;
	 padding-top: 30rpx;
	box-sizing: border-box;
	}
	.top>.touxiang{
	width:132rpx;
	height:132rpx;
	background:linear-gradient(-45deg,rgba(208,216,225,1) 0%,rgba(238,244,255,1) 100%);
	border-radius:50%;
	margin-left: 32rpx;
	
	}
	.touxiang>image{
	  width: 100%;
	  height: 100%;
	  border-radius:50%;
	}
	.top>.title{
	  position: absolute;
	  font-size:36rpx;
	top: 48rpx;
	left: 192rpx;
	color:rgba(255,255,255,1);
	
	}
	.top>.small{
	    position: absolute;
	    font-size:24rpx;
	top: 112rpx;
	left: 192rpx;
	color:rgba(255,255,255,1);
	}
	.top>.small1{
	  display: inline-block;
	  width: 132rpx;
	  height: 38rpx;
	    position: absolute;
	    font-size:24rpx;
	top: 112rpx;
	left: 192rpx;
	color:rgba(255,255,255,1);
	}
	.contain{
	    width: 93%;
	  margin: 0 auto;
	
	}
	.contain>.form{
	  width: 100%;
	  height: 140rpx;
	  position: relative;
	  top: -65rpx;
	  background: #fff;
	  border-radius:10rpx;
	}
	.contain>.form>view{
	  width: 25%;
	  height: 100%;
	  text-align: center;
	  float: left;
	}
	.contain>.form>view>image{
	  width: 50rpx;
	  height: 50rpx;
	  margin-top: 25rpx;
	}
	.contain>.form>view>text{
	  font-size:24rpx;
	  display: block;
	  margin-top: 12rpx;
	
	
	}
	.dingdan{
	  width: 100%;
	  height: 190rpx;
	  background: #fff;
	}
	.dingdan>text{
	  font-size:32rpx;
	
	color:rgba(26,26,26,1);
	float: left;
	margin-left: 20rpx;
	}
	.dingdan>.right{
	  width: 140rpx;
	  height: 25rpx;
	  float: right;
	}
	.dingdan>.right>text{
	  font-size:26rpx;
	
	color:rgba(102,102,102,1);
	}
	.dingdan>.right>image{
	  width: 12rpx;
	  height: 20rpx;
	  margin-left: 19rpx;
	}
	.dingdan>.list{
	  width: 100%;
	  height: 90rpx;
	  padding-top: 76rpx;
	  box-sizing: border-box;
	}
	.dingdan>.list>view{
	width: 25%;
	height: 90rpx;
	text-align: center;
	float: left;
	}
	.dingdan>.list>view>image{
	  width: 50rpx;
	  height: 50rpx;
	
	}
	.dingdan>.list>view>text{
	font-size: 24rpx;
	display: block;
	}
	.love{
	  text-align: center;
	  width: 100%;
	  height: 100%;
	  margin-top: 50rpx;
	
	}
	.love>text{
	  font-size:36rpx;
	
	color:rgba(26,26,26,1);
	z-index: 999;
	position: relative
	}
	.love>image{
	  display: block;
	  width: 142rpx;
	  height: 20rpx;
	  text-align: center;
	  position: relative;
	  top: -15rpx;
	  margin: 0 auto;
	
	}
	.love>.li{
	  width: 336rpx;
	  height: 446rpx;
	  float: left;
	  background:rgba(255,255,255,1);
	box-shadow:0px 6rpx 12rpx 0px rgba(0, 0, 0, 0.08);
	border-radius:10rpx;
	text-align: left;
	margin-top: 30rpx;
	margin-right: 12rpx;
	}
	.love>.li>image{
	border-radius:10rpx;
	
	    width: 336rpx;
	  height: 336rpx;
	}
	.love>.li>text{
	  width: 80%;
	  margin: 0 auto;
	  overflow: hidden;
	  display: block;
	  font-size:26rpx;
	
	color:rgba(26,26,26,1);
	height: 72rpx;
	  margin-top: 24rpx;
	   display: -webkit-box;
	          -webkit-box-orient: vertical;
	            -webkit-line-clamp: 2;
	}
</style>
