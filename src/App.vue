<template>
  <div class="app-container">
    <MyHeader></MyHeader>
    <router-view></router-view>
    <MyFooter></MyFooter>
  </div>
</template>

<script>

import MyHeader from "@/components/MyHeader.vue"
import MyFooter from "@/components/MyFooter.vue"
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    MyHeader,
    MyFooter,
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.app-container{
  position: relative;
}
</style>
