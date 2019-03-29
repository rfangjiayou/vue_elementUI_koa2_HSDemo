import Vue from 'vue';
import Router from 'vue-router';
import store from '../vuex/store';

Vue.use(Router)

/*
*   静态路由信息
*/
const constantRouter = [
    {
        path: '/',
        redirect:'/login'
    },
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['../components/Login/LoginContainer'], resolve)
    }
]

/*
*   动态路由信息
*   权限管理 ： 1 系统管理员  2 系统审计员  3 系统游客
*/
export const dynamicRoutes = [
    {
        path: '/baselayout',
        name: 'baselayout',
        component: resolve => require(['../components/BaseLayout.vue'], resolve),
        meta: {
            roles: [1,2,3]
        },
        children : [
            {
                path: '/policy',
                name: 'policy', 
                component: resolve => require(['../components/Policy/PolicyContainer.vue'], resolve),
                meta: {
                    roles: [1,3],
                    title : '策略'
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
                    roles: [1,2],
                    title : '日志'
                },
                component: resolve => require(['../components/Log/LogContainer.vue'], resolve),
                children : [
                    {
                        path: '/log/systemlog',
                        name: 'systemlog',
                        meta: {
                            roles: [1,2]
                        },
                        component: resolve => require(['../components/Log/SystemLog.vue'], resolve)
                    }
                ]
            },
            {
                path: '/system',
                name: 'system',
                meta: {
                    roles: [1,2],
                    title : '系统'
                },
                component: resolve => require(['../components/Log/LogContainer.vue'], resolve)
            }
        ]
    }, {
        path: '*',
        component: { template: '<div>404未找到</div>' }
    }
]

//实例化vue的时候只挂载constantRouter
export default new Router({
    routes: constantRouter
});