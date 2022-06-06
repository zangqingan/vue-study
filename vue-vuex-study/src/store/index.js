import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user';
import order from './modules/order';
import subject from './modules/subject';
import cart from './modules/cart'
import products from './modules/products'
Vue.use(Vuex)

//导出存储状态的仓库,用来存储vue应用的大部分的状态。
export default new Vuex.Store({
    modules:{
        user,
        order,
        subject,
        cart,
        products

    }
})