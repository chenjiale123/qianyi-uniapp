<template>
	<view class="whole">


		<view class="contain" v-for="(item,index) in goods" :key="index">
			<view class="cu" v-if="show2">
				<view class="kuang">
					<image src="../../static/image/guanbi@2x.png" @click="close2"></image>
					<view class="kuangIn">
						<view v-if="store.length==0" class="in">
							<image src="http://dev.static.qianyipan.com/image/jpg/wuneirong@2x.png"></image>
							<text class="act">暂无促销活动</text>
						</view>
						<view class="in" v-else>
							<view class="li2" v-for="(item,index) in store" :key="index">
								<view class="left">
									<text>满减</text>
								</view>
								<view class="right">
									<text class="d">{{item.couponName}}{{item.remarks}}</text>
									<text class="e">活动时间：{{item.createTime}}-{{item.endDate}}</text>

								</view>
							</view>

						</view>
					</view>

				</view>


			</view>
			<view class="cu" v-if="show1">
				<view class="kuang">
					<image src="../../static/image/guanbi@2x.png" @click="close1"></image>
					<view class="kuangIn">
						<view class="goods">
							<view class="left">
								<image :src="qiniu+item.imageThumb"></image>
							</view>
							<view class="right">
								<text class="w1">￥{{pri}}</text>
								<text class="w2">库存{{ku}}件</text>
								<text class="w3">商品编号：{{item.productCode}}</text>
							</view>
						</view>
						<view class="guige">
							<text>包装口味</text>
							<!-- <button v-for="(item,index) in leng1" @click="clicktap(item.id,index)" :key="index" :class='item.checked?"checked_button":"normal_button"'
							 :disabled="item.specInventory==0">{{item.specName}}</button> -->
							 
							   <button v-for="(item,index) in leng1" :key="index"  @click="clicktap(item.id,index)" :class='item.checked?"checked_button":"normal_button"' :disabled="item.specInventory==0">{{item.specName}}</button>
						</view>
						<view class="num1">
							<view class="left">购买数量</view>
							<view class="right">
								<view class='c-main' @click='getMain'>
									<image src='../../static/image/colorReduction@2x.png'></image>
								</view>
								<view class='c-num'>{{salesNum}}</view>
								<view class='c-plus' @click='getPlus'>
									<image src='../../static/image/coloradd@2x.png'></image>
								</view>
							</view>
						</view>
					</view>
					<view class="bom">
						<button @click="dingdan">确定</button>
					</view>
				</view>
			</view>
			<view class="cu" v-if="show3">
				<view class="kuang">
					<image src="../../static/image/guanbi@2x.png" @click="close3"></image>
					<view class="kuangIn">
						<view class="goods">
							<view class="left">
								<image :src="qiniu+item.imageThumb"></image>
							</view>
							<view class="right">
								<text class="w1">￥{{pri}}</text>
								<text class="w2">库存{{ku}}件</text>
								<text class="w3">商品编号：{{item.productCode}}</text>
							</view>
						</view>
						<view class="guige">
							<text>包装口味</text>
					<button v-for="(item,index) in leng1" :key="index"  @click="clicktap(item.id,index)" :class='item.checked?"checked_button":"normal_button"' :disabled="item.specInventory==0">{{item.specName}}</button>
					
						</view>
						<view class="num1">
							<view class="left">购买数量</view>
							<view class="right">
								<view class='c-main' @click='getMain'>
									<image src='../../static/image/colorReduction@2x.png'></image>
								</view>
								<view class='c-num'>{{salesNum}}</view>
								<view class='c-plus' @click='getPlus'>
									<image src='../../static/image/coloradd@2x.png'></image>
								</view>
							</view>
						</view>
					</view>
					<view class="bom">
						<button @click="dingdan1">确定</button>
					</view>
				</view>
			</view>
			<view class='lunbo'>
				<swiper autoplay="true">
					<swiper-item v-for="(item,index) in img" :key="index">
						<!-- <canvas bindtouchend="touchend" bindlongtap="touchmove" canvas-id="myCanvas" bindtouchmove="touchmove"/> -->
						<image :src='qiniu+item'></image>
						<view class='num'>
							{{index+1}}/5
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class='intro'>
				<view class='introIn'>
					<view class='top'>
						<view class='a'>
							￥{{item.discountPrice}}
						</view>
						<text class='b'>￥{{item.price}}</text>
						<text class='c'>包邮</text>
					</view>
					<view class='title'>
						<view class='left'>
							<image src='../../static/image/xpbq@2x.png'></image>
							<text>{{item.goodsName}}</text>
						</view>
						<view class='right'>
							<view class="Too" animation="ani">
								<image src="../../static/image/xinyuan@2x.png"></image>
							</view>
							<image src='../../static/image/xinyuan@2x.png' v-if="sh" @click="click"></image>
							<image src='../../static/image/xinyuan01@2x.png' v-if="!sh" @click="click1"></image>

							<text>心愿单</text>
						</view>
					</view>
					<view class='didian'>
						<text class="a"> 该特产来自</text>
						<text class='b'>{{item.address}}</text>
						<text class='c'>已售{{item.sales}}</text>
					</view>

					<view class='xiao' @click="cuxiao">
						<view class='left'>
							<text>促销</text>
							<text class='ka'>满减</text>
							<text class='la' :key="index" v-for="(item,index) in item.discountStoresList">{{item.remarks}}</text>
						</view>
						<view class='right'>
							<image src='../../static/image/xaingqing@2x.png'></image>
						</view>
					</view>
				</view>
			</view>
			<view class='xuan'>
				<view class='left'>
					<text>已选</text>
					<view class="leftin1" @click="buy">
						<text class='la'>{{item.shopGoodsSpecList[0].specName}}</text>
					</view>
				</view>
				<view class='right'>
					<image src='../../static/image/xaingqing@2x.png'></image>
				</view>
			</view>
			<view class='contant'>
				<view class='contentIn'>
					<view class='first' @click="tz">
						<view class='left'>
							<text>评价</text>
						</view>
						<view class='right'>
							<text v-if="leng.length==0">暂无评价</text>

							<text v-else>{{leng}}条评价</text>
							<image src='../../static/image/xaingqing@2x.png'></image>
						</view>
					</view>
					<view class='pinlun' v-for="(item,index) in comment" :key="index">
						<view class='pinlunIn'>
							<view class='xin'>
								<view class='left'>
									<image :src='qiniu +item.userInfo.infoIcon'></image>
									<text>{{item.userInfo.infoNickname}}</text>
								</view>
								<view class='right'>
									<image src='../../static/image/shouzang01@2x.png' v-for="(item,index) in item.commodityScore" :key="index"></image>
								</view>
							</view>
							<text>{{item.commentsContents}}</text>
							<view class='tp'>

							</view>
						</view>
					</view>

					<button class="btn4" @click="tz">查看全部评价</button>
				</view>
			</view>
			<view class='see'>
				<view class='seeIn'>
					<text>大家都在看</text>
					<view class='list'>
						<view class='li' v-for="(item,index) in goods1" :key="index" @click="look">
							<image :src='qiniu+item.imageThumb'></image>
							<text class='tl'>{{item.goodsName}}</text>
							<text class='pr'>￥{{item.discountPrice}}</text>
						</view>

					</view>
					<button class="btn">
						<image src='../../static/image/shangla01@2x.png'></image>
						上拉查看图文详情
					</button>
				</view>
			</view>
			<view class="bottom" v-if="show">

				<u-parse :content="dsc"></u-parse>


			</view>
			<view class='price'>
				<view class='kefu'>
					<image src='../../static/image/kefu@2x.png'></image>
					<!-- <contact-button type="default-dark" size="20" session-from="weapp"></contact-button> -->

					<text>客服</text>
				</view>
				<view class='gouwu' @click="gouwu1">
					<image src='../../static/image/gouwu@2x.png'></image>
					<text>购物车</text>
				</view>
				<button class="btn3" @click="buy">立即购买</button>
				<button class="btn2" @click="gouwuche">加入购物车</button>

			</view>
			<view class="model" v-if="model">加入购物车成功</view>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	import uParse from '@/components/u-parse/u-parse.vue'
	export default {

		components: {
			uParse
		},

		data() {
			return {
				flag: true,
				goods: [],
				goods1: [],
				img: [],
				comment: [],
				img1: '',
				leng: [],
				leng1: [],
				Id: "",
				shopId: '',
				dsc: '',
				show: true,
				show1: false,
				salesNum: 1,
				pri: '',
				price: '',
				model: false,
				show2: false,
				show3: false,
				store: '',
				ku: '',
				id3: '',
				currentTab: 0,
				moren: '',
				comment1: '',
				sh: true,
				checked:true

			}
		},

		onLoad(options) {
			var that = this

			that.Id = options.id


			console.log(that.Id)
			var userId = wx.getStorageSync('user').loginId || 0

			uniRequest.get('/QianYi_Shop/selectProductsDetails?id=' + that.Id + '&userId=' + userId).then(res => {
				console.log(res)
                  that.dd= res.data.data
				that.goods = res.data.data.productDetailsList,
					// moren=res.data.productDetailsList[0].shopGoodsSpecList[0].id,
					that.pri = res.data.data.productDetailsList[0].shopGoodsSpecList[0].specPrice,
					that.img = res.data.data.productDetailsList[0].imageUrl.split(","),
					that.dsc = res.data.data.productDetailsList[0].productDesc,
					that.leng1 = res.data.data.productDetailsList[0].shopGoodsSpecList,
					that.shopId = res.data.data.productDetailsList[0].storeId,
					that.store = res.data.data.productDetailsList[0].discountStoresList,
					that.ku = res.data.data.productDetailsList[0].shopGoodsSpecList[0].specInventory

				if (that.goods[0].isCollection == 1) {

					that.sh = false

				} else {
					that.sh = true
				}
				console.log(that.dsc)


			}).catch(e => {
				console.log(e)
			})

			uniRequest.get('/QianYi_Shop/selectShopComments?page=1&goodsId=' + that.Id + '&sortType=0').then(res => {
				console.log(res)

				that.comment = res.data.data.commentslist.slice(0, 2),
					that.leng = res.data.data.total,
					that.comment1 = res.data.data.commentslist
				// img1: res.data.commentslist.commentsImagePath.split(",")




			}).catch(e => {
				console.log(e)
			})

			uniRequest.get('/QianYi_Shop/selectRecommendGoods?goodsId=' + that.Id + '&page=1').then(res => {


				that.goods1 = res.data.data.goodsList


				console.log(res)

			}).catch(e => {
				console.log(e)
			})
		},

		methods: {


			click: function() {
				var that = this
				var userId = uni.getStorageSync('user').loginId || 0
				if (userId == 0) {
					uni.navigateTo({
						url: '/pages/login/login',

					})
				} else {

					that.sh = false

					uniRequest.get('/QianYi_Shop/insertGoodsCollection?userId=' + userId + '&recnoId=' + this.Id).then(res => {
						console.log(res)

						uni.showToast({
							title: '添加心愿单成功',
							icon: 'success',
							// duration: 2000
						})


					}).catch(e => {
						console.log(e)
					})
				}



			},
			click1: function() {
				var that = this
				that.sh = true

				var userId = uni.getStorageSync('user').loginId || 0

				uniRequest.get('/QianYi_Shop/deleteGoodsCollection?userId=' + userId + '&goodsId=' + this.Id).then(res => {
					console.log(res)
					uni.showToast({
						title: '移除心愿单成功',
						icon: 'success',
						// duration: 2000
					})



				}).catch(e => {
					console.log(e)
				})

			},
			// clicktap(id, index) {
			// 	var that = this
   //                that.id3=id
			// 	that.pri = that.goods[0].shopGoodsSpecList[index].specPrice
			// 	that.ku = that.goods[0].shopGoodsSpecList[index].specInventory
			// 	that.currentTab = index

			// 	console.log(id,index)
			// 	for (let i = 0; i < that.leng1.length; i++) {
                       
			// 		if (that.leng1[i].id == id) {
					
			// 			that.leng1[i].checked = true;	
			// 			console.log(that.leng1[i].checked)
					
			// 			if (that.ku == 0) {
			// 				that.leng1[i].checked = false;
			// 			}
			// 		} else {
			// 			//其他的位置为false
			// 			that.leng1[i].checked = false;
			// 		}
			// 	}

				


			// },
			clicktap(id,index) {
						var that = this		  
			    this.pri= that.goods[0].shopGoodsSpecList[index].specPrice
			    this.ku= that.goods[0].shopGoodsSpecList[index].specInventory
		
			  this.id3=id
			 
			  console.log(id)
			  for (let i = 0; i < this.leng1.length; i++) {
			    if (this.leng1[i].id == id) {
			      //当前点击的位置为true即选中
			      this.leng1[i].checked = true;
				  console.log("6")
			      if (this.ku == 0) {
			        this.leng1[i].checked = false;
			     
			        console.log(this.she)
			      }
			    } else {
			      //其他的位置为false
			      this.leng1[i].checked = false;
			    }
			  }
						
			    this.leng1= this.leng1
			
			 
						
			},
			tz: function() {
				uni.navigateTo({
					url: '/pages/commentDetail/commentDetail?id=' + this.Id,

				})
			},
			buy: function() {
				var that = this
				var userId = uni.getStorageSync('user').loginId || 0

				if (userId == 0) {
					wx.navigateTo({
						url: '/pages/login/login',

					})
				} else {

					that.show1 = !this.show1

				}
			},
			cuxiao: function() {
				var that = this

				that.show2 = !this.show2

			},
			close1: function() {
				var that = this
				that.show1 = false

			},
			close2: function() {
				var that = this
				that.show2 = false

			},
			close3: function() {
				var that = this
				that.show3 = false
			},
			dingdan: function() {
				console.log(this.price)
				var that = this
				if (this.id3 == "") {
					// this.data.id3 = this.data.moren
					uni.showToast({
						title: '请选择规格',
						icon: "none"

					})
				} else {
					this.id3 = this.id3
					uni.navigateTo({
						url: '/pages/order/order?price=' + this.price + '&num=' + this.salesNum + '&id=' + this.Id + '&shopId=' +
							this.shopId + '&guiId=' + this.id3
						
					})
					console.log(this.shopId,this.salesNum)
				}

			},
			getPlus: function(e) {
				var that = this
				var salesNum = 1
				that.salesNum++

				that.salesNum = that.salesNum

				that.getTotalPrice()
			},
			// 购物车-
			getMain: function(e) {
				var that = this
				that.salesNum--

				// console.log(index)

				if (that.salesNum <= 0) {
					that.salesNum = 1
					// that.delItem(e)
				}


				that.salesNum = that.salesNum

				that.getTotalPrice()
			},
			getTotalPrice() {
				var that = this
				var salesNum = this.salesNum
				var pri = this.pri
				var total = 0

				var price = salesNum * pri


				that.price = price,
					that.countMoney = total.toFixed(2)

			},
			onReachBottom: function() {
				uni.showLoading({
					title: '玩命加载中',
				})

				this.show = !this.data.show

				uni.hideLoading();
				console.log('111111')
			},
			tan: function() {

				this.model = true

			},
			gouwu1: function() {
				var userId = wx.getStorageSync('user').loginId || 0

				if (userId == 0) {
					uni.navigateTo({
						url: '/pages/login/login',
						success: function(res) {},
						fail: function(res) {},
						complete: function(res) {},
					})
				} else {

					wx.switchTab({
						url: '/pages/gouwu/gouwu',
						success: function(res) {},
						fail: function(res) {},
						complete: function(res) {},
					})
				}
			},
			dingdan1: function() {
				var that = this
					console.log(this.id3)
				if (this.id3 == "") {
					// this.data.id3 = this.data.moren
					uni.showToast({
						title: '请选择规格'
					

					})
				} else {
						console.log(this.price)
				
					var userId = wx.getStorageSync('user').loginId || 0

					uniRequest.get('/QianYi_Shop/insertGoodsCarts?creatorId=' + userId + '&goodsId=' + that.Id + '&goodsSpecidId=' +
						this.id3 + '&cartNum=' + this.salesNum).then(res => {
						console.log(res)

						that.show3 = false

						this.tan()
						setTimeout(function() {

							that.model = false


						}, 1000)



					}).catch(e => {
						console.log(e)
					})
				}

			},
			gouwuche: function() {
				var that = this
				var userId = wx.getStorageSync('user').loginId || 0

				if (userId == 0) {
					uni.navigateTo({
						url: '/pages/login/login',
						success: function(res) {},
						fail: function(res) {},
						complete: function(res) {},
					})
				} else {

					that.show3 = true

				}
			},
		}

	}
</script>

<style>
	@import url("@/components/u-parse/u-parse.css") .active {
		background: #3DB2A3;
	}

	.whole .contain {
		width: 100%;
		height: auto;
		position: relative;
		background: rgba(242, 242, 242, 1);
	}

	.kuang {
		width: 100%;
		height: 65%;
		position: fixed;
		bottom: -20rpx;
		background: #fff;
		border-radius: 20rpx;
		z-index: 99999999
	}

	.kuang>.kuangIn {
		width: 90%;
		margin: 0 auto;
		position: relative;
		padding-top: 30rpx;
		box-sizing: border-box;
		height: 100%
	}

	.kuang>image {
		width: 28rpx;
		height: 28rpx;
		position: absolute;
		right: 0;
		top: 30rpx;
		border-radius: 20rpx;
		margin-right: 50rpx;
		z-index: 9999999999;
	}

	.kuangIn>.goods {
		width: 100%;
		height: 148rpx;

	}

	.kuangIn>.goods>.left {
		width: 200rpx;
		height: 200rpx;
		float: left;
		border-radius: 10rpx;
		clear: both
	}

	.kuangIn>.goods>.right {
		width: 424rpx;
		height: 148rpx;
		float: right;
		padding-top: 50rpx;
		box-sizing: border-box;

	}

	.kuangIn>.goods>.right>.w1 {

		display: block;
		font-size: 34rpx;
		color: rgba(245, 49, 49, 1);
	}

	.kuangIn>.goods>.right>.w2 {
		display: block;
		font-size: 28rpx;
		color: rgb(204, 204, 204);
		margin-top: 20rpx;
	}

	.kuangIn>.goods>.right>.w3 {
		display: block;
		font-size: 28rpx;
		color: rgb(0, 0, 0);


	}

	.kuangIn>.goods>.left>image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}

	.kuangIn>.guige {
		margin-top: 80rpx;
		height: 200rpx;
	}

	.kuangIn>.guige>text {
		display: block;
		font-size: 28rpx;
	}

	.kuangIn>.guige>.normal_button {
		width: auto;
		height: 30rpx;
		background: rgb(247, 247, 247);
		border-radius: 6rpx;
		display: inline-block;
		padding: 20rpx;
		color: rgb(145, 143, 143);
		margin-right: 30rpx;
		text-align: center;
		line-height: 10rpx;
		font-size: 28rpx;
		margin-top: 20rpx;
		cursor: pointer;
	}

	.kuangIn>.guige>.checked_button {
		width: auto;
		height: 30rpx;
		background: #3DB2A3;
		border-radius: 6rpx;
		display: inline-block;
		padding: 20rpx;
		color: rgb(255, 255, 255);
		margin-right: 30rpx;
		text-align: center;
		line-height: 10rpx;
		font-size: 28rpx;
		margin-top: 20rpx;
		cursor: pointer;
	}

	.kuangIn>.num1 {
		margin-top: 30rpx;

	}

	.kuangIn>.num1>.left {
		float: left;
		font-size: 28rpx;
	}

	.kuangIn>.num1>.right {
		float: right;
	}

	.c-main {
		display: inline-block;
		width: 38rpx;
		height: 38rpx;
		border-radius: 50%;
		box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
	}

	.c-main>image {
		width: 100%;
		height: 100%
	}

	.c-num {
		display: inline-block;
		width: 68rpx;
		height: 38rpx;
		text-align: center;
		line-height: 38rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
	}

	.c-plus {
		display: inline-block;
		width: 38rpx;
		height: 38rpx;
		border-radius: 50%;
		box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
	}

	.c-plus>image {
		width: 100%;
		height: 100%
	}

	.bom {
		width: 100%;
		position: absolute;
		bottom: 20rpx;
		height: 98rpx;



	}

	.bom>button {
		width: 100%;
		height: 100%;
		background: linear-gradient(-8deg, rgba(61, 179, 163, 1) 0%, rgba(145, 230, 115, 1) 100%);
		font-size: 48rpx;
		color: #fff;
		text-align: center;
		line-height: 98rpx;
		border-radius: 0
	}

	.whole>.lunbo {
		width: 100%;
		height: 424rpx;

	}

	swiper {
		width: 100%;
		height: 750rpx;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.lunbo image {
		width: 100%;
		height: 750rpx;
	}

	.swiper-item {
		position: relative;
	}

	canvas {
		width: 50%;
		height: 400rpx;
		background: none;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -25%;
		margin-top: -200rpx;


	}

	.lunbo .num {
		position: absolute;
		width: 96rpx;
		height: 40rpx;
		background: rgba(0, 0, 0, 1);
		opacity: 0.5;
		border-radius: 20rpx 21rpx 0px 20rpx;
		top: 690rpx;
		right: 30rpx;
	}

	.lunbo .num {
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 40rpx;
	}

	.intro {
		position: relative;
		width: 100%;
		height: 338rpx;
		background: #fff;
		top: -28rpx;

	}

	.intro>.introIn {
		width: 90%;
		margin: 0 auto;
		margin-top: 30rpx;

	}

	.introIn>.top {
		font-size: 48rpx;
		font-weight: bold;
		color: rgba(245, 49, 49, 1);
	}

	.introIn>.top>.a {
		display: inline-block;
		font-size: 48rpx;
		font-weight: bold;
		color: rgba(245, 49, 49, 1);
	}

	.introIn>.top>.a>text {
		display: inline-block;
		font-size: 28rpx;
		font-weight: bold;
		color: rgba(245, 49, 49, 1);
	}

	.introIn>.top>.b {
		display: inline-block;

		font-size: 26rpx;
		font-weight: 500;
		text-decoration: line-through;
		color: rgba(153, 153, 153, 1);
		margin-left: 17rpx;
	}

	.introIn>.top>.c {
		display: inline-block;
		margin-left: 17rpx;
		width: 54rpx;
		height: 26rpx;
		border: 1px solid rgba(245, 49, 49, 1);
		border-radius: 6rpx;
		text-align: center;
		line-height: 26rpx;
		font-size: 20rpx;
		font-weight: 500;
		color: rgba(245, 49, 49, 1);
		position: relative;
		top: -6rpx;

	}

	.introIn>.title {
		margin-top: 20rpx;
		height: 100rpx;
	}

	.introIn>.title>.left {
		float: left;
		width: 80%;
	}

	.introIn>.title>.left>image {
		width: 54rpx;
		height: 26rpx;
	}

	.introIn>.title>.left>text {
		font-size: 30rpx;
		font-weight: bold;
		color: rgba(26, 26, 26, 1);
	}

	.introIn>.title>.right {
		float: right;
		margin-top: 20rpx;
		position: relative
	}

	.introIn>.title>.right>image {
		width: 36rpx;
		height: 42rpx;
		display: block;
		position: relative;
		left: 20rpx;

	}

	.introIn>.title>.right>text {
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
	}

	.introIn>.didian {
		margin-top: 30rpx;
	}

	.introIn>.didian>.a {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
	}

	.introIn>.didian>.b {

		font-weight: 500;
		color: #3DB2A3;
		font-size: 28rpx;
	}

	.introIn>.didian>.c {
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		margin-left: 17rpx;
	}

	.quan {
		margin-top: 70rpx;
	}

	.quan>.left {
		float: left;
	}

	.quan>.left>text {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(179, 179, 179, 1);
	}

	.quan>.left>.juan {
		display: inline-block;
		width: 158rpx;
		height: 40rpx;
		margin-left: 54rpx;
		position: relative;
		top: 10rpx;
	}

	.quan>.left .juan>image {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.quan>.left .juan>text {
		position: absolute;
		left: 20rpx;
		top: 0;
		font-size: 26rpx;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 38rpx;
		text-align: center;
	}

	.quan>.left .juan1 {
		display: inline-block;
		width: 158rpx;
		height: 40rpx;
		margin-left: 10rpx;
		position: relative;
		top: 10rpx;
	}

	.quan>.left .juan1>image {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.quan>.left .juan1>text {
		position: absolute;
		top: 0;
		left: 20rpx;

		font-size: 26rpx;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 38rpx;
		text-align: center;
	}

	.quan .shou {
		display: inline-block;
		margin-left: 40rpx;
	}

	.quan>.right {
		float: right;
	}

	.quan>.right>image {
		width: 20rpx;
		height: 20rpx;
	}

	.xiao {
		margin-top: 20rpx;
	}

	.xiao>.left {
		float: left;
	}

	.xiao>.left>text {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(179, 179, 179, 1);
	}

	.xiao>.left>.ka {
		display: inline-block;
		width: 54rpx;
		height: 26rpx;
		border: 1px solid rgba(245, 49, 49, 1);
		border-radius: 6rpx;
		font-size: 20rpx;
		font-weight: 500;
		color: rgba(245, 49, 49, 1);
		text-align: center;
		margin-left: 54rpx;
	}

	.xiao>.left>.la {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);

	}

	.xiao>.right {
		float: right
	}

	.xiao>.right>image {
		width: 20rpx;
		height: 20rpx;
	}

	.xuan {
		margin-top: 0;
		width: 100%;
		height: 100rpx;
		background: #fff;
	}

	.xuan>.left {
		margin-left: 32rpx;
		line-height: 100rpx;
		float: left;
		height: 100rpx;

	}

	.xuan>.left>text {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(179, 179, 179, 1);
		position: relative;
		top: -38rpx;
	}

	.xuan>.left .leftin1 {
		width: 500rpx;
		height: 100rpx;
		display: inline-block;
		overflow: hidden;
		margin-left: 47rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.xuan>.left .la {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);

		display: inline-block;

	}

	.xuan>.right {
		float: right;
		margin-right: 30rpx;
		margin-top: 30rpx;
	}

	.xuan>.right>image {
		width: 20rpx;
		height: 20rpx;
	}

	.content {
		width: 100%;
		padding-top: 60rpx;
		height: 980rpx;
		box-sizing: border-box;

	}

	.contant {
		background: #fff;
		margin-top: 30rpx;
		padding-bottom: 16rpx;
	}

	.contentIn {
		padding-bottom: 100rpx;
		width: 90%;
		margin: 0 auto;
		position: relative;


	}

	.contentIn>.first {
		width: 100%;
		height: 40rpx;
		position: relative
	}

	.contentIn>.first>.left {
		position: absolute;
		display: block;
		left: 0
	}

	.contentIn>.first>.left>text {
		display: block;
		float: left;
		font-size: 36rpx;
		font-weight: bold;
		color: rgba(26, 26, 26, 1);

	}

	.contentIn>.first>.right {
		float: right;
	}

	.contentIn>.first>.right>image {
		width: 20rpx;
		height: 20rpx;

	}

	.contentIn>.first>.right>text {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(179, 179, 179, 1);
		margin-right: 15rpx;
	}

	.pinlun {
		padding-top: 50rpx;
		box-sizing: border-box;
		width: 100%;
		height: auto;
		background: #fff;
	}

	.pinlunIn {
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}

	.pinlunIn>.xin {
		height: 66rpx;
	}

	.pinlunIn>.xin>.left {
		float: left;
	}

	.pinlunIn>.xin>.left>image {
		display: inline-block;
		width: 66rpx;
		height: 66rpx;
		border-radius: 50%;
	}

	.pinlunIn>.xin>.left>text {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		margin-left: 22rpx;
		position: relative;
		top: -20rpx
	}

	.pinlunIn>.xin>.right {
		float: right;
	}

	.pinlunIn>.xin>.right>image {
		width: 24rpx;
		height: 24rpx;
	}

	.pinlunIn>text {
		margin-top: 32rpx;
		display: block;
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
	}

	.pinlunIn>.tp {
		margin-top: 22rpx;
		width: 100%;
		height: auto;

	}

	.pinlunIn>.tp>image {
		width: 159rpx;
		height: 159rpx;
		border-radius: 10rpx;
		margin-right: 18rpx;
	}

	.btn4 {

		position: absolute;
		left: 50%;

		bottom: 0;
		margin-left: -120rpx;

		width: 240rpx;
		height: 68rpx;
		border: 1px solid rgba(230, 230, 230, 1);
		border-radius: 34rpx;
		font-size: 28rpx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(26, 26, 26, 1);
		text-align: center;
		line-height: 68rpx;
	}

	.see {
		background: #fff;
		margin-top: 50rpx;
		width: 100%;
		height: auto;
	}

	.seeIn {
		width: 92%;
		margin: 0 auto;
	}

	.seeIn>text {
		display: block;
		font-size: 36rpx;
		font-weight: bold;
		color: rgba(26, 26, 26, 1);
		margin-bottom: 53rpx;
	}

	.seeIn>.list {
		width: 100%;

	}

	.seeIn>.list>.li {
		width: 218rpx;
		float: left;
		margin-right: 8rpx;
		margin-bottom: 30rpx;
	}

	.seeIn>.list>.etc {
		margin-right: 0
	}

	.seeIn>.list>.li>image {
		width: 218rpx;
		height: 218rpx;
		margin-bottom: 15rpx;
	}

	.seeIn>.list>.li>.tl {
		display: block;
		font-size: 26rpx;
		font-weight: 500;
		width: 100%;
		height: 74rpx;
		overflow: hidden;
		color: rgba(51, 51, 51, 1);

	}

	.seeIn>.list>.li>.pr {
		display: block;
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(245, 49, 49, 1);
	}

	.btn {
		width: 100%;
		height: 198rpx;
		margin-top: 50rpx;
		text-align: center;
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.btn>image {
		width: 22rpx;
		height: 22rpx;


	}

	.price {
		width: 100%;
		height: 98rpx;
		position: fixed;
		bottom: 0;
		background: #fff
	}

	.price>.kefu {
		width: 50rpx;
		height: 60rpx;
		margin-left: 40rpx;
		float: left;
		position: relative
	}

	.price>.kefu>image {
		width: 36rpx;
		height: 32rpx;
		display: block;
		margin-top: 20rpx
	}

	.price>.kefu>contact-button {
		width: 40rpx;
		height: 60rpx;
		display: block;
		margin-top: 20rpx;
		color: #999;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0
	}

	.price>.kefu>text {
		font-size: 20rpx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		position: relative;
		top: -14rpx;
	}

	.price>.gouwu {
		width: 68rpx;
		height: 60rpx;
		margin-left: 60rpx;
		float: left;
		z-index: 999
	}

	.price>.gouwu>image {
		width: 36rpx;
		height: 32rpx;
		display: block;
		margin-top: 20rpx
	}

	.price>.gouwu>text {
		font-size: 20rpx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		position: relative;
		top: -14rpx;
	}

	.btn2 {
		float: right;
		width: 260rpx;
		height: 98rpx;
		background: rgba(102, 102, 102, 1);
		font-size: 36rpx;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 98rpx;
		text-align: center;
		border-radius: 0
	}

	.btn3 {
		float: right;
		border-radius: 0;

		width: 260rpx;
		height: 98rpx;
		background: linear-gradient(-8deg, rgba(61, 179, 163, 1) 0%, rgba(145, 230, 115, 1) 100%);
		font-size: 36rpx;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 98rpx;
		text-align: center
	}

	.bottom {
		height: auto;
	}

	.bottom image {
		display: block;
		width: 100% !important;

	}

	.model {
		width: 200rpx;
		height: 60rpx;
		border-radius: 20rpx;
		position: fixed;
		bottom: 105rpx;
		left: 34%;
		margin: 0 auto;
		color: rgb(0, 0, 0);
		background: rgb(209, 209, 209);
		text-align: center;
		line-height: 60rpx;
		font-size: 28rpx;
	}

	.cu {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.2);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999999
	}

	.kuangIn>.in>.li2 {
		width: 90%;
		margin: 0 auto
	}

	.kuangIn>.in>.li2>image {
		width: 60%;
		text-align: center;
	}

	.kuangIn>.in>.li2>text {
		font-size: 28rpx;
		color: #999;
		text-align: center;
		margin-top: 20rpx;
	}

	.kuangIn>.in>.li2>.left {
		float: left;


	}

	.kuangIn>.in>.li2>.left>text {
		display: inline-block;
		width: 54rpx;
		height: 26rpx;
		border: 1px solid rgba(245, 49, 49, 1);
		border-radius: 6rpx;
		font-size: 20rpx;
		font-weight: 500;
		color: rgba(245, 49, 49, 1);
		text-align: center;
	}

	.kuangIn>.in>.li2>.right {
		margin-left: 84rpx;
		width: 580rpx;
		margin-top: 20rpx;
		padding-top: 10rpx;
		box-sizing: border-box;

	}

	.kuangIn>.in>.li2>.right>.d {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		display: block;
	}

	.kuangIn>.in>.li2>.right>.e {
		display: block;
		margin-top: 20rpx;
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
	}

	.in {
		text-align: center
	}

	.act {
		display: block;
		margin: 0 auto;
		color: rgb(201, 201, 201);
	}

	.Too {
		position: absolute;
		left: 20rpx;
		width: 36rpx;
		height: 42rpx;
	}

	.Too>image {
		width: 100%;
		height: 100%
	}

	.bottom {
		width: 100%;
		height: auto;
		overflow: hidden;
	}

	u-parse {
		height: 500px;
	}
</style>
