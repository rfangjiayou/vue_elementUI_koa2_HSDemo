import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['../components/Login/LoginContainer'], resolve)
        }
    ]
});

router.beforeEach(async (to, from, next) => {
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