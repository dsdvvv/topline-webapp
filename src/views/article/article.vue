<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="文章详情"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 loading -->
    <van-loading class="article-loading" v-if="loading" />
    <!-- /加载中 loading -->

    <!-- 文章详情 -->
    <div class="detail" v-else-if="article.title">
      <h3 class="title">{{ article.title }}</h3>
      <div class="author">
        <van-image round width="1rem" height="1rem" fit="fill" :src="article.aut_photo" />
        <div class="text">
          <p class="name">{{ article.aut_name }}</p>
          <p class="time">{{ article.pubdate | relativeTime }}</p>
        </div>
        <van-button
          round
          size="small"
          type="info"
          @click="onFollow"
        >{{ article.is_followed ? '取消关注' : '+ 关注' }}</van-button>
      </div>
      <div class="content" v-html="article.content" />
      <div class="zan">
        <van-button
          round
          size="small"
          hairline
          type="primary"
          plain
          icon="good-job-o"
          @click="onLike"
        >{{ article.attitdule === 0 ? '取消点赞' : '点赞' }}</van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button
          round
          size="small"
          hairline
          type="danger"
          plain
          icon="delete"
          @click="onDislike"
        >{{ article.attitdule === 0 ? '取消喜欢' : '喜欢' }}</van-button>
      </div>
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败的消息提示 -->
    <div class="error" v-else>
      <p>网络超时，点击 <a href="#" @click.prevent="loadArticle">刷新</a> 试一试。</p>
    </div>
    <!-- /加载失败的消息提示 -->

    <!-- 文章评论 -->
    <article-comment />
  </div>
</template>

<script>
import { getArticle, addLike, deleteLike, addDislike, deleteDislike } from '@/api/article'
import { followUser, unFollowUser } from '@/api/user'
import ArticleComment from './components/article-comment'

export default {
  name: 'ArticleIndex',
  components: {
    ArticleComment
  },
  props: {
    articleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      loading: true, // 控制加载中的 loading 状态
      article: {} // 文章详情
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    // 展示文章基本数据及loading
    async loadArticle () {
      // this.articleId.toString()
      // const res = await getArticle(this.articleId.toString())
      // this.article = res.data.data
      // console.log(this.article)
      // 开启loading
      this.loading = true
      try {
        const { data } = await getArticle(this.$route.params.articleId)
        this.article = data.data
      } catch (error) {
        // 如果请求出错就意味着获取数据失败了，提示用户加载失败
        console.log(error)
      }
      // 无论成功还是失败都结束loading的加载状态
      this.loading = false
    },
    // 关注与取消关注
    async onFollow () {
      const userId = this.article.aut_id
      // 如果已关注则取消关注
      if (this.article.is_followed) {
        await unFollowUser(userId)
      } else {
        // 如果未关注则点击关注
        await followUser(userId)
      }
      // 更新视图
      this.article.is_followed = !this.article.is_followed
    },
    // 点赞与取消点赞
    async onLike () {
      // 如果已关注则取消
      if (this.article.attitude === 1) {
        await deleteLike(this.articleId)
        this.article.attitude = -1
      } else {
        // 如果未关注则关注
        await addLike(this.articleId)
        this.article.attitude = 1
      }
    },
    // 喜欢与取消喜欢文章
    async onDislike () {
      // 如果已关注，则取消关注
      if (this.article.attitude === 0) {
        await deleteDislike(this.articleId)
        this.article.attitude = -1
      } else {
        // 如果没有关注，则关注
        await addDislike(this.articleId)
        this.article.attitude = 0
      }
    }

  }
}
</script>

<style scoped lang='less'>
.article-container{
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.article-loading {
  padding-top: 100px;
  text-align: center;
}
.error{
  padding-top: 100px;
  text-align: center;
}
.detail {
  padding: 50px 10px;
  .title {
    font-size: 16px;
  }
  .zan{
    text-align: center;
  }
  .author {
    padding: 10px 0;
    display: flex;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.3;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    font-size: 18px;
    /deep/ img{
      max-width:100%;
      background: #f9f9f9;
    }
  }
}
</style>
