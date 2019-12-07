<template>
  <div class="search">
    <!-- 搜索框 -->
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @input="onSerchInput"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <!-- 联想建议 -->
    <van-cell-group>
      <van-cell
        title="单元格"
        icon="search"
        v-for="item in suggestions"
        :key="item"
      >
        <!-- 我们要把 item 处理成带有高亮的字符串 -->
        <!-- 过滤器：专门用于文本格式化，但是它只能用在 {{}} 和 v-bind 中 -->
        <div slot="title" v-html="highlight(item)"></div>
      </van-cell>

    </van-cell-group>
    <!-- 搜索历史记录 -->
    <van-cell-group>
      <van-cell title="历史记录">
        <span>全部删除</span>&nbsp;&nbsp;
        <span>完成</span>
        <van-icon name="delete" />
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close" />
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
export default {
  name: 'SearchPage',
  data () {
    return {
      str: 'hello <span style="color: red">world</span>',
      searchText: '', // 用户输入的搜索文本
      suggestions: [] // 搜索联想建议数据列表
    }
  },
  methods: {
    onSearch () {

    },
    async onSerchInput () {
      const searchText = this.searchText.trim()
      if (!searchText) {
        return
      }
      const res = await getSuggestions(this.searchText)
      this.suggestions = res.data.data.options
    },
    highlight (str) {
      /*
        this.searchText: 这里一切都是字符串
        如果想要动态创建一个正则表达式, 使用new RegExp
        它会根据祖父穿创建一个正则表达式对象
        参数2: 用来指定匹配模式, 例如 g: 全局; i: 忽略大小写
      */
      const reg = new RegExp(this.searchText, 'ig')
      return str.replace(reg, `<span style="color: red">${this.searchText}</span>`)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
