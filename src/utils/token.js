// 对外暴露一个函数
// 存储 token
export const setToken = (token)=> {
    localStorage.setItem('TOKEN', token)
}
// 获取 token
export const getToken = ()=> {
    return localStorage.getItem('TOKEN')
}
// 请求本地存储的 token
export const removeToken = ()=> {
    localStorage.removeItem('TOKEN')
}