<template>
	<view class="contain">
		<form @submit='searchSubmitFn'>
			<image class='sousuo' src='../../static/image/sousuo01@2x.png'></image>
			<input placeholder='搜索你心仪的景点' @confirm="show" :value="searchValue" formType='submit' :focus='fou'></input>
		</form>
		<view class="hide" v-if="com">
			<view class="his">
				<text>历史记录</text>
				<image src="../../static/image/shanchu@2x.png" @click="del"></image>
			</view>
			<view class="jilu">
				<button v-for="(item,index) in pecode" :key="index">
					{{item.value}}
				</button>
			</view>
			<text class="etc">热门搜索</text>
			<view class="hot">
				<button v-for="(item,index) in hot" @click="remen(item.content)" :key="index">
					{{item.content}}
					<image src="../../static/image/huoyan@2x.png"></image>
				</button>
			</view>
		</view>
		<view class="hide1" v-if="!com">
			<view class='list' v-for="(item,index) in goodsList" :key="index" @click="detail(item.id)" v-if="goodsList!==null">
				<image :src='qiniu+item.pictureCover'></image>
				<view class='right'>
					<text class='title'>{{item.scenicName}}</text>
					<view class='fw'>自然风光</view>
					<view class='fen'>
						<image src='../../static/image/pingfen01@2x.png' v-for="(item,index) in item.score" :key="index"></image>
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
			<view class="list1" v-if="goodsList.length==0">
				<image src="http://dev.static.qianyipan.com/image/jpg/wuneirong@2x.png"></image>

			</view>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {
		data() {
			return {
				com: true,
				hot: [],
				goodsList: [],
				inputVal: '',
				pecode: [],
				fou: true
			}
		},
		onLoad(options) {
			var that = this

			var val = options.value
			console.log(options.jing)

			this.searchValue = val

			var jing = options.jing
			var wei = options.wei

			this.jing = jing
			this.wei = wei

			uniRequest.post('/QianYi/selectHomeTopSearch?type=2&page=1').then(res => {
				console.log(res)

				this.hot = res.data.data.hotSearchList



			}).catch(e => {
				console.log(e)
			})
			this.openHistorySearch()
		},
		methods: {
			remen: function(item) {

				this.searchValue = item
				this.com = false

				var userId = uni.getStorageSync('user').loginId || 0

				uniRequest.post('/QianYi/selectHomeSearchBykeyword?keyword=' + item + '&type=2&page=1&userId=' + userId +
					'&longitude=' + this.jing + '&latitude=' + this.wei).then(res => {
					console.log(res)

					this.goodsList = res.data.data.scenicList



				}).catch(e => {
					console.log(e)
				})
			},
			detail: function(id) {
				uni.navigateTo({
					url: '/pages/SpecialDetail/SpecialDetail?id=' + id,
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			openHistorySearch: function() {

				this.pecode = uni.getStorageSync('pecode') || [] //若无储存则为空

			},
			del: function() {
				uni.clearStorageSync('searhRecord')

				this.pecode = []

				// this.onLoad()
				console.log('111')
			},
			show: function(e) {

				this.com = false

				var userId = uni.getStorageSync('user').loginId || 0

				uniRequest.post('/QianYi/selectHomeSearchBykeyword?keyword=' + e.detail.value + '&type=2&page=1&userId=' + userId +
					'&longitude=' + this.jing + '&latitude=' + this.wei).then(res => {
					console.log(res.data.data.scenicList)
					this.goodsList = res.data.data.scenicList

					console.log(this.goodsList)

				}).catch(e => {
					console.log(e)
				})
				var that = this
				var inputVal = e.detail.value
				var pecode = this.pecode
				if (inputVal == '') {
					//输入为空时的处理
				} else {
					//将搜索值放入历史记录中,只能放前五条
					if (pecode.length < 5) {
						pecode.unshift({
							value: inputVal,
							id: pecode.length
						})
					} else {
						pecode.pop() //删掉旧的时间最早的第一条
						pecode.unshift({
							value: inputVal,
							id: pecode.length
						})
					}
					//将历史记录数组整体储存到缓存中
					uni.setStorageSync('pecode', pecode)
				}




			}
		}

	}
</script>

<style>
	/* pages/sousuo1/sousuo1.wxss */
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

	.contain .sousuo {
		width: 28rpx;
		height: 28rpx;
		position: absolute;
		top: 18rpx;
		left: 28rpx;
	}

	.hot {
		width: 100%;
		height: auto;
	}

	.his {
		width: 100%;
		height: 40rpx;
		margin-top: 30rpx;
	}

	.his>text {
		float: left;
		font-size: 32rpx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(26, 26, 26, 1);
	}

	.his>image {
		width: 36rpx;
		height: 36rpx;
		float: right;
		position: relative;
		z-index: 99999999999999999999999999;
	}

	.hot>button,
	.jilu>button {
		background: rgba(242, 242, 242, 1);
		border-radius: 10rpx;
		padding: 19rpx;
		font-size: 28rpx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		text-align: center;
		float: left;
		margin-left: 24rpx;

	}

	.etc {
		margin-top: 180rpx;
	}

	.contain>.hide text {
		display: block;
		font-size: 32rpx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(26, 26, 26, 1);
	}

	.jilu {
		margin-top: 40rpx;
		width: 100%;
		height: auto;
	}

	button {
		background: rgba(242, 242, 242, 1);
		border-radius: 10rpx;
		padding: 19rpx;
		font-size: 28rpx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		text-align: center;
		float: left;
		margin-left: 24rpx;
		margin-top: 20rpx;

	}

	button>image {
		width: 30rpx;
		height: 30rpx;
		margin-left: 10rpx;
	}

	.hide1 {
		padding-top: 64rpx;
		box-sizing: border-box;
	}

	.list {
		width: 100%;
		height: 196rpx;

		margin-bottom: 60rpx;
		box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.1);

	}

	.list1 {
		width: 100%;
		height: 100%;
		box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.1);


	}

	.list>image {
		width: 248rpx;
		height: 196rpx;
		border-radius: 10px;

	}

	.list>.right {
		width: 430rpx;
		height: 100%;
		float: right;

	}

	.list>.right>.title {
		font-size: 32rpx;

		color: rgba(26, 26, 26, 1);

	}

	.list>.right>.fw {
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
