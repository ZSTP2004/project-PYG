import { reqAddOrUpdateShopCart, reqGoodInfo, } from "@/api"
import { getUUID } from "@/utils/uuid_token"

const state = {
    goodInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
}
const mutations = { 
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}
const actions = {
    // 售卖属性详细信息
    async getGoodInfo( { commit },skuId ){
        let result = await reqGoodInfo(skuId)
        if(result.code == 200){
            commit('GETGOODINFO',result.data )
        }
    },
    async addOrUpdateShopCart({ commit },{skuId, skuNum}){
        // 服务器写入数据成功，并没有返回其他数据，只是返回 code == 200  代表此处请求成功
        // 所以不用写三连环存储数据
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if(result.code == 200) {
            return "ok"
        }else{
            // 代表购物车加入失败
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
    // 路径导航信息的数据
    categoryView(state){
        return state.goodInfo.categoryView || {}
    },
    // 产品信息
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
