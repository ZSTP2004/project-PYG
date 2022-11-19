//配置路由的地方
import store from '@/store';
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
import routes from './routes'

Vue.use(VueRouter);
//将VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push;
// let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (locaton, resolve, reject) {
    if(resolve && reject){
        originPush.call(this.addRoute, locaton, resolve, reject);
    }else{
        originPush.call(this, locaton, () => { },() => { });
    }
}

//配置路由
let router =  new VueRouter({
    //配置路由
    routes,
    // 滚动到最上面...
    scrollBehavior(to, from, savedPosition){
        return { x:0,y:0}
    }
})
// 全局守卫 前置守卫（在路由跳转之间进行判断）
router.beforeEach(async(to,from,next)=>{
    // 用户登录了 才有 token 未登录一定不会有
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if(token) {
        // 用户登录 还想去 login (不能去 留在首页)
        if(to.path == '/login' || to.path == '/register') {
            // next('/home')
            next()
        }else{
            // 登录 去的不是 login （其他任意。。）
            // 如果用户名已有
            if(name) {
                next()
            }else{
                // 没有用户信息 派发 action 让仓库存储用户信息跳转
                try {       
                    // 获取用户信息
                    await store.dispatch("getUserInfo")
                    next()
                } catch (error) {
                    // token 失效了。。。 重新登陆
                    // 清除 token   
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    }else{
        // 未登录
        let toPath = to.path
         if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            next('/login?redirect=' + toPath)
         }else{
            next()
         }
    }
})

export default router