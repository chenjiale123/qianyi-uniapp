<template>
	<view class='whole'>
		<view class='swiper'>
			<view class='bj'>
				<view class="contain">
					<view class="swiper-tab">
						<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }"
						 @click="tabClick(index)">
							{{ item.text }}
						</view>
					</view>
				</view>
			</view>

			<view class="list2" v-for="(item, index) in navList" :key="index" v-if="tabCurrentIndex === index">

				<view class='bj' v-for="(item,index) in item.orderList" :key="index">
					<view class="contain" v-if="leng!==0">
						<view class='techan'>
							<image src='../../static/image/Thestoreicon@2x.png' class='tp'></image>
							<text>特产</text>
							<image src='../../static/image/fanhui@2x.png' class='ck'></image>
							<view class='right'>
								<text>{{item.orderStatus}} </text>
							</view>
							<view class='list '>
								<view class="intop" @click="jdDetail(item.id)" v-if="item.orderStatus!=='待支付'">
									<view class="In" v-for="(item,index) in item.orderGoodsList" :key="index">
										<image :src='qiniu+item.goodsImg'></image>
										<view class='right1'>
											<text class='title'>{{item.goodsName}}</text>
											<text class='com'>{{item.goodsSpecnames}}</text>
										</view>
										<view class='right2'>
											<text class='num1'>{{item.goodsRealPrice}}</text>
											<text class='num2'>x{{item.goodsNum}}</text>
										</view>
									</view>
									<text class='all'>合计：{{item.realTotalMoney}} 共{{item.goodsSum}}件商品</text>
									<text class='all'></text>
								</view>
								<view class="intop" @click="zhifu(item.id,index)" v-if="item.orderStatus=='待支付'">
									<view class="In" v-for="(item,index) in item.orderGoodsList" :key="index">
										<image :src='qiniu+item.goodsImg'></image>
										<view class='right1'>
											<text class='title'>{{item.goodsName}}</text>
											<text class='com'>{{item.goodsSpecnames}}</text>
										</view>
										<view class='right2'>
											<text class='num1'>{{item.goodsRealPrice}}</text>
											<text class='num2'>x{{item.goodsNum}}</text>
										</view>
									</view>
									<text class='all'>合计：{{item.realTotalMoney}} 共{{item.goodsSum}}件商品</text>
									<text class='all'></text>
								</view>
								<view class='btn' v-if="item.orderStatus=='待支付'">
									<button @click="quxiao(item.id)"> 取消订单</button>
									<button class='etc'>支付</button>
								</view>
								<view class='btn' v-if="item.orderStatus=='用户取消'">
									<button @click="shanchu(item,id)">删除订单</button>
									<button class='etc'>再次购买</button>
								</view>
								<view class='btn' v-if="item.orderStatus=='待发货'">
									<button @click="tuikuan(item.id,index)">退款</button>
									<button>提醒发货</button>
								</view>
								<view class='btn' v-if="item.orderStatus=='待收货'">
									<button @click="tuikuan(item.id,index)">退款</button>
									<button @click="kuaidi(item.id)">查看物流</button>
									<button class='etc' @click="sure(item.id)">确认收货</button>
								</view>
								<view class='btn' v-if="item.orderStatus=='待评价'">
									<button @click="tuikuan(item.id,index)">退款</button>
									<button @click="shanchu(item.id)">删除</button>
									<button class='etc' @click='detail(item.id,item.goodsId)'>评价</button>
								</view>
								<view class='btn' v-if="item.orderStatus=='退款中'">
									<button class='etc' @click="jindu(item.id)">退款进度</button>
								</view>
								<view class='btn ' v-if="item.orderStatus=='已评价'">
									<button @click="tuikuan(item.id,index)">退款</button>
									<button @click="shanchu(item.id)">删除订单</button>
									<button class='etc ' @click='detail1(item.id,item.goodsId)'>追评</button>
								</view>
								<view class='btn ' v-if="item.orderStatus=='已追评'">
									<button @click="tuikuan(item.id,index)">退款</button>
									<button class="etc" @click="shanchu(item.id)">删除订单</button>
								</view>
							</view>
						</view>
					</view>
					<view class='bj' v-if="leng==0">
						<image src="http://dev.static.qianyipan.com/image/jpg/wudingdan@2x.png"></image>
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
				tabCurrentIndex: 0,
				navList: [{
						text: '全部',
						orderList: []
					},
					{

						text: '待付款',
						orderList: []
					},
					{
						text: '全部',
						orderList: []
					},
					{

						text: '待付款',
						orderList: []
					},

					{

						text: '待付款',
						orderList: []
					},
					{
						text: '全部',
						orderList: []
					},
					
					{
						text: '全部',
						orderList: []
					},
					
					
					{
						text: '全部',
						orderList: []
					},
					
					
					
					{
						text: '全部',
						orderList: []
					}
				],
				leng: ''
			}
		},

		onLoad() {
			var that = this

			var userId = uni.getStorageSync('user').loginId || 0

			uniRequest.post('/QianYi_Shop/selectShopOrder?userId=' + userId + '&orderStatus=4&page=1').then(res => {
				console.log(res)
				if (res.data.isSuc == true) {
					for (var i = 0; i < res.data.data.orderList.length; i++) {
						var item = res.data.data.orderList[i];
						if (item.orderStatus == -2) {
							item.orderStatus = "待支付";
						}
						if (item.orderStatus == 0) {
							item.orderStatus = "待发货";
						}
						if (item.orderStatus == 1) {
							item.orderStatus = "待收货";
						}
						if (item.orderStatus == 2) {
							item.orderStatus = "待评价";
						}
						if (item.orderStatus == 3) {
							item.orderStatus = "退款中";
						}
						if (item.orderStatus == 5) {
							item.orderStatus = "已评价";
						}
						if (item.orderStatus == 6) {
							item.orderStatus = "已追评";
						}
						if (item.orderStatus == -1) {
							item.orderStatus = "用户取消";
						}

					}
					this.navList[0].orderList = res.data.data.orderList
					this.leng = res.data.data.orderList.length


				} else {
					this.leng = 0

				}
			}).catch(e => {
				console.log(e)
			})



			uniRequest.post('/QianYi_Shop/selectShopOrder?userId=' + userId + '&orderStatus=-2&page=1').then(res => {
				console.log(res)
				if (res.data.isSuc == true) {
					for (var i = 0; i < res.data.data.orderList.length; i++) {
						var item = res.data.data.orderList[i];
						if (item.orderStatus == -2) {
							item.orderStatus = "待支付";
						}
						if (item.orderStatus == 0) {
							item.orderStatus = "待发货";
						}
						if (item.orderStatus == 1) {
							item.orderStatus = "待收货";
						}
						if (item.orderStatus == 2) {
							item.orderStatus = "待评价";
						}
						if (item.orderStatus == 3) {
							item.orderStatus = "退款中";
						}
						if (item.orderStatus == 5) {
							item.orderStatus = "已评价";
						}
						if (item.orderStatus == 6) {
							item.orderStatus = "已追评";
						}
						if (item.orderStatus == -1) {
							item.orderStatus = "用户取消";
						}
					
					}

					this.navList[1].orderList = res.data.data.orderList
					this.leng1 = res.data.data.orderList.length


				} else {
					this.leng1 = 0
				}

			}).catch(e => {
				console.log(e)
			})
			uniRequest.post('/QianYi_Shop/selectShopOrder?userId=' + userId + '&orderStatus=-1&page=1').then(res => {
				console.log(res)
				if (res.data.isSuc == true) {
					for (var i = 0; i < res.data.data.orderList.length; i++) {
						var item = res.data.data.orderList[i];
						if (item.orderStatus == -2) {
							item.orderStatus = "待支付";
						}
						if (item.orderStatus == 0) {
							item.orderStatus = "待发货";
						}
						if (item.orderStatus == 1) {
							item.orderStatus = "待收货";
						}
						if (item.orderStatus == 2) {
							item.orderStatus = "待评价";
						}
						if (item.orderStatus == 3) {
							item.orderStatus = "退款中";
						}
						if (item.orderStatus == 5) {
							item.orderStatus = "已评价";
						}
						if (item.orderStatus == 6) {
							item.orderStatus = "已追评";
						}
						if (item.orderStatus == -1) {
							item.orderStatus = "用户取消";
						}
					
					}

					this.navList[2].orderList = res.data.data.orderList
					this.leng2 = res.data.data.orderList.length


				} else {
					this.leng2 = 0
				}



			}).catch(e => {
				console.log(e)
			})
			uniRequest.post('/QianYi_Shop/selectShopOrder?userId=' + userId + '&orderStatus=0&page=1').then(res => {
				console.log(res)
				if (res.data.isSuc == true) {
					for (var i = 0; i < res.data.data.orderList.length; i++) {
						var item = res.data.data.orderList[i];
						if (item.orderStatus == -2) {
							item.orderStatus = "待支付";
						}
						if (item.orderStatus == 0) {
							item.orderStatus = "待发货";
						}
						if (item.orderStatus == 1) {
							item.orderStatus = "待收货";
						}
						if (item.orderStatus == 2) {
							item.orderStatus = "待评价";
						}
						if (item.orderStatus == 3) {
							item.orderStatus = "退款中";
						}
						if (item.orderStatus == 5) {
							item.orderStatus = "已评价";
						}
						if (item.orderStatus == 6) {
							item.orderStatus = "已追评";
						}
						if (item.orderStatus == -1) {
							item.orderStatus = "用户取消";
						}
					
					}

					this.navList[3].orderList = res.data.data.orderList
					this.leng3 = res.data.data.orderList.length


				} else {
					this.leng3 = 0
				}



			}).catch(e => {
				console.log(e)
			})
			uniRequest.post('/QianYi_Shop/selectShopOrder?userId=' + userId + '&orderStatus=1&page=1').then(res => {
				console.log(res)
				if (res.data.isSuc == true) {
					for (var i = 0; i < res.data.data.orderList.length; i++) {
						var item = res.data.data.orderList[i];
						if (item.orderStatus == -2) {
							item.orderStatus = "待支付";
						}
						if (item.orderStatus == 0) {
							item.orderStatus = "待发货";
						}
						if (item.orderStatus == 1) {
							item.orderStatus = "待收货";
						}
						if (item.orderStatus == 2) {
							item.orderStatus = "待评价";
						}
						if (item.orderStatus == 3) {
							item.orderStatus = "退款中";
						}
						if (item.orderStatus == 5) {
							item.orderStatus = "已评价";
						}
						if (item.orderStatus == 6) {
							item.orderStatus = "已追评";
						}
						if (item.orderStatus == -1) {
							item.orderStatus = "用户取消";
						}
					
					}

					this.navList[4].orderList = res.data.data.orderList
					this.leng4 = res.data.data.orderList.length


				} else {
					this.leng4 = 0
				}



			}).catch(e => {
				console.log(e)
			})
			uniRequest.post('/QianYi_Shop/selectShopOrder?userId=' + userId + '&orderStatus=2&page=1').then(res => {
				console.log(res)
				if (res.data.isSuc == true) {
					for (var i = 0; i < res.data.data.orderList.length; i++) {
						var item = res.data.data.orderList[i];
						if (item.orderStatus == -2) {
							item.orderStatus = "待支付";
						}
						if (item.orderStatus == 0) {
							item.orderStatus = "待发货";
						}
						if (item.orderStatus == 1) {
							item.orderStatus = "待收货";
						}
						if (item.orderStatus == 2) {
							item.orderStatus = "待评价";
						}
						if (item.orderStatus == 3) {
							item.orderStatus = "退款中";
						}
						if (item.orderStatus == 5) {
							item.orderStatus = "已评价";
						}
						if (item.orderStatus == 6) {
							item.orderStatus = "已追评";
						}
						if (item.orderStatus == -1) {
							item.orderStatus = "用户取消";
						}
					
					}

					this.navList[5].orderList = res.data.data.orderList
					this.leng5 = res.data.data.orderList.length


				} else {
					this.leng5 = 0
				}



			}).catch(e => {
				console.log(e)
			})
			uniRequest.post('/QianYi_Shop/selectShopOrder?userId=' + userId + '&orderStatus=3&page=1').then(res => {
				console.log(res)
				if (res.data.isSuc == true) {
					for (var i = 0; i < res.data.data.orderList.length; i++) {
						var item = res.data.data.orderList[i];
						if (item.orderStatus == -2) {
							item.orderStatus = "待支付";
						}
						if (item.orderStatus == 0) {
							item.orderStatus = "待发货";
						}
						if (item.orderStatus == 1) {
							item.orderStatus = "待收货";
						}
						if (item.orderStatus == 2) {
							item.orderStatus = "待评价";
						}
						if (item.orderStatus == 3) {
							item.orderStatus = "退款中";
						}
						if (item.orderStatus == 5) {
							item.orderStatus = "已评价";
						}
						if (item.orderStatus == 6) {
							item.orderStatus = "已追评";
						}
						if (item.orderStatus == -1) {
							item.orderStatus = "用户取消";
						}
					
					}

					this.navList[6].orderList = res.data.data.orderList
					this.leng6 = res.data.data.orderList.length


				} else {
					this.leng6 = 0
				}



			}).catch(e => {
				console.log(e)
			})
			    uniRequest.post('/QianYi_Shop/selectShopOrder?userId='+userId+'&orderStatus=5&page=1').then(res => {
			      console.log(res)
			      if (res.data.isSuc == true) {
					  for (var i = 0; i < res.data.data.orderList.length; i++) {
					  	var item = res.data.data.orderList[i];
					  	if (item.orderStatus == -2) {
					  		item.orderStatus = "待支付";
					  	}
					  	if (item.orderStatus == 0) {
					  		item.orderStatus = "待发货";
					  	}
					  	if (item.orderStatus == 1) {
					  		item.orderStatus = "待收货";
					  	}
					  	if (item.orderStatus == 2) {
					  		item.orderStatus = "待评价";
					  	}
					  	if (item.orderStatus == 3) {
					  		item.orderStatus = "退款中";
					  	}
					  	if (item.orderStatus == 5) {
					  		item.orderStatus = "已评价";
					  	}
					  	if (item.orderStatus == 6) {
					  		item.orderStatus = "已追评";
					  	}
					  	if (item.orderStatus == -1) {
					  		item.orderStatus = "用户取消";
					  	}
					  
					  }

			        this.navList[7].orderList= res.data.data.orderList
			        this.leng7= res.data.data.orderList.length


			      console.log(this.data.leng7)
			      } else {
			       this.leng7=0
			      }



			    }).catch(e => {
			      console.log(e)
			    })
			    uniRequest.post('/QianYi_Shop/selectShopOrder?userId='+userId+'&orderStatus=6&page=1').then(res => {
			      console.log(res)
			      if (res.data.isSuc == true) {
					  for (var i = 0; i < res.data.data.orderList.length; i++) {
					  	var item = res.data.data.orderList[i];
					  	if (item.orderStatus == -2) {
					  		item.orderStatus = "待支付";
					  	}
					  	if (item.orderStatus == 0) {
					  		item.orderStatus = "待发货";
					  	}
					  	if (item.orderStatus == 1) {
					  		item.orderStatus = "待收货";
					  	}
					  	if (item.orderStatus == 2) {
					  		item.orderStatus = "待评价";
					  	}
					  	if (item.orderStatus == 3) {
					  		item.orderStatus = "退款中";
					  	}
					  	if (item.orderStatus == 5) {
					  		item.orderStatus = "已评价";
					  	}
					  	if (item.orderStatus == 6) {
					  		item.orderStatus = "已追评";
					  	}
					  	if (item.orderStatus == -1) {
					  		item.orderStatus = "用户取消";
					  	}
					  
					  }

			        this.navList[8].orderList= res.data.data.orderList
			        this.leng8= res.data.data.orderList.length


			      } else {
			       this.leng8=0
			      }


			    }).catch(e => {
			      console.log(e)
			    })

		},

		methods: {
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			zhifu: function(id, index) {

				uni.navigateTo({
					url: '/pages/zhifu/zhifu?id=' + index + '&goods=' + JSON.stringify(this.navList[0].orderList[index].orderGoodsList) +
						'&price=' + this.navList[0].orderList[index].realTotalMoney + '&time=' + this.navList[0].orderList[index].createTime + '&code=' + this.navList[0].orderList[
							index].orderNo + '&id1=' + id + '&id2=' + id,
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			detail: function(id, index) {

				this.id4 = index

				uni.navigateTo({
					url: '/pages/comment/comment?id=' + id + '&ding=' + index,
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})

			},
			detail1: function(id, index) {
				this.id4 = index
				console.log(index,id)
				uni.navigateTo({
					url: '/pages/commentListZ/commentListZ?id=' + id + '&ding=' + index,
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})

			},
			jdDetail: function(id) {
				uni.navigateTo({
					url: '/pages/SpecialDetail/SpecialDetail?id=' + id,
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			wuliu: function() {
				uni.navigateTo({
					url: '/pages/wuliu/wuliu',
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			jindu: function(id) {
				uni.navigateTo({
					url: '/pages/RefundSchedule/RefundSchedule?id=' + id,
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			shanchu: function(id) {
				uniRequest.post('/QianYi_Shop/updateShopOrderStatus?id=' + id + '&status=-3').then(res => {
					console.log(res)
					if (res.data.isSuc == true) {
						uni.showToast({
							title: '删除成功',
							icon: 'success'
						})
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
					this.onLoad()

				}).catch(e => {
					console.log(e)
				})
			},
			quxiao: function(id) {
				uniRequest.post('/QianYi_Shop/updateShopOrderStatus?id=' + id + '&status=-1').then(res => {
					console.log(res)
					if (res.data.isSuc == true) {
						uni.showToast({
							title: '取消订单成功',
							icon: 'success'
						})
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
					this.onLoad()

				}).catch(e => {
					console.log(e)
				})
			},
			sure: function(id) {
				uniRequest.post('/QianYi_Shop/updateShopOrderStatus?id=' + id + '&status=2').then(res => {
					console.log(res)
					if (res.data.isSuc == true) {
						uni.showToast({
							title: '确认收货成功',
							icon: 'success'
						})
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
					this.onLoad()

				}).catch(e => {
					console.log(e)
				})
			},
			kuaidi: function(id) {
				uni.navigateTo({
					url: '/pages/kuaidi/kuaidi?id=' + id,
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			tuikuan: function(id, index) {
				console.log(index)
				console.log(this.navList[0].orderList)
				uni.navigateTo({
					url: '/pages/refund/refund?id=' + index + '&goods=' + JSON.stringify(this.navList[0].orderList[index].orderGoodsList) +
						'&price=' + this.navList[0].orderList[index].realTotalMoney + '&yun=' + this.navList[0].orderList[index].deliverMoney + '&status=' + this.navList[0].orderList[
							index].orderStatus + '&id1=' + id,
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
		}

	}
</script>

<style>
	.whole {
		background: rgba(242, 242, 242, 1);
		width: 100%;
	}

	.bj {
		background: #fff;
		margin-top: 20rpx;
		width: 100%;

	}

	.contain {
		width: 90%;
		margin: 0 auto;
		overflow: auto;
	}

	.swiper {
		width: 100%;
		/* overflow: hidden; */

	}

	.swiper-tab {
		width: 180%;
		position: relative;


	}

	.nav-item {

		font-size: 25rpx;
		color: #333;
		float: left;
		margin-right: 57rpx;

	}

	.current {

		display: inline-block;
		font-size: 36rpx;
		color: #1a1a1a;
		border-bottom: 5rpx solid rgba(61, 179, 163, 1);
		box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(144, 240, 169, 0.5);



	}

	swiper {
		text-align: center;
		/* height: 3300rpx; */
	}

	.techan {
		width: 100%;
		height: 100%;
		/* position: relative; */
		margin-top: 20rpx;

	}

	.techan .tp {
		width: 48rpx;
		height: 48rpx;
		float: left;

	}

	.techan text {
		font-size: 28rpx;

		color: rgba(26, 26, 26, 1);
		float: left;
		margin-left: 11rpx;
	}

	.techan .ck {
		width: 10rpx;
		height: 20rpx;
		float: left;
		margin-left: 20rpx;
		margin-top: 14rpx;

	}

	.techan .right {

		height: 23rpx;
		float: right;
	}

	.techan .right>text {
		font-size: 24rpx;

		color: #f53131;
	}

	.techan>.list {
		width: 100%;
		height: 100%;
		padding-top: 50rpx;
		/* box-sizing: border-box; */
		margin-bottom: 20rpx;
		position: relative;
	}

	.intop {
		width: 100%;
		height: 100%;
	}

	.techan>.list .In {
		width: 100%;
		height: 100%;
	}

	.techan>.list image {
		width: 148rpx;
		height: 148rpx;
		float: left;
		margin-top: 16rpx;
		clear: both
	}

	.techan>.list .right1 {
		width: 380rpx;
		height: 100%;
		float: left;
		text-align: left;
		margin-left: 24rpx;
		/* clear: both */
		position: relative;
		top: 8rpx;
	}

	.techan>.list .right1>.title {
		font-size: 24rpx;
		color: #1a1a1a;

	}

	.techan>.list .right1>.com {
		font-size: 22rpx;
		color: #999;
		display: block;
	}

	.techan>.list .right2 {
		width: 100rpx;
		height: 100%;
		float: right;
		position: relative
	}

	.techan>.list .right2>.num1 {
		font-size: 24rpx;
		display: block;

		color: rgba(245, 49, 49, 1);
		float: right;
		margin-top: 16rpx;
		height: 40rpx;


	}

	.techan>.list .right2>.num2 {
		font-size: 24rpx;
		display: block;
		float: right;
		color: rgba(102, 102, 102, 1);
		/* margin-top: ; */
		position: absolute;
		right: 0;
		top: 40rpx
	}

	.techan>.list .all {
		font-size: 24rpx;
		width: 40%;
		height: 60rpx;
		color: rgba(26, 26, 26, 1);
		margin-top: 20rpx;
		float: right;

	}

	.techan>.list .btn {
		width: 89%;
		height: 58rpx;
		padding-top: 20rpx;
		float: right;
		position: relative;
		top: -50rpx;

		z-index: 999;

	}

	.techan>.list .btn>button {
		width: 178rpx;
		height: 58rpx;
		border: 2rpx solid rgba(102, 102, 102, 1);
		border-radius: 29rpx;
		float: right;
		line-height: 58rpx;
		text-align: center;
		font-size: 28rpx;

		color: rgba(26, 26, 26, 1);
	}

	.techan>.list .btn>.etc {
		border: 2rpx solid rgba(245, 49, 49, 1);
		color: rgba(245, 49, 49, 1);
		/* margin-right: 20rpx; */
	}

	.jindian {
		width: 100%;
		height: 408rpx;
		position: relative;
		margin-top: 50rpx;

	}

	.jindian>.tp {
		width: 48rpx;
		height: 48rpx;
		float: left;

	}

	.jindian>text {
		font-size: 28rpx;

		color: rgba(26, 26, 26, 1);
		float: left;
		margin-left: 11rpx;
	}

	.jindian>.ck {
		width: 10rpx;
		height: 20rpx;
		float: left;
		margin-left: 27rpx;
		margin-top: 20rpx;

	}

	.jindian>.right {

		height: 23rpx;
		float: right;
	}

	.jindian>.right>text {
		font-size: 24rpx;

		color: #f53131;
	}

	.jindian>.list {
		width: 100%;
		height: 188rpx;
		padding-top: 50rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;
	}

	.jindian>.list image {
		width: 148rpx;
		height: 148rpx;
		float: left;
		margin-top: 16rpx;

	}

	.jindian>.list .right1 {
		width: 360rpx;
		height: 100%;
		float: left;
		margin-left: 24rpx;
		position: relative;
		top: 8rpx;
	}

	.jindian>.list .right1>.title {
		font-size: 24rpx;
		color: #1a1a1a;

	}

	.jindian>.list .right1>.com {
		font-size: 22rpx;
		color: #999;
		display: block;


	}

	.jindian>.list .right2 {
		width: 100rpx;
		height: 100%;
		float: right;
	}

	.jindian>.list .right2>.num1 {
		font-size: 24rpx;
		display: block;

		color: rgba(245, 49, 49, 1);
		float: right;
		margin-top: 16rpx;

	}

	.jindian>.list .right2>.num2 {
		font-size: 24rpx;
		display: block;
		float: right;
		color: rgba(102, 102, 102, 1);


	}

	.jindian>.list .all {
		font-size: 24rpx;

		color: rgba(26, 26, 26, 1);
		margin-top: 20rpx;
		float: right;

	}

	.jindian>.list .btn {
		width: 59%;
		height: 58rpx;
		padding-top: 70rpx;
		position: absolute;
		bottom: 0rpx;
		right: 0rpx;

	}

	.jindian>.list .btn>button {
		width: 178rpx;
		height: 58rpx;
		border: 2rpx solid rgba(102, 102, 102, 1);
		border-radius: 29rpx;
		float: right;
		line-height: 58rpx;
		text-align: center;
		font-size: 28rpx;

		color: rgba(26, 26, 26, 1);
	}

	.jindian>.list .btn>.etc {
		border: 2rpx solid rgba(245, 49, 49, 1);
		color: rgba(245, 49, 49, 1);
		margin-right: 20rpx;
	}
</style>
