import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index.js'

import { dynamicRoutes } from '../router/index.js';

Vue.use(Vuex)

//过滤路由，目前只支持2层
const accessedRouters = () => {
    dynamicRoutes.filter(v => {
        if (v.meta && v.meta.roles.indexOf(parseInt(store.state.role)) !== -1) {
            if (v.children && v.children.length > 0) {
                v.children = v.children.filter(child => {
                    if (child.meta.roles.indexOf(parseInt(store.state.role)) !== -1) {
                        if(child.children && child.children.length > 0){
                            child.children = child.children.filter(value => {
                                if (value.meta.roles.indexOf(parseInt(store.state.role)) !== -1) {
                                    return value;
                                }
                            })
                        }
                        return child;
                    }
                        return false;
                    });
                return v
            } else {
                return v
            }
        }
        return false;
    });
    return dynamicRoutes;
}

let store = new Vuex.Store({
    // 定义状态
    state: {
        token: window.sessionStorage.getItem('token'),
        role: '',
        userRoutes : []
    },
    mutations: {
        setToken (state, token) {
            state.token = token;
            window.sessionStorage.setItem('token', token);
        },
        clearToken (state) {
            state.token = '';
            window.sessionStorage.setItem('token', '');
        },
        setRole (state, role) {
            state.role = role;
            window.sessionStorage.setItem('role', role);
        },
        clearToken (state) {
            state.role = '';
            window.sessionStorage.setItem('role', '');
        },
        setUserRoutes (state, userInfo) {
            // 生成用户路由表
            state.userRoutes = accessedRouters();
            // 注册路由
            router.addRoutes(state.userRoutes);
        }
    },
    actions : {
        setRoutes (ctx, data) {
            return new Promise(resolve => {
                ctx.commit('setUserRoutes', data);
                resolve();
            })
        }
    }
})

export default store