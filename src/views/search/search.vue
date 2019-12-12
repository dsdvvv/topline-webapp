<template>
  <div class="search">
    <!-- 搜索框 -->
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @input="onSearchInput"
    >
      <div slot="action" @click="onSearch(searchText)">搜索</div>
    </van-search>

    <!-- 联想建议 -->
    <van-cell-group v-model="searchText">
      <van-cell
        title="单元格"
        icon="search"
        v-for="item in suggestions"
        :key="item"
        @click="onSearch(item)"
      >
        <!-- 我们要把 item 处理成带有高亮的字符串 -->
        <!-- 过滤器：专门用于文本格式化，但是它只能用在 {{}} 和 v-bind 中 -->
        <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
    </van-cell-group>
    <!-- 搜索历史记录 -->
    <van-cell-group>
      <van-cell title="历史记录">
        <div v-show="isDeleteShow">
          <span @click="searchHistories = []">全部删除</span>&nbsp;&nbsp;
          <span @click="isDeleteShow = false">完成</span>
        </div>
        <van-icon name="delete" v-show="!isDeleteShow" @click="isDeleteShow = true" />
      </van-cell>
      <van-cell :title="item" :key="item" v-for="(item, index) in searchHistories" @click="onSearch(item)">
        <van-icon name="close" v-show="isDeleteShow" @click="searchHistories.splice(index, 1)" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
import { getItem, setItem } from '@/utils/storage'
import { debounce } from 'lodash'

export default {
  name: 'SearchPage',
  data () {
    return {
      str: 'hello <span style="color: red">world</span>',
      searchText: '', // 用户输入的搜索文本
      suggestions: [], // 搜索联想建议数据列表
      searchHistories: getItem('search-histories') || [], // 搜索历史记录
      isDeleteShow: false // 控制删除历史记录的显示状态
    }
  },
  watch: {
    searchHistories () {
      console.log('监视到 searchHistories 改变了')
      setItem('search-histories', this.searchHistories)
    }
  },
  methods: {
    onSearch (q) {
      if (!q.trim()) {
        return
      }
      // 在跳转之前将搜索的关键字记录到搜索历史中
      const index = this.searchHistories.indexOf(q)
      if (index !== 1) {
        // 不要重复的
        this.searchHistories.splice(index, 1)
      }
      // 最新的放到上面
      this.searchHistories.unshift(q)
      // 将搜索历史记录放到本地存储用于持久化
      setItem('search-histories', this.searchHistories)
      this.$router.push(`/search/${q}`)
    },
    /* async onSerchInput () {
      const searchText = this.searchText.trim()
      if (!searchText) {
        return
      }
      const res = await getSuggestions(this.searchText)
      this.suggestions = res.data.data.options
    }, */

    // 联想建议
    onSearchInput: debounce(async function () {
      const searchText = this.searchText.trim()
      if (!searchText) {
        return
      }
      const res = await getSuggestions(this.searchText)
      this.suggestions = res.data.data.options
    }, 300),
    highlight (str) {
      /*
        this.searchText: 这里一切都是字符串
        如果想要动态创建一个正则表达式, 使用new RegExp
        它会根据祖父穿创建一个正则表达式对象
        参数2: 用来指定匹配模式, 例如 g: 全局; i: 忽略大小写
      */
      const reg = new RegExp(this.searchText, 'ig')
      return str.replace(
        reg,
        `<span style="color: red">${this.searchText}</span>`
      )
    }
  }
}
</script>

<style lang="less" scoped>
</style>
