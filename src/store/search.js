import {reqGetSearchInfo} from '@/api'

const state = {
    searchList: {},
}
const mutations = {
    GETSEARCHLIST(state, searchList){
        state.searchList = searchList
    },
}
const actions = {
    async getSearchList({ commit },params = {}){
        // 当前这个 reqGetSearchInfo 这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        // params形参 是当用户派发 actions 的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if(result.code == 200){
            commit('GETSEARCHLIST',result.data)
            
        }
    }
}
const getters = {
    // 当前的 state 是当前（小仓库）的 state  不是大仓库 state 10.20
    attrsList(state){
        // 加入网不好，返回的应该是一个空数组
        return state.searchList.attrsList || []
    },
    goodsList(state){ 
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}