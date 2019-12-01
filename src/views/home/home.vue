<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="首页"></van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab title="标签 1">
        <!-- 文章列表 -->
        <!-- van-pull-refresh: 下拉刷新功能 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- van-list: 列表上滑加载更多功能 -->
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 2">内容 5</van-tab>
      <van-tab title="标签 3">内容 6</van-tab>
      <van-tab title="标签 4">内容 7</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  components: {},
  props: {},
  data () {
    return {
      active: 0, // 默认激活哪页
      list: [],
      loading: false,
      finished: false,
      isLoading: false // 下拉刷新功能
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
