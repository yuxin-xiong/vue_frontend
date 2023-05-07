<template>
  <div class="app-container">
    <MyHeader></MyHeader>
    <router-view></router-view>
  </div>
</template>

<script>

import MyHeader from "@/components/MyHeader.vue"
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
    // 在组件挂载完成后修改标签页标题
    document.title = '视觉行为识别系统';
  },
  components: {
    MyHeader,
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.app-container{
  position: relative;
}
</style>
