<template>
	<view class='whole'>
		<view class='contain'>
			<view class='list'>
				<radio-group @change="radioChange">
					<label class="tp" v-for="(item,index) in list" v-if="status!==false">
						<!-- <radio :checked="item.checked" @click='radio(index)'  :value="index" v-if="!show" /> -->
						<image src="../../static/image/companyicon@2x.png" v-if="item.type==2"></image>
						<image src="../../static/image/homeicon@2x.png" v-if="item.type==0"></image>
						<image src="../../static/image/schoolicon@2x.png" v-if="item.type==1"></image>
						<text v-if="item.type==4">{{item.consigneeName}}</text>

						<view class='right1'>
							<text class='name'>{{item.consigneeName}}</text>
							<text class='phone'>{{item.consigneePhone}}</text>
							<view class='dizhi'>
								<text class='bq1' v-if="item.isDefault">默认</text>
								<text class='bq2' v-if="item.type==2">公司</text>
								<text class='bq2' v-if="item.type==0">家</text>
								<text class='bq2' v-if="item.type==1">学校</text>
								<text class='dz'>{{item.areaIdPath}}{{item.address}}</text>
							</view>
						</view>
						<view class='right2' @click='edit(index)' >
							<text>编辑</text>
						</view>
					</label>
					<view class="tp5" v-if="status==false">
						<image src="http://dev.static.qianyipan.com/image/jpg/meidizhi@2x.png"></image>
					</view>
				</radio-group>

			</view>

			<view class="add" @click='add'>
				<image src='../../static/image/add@2x.png'></image>
			</view>
		</view>
		<button @click="sure">确定</button>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	export default {



		data() {
			return {
				    list:'',
				    list1:'',
				    consigneeName:'',
				    consigneePhone:"",
				    areaIdPath:"",
				    address:'',
				    index1:'',
				    show:false,
				    status:false
			}
		},

		onLoad() {
			 var that = this
			
			    var userId = uni.getStorageSync('user').loginId || 0
			    uniRequest.get('/QianYi_Shop/selectAddressByUserId?page=1&userId='+userId).then(res => {
			      if (res.data.isSuc==false){
			       
			          // list: res.data.shopAddressList,
			          this.status= res.data.isSuc
			       
			
			      }else{
			       
			          this.list= res.data.data.shopAddressList
			          this.status= res.data.isSuc
			      
			      }
			     
			  
			    }).catch(e => {
			      
			      console.log(e)
			    })
			    let pages = getCurrentPages();
			    let prevpage = pages[pages.length - 2];
			    console.log(prevpage.route)
			    if (prevpage.route=='pages/mine/mine'){
			   
			        this.show=true
			      
			    }else{
			    
			        this.show= false
			     
			    }

		},

		methods: {
			add:function(){
			uni.navigateTo({
			  url: '/pages/addressAdd/addressAdd',
			  success: function(res) {},
			  fail: function(res) {},
			  complete: function(res) {},
			})
			},
			  edit: function (id) {
			    var that = this
		
			    var li = id
			
			    uni.navigateTo({
			      url: '/pages/addressEdit/addressEdit?name=' + that.list[li].consigneeName + '&phone=' + that.list[li].consigneePhone + '&path=' + that.list[li].areaIdPath + '&detail=' + that.list[li].address + '&moren=' + that.list[li].isDefault + '&id=' + that.list[li].id + '&type=' + that.list[li].type,
			      success: function (res) { },
			      fail: function (res) { },
			      complete: function (res) { },
			    })
			  },
			  radio:function(index){
	
			 
			      this.index1= index
			   
			  },
			//   radioChange(e){
			//     var that=this
			
			//     that.setData({
			//       list1: that.list[e.detail.value]
			   
			//     })
			//   },
			  sure:function(){
			     
			
			    wx.setStorageSync('list', this.list1);
			    // wx.navigateBack();
			  
			
			  },
		}

	}
</script>

<style>
	.whole {
		background: rgba(242, 242, 242, 1);
		width: 100%;
	}

	.contain {
		width: 90%;
		margin: 0 auto;

	}

	.list {
		width: 100%;
		height: auto;
	}

	.list .tp {
		width: 100%;
		height: 90rpx;
		margin-bottom: 80rpx;
	}

	.list .tp radio {
		width: 64rpx;
		height: 64rpx;
		/* background:rgba(110,166,245,1); */
		/* opacity:0.2; */
		border-radius: 50%;
		float: left;
		margin-top: 50rpx;
		text-align: center;
		line-height: 64rpx;
		clear: both
	}

	.list .tp image {
		float: left;
		width: 64rpx;
		height: 64rpx;
		margin-top: 50rpx;

		text-align: center;
		clear: both
	}

	.list .tp5 image {
		width: 100%;
		height: 600rpx;
		display: inline-block;
		margin: 0 auto
	}

	.list .tp>text {
		clear: both;
		float: left;
		display: inline-block;
		width: 64rpx;
		height: 64rpx;
		line-height: 64rpx;
		text-align: center;
		background: #000;
		font-size: 22rpx;
		color: #fff;
		border-radius: 50%;
		position: relative;
		top: 40rpx;

	}

	.list .tp1 {
		width: 64rpx;
		height: 64rpx;
		background: #999;

		border-radius: 50%;
		float: left;
		margin-top: 50rpx;
		text-align: center;
		line-height: 64rpx;
	}

	.list .tp1 text {
		font-size: 36rpx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);

	}

	.list .right1 {
		width: 60%;
		height: 100%;
		margin-left: 20rpx;
		float: left;
		padding-top: 30rpx;
		box-sizing: border-box;

	}

	.list .right1>.name {
		font-size: 32rpx;

		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		margin-top: 30rpx;
	}

	.list .right1>.phone {
		font-size: 26rpx;

		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		margin-left: 11rpx;
		margin-top: 30rpx;

	}

	.list .right1>.dizhi {

		width: 100%;
	}

	.list .right1>.dizhi>.bq1 {
		width: 68rpx;
		height: 28rpx;
		background: rgba(245, 49, 49, 1);
		opacity: 0.1;
		border-radius: 4rpx;
		text-align: center;
		font-size: 22rpx;
	}

	.list .right1>.dizhi>.bq2 {
		width: 68rpx;
		height: 28rpx;
		background: rgba(102, 102, 102, 1);
		opacity: 0.1;
		border-radius: 4rpx;
		text-align: center;
		margin-left: 10rpx;
		font-size: 22rpx;

	}

	.list .right1>.dizhi>.dz {
		font-size: 26rpx;

		font-weight: 500;
		color: rgba(26, 26, 26, 1);
		margin-left: 10rpx;




	}

	.list .right2 {
		float: right;
		width: 80rpx;
		height: 60rpx;
		margin-left: 24rpx;
		text-align: center;
		font-size: 26rpx;
		border-left: 1px solid #666;
		margin-top: 50rpx;

	}

	.list .right2>text {
		/* margin-top: 15rpx; */
		line-height: 60rpx;
		color: #666
	}

	.add {
		position: fixed;
		width: 84rpx;
		height: 84rpx;
		background: rgba(255, 255, 255, 1);
		border: 2px solid rgba(230, 230, 230, 1);
		box-shadow: 0px 4rpx 16rpx 0px rgba(0, 0, 0, 0.08);
		border-radius: 50%;
		right: 5%;
		bottom: 100rpx;
	}

	.add image {
		width: 100%;
		height: 100%;
	}

	button {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 98rpx;
		background: linear-gradient(-8deg, rgba(61, 179, 163, 1) 0%, rgba(145, 230, 115, 1) 100%);
		font-size: 48rpx;
		color: #fff;
		text-align: center;
		line-height: 98rpx;
		border-radius: 0
	}
</style>
