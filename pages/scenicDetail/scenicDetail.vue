<template>
	<view class="whole">
		<view class="cu" v-if="show2">
			<view class="kuang">
				<text>选择游玩日期</text>
				<image src="../../static/image/guanbi@2x.png" @click="close2"></image>
				<view class="kuangIn">
					<view class="price1">
						<view class="left">
							{{jin.scenicName}}
						</view>
						<view class="right">
							<!-- <text wx:if="{{date1=='8-22'}}">${{etcPrice}} /张</text>  -->
							<text v-if="tictor">￥{{tictor}} /张</text>
						</view>

					</view>
					<view class="btn">
						<button>
							{{date1}}
							<!-- <text wx:if="{{date1=='8-22'}}">${{etcPrice}}</text>  -->
							<text v-if="tictor">￥{{tictor}}</text>
							<image src="../../static/image/xuanzhk@2x.png"></image>
						</button>
					</view>
					<button @click="more">更多日期
						<image src="../../static/image/xiala@2x.png"></image>
					</button>

					<view class="date">
						<view class="yu-calendar">
							<view class="yu-calendar-header" :style="{background :bgColor,color:color}">
								<view class="header-left" @click="prevMonth()">PREV</view>
								<view class="header-center">{{year+'年'+selectMonth}}月</view>
								<view class="header-right" @click="nextMonth()">NEXT</view>
							</view>
							<view class="yu-calendar-week" :style="{background :bgColor,color:color}">
								<view class="list" v-for="(week,idx) in weeks" :key="idx">{{week}}</view>
							</view>
							<view class="yu-calendar-content">
								<view class="yu-calendar-day">
									<view class="list" v-for="(day,idx) in dayArr" :key="idx" @click="onClick(day,idx)">
										<view class="day" :style="{background :day.bgColor,color : day.color}" v-if="day.date != localDate">{{day.day}}</view>
										<view class="day" :style="{background :localColor,color:color}" v-else>{{day.day}}</view>
										<view class="price">￥{{day.price}}</view>
									</view>
									<view class="local-month">{{selectMonth}}</view>
								</view>
							</view>
						</view>

					</view>

				</view>
				<button @click="add">立即预订</button>
			</view>


		</view>
		<view class='lunbo'>
			<swiper>
				<swiper-item v-for="(item,index) in leng" :key="index">
					<image :src='qiniu+item'></image>
					<view class='num'>
						{{index+1}}/{{leng.length}}
					</view>
				</swiper-item>

			</swiper>

		</view>
		<view class='intro'>
			<image src='../../static/image/yuanquan@2x.png'></image>
			<view class='viewIn'>
				<view class='left'>
					<text>{{jin.scenicName}}</text>
					<view class='lt'>
						开放时间
						<text> {{jin.beginTime}}-{{jin.endTime}} </text>
						<text class='xiu'>开放中</text>
					</view>

				</view>
				<view class='right'>
					<text class='fen'>{{jin.score}}.0分</text>
					<view class='pj'>
						<!-- <text >612评价</text> -->
					</view>

				</view>
				<!-- <text class='jie'>望庐山瀑布中的飞流直下三千尺，疑是银河落九天原...</text> -->

				<view class='mian'>
					<view class='left'>
						<image src='../../static/image/mian@2x.png'></image>
						<text>限时抢购免费门票</text>
					</view>
					<view class='right'>
						<text>详情</text>
						<image src='../../static/image/gengduo1.png'></image>
					</view>
				</view>

				<view class='map'>
					<view class='left'>
						<image src='../../static/image/dizhi@2x.png'></image>
						<text>{{jin.locationName}}</text>
					</view>
					<view class='right' @click="map">
						<text>地图</text>
						<image src='../../static/image/gengduo1.png'></image>
					</view>
				</view>
			</view>




		</view>

		<view class="list1">
			<image src='../../static/image/yuanquan@2x.png'></image>
			<view class="listIn">
				<text class="title">门票</text>
				<view class="form" v-for="(item,index) in scenic" :key="index">
					<view class="left">
						<view class="top">{{item.ticketName}} <text v-if="item.ticketLabel==0">随买随卖</text>
							<text v-else>随时退</text>
						</view>
						<view class="down">
							￥{{item.ticketPrice}} <text>已售{{item.ticketSale}}</text>
						</view>
					</view>
					<view class="right">
						<button @click="yuding(index)">预订</button></view>
				</view>
			</view>
		</view>
		<view class='tab'>
			<view class='tabIn'>
				<view class="swiper-tab">
					<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }"
					 @click="tabClick(index)">
						{{ item.text }}
					</view>

				</view>


				<view class="list3" v-for="(item, index) in navList" :key="index" v-if="tabCurrentIndex === index">
					<view class='techan' v-for="(item,index) in item.orderList" :key="index">
						<u-parse :content="item"></u-parse>
						<!-- <text>{{item}}</text> -->
					</view>
				</view>

			</view>

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

	props: {
		priceList: { //价格日历数组
			type: [Array, Object],
			default: function() {
				return []
			}
		},
		bgColor: {
			type: String,
			default: function() {
				return '#f5f6f7'
			}
		},
		color: {
			type: String,
			default: function() {
				return '#000'
			}
		}
	},
		data() {
			return {
				date1:new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
				date: new Date(), //获取系统日期
				localDate: '', //当前日期
				selectMonth: '', //选择的月份
				localColor: '#3570cc', //今日的日期背景颜色
				weeks: ['日', '一', '二', '三', '四', '五', '六'],
				dayArr: [], //月份天数
				year: "", //当前选择的年
				month: "", //当前选择的月
				status: 1,
				tabCurrentIndex: 0,
				currentTab: 0,
				id1: '',
				dsc: '',
				src: '',
				jin: '',
				wei: '',
				show2: false,
				currentDate: "",
				dayList: '',
				currentDayList: '',
				currentObj: '',
				currentDay: '',
				currentClickKey: '',
				pr1: '',
				show: true,
				tictor: '',
				cli: true,
				maxMonth: 7, //最多渲染月数
				dateList: [],
				systemInfo: {},
				leng: '',
				etcPrice: "",
				mon: '',
				day1: '',
				tictor1: '',
				scenic: '',
				begin: new Date().getFullYear() +'-'+(new Date().getMonth() + 1) + '-' + new Date().getDate(),
               end: new Date().getFullYear() +'-'+(new Date().getMonth() + 2) + '-' + new Date().getDate(),
				navList: [{
						text: '游玩攻略',
						orderList: []
					},
					{

						text: '购票须知',
						orderList: []
					}
				],
				etc:[]
			}
		},

		onLoad(options) {

			var id = options.id

			this.id1 = id

			console.log(id)
			var userId = uni.getStorageSync('user').loginId || 0

			uniRequest.post('/QianYi/selectScenic?id=' + this.id1 + '&userId=' + userId).then(res => {
				var that = this
				console.log(res)
				// console.log(res.scenicTicketNums[that.data.index].ticketPrice)

				this.jin = res.data.data
				this.tictor = res.data.data.ticketPrice
				this.jing = res.data.data.locationCode.split(',')[0]
				this.wei = res.data.data.locationCode.split(',')[1]
				this.leng = res.data.data.pictureUrl.split(',')
				// this.dsc = res.data.data.playStrategy
				// this.src = res.data.data.ticketInformation
				this.scenic = res.data.data.scenicTicketNums
				this.sceId = res.data.data.id
				this.navList[0].orderList = [res.data.data.playStrategy]
				this.navList[1].orderList = [res.data.data.ticketInformation]





			}).catch(e => {
				console.log(e)
			})



		},
		onShow() {
			this.year = new Date().getFullYear();
			this.month = (new Date().getMonth()+1);
			this.initDate(this.year, this.month,this.tictor);

		},
		methods: {
			// 点击切换事件
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
				console.log('00')
			},


			more: function() {

				this.show = !this.show

			},
			yuding: function(index) {
				var that = this
				this.show2 = true
				this.index = index

				this.tictor = that.scenic[index].ticketPrice

				uniRequest.post('/QianYi/selectScenicPriceofcalender?ticketNumId=' + this.scenic[this.index].id + '&beginTime=' +
					this.begin + '&endTime=' + this.end).then(res => {
					var that = this
					if (res.data.isSuc == true) {

						console.log(res)

							this.etc = res.data.data.scenicPriceofcalenderList
							this.Time = res.data.data.scenicPriceofcalenderList[0].beginTime
							this.etcPrice = res.data.data.scenicPriceofcalenderList[0].activePrice
							

					} else {

						this.list1 = []

					}
					this.initDate(this.year, this.month,this.tictor);
				}).catch(e => {
					console.log(e)
				})
			},
			close2: function() {

				this.show2 = false

			},
			map: function() {
				uni.navigateTo({
					url: '/pages/map/map?jing=' + this.jing + '&wei=' + this.wei,
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			add: function() {
				console.log(this.pr1)
				if (this.tictor) {
					uni.navigateTo({
						url: '/pages/identity/identity?id=' + this.scenic[this.index].id + '&name=' + this.scenic[this.index].ticketName +
							'&price=' + this.tictor + '&time=' + this.date1 + "&sceId=" + this.sceId,
						success: function(res) {},
						fail: function(res) {},
						complete: function(res) {},
					})

				} else {
					uni.showToast({
						title: '请选择日期',
						icon: 'none',
						duration: 2000
					})
				}

			},
			initDate(year, month,price1) {
				var that=this
				let weekValue = '';
				let localYear = this.date.getFullYear();
				let localMonth = this.date.getMonth() + 1;
				let day = this.date.getDate();
				let totalDay = new Date(year, month + 1, 0).getDate();
				this.dayArr = [];
				this.selectMonth = this.month;
				this.localDate = this.formatNum(localYear) + '-' + this.formatNum(localMonth) + '-' + this.formatNum(day);
				for (let i = 1; i <= totalDay; i++) {
					let dayDate = this.formatNum(year) + '-' + this.formatNum(this.month ) + '-' + this.formatNum(i);
					let obj = {
						date: dayDate,
						day: i,
						price: price1,
						bgColor: 'none',
						color: '#000',
						status: 1
					}
					weekValue = (new Date(year, month, i)).getDay();
					if (i == 1 && weekValue != 0) {
						this.addBeforeValue(weekValue)
					}
					let index = this.priceList.findIndex((item) => {
						return item.date == dayDate
					})
					if (index >= 0) {
						obj.price = this.priceList[index].price;
					}

					this.dayArr.push(obj);
					if (i == totalDay && weekValue != 6) {
						this.addAfterValue(weekValue)
					}
				}
                 console.log(this.etc)
                console.log(this.dayArr)
				for (let i = 0; i <= this.etc.length - 1; i++) {
					for (let j = 0; j <= this.dayArr.length - 1; j++) {

						if (this.etc[i].beginTime == this.dayArr[j].date) {
							this.dayArr[j].price = this.etc[i].activePrice
						}
					}




				}
			},
			//补充前面空白日期
			addBeforeValue(weekValue) {
				let totalDay = new Date(this.year, this.month, 0).getDate();
				for (let i = 0; i < weekValue; i++) {
					let obj = {
						date: '',
						day: '',
						price: '',
						bgColor: 'none',
						color: '#ccc',
						status: 0
					}
					obj.day = totalDay - (weekValue - i) + 1;
					this.dayArr.push(obj);
				}
			},
			//补充后空白日期
			addAfterValue(weekValue) {
				let totalDay = new Date(this.year, this.month, 0).getDate();
				for (let i = 0; i < (6 - weekValue); i++) {
					let obj = {
						date: '',
						day: '',
						price: '',
						bgColor: 'none',
						color: '#ccc',
						status: 2
					}
					obj.day = i + 1;
					this.dayArr.push(obj);
				}
			},
			//日期时间的格式化
			formatNum(num) {
				return num < 10 ? '0' + num : num + '';
			},
			//上一个月
			prevMonth() {
				if (this.month == 0) {
					this.year -= 1;
					this.month = 11;
				} else {
					this.month -= 1
				}
				this.initDate(this.year, this.month,this.tictor)
			},
			//下一个月
			nextMonth() {
				if (this.month == 11) {
					this.year += 1;
					this.month = 0;
				} else {
					this.month += 1
				}
				this.initDate(this.year, this.month,this.tictor)
			},
			//输出
			onClick(obj, index) {
				//查询当天的日期下标
				let _this = this;
				let idx = _this.dayArr.findIndex((item) => {
					return item.date == _this.localDate
				})
				if (index === idx) {
					_this.localColor = _this.bgColor;
				} else {
					_this.localColor = '#d4e5ff';
				}
				if (_this.dayArr[index].status == 0) {
					_this.status = 0;
					_this.prevMonth();
					return;
				}
				if (_this.dayArr[index].status == 2) {
					_this.status = 2;
					_this.nextMonth()
					return;
				}
				if (_this.dayArr[index].status == 1) {
					_this.$nextTick(() => {
						_this.dayArr[index].bgColor = _this.bgColor
						_this.dayArr[index].color = _this.color
					})
					for (let i = 0; i < _this.dayArr.length; i++) {
						if (_this.dayArr[i].status == 1 && i != index) {
							_this.$nextTick(() => {
								_this.dayArr[i].bgColor = 'none'
								_this.dayArr[i].color = '#000'
							})
						}
					}
				}
				const dataObj = {
					date: obj.date,
					day: obj.day,
					price: obj.price
				}
				console.log(dataObj)
				this.tictor=dataObj.price
				this.date1=dataObj.date
			
			}

		}

	}
</script>

<style>
	@import url("@/components/u-parse/u-parse.css") page {
		width: 100%;
		height: 100%;
		background: rgba(242, 242, 242, 1);
	}

	.yu-calendar-header {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		padding: 12px 15px;
		background: #0086FF;
		color: #fff;
	}

	.yu-calendar-header .header-left {
		font-size: 14px;
	}

	.yu-calendar-header .header-center {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		font-size: 16px;
		font-weight: bold;
	}

	.yu-calendar-header .header-right {
		font-size: 14px;
	}

	.yu-calendar-week {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		background: #0086FF;
		color: #fff;
		padding: 0 5px;
	}

	.yu-calendar-week .list {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		font-size: 15px;
		line-height: 40px;
	}

	.yu-calendar-day {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		flex-wrap: wrap;
		padding: 20px 5px;
		position: relative;
	}

	.yu-calendar-day .list {
		width: 14.28%;
		height: 54px;
	}

	.yu-calendar-day .list .day {
		display: inline-block;
		width: 36px;
		height: 36px;
		line-height: 36px;
		border-radius: 18px;
		font-size: 16px;
	}

	.yu-calendar-day .list .price {
		font-size: 12px;
		line-height: 24px;
		height: 24px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #FF4040;
	}

	.yu-calendar-day .local-month {
		position: absolute;
		left: 50%;
		top: 50%;
		z-index: -1;
		font-size: 1px;
		width: 100px;
		height: 140px;
		margin-top: -70px;
		margin-left: -50px;
		text-align: center;
		color: #f5f6f7;
	}

	.whole {
		width: 100%;
		height: 100%;
		position: relative;



	}

	.whole>.lunbo {
		width: 100%;
		height: 424rpx;
		background: #fff
	}

	swiper {
		width: 100%;
		height: 3330rpx;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.lunbo image {
		width: 100%;
		height: 424rpx;
	}

	.swiper-item {
		position: relative;
	}

	.lunbo .num {
		position: absolute;
		width: 96rpx;
		height: 40rpx;
		background: rgba(0, 0, 0, 1);
		opacity: 0.5;
		border-radius: 20rpx 21rpx 0px 20rpx;
		top: 360rpx;
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
		width: 100%;
		height: 425rpx;
		position: relative;
		background: #fff;
		top: -20rpx;
		padding-top: 20rpx;
		box-sizing: border-box;
	}

	.viewIn {
		width: 90%;
		height: 100%;
		margin: 10px auto 0 auto;
		position: relative;
	}

	.intro>image {
		width: 75rpx;
		height: 90rpx;
		position: absolute;
		left: 0;
		top: 0
	}

	.list1 {
		width: 100%;
		height: auto;
		position: relative;
		background: #fff;
		top: -20rpx;
		padding-top: 20rpx;
		box-sizing: border-box;
	}

	.listIn {
		width: 90%;
		height: 100%;
		margin: 10px auto 0 auto;
		position: relative;
	}

	.list1>image {
		width: 75rpx;
		height: 90rpx;
		position: absolute;
		left: 0;
		top: 0
	}

	.listIn>text {
		display: block;
		font-size: 40rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.listIn>.form {
		width: 100%;
		height: 70rpx;
		margin-top: 50rpx;
	}

	.listIn>.form>.left {
		width: 70%;
		float: left;
		height: 100%
	}

	.listIn>.form>.right {
		width: 30%;
		float: right;
		height: 100%
	}

	.listIn>.form>.right>button {
		width: 128rpx;
		height: 48rpx;
		background: rgba(0, 221, 145, 1);
		border-radius: 24rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 48rpx;
		text-align: center;
		display: block;
		float: right;
		position: relative;
		top: 20rpx;
	}

	.listIn>.form>.left>.top {
		width: 100%;
		height: 45%;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.listIn>.form>.left>.top>text {
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
		top: -3rpx;
	}

	.listIn>.form>.left>.down {
		margin-top: 20rpx;
		width: 100%;
		height: 45%;
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 0, 0, 1);
	}

	.listIn>.form>.left>.down>text {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
	}

	.viewIn>.left {
		width: 490rpx;
		float: left
	}

	.viewIn>.left>text {
		font-size: 40rpx;
		font-weight: bold;
		color: rgba(26, 26, 26, 1);
	}

	.viewIn>.left>.lt {
		margin-top: 20rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: rgba(26, 26, 26, 1);
	}

	.viewIn>.left>.lt>text {
		color: #666;
		margin-left: 20rpx;
	}

	.viewIn>.left>.lt>.xiu {
		display: inline-block;
		width: 74rpx;
		height: 26rpx;
		background: rgba(229, 240, 255, 1);
		border-radius: 6rpx;
		font-size: 20rpx;
		font-weight: 500;
		color: rgba(86, 152, 245, 1);
		text-align: center;
		line-height: 26rpx;

	}

	.viewIn>.right {
		width: 130rpx;
		float: right;
	}

	.viewIn>.right>.fen {
		display: block;
		font-size: 40rpx;
		font-weight: bold;
		color: rgba(255, 127, 102, 1);
	}

	.viewIn>.right>.pj>text {

		font-size: 24rpx;
		font-weight: 500;
		color: rgba(255, 127, 102, 1);
	}

	.viewIn>.right>.pj>image {
		width: 20rpx;
		height: 20rpx;

	}

	.jie {
		display: block;
		mask-type: 30rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(179, 179, 179, 1);
	}

	.mian {
		height: 30rpx;

		width: 100%;
		position: absolute;
		top: 162rpx;
	}

	.map {
		height: 30rpx;
		position: absolute;
		top: 200rpx;
		margin-top: 72rpx;
		width: 100%;
	}

	.mian>.left {
		float: left;
	}

	.mian>.left>image {
		width: 26rpx;
		height: 26rpx;
	}

	.mian>.left>text {
		margin-left: 10rpx;
		font-size: 28rpx;
		font-weight: 500;
	}

	.mian>.right {
		float: right;
	}

	.mian>.right>text {
		font-size: 28rpx;
		font-weight: 500;
		color: #B3B3B3
	}

	.mian>.right>image {
		width: 20rpx;
		height: 20rpx;

	}

	.map>.left {
		float: left;
	}

	.map>.left>image {
		width: 26rpx;
		height: 26rpx;
	}

	.map>.left>text {
		margin-left: 10rpx;
		font-size: 28rpx;
		font-weight: 500;
	}

	.map>.right {
		float: right;
	}

	.map>.right>text {
		font-size: 28rpx;
		font-weight: 500;
		color: #B3B3B3
	}

	.map>.right>image {
		width: 20rpx;
		height: 20rpx;

	}

	.tab {
		width: 100%;
		height: auto;
		margin-top: 50rpx;
		background: #fff
	}

	.tabIn {
		width: 90%;
		margin: 0 auto;
		height: auto;
	}

	.swiper-tab {
		width: 340rpx;
		position: relative;
		margin: 0 auto;
		background: #fff;
		overflow: hidden;
	}

	/* .nav-item {
		overflow: auto !important;
		background: #fff;
		margin-top: 20rpx;


	} */

	.nav-item {

		font-size: 30rpx;
		color: #333;
		float: left;
		margin-right: 20rpx;

	}

	.bottom {
		height: auto;
	}

	.current {
		height: 34rpx;
		display: inline-block;
		font-size: 36rpx;
		color: #1a1a1a;
		border-bottom: 10rpx solid rgba(61, 179, 163, 1);
		box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(144, 240, 169, 0.5);



	}

	.content>text {
		font-size: 26rpx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		display: block;
		margin-bottom: 27rpx;
	}

	.content>.title {
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		display: block;

	}

	.content>image {
		height: 378rpx;
		width: 100%;
		margin-bottom: 27rpx;

	}

	.shou {
		width: 100rpx;
		margin: 0 auto;
		font-size: 26rpx;
		font-weight: 500;
		color: rgba(179, 179, 179, 1);
	}

	.shou>image {
		width: 20rpx;
		height: 20rpx;
		margin-left: 10rpx;
	}

	.tieshi {
		margin-top: 79rpx;
	}

	.tieshi>.title {
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		display: block;
		margin-bottom: 41rpx;
	}

	.tieshi>.a {
		margin-bottom: 16rpx;
		font-size: 28rpx;
		display: block;

		font-weight: 500;
		color: rgba(26, 26, 26, 1);
	}

	.tieshi>.b {
		display: block;

		margin-bottom: 16rpx;

		font-size: 28rpx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
	}

	.sheshi {
		margin-top: 79rpx;
	}

	.sheshi>text {
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		display: block;
		margin-bottom: 41rpx;

	}

	.sheshi>.left1 {
		width: 150rpx;
		float: left;
	}

	.sheshi>.left1>view {
		width: 100%;
		height: 30rpx;
		margin-bottom: 28rpx;
	}

	.sheshi>.left1>view>image {
		width: 22rpx;
		height: 22rpx;

	}

	.sheshi>.left1>view>text {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		margin-left: 16rpx;
	}

	.sheshi>.right1 {
		width: 150rpx;
		float: left;
		margin-left: 72rpx;
	}

	.sheshi>.right1>view {
		width: 100%;
		height: 30rpx;
		margin-bottom: 28rpx;
	}

	.sheshi>.right1>view>image {
		width: 22rpx;
		height: 22rpx;

	}

	.sheshi>.right1>view>text {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		margin-left: 16rpx;
	}

	.sheshi>.right2 {
		width: 150rpx;
		float: left;
		margin-left: 72rpx;

	}

	.sheshi>.right2>view {
		width: 100%;
		height: 30rpx;
		margin-bottom: 28rpx;
	}

	.sheshi>.right2>view>image {
		width: 22rpx;
		height: 22rpx;

	}

	.sheshi>.right2>view>text {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		margin-left: 16rpx;
	}

	.jiaotong {
		padding-top: 220rpx;
		box-sizing: border-box;

	}

	.jiaotong>text {
		display: block;
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		margin-bottom: 41rpx;
	}

	.jiaotong>view {
		width: 33.3%;
		float: left;
	}

	.jiaotong>view>image {
		width: 36rpx;
		height: 36rpx;
	}

	.jiaotong>view>text {
		margin-left: 15rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
	}

	.xinxi {
		padding-top: 120rpx;
		box-sizing: border-box;

	}

	.xinxi>text {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
	}

	.xinxi>.title {
		display: block;
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		margin-bottom: 41rpx;
	}

	.price2
	{
		width: 100%;
		height: 98rpx;
		position: fixed;
		bottom: 0;
		background: #fff;
		line-height: 98rpx;

	}

	.price2>.left {
		float: left;
		margin-left: 40rpx;
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.price2>.left>text {
		font-size: 40rpx;
		font-weight: bold;
		color: rgba(245, 49, 49, 1);
	}

	.price2>button {
		float: right;
		width: 270rpx;
		height: 98rpx;
		background: linear-gradient(-8deg, rgba(61, 179, 163, 1) 0%, rgba(145, 230, 115, 1) 100%);
		font-size: 36rpx;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 98rpx;
		border-radius: 0
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

	.kuang {
		width: 100%;
		height: 90%;
		position: fixed;
		bottom: -20rpx;
		background: #fff;
		border-radius: 20rpx;
		z-index: 99999999;
		text-align: center;
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

	.kuang>text {
		font-size: 28rpx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(26, 26, 26, 1);
	}

	.kuangIn>.price1 {
		width: 100%;
		height: 40rpx;
		margin-top: 60rpx;
	}

	.kuangIn>.price1>.left {
		font-size: 32rpx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		float: left;
	}

	.kuangIn>.price1>.right {
		float: right;
		font-size: 24rpx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.kuangIn>.price1>.right>text {
		font-size: 40rpx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(245, 49, 49, 1);

	}

	.kuangIn>.btn {
		width: 100%;
		height: 120rpx;
		margin-top: 40rpx;
	}

	.kuangIn>.btn>button {
		position: relative;
		width: 212rpx;
		height: 120rpx;
		/* border:3rpx solid #5DBF39; */
		border-radius: 10rpx;
		/* line-height: 120rpx; */
		text-align: center;
		font-size: 22rpx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.kuangIn>.btn>button>image {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}

	.kuangIn>.btn>button>text {
		display: block;
		font-size: 24rpx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(245, 49, 49, 1);
		margin: 0 auto;
		/* margin-top: 20rpx; */
	}

	.kuangIn>button {
		margin-top: 20rpx;
		width: 100%;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		font-size: 28rpx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
	}

	.kuangIn>button>image {
		width: 28rpx;
		height: 28rpx;

	}

	.date {
		width: 100%;
		height: 500rpx;
		overflow: auto;
		margin-bottom: 80rpx;
		position: relative
	}


	.kuang>button {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 98rpx;
		background: linear-gradient(-8deg, rgba(61, 179, 163, 1) 0%, rgba(145, 230, 115, 1) 100%);
		font-size: 36rpx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 98rpx;
		border-radius: 0;

		z-index: 999999
	}

	/*  */
	.spaceAroundCenter {
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		justify-content: space-around;
	}

	.box {
		margin: 30rpx;
	}

	.flex-item {
		/* flex-flow: nowrap;
	  flex-grow: 1;
	  flex-shrink: 1; */
		width: 14.2%;
	}

	.item-content {
		padding: 25rpx 0;
		text-align: center;
	}

	.item-content>text {
		display: block;
		font-size: 24rpx;
	}

	/* 当前日期 */
	.bk-color-day {
		color: #1a1a1a;
		border-radius: 50%;
		/* background-color: #ed7e2d; */
	}

	/* 当前选中日期 */
	/* .bk-color-dayClick {
	  color: #fff;
	  border-radius: 50%;
	  background-color: rgba(145,230,115,1);
	} */

	.item-content-current-day {
		flex-grow: 2;
	}

	.date-day {
		display: flex;
		padding: 5px;
		text-align: center;
		justify-content: center;
		align-items: center;
		flex-direction: column;

	}

	.date-day.bgitem {
		background-color: #d8ecf9;
	}

	.date-day.active {
		background: rgba(61, 179, 163, 1);
		border-radius: 16rpx;
		color: #FFF;

	}

	.date-day.unavailable {
		color: #aaa;
	}

	.date-week {
		display: flex;
		justify-content: center;
		align-content: center;
		margin: 5px;
	}

	.row {
		display: flex;
		flex-direction: row;
	}

	.item-days {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 35rpx;
	}

	.bgwhite {
		background-color: #fff;
	}
</style>
