<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag" >
            <!-- 三级分类 -->
            <li class="with-x" v-show="searchParams.categoryName">{{ searchParams.categoryName }} <i @click="removeCategoryName">×</i></li>
            <!-- 搜索框 -->
            <li class="with-x" v-show="searchParams.keyword">{{ searchParams.keyword }} <i @click="removeKeyword">×</i></li>
            <!-- 品牌 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }} <i @click="removeTrademark">×</i></li>
            <!-- 售卖属性 -->
            <li class="with-x" v-for="(attrsValue, index) in searchParams.props" :key="index">{{ attrsValue.split(':')[1] }} <i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo = 'trademarkInfo' @attrsInfo = 'attrsInfo'/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder(1)" >
                  <a >综合 <span v-show="isDesc && isOne">↓</span>
                           <span v-show="isAsc && isOne">↑</span>
                  </a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder(2)" >
                  <a >销量 <span v-show="isDesc && isTwo">↓</span>
                           <span v-show="isAsc && isTwo">↑</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g" >
              <li class="yui3-u-1-5" v-for="(goodsList, index) in goodsList" :key="goodsList.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goodsList.id}`">
                      <img v-lazy="goodsList.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goodsList.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank"  :title="goodsList.title">{{ goodsList.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>

            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState,} from 'vuex'
  import SearchSelector from './SearchSelector/SearchSelector'
  export default {
    name: 'Search',
    data() {
      return {
        // 带参数给 服务器
        searchParams:{ 
          category1Id: "",
          category2Id: "",
          category3Id: "",
          // 分类名字
          categoryName: "",
          keyword: "",
          // 排序
          order: "1:desc",
          // 当前页数
          pageNo: 1,
          // 展示个数
          pageSize: 10,
          // 平台售卖属性操作所带来的参数
          props: [],
          // 品牌
          trademark: "",
        }
      }
    },
    components: {
      SearchSelector
    },
    // 在组件挂载完之前 执行一次
    beforeMount(){
      // 合并对象    给个对象，其余加合并的东西...
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
    },
    // 挂载完毕仅执行一次
    mounted(){
      // 在发请求之前 将 searchParams 参数发生变化的数值带给服务器
       this.getData()
      
    },
    computed:{
      // 映射到组件身上 并起名字 vuex数据映射到组件身上...
      // ...mapState({
      //   searchList: state => state.search.searchList
      // })
      // mapGetters 里的写法，传递的数组 因为 getters 是没有划分模块 【home，search】
      ...mapGetters([ 'goodsList', ]),
      // 判断是否为 综合 1111111111
      isOne(){
        return this.searchParams.order.indexOf('1') != -1
      },
      // 销量   222222222222
      isTwo(){    
        return this.searchParams.order.indexOf('2') != -1
      },
      // 下箭头
      isDesc(){
       return this.searchParams.order.indexOf('desc') != -1
      },
      // 上箭头
      isAsc(){
       return this.searchParams.order.indexOf('asc') != -1
      },
      ...mapState({
        total: state => state.search.searchList.total
      })
    },
    methods:{                 //自定义指令
      // 向服务器发请求获取 search 模块的数据（根据参数不同返回不同的数据进行展示）
      // 把这次请求封装成一个函数，当需要时再调用即可
      getData(){
        this.$store.dispatch('getSearchList',this.searchParams)
      },
      removeCategoryName(){
        // 把相应的字段设置为 undefined 当前的字段就不会带给服务器
        this.searchParams.categoryName = undefined
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
        this.getData()
        if(this.$route.params){
          // 地址栏也得改  直接 自己跳自己    本意是删除 query 但路径有 params 得保留
          this.$router.push({name:'search',params:this.$route.params})
        }
      },
      // 删除关键字
      removeKeyword(){
        this.searchParams.keyword = undefined
        if(this.$route.query){
          this.$router.push({name:'search',query:this.$route.query})
        }
        // this.getData()     因为此时的路径会发生相应的变化， watch会监听到，所以不用再发一次请求 10.22
                 //出发...
        this.$bus.$emit('clear')    
      },
      // 自定义事件的回调  品牌属性     10.22
      trademarkInfo(trademark){
        //                          品牌: "品牌ID:品牌名称"            示例: "1:苹果"
        this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
        this.getData()
      },
      removeTrademark(){
        this.searchParams.trademark = undefined
        this.getData()
      },
      // 售卖属性   
      attrsInfo(attrs,attrsValue){
        // 整理参数     商品属性的数组: ["属性ID:属性值:属性名"]  示例: ["2:6.0～6.24英寸:屏幕尺寸"]
        let props = `${attrs.attrId}:${attrsValue}:${attrs.attrName}`
        // 数组去重
        if(this.searchParams.props.indexOf(props) == -1){
          // 推数组
          this.searchParams.props.push(props)
        } 
        this.getData()
      },
      removeAttr(index){
        // 移除数组的某个数据 删除一个...
        this.searchParams.props.splice(index,1)     //split 切片...
        this.getData()
      },
      // 排序操作
      changeOrder(flag){
        // 综合 | 销量
        let orginFlag = this.searchParams.order.split(":")[0]
        // 上 | 下
        let orginSort = this.searchParams.order.split(":")[1]
        // 中间值..  装处理后的数据...
        let newOrder = ''
        if(flag == orginFlag) {
          // 重构...   真的想不到，还一直纠结怎么改变此时的状态     !!!!!!属性记得 带""
          newOrder = `${orginFlag}:${orginSort == "desc"? "asc":"desc"}`
        }else{
          newOrder = `${flag}:${"desc"}`
        }
        this.searchParams.order = newOrder
        this.getData()
      },
      //分页器数据的操作
      getPageNo(pageNo){
        // 整理参数
        this.searchParams.pageNo = pageNo
        // 重新发请求
        this.getData()
      }
      

    },
    // 数据监听：监听组件实例身上的属性的属性值变化
    watch:{
      $route(){
        // 重新整理参数
        Object.assign(this.searchParams,this.$route.params,this.$route.query)   // 10.21
        // 再次发请求
        this.getData()
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
      },
      
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>