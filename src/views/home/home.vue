<template>
  <div class="home">
    <!-- 导航栏 -->
    <!-- <van-nav-bar title="首页" fixed /> -->
    <van-nav-bar flxed>
      <van-button
        class="search-button"
        slot="title"
        round
        type="info"
        size="small"
        @click="$router.push('/search')"
      >搜索</van-button>
    </van-nav-bar>

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
          <van-list
            v-model="loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <p>{{ item.name }}</p>

            <van-cell
              v-for="item in item.articles"
              :key="item.art_id.toString()"
              :title="item.title"
               @click="$router.push({
                name: 'article',
                // params 是固定的
                params: {
                  // key：动态路径参数的名字
                  // value：数据值
                  articleId: item.art_id
                }
              })"
            >
              <div slot="label">
                <van-grid :border="false" :column-num="3">
                  <van-grid-item v-for="(img, index) in item.cover.images" :key="index">
                    <van-image height="80" :src="img" lazy-load />
                  </van-grid-item>
                </van-grid>

                <div class="article-info">
                  <span>{{ item.aut_name }}</span>
                  <span>{{ item.comm_count }}</span>
                  <!-- 发布时间 -->
                  <span>{{ item.pubdate | relativeTime }}</span>
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <span>Hello</span>
      <div class="wap-nav" slot="nav-right" @click="isChannelShow = true">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>

    <!-- 频道管理弹窗组件 -->
    <!--
      v-model="show" 控制是否展示
      position="bottom" 弹出位置
      :style="{ height: '20%' }" 弹出高度
    -->
    <van-popup
      v-model="isChannelShow"
      closeable
      position="bottom"
      :style="{ height: '80%' }"
      @open="onChannelOpen"
    >
      <div class="channel-container">
        <!-- 我的频道 -->
        <van-cell title="我的频道" :border="false">
          <!-- <van-button type="danger" size="mini">编辑</van-button> -->
          <van-button type="danger" size="mini" @click="isEdit = !isEdit">{{ isEdit ? '完成' : '编辑' }}</van-button>
        </van-cell>
        <van-grid :gutter="10">
          <van-grid-item
            v-for="(item, index) in channels"
            :key="item.id"
            :text="item.name"
            @click="onChannelActiveOrDelete(item, index)"
          >
            <van-icon
              class="close-icon"
              slot="icon"
              name="close"
              size="14"
              v-show="isEdit && item.name !== '推荐'"
            ></van-icon>
          </van-grid-item>
        </van-grid>

        <van-cell title="推荐频道" :border="false" />
        <van-grid :gutter="10">
          <van-grid-item
            v-for="item in recommendChannels"
            :key="item.id"
            :text="item.name"
            @click="onChannelAdd(item)"
          />
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import { getArticles } from '@/api/article'
import { getAllChannels } from '@/api/channel'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'HomePage',
  components: {},
  props: {},
  data () {
    return {
      active: 0, // 控制激活的分页
      // list: [], // 存储列表中数据
      loading: false,
      isLoading: false, // 下拉刷新功能
      channels: [], // 存储请求到的用户频道数据
      isChannelShow: false, // 弹出层
      allChannels: [], // 所有频道列表
      isEdit: false // 控制删除频道关闭按钮的显示
    }
  },
  computed: {
    recommendChannels () {
      const arr = []
      // 遍历所有频道
      this.allChannels.forEach(channel => {
        const ret = this.channels.find(item => {
          return item.id === channel.id
        })

        // 如果我的频道列表中不包含当前遍历的频道，那我就把它收集到 arr 中
        if (!ret) {
          arr.push(channel)
        }
      })

      return arr
    }
  },
  watch: {
    channels () {
      setItem('channels', this.channels)
    }
  },
  created () {
    //   获取用户频道列表
    this.loadUserChannels()
  },
  methods: {
    // 列表上滑加载更多功能
    // List组件初始化时会自动触发load事件

    async onLoad () {
      // 当前频道
      const activeChannel = this.channels[this.active]
      // 当前频道的文章列表
      const articles = activeChannel.articles

      // 1.请求获取数据
      const res = await getArticles({
        channel_id: activeChannel.id, // 频道id
        // 获取下一页数据的时间戳, Date.now(): 当前最新数据
        timestamp: activeChannel.timestamp || Date.now(),
        with_top: 1
      })
      // 2.将数据的添加到当前频道的文章列表中
      // ...数组: 数组的展开操作符, 会将数组元素一个一个拿出来, 传递给使用的位置
      articles.push(...res.data.data.results)
      // 3.将loading设置为false
      this.loading = false
      /*
        4.判断:
          如果还有下一页数据, 则更新获取下一页数据的时间戳
          如果没有数据,将当前频道的finished设置为true
       */
      const preTimestamp = res.data.data.preTimestamp
      if (preTimestamp) {
        // 更新下一页数据的时间戳
        activeChannel.timestamp = preTimestamp
      } else {
        activeChannel.finished = true
      }
    },

    // 下拉刷新
    async onRefresh () {
      const activeChannel = this.channels[this.active] // 当前频道
      // 1.下滑获取最新的数据
      const res = await getArticles({
        channel_id: activeChannel.id,
        timestamp: Date.now(), // 获取最新数据: 传递最新时间即可
        with_top: 1
      })
      const articles = res.data.data.results
      // console.log(articles)
      // 2.将获取到的数据放到文章列表顶部
      activeChannel.articles.unshift(...articles)
      // 3.停止下滑刷新loading
      this.isLoading = false
      // 4.提示用户刷新成功
      const message = articles.length
        ? `更新了${articles.length}条数据`
        : '暂无数据更新'
      this.$toast(message) // toast: 轻提示

      /* setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500) */
    },
    // 获取用户频道列表
    async loadUserChannels () {
      let channels = []
      const localChannels = getItem('channels')
      if (localChannels) {
        // 如果有本地存储的频道列表就获取使用
        channels = localChannels
      } else {
        // 如果没有则请求线上推荐的频道列表
        const res = await getUserChannels()
        //   console.log(res)
        const onLineChannels = res.data.data.channels
        onLineChannels.forEach(channel => {
          // 给每一个频道添加一个数据用来存储频道的文章列表
          channel.articles = []
          channel.finished = false // 频道的加载结束状态
          channel.timestamp = null // 用于获取频道下一页数据的时间戳
        })
        channels = onLineChannels
      }
      this.channels = channels
    },
    async onChannelOpen () {
      const res = await getAllChannels()
      const allChannels = res.data.data.channels
      allChannels.forEach(channel => {
        channel.articles = [] // 频道的文章列表
        channel.finished = false // 频道的加载结束状态
        channel.timestamp = null // 获取频道下一页数据的时间戳
      })
      this.allChannels = allChannels
    },
    onChannelAdd (item) {
      // 将点击的频道添加到我的频道中
      this.channels.push(item)
    },
    onChannelActiveOrDelete (item, index) {
      if (this.isEdit && item.name !== '推荐') {
        // 编辑状态, 执行删除操作
        this.channels.splice(index, 1)
      } else {
        // 非编辑状态, 执行频道切换
        this.active = index
        this.isChannelShow = false

        // setItem('channels', this.channels)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  .search-button {
    width: 100%;
    background-color: #5babfb;
  }
  /deep/ .channel-container {
    padding-top: 40px;
  }
  /deep/ .van-grid-item__icon-wrapper {
    position: absolute;
    top: -10px;
    right: 0;
  }
  .article-info span {
    margin-top: 10px;
  }
}
.van-tabs {
  // 频道列表
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    z-index: 2;
    right: 0;
    left: 0;
  }
  // 频道内容
  /deep/ .van-tabs__content {
    margin-top: 90px;
  }
  .wap-nav {
    position: sticky;
    right: 0;
    display: flex;
    align-items: center;
    background-color: #fff;
    opacity: 0.8;
  }
}
</style>
