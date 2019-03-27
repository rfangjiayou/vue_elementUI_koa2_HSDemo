import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index.js'

Vue.use(Vuex)

/*
*   路由信息，不包括login，修改路由在这里修改即可
*   权限管理 ： 1 系统管理员  2 系统审计员  3 系统游客
*/
let dynamicRoutes = [
    {
        path: '/',
        redirect:'/login'
    },
    {
        path: '/baselayout',
        name: 'baselayout',
        component: resolve => require(['../components/BaseLayout.vue'], resolve),
        children : [
            {
                path: '/policy',
                name: 'policy', 
                component: resolve => require(['../components/Policy/PolicyContainer.vue'], resolve),
                // component: () => import('../components/Policy/PolicyContainer.vue'),
                meta: {
                    roles: [1,3]
                },
                children : [
                    {
                        path: '/policy/securitypolicy',
                        name: 'securitypolicy', 
                        meta: {
                            roles: [1,3]
                        },
                        component: resolve => require(['../components/Policy/SecurityPolicy/SecurityPolicy.vue'], resolve)
                    },
                    {
                        path: '/policy/crpolicy',
                        name: 'contentrewritepolicy',
                        meta: {
                            roles: [1,3]
                        },
                        component: resolve => require(['../components/Policy/ContentRewritePolicy/ContentRewritePolicy.vue'], resolve)
                    }
                ]
            },
            {
                path: '/log',
                name: 'log',
                meta: {
                    roles: [1,2]
                },
                component: resolve => require(['../components/Log/LogContainer.vue'], resolve)
            },
            {
                path: '/system',
                name: 'system',
                meta: {
                    roles: [1,2]
                },
                component: resolve => require(['../components/Log/LogContainer.vue'], resolve)
            }
        ]
    }, {
        path: '*',
        component: { template: '<div>404未找到</div>' }
    }
];

let checkChildren = (routes, userInfo) => {
    var tmpRouters = JSON.parse(JSON.stringify(routes));
    for(let i = 0; i < tmpRouters.length; i++){
        let element = tmpRouters[i];
        if(element.children){
            routes[i].children = checkChildren(element.children, userInfo);
        }else{
            routes = routes.filter((value) => {
                if(value.meta){
                    return value.meta.roles.indexOf(userInfo.data.role) !== -1;
                }else{
                    return true;
                }
            })
        }
    }
    return routes;
};

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
            state.userRoutes = checkChildren(dynamicRoutes, userInfo);
            // 注册路由
            router.addRoutes(state.userRoutes); 
        }
    },
    actions: {
        async setRoutes (ctx, data) {
            ctx.commit('setUserRoutes', data);
        }
    }
})

export default store