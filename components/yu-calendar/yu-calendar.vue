<template>
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
					<view class="price">{{day.price}}</view>
				</view>
				<view class="local-month">{{selectMonth}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'yuCalendar',
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
				date: new Date(), //获取系统日期
				localDate: '', //当前日期
				selectMonth: '', //选择的月份
				localColor: '#3570cc', //今日的日期背景颜色
				weeks: ['日', '一', '二', '三', '四', '五', '六'],
				dayArr: [], //月份天数
				year: '', //当前选择的年
				month: '', //当前选择的月
				status: 1
			}
		},
		mounted() {
			this.year = this.date.getFullYear();
			this.month = this.date.getMonth();
			this.initDate(this.date.getFullYear(), this.date.getMonth());
		},
		methods: {
			//初始化日期
			initDate(year, month) {
				let weekValue = '';
				let localYear = this.date.getFullYear();
				let localMonth = this.date.getMonth() + 1;
				let day = this.date.getDate();
				let totalDay = new Date(year, month + 1, 0).getDate();
				this.dayArr = [];
				this.selectMonth = month + 1;
				this.localDate = this.formatNum(localYear) + '-' + this.formatNum(localMonth) + '-' + this.formatNum(day);
				for (let i = 1; i <= totalDay; i++) {
					let dayDate = this.formatNum(year) + '-' + this.formatNum(month + 1) + '-' + this.formatNum(i);
					let obj = {
						date: dayDate,
						day: i,
						price: '',
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
					// //设置点击灰色日期跳转后的默认值
					// if (i == 1 && this.status == 0) {
					// 	obj.bgColor = this.bgColor;
					// 	obj.color = this.color;
					// }
					// if (i == totalDay && this.status == 2) {
					// 	obj.bgColor = this.bgColor;
					// 	obj.color = this.color;
					// }
					this.dayArr.push(obj);
					if (i == totalDay && weekValue != 6) {
						this.addAfterValue(weekValue)
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
				this.initDate(this.year, this.month)
			},
			//下一个月
			nextMonth() {
				if (this.month == 11) {
					this.year += 1;
					this.month = 0;
				} else {
					this.month += 1
				}
				this.initDate(this.year, this.month)
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
				this.$emit('click', dataObj)
			}
		}
	}
</script>

<style scoped>
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
</style>
