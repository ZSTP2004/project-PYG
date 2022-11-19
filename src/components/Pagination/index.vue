<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-show="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-show="startNumAndEndNum.start > 2">···</button>

    <!-- 中 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-show="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <!-- 下 -->
    <button v-show="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-show="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  //      当前页码    展示多少    一共多少    连续页码个数
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 实际 一共多少页
    totalPage() {
      //      向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 起始页和结尾页
    startNumAndEndNum() {
      let start = 0,
        end = 0;
      // 解构           后面就不用写this了 。。。
      const { pageNo, totalPage, continues } = this;
      if (continues > totalPage) {
        // 3 4 5 6 7
        start = 1;
        end = totalPage;
      } else {
        start = pageNo - parseInt(continues / 2); // 4 5 6 7 8 9 10
        end = pageNo + parseInt(continues / 2);

        // 起始页小于1 尾页大于实际页
        if (start < 1) {
          //      -1 0 1 2 3
          start = 1; //      0 1 2 3 4      0 1 2 3 4 5 6
          end = continues; //页码数
        }
        if (end > totalPage) {
          // 1 2 3 4 5 6 7
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      return { start, end }; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: red;
      color: #fff;
    }
  }
}
</style>
