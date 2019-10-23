<template>
	<!--pages/listTC/listTC.wxml-->
	<view class="whole">
		<view class="zhezao" v-if="price">
			<view class="list">
				<view class="listIn">
					<view @click="show(1)">综合排序</view>
					<view @click="show(2)">热门优先</view>
					<view @click="show(3)">价格从高到低</view>
					<view @click="show(4)">价格从低到高</view>

				</view>
			</view>

		</view>
		<view class="qujian" v-if="sousuo">
			<view class="list1">
				<view class="listIn1">
					<input placeholder="最低价" v-model="di"></input>

					<input placeholder="最高价" v-model="gao"></input>
					<button @click="sure(8)">确认</button>


				</view>
			</view>
		</view>
		<view class="contain">
			<view class="tab">
				<view :class="currentTab==0?'active':''" @click="clickTab1(0)">
					{{mrc}}
				</view>
				<view :class="currentTab==1?'active':''" @click="clickTab(5,1)">
					销量
				</view>
				<view :class="currentTab==2?'active':''" @click="clickTab(6,2)">
					好评</view>
				<view :class="currentTab==3?'active':''" @click="clickTab(7,3)">
					人气
				</view>
				<view :class="currentTab==4?'active':''" @click="clickTab2(4)">
					价格
					<image src="../../static/image/xialla@2x.png"></image>
				</view>


			</view>
			<view class='techan' @click='detail(item,item.id,index)' v-for="(item,index) in data2" :key="index">
				<image class='zhutu' :src='qiniu+item.imageThumb'></image>
				<view class='title'>

					<view class="txt">
						<image src="../../static/image/xpbq@2x.png"></image> {{item.goodsName}}
					</view>
				</view>
				<view class='huodong'>
					<text class='price1'>￥{{item.discountPrice}}</text>

					<image src='../../static/image/mjbq@2x.png'></image>
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
				page: 1,
				pages: 0,
				currentTab: 0,
				data2: [],
				price: false,
				mrc: '综合',
				id: 1,
				sousuo: false,
				di1: '',
				gao1: '',
				array: [],
				di: '',
				gao: ''
			}
		},

		onLoad() {
			var that = this

			this.onfrash(1)
		},

		onReachBottom() {
			this.onfrash(this.page + 1)
		},

		methods: {
			onfrash: function(pageNo) {
				var that = this
				var userId = uni.getStorageSync('user').loginId || 0
				uniRequest.post('/QianYi_Shop/selectGoodsByCondition?goodsName=&page=' + pageNo + '&choseId=' + this.id +
					'&beginPrice=' + this.di1 + '&endPrice=' + this.gao1).then(res => {
					console.log(res)


					this.page = pageNo //当前的页号
					this.pages = res.data.data.pageSize //总页数
					this.data2 = this.data2.concat(res.data.data.shopGoods)


				}).catch(e => {
					console.log(e)
				})
			},
			clickTab: function(id, current) {

				var pageNo = 1
				var that = this;


				uniRequest.post('/QianYi_Shop/selectGoodsByCondition?goodsName=&page=' + pageNo + '&choseId=' + id +
					'&beginPrice= &endPrice= ').then(res => {
					console.log(res)


					this.page = pageNo //当前的页号
					this.pages = res.data.data.pageSize
					this.data2 = res.data.data.shopGoods


				}).catch(e => {
					console.log(e)
				})
				if (this.currentTab === current) {
					return false;
				} else {

					this.currentTab = current

				}
			},
			clickTab1: function() {

				this.price = true

			},
			clickTab2: function() {

				this.sousuo = true

			},
			show: function(id) {
				var pageNo = 1

				this.price = false
		
				this.id = id

				uniRequest.post('/QianYi_Shop/selectGoodsByCondition?goodsName=&page=' + pageNo + '&choseId=' + id +
					'&beginPrice= &endPrice= ').then(res => {
					console.log(res)


					this.page = pageNo //当前的页号
					this.pages = res.data.data.pageSize
					this.data2 = res.data.data.shopGoods


				}).catch(e => {
					console.log(e)
				})
			},


			sure: function(id) {

				var pageNo = 1

				this.sousuo = false,
					this.id = id

				uniRequest.post('/QianYi_Shop/selectGoodsByCondition?goodsName=&page=' + pageNo + '&choseId=' + id +
					'&beginPrice=' + this.di + '&endPrice=' + this.gao).then(res => {
					console.log(res)


					this.page = pageNo //当前的页号
					this.pages = res.data.data.pageSize
					this.data2 = res.data.data.shopGoods


				}).catch(e => {
					console.log(e)
				})
			},
			detail: function(item, id, index) {

				var index = parseInt(index);

				var Id = id;

				console.log(Id)
				this.array.unshift({
					id: Id,
					name: item.goodsName,
					img: item.imageThumb,
					price: item.discountPrice
				})

				uni.setStorageSync('array', this.array)

				uni.navigateTo({
					url: '/pages/shopTetail/shopTetail?id=' + Id,
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
		}

	}
</script>

<style>
	/* pages/listTC/listTC.wxss */
	Page {
		width: 100%;
		height: 100%;
	}

	.whole {
		/* background:rgba(242,242,242,1); */
		width: 100%;
		height: 100%;
		position: relative
	}

	.bj {
		background: #fff;
		margin-top: 20rpx;
		width: 100%;

	}

	.zhezao {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.2);
		z-index: 9999999999999999;
	}

	.qujian {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.2);
		z-index: 9999999999999999;
	}

	.list1 {
		width: 100%;
		height: 146rpx;
		background: rgba(247, 247, 247, 1);
		border-radius: 0px 0px 20rpx 20rpx;
	}

	.listIn1 {
		width: 90%;
		margin: 0 auto;
		padding-top: 40rpx;
		box-sizing: border-box
	}

	input {
		display: inline-block;
		width: 240rpx;
		height: 66rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 33rpx;
	}

	input[placeholder] {
		text-align: center;
		line-height: 66rpx;
		font-size: 28rpx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(204, 204, 204, 1);
	}

	button {
		display: inline-block;
		width: 120rpx;
		height: 66rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 33rpx;
		margin-left: 48rpx;
		font-size: 28rpx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(61, 178, 163, 1);
		text-align: center;
		line-height: 66rpx;
		float: right;
	}

	.list {
		width: 100%;
		height: 30%;
		background: #fff;
		padding-top: 50rpx;
		box-sizing: border-box;

	}

	.listIn {
		width: 90%;
		height: 100%;
		margin: 0 auto;
         z-index: 9999;
	}

	.listIn>view {
		width: 100%;
		height: 25%;
		font-size: 32rpx;
		color: #999;
		line-height: 25%;
		    z-index: 9999;
	}

	.tab {
		width: 100%;
		height: 92rpx;
	}

	 .tab>view{
		width: 20%;
		height: 100%;
		float: left;
		font-size: 30rpx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		line-height: 92rpx;

		color: rgba(51, 51, 51, 1)
	}

	/* .tab2 {
		width: 20%;
		height: 100%;
		float: left;
		font-size: 30rpx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		line-height: 92rpx;

		color: rgba(51, 51, 51, 1)
	}

	.tab3 {
		width: 20%;
		height: 100%;
		float: left;
		font-size: 30rpx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		line-height: 92rpx;

		color: rgba(51, 51, 51, 1)
	}

	.tab4 {
		width: 20%;
		height: 100%;
		float: left;
		font-size: 30rpx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		line-height: 92rpx;

		color: rgba(51, 51, 51, 1)
	}

	.tab5 {
		width: 20%;
		height: 100%;
		float: left;
		font-size: 30rpx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 92rpx;

	} */

	.tab5>image {
		width: 22rpx;
		height: 22rpx;


	}

	.contain {
		width: 93%;
		margin: 0 auto;

	}

	.techan {
		width: 336rpx;
		height: auto;
		float: left;
		box-shadow: 0rpx 12rpx 24rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 10rpx;
		margin-right: 12rpx;
		margin-top: 18rpx;
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
	}

	.fukuan {
		float: right;
		font-size: 22rpx;
		color: #1a1a1a;

	}

	.fukuan>text {
		color: #f53131;
	}

	.active {
		color: #3DB2A3
	}
</style>
