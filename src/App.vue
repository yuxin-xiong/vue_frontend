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
