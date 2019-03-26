import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)
/*
权限管理 ： 1 系统管理员  2 系统审计员  3 系统游客
*/

let router = new Router({
    routes: [
        {
            path: '*',
            component: { template: '<div>404未找到</div>' }
        },
        {
            path: '/',
            redirect:'/login'
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['../components/Login/LoginContainer'], resolve)
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
        }
    ]
});

router.beforeEach((to, from, next) => {
    var token = sessionStorage.getItem('token');
    if (token) { // 判断是否有token
        /* if (to.meta.roles && to.meta.roles.indexOf(role) === -1) {//页面有权限要求但用户不符合
            if(from.path == '/login'){
                next('/')
            }else{
                next({path: from.path})
            }
        } else {//页面没有权限要求就直接访问
            next()
        } */
        next()
    } else if(to.path != '/login'){//没有token的话让跳转到登录页，并传递当前准备访问的路由
        next({path:'/'});
    } else{
        next()
    }
});
 
export default router