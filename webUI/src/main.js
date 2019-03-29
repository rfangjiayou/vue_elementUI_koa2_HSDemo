// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App';

import router from './router/index.js';
import VueRouter from 'vue-router';

import Axios from 'axios';
import qs  from 'qs';

import store from './vuex/store.js';

Vue.use(ElementUI);
Vue.use(VueRouter);

// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = Axios;
Vue.prototype.$qs = qs;


Vue.config.productionTip = false

require('./assets/js/main.js')

//全局路由守卫
router.beforeEach((to, from, next) => {
    var token = sessionStorage.getItem('token');
    if (token) { // 判断是否有token
        next()
    } else if(to.path != '/login'){//没有token的话让跳转到登录页，并传递当前准备访问的路由
        next({path:'/'});
    }
});

// axios 请求拦截器处理请求数据
Axios.interceptors.request.use((config) => {
    let token = sessionStorage.getItem('token');
    config.headers.common['Authorization'] = 'Bearer ' + token;
    return config;
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
    /* components: { App },
    template: '<App/>' */
})
