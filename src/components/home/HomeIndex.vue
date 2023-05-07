<template>
  <div class="posfix">
    <!-- 首页标题背景栏 -->
    <div class="title-container">
      <h1>视觉行为识别系统</h1>
      <p>Grounded Situation Recongnition System</p>
    </div>

    <!-- 首页下部主体内容 -->
    <div class="home-container">
      <!-- 侧边切换栏 -->
      <div class="side-navigation">
        <el-menu :router='true'>
          <el-menu-item index="/home/proimage">
            <i class="el-icon-picture"></i>
            <span slot="title">图像识别</span>
          </el-menu-item>
          <el-menu-item index="/home/provideo">
            <i class="el-icon-video-camera"></i>
            <span slot="title">视频识别</span>
          </el-menu-item>
        </el-menu>
      </div>
      <!-- 右边图像区 -->
      <div class="right-content"> 
         <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {};
  },
  components: {

  },
  methods: {},
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}

.title-container {
  // padding-top: 50px;
  // margin-top: 50px;
  height: 500px;
  font-family: Arial, "Microsoft YaHei";
  position: relative;
  // background-color: pink;
  background-image: url("../../assets/image/OIP.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 50%, 50%;

  h1 {
    position: absolute;
    left: 50%;
    top: 6%;
    color: #575a5a;
    letter-spacing: 8px;
    font-size: 56px;
    height: auto;
    transform: translate(-50%);
  }

  p {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-30%);
    color: #3a3939;
    font-size: 30px;
  }
}
.home-container{
  // background-color: pink;
  height: 600px;
  .side-navigation {
    float: left;
    width: 20%;
    height: 100%;
    text-align: right;
    // background-color: greenyellow;
    /deep/.el-menu {
      border-right: none;
      margin-left: 200px;
    }
    /deep/.el-menu-item {
      font-size: 17px;
    }
  }
  .right-content{
    // background-color: aqua;
    height: 100%;
    width: 80%;
    float: left;
  }


}</style>