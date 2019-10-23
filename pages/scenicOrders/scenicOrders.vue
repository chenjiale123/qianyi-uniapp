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
	        <view class="contain">
	          <view class='techan'>
	            <image src='../../static/image/Thestoreicon@2x.png' class='tp'></image>
	            <text>景点</text>
	            <image src='../../static/image/fanhui@2x.png' class='ck'></image>
	            <view class='right'>
	              <text>{{item.orderStatus}} </text>
	            </view>
	            <view class='list'>
	              <view class="intop" @click="jdDetail(item.id)"  v-if="item.orderStatus!=='待支付'">
	                <view class="In">
	                  <image :src='qiniu+item.scenicSpotWithBLOBs.pictureCover'></image>
	                  <view class='right1'>
	                    <text class='title'>{{item.scenicSpotWithBLOBs.scenicName}}</text>
	                    <text class='com'>使用时间：当地时间{{item.scenicSpotWithBLOBs.createDate}}</text>
	                  </view>
	                  <view class='right2'>
	                    <text class='num1'>{{item.scenicSpotWithBLOBs.ticketPrice}}</text>
	                    <text class='num2'>x{{item.ticketNum}}</text>
	                  </view>
	                </view>
	                <text class='all'>合计：￥{{item.price}} </text>
	        
	              </view>
	              <view class="intop" @click="zhifu(item.id)" v-if="item.orderStatus=='待支付'" >
	                <view class="In">
	                  <image :src='qiniu+item.scenicSpotWithBLOBs.pictureCover'></image>
	                  <view class='right1'>
	                    <text class='title'>{{item.scenicSpotWithBLOBs.scenicName}}</text>
	                    <text class='com'>使用时间：当地时间{{item.scenicSpotWithBLOBs.createDate}}</text>
	                  </view>
	                  <view class='right2'>
	                    <text class='num1'>{{item.scenicSpotWithBLOBs.ticketPrice}}</text>
	                    <text class='num2'>x{{item.ticketNum}}</text>
	                  </view>
	                </view>
	                <text class='all'>合计：￥{{item.price}} </text>
	        
	              </view>
	              <view class='btn' v-if="item.orderStatus=='待支付'">
	                <button  @click="quxiao(item.id)"> 取消订单</button>
	                <button class='etc'>支付</button>
	              </view>
	              <view class='btn' v-if="item.orderStatus=='用户取消'">
	                <button @click="shanchu(item.id)" >删除订单</button>
	                <button class='etc'>再次购买</button>
	              </view>
	              <view class='btn' v-if="item.orderStatus=='待评价'">
	                <button @click="tuikuan(index,item.id)" >退款</button>
	              </view>
	              <view class='btn' v-if="item.orderStatus=='退款中'">
	                <button class='etc' @click="jindu(item.id)" >退款进度</button>
	              </view>
	              <view class='btn' v-if="item.orderStatus=='未使用'">
	                <button @click="tuikuan(index,item.id)"  class='etc' >退款</button>
	        
	              </view>
	        
	            </view>
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
					}

				],
				leng: ''
			}
		},

		onLoad() {
			var that = this

			var userId = uni.getStorageSync('user').loginId || 0

			uniRequest.post('/QianYi/selectScenicOrder?creatorId=' + userId + '&orderStauts=0&page=1').then(res => {
				console.log(res)
				for (var i = 0; i < res.data.data.scenicOrderParamList.length; i++) {
					var item = res.data.data.scenicOrderParamList[i];
					if (item.orderStatus == 1) {
						item.orderStatus = "待支付";
					}

					if (item.orderStatus == 3) {
						item.orderStatus = "待评价";
					}
					if (item.orderStatus == 5) {
						item.orderStatus = "退款中";
					}
					if (item.orderStatus == 4) {
						item.orderStatus = "未使用";
					}

					if (item.orderStatus == 2) {
						item.orderStatus = "用户取消";
					}

				}


				this.navList[0].orderList = res.data.data.scenicOrderParamList
				this.leng = res.data.data.scenicOrderParamList.length


			}).catch(e => {
				console.log(e)
			})
			var userId = uni.getStorageSync('user').loginId || 0

			uniRequest.post('/QianYi/selectScenicOrder?creatorId=' + userId + '&orderStauts=1&page=1').then(res => {
				console.log(res)
				for (var i = 0; i < res.data.data.scenicOrderParamList.length; i++) {
						var item = res.data.data.scenicOrderParamList[i];
					if (item.orderStatus == 1) {
						item.orderStatus = "待支付";
					}

					if (item.orderStatus == 3) {
						item.orderStatus = "待评价";
					}
					if (item.orderStatus == 5) {
						item.orderStatus = "退款中";
					}
					if (item.orderStatus == 4) {
						item.orderStatus = "未使用";
					}

					if (item.orderStatus == 2) {
						item.orderStatus = "用户取消";
					}

				}
				this.navList[1].orderList = res.data.data.scenicOrderParamList






			}).catch(e => {
				console.log(e)
			})
			uniRequest.post('/QianYi/selectScenicOrder?creatorId=' + userId + '&orderStauts=3&page=1').then(res => {
				console.log(res)
				for (var i = 0; i < res.data.data.scenicOrderParamList.length; i++) {
						var item = res.data.data.scenicOrderParamList[i];
					if (item.orderStatus == 1) {
						item.orderStatus = "待支付";
					}

					if (item.orderStatus == 3) {
						item.orderStatus = "待评价";
					}
					if (item.orderStatus == 5) {
						item.orderStatus = "退款中";
					}
					if (item.orderStatus == 4) {
						item.orderStatus = "未使用";
					}

					if (item.orderStatus == 2) {
						item.orderStatus = "用户取消";
					}

				}
				this.navList[2].orderList = res.data.data.scenicOrderParamList






			}).catch(e => {
				console.log(e)
			})
			uniRequest.post('/QianYi/selectScenicOrder?creatorId=' + userId + '&orderStauts=4&page=1').then(res => {
				console.log(res)
				for (var i = 0; i < res.data.data.scenicOrderParamList.length; i++) {
						var item = res.data.data.scenicOrderParamList[i];
					if (item.orderStatus == 1) {
						item.orderStatus = "待支付";
					}

					if (item.orderStatus == 3) {
						item.orderStatus = "待评价";
					}
					if (item.orderStatus == 5) {
						item.orderStatus = "退款中";
					}
					if (item.orderStatus == 4) {
						item.orderStatus = "未使用";
					}

					if (item.orderStatus == 2) {
						item.orderStatus = "用户取消";
					}

				}
				this.navList[3].orderList = res.data.data.scenicOrderParamList






			}).catch(e => {
				console.log(e)
			})
			uniRequest.post('/QianYi/selectScenicOrder?creatorId=' + userId + '&orderStauts=5&page=1').then(res => {
				console.log(res)
				for (var i = 0; i < res.data.data.scenicOrderParamList.length; i++) {
						var item = res.data.data.scenicOrderParamList[i];
					if (item.orderStatus == 1) {
						item.orderStatus = "待支付";
					}

					if (item.orderStatus == 3) {
						item.orderStatus = "待评价";
					}
					if (item.orderStatus == 5) {
						item.orderStatus = "退款中";
					}
					if (item.orderStatus == 4) {
						item.orderStatus = "未使用";
					}

					if (item.orderStatus == 2) {
						item.orderStatus = "用户取消";
					}

				}
				this.navList[4].orderList = res.data.data.scenicOrderParamList





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
				console.log(index)
			}
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
		/* margin-top: 20rpx; */
		width: 100%;
		overflow: hidden;
		margin-bottom: 20upx;

	}

	.bj1 {
		background: #fff;
		margin-top: 20rpx;
		width: 100%;
		height: 368rpx
	}

	.contain {
		width: 90%;
		margin: 0 auto;

	}

	.swiper {
		width: 100%;
		overflow: hidden;

	}

	.swiper-tab {
		height: 50rpx;
		width: 120%;
		position: relative;
		background: #fff;


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
		height: 3300rpx;
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
		margin-top: 8rpx;
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
		margin-top: 100rpx;
		float: right;

	}

	.techan>.list .btn {
		width: 90%;
		height: 58rpx;
		/* padding-top: 20rpx; */
		float: right;


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

	.jindian>.list>image {
		width: 148rpx;
		height: 148rpx;
		float: left;
		margin-top: 16rpx;

	}

	.jindian>.list>.right1 {
		width: 360rpx;
		height: 100%;
		float: left;
		margin-left: 24rpx;
	}

	.jindian>.list>.right1>.title {
		font-size: 24rpx;
		color: #1a1a1a;

	}

	.jindian>.list>.right1>.com {
		font-size: 22rpx;
		color: #999;
		display: block;


	}

	.jindian>.list>.right2 {
		width: 100rpx;
		height: 100%;
		float: right;
	}

	.jindian>.list>.right2>.num1 {
		font-size: 24rpx;
		display: block;

		color: rgba(245, 49, 49, 1);
		float: right;
		margin-top: 16rpx;

	}

	.jindian>.list>.right2>.num2 {
		font-size: 24rpx;
		display: block;
		float: right;
		color: rgba(102, 102, 102, 1);


	}

	.jindian>.all {
		font-size: 24rpx;

		color: rgba(26, 26, 26, 1);
		margin-top: 20rpx;
		float: right;

	}

	.jindian>.btn {
		width: 59%;
		height: 58rpx;
		padding-top: 70rpx;
		position: absolute;
		bottom: 0rpx;
		right: 0rpx;

	}

	.jindian>.btn>button {
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

	.jindian>.btn>.etc {
		border: 2rpx solid rgba(245, 49, 49, 1);
		color: rgba(245, 49, 49, 1);
		margin-right: 20rpx;
	}
</style>
