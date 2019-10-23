<template>
	<view class="whole">
		<view class="kuang" v-if="show1">
			<image src="../../static/image/guanbi@2x.png" @click="close1"></image>
			<view class="kuangIn">

				<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }"
				 @click="tabClick(index)">
					{{ item.text }}
				</view>
				<view class="list2" v-for="(item, index) in navList" :key="index" v-if="tabCurrentIndex === index">
					<view class="youhui">
						<view class="youhuiIn">
							<view class="li1" v-for="(item,index) in item.orderList" :key="index">
								<view class="left">{{item.couponMoney}}</view>
								<view class="center1">
									<text class="first">满 {{item.couponFullMoney}} 元可用</text>
									<text class="last">官方赠送</text>
									<text class="last">{{item.beginDate}}-{{item.endDate}}</text>
								</view>
								<view class="right">
									 
									                  <checkbox-group class="checkbox-box" @change='goodsdagou(index)'>
									                    <label class="checkbox checkboxHeight">
									                      <checkbox :checked="item.selected" />
									                    </label>
									                  </checkbox-group>
									
									         
								</view>
							</view>
						</view>

					</view>

				</view>

			</view>
		</view>

		<view class="address">
			<view class="addressIn">
				<view @click="address" v-if="ad==null">
					<text>新增收货地址</text>
					<image src="../../static/image/xinzeng@2x.png"></image>
				</view>
				<view @click="address1" v-else class="dz">
					<image src="../../static/image/xiangqing01@2x.png"></image>
					<text class="name">{{ad.consigneeName}}</text>
					<text class="phone">{{ad.consigneePhone}}</text>
					<view class="dizhi">
						<text>默认</text>{{ad.areaIdPath}}{{ad.address}}</view>
				</view>
				<image src="../../static/image/tiaowen@2x.png" class="tw"></image>
			</view>
		</view>
		<view class="quan" @click="buy">
			<view class="left">
				优惠券
			</view>
			<view class="right">
				<image src="../../static/image/xiangqing01@2x.png"></image>
				优惠{{countMoney}}元

			</view>
		</view>
		<view class="techan">
			<view class="techanIn">
				<view class="top">
					<image src="../../static/image/dianpu@2x.png"></image>
					<text>特产</text>
				</view>
				<view class="center">
					<view class="left">
						<image :src="qiniu+detail.shopGoods.imageThumb"></image>
					</view>
					<view class="right">
						<text class="txt1">
							{{detail.shopGoods.goodsName}}</text>
						<text class="txt2">{{detail.specName}}</text>

						<text class="txt3">￥{{detail.specPrice}}</text>
					</view>
				</view>
				<view class="num">
					<view class="left">购买数量</view>
					<view class="right">
						<view class='c-main' @click='getMain'>
							<image src='../../static/image/colorReduction@2x.png'></image>
						</view>
						<view class='c-num'>{{number}}</view>
						<view class='c-plus' @click='getPlus'>
							<image src='../../static/image/coloradd@2x.png'></image>
						</view>
					</view>
				</view>
				<view class="liuyan">
					<text>留言</text>
					<input placeholder="建议留言前先与商家沟通确认" v-model="yan"></input>
				</view>
			</view>
		</view>
		<view class="intro">
			<view class="introIn">
				<view class="top1">
					<view class="left">商品金额</view>
					<view class="right">￥{{all}}</view>
				</view>
				<view class="top2">
					<view class="left">已优惠</view>
					<view class="right">-￥{{countMoney}}</view>
				</view>
				<view class="top3">
					<view class="left">运费</view>
					<view class="right">+￥{{yunfei}}</view>
				</view>
			</view>
		</view>


		<view class="zongjia">

			<view class="all">合计
				<text>￥{{all_}}</text>
			</view>
			<button @click="dingdan">提交订单</button>

		</view>


		<view class='whole1' v-if="xianshi">
			<view class='contain'>
				<view class='list'>

					<radio-group bindchange="radioChange">
						<label class="tp" v-for="(item,index) in list" :key="index">
							<radio :checked="item.checked" @click='radio(index)'  value="index" />


							<view class='right1'>
								<text class='name'>{{item.consigneeName}}</text>
								<text class='phone'>{{item.consigneePhone}}</text>
								<view class='dizhi'>
									<text class='bq1' v-if="item.isDefault">默认</text>
									<text class='bq2' v-if="item.type==2">公司</text>
									<text class='bq2' v-if="item.type==0">家</text>
									<text class='bq2' v-if="item.type==1">学校</text>
									<text class='dz'>{{item.areaIdPath}}{{item.address}}</text>
								</view>
							</view>
							<view class='right2' @click='edit(item.id,index)' >
								<text>编辑</text>
							</view>
						</label>
					</radio-group>



				</view>

				<view class="add" @click='add'>
					<image src='../../static/image/add@2x.png'></image>
				</view>
			</view>
			<button @click="sure">确定</button>
		</view>


	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {



		data() {
			return {
				tabCurrentIndex: 0,
				price: "",
				num: "",
				Id: '',
				shopId: '',
				detail: '',
				number: '',
				all: '',
				all_: '',
				yunfei: "",
				ad: '',
				show: false,
				currentTab: 0,
				able: '',
				unable: '',
				newArr: [],
				countMoney: 0,
				yan: '',
				id1: '',
				id2: '',
				show2: false,
				xianshi: false,
				guiId: '',
				show1: false,
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

		onLoad(options) {
			var that = this

			var userId = wx.getStorageSync('user').loginId || 0

			uniRequest.post('/QianYi_Shop/selectAddressByUserId',{
                       page:1,
                       userId:105
			}).then(res => {


				this.list = res.data.data.shopAddressList
				console.log(res)




			}).catch(e => {
				console.log(e)
			})



			this.price = options.price
			this.num = options.num
			this.Id = options.id
			this.shopId = options.shopId
			this.guiId = options.guiId
			console.log(options)

			var userId = wx.getStorageSync('user').loginId || 0

			uniRequest.get('/QianYi_Shop/selectIstest?userId=' + userId + '&goodsSpecId=' + this.guiId + '&shopId=' + this.shopId +
				'&goodsId=' + this.Id + '&goodsNum=' + this.num + '&type=2').then(res => {
				console.log(res)

				that.navList[0].orderList = res.data.data.shopCouponsList




			}).catch(e => {
				console.log(e)
			})
			var userId = wx.getStorageSync('user').loginId || 0

			uniRequest.get('/QianYi_Shop/selectIstest?userId=' + userId + '&goodsSpecId=' + this.guiId + '&shopId=' + this.shopId +
				'&goodsId=' + this.Id + '&goodsNum=' + this.num + '&type=1').then(res => {
				console.log(res)

				that.navList[1].orderList = res.data.data.shopCouponsList




			}).catch(e => {
				console.log(e)
			})
			var userId = wx.getStorageSync('user').loginId || 0

			uniRequest.get('/QianYi_Shop/insertSingleShopOrderGoods?userId=' + userId + '&goodsSpecId=' + this.guiId +
				'&shopId=' + this.shopId + '&goodsId=' + this.Id +
				'&number=' + this.num).then(res => {
				console.log(res)



				this.detail = res.data.data.orderEdit[0].specificationGoodsList,
					this.number = res.data.data.orderEdit[0].number,
					this.all = res.data.data.calculationAmount.goodsMoneyAll,
					this.all_ = res.data.data.calculationAmount.MoneyAll,
					this.yunfei = res.data.data.calculationAmount.freightMoneyAll,

					this.ad = res.data.data.orderEdit[0].shopAddressList





			}).catch(e => {
				console.log(e)
			})

		},

		methods: {
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
			},
            
			buy: function() {

				this.show1 = !this.show1

			},
			close1: function() {

				this.show1 = false

			},
			add: function() {
				uni.navigateTo({
					url: '/pages/addressAdd/addressAdd',

				})
			},


			radioChange($event,index) {
				
					console.log($event,index)
			
			},
			radio(index){
				this.list1= this.list[index]
				this.index1= index
				console.log(index)
			},
			sure: function(e) {

				this.ad = this.list1,
					this.xianshi = false

			},

			edit: function(id,index) {
				var that = this


				console.log(id)
				var li = index
				console.log(that.list[li])
				wx.navigateTo({
					url: '/pages/addressEdit/addressEdit?name=' + that.list[li].consigneeName + '&phone=' + that.list[li]
						.consigneePhone + '&path=' + that.list[li].areaIdPath + '&detail=' + that.list[li].address +
						'&moren=' + that.list[li].isDefault + '&id=' + that.list[li].id + '&type=' + that.list[li].type,
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			address: function() {
				uni.navigateTo({
					url: '/pages/addressAdd/addressAdd',
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			address1: function() {

				this.xianshi = true

			},
			dingdan: function() {
				var that = this

			
				console.log(this.ad.id)
				var userId = wx.getStorageSync('user').loginId || 0

				uniRequest.get('/QianYi_Shop/placeShopOrderGoods?userId=' + userId + '&goodsSpecId=' + this.guiId +
					'&addressId=' + this.ad.id + '&goodsId=' + this.Id + '&shopId=' + this.shopId + '&goodsNumber=' +
					this.number + '&couponsId=' + this.id1 + '&shopCarId=0&paymentAmount=' + this.all_ +
					'&orderRemarks=' + this.yan).then(res => {
					console.log(res)
					uniRequest.post('/QianYi_Shop/pay/wechat/createOrder?orderId=' + res.data.data.shopOrderId + '&type=0').then(res => {
						console.log(res)
						
							that.appid= res.data.appid,
							that.timestamp=res.data.timestamp
							that.noncestr=res.data.noncestr
							that.package=res.data.package
							that.sign=res.data.sign




						})
						console.log(res.data.timestamp.toString())

						// wx.requestPayment({
						
						// 	'timeStamp': res.timestamp.toString(),
						// 	'nonceStr': res.noncestr,
						// 	'package': res.package,
						// 	'signType': 'MD5',
						// 	'paySign': res.sign,
						// 	'success': function(res) {
							
						// 	},
						// 	'fail': function(res) {
						// 		console.log(res)
						// 		wx.navigateTo({
						// 			url: '/pages/success1/success1',
						// 			success: function(res) {},
						// 			fail: function(res) {},
						// 			complete: function(res) {},
						// 		})

						// 	},
						// 	'complete': function(res) {}
						// })
					}).catch(e => {
						console.log(e)
					})


				// }).catch(e => {
				// 	console.log(e)
				// })
				// zhifu


			},

			goodsdagou: function(index) {
			
				var that = this
				var num = that.num
				var cardTeams = that.navList[1].orderList
				var index = index
				console.log(index)
				console.log(cardTeams[index].id)

				var arr = that.newArr
				var selected = cardTeams[index].selected
				console.log(selected)
				cardTeams[index].selected = !selected
				if (!selected) {
					arr.push(index)
				} else {
					arr.pop()
				}
				console.log(arr)
				console.log(arr.length)

				
					that.cardTeams= cardTeams,
					that.newArr= arr,
					that.id1= cardTeams[index].id
			

			},
		
			getPlus: function(e) {
				var that = this

				that.number++

				this.number = that.number

				this.again()
				this.getTotalPrice()
			},
			// 购物车-
			getMain: function(e) {
				var that = this
				that.number--

				// console.log(index)

				if (that.number <= 0) {
					that.number = 1

				}




				that.again()
				this.getTotalPrice()

			},
			getTotalPrice:function() {
				var number = this.number
				var pri = this.specPrice
				var total = 0

				var price = number * pri

			
					this.all=price,

					this.all_=price - this.countMoney + this.yunfei
				
			},
			/**
			 * 生命周期函数--监听页面加载
			 */
			again: function() {
				var that = this
				var userId = wx.getStorageSync('user').loginId || 0

				uniRequest.get('/QianYi_Shop/selectIstest?userId=' + userId + '&goodsSpecId=' + this.guiId + '&shopId=' +
					this.shopId + '&goodsId=' + this.Id + '&goodsNum=' + this.number + '&type=1').then(res => {
					console.log(res)

					this.unable = res.data.data.shopCouponsList

		           that.navList[1].orderList = res.data.data.shopCouponsList


				}).catch(e => {
					console.log(e)
				})
			},
		}

	}
</script>

<style>
	Page {
		width: 100%;
		height: 100%
	}

	.whole {
		width: 100%;
		height: 100%;
		position: relative;
		padding-top: 30rpx;
		box-sizing: border-box;
		background: rgba(247, 247, 247);

	}

	.kuang {
		width: 100%;
		height: 60%;
		position: fixed;
		bottom: -20rpx;
		background: #fff;
		border-radius: 20rpx;
		z-index: 99999999
	}

	.kuang>.kuangIn {
		width: 94%;
		margin: 0 auto;
		position: relative;
		padding-top: 30rpx;
		box-sizing: border-box;
		height: 100%;
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

	.swiper-tab {
		width: 70%;
		margin: 0 auto;
		height: 90rpx;
	}

	.nav-item {
		width: auto;
		padding: 20rpx;
		float: left;
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);

	}

	swiper {
		height: 80% !important
	}

	.current {
		border-bottom: 4rpx solid rgba(61, 178, 163, 1);
	}

	.youhui {
		height: 100%;
		width: 100%;
		background: rgba(247, 247, 247, 1);
	}

	.youhui>button {
		width: 100%;
		height: 98rpx;
		background: linear-gradient(-8deg, rgba(61, 179, 163, 1) 0%, rgba(145, 230, 115, 1) 100%);
		font-size: 36rpx;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 98rpx;
		position: fixed;
		bottom: 0
	}

	.youhuiIn {
		height: 100%;
		width: 94%;
		margin: 0 auto;
		padding-top: 40rpx;
		box-sizing: border-box;
		overflow: auto;
	}

	.youhuiIn>text {
		font-size: 24rpx;
		font-weight: 500;
		display: block;
		color: rgba(26, 26, 26, 1);
	}

	.youhuiIn>.li1 {
		margin-top: 30rpx;
		height: 148rpx;
	}

	.youhuiIn>.li1>.left {
		float: left;
		width: 148rpx;
		height: 148rpx;
		background: #FF7F66;
		border-radius: 10rpx;
		font-size: 40rpx;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 148rpx;
	}

	.youhuiIn>.li1>.center1 {
		float: left;
		margin-left: 30rpx;
		height: 100%;
		width: 250rpx
	}

	.youhuiIn>.li1>.center1>.first {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		display: block;
		margin-top: 20rpx;
	}

	.youhuiIn>.li1>.center1>.last {
		display: block;
		font-size: 22rpx;
		font-weight: 500;
		color: #CCCCCC;
		margin-top: 12rpx;
	}

	.youhuiIn>.li1>.right {
		width: 230rpx;
		height: 100%;
		float: left;
		position: relative
	}

	.youhuiIn>.li1>.right>checkbox-group {
		text-align: center;
		margin: 0 auto;
		margin-top: 52rpx;
	}

	.youhuiIn>.li1>.right>text {
		display: block;
		width: 151rpx;
		height: 78rpx;
		font-size: 22rpx;
		font-weight: 500;
		color: rgba(204, 204, 204, 1);
		margin: 0 auto;
		margin-top: 35rpx;
	}

	.youhuiIn>.li1>.right>image {
		position: absolute;
		width: 6rpx;
		height: 100%;
		left: 0;
		top: 0
	}

	.youhuiIn>.li2 {
		margin-top: 30rpx;
		height: 148rpx;
	}

	.youhuiIn>.li2>.left1 {
		float: left;
		width: 148rpx;
		height: 148rpx;
		background: rgb(216, 215, 214);
		border-radius: 10rpx;
		font-size: 40rpx;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 148rpx;
	}

	.youhuiIn>.li2>.center1 {
		float: left;
		margin-left: 30rpx;
		height: 100%;
		width: 250rpx
	}

	.youhuiIn>.li2>.center1>.first {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		display: block;
		margin-top: 20rpx;
	}

	.youhuiIn>.li2>.center1>.last {
		display: block;
		font-size: 22rpx;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		margin-top: 12rpx;
	}

	.youhuiIn>.li2>.right {
		width: 230rpx;
		height: 100%;
		float: left;
		position: relative
	}

	.youhuiIn>.li2>.right>text {
		display: block;
		width: 151rpx;
		height: 78rpx;
		font-size: 22rpx;
		font-weight: 500;
		color: rgba(204, 204, 204, 1);
		margin: 0 auto;
		margin-top: 35rpx;
	}

	.youhuiIn>.li2>.right>image {
		position: absolute;
		width: 6rpx;
		height: 100%;
		left: 0;
		top: 0
	}

	.address {
		width: 90%;
		margin: 0 auto;
		background: #fff;
		height: 194rpx;
	}


	.addressIn {
		width: 94%;
		margin: 0 auto;
		background: #fff;
		height: 100%;
		position: relative;
		padding-top: 80rpx;
		box-sizing: border-box
	}

	.addressIn>view {
		width: 250rpx;
		margin: 0 auto;

	}

	.addressIn>view>text {
		font-size: 30rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
	}

	.addressIn>view>image {
		width: 36rpx;
		height: 36rpx;
		position: relative;
		top: 8rpx;
		margin-left: 14rpx;
	}

	.addressIn>.dz {
		width: 94%;
		position: absolute;
		left: 30rpx;
		top: 30rpx;
	}

	.addressIn>.dz>.name {
		font-size: 32rpx;
		font-weight: bold;
		color: rgba(26, 26, 26, 1);
	}

	.addressIn>.dz>.phone {
		font-size: 32rpx;
		font-weight: bold;
		color: rgba(26, 26, 26, 1);
		margin-left: 62rpx;
	}

	.addressIn>.dz>.dizhi {
		margin-top: 34rpx;
		font-size: 26rpx;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		/* float: left */
	}

	.addressIn>.dz>.dizhi>text {
		/* display: inline-block; */
		width: 68rpx;
		height: 28rpx;
		background: rgba(245, 49, 49, 0.2);

		border-radius: 4px;
		font-size: 22rpx;
		font-weight: 500;
		text-align: center;
		color: rgb(245, 24, 24);
		margin-right: 30rpx;
		float: left
	}

	.addressIn>.dz>image {
		position: absolute;
		width: 22rpx;
		height: 22rpx;
		right: 31rpx;
		top: 81rpx;
	}

	.addressIn>.tw {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 6rpx;
	}

	.quan {
		width: 90%;
		margin: 30rpx auto 30rpx auto;
		height: 100rpx;
		background: #fff;
		line-height: 100rpx;
	}

	.quan>.left {
		float: left;
		margin-left: 34rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
	}

	.quan>.right {
		float: right;
		margin-right: 34rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
	}

	.quan>.right>image {
		width: 22rpx;
		height: 22rpx;
		float: right;
		margin-top: 40rpx;
	}

	.techan {
		width: 90%;
		margin: 0 auto;
		height: 480rpx;
		background: #fff;

	}

	.techanIn {
		width: 94%;
		margin: 0 auto;

	}

	.top>image {
		width: 56rpx;
		height: 40rpx;
		margin-top: 20rpx;
	}

	.top>text {
		font-size: 32rpx;
		font-weight: bold;
		color: rgba(26, 26, 26, 1);
		margin-left: 20rpx;
	}

	.center {
		margin-top: 35rpx;
		height: 148rpx;
	}

	.center>.left {
		width: 148rpx;
		height: 148rpx;
		float: left;

	}

	.center>.left>image {
		width: 100%;
		height: 100%
	}

	.center>.right {
		width: 424rpx;
		float: right;
		margin-top: 0;
		padding-top: 0;
		position: relative;
		top: -40rpx;

	}

	.center>.right>.txt1 {
		font-size: 26rpx;
		font-weight: bold;
		display: block;
		color: rgba(26, 26, 26, 1);
	}

	.center>.right>.txt2 {
		display: block;
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);

	}

	.center>.right>.txt3 {
		display: block;
		font-size: 30rpx;
		font-weight: bold;
		color: rgba(245, 49, 49, 1);
	}

	.num {
		margin-top: 60rpx;
		height: 80rpx;
	}

	.num>.left {
		float: left;
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		clear: both
	}

	.num>.right {
		float: right;
		clear: both;
		position: relative;
		top: -40rpx;
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

	.liuyan {
		margin-top: 20rpx;
	}

	.liuyan>text {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
	}

	.liuyan>input {
		width: 362rpx;
		height: 28rpx;
		display: inline-block;
		margin-left: 28rpx;
		position: relative;
		top: 16rpx;

	}

	.liuyan>input[placeholder] {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(204, 204, 204, 1);
	}

	.intro {
		width: 90%;
		margin: 0 auto;
		margin-top: 40rpx;
		height: 210rpx;
		background: #fff;


	}

	.introIn {
		width: 94%;
		margin: 0 auto;
	}

	.introIn>.top1>.left {
		float: left;
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		clear: both
	}

	.introIn>.top1>.right {
		float: right;
		font-size: 30rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		clear: both;
		position: relative;
		top: -28rpx;
	}

	.introIn>.top2>.left {
		float: left;
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		clear: both
	}

	.introIn>.top2>.right {
		float: right;
		font-size: 30rpx;
		font-weight: 500;
		color: rgba(245, 49, 49, 1);
		clear: both;
		position: relative;
		top: -28rpx;
	}

	.introIn>.top3>.left {
		float: left;
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		clear: both
	}

	.introIn>.top3>.right {
		float: right;
		font-size: 30rpx;
		font-weight: 500;
		color: rgba(245, 49, 49, 1);
		clear: both;
		position: relative;
		top: -28rpx;
	}

	.zongjia {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 98rpx;
		background: #fff
	}

	.all {
		line-height: 98rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		margin-left: 40rpx;
		float: left
	}

	.all>text {
		font-size: 24rpx;
		font-weight: bold;
		color: rgba(245, 49, 49, 1);
		/* float: left */
	}

	.zongjia>button {
		width: 270rpx;
		height: 98rpx;
		float: right;
		background: linear-gradient(-8deg, rgba(61, 179, 163, 1) 0%, rgba(145, 230, 115, 1) 100%);
		font-size: 36rpx;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 98rpx;
		text-align: center
	}


	.whole1 {
		z-index: 9999999;
		position: absolute;
		background: rgba(242, 242, 242, 1);
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	.contain {
		width: 90%;
		margin: 0 auto;

	}

	.list {
		width: 100%;
		height: auto;
	}

	.list .tp {
		width: 100%;
		height: 90rpx;
		margin-bottom: 80rpx;
	}

	.list .tp radio {
		width: 64rpx;
		height: 64rpx;
		/* background:rgba(110,166,245,1); */
		/* opacity:0.2; */
		border-radius: 50%;
		float: left;
		margin-top: 50rpx;
		text-align: center;
		line-height: 64rpx;
		clear: both
	}

	.list .tp image {
		width: 38rpx;
		height: 38rpx;
		line-height: 64rpx;
		text-align: center;

	}

	.list .tp1 {
		width: 64rpx;
		height: 64rpx;
		background: #999;

		border-radius: 50%;
		float: left;
		margin-top: 50rpx;
		text-align: center;
		line-height: 64rpx;
	}

	.list .tp1 text {
		font-size: 36rpx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);

	}

	.list .right1 {
		width: 70%;
		height: 100%;
		margin-left: 20rpx;
		float: left;
		margin-top: 30rpx;

	}

	.list .right1>.name {
		font-size: 32rpx;

		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		margin-top: 30rpx;
	}

	.list .right1>.phone {
		font-size: 26rpx;

		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		margin-left: 11rpx;
		margin-top: 30rpx;

	}

	.list .right1>.dizhi {

		width: 100%;
	}

	.list .right1>.dizhi>.bq1 {
		width: 68rpx;
		height: 28rpx;
		background: rgba(245, 49, 49, 1);
		opacity: 0.1;
		border-radius: 4rpx;
		text-align: center;
		font-size: 22rpx;
	}

	.list .right1>.dizhi>.bq2 {
		width: 68rpx;
		height: 28rpx;
		background: rgba(102, 102, 102, 1);
		opacity: 0.1;
		border-radius: 4rpx;
		text-align: center;
		margin-left: 10rpx;
		font-size: 22rpx;

	}

	.list .right1>.dizhi>.dz {
		font-size: 26rpx;

		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		margin-left: 10rpx;




	}

	.list .right2 {
		float: right;
		width: 80rpx;
		height: 60rpx;
		margin-left: 24rpx;
		text-align: center;
		font-size: 26rpx;
		border-left: 1px solid #666;
		margin-top: 50rpx;

	}

	.list .right2>text {
		/* margin-top: 15rpx; */
		line-height: 60rpx;
		color: #666
	}

	.add {
		position: fixed;
		width: 84rpx;
		height: 84rpx;
		background: rgba(255, 255, 255, 1);
		border: 2px solid rgba(230, 230, 230, 1);
		box-shadow: 0px 4rpx 16rpx 0px rgba(0, 0, 0, 0.08);
		border-radius: 50%;
		right: 5%;
		bottom: 100rpx;
	}

	.add image {
		width: 100%;
		height: 100%;
	}

	.whole1 button {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 98rpx;
		background: linear-gradient(-8deg, rgba(61, 179, 163, 1) 0%, rgba(145, 230, 115, 1) 100%);
		font-size: 48rpx;
		color: #fff;
		text-align: center;
		line-height: 98rpx;
		border-radius: 0
	}
</style>
