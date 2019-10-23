<template>
	<view class='whole'>
		<view class='contain'>
			<image src='../../static/image/qylogo.png'></image>

			<view class='center'>
				<form >
					<input class='shuru1' placeholder='用户名/手机号' type='number' name="tel" v-model="userphone"></input>
					<input class='shuru2' placeholder='请输入密码' type='password' name="pad" v-model="password">
					<!-- <image src="../../static/image/bukekan@2x.png"></image> -->
					</input>
					<button class='btn' @click='submit'> 登录</button>
					<view class='tishi'>
						<text @click="login1">手机号登录</text>
						<!-- <text> 忘记密码</text> -->
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
				userphone: '',
				password: ''

			}
		},

		onShow() {

		},

		methods: {
				
			login1:function(){
				uni.navigateTo({
					url:"../login1/login1"
				})
			},
			submit:function() {
				var that = this;
				var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;

				if (!myreg.test(that.userphone)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none',
						duration: 2000
					})
				} else {
					uniRequest.post('/QianYi/login?loginPhone=' + that.userphone + '&loginPwd=' + that.password).then(res => {
						console.log(res)
						if (res.isSuc == true) {
							uni.setStorageSync("user", res.data.data.userInfo);
							console.log('ooo')
							uni.navigateBack({
							  delta: 1,
							})
						} else {
							if (res.code == 800) {
								uni.showToast({
									title: '账号已冻结',
									icon: 'none'
								})
							} else {
								console.log('111')
								uni.showToast({
									title: '请检查密码',
									icon: 'none'
								})
							}
						}

					}).catch(e => {
						console.log(e)
					})
				}
			},
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
		width: 100%;
		height: 50%;
		border-bottom: 2rpx solid#b3b3b3;
		/* background:url('../../image/bukekan@2x.png') no-repeat 90% 20%; */
		opacity: 0.4;
		position: relative
	}

	.contain .center input[placeholder] {
		color: #b3b3b3;
		line-height: 98rpx;
		font-size: 32rpx;
		opacity: 0.4;
	}

	.contain .center input image {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 60rpx;
		top: -60rpx;
		z-index: 999999999;
		opacity: 1;
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
