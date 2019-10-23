<template>
	<view class="contain">

		<image src="../../static/image/xfzd.png" class="la" @click="top"></image>
		<view class='top'>


			<picker @change="changeCountry" :value="index1" :range="array">
				<!-- data-in="{{array[index1]}}" data-id="{{index1}}" -->
				<view class="picker">
					{{array[index1]}}
				</view>

			</picker>


			<image class='xiala' src='../../static/image/xiala@2x.png'></image>

			<image src='../../static/image/sousuo01@2x.png' class='sousuo'></image>
			<input placeholder='景点/门票' @focus="sousuo1"></input>

		</view>
		<view class="dd">
			<view class="biaoqian">
				热门标签:
				<text v-for="(item,index) in list" :key="index" @click="cleck(item.scenicName)">{{item.scenicName}}</text>
				<!-- <text>三叠泉</text>
	    <text>西海温泉</text> -->
			</view>
		</view>
		<view class='icon'>
			<view @click="fg">
				<image src='../../static/image/ziran@2x.png'></image>
				<text>自然风光</text>
			</view>
			<view @click="wq">
				<image src='../../static/image/wenquan@2x.png'></image>
				<text>温泉</text>
			</view>
			<view @click="ms">
				<image src='../../static/image/guji@2x.png'></image>
				<text>名胜古迹</text>
			</view>
			<view @click="ylc">
				<image src='../../static/image/youlechang@2x.png'></image>
				<text>公园游乐场</text>
			</view>
			<view @click="zjy">
				<image src='../../static/image/zijia@2x.png'></image>
				<text>自驾出游</text>
			</view>
		</view>

		<view class='show'>
			<image src='../../static/image/yuanquan@2x.png'></image>
			<text>为你优选</text>
			<view class='right' @click="change">
				<image src='../../static/image/huanyipi@2x.png'></image>
				<text>换一批</text>
			</view>
			<view class='list' v-for="(item,index) in jindian" :key="index" @click="detail(item.id)" v-if='jindian!=null&&find'>
				<image :src='qiniu+item.pictureCover'></image>
				<view class='right'>
					<view class="xiu">
						<text class='title'>{{item.scenicName}}</text>
						<view class='fw'>自然风光</view>
					</view>

					<view class='fen'>
						<image src='../../static/image/pingfen01@2x.png' ></image>
                        <!--  v-for="(item,index) in item.score" :key="index" -->
						<text class='pinfen'>{{item.score}}分</text>
					</view>

					<view class='intro'>
						<text>{{item.distance/1000}}km</text>
						<text>{{item.city}}</text>
					</view>
					<view class='price' @click='price'>
						<text class='small'>￥</text>
						<text class='big'>{{item.ticketPrice}}</text>
					</view>
					<text class='ka'>随买随用</text>
				</view>
			</view>
			<view class='list' v-for="(item,index) in goodsList1" :key="index" @click="detail(item.id)" v-if="!find">
				<image :src='qiniu+item.pictureCover'></image>
				<view class='right'>
					<view class="xiu">
						<text class='title'>{{item.scenicName}}</text>
						<view class='fw'>自然风光</view>
					</view>
					<view class='fen'>
						<image src='../../static/image/pingfen01@2x.png' v-for="(item,index) in item.score" :key="index"  ></image>
						<!-- v-for="(item,index) in item.score" :key="index" -->
						<text class='pinfen'>{{item.score}}分</text>
					</view>

					<view class='intro'>
						<text>{{item.distance/1000}}km</text>
						<text>{{item.city}}</text>
					</view>
					<view class='price' @click='price'>
						<text class='small'>￥</text>
						<text class='big'>{{item.ticketPrice}}</text>
					</view>
					<text class='ka'>随买随用</text>
				</view>
			</view>
			<view class="list1" v-if="jindian==null">
				<image src="../../static/image/screening@2x.png"></image>
			</view>
		</view>

	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {

		data() {
			return {
				latitude: "",
				
				longitude: "",
				img: '',
				jindian: [],
				array: ['南昌', '九江', '上饶', '抚州', '宜春', '吉安', '赣州', '景德镇', '萍乡', '新余', '鹰潭'],
				index: 0,
				index1: 0,
				find: true,
				page: 1,
				list: [],
				goodsList1: []
			}
		},

		onLoad() {
			var that = this

			uniRequest.get('/QianYi/selectHotLabels?page=1').then(res => {


				this.list = res.data.data.scenicList

				
				for(let i=0;i<=this.list.length-1;i++){
					console.log(this.list[i].score)
					for(let j=0;j<=this.list[i].score;j++){
						
					}
					
				}

			}).catch(e => {
				console.log(e)
			})

			uni.getLocation({
				type: 'wgs84',
				success: (res) => {
					var latitude = res.latitude
					var longitude = res.longitude
					var speed = res.speed
					var accuracy = res.accuracy

					this.latitude = res.latitude,
						this.longitude = res.longitude

					// uni.showModal({
					//   title: '当前位置',
					//   content: '经度' + res.latitude + '纬度' + res.longitude,
					// })
					console.log(res.longitude)
					uniRequest.post('/QianYi/forYourChoice?city=南昌&page=1&startLonLat=' + res.longitude + ',' + res.latitude).then(
						res => {
							console.log(res)


							this.jindian = res.data.data.scenicList



						}).catch(e => {
						console.log(e)
					})
				}

			})



		},

		methods: {
			change: function() {
				var that = this

				this.page = that.page + 1

				uniRequest.post('/QianYi/forYourChoice?city=' + that.array[that.index1] + '&page=' + that.page + '&startLonLat=' +
					that.longitude + ',' + that.latitude).then(res => {
					console.log(res)

					this.jindian = res.data.data.scenicList
					// img: res.data.scenicList.pictureUrl.split(',')[0]


				}).catch(e => {
					console.log(e)
				})




			},
			top: function() {
				uni.pageScrollTo({
					scrollTop: 0
				})
			},
			cleck: function(id) {

				this.find = false

				var userId = uni.getStorageSync('user').loginId || 0

				uniRequest.post('/QianYi/selectHomeSearchBykeyword?keyword=' + id + '&type=2&page=1&userId=' + userId +
					'&longitude=' + this.longitude + '&latitude=' + this.latitude).then(res => {
					console.log(res)



					this.goodsList1 = res.data.data.scenicList
					// img: res.data.scenicList.pictureUrl.split(',')[0]



				}).catch(e => {
					console.log(e)
				})
			},
			fg: function() {
				uni.navigateTo({
					url: '/pages/listSC/listSC?id=1&city=' + this.array[this.index1] + '&page=1&startLonLat=' + this.longitude +
						',' + this.latitude,
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			wq: function() {
				uni.navigateTo({
					url: '/pages/listSC/listSC?id=2&city=' + this.array[this.index1] + '&page=1&startLonLat=' + this.longitude +
						',' + this.latitude,
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			ms: function() {
				uni.navigateTo({
					url: '/pages/listSC/listSC?id=3&city=' + this.array[this.index1] + '&page=1&startLonLat=' + this.longitude +
						',' + this.latitude,
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			ylc: function() {
				uni.navigateTo({
					url: '/pages/listSC/listSC?id=4&city=' + this.array[this.index1] + '&page=1&startLonLat=' + this.longitude +
						',' + this.latitude,
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			zjy: function() {
				uni.navigateTo({
					url: '/pages/listSC/listSC?id=5&city=' + this.array[this.index1] + '&page=1&startLonLat=' + this.longitude +
						',' + this.latitude,
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			price: function() {
				uni.navigateTo({
					url: '/pages/tictorPrice/tictorPrice',
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			detail: function(id) {
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
						url: '/pages/SpecialDetail/SpecialDetail?id=' + id,
						success: function(res) {},
						fail: function(res) {},
						complete: function(res) {},
					})
				}
			},
			sousuo1: function(e) {
				uni.navigateTo({
					url: '/pages/searchS/searchS?jing=' + this.longitude + '&wei=' + this.latitude,
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			/**
			 * 生命周期函数--监听页面加载
			 */
			changeCountry: function(e) {
	
				var that = this
				that.index1 = e.detail.value
				that.find = true
				uniRequest.post('/QianYi/forYourChoice?city=' + that.array[that.index1] + '&page=1&startLonLat=' + that.longitude +
					',' + that.latitude).then(res => {
					if (res.data.isSuc == true) {
						that.jindian = res.data.data.scenicList
						console.log(that.jindian)
						
					} else {
						that.jindian = null
					}

				}).catch(e => {
					console.log(e)
				})
			}
		}

	}
</script>

<style>
	.contain {
		width: 90%;
		margin: 0 auto;
		position: relative
	}

	.contain>.la {
		width: 114rpx;
		height: 114rpx;
		position: fixed;
		bottom: 100rpx;
		z-index: 999999;
		right: 0
	}

	.top {
		width: 100%;
		height: 66rpx;
		position: relative;

	}

	picker {
		width: 110rpx;
		height: 100%;
		float: left;

		font-size: 28rpx;

		color: rgba(51, 51, 51, 1);
		text-align: center;
		position: absolute;
		left: 0;
		/* border-right: 1px solid #d9d9d9; */
		line-height: 66rpx;
		z-index: 9999;

	}

	.xiala {
		width: 20rpx;
		height: 10rpx;
		position: absolute;
		left: 90rpx;
		top: 28rpx;


	}

	input {
		width: 100%;
		height: 100%;
		float: right;
		background: rgba(242, 242, 242, 1);
		border-radius: 33rpx;
	}

	.sousuo {
		width: 28rpx;
		height: 28rpx;
		position: absolute;
		left: 192rpx;
		top: 20rpx;
	}

	input[placeholder] {
		font-size: 28rpx;
		color: #b3b3b3;
		padding-left: 234rpx;
		box-sizing: border-box;
	}

	.dd {
		width: 100%;
		height: 80rpx;
		overflow: auto;
	}

	.biaoqian {
		margin-top: 40rpx;
		color: #666;
		font-size: 28rpx;
		width: 500%;
		height: 80rpx
	}

	.biaoqian>text {
		width: 100rpx;
		height: 42rpx;
		border: 1px solid rgba(230, 230, 230, 1);
		border-radius: 10rpx;
		margin-right: 18rpx;

	}

	.icon {
		width: 100%;
		height: auto;
		margin-top: 60rpx;
	}

	.icon>view {
		width: 132rpx;
		height: 100rpx;
		float: left;
		text-align: center;
	}

	.icon>view>image {
		width: 86rpx;
		height: 86rpx;
	}

	.icon>view>text {

		text-align: center;
		font-size: 26rpx;
		display: block;
		color: rgba(51, 51, 51, 1);
	}

	.show {
		width: 100%;
		height: 1876rpx;
		position: relative;
		margin-top: 220rpx;
		padding-top: 60rpx;
		box-sizing: border-box;
	}

	.show>image {
		position: absolute;
		left: -30rpx;
		top: 0;
		width: 79rpx;
		height: 77rpx;

	}

	.show>text {

		font-size: 36rpx;

		color: rgba(26, 26, 26, 1);
		line-height: 34px;
		position: absolute;
		left: 0;
		top: 0
	}

	.show>.right {
		width: 120rpx;
		height: 27rpx;
		top: 0;
		right: 0;
		position: absolute
	}

	.show>.right>image {
		width: 26rpx;
		height: 26rpx;


	}

	.show>.right>text {

		font-size: 28rpx;

		color: rgba(153, 153, 153, 1);

	}

	.list {
		width: 100%;
		height: 224rpx;
		padding-top: 20rpx;
		box-sizing: border-box;
		margin-top: 24rpx;
		box-shadow: 0px 6rpx 12rpx 0px rgba(0, 0, 0, 0.1);
		border-radius: 10rpx;
	}

	.list>image {
		width: 248rpx;
		height: 100%;
		border-radius: 10rpx;

	}

	.list>.right {
		width: 400rpx;
		height: 100%;
		float: right;

	}

	.list>.right>.xiu {
		width: 100%;
		height: 50rpx;
		overflow: auto
	}

	.list>.right .title {
		font-size: 32rpx;

		color: rgba(26, 26, 26, 1);

	}

	.list>.right .fw {


		width: 100rpx;
		height: 30rpx;
		background: rgba(235, 252, 227, 1);
		border-radius: 6rpx;
		font-size: 22rpx;

		color: rgba(93, 191, 57, 1);
		text-align: center;
		display: inline-block;
		margin-left: 17rpx;

	}

	.list>.right>.fen>image {
		width: 26rpx;
		height: 26rpx;

	}

	.list>.right>.fen>.pinfen {

		font-size: 24rpx;

		color: rgba(255, 127, 102, 1);

	}

	.list>.right>.intro>text {

		font-size: 24rpx;

		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		margin-right: 30rpx;

	}

	.list>.right>.price {
		display: inline-block;
	}

	.list>.right>.price>.small {
		font-size: 24rpx;
		color: rgba(245, 49, 49, 1);

	}

	.list>.right>.price>.big {
		font-size: 40rpx;
		color: rgba(245, 49, 49, 1);

	}

	.ka {
		width: 96rpx;
		height: 26rpx;
		border: 1px solid rgba(61, 178, 163, 1);
		border-radius: 6rpx;
		font-size: 20rpx;

		color: rgba(61, 178, 163, 1);
		text-align: center;
		line-height: 26rpx;
		margin-left: 12rpx;
		position: relative;
		top: -5rpx;


	}
</style>
