<template>
	<view class='whole'>
		<!-- <view class="contain"> -->
		<form>
			<view class='bj'>
				<view class="contain">
					<input class='pl' placeholder='收货人' v-model="people" :value="people"></input>
					<!-- <image class='lx' src='../../static/image/notebook@2x.png'></image> -->
					<input class='ph' placeholder='手机号码' v-model="phone" :value="phone"></input>
					<input placeholder="选择" :value="address" @click="showMulLinkageThreePicker" class="ad" />
					<picker>
						<image class='jp' src='../../static/image/jump@2x.png'></image>
					</picker>

					<textarea placeholder='详细地址：如道路、门牌号、小区、楼栋号、单元室等' v-model="detail" :value="detail"></textarea>
				</view>
			</view>
			<view class='bj'>
				<view class="contain">
					<input class='bq' placeholder='地址标签' @focus="open1" :value="index1"></input>
					<view class='moren'>
						<text>设为默认地址</text>
						<switch @change="kai" :value="kai1"></switch>
					</view>
				</view>
				<button @click="save">修改</button>
			</view>
		</form>



		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @=""
		 @onConfirm="onConfirm"></mpvue-city-picker>

		<view class="open" v-if="condition1">
			<view class="openIn">
				<view class="In">
					<text>地址标签</text>
					<radio-group @change="radioChange">
						<label class="tp">

							<text>自</text>
							<text class="txt">自定义</text>
							<radio @click='radio(4)' value="自" />
						</label>
						<label class="tp">

							<image src="../../static/image/homeicon@2x.png"></image>
							<text class="txt">家</text>
							<radio @click='radio(0)' value="家" />
						</label>
						<label class="tp">

							<image src="../../static/image/companyicon@2x.png"></image>
							<text class="txt">公司</text>
							<radio @click='radio(1)' value="公司" />
						</label>
						<label class="tp">

							<image src="../../static/image/schoolicon@2x.png"></image>
							<text class="txt">学校</text>
							<radio @click='radio(2)' value="学校" />
						</label>
					</radio-group>
					<button class="btn1" @click="srue">确定</button>
					<button class="btn2" @click="quxiao">取消</button>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '@/common/city.data.js';
	export default {
		components: {
			mpvuePicker,
			mpvueCityPicker
		},


		data() {
			return {
				pickerText: "",
				people: '',
				phone: '',
				ad: '',
				detail: '',
				qian: '',
				people1: '',
				phone1: '',
				ad1: "",
				detail1: '',
				qian1: '',
				kai1: false,

				condition: false,
				condition1: false,
				index1: '',
				bq: '',
				index2: '',
				bqId: "",
				title: "mpvue-picker 使用示例",
				pickerSingleArray: [{
						label: '中国',
						value: 1
					},
					{
						label: '俄罗斯',
						value: 2
					},
					{
						label: '美国',
						value: 3
					},
					{
						label: '日本',
						value: 4
					}
				],
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',

				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],
				address: ''
			};

		},


		onLoad(options) {
			var id = options.id
			this.id = options.id
			this.people = options.name
			this.phone = options.phone
			this.address = options.path
			this.detail = options.detail
			this.kai1 = options.moren

		},

		methods: {

			onBackPress() {
				if (this.$refs.mpvuePicker.showPicker) {
					this.$refs.mpvuePicker.pickerCancel();
					return true;
				}
				if (this.$refs.mpvueCityPicker.showPicker) {
					this.$refs.mpvueCityPicker.pickerCancel();
					return true;
				}
			},

			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.pickerText = JSON.stringify(e)
				this.address = JSON.parse(this.pickerText).label
				console.log(JSON.parse(this.pickerText).label)
			},
			radio: function(index) {

				this.index2 = index
				console.log(index)

			},
			radioChange: function(e) {
				console.log(e)
				this.index1 = e.detail.value
			},
			srue: function() {

				this.condition1 = false
				this.bq = this.index1
				this.bqId = this.index2

				console.log(this.bqId)
			},
			quxiao: function() {

				this.condition1 = false


			},

			kai: function(e) {

				this.kai1 = e.detail.value
				console.log(e)

			},


			open: function() {

				this.condition = !this.condition

			},
			open1: function() {

				this.condition1 = true

			},
			save: function() {
				var that = this
				if (this.kai1 == false) {
					this.kai1 = 0
				} else {
					this.kai1 = 1
				}
				var userId = uni.getStorageSync('user').loginId || 0

				uniRequest.get('/QianYi_Shop/updateShopAddress?userId=' + userId + '&consigneeName=' + this.people +
					'&consigneePhone=' + this.phone + '&areaIdPath=' + this.address + '&address=' + this.detail + '&isDefault=' +
					this.kai1 + '&effectiveState=1&type=' + this.bqId + '&id=' + this.id).then(res => {
					console.log(res)
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})

					uni.navigateBack()

				}).catch(e => {
					console.log(e)
				})
			}
		}

	}
</script>

<style>
	page {
		width: 100%;
		height: 100%
	}

	.whole {
		background: rgba(242, 242, 242, 1);
		width: 100%;
		position: relative;
		height: 100%
	}

	.contain {
		width: 90%;
		margin: 0 auto;
		position: relative;
	}

	.bj {
		background: #fff;
		margin-top: 20rpx;
		width: 100%;

	}

	.pl,
	.ph,
	.ad,
	.bq {
		width: 100%;
		height: 110rpx;
		border-bottom: 1px solid #e6e6e6;
	}

	.pl[placeholder],
	.ph[placeholder],
	.ad[placeholder],
	.bq[placeholder] {
		font-size: 28rpx;

		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		line-height: 110rpx;
	}

	textarea {
		width: 100%;
		height: 180rpx;
		font-size: 28rpx;

		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		margin-top: 42rpx;
	}

	.moren {
		margin-top: 40rpx;

	}

	.moren>text {
		font-size: 32rpx;

		font-weight: 500;
		color: rgba(26, 26, 26, 1);
	}

	.moren>switch {
		width: 88rpx;
		height: 46rpx;
		float: right;
	}

	.lx {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 0;
		top: 65rpx;
	}

	.jp {
		width: 22rpx;
		height: 22rpx;
		position: absolute;
		right: 0;
		top: 0rpx;
	}

	button {
		width: 100%;
		height: 110rpx;
		margin-top: 30rpx;
		line-height: 110rpx;
		text-align: center;
		font-size: 32rpx;

		font-weight: 500;
		color: rgba(26, 26, 26, 1);
	}

	picker {
		width: 22rpx;
		height: 22rpx;
		position: absolute;
		right: 0;
		top: 265rpx;
	}

	.citypicker {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 480rpx;
		background: #fff;
		z-index: 99;
		overflow: hidden
	}

	.cityheader {

		width: 100%;
		height: 100rpx;
		position: absolute;
		top: 100rpx;
		background: #fff;
		z-index: 999
	}

	.city-true {
		position: absolute;
		color: rgb(123, 207, 67);
		right: 34rpx;
		z-index: 9999
	}

	.city-cancel {
		float: left;
		position: absolute;

		left: 34rpx;
		z-index: 9999
	}

	.open {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.2);

		z-index: 999
	}

	.openIn {
		width: 560rpx;
		height: 760rpx;

		background: rgba(255, 255, 255, 1);
		border-radius: 20rpx;
		position: absolute;
		margin: 0 auto;
		margin-top: -340rpx;
		left: 50%;
		margin-left: -280rpx;
		top: 50%
	}

	.In {
		width: 90%;
		margin: 0 auto;
		padding-top: 20rpx;
		box-sizing: border-box;
		text-align: center
	}

	.In>text {
		font-size: 36rpx;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		text-align: center;
		margin: 0 auto;

	}

	.In label {
		width: 100%;
		margin-bottom: 60rpx;
	}

	.In label>text {
		width: 64rpx;
		height: 64rpx;
		background: rgba(153, 153, 153, 1);
		border-radius: 50%;
		display: inline-block;
		font-size: 36rpx;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 64rpx;
	}

	.In label>image {
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		display: inline-block;
		margin-top: 30rpx;
		position: relative;
		top: 24rpx;
	}

	.In label>.txt {
		width: 284rpx;
		height: 27rpx;
		font-size: 26rpx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		display: inline-block;
		margin-left: 30rpx;
		text-align: center;
		background: none;
	}

	.In label>radio {
		margin-left: 30rpx;
	}

	.In>.btn1 {
		width: 100%;
		height: 90rpx;
		background: linear-gradient(-8deg, rgba(61, 179, 163, 1) 0%, rgba(145, 230, 115, 1) 100%);
		border-radius: 45rpx;
		font-size: 36rpx;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 90rpx;
	}

	.In>.btn2 {
		width: 100%;
		height: 90rpx;
		background: #fff;
		border-radius: 45rpx;
		font-size: 36rpx;
		font-weight: 500;
		color: #666;
		text-align: center;
		line-height: 90rpx;
	}

	.zhezao {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.2);
	}
</style>
