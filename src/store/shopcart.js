import { reqCartList,reqDeleteCartById, reqUpdateCheckedByid } from "@/api"

const state ={
    cartList:[]
}
const mutations = {
    CARTLIST(state,cartList){
        state.cartList = cartList
    }
}
const actions = {
    async getCartList({ commit }){
        let result = await reqCartList()
        if(result.code == 200) {
            commit('CARTLIST',result.data)
        }
    },
    // 删除购物车某一个数据
    async deleteCartListBySkuId( { commit },skuId ){
        let result =  await reqDeleteCartById(skuId)
        if(result.code == 200 ){
            return 'ok'
        }else{
            return Promise.reject(new Error('falie'))
        }
    },
    // 修改购物车某个属性的选中状态 
    async updateCheckedById( { commit },{skuId,isChecked} ){
        let result =  await reqUpdateCheckedByid(skuId,isChecked)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除勾选的所有商品
    deleteAllCheckedCart({dispatch,getters}){
        //context 小仓库
        // 获取购物车中的全部产品    !!!!!!!!!!!!!!!!!!!!!!!!
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            // 遍历出来的产品判断 是否为勾选 是就调用删除的...
            let promise =  item.isChecked == 1? dispatch('deleteCartListBySkuId',item.skuId) : ''
            promiseAll.push(promise)
        });
        // Promise.all([p1,p2,p3]) 每一个都是 Promise 对象 如有一个失败就都失败，得全部成功才返回成功
       return Promise.all(promiseAll)
    },
    // 修改全部商品的状态
    updateAllCartIsChecked({dispatch,getters},isChecked){
        let promiseAll = [] 
        getters.cartList.cartInfoList.forEach(item => {  // ↑↑↑↑↑↑  因为本来就是给单个添加的
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    }
}
const getters = {
    cartList(state){
        return state.cartList[0] || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}