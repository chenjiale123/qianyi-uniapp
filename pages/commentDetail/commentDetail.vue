<template>
	<view class="whole">
	  <view class="top">
	    <view class="topIn">
	      <button @click="all(0)" >全部</button>
	      <button @click="new1(1)" >最新</button>
	      <button @click="good(2)" >好评</button>
	      <button @click="middle(3)" >中评</button>
	      <button @click="laji(4)" >差评</button>
	      <button @click="zhuijia(6)" >追加评价</button>
	      <button>好吃不贵</button>
	      <button @click="tu(5)" >有图</button>
	      <button>追加评价</button>
	
	<!-- <image src="../../static/image/xiala@2x.png"></image> -->
	    </view>
	  </view>
	  <view class="pingjia">
	    <view class="li" v-for="(item,index) in comment1" :key="index" v-if="she!==false">
	      <view class="liIn">
	
	        <view class="left">
	          <image :src="qiniu+item.userInfo.infoIcon"></image>
	          <text class="txt1">{{item.userInfo.infoNickname}}</text>
	          <text class="txt2">{{item.createTime}}</text>
	
	        </view>
	        <view class="right">
	          <image src="../../static/image/shouzang01@2x.png" v-for="(item,index) in item.commodityScore" :key="index" ></image>
			  <!-- wx:for="{{item.commodityScore}}" -->
	        </view>
	        <text>{{item.commentsContents}}</text>
	        <view class="tp"  >
	          <image  v-for="(item,index) in item.ImagePath" :src="item"></image>
	          <!-- <text >{{item}}</text> -->
	        </view>
	        <view class="zuiping">
	          <view class="bj"></view>
	          <text class="tou">追加评价</text>
	          <view class="da" v-for="(item,index) in item.additionalReview" :key="index">
	          <text class="body">{{item.commentsContents}}</text>
	          <!-- <text class="tou">展开</text> -->
	        
			   <image  v-for="(item,index) in item.commentsImagePath" :src="item"></image>
	          </view>
	        </view>
	        <view class="zuiping1" v-for="(item,index) in item.relpy" :key="index">
	        <text class="peo">千艺特产自营旗舰店：</text>
	        <text class="body1">{{item.commentsContents}}</text>
	               <!-- <text class="tou">展开</text>
	          <image src="../../static/image/xiala@2x.png"></image> -->
	        </view>
	      </view>
	
	    </view>
	     <view class="li" v-if="she==false">
	     <image src="http://dev.static.qianyipan.com/image/jpg/wupinglun@2x.png"></image></view>
	  </view>
	</view>
</template>

<script>
		import uniRequest from 'uni-request';
	export default{
			
				
			
		data(){
			return{
				 page: 1,
				    add1: '',
				    new1: '',
				    good1: '',
				    middle1: '',
				    laji1: '',
				    zhuijia1: '',
				    tu1: '',
				    type: '',
				    Id: '',
					img:[],
					comment1:[],
					leng:'',
					she:true
			}
		},
			
		onLoad(options){
			 var that = this
			    
			    var pageNo = 1
			    var id = options.id
			
			      this.Id= id
			 
			    console.log(id)
			    var that = this
			
			    uniRequest.get('/QianYi_Shop/selectShopComments?page=' + pageNo + '&goodsId=' + that.Id + '&sortType=0').then(res => {
			      console.log(res)
			    
			      for (let i in res.data.data.commentslist) {
			      
			 
			          var img = res.data.data.commentslist[i].commentsImagePath
			        
			        if (img == "" || img == null) {
			          console.log('111')
			          res.data.data.commentslist[i].ImagePath = [];
			       
			        } else {
			          console.log('222')
			          console.log(img.split(','))
			          res.data.data.commentslist[i].ImagePath = img.split(',');
			 
			
			        }
			      }
			    
			   for (let i in res.data.data.commentslist) {
			   
			   		  for (let j in res.data.data.commentslist[i].additionalReview) {	 
			 
			     
			 
			  
			   
			     res.data.data.commentslist[i].additionalReview[j].commentsImagePath = res.data.data.commentslist[i].additionalReview[j].commentsImagePath.split(',');
				  console.log(res.data.data.commentslist[i].additionalReview[j].commentsImagePath)
			   			 
			   			
			  
				 }
			   }
			
			        this.leng= res.data.data.commentslist.length
			        this.comment1= res.data.data.commentslist
			
			
			     
			
			    }).catch(e => {
			      console.log(e)
			    })
		},
			onReachBottom() {
				
    this.onfrash(this.page + 1)
			},
		methods:{
			 onfrash: function(pageNo) {
			
			    var that = this
			
			    var userId = uni.getStorageSync('user').loginId || 0
			    uniRequest.post('/QianYi_Shop/selectShopComments?page=' + pageNo + '&goodsId=' + that.Id + '&sortType=0').then(res => {
			      console.log(res)
			
			    
			      for (let i in res.data.data.commentslist) {
			
			
			        var img = res.data.data.commentslist[i].commentsImagePath
			
			        if (img == "" || img == null) {
			          console.log('111')
			          res.data.data.commentslist[i].ImagePath = [];
			
			        } else {
			          console.log('222')
			          console.log(img.split(','))
			          res.data.data.commentslist[i].ImagePath = img.split(',');
			
			
			        }
			      }
			
			    
			        this.page= pageNo //当前的页号
			        this.pages= res.data.data.pageSize //总页数
			        this.comment1= this.comment1.concat(res.data.data.commentslist)
			     
			
			
			    }).catch(e => {
			      console.log(e)
			    })
			  },
			  all: function(id) {
			    var pageNo = 1
			    var that = this
			    console.log(id)
			   
			      this.all1= id
			   
			    uniRequest.get('/QianYi_Shop/selectShopComments?page=' + pageNo + '&goodsId=' + that.Id + '&sortType=' + this.all1).then(res => {
			      console.log(res)
			      if (res.data.isSuc == true) {
			        for (let i in res.data.data.commentslist) {
			
			
			          var img = res.data.data.commentslist[i].commentsImagePath
			
			          if (img == "" || img == null) {
			            console.log('111')
			            res.data.data.commentslist[i].ImagePath = [];
			
			          } else {
			            console.log('222')
			            console.log(img.split(','))
			            res.data.data.commentslist[i].ImagePath = img.split(',');
			
			
			          }
			        }
			
			     
			
			          this.leng= res.data.data.commentslist.length
			          this.comment1= res.data.data.commentslist
			
			
			       
			      } else {
			      
			
			          this.she= res.data.isSuc
			
			
			       
			      }
			
			
			
			    }).catch(e => {
			      console.log(e)
			    })
			  },
			  new1: function(id) {
			    var pageNo = 1
			    var that = this
			
			    console.log(id)
		
			      this.new1= id
			  
			    uniRequest.get('/QianYi_Shop/selectShopComments?page=' + pageNo + '&goodsId=' + that.Id + '&sortType=' + this.new1).then(res => {
			      console.log(res)
			      for (let i in res.data.data.commentslist) {
			
			
			        var img = res.data.data.commentslist[i].commentsImagePath
			
			        if (img == "" || img == null) {
			          console.log('111')
			          res.data.data.commentslist[i].ImagePath = [];
			
			        } else {
			          console.log('222')
			          console.log(img.split(','))
			          res.data.data.commentslist[i].ImagePath = img.split(',');
			
			
			        }
			      }
			
			     
			
			        this.leng= res.data.data.commentslist.length
			        this.comment1= res.data.data.commentslist
			
			
			     
			
			    }).catch(e => {
			      console.log(e)
			    })
			  },
			  laji: function(id) {
			    var pageNo = 1
			    var that = this
			
			    console.log(id)
			 
			      this.laji1= id
			    
			    uniRequest.get('/QianYi_Shop/selectShopComments?page=' + pageNo + '&goodsId=' + that.Id + '&sortType=' + this.laji1).then(res => {
			      console.log(res)
			      for (let i in res.data.data.commentslist) {
			
			
			        var img = res.data.data.commentslist[i].commentsImagePath
			
			        if (img == "" || img == null) {
			          console.log('111')
			          res.data.data.commentslist[i].ImagePath = [];
			
			        } else {
			          console.log('222')
			          console.log(img.split(','))
			          res.data.data.commentslist[i].ImagePath = img.split(',');
			
			
			        }
			      }
			
			      
			
			        this.leng=res.data.data.commentslist.length
			        this.comment1= res.data.data.commentslist
			
			
			      
			
			    }).catch(e => {
			      console.log(e)
			    })
			  },
			  good: function(id) {
			    var pageNo = 1
			    var that = this
			
			    console.log(id)
			   
			      this.good1= id
			
			    uniRequest.get('/QianYi_Shop/selectShopComments?page=' + pageNo + '&goodsId=' + that.Id + '&sortType=' + this.good1).then(res => {
			      console.log(res)
			      for (let i in res.data.data.commentslist) {
			
			
			        var img = res.data.data.commentslist[i].commentsImagePath
			
			        if (img == "" || img == null) {
			          console.log('111')
			          res.data.data.commentslist[i].ImagePath = [];
			
			        } else {
			          console.log('222')
			          console.log(img.split(','))
			          res.data.data.commentslist[i].ImagePath = img.split(',');
			
			
			        }
			      }
			
			     this.leng=res.data.data.commentslist.length
			     this.comment1= res.data.data.commentslist
			    }).catch(e => {
			      console.log(e)
			    })
			  },
			  middle: function(id) {
			    var pageNo = 1
			    var that = this
			
			    console.log(id)
			   
			      this.middle1=id
			   
			    uniRequest.get('/QianYi_Shop/selectShopComments?page=' + pageNo + '&goodsId=' + that.Id + '&sortType=' + this.middle1).then(res => {
			      console.log(res)
			      for (let i in res.data.data.commentslist) {
			
			
			        var img = res.data.data.commentslist[i].commentsImagePath
			
			        if (img == "" || img == null) {
			          console.log('111')
			          res.data.data.commentslist[i].ImagePath = [];
			
			        } else {
			          console.log('222')
			          console.log(img.split(','))
			          res.data.data.commentslist[i].ImagePath = img.split(',');
			
			
			        }
			      }
			
			     this.leng=res.data.data.commentslist.length
			     this.comment1= res.data.data.commentslist
			
			    }).catch(e => {
			      console.log(e)
			    })
			  },
			  tu: function(id) {
			    var pageNo = 1
			    var that = this
			
			    console.log(id)
			  
			      this.tu1= id
			   
			    uniRequest.get('/QianYi_Shop/selectShopComments?page=' + pageNo + '&goodsId=' + that.Id + '&sortType=' + this.tu1).then(res => {
			      console.log(res)
			      for (let i in res.data.data.commentslist) {
			
			
			        var img = res.data.data.commentslist[i].commentsImagePath
			
			        if (img == "" || img == null) {
			          console.log('111')
			          res.data.data.commentslist[i].ImagePath = [];
			
			        } else {
			          console.log('222')
			          console.log(img.split(','))
			          res.data.data.commentslist[i].ImagePath = img.split(',');
			
			
			        }
			      }
			
			     this.leng=res.data.data.commentslist.length
			     this.comment1= res.data.data.commentslist
			
			    }).catch(e => {
			      console.log(e)
			    })
			  },
			  zhuijia: function(id) {
			    var pageNo = 1
			    var that = this
			
			    console.log(id)
			   
			      this.zhuijia1= id
			    
			    uniRequest.get('/QianYi_Shop/selectShopComments?page=' + pageNo + '&goodsId=' + that.Id + '&sortType=' + this.zhuijia1).then(res => {
			      console.log(res)
			      for (let i in res.data.data.commentslist) {
			
			
			        var img = res.data.data.commentslist[i].commentsImagePath
			
			        if (img == "" || img == null) {
			          console.log('111')
			          res.data.data.commentslist[i].ImagePath = [];
			
			        } else {
			          console.log('222')
			          console.log(img.split(','))
			          res.data.data.commentslist[i].ImagePath = img.split(',');
			
			
			        }
			      }
			
			     this.leng=res.data.data.commentslist.length
			     this.comment1= res.data.data.commentslist
			
			    }).catch(e => {
			      console.log(e)
			    })
			  },
		}
		
	}
</script>

<style>
	.whole{
	  background:rgba(242,242,242,1);
	  width: 100%;
	  height: 100%
	}
	.top{
	width: 100%;
	height:306rpx;
	background:rgba(255,255,255,1);
	}
	.topIn{
	  widows: 90%;
	  margin: 0 auto;
	  padding-top: 30rpx;
	  box-sizing: border-box;
	  text-align: center
	}
	.topIn>button{
	  height: 66rpx;
	  padding: 0 48rpx;
	  background:rgba(247,247,247,1);
	border-radius:6px;
	font-size:28rpx;
	font-weight:500;
	color:rgba(51,51,51,1);
	text-align: center;
	line-height: 66rpx;
	margin-right: 20rpx;
	display: inline-block;
	}
	.topIn>image{
	  display: block;
	  margin: 0 auto;
	  width: 22rpx;
	  height: 22rpx;
	  margin-top: 30rpx;
	}
	
	.pingjia{
	  width: 100%;
	  margin-top: 30rpx;
	}
	.pingjia>.li{
	  background: #fff;
	  margin-bottom: 30rpx;
	
	}
	.pingjia>.li>.liIn{
	  width: 90%;
	  margin: 0 auto;
	  padding-top: 20rpx;
	  box-sizing: border-box
	
	}
	.pingjia>.li>.liIn>.left{
	height: 66rpx;
	width: 60%;
	float: left;
	position: relative;
	 
	}
	.pingjia>.li>.liIn>.left>image{
	  position: absolute;
	  top: 0;
	  left: 0;
	  width: 66rpx;
	  height: 66rpx;
	  border-radius:50%;
	}
	.pingjia>.li>.liIn>.left>.txt1{
	  font-size:28rpx;
	font-weight:500;
	color:rgba(26,26,26,1);
	position: absolute;
	left: 89rpx;
	top: 0；
	}
	.pingjia>.li>.liIn>.left>.txt2{
	  font-size:24rpx;
	font-weight:500;
	color:rgba(179,179,179,1);
	position: absolute;
	left: 89rpx;
	top: 33rpx;
	}
	.pingjia>.li>.liIn>.right{
	  float: right;
	}
	.pingjia>.li>.liIn>.right>image{
	  width:24rpx;
	height:24rpx;
	}
	.pingjia>.li>.liIn>text{
	     padding-top: 86rpx;
	  box-sizing: border-box;
	  display: block;
	  margin-top: 30rpx;
	  font-size:28rpx;
	font-weight:500;
	color:rgba(26,26,26,1);
	}
	.pingjia>.li>.liIn>.tp{
	  width: 100%;
	  height: 160rpx;
	  margin-top: 20rpx;
	}
	.pingjia>.li>.liIn>.tp>image{
	  width:159rpx;
	height:159rpx;
	border-radius:10rpx;
	margin: 15rpx;
	}
	.pingjia>.li>.liIn>.zuiping{
	  margin-top: 24rpx;
	  width: 100%;
	  height: 260rpx;
	
	
	}
	.pingjia>.li>.liIn>.zuiping>.bj{
	width:4rpx;
	height:22rpx;
	background:linear-gradient(-8deg,rgba(61,179,163,1) 0%,rgba(145,230,115,1) 100%);
	border-radius:2rpx;
	display: inline-block;
	margin-right: 12rpx;
	}
	.pingjia>.li>.liIn>.zuiping .tou{
	font-size:28rpx;
	font-weight:bold;
	color:rgba(26,26,26,1);
	}
	.pingjia>.li>.liIn>.zuiping1>.tou{
	  font-size:28rpx;
	font-weight:bold;
	color:rgba(26,26,26,1);
	}
	.pingjia>.li>.liIn>.zuiping1>image{
	  width: 22rpx;
	height: 22rpx;
	}
	.pingjia>.li>.liIn>.zuiping .body{
	  width: 100%;
	height:60rpx;
	font-size:28rpx;
	font-weight:500;
	color:rgba(26,26,26,1);
	overflow: auto;
	display: block;
	}
	.pingjia>.li>.liIn>.zuiping image{
	width:159rpx;
	height:159rpx;
	}
	.zuiping1{
	  width: 100%;
	  height: 250rpx;
	  margin-top: 40rpx;
	  border-top: 7rpx solid rgb(197, 197, 197);
	}
	.zuiping1>.peo{
	  color: #3DB2A3;
	  font-size:28rpx;
	font-weight:500;
	}
	.zuiping1>.body1{
	
	    font-size:28rpx;
	font-weight:500;
	color: #666;
	display: block;
	overflow: auto;
	
	}
</style>
