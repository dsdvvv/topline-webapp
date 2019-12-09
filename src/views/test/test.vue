<template>
    <div>
        <h3>测试页面</h3>
        <p>{{ $store.state.count }}</p>
        <button @click="$store.commit('increment')">点击+1</button>
        <hr />

        <div>
          <div ref="messageDiv">{{ message }}</div>
          <button @change="onchangemessage">点击</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'TestPage',
  data () {
    return {
      message: 'Hello Vue.js'
    }
  },
  methods: {
    onchangemessage () {
      this.message = 'Hello world'
      // console.log(this.message)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
