import { reqAddressInfo, reqOrderInfo } from "@/api"

const state = {
    address: [],
    orderinfo:{}
}
const mutations = {
    USERADDRESS(state,address){
        state.address = address
    },
    ORDERINFO(state,orderinfo){
        state.orderinfo = orderinfo
    }
}
const actions = {
    // 我的订单 用户地址信息
    async getUserAddress({commit}){
        let result = await reqAddressInfo()
        if(result.code == 200){
            commit('USERADDRESS',result.data)
        }
    },
    // 我的订单  用户清单 
    async getOrderInfo({ commit }){
        let result = await reqOrderInfo()
        if(result.code == 200 ){
            commit('ORDERINFO',result.data)
            console.log(result);
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}