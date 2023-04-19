<template>
  <div class="app_container">
    <Header></Header>
    <Home></Home>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import Header from "./components/Header";
import Home from './components/Home.vue';
// import Footer from "@/components/Footer";
// import Content from "@/components/Content";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Header,
    Home
  },
  methods: {},
};
</script>

<style lang="less" scoped>

</style>
