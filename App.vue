<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.cj-in{
				width: 94%;
				margin: 0 auto;
				padding-top: 30upx;
				box-sizing: border-box;
			}
		.uni-tabbar-border{
			display: none!important;
		}
	button{
		border:none;
	}
	button::after{ border: none;}
	body{
		width: 100%;
		height: 100%;
	}
		
	page{
		width: 100%;
		height: 100%;
	}
	.content {
		width: 100%;
		height: 100%;
		background: #fff;
		/* overflow: hidden; */
		position: relative;
				overflow: auto;
	}
</style>
