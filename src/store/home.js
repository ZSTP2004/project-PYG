import { reqCategoryList, reqGetBannerList, reqgetFloorList } from "@/api"

// 仓库 存储数据的地方
const state = {
    // 根据服务器返回对象|数组 （根据接口返回值初始化）
    categoryList: [],
    bannerList: [],
    floorList:[]
}
// 修改 state 的唯一手段（修改数据的地方）
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {  //10.18
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }

}
// 处理 action 可以书写自己的业务逻辑 也可以处理一步
const actions = {
    // 通过 API 里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }
    },
    async getBannerList({ commit }) { //10.18
        let result = await reqGetBannerList()
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data)
        }
    },
    async getFloorList({ commit }) {
        let result = await reqgetFloorList()
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data)
        }
    },
}
// 简化数据的地方（为简化数据而生）
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}