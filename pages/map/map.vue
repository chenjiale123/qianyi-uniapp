<template>
	<view class="map_container">
	  <map class="map" id="map" :longitude="longitude" :latitude="latitude" scale="14" show-location="true" :markers="markers" @markertap="makertap"></map>
	</view>
</template>

<script>
	import amapFile from "../../amap-wx.js"
	export default{
		data(){
			return{
				   markers: [],
				    latitude: "",
				    longitude: "",
				    textData: {}
			}
		},
		onLoad(options) {
			console.log(options.wei,options.jing)
			
			var that = this;
			this.latitude=options.wei
			this.longitude=options.jing
			    var myAmapFun = new amapFile.AMapWX({ key: '9e2944bddd32448b3c71a369c7af463e' });
			    myAmapFun.getPoiAround({
			      iconPathSelected: '../../static/image/dwbiao@2x.png', //如：..­/..­/img/marker_checked.png
			      iconPath: '../../static/image/dwbiao@2x.png', //如：..­/..­/img/marker.png
			      success: function (data) {
			        markersData = data.markers;
			       
			         that.markers= markersData
			      
			        var latitude=options.wei
			        var longitude=options.jing
			        console.log(latitude, longitude)
			       
			          that.latitude= latitude
			     
			       
			          that.longitude= longitude
			      
			       
			        that.showMarkerInfo(markersData, 0);
			      },
			      fail: function (info) {
			      }
			    })
		},
		methods:{
			 showMarkerInfo: function (data, i) {
			    var that = this;
			
			      this.textData= {
			        name: data[i].name,
			        desc: data[i].address
			      }
			 
			  },
			  changeMarkerColor: function (data, i) {
			    var that = this;
			    var markers = [];
			    for (var j = 0; j < data.length; j++) {
			      if (j == i) {
			        data[j].iconPath = "../../static/image/dwbiao@2x.png"; //如：..­/..­/img/marker_checked.png
			      } else {
			        data[j].iconPath = "../../static/image/dwbiao@2x.png"; //如：..­/..­/img/marker.png
			      }
			      markers.push(data[j]);
			    }
			
			      this.markers= markers
			  
			  }

		}
		}
</script>

<style>
	.map_container{
	  position: absolute;
	  top: 0;
	  bottom: 0;
	  left: 0;
	  right: 0;
	}
	.map{
	  width: 100%;
	  height: 100%;
	}
	.map_text{
	  position: absolute;
	  left: 0;
	  right: 0;
	  bottom: 0px;
	  height: 80px;
	  background: #fff;
	  padding: 0 15px;
	}
	text{
	  margin: 5px 0;
	  display: block;
	  font-size:12px;
	}
	.h1{
	  margin: 15px 0;
	  font-size:15px;
	}
</style>
