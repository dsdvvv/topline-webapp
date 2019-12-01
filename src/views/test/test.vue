<template>
    <div>
        <h3>测试页面</h3>
        <p>{{ $store.state.count }}</p>
        <button @click="$store.commit('increment')">点击+1</button>
    </div>
</template>

<script>
export default {
  name: 'TestPage'
}
</script>

<style lang="less" scoped>
</style>
