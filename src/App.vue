<template>
  <div class="app-container">
    <Header></Header>
    <!-- <Home></Home> -->
    <router-view></router-view>
    <!-- <MyImage></MyImage> -->
  </div>
</template>

<script>
import Header from "./components/Header";
// import MyImage from "./components/MyImage.vue"
// import Footer from "@/components/Footer";
// import Content from "@/components/Content";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Header,
    // MyImage 
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.app-container{
  width: 100%;
}
</style>
