import { v4 as uuidv4 } from 'uuid'

export const getUUID = () =>{
    // 先从本地储存获取 uuid 
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 如果没有
    if(!uuid_token){
        // 生成游客临时身份
        uuid_token = uuidv4();
        // 本地再存储一次
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    // 切记要有返回值 没有返回值就返回 undefined
    return uuid_token
}