import Vue from 'vue'

// 引入路由对象
import VueRouter from 'vue-router'
// 注册
Vue.use(VueRouter)

const routes = [
    // 路由和组件的映射关系
    {
        path:'/',//当前匹配的路径
        component: () => import('../views/Be'),//路径匹配时映射的组件，
        meta:{
            title:'首页'
        },
    },
    {
        path:'/home',
        name:'hmoe',
        meta:{
            title:'主页'
        },
        component: () => import('../views/Home'),
        children:[
            {
                path:'homechild',
                component:() => import('../views/Homechild')
            }
        ]
    },
    {
        path:'/dong/:id',
        component: () => import('../views/Dong'),
        // 路由动态参数解耦
        props:true,
        meta:{
            title:'动态路由参数'
        },
    },
    {
        path:'/query',
        component: () => import('../views/Query'),
        meta:{
            title:'查询字符串'
        },
    },
    {
        path:'/guide',
        component: () => import('../views/Guide'),
        meta:{
            title:'路由导航守卫'
        },
        // 路由独享守卫
        beforeEnter(to, from, next){
           console.log(`我是导航发生的第三步,我是路由独享的守卫:beforeEnter。`)
           next()
        }
    },

    // tabBar
    // {
    //     path: '/home',
    //     name: 'home',
    //     component: () => import('../pages/home.vue')
    //   },
    //   {
    //     path: '/category',
    //     name: 'category',
    //     component: () => import('../pages/category.vue')
    //   },
    //   {
    //     path: '/cart',
    //     name: 'cart',
    //     component: () => import('../pages/cart.vue')
    //   },
    //   {
    //     path: '/profile',
    //     name: 'profile',
    //     component: () => import('../pages/profile.vue')
    //   }
    
]
// 创建路由实例对象
const router = new VueRouter({
    // 配置路由和组件的映射关系
    routes
})

// 全局前置导航守卫
router.beforeEach((to,from,next) => {
    // 设置标题
    window.document.title  = to.meta.title
    // 判断 是不是指定路由
    if(to.path == '/guide'){
        console.log(`我是导航发生的第二步,我是全局前置导航守卫:beforeEach,我即将进入${to.path}路由我是从${from.path}过来的`)
        // 直接改变路由地址
        // return next('/home')
    }
    // 判断是否登陆
    if(window.localStorage.getItem('token')){
        next()
    }else{
        next('/login')
    }
    next()
})
// 全局后置导航守卫
router.afterEach((to, from) => {
    console.log(`我是导航发生的最后一个钩子了，导航已经确定是从${from.path}跳转到${to.path}的`)
})


export default router

