import Vue from 'vue'
import App from './App'
import uniRequest from 'uni-request';
 import uParse from '@/components/u-parse/u-parse.vue'
 
Vue.config.productionTip = true
App.mpType = 'app'
Vue.prototype.qiniu='http://dev.static.qianyipan.com/'
Vue.prototype.base='http://dev.app.qianyipan.com/'
uniRequest.defaults.baseURL = 'http://dev.app.qianyipan.com';

// uniRequest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


const app = new Vue({
    ...App
})
app.$mount()
