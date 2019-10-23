<template>
	<view class="contain">
		<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }"
		 @click="tabClick(index)">
			<text class='txt1'>{{item.date}}</text>
			<text class='txt2'>{{item.text}}</text>
		</view>

		<view v-for="(item, index) in navList" :key="index" v-if="tabCurrentIndex === index">
			<view v-for="(item,index) in item.orderList" :key="index">

				<view class="product">
					<image class='jt1' src='../../image/jiantou@2x.png'></image>
					<text>抢购中，先下单先得哦</text>

					<view class="flex_l_r_c">

						<text>{{countdown}}</text>
					</view>
				</view>
                   <view class='list'>
                           <view class='listli' v-for="(item,index) in item.shopSeckillList" :key="index">
                             <image :src='qiniu+item.shopGoods.imageThumb'></image>
                             <view class='right'>
                               <text class='title'>{{item.shopGoods.goodsName}}</text>
                               <text class='small'>还剩{{item.shopGoods.discountPrice}}件  每人限购1件</text>
                               <view class='huodong'>
                                 <text class='price1'>￥{{item.shopGoods.discountPrice}}</text>
                 
                               </view>
                               <button @click="detailMS(item.id,item.shopGoods)"  v-if="getNum((item.seckillSoldNunber /(item.seckillSoldNunber+item.seckillNumber)*100))<100">立即抢购</button>
                 
                               <button  disabled="true" v-if="getNum((item.seckillSoldNunber /(item.seckillSoldNunber+item.seckillNumber)*100))>=100">已抢光</button>
                               <view class='jinru'>
                                 <text class='wrong'>￥{{item.shopGoods.price}}</text>
                                 <view class='tiao'>
                                   <view class="tIn" style="width:(item.seckillSoldNunber /(item.seckillSoldNunber+item.seckillNumber)*100)%"></view>
                                 </view>
                              
                                 <text class="sale">已售{{getNum(item.seckillSoldNunber /(item.seckillSoldNunber+item.seckillNumber)*100)}}%</text>
                 
                               </view>
                             </view>
                 
                           </view>
                 
                         </view>


			</view>
		</view>
	</view>

	</view>
</template>
<!-- <script module="utils" lang="filter" src="../filter/filter.wxs"></script> -->
<script>
	import uniRequest from 'uni-request';
	export default {



		data() {
			return {
				goods: '',
				currentTab: 0,
				motto: 'Hello World',
				userInfo: {},
				hasUserInfo: false,
				canIUse: uni.canIUse('button.open-type.getUserInfo'),
				data1: '',
				data2: '',
				time: '',
				countdown: '',
				endDate2: "",
				navList: [{
						text: '全部',
						date: '',
						orderList: [],
						time: ''
					},
					{

						text: '待付款',
						date: '',
						orderList: [],
						time: ''
					}
				],
				tabCurrentIndex: 0
			}
		},

		onLoad() {
			var userId = wx.getStorageSync('user').loginId || 0

			uniRequest.post('/QianYi_Shop/selectShopSeckillNperGoods?page=1&userId=' + userId).then(res => {
				console.log(res)


				this.navList[0].orderList = [res.data.data.shopSeckillsNperList[0]]
				this.navList[1].orderList = [res.data.data.shopSeckillsNperList[1]]
				this.navList[0].date = res.data.data.shopSeckillsNperList[0].beginTime
				this.navList[1].date = res.data.data.shopSeckillsNperList[1].beginTime
				this.navList[0].time = res.data.data.shopSeckillsNperList[0].toTime
				this.navList[1].time = res.data.data.shopSeckillsNperList[1].toTime
				this.endDate2 = new Date().getTime() + res.data.data.shopSeckillsNperList[0].toTime
				this.endDate3 = new Date().getTime() + res.data.data.shopSeckillsNperList[1].toTime
                

			}).catch(e => {
				console.log(e)
			})
		},

		methods: {
			getNum: function (x) {
			  var f = parseFloat(x);
			  if (isNaN(f)) {
			    return false;
			  }
			  var f = Math.round(x * 100) / 100;
			  var s = f.toString();
			  var rs = s.indexOf('.');
			  if (rs < 0) {
			    rs = s.length;
			    s += '.';
			  }
			  while (s.length <= rs + 2) {
			    s += '0';
			  }
			  return s;
			},
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
		}

	}
</script>

<style>
	.contain {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: url("http://dev.static.qianyipan.com/image/jpg/beijing@2x.png") no-repeat;
	}

	.nav-item {
		width: 50%;
		height: 100upx;
		float: left;
		text-align: center;
		overflow: hidden;

	}

	.nav-item>.txt1 {
		display: block;
		margin: 0 auto;
		color: #fff;
		font-size: 40rpx;
	}

	.nav-item>.txt2 {
		display: block;
		margin: 0 auto;
		color: #fff;
		font-size: 28rpx;
	}

	.product {
		width: 690rpx;
		height: 110rpx;
		margin: 0 auto;
		margin-top: 106rpx;
		position: relative;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 6rpx 14rpx 0px rgba(230, 165, 161, 0.12);
		border-radius: 20rpx;
	}

	.product>.jt1 {
		width: 38px;
		height: 12px;
		position: absolute;
		top: -12rpx;
		left: 140rpx;

	}

	.product>.jt2 {
		width: 38px;
		height: 12px;
		position: absolute;
		top: -12rpx;
		right: 140rpx;

	}

	.product>text {
		font-size: 28rpx;
		line-height: 110rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		margin-left: 24rpx;
		float: left;

	}

	.product>.time {
		float: right;
		margin-right: 24rpx;
		color: #999;
		font-size: 28rpx;
		margin-top: 36rpx;

	}

	.product>.time>.timeli {
		display: inline-block;
		width: 46rpx;
		height: 32rpx;

		background: #000;
		color: #fff;
		font-size: 26rpx;
		text-align: center;
		line-height: 32rpx;
		margin-left: 23rpx;
		border-radius: 6rpx;
	}

	.list {
		width: 94%;
		height: auto;
		margin: 0 auto;
		margin-top: 60rpx;
		overflow: hidden;
	}

	.listli {
		width: 100%;
		height: 204rpx;
		margin-bottom: 60rpx;
	}

	.listli>image {
		width: 228rpx;
		height: 228rpx;
		border-radius: 10rpx;
		float: left;
	}

	.listli>.right {
		width: 451rpx;
		float: right;
		height: 204rpx;
	}

	.right>.title {
		width: 100%;
		font-size: 30rpx;
		color: rgba(26, 26, 26, 1);
		height: 88rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;

	}

	.small {
		font-size: 26rpx;

		color: rgba(102, 102, 102, 1);
		display: block;
	}

	.huodong {
		width: 150rpx;
		margin-top: 20rpx;

		height: 30rpx;
		float: left;

	}

	.final {
		width: 284rpx;
		margin: 60rpx auto 0 auto;
	}

	.huodong .price1 {
		font-size: 36rpx;
		color: #f53131;
		float: left;
	}

	.huodong .price2 {
		float: left;
		font-size: 28rpx;
		color: #f53131;
		margin-top: 10rpx;
	}

	button {
		margin-top: 10rpx;
		width: 180rpx;
		height: 56rpx;
		background: linear-gradient(-8deg, rgba(255, 15, 15, 1) 0%, rgba(255, 127, 102, 1) 100%);
		border-radius: 28rpx;
		font-size: 28rpx;
		color: #fff;
		line-height: 56rpx;
		text-align: center;
		float: right;
	}

	.wrong {
		font-size: 24rpx;
		color: #b3b3b3;
		float: left;
		text-decoration: line-through;

	}

	.jinru {
		width: 100%;
		height: 22rpx;
		float: right;
		margin-top: 14rpx;
	}

	.jinru .sale {
		font-size: 20rpx;
		color: #999;
		float: right;
		margin-right: 11rpx;
	}

	.jinru image {
		width: 86rpx;
		height: 22rpx;
		float: right;
		margin-right: 11rpx;
	}

	.tiao {
		float: right;
		width: 180rpx;
		height: 10rpx;
		border: 1px solid rgba(255, 76, 76, 1);
		border-radius: 4rpx;
		/* background: rgba(255,76,76,1); */
		margin-top: 6rpx;
	}

	.flex_l_r_c {
		float: right;
		padding-top: 26rpx;
		margin-right: 30rpx;

	}

	.flex_l_r_c>text {
		display: inline-block;
		background: black;
		color: #fff;
		font-size: 26rpx;

	}
	.tIn{
		background: rgba(255,76,76,1)no-repeat;
		height:100%
	}
</style>
