// API统一管理
import requests from "./request"
// 引入mock
import mockRequest from "./mockAjax"
import requsets from "./request"
// 三级联动接口
// /api/product/getBaseCategoryList get 无参数
export const reqCategoryList  = ()=> requests({url:'/product/getBaseCategoryList',method:'get'})

// 大轮播图接口
// Mock.mock("/mock/banner", { code: 200, data: banner }) 
export const reqGetBannerList = ()=> mockRequest({url:'/banner', method:'get'})

// Floor 接口
// Mock.mock("/mock/floor", { code: 200, data: floor })
export const reqgetFloorList = ()=> mockRequest({url:'floor',method:'get'})

// serach 接口   /api/list 请求方式 post
// 当前这个接口 给服务器传递参数 params 至少是一个空对象  需要传递参数时：get 用 params  post 用 data
//                                                                                ↓          ↓
export const reqGetSearchInfo = (params) => requests({url:'/list',method:'post',data:params})

// 产品详细信息的接口   /api/item/{ skuId }         请求方式 get
export const reqGoodInfo = (skuId) => requests({url:`/item/${ skuId }`,method:'get'})

// /api/cart/addToCart/{ skuId }/{ skuNum }    请求方式  post
// 加入购物车。。。
export const reqAddOrUpdateShopCart = (skuId,skuNum) =>requsets({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

// 读取购物车   /api/cart/cartList   get
export const reqCartList = () => requests({url:'/cart/cartList',method:'get'})

// 删除购物车产品的接口 /api/cart/deleteCart/{skuId} delete
export const reqDeleteCartById = (skuId) => requsets({url:`/cart/deleteCart/${skuId}`,method:'delete'})

// 修改商品的选中状态 /api/cart/checkCart/{skuID}/{isChecked}    get
export const reqUpdateCheckedByid = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 验证码 /api/user/passport/sendCode/{phone}  get
export const reqGetCode = (phone) => requsets({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 注册 /api/user/passport/register    post
export const reqUserRegiseter = (data) => requsets({url:'/user/passport/register',data,method:'post'})

// 登录 /api/user/passport/login   post
export const reqUserLogin = (data) => requests({url:'/user/passport/login',data,method:'post'})

//获取用户信息   /api/user/passport/auth/getUserInfo get
export const reqUserInfo = () => requests({url:'/user/passport/auth/getUserInfo',method:'get'})

// 退出登录 /api/user/passport/logout   get
export const reqLogout = () => requsets({url:'/user/passport/logout',method:'get'})

// 我的订单  获取用户地址信息 /api/user/userAddress/auth/findUserAddressList         get
export const reqAddressInfo = () =>requsets({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

// 我的订单  获取用户清单信息 /api/order/auth/trade   get
export const reqOrderInfo  = () => requests({url:'/order/auth/trade',method:'get'})

// 提交订单相关接口  /api/order/auth/submitOrder?tradeNo={tradeNo}   post
export const reqSubmitOrder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

// 获取支付信息  /api/payment/weixin/createNative/{orderId}         get
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 获取支付状态 /api/payment/weixin/queryPayStatus/{orderId}    get
export const reqPayStatus = (orderId) => requsets({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取个人中心 /api/order/auth/{page}/{limit}       get
export const reqMyOrderList = (page,limit) =>requests({url:`/order/auth/${page}/${limit}`,method:'get'})