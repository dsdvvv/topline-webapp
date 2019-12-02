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
          <!-- van-list: 列表上滑加载更多功能
            v-model="loading": 用来控制上滑加载更多的loading加载中
            :finished="finished": 用来控制加载结束
                true: 不再加载更多, 直接显示finished-text="没有更多了"文本
                false: 在满足条件下继续触发加载更多
            finished-text="没有更多了": 设置没有数据之后提示的文本信息
            @load="onLoad": 上滑加载更多的自定义事件(上滑时自动调用)
            需求: 在load函数中
                1.发送请求
                2.加载数据
                3.展示列表
            列表组件(List)在初始化时会自动将loading设置为true,触发load事件
          -->
          <van-list v-model="loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad">
            <p>{{ item.name }}</p>
            <van-cell v-for="item in item.articles" :key="item" :title="item" />
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
      list: [], // 存储列表中数据
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
    // List组件初始化时会自动触发load事件
    onLoad () {
      /*

        */
      //  获取当前频道
      // 1.请求加载数据
      const activeChannel = this.channels[this.active]
      const articles = activeChannel.articles

      // 异步更新数据
      setTimeout(() => {
        // 2.将数据添加到当前频道的列表中

        for (let i = 0; i < 10; i++) {
          articles.push(articles.length + 1)
        }

        // 3.将loading设置为false
        // 加载状态结束
        // 关闭本次的loading状态, 它会哦安短当前数据是否够一个屏幕, 如果不够会继续onloading
        this.loading = false

        // 4.判断数据是否全部加载完毕,如果无数据, 将finished设置为true
        // 数据全部加载完成
        if (articles.length >= 40) {
          // 如果后续没有数据, 将finished设置为true, 之后不再触发onload
          activeChannel.finished = true
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
      //   console.log(res)
      const channels = res.data.data.channels
      channels.forEach(channel => {
        // 给每一个频道添加一个数据用来存储频道的文章列表
        channel.articles = []
        channel.finished = false // 频道的加载结束状态
      })
      this.channels = channels
    }
  }
}
</script>

<style lang="less" scoped>
</style>
