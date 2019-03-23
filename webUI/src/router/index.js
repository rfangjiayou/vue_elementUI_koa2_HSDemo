import Vue from 'vue';
import Router from 'vue-router';
import BaseLayout from '../components/BaseLayout.vue';
import LoginContainer from '../components/Login/LoginContainer.vue';
import PolicyContainer from '../components/Policy/PolicyContainer.vue';
import LogContainer from '../components/Log/LogContainer.vue';
import SecurityPolicy from '../components/Policy/SecurityPolicy/SecurityPolicy.vue';
import ContentRewritePolicy from '../components/Policy/ContentRewritePolicy/ContentRewritePolicy.vue';

Vue.use(Router)
 
export default new Router({
    routes: [
        {
            path: '*'
        },
        {
            path: '/login',
            name: 'login',
            component: LoginContainer
        },
        {
            path: '/baselayout',
            name: 'baselayout',
            component: BaseLayout,
            children : [
                {
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