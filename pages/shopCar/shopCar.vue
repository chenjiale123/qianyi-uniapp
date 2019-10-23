<template>
	<view class="con">
		

	<view class="whole" v-if='!dl'>

		<view class="edit">
			<text @click="zhuanhua" v-if="show">编辑</text>
			<text @click="zhuanhua1" v-if="!show">完成</text>

		</view>
		<view class="goods">
			<view class="goodsIn" v-if="she!==false">
				<view class='carsList'>
					<view v-for="(item,index) in cardTeams" :key="index">
						<view class="row c-btm-list">
							<!--多选框-->
							<view style='width:60rpx;height:60rpx;' v-if="item.stock == 0"></view>
							<checkbox-group class="checkbox-box" @change='goodsdagou(index)' v-if="item.stock != 0">
								<label class="checkbox checkboxHeight">
									<checkbox :checked="item.selected" />
								</label>
							</checkbox-group>
							<!-- 商品列表 -->
							<view class=' row btm-box' id="item.shopGoodsWithBLOBs.id" >
								<view class='c-cont-left'>
									<view class='c-cont-icon'>
										<image :src='qiniu +item.shopGoodsWithBLOBs.imageThumb' mode='aspectFit'></image>
									</view>
								</view>
								<view class='c-cont-right column'>
									<view class='c-right-top'>
										{{item.shopGoodsWithBLOBs.goodsName}}
									</view>
									<view class='c-number'>
										<text>{{item.shopGoodsSpecid.specName}}</text>

									</view>
									<view class='c-right-btm between'>
										<view class='c-price'>
											￥{{item.shopGoodsSpecid.specPrice}}

										</view>
										<view class='c-shoptrolley'>
											<view class='c-carts-num row'>
												<view class='c-main' @click='getMain(index)'>
													<image src='../../static/image/colorReduction@2x.png'></image>
												</view>
												<view class='c-num'>{{item.cartNum}}</view>
												<view class='c-plus' @click='getPlus(index)'>
													<image src='../../static/image/coloradd@2x.png'></image>
												</view>
											</view>
										</view>
									</view>
								</view>
								<view class='modal' v-if="item.stock == 0">
									<view class='c-cont-left'>
										<view class='c-cont-icon'>
											<!-- <image src='../../static/images/noData.png' mode='aspectFit'></image> -->
										</view>
									</view>
								</view>
								<!--删除  -->
								<view class="remove" @click="delItem(index)">
									<text>删除</text>
								</view>

							</view>
						</view>
					</view>
				</view>

			</view>
			<view class="goodsIn" v-if="she==false">
				<image src="../../static/image/shoppingcar@2x.png"></image>
				<text class="etc">购物车是空的哦，快去添加商品</text>
			</view>
		</view>
		<view class="zongjia" v-if="jiage">
			<checkbox-group class="checkbox-box1" @change='checkedAll'>
				<label class="checkbox checkboxHeight">
					<checkbox :checked="checked_all" />
				</label>
			</checkbox-group>
			<view class="all">合计
				<text>￥{{countMoney}}</text>
			</view>
			<button @click="dingdan" class="btn">去结算</button>

		</view>
		<view class="zongjia" v-if="!jiage">
			<checkbox-group class="checkbox-box1" @change='checkedAll'>
				<label class="checkbox checkboxHeight">
					<checkbox :checked="checked_all" />
				</label>
			</checkbox-group>

			<button @click="dingdan1()" class="dingdan1">删除</button>

		</view>
		<view class='love'>
			<text>猜你喜欢</text>
			<image src='../../static/image/tab@2x.png'></image>
			<view class='li' v-for="(item,index) in goodsList" :key="index" @click="detail(item,index)">
				<image :src='qiniu+item.imageThumb'></image>
				<text>{{item.goodsName}}</text>
				<text class="price">￥{{item.discountPrice}}</text>
			</view>

		</view>
	</view>

	<view class="whole" v-if='dl'>
  <text>您还未登录，无法查看购物车</text>
  </view>
</view>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {



		data() {
			return {
				cardTeams: "",
				checked_all: true, //全选
				newArr: [], //复选框选中
				countMoney: 0,
				goodsList: "",
				carId: '',
				shopId: '',
				selected: true,
				jiage: true,
				show: true,
				dl: true,
				array: [],
				she: false,
				arr:""
			
			}
		},

		onLoad() {
			
			var that = this
			
			this.getList()
			var cardTeams = that.cardTeams
			var arr = that.newArr
			for (var i = 0; i < cardTeams.length; i++) {
				if (that.checked_all) {
					cardTeams[i].selected = true
					arr.push(i)
				} else {
					cardTeams[i].selected = false
					arr = []
				}
			}
			
			this.cardTeams = [],
				this.newArr = []
			
			console.log(that.cardTeams)
			console.log(that.newArr)
			console.log(that.checked_all)
			that.getTotalPrice() //合计
		},
		
		methods: {
			getList:function(){
				var that = this
				
				var userId = uni.getStorageSync('user').loginId || 0
				
				if (userId == 0) {
				
					this.dl = true
				
				} else {
				
					this.dl = false
				
				
					uniRequest.post('/QianYi_Shop/selectCartsByUid',{
						userId:userId,
						page:1
					}).then(res => {
						console.log(res)
				
						if (res.data.isSuc == true) {
				
							this.she = res.data.isSuc
							this.cardTeams = res.data.data.cartsList
							this.shopId = res.data.data.cartsList[0].shopGoodsWithBLOBs.storeId
							this.checked_all = false
				
						} else {
				
							this.she = res.data.isSuc
							// cardTeams: res.data.cartsList,
				
						}
				
				
					}).catch(e => {
						console.log(e)
					})
					uniRequest.get('/QianYi_Shop/selectRecommendGoods?page=1').then(res => {
				
				
						this.goodsList = res.data.data.goodsList
				
						console.log(res)
				
					}).catch(e => {
						console.log(e)
					})
				}
				
			},

			detail: function(id, index) {
				var index = index;

				var Id = id.id;

				console.log(Id)
				this.array.unshift({
					id: Id,
					name: id.goodsName,
					img: id.imageThumb,
					price: id.discountPrice
				})

				uni.setStorageSync('array', this.array)

				uni.navigateTo({
					url: '/pages/shopTetail/shopTetail?id=' + Id.id,
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			zhuanhua: function() {

				this.jiage = false,
					this.show = false

			},
			zhuanhua1: function() {

				this.jiage = true,
					this.show = true

			},

			// 购物车+
			getPlus: function(index) {
				var that = this
				var cardTeams = that.cardTeams
				var index = index


				var cartNum = cardTeams[index].cartNum

				cartNum++

				cardTeams[index].cartNum = cartNum

				this.cardTeams = cardTeams

				that.getTotalPrice()
			},
			// 购物车-
			getMain: function(index) {
				var that = this
				var cardTeams = that.cardTeams
				var index = index
				// console.log(index)
				cardTeams[index].cartNum--
				if (cardTeams[index].cartNum <= 0) {
					cardTeams[index].cartNum = 1
					// that.delItem(e)
				}
				console.log(cardTeams[index].cartNum)

				this.cardTeams = cardTeams

				that.getTotalPrice()
			},
			// 单选
			goodsdagou: function(index) {
				// console.log(e)
				var that = this
				var num = that.num
				var cardTeams = that.cardTeams
				var index = index
				console.log(index)
				var arr = that.newArr
				var selected = cardTeams[index].selected
				// console.log(selected)
				cardTeams[index].selected = !selected
				var a = []
				if (!selected) {
					arr.push(index)

				} else {
					arr.pop()

				}
				console.log(cardTeams.length)
				console.log(arr.length)
				if (arr.length == cardTeams.length) {


					this.checked_all = true

					console.log(this.checked_all)

				} else {

					this.checked_all = false

				}

				this.cardTeams = cardTeams,
					this.newArr = arr


				var a = []

				for (var index in arr) {
					a.push(cardTeams[index].id)

				}
				console.log(a)

				this.carId = a.join(',')

				console.log(this.carId)
				that.getTotalPrice()
			},
			// 全选
			checkedAll: function() {
				var that = this
				var checked_all = that.checked_all
				checked_all = !checked_all
				var cardTeams = that.cardTeams
				var arr = []
				console.log(checked_all)
				for (var i = 0; i < cardTeams.length; i++) {
					cardTeams[i].selected = checked_all
					console.log(checked_all)
					if (checked_all) {
						arr.push(i)
					} else {
						arr = []
					}
				}
				console.log(arr)
				this.arr=arr.join(",")

				that.cardTeams = cardTeams,
					that.checked_all = checked_all,
					that.newArr = arr

				var b = []

				for (var index in arr) {
					b.push(cardTeams[index].id)

				}
				console.log(b)

				this.carId = b.join(',')

				console.log(this.carId)


				that.getTotalPrice()
			},

			// 计算商品价格
			getTotalPrice() {
				var cardTeams = this.cardTeams
				var total = 0
				for (var i = 0; i < cardTeams.length; i++) {
					if (cardTeams[i].selected) {
						total += cardTeams[i].cartNum * cardTeams[i].shopGoodsSpecid.specPrice
					}
				}

				this.cardTeams = cardTeams,
					this.countMoney = total.toFixed(2)

			},
			// 删除
			delItem: function(index) {
				var that = this;
				var index = index;
				var cardTeams = that.cardTeams
				console.log(cardTeams)
				uni.showModal({
					title: '提示',
					content: '确定删除吗？',
					cancelText: '否',
					confirmText: '是',
					success: function(res) {
						if (res.confirm) {

							console.log(index)
							console.log(cardTeams)

							uniRequest.post('/QianYi_Shop/delGoodsCarts?ids=' + cardTeams[index].id).then(res => {
								cardTeams.splice(index, 1);


								this.cardTeams = cardTeams

								that.getTotalPrice()
							}).catch(e => {
								console.log(e)
								console.log(cardTeams[index].id)
							})



						}
					}
				})
			},
			dingdan1: function() {
				var that = this
			
				var cardTeams = that.cardTeams
		
				uniRequest.get('/QianYi_Shop/delGoodsCarts?ids=' + this.carId).then(res => {
					

					console.log(res)
				this.getList()
					

				}).catch(e => {
					console.log(e)
				})
			},
			dingdan: function() {
				console.log(this.carId)
				if (this.carId !== "") {
					uni.navigateTo({
						url: '/pages/orderList/orderList?shopCarId=' + this.carId + '&shopId=' + this.shopId,
						success: function(res) {},
						fail: function(res) {},
						complete: function(res) {},
					})
					console.log(this.carId)
				}

			},
		}

	}
</script>

<style>
	/* pages/gouwu/gouwu.wxss */
	Page {
		width: 100%;
		height: 100%;
		background: rgba(242, 242, 242, 1)
	}
     .con{
		 width: 100%;
		 height: 100%;
		 position: relative;
	 }
	.whole {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.whole>text {
		display: block;
		margin: 0 auto;
		text-align: center;
		line-height: 200rpx;
	}

	.edit {
		width: 100%;
		height: 66rpx;
		background: rgba(255, 255, 255, 1);
		/* border-radius:10px; */
		margin: 0 auto;
		line-height: 66rpx;


	}

	.edit>text {
		float: right;
		font-size: 26rpx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(61, 178, 163, 1);
		margin-right: 30rpx;
	}

	.goods {
		width: 100%;
		height: auto;
		margin: 0 auto;
		margin-top: 30rpx;
		background: #fff
	}

	.goodsIn {
		width: 90%;
		height: auto;
		margin: 0 auto;
		overflow: hidden;
	}

	.carsList {
		background: #fff;
		width: 100%;
		overflow: hidden;
	}

	.checkbox-box {
		width: 36rpx;
		height: 36rpx;
		float: left;
		line-height: 280rpx;
		border-radius: 50%;
		box-sizing: border-box;
	}

	checkbox {
		border-radius: 50%;

	}

	.c-btm-list {
		width: 100%;
		height: 280rpx;

		position: relative;
		-webkit-transition: all 0.4s;
		transition: all 0.4s;
		-webkit-transform: translateX(70px);
		transform: translateX(70px);
		margin-left: -70px;
	}

	.c-cont-left {
		width: 180rpx;
		height: 180rpx;
		float: left;
		margin-left: 36rpx;
	}

	.c-cont-icon {
		width: 180rpx;
		height: 180rpx;

		margin-top: 40rpx;
		float: left;
		margin-left: 36rpx;
	}

	.c-cont-icon>image {
		width: 180rpx;
		height: 180rpx;
		border-radius: 10px;
	}

	.c-cont-right {
		width: calc(100% - 300rpx);
		height: 280rpx;
		position: relative;
		float: right;
		top: 20rpx;
	}

	.c-right-top {
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
	}

	.c-number {
		height: 38rpx;
		background: rgba(242, 242, 242, 1);
		border-radius: 4px;
		font-size: 22rpx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		margin-top: 22rpx;
	}

	.c-number>text {
		font-size: 22rpx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
	}

	.c-right-btm {
		width: 100%;
		height: 38rpx;
		margin-top: 35rpx
	}

	.c-price {
		float: left;
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(245, 49, 49, 1);
	}

	.c-shoptrolley {
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
		background: rgba(242, 242, 242, 1)
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

	.btm-box {
		width: 100%;
	}

	/* 删除 */
	.remove {
		width: 70px;
		height: 100%;
		background-color: #FF2600;
		position: absolute;
		top: 0;
		right: -70px;
		color: #fff;
		display: flex;
		justify-content: center;
		font-size: 32rpx;
		align-items: center;
		text-align: center;
		z-index: 9999;
	}

	.remove image {
		width: 35rpx;
	}

	.touch-move-active {
		-webkit-transform: translateX(0) !important;
		transform: translateX(0) !important;
	}

	.zongjia {
		position: fixed;
		bottom: 98upx;
		width: 100%;
		height: 98rpx;
		background: #fff;
		z-index: 9999;
	}

	.checkbox-box1 {
		width: 36rpx;
		height: 36rpx;
		float: left;
		line-height: 98rpx;
		margin-left: 40rpx;
		box-sizing: border-box;
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

	.zongjia>.btn {
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

	.love {
		text-align: center;
		width: 93%;
		height: auto;
		margin: 0 auto;
		margin-top: 50rpx;
		margin-bottom: 180rpx;
		box-sizing: border-box;
		overflow: hidden;

	}

	.love>text {
		font-size: 36rpx;

		color: rgba(26, 26, 26, 1);
		z-index: 999;
		position: relative
	}

	.love>image {
		display: block;
		width: 142rpx;
		height: 20rpx;
		text-align: center;
		position: relative;
		top: -15rpx;
		margin: 0 auto;
		border-radius: 10rpx;
	}

	.love>.li {
		width: 336rpx;
		height: 526rpx;
		float: left;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 6rpx 12rpx 0px rgba(0, 0, 0, 0.08);
		border-radius: 10rpx;
		text-align: left;

		margin-right: 12rpx;
		margin-top: 12rpx;
	}

	.love>.li>image {
		width: 336rpx;
		height: 336rpx;
	}

	.love>.li>text {
		/* display: block; */
		width: 100%;
		height: 74rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		font-size: 26rpx;
		margin-top: 20rpx;

		color: rgba(26, 26, 26, 1);
	}

	.love>.li>.price {
		display: block;
		font-size: 26rpx;

		color: rgba(245, 49, 49, 1);
		margin-top: 10rpx
	}

	.dingdan1 {
		width: 168rpx;
		height: 58rpx;
		border: 2rpx solid rgba(245, 49, 49, 1);
		border-radius: 29rpx;
		float: right;
		line-height: 58rpx;
		text-align: center;
		font-size: 28rpx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(245, 49, 49, 1);
		margin-top: 20rpx;
		margin-right: 30rpx;
	}

	.etc {
		display: block;
		margin: 0 auto;
		text-align: center;
		font-size: 28rpx;
		color: #999;
	}
</style>
