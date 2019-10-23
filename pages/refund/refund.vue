<template>
	<view class="whole" >
	  <view class="In" v-if="show">
	    <view class="center">
	      <button @click="btn1(1,case1)"   class="bn">拍错/多拍/不想要</button>
	      <button @click="btn2(2,case2)"  class="bn1">与商家协商一致退款</button>
	      <button class="bom" @click="close">关闭</button>
	    </view>
	  </view>
	  <view class="In1" v-if="show1">
	    <view class="center">
	      <button @click="photo" class="bn2">拍一张</button>
	      <button @click="chooseImage" class="bn3">相册选取</button>
	      <button class="bom" @click="close1">关闭</button>
	    </view>
	  </view>
	  <view class="top" v-for="(item,index) in goods1" :key="index">
	    <view class="topIn">
	      <view class="left">
	        <image :src="qiniu+item.goodsImg"></image>
	      </view>
	      <view class="right">
	        <text class="txt">{{item.goodsName}}</text>
	        <text class="txt1">{{item.goodsSpecnames}}</text>
	
	      </view>
	
	    </view>
	  </view>
	  <view class="jine">
	    <view class="jineIn">
	      退款金额：
	      <text>￥{{price1}}</text>
	      <text class="tishi">不含发货邮费￥{{yun1}}</text>
	    </view>
	  </view>
	
	  <view class="cause">
	    <view class="causeIn">
	      <view class="zt">
	        <view class="left">
	          商品状态：
	        </view>
	        <view class="right">
	          {{status1}}
	        </view>
	
	      </view>
	      <view class="yy">
	        <view class="left">
	
	
	          <text>退货原因：</text>
	
	          <input placeholder="请选择退货原因" @focus="yuanyin" :value="she" v-model="she"></input>
	
	        </view>
	        <view class="right">
	          <image src="../../static/image/2.png" @click="yuanyin"></image>
	        </view>
	      </view>
	      <view class='upload'>
	        <!-- 上传图片 -->
	        <view class="gallery">
	          <view class="item" v-for="(item,index) in pathsTmp" :key="index">
	            <image :src="qiniu+item" @click="previewImage(item)" mode="aspectFit" />
	            <!-- 删除按钮 -->
	            <view class="delete"  @click="delete1(index)">
			
	              <image src='../../static/image/guan.png' mode="widthFix"></image>
	            </view>
	          </view>
	          <view class="item2" @click="load">
	            <view class='addIcon'>
	              <image src='../../static/image/3.png'></image>
	            </view>
	          </view>
	        </view>
	        <view class='codeSubmit'>
	          <view class='btn'>确认上传</view>
	        </view>
	
	      </view>
	      <view class="sm">
	        <text>
	        退款说明（选填）：
	      </text>
	        <textarea placeholder="请输入" v-model="shuru3"></textarea>
	      </view>
	    </view>
	  </view>
	<button class="btn1" @click="tijiao">提交</button>
	</view>

</template>

<script>
	import uniRequest from 'uni-request';	
	import qiniuUploader from '../../qiniuUploader.js';
	export default{
			
				
			
		data(){
			return{
				  id1: '',
				    show: false,
				    show1: false,
				    zhi:'',
				    images: [],
				    pathsTmp: [],
				    value1:'',
					value2:'',
				    imgList: [],
				    uploadToken: '',
				    goods1:'',
				    img1:'',
				    price1:'',
				    yun1:'',
				    status1:'',
				    gui1:'',
				    shuru1:'',
				    shuru4:'',
					shuru:'',
					shuru3:'',
				    id2:'',
				    zhi2:'',
					she:'',
					case1:'拍错/多拍/不想要',
					case2:'与商家协商一致退款',
					upImgQiniu:{}
			}
		},
			
		onLoad(options){
			var that = this 
			   
			    var id = options.id
			    var goods = options.goods
			
			    var price = options.price
			    var yun = options.yun
			    var status = options.status
			
			    var id1 = options.id1
			
			    if (status==0){
			      status= '待发货'
			    } else if (status == -3){
			      status = '用户拒收'
			    } else if (status == -2) {
			      status = '未付款'
			    } else if (status == -1) {
			      status = '用户取消'
			    } else if (status == 1) {
			      status = '配送中'
			    } else if (status == 2) {
			      status = '确认收货'
			    }
			  
			      this.id1= id
			      this.goods1= JSON.parse(goods)
			
			      this.price1= price
			      this.yun1= yun
			      this.status1= status
			
			      this.id2=id1
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
			
		methods:{
			 yuanyin: function() {
			    
			      this.show= true
			  
			  },
			  close: function() {
			
			      this.show= false
			  
			  },
			  close1: function () {
			  
			      this.show1= false
			
			  },
			  btn1:function(id,e){
			  console.log(e)
		
			    this.show= false
			    this.zhi= id
			    this.she= e
				
		
			
			
			  },
			  btn2: function (id,e) {
			    console.log(e)
			   this.show= false
			   this.zhi= id
			   this.she= e
			   		
			   			
			  },
			load(){
			
			  this.show1=true
		
			},
			  // 
			  photo: function () {
			    var that = this
			    uni.chooseImage({
			      count: 1,
			      sizeType: ['compressed'],
			      sourceType:  ['camera'],
			      success: function (res) {
			        //文件重命名并拼接数组--目的是上传七牛
			        for (var i = 0; i < res.tempFilePaths.length; i++) {
			          var suiji = Math.floor(Math.random() * 100000)
			          var year = new Date().getFullYear();
			          var month = new Date().getMonth() + 1;
			          var day = new Date().getDate();
			          var path = year + '/' + month + '/' + day + '/' + suiji + '.jpg';
			          that.pathsTmp = that.pathsTmp.concat(path)
			        }
			        //打印文件名称
			        console.log(that.pathsTmp)
			    
			          //将上传的图片拼接成数组--目的是批量上传至七牛
			          that.images= that.images.concat(res.tempFilePaths)
			          that.show1=false
			    that.pictureUploadqiniuMethod(that.pathsTmp, that.images)
			        //打印上传图片的数组
			        console.log(that.images)
			      }
			    })
			  },
			
			
			  chooseImage: function () {
			    var that = this
			    uni.chooseImage({
			      count: 9,
			      sizeType: ['compressed'],
			      sourceType: ['album', 'camera'],
			      success: function (res) {
			        //文件重命名并拼接数组--目的是上传七牛
			        for (var i = 0; i < res.tempFilePaths.length; i++) {
			          var suiji = Math.floor(Math.random() * 100000)
			          var year = new Date().getFullYear();
			          var month = new Date().getMonth() + 1;
			          var day = new Date().getDate();
			          var path = year + '/' + month + '/' + day + '/' + suiji + '.jpg';
			          that.pathsTmp = that.pathsTmp.concat(path)
			        }
					
			        //打印文件名称
			        console.log(that.pathsTmp)
			        
			          //将上传的图片拼接成数组--目的是批量上传至七牛
			          that.images= that.images.concat(res.tempFilePaths)
			          that.show1=false
			          that.pictureUploadqiniuMethod(that.pathsTmp, that.images)
			        //打印上传图片的数组
			        console.log(that.images)
			      }
			    })
			  },
			
			  pictureUploadqiniuMethod: function (fileHead, imageArray) {
			    var that = this;
			    console.log(fileHead, imageArray)
				console.log(this.upImgQiniu.qiniuConfig.uptoken)
			    for (var i = 0; i < imageArray.length; i++) {
			      var filePath = imageArray[i];
			      qiniuUploader.upload(filePath, (res) => {
			        //上传成功，上传成功一张图片，进入一次这个方法，也就是返回一次
			        //七牛上传成功重新组成数组imgList
			        console.log(res.key)
			      
			          this.imgList= that.imgList.concat(res.key)
			     
			        console.log("imgList：" + that.imgList)
			        console.log("qn：" + that.imgList.length)
			        console.log("qn：" + imageArray.length)
			        //检测是否上传完毕（本地上传的图片长度===上传七牛成功的图片长度）
			        if (imageArray.length === that.imgList.length) {
			          //   // 第三步：上传服务器
			          // that.uploadserver();
			          console.log('七牛上传完毕')
			        }
			      },
			        (error) => {
			          //图片上传失败，可以在七牛的js里面自己加了一个err错误的返回值
			          console.log('error: ' + error)
			        }, {
			          uploadURL: 'https://up-z2.qiniup.', //华北
			          domain: 'http://dev.static.qianyipan.', //图片地址
			          region: 'SCN',
			          key: fileHead[i], //图片命名
			          uptoken: this.upImgQiniu.qiniuConfig.uptoken, //在onLoad中执行获取uploadToken
			          // uptokenURL: 'UpTokenURL.com/uptoken', //获取upToken的url
			        });
			    }
			  },
			
			  uploadImgSubmit: function () {
			    var that = this;
			    if (that.images.length == 0) {
			      uni.showToast({
			        title: '请上传手机照片',
			        // image: '../../static/image/error.png',
			        duration: 1500
			      })
			    } else {
			      //上传图片到七牛
			      //将图片地址和图片命名传入
			      that.pictureUploadqiniuMethod(that.pathsTmp, that.images)
			      console.log('lll')
			      var list = {
			        goodsId: this.goods1[0].goodsId,
			        commentsContents: this.shuru3,
			        creatorId: 84,
			        commodityScore: this.one_1,
			        logisticsScore: this.one_2,
			        serviceScore: this.one_3,
			        additionalEvaluation: 0,
			        commentsImagePath: that.images.join(',')
			      }
			      uni.request({
			        url: this.base+'/QianYi_Shop/insertBatchShopComments?orderId=' + this.ding1 + '&type=1',
			
			        method: "POST",
			        data: [list],
			        header: {
			          'content-type': 'application/json',
			          // 默认值
			        },
			        success: function (res) {
			          console.log(res.data)
			          uni.showToast({
			            title: '成功',
			            icon: 'success',
			            duration: 2000
			          })
			       
			        }
			      })
			
			    }
			  },
			
			
			  delete1: function (index) {
			    var that = this;
			    var index = index;
			    var images = that.images;
			    images.splice(index, 1);
			    //图片命名数组
			    var pathsTmp = that.pathsTmp;
			    pathsTmp.splice(index, 1);
			  
			      this.images= images
			      this.pathsTmp= pathsTmp
			    
			    console.log(that.images)
			    console.log(that.pathsTmp)
			  },
			
			  tijiao:function(){
			    var that = this;
			    var userId = uni.getStorageSync('user').loginId || 0
			
			    uniRequest.get('/QianYi_Shop/insertShopOrderRefund?orderId=' + this.id2 + '&refundToId='+userId+'&refundReson=' + this.she + '&userProofUrl=' + that.pathsTmp.join(',') + '&refundRemark=' + this.shuru3).then(res => {
			      console.log(res)
			      uni.showToast({
			        title: '退款成功',
			        icon: 'success',
			        duration: 2000
			      })
			
			
			    }).catch(e => {
			      console.log(e)
			    })
			  },
		}
		
	}
</script>

<style>
	page{
	    width: 100%;
	  height: 100%
	}
	.whole{
	  background:rgb(255, 255, 255);
	  width: 100%;
	  height: 80%;
	
	
	}
	
	.top{
	  width:100%;
	height:188rpx;
	background:rgba(242,242,242,1);
	
	}
	.topIn{
	  width: 90%;
	  margin: 0 auto;
	  padding-top: 20rpx;
	  box-sizing: border-box;
	}
	.topIn>.left{
	float: left;
	width: 25%;
	height: 100%
	}
	.topIn>.right{
	float: right;
	width: 75%;
	height: 100%
	}
	.topIn>.left>image{
	  width:148rpx;
	height:148rpx;
	border-radius:10rpx;
	}
	.topIn>.right>.txt{
	  font-size:24rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(26,26,26,1);
	display: block;
	}
	.topIn>.right>.txt1{
	font-size:22rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(153,153,153,1);
	}
	.jine{
	  width: 100%;
	  height: 80rpx;
	}
	.jineIn{
	    width: 90%;
	  margin: 0 auto;
	  margin-top: 60rpx;
	  font-size:32rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(26,26,26,1);
	}
	.jineIn>text{
	  font-size:32rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(245,49,49,1);
	}
	.jineIn>.tishi{
	  display: block;
	  font-size:26rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(102,102,102,1);
	}
	.cause{
	  width: 100%;
	  margin-top: 67rpx;
	  height: 400rpx;
	}
	.causeIn{
	  width: 90%;
	  margin: 0 auto;
	}
	.causeIn>.zt{
	  width: 100%;
	  height: 56rpx;
	}
	.causeIn>.zt>.left{
	  float: left;
	  font-size:32rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(26,26,26,1);
	}
	.causeIn>.zt>.right{
	  float: right;
	  font-size:26rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(102,102,102,1);
	}
	.causeIn>.yy{
	  padding-top: 28rpx;
	  box-sizing: border-box;
	  width: 100%;
	  height: 88rpx;
	  border-top: 2rpx solid #ddd;
	}
	.causeIn>.yy>.left{
	  float: left;
	
	}
	.causeIn>.yy>.left>text{
	  font-size:32rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(26,26,26,1);
	    float: left;
	
	}
	.causeIn>.yy>.left>input{
	  width: 300rpx;
	
	  height: 33rpx;
	    float: left;
	}
	.causeIn>.yy>.right{
	  float: right
	}
	.causeIn>.yy>.right>image{
	  width: 28rpx;
	  height: 28rpx;
	}
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
	.addIcon{
	    width: 159rpx;
	  height: 159rpx;
	  /* display: inline-block; */
	  float: left;
	}
	.addIcon image{
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
	.sm{
	  width: 100%;
	  height: 50rpx;
	  margin-top: 80rpx;
	float: left
	}
	.sm>text{
	  font-size:26rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(102,102,102,1);
	  float: left;
	
	}
	.sm>textarea{
	  width: 100%;
	  height: 120rpx;
	  /* display: inline-block; */
	
	  position: relative;
	  display: block;
	  margin-top: 50rpx;
	  border: 1px solid #D9D9D9;
	}
	textarea[placeholder]{
	  font-size:30rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(102,102,102,1);
	}
	.btn1{
	  width:280rpx;
	height:80rpx;
	background:rgba(145,230,115,1);
	border-radius:40rpx;
	margin: 0 auto;
	margin-top: 200rpx;
	font-size:32rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(255,255,255,1);
	text-align: center;
	line-height: 80rpx;
	
	display: block;
	opacity: 1;
	}
	
	.In,.In1{
	  top: 0;
	  left: 0;
	  z-index: 999999999999;
	  position: absolute;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.3)
	}
	.center{
	  width: 100%;
	
	  position: absolute;
	  bottom: 0;
	  height: 382rpx;
	}
	.center>button{
	  width: 90%;
	  margin: 0 auto;
	height:108rpx;
	background:rgba(255,255,255,1);
	/* border-radius:20rpx; */
	font-size:36rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(26,26,26,1);
	text-align: center;
	line-height: 108rpx;
	}
	.bn{
	    width: 90%;
	  margin: 0 auto;
	height:108rpx;
	background:rgba(255,255,255,1);
	/* border-radius:20rpx; */
	font-size:36rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(26,26,26,1);
	text-align: center;
	line-height: 108rpx;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	}
	.bn1{
	    width: 90%;
	  margin: 0 auto;
	height:108rpx;
	background:rgba(255,255,255,1);
	/* border-radius:20rpx; */
	font-size:36rpx;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(26,26,26,1);
	text-align: center;
	line-height: 108rpx;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
	border-bottom-left-radius: 20rpx;
	border-bottom-right-radius: 20rpx;
	}
	.bn2{
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	}
	.bn3{
	border-top-left-radius: 0;
	border-top-right-radius: 0;
	border-bottom-left-radius: 20rpx;
	border-bottom-right-radius: 20rpx;
	}
	.center>.bom{
	  margin-top: 30rpx;
	}

</style>
