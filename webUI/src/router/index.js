import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)
 
export default new Router({
    routes: [
        {
            path: '*',
            component: { template: '<div>404未找到</div>' }
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
                    children : [
                        {
                            path: '/policy/securitypolicy',
                            name: 'securitypolicy', 
                            component: resolve => require(['../components/Policy/SecurityPolicy/SecurityPolicy.vue'], resolve)
                        },
                        {
                            path: '/policy/crpolicy',
                            name: 'contentrewritepolicy', 
                            component: resolve => require(['../components/Policy/ContentRewritePolicy/ContentRewritePolicy.vue'], resolve)
                        }
                    ]
                },
                {
                    path: '/log',
                    name: 'log', 
                    component: resolve => require(['../components/Log/LogContainer.vue'], resolve)
                },
                {
                    path: '/system',
                    name: 'system', 
                    component: resolve => require(['../components/Log/LogContainer.vue'], resolve)
                }
            ]
        },
        /* {
            path: '/policy',
            name: 'policy', 
            component: PolicyContainer,
            children : [
                {
                    path: '/policy/securitypolicy',
                    name: 'securitypolicy', 
                    component: SecurityPolicy
                },
                {
                    path: '/policy/crpolicy',
                    name: 'contentrewritepolicy', 
                    component: ContentRewritePolicy
                }
            ]
        },
        {
            path: '/log',
            name: 'log', 
            component: LogContainer
        } */
    ]
});