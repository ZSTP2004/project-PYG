export default [
    {
        path:"/center",
        component:()=>import('@/pages/Center'),
        redirect:"/center/myorder",
        meta:{show:true},
        // 二级路由
        children:[
            {
                path:'myorder',
                component:()=>import('@/pages/Center/myOrder'),

            },
            {
                path:'grouporder',
                component:()=>import('@/pages/Center/groupOrder')
            },
        ]
    },
    {
        path:"/home",
        component:()=>import('@/pages/Home'),
        meta:{show:true}
    },
    {
        path:"/search/:keyword?",
        component:()=>import('@/pages/Search'),
        meta:{show:true},
        name:'search'
    },
    {
        path:"/login",
        component:()=>import('@/pages/Login'),
        meta:{show:false}
    },
    {
        path:"/register",
        component:()=>import('@/pages/Register'),
        meta:{show:false}
    },
    {
        // 路由重定向，运行时让他定在首页
        path:'*',
        redirect:"/home"
    },
    {
        path:"/detail/:skuId",
        component:()=>import('@/pages/Detail'),
        meta:{show:true}
    },
    // 添加到购物车...
    {
        path:"/addcartsuccess",
        name:'addcartsuccess',
        component:()=>import('@/pages/AddCartSuccess'),
        meta:{show:true}
    },
    // 结算页面 ShopCart
    {
        path:"/shopcart",
        name:'shopcart',
        component:()=>import('@/pages/ShopCart'),
        meta:{show:true}
    },
    // 相关订单
    {
        path:"/trade",
        name:'trade',
        component:()=>import('@/pages/Trade'),
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path == '/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    // 提交订单
    {
        path:"/pay",
        name:'pay',
        component:()=>import('@/pages/Pay'),
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path == '/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    // 订单状态
    {
        path:"/paysuccess",
        name:'paysuccess',
        component:()=>import('@/pages/PaySuccess'),
        meta:{show:true}
    },
]