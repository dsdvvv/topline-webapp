<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="首页"></van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 文章列表 -->
        <!-- van-pull-refresh: 下拉刷新功能 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- van-list: 列表上滑加载更多功能 -->
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
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
      isLoading: false, // 下拉刷新功能
      channels: [] // 存储请求到的用户频道数据
    }
  },
  computed: {},
  watch: {},
  created () {
    //   获取用户频道列表
    this.loadUserChannels()
  },
  methods: {
    // 列表上滑加载更多功能
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
    },
    // 获取用户频道列表
    async loadUserChannels () {
      const res = await getUserChannels()
      console.log(res)
      this.channels = res.data.data.channels
    }
  }
}
</script>

<style lang="less" scoped>
</style>
