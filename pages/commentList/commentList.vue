<template>
	<view class='whole'>

		<view class='bj'>
			<view class="contain" v-for="(item,index) in goods1" :key="index">
				<view class='goods'>
					<image :src='qiniu+item.goodsImg'></image>
					<view class='right'>
						<text class='title'>{{item.goodsName}}</text>
						<text class='small'>{{item.goodsSpecnames}}</text>
					</view>
				</view>
				<view class='comment'>
					<view class='xin'>
						<text>商品评分：</text>
						<view class='row'>
							<uni-rate max="5" value="5" @change="star1(index,$event)"></uni-rate>

						</view>

					</view>
					<textarea :value="inputValue" @blur="bindKeyInput(index)" v-model="pl"></textarea>

					<!-- <imgupload id="imgupload" bindchooseImage='chooseImage(index)'></imgupload> -->
					<sunui-upqiniu :upImgConfig="upImgQiniu" @onUpImg="upQiniuData($event,index)" @onImgDel="delImgInfo" ref="uImages"></sunui-upqiniu>
				</view>
				<view class='wuliu'>
					<view class='bop'>
						<image src='../../static/image/scoreicon@2x.png'></image>
						<text>物流与服务评价</text>
					</view>
					<view class='pj'>
						<text>物流发货：</text>
						<view class='row'>
							<uni-rate max="5" value="5" @change="star2(index,$event)"></uni-rate>
						</view>

					</view>
					<view class='pj'>
						<text>物流发货：</text>
						<view class='row'>
							<uni-rate max="5" value="5" @change="star3(index,$event)"></uni-rate>
						</view>

					</view>
				</view>
			</view>
		</view>
		<view class='bj'>
			<view class="contain">

			</view>
			<button @click="submit">提交</button>
		</view>
		<!-- </view> -->

	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	import sunUiqiNiu from "@/components/sunui-upimg/sunui-upimg-qiniu.vue";
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	export default {
		components: {
			'sunui-upqiniu': sunUiqiNiu,
			uniRate
		},

		data() {
			return {
				goods1: [],
				qiniuArr: [],
				// 配置项2(复用2)
				qiniuArr2: [],
				arrImgs: [],
				// 七牛云相关配置(复用时只需要配置一项即可)
				upImgQiniu: {

				},
				com: [],
				inputValue:'',
				pl:'',
				ding:''

			}
		},
		onReady() {
			// 监听页面渲染完成,服务器预览图片传入
			this.arrImgs = [];
			// this.$refs.uImages.initServerImage(this.arrImgs);
		},
		onLoad(options) {
			var userId = uni.getStorageSync('user').loginId || 0
			var id = options.id
			var ding = options.ding
			this.ding=options.ding
			var that = this;
			uniRequest.post('/QianYi_Shop/selectOrderInfo?id=' + ding).then(res => {
				console.log(res)
				this.goods1 = res.data.data.orderGoodsList
				for (var i = 0; i < that.goods1.length; i++) {
					var temp = {
						commentsContents: '',
						commodityScore: 5,
						commentsImagePath: '',
						goodsId: this.goods1[i].goodsId,
						creatorId: userId,
						additionalEvaluation: 0,
						logisticsScore: 5,
						serviceScore: 5
					};
					this.com.push(temp);
				}

			}).catch(e => {
				console.log(e)
			})
			uni.request({
				url: this.base+'QianYi/getIconToken',
				method: 'GET',

				success: res => {
					console.log(res)
					// 七牛云相关配置
					this.upImgQiniu = {
						qiniuConfig: {
							uploadURL: 'https://up-z2.qiniup.com', //华北
							domain: 'dev.static.qianyipan.com', //图片地址
							region: 'SCN',
							uptoken: res.data.data.token,
							key: (new Date()).getTime(),
							shouldUseQiniuFileName: false,
							fileHead: 'file',
						},
						// 是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)
						notli: true,
						// 图片数量
						count: 2,
						// 相机来源(相机->camera,相册->album,两者都有->all,默认all)
						sourceType: 'all',
						// 上传图片背景修改 
						upBgColor: '#eee',
						// 上传icon图标颜色修改(仅限于iconfont)
						upIconColor: '#fff',
						// 上传字体图标图标名称(关于扩展,查看iconfont)
						upIconName: 'icon-shangchuantupian',
					}
				},
				fail: () => {},
				complete: () => {}
			});

		},

		methods: {
			// 手动上传图片(适用于表单等上传) -2019/05/10增加
			uImageTap() {
				this.$refs.uImage.uploadimage(this.upImgQiniu);
			},
			// 删除图片 -2019/05/12(本地图片进行删除)
			async delImgInfo(e) {
				console.log('你删除的图片地址为:', e, this.qiniuArr.splice(e.index, 1));
			},
			// 七牛云(复用1)
			async upQiniuData(e,index) {
				// 上传图片数组
				let arrImg = [];
				for (let i = 0, len = e.length; i < len; i++) {
					try {
						// let reg = /([^\s]+(?=\.(jpg|png|gif))\.\2)/gi;
						if (e[i].path_server != "") {
							await arrImg.push(e[i].path_server.split(','));
						}
					} catch (err) {
						console.log('上传失败...');
					}
				}
				// 图片信息保存到data数组
				this.qiniuArr = arrImg;
				// 可以根据长度来判断图片是否上传成功. 2019/4/11新增
				 this.com[index].commentsImagePath = arrImg.join(',');
				if (arrImg.length == this.upImgQiniu.count) {
					console.log(arrImg)
					uni.showToast({
						title: `上传成功`,
						icon: 'none'
					});
				}
			},
		
			// 获取上传图片七牛云
			getUpImgInfoQiniu() {
				console.log('七牛云转成一维数组:', this.qiniuArr.join().split(','));
				console.log('七牛云转成一维数组2:', this.qiniuArr2.join().split(','));
			},
			star1: function(index,e) {
				console.log(index,e)
				  this.com[index].commodityScore = e.value;
			},
			star2: function(index,e) {
				// console.log(e)
				   this.com[index].logisticsScore = e.value;
			},
			star3: function(index,e) {
				    this.com[index].serviceScore = e.value;
			},
				
			submit:function(){
				console.log(this.com)
				var that=this
				  uni.request({
				    url:  this.base+'QianYi_Shop/insertBatchShopComments?orderId=' + this.ding + '&type=1',
				
				    method: "POST",
				    data: 
					 	JSON.stringify(this.com),
					
				    header: {
				      'content-type': 'application/json',
				      // 默认值
				    },
				    success: function (res) {
						  console.log(res)
				      if (res.data.isSuc == true) {
						
				
				        uni.showToast({
				          title: res.data.msg,
				          icon: 'success',
				          duration: 2000
				        })
				        console.log('55555')
				        // uni.navigateTo({
				        //   url: '/pages/success/success?id=' + that.data.goods1[0].goodsId,
				        //   success: function (res) { },
				        //   fail: function (res) { },
				        //   complete: function (res) { },
				        // })
				      }
				    
				    }
				  })
			},
				
			bindKeyInput:function(index){
				 this.com[index].commentsContents = this.pl;
			}

		}
	}
</script>

<style>
	.whole {
		background: rgba(242, 242, 242, 1);
		width: 100%;
	}

	.row {
		display: inline-block;
		margin-left: 30rpx;
	}

	.bj {
		background: #fff;
		margin-top: 20rpx;
		width: 100%;

	}

	.contain {
		width: 90%;
		margin: 0 auto;
		position: relative;
		padding: 0 20rpx;
		margin-bottom: 30rpx;

		box-shadow: 0px 6px 12px 0px rgba(88, 88, 88, 0.15);

	}

	.goods {
		width: 100%;
		height: 188rpx;
	}

	.goods>image {
		width: 148rpx;
		height: 148rpx;
		border-radius: 10rpx;
		margin-top: 20rpx
	}

	.goods>.right {
		width: 480rpx;
		height: 100%;
		float: right;
	}

	.goods>.right>.title {
		font-size: 24rpx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		margin-top: 20rpx;
		display: block;

	}

	.goods>.right>.small {
		font-size: 22rpx;

		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		margin-top: 20rpx
	}

	.xin {
		width: 100%;
		height: 106rpx;
	}

	.xin>text {

		font-size: 32rpx;

		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		line-height: 106rpx;
	}

	.xin image {
		position: relative;
		top: 16rpx;
		width: 44rpx;
		height: 44rpx;
		margin-top: 30rpx;
	}

	.comment>textarea {
		width: 100%;
		height: 267rpx;
		margin-top: 30rpx;
		border: 1px solid #E6E6E6;
		font-size: 26rpx;

		font-weight: 500;
		color: rgba(102, 102, 102, 1);
	}

	.comment>.tj {
		font-size: 24rpx;

		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		float: right;
	}

	.comment>.upload {
		width: 100%;

		height: auto;
		margin-top: 30rpx;
		overflow: hidden
	}

	.wuliu {
		width: 100%;
		height: 324rpx;
	}

	.bop {
		width: 100%;
		height: 120rpx;
	}

	.bop image {
		width: 40rpx;
		height: 40rpx;
		float: left;
		margin-top: 40rpx;
	}

	.bop>text {
		font-size: 32rpx;

		font-weight: bold;
		color: rgba(26, 26, 26, 1);
		line-height: 120rpx;
		margin-left: 20rpx;
	}

	.pj {
		width: 100%;
		height: 101rpx;
	}

	.pj>text {
		font-size: 32rpx;

		font-weight: 500;
		line-height: 101rpx;
		color: rgba(26, 26, 26, 1);
	}

	.pj image {
		width: 44rpx;
		height: 44rpx;
		margin-top: 30rpx;
		position: relative;
		top: 16rpx;
	}

	button {
		width: 100%;

		height: 120rpx;
		background: rgba(255, 255, 255, 1);
		line-height: 120rpx;
		color: #F53131;
	}

	.gallery {
		width: 100%;
		height: auto;
		margin-top: 30rpx;
		overflow: hidden
	}

	/* 上传 */
	.item {
		position: relative;
		float: left;
		margin: 10rpx 2%;
		width: 159rpx;
		height: 159rpx;
		background: #f3f3f3;
	}

	.item image {
		width: 100%;
		height: 100%;
	}

	/*add按钮*/
	.item2 {
		float: left;
		margin: 10rpx 2%;
		width: 159rpx;
		height: 159rpx;
		text-align: center;
		line-height: 442rpx;
		font-size: 200rpx;
		background: #fff;
		color: #e4e5ea;
		border: 1px dashed #e4e5ea;
	}

	.addIcon {
		width: 159rpx;
		height: 159rpx;
		/* display: inline-block; */
		float: left;
	}

	.addIcon image {
		width: 159rpx;
		height: 159rpx;
		position: relative;
		top: -149rpx;
	}

	/*删除按钮*/
	.delete {
		width: 80rpx;
		position: absolute;
		right: -30rpx;
		top: -20rpx;
		height: 80rpx;
		font-size: 22rpx;



	}

	.delete image {
		width: 44rpx;
		height: 44rpx;
		margin-top: 22rpx;
	}

	/*确认提交按钮*/
	.codeSubmit {
		font-size: 30rpx;
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		margin: 0 auto;
		text-align: center;
		padding: 50rpx 0 80rpx 0;
		/* display: flex; */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		display: none;
	}

	.codeSubmit .btn {
		width: 300rpx;
		text-align: center;
		border-radius: 120rpx;
		background: #000;
		color: #d1b75e;
	}
</style>
