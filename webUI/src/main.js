// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App';

import router from './router';
import VueRouter from 'vue-router';

import Axios from 'axios';
import qs  from 'qs';

Vue.use(ElementUI);
Vue.use(VueRouter);

// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = Axios;
Vue.prototype.$qs = qs;


Vue.config.productionTip = false

require('./assets/js/main.js')

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App),
    router
    /* components: { App },
    template: '<App/>' */
})
