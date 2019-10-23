<template>
	<view class="contain">



		<image class='sousuo' src='../../static/image/sousuo01@2x.png'></image>
		<input placeholder='搜索你心仪的商品' @focus="sousuo"></input>
		<swiper class="lunbo" autoplay="true">
			<swiper-item v-for="(item,index) in data1" :key="index">
				<image :src='qiniu+ item.picture'></image>
			</swiper-item>
			<view class="idea">
				<view class="ripple" style="rippleStyle"></view>
				<view class="container" @click="containerTap"></view>       
			</view>
		</swiper>
		<view class='new'>
			<image src='../../static/image/kuaibao@2x.png'></image>
			<text class='class1'>最新</text>
			<text class='class2'>{{aritle}}</text>
			<text class='right' @click='more'>更多</text>
		</view>

		<view class='list1'>
			<image src='../../static/image/xsms@2x.png' class='img1'></image>


			<view class="flex_l_r_c">
				距离结束
				<text>{{countdown}}</text>
			</view>
			<image src='../../static/image/gengduo@2x.png' class='img2'></image>
			<text class='more' @click='miaosha'> 更多</text>
			<view class="litop">
				<view class='moreli'>
					<view class='li' v-for="(item,index) in data" :key="index" @click="detailMS(item.id)">
						<view class='tp'>
							<image :src='qiniu+item.shopGoods.imageThumb' class='img3'></image>
							<image src='../../static/image/TOP1@2x.png' class='img4' v-if="index==0"></image>
							<image src='../../static/image/TOP2@2x.png' class='img4' v-if="index==1"></image>
							<image src='../../static/image/TOP3@2x.png' class='img4' v-if="index==2"></image>
						</view>
						<text class='intro'>{{item.shopGoods.goodsName}}</text>
						<text class='pri'>￥{{item.shopGoods.discountPrice}}</text>
						<image src='../../static/image/qiang@2x.png' class='qiang'></image>
					</view>

				</view>
			</view>
		</view>



		<view class='list2'>

			<view class="swiper-tab">

				<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }"
				 @click="tabClick(index)">
					{{ item.text }}
				</view>


			</view>
			<image src='../../static/image/gengduo@2x.png' class='img3'></image>
			<text class='more1' @click="listTC"> 更多</text>
			<view class="list3" v-for="(item, index) in navList" :key="index" v-if="tabCurrentIndex === index">
				    <view class='techan' @click='detail(item,item.id)'  v-for="(item,index) in item.orderList" :key="index" >
				            <image class='zhutu' :src='qiniu+item.imageThumb'></image>
				            <view class='title'>
				
				              <view class="txt">
				                <image src="../../image/xpbq@2x.png"></image> {{item.goodsName}}</view>
				            </view>
				            <view class='huodong'>
				              <text class='price1'>￥{{item.discountPrice}}</text>
				
				              <image src='../../image/mjbq@2x.png'></image>
				            </view>
				            <view class='final'>
				              <text class='wrong'>￥{{item.price}}</text>
				              <view class='fukuan'>
				                <text>{{item.sales}}</text>人付款
				              </view>
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
				countDownList: [],
				actEndTimeList: [],
				Id: '',
				data2: [],
				data3: [],
				array: [],
				one: '',
				two: "",
				three: "",
				data1: [],
				aritle: [],
				countdown: '',
				data: [],
				time: '',
				tabCurrentIndex: 0,
				navList: [{
						text: '全部',
						orderList: []
					},
					{
						
						text: '待付款',
						orderList: []
					}
				]
			}
		},
		onLoad() {
			var that = this


			uniRequest.post('/QianYi_Shop/selectArticle?page=1').then(res => {
				console.log(res)

				that.aritle = res.data.data.ArticleList[0].title


			}).catch(e => {
				console.log(e)
			})
			var userId = wx.getStorageSync('user').loginId || 0
			uniRequest.get('/QianYi_Shop/selectShopSeckillNperGoods?page=1&userId=' + userId).then(res => {


				that.data = res.data.data.shopSeckillsNperList[0].shopSeckillList
					that.one = res.data.data.shopSeckillsNperList[0].shopSeckillList[0]
					that.two = res.data.data.shopSeckillsNperList[0].shopSeckillList[1]
					that.three = res.data.data.shopSeckillsNperList[0].shopSeckillList[2]
					that.time = res.data.data.shopSeckillsNperList[0].toTime
					that.time1 = res.data.data.shopSeckillsNperList[1].toTime
					that.endDate2 = new Date().getTime() + res.data.data.shopSeckillsNperList[0].toTime
				

				that.countTime()
				

			}).catch(e => {
				console.log(e)
			})

			uniRequest.get('/QianYi_Shop/selectShufflingFigure?page=1&pageSize=3&type=0').then(res => {


				that.data1 = res.data.data.pictureList

				console.log(res.data.data.pictureList)

			}).catch(e => {
				console.log(e)
			})

			uniRequest.get('/QianYi_Shop/selectClassifyGoods?page=1').then(res => {


				that.navList[0].orderList = res.data.data.shopGoods,


					console.log(res.data)

			}).catch(e => {
				console.log(e)
			})

			uniRequest.get('/QianYi_Shop/selectRecommendGoods?page=1').then(res => {


				that.navList[1].orderList = res.data.data.goodsList

				console.log(res.data)

			}).catch(e => {
				console.log(e)
			})

		},
		methods: {
			countTime() {
				var that = this;
				var date = new Date();
				var now = date.getTime();
				var endDate = new Date(that.data.endDate2); //设置截止时间
				var end = endDate.getTime();
				var leftTime = that.time--;

				//时间差


				var d, h, m, s, ms;
				if (leftTime >= 0) {
					var timer=setTimeout(function() {
						// leftTime--;
						that.countTime()
					}, 1000);
					d = parseInt(leftTime / (60 * 60 * 24));
					h = parseInt(leftTime % (60 * 60 * 24) / 3600);
					m = parseInt(leftTime % (60 * 60 * 24) % 3600 / 60);
					s = parseInt(leftTime % (60 * 60 * 24) % 3600 % 60);

					s = s < 10 ? "0" + s : s
					m = m < 10 ? "0" + m : m
					h = h < 10 ? "0" + h : h

					that.countdown = d + "：" + h + "：" + m + "：" + s

					// //递归每秒调用countTime方法，显示动态时间效果
			

				} else {
					console.log('已截止')
					that.countdown = '00:00:00:00'

				}

			},
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			detail:function(item,id){
				uni.navigateTo({
					url:'../shopTetail/shopTetail?id='+id
				})
				  this.array.unshift({
				      id: id,
				      name: item.goodsName,
				      img: item.imageThumb,
				      price: item.discountPrice
				    })
					console.log(item)
				
				    uni.setStorageSync('array', this.array)
			},
			detailMS:function(id){
				uni.navigateTo({
					url:"../seckillDetail/seckillDetail?id="+id
				})
			},
				
			sousuo:function(){
				uni.navigateTo({
					url:'../search/search'
				})
			},
			more:function(){
				uni.navigateTo({
					url:'../news/news'
				})
			},
			miaosha:function(){
				uni.navigateTo({
					url:'../seckillList/seckillList'
				})
			},
			listTC:function(){
				uni.navigateTo({
					url:'../SpecialtyList/SpecialtyList'
				})
			}
		}
	}
</script>

<style>
	
	Page {
		width: 100%;
		height: 100%;
		background: #fff;
	}

	.contain {
		width: 94%;
		margin: 0 auto;
		position: relative
	}

	input {
		width: 100%;
		height: 66rpx;
		background: #f2f2f2;
		border-radius: 34rpx;
		margin: 0 auto;
	}

	input[placeholder] {
		font-size: 28rpx;
		color: #b3b3b3;
		padding-left: 70rpx;
		box-sizing: border-box;
	}

	.contain>.show {
		width: 100%;
		height: 302rpx;

		border-radius: 10rpx;
		display: block;
		margin: 40rpx auto;

	}

	.contain>.sousuo {
		width: 28rpx;
		height: 28rpx;
		position: absolute;
		top: 18rpx;
		left: 28rpx;
	}

	.new {
		width: 100%;
		height: 30rpx;
		margin-top: 40rpx;
	}

	.lunbo {
		width: 100%;
		height: 302rpx;
		margin-top: 40rpx;
		position: relative
	}

	/* idea */
	.idea {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 302rpx;
	}

	.container {
		width: 100%;
		height: 100%;
		/* background: rgb(252, 207, 207) */
	}

	.ripple {
		background-color: #3DB2A3;
		border-radius: 100%;
		height: 10px;
		width: 10px;
		margin-top: -90px;
		position: absolute;
		-webkit-transform: scale(0);
	}

	@-webkit-keyframes ripple {
		100% {
			-webkit-transform: scale(12);
			transform: scale(12);
			background-color: transparent;
		}
	}




	.lunbo image {
		width: 100%;
		height: 302rpx;

		box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.15);
		border-radius: 10px;

	}

	.new>image {
		height: 100%;
		width: 140rpx;
		float: left;

	}

	.new>.class1 {

		color: #F53131;
		font-size: 26rpx;
		margin-left: 20rpx;
		float: left;
		height: 30rpx;

		padding: 0;

	}

	.new>.class2 {
		color: #333333;
		font-size: 26rpx;
		margin-left: 10rpx;
		float: left;
		height: 30rpx;

		padding: 0;

	}

	.new>.right {
		color: #333333;
		font-size: 26rpx;
		margin-left: 10rpx;
		float: right;
	}

	.list1 {
		width: 100%;
		height: 520rpx;
		margin-top: 90rpx;
	}

	.list1>.img1 {
		width: 144rpx;
		height: 36rpx;
		float: left;

	}

	.list1>.flex_l_r_c {
		width: 320rpx;
		height: 32rpx;
		margin-left: 28rpx;
		color: #333;
		font-size: 24rpx;
		float: left;
		margin-top: 8rpx;


	}

	.showtime>text {
		width: 32rpx;
		height: 32rpx;
		display: inline-block;
		background: #333;
		font-size: 22rpx;
		color: #fff;
		line-height: 32rpx;
		text-align: center;
		border-radius: 6rpx;
	}

	.more {
		font-size: 26rpx;
		color: #3DB2A3;
		float: right;
		margin-top: 8rpx;
		margin-right: 10rpx;
	}

	.more1 {
		font-size: 26rpx;
		color: #3DB2A3;
		float: right;
		margin-top: 38rpx;
		margin-right: 10rpx;
	}

	.img2 {
		width: 24rpx;
		height: 24rpx;
		float: right;
		margin-top: 16rpx;

	}

	.img3 {
		width: 24rpx;
		height: 24rpx;
		float: right;
		margin-top: 46rpx;

	}

	.litop {
		width: 100%;
		height: 436rpx;
		overflow: auto;


	}

	.moreli {
		width: 200%;
		height: 406rpx;
		margin-top: 30rpx;

	}

	.li {
		width: 240rpx;
		height: 98%;
		float: left;
		box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 10rpx;
		margin-right: 18rpx;
	}

	.li .tp {
		position: relative;
		width: 240rpx;
		height: 240rpx;
	}

	.tp .img3 {
		position: absolute;
		top: 0;
		left: 0;
		width: 240rpx;
		height: 240rpx;
		margin-top: 0
	}

	.tp .img4 {
		position: absolute;
		right: 0;
		top: 0;
		width: 76rpx;
		height: 76rpx;

	}

	.intro {
		width: 205rpx;
		height: 66rpx;
		margin: 0 auto;
		font-size: 24rpx;
		color: #1a1a1a;
		margin-top: 24rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.pri {
		color: #F53131;
		font-size: 24rpx;
		margin: 28rpx 0 0 20rpx;
		float: left;
	}

	.qiang {
		float: right;
		width: 42rpx;
		height: 42rpx;
		margin-top: 20rpx;
		margin: 20rpx;
	}

	.techan {
		width: 336rpx;
		height: auto;
		float: left;
		box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 10rpx;
		margin-top: 20rpx;
		margin-right: 17rpx;
	}

	.zhutu {
		width: 336rpx;
		height: 336rpx;
		border-radius: 10rpx;

	}

	.title {
		width: 284rpx;
		height: 64rpx;
		margin: 0 auto;
		margin-top: 24rpx;
	}

	.title>.txt>image {
		display: inline-block;
		width: 54rpx;
		height: 26rpx;


	}

	.title>.txt {
		font-size: 26rpx;
		color: #1a1a1a;

		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;

	}

	.huodong {
		width: 284rpx;
		margin: 30rpx auto 0 auto;

	}

	.final {
		width: 284rpx;
		margin: 80rpx auto 0 auto;
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

	.huodong>image {
		width: 54rpx;
		height: 26rpx;
		margin-left: 16rpx;
		float: left;
		margin-top: 10rpx;
	}

	.wrong {
		font-size: 24rpx;
		color: #b3b3b3;
		float: left;
		display: block;
		text-decoration: line-through
	}

	.fukuan {
		float: right;
		font-size: 22rpx;
		color: #1a1a1a;

	}

	.fukuan>text {
		color: #f53131;
	}


	/* tab */
	.swiper-tab {
		width: 340rpx;
		position: relative;


	}

	.nav-item {

		font-size: 25rpx;
		color: #333;
		float: left;
		margin-right: 20rpx;
		margin-top: 35rpx;
	}

	.current {
		height: 34rpx;
		display: inline-block;
		font-size: 36rpx;
		color: #1a1a1a;
		border-bottom: 10rpx solid rgba(144, 240, 169, 0.5);
		box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(144, 240, 169, 0.5);



	}
	.list3{
		display: block;
		margin-top: 50px;
		height: auto;
		/* overflow: hidden; */
		display: flex;
		justify-content: space-between;
		  /* flex-direction: column; */
		  flex-wrap: wrap;
	
	}
	.list2{
		display: block;
		margin-top: 50px;
		height: auto;
		overflow: hidden;
	
		
	
	}

	
</style>
