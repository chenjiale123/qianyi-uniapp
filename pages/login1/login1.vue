<template>
	<view class='whole'>
		<view class='contain'>
			<image src='../../static/image/qylogo.png'></image>

			<view class='center'>
				<form>
					<input class='shuru1' placeholder='手机号' type='number' name="tel" v-model="userphone">
					<text class="yzm" v-if="code">{{time}}s</text>
					<text class="yzm" @click='sendCode' v-else>获取动态验证码</text>
					</input>
					<input class='shuru2' placeholder='请输入验证码' type='number' name="code" v-model="usercode"> </input>
					<button class='btn' @click='submit'> 登录</button>
					<view class='tishi' @click="login">
						<text>用户名登录</text>

					</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {
		data() {
			return {
				// sendCode: false,
				time: 60,
				userphone: '',
				usercode: '',
				code: false
			}
		},

		onLoad() {},
       
		methods: {
			login:function(){
				uni.navigateTo({
					url:"../login/login"
				})
			},
			sendCode: function() {
				var that = this
				var timer1 = setInterval(function() {
					if (that.time > 0) {

						var time = that.time - 1
						that.code = true

						that.time = time

					} else {

						that.code = false

						that.time = 60

						clearInterval(timer1);

					}
				}, 1000)


				uniRequest.post('/QianYi/getVerificationCode?phone=' + that.userphone).then(res => {
					console.log(res)

				}).catch(e => {
					console.log(e)
				})


			},
			submit: function() {
				var that = this;
				var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;


				if (!myreg.test(that.userphone)) {
					uni.showToast({
						title: '请输入合法的手机号',
						icon: 'none',
						duration: 2000
					})
				} else if (that.usercode.length != 4) {
					uni.showToast({
						title: '请输入四位数验证码',
						icon: 'none',
						duration: 2000
					})
				} else {
					uniRequest.post('/QianYi/checkSmsCode?phone=' + that.userphone + '&smsCode=' + that.usercode).then(res => {
						console.log(res)
						if (res.data.isSuc == true) {
							console.log('000')
							uniRequest.post('/QianYi/validation?loginPhone=' + that.userphone).then(res => {
								console.log(res)
								if (res.data.isSuc == true) {
									wx.navigateBack({
									  delta: 3,
									  
								
									})
									uni.setStorageSync("user", res.data.data.userInfo);
									console.log('000')

								} else {
									uni.showToast({
										title: res.data.msg,
										icon: 'none'
									})
								}

							}).catch(e => {
								console.log(e)
							})
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					}).catch(e => {
						console.log(e)
					})



				}
			}
		}

	}
</script>

<style>
	.whole {
		/* background:rgba(242,242,242,1); */
		width: 100%;
	}

	.contain {
		width: 80%;
		margin: 0 auto;

	}

	.contain image {
		width: 180rpx;
		height: 120rpx;
		display: block;
		margin: 0 auto;
		margin-top: 120rpx;
	}

	.contain .center {
		width: 100%;
		height: 198rpx;
		margin-top: 156rpx;

	}

	.contain .center input {
		position: relative;
		width: 100%;
		height: 50%;
		border-bottom: 2rpx solid#b3b3b3;
		/* background:url('../../image/bukekan@2x.png') no-repeat 90% 20%; */
		opacity: 0.4;
	}

	.shuru1 {
		position: relative;
	}

	.yzm {
		position: absolute;
		right: 70upx;
		top: 300upx;
		font-size: 32rpx;
		z-index: 9999999999;
	}

	.contain .center input[placeholder] {
		color: #b3b3b3;
		line-height: 98rpx;
		font-size: 32rpx;
		opacity: 0.4;
	}

	.btn {
		width: 100%;
		height: 112rpx;
		background: linear-gradient(-8deg, rgba(61, 179, 163, 1) 0%, rgba(145, 230, 115, 1) 100%);
		box-shadow: 0rpx 8rpx 40rpx 0rpx rgba(144, 240, 169, 0.6);
		border-radius: 56rpx;
		margin-top: 88rpx;
		line-height: 112rpx;
		font-size: 36rpx;
		color: #fff;
	}

	.tishi {
		margin-top: 40rpx;
		display: flex;
		justify-content: space-between;
	}

	text {
		font-size: 24rpx;
		color: #999;

	}
</style>
