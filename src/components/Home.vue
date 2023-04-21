<template>
  <div class="home-container">
    <el-row>
      <el-col :span="4"><div class="side-navigation">
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
      </div></el-col>
      <el-col :span="20">
        <!-- <MyImage></MyImage> -->
        <router-view></router-view>
      </el-col>
    </el-row>
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
}


</script>
<style lang="less" scoped>
  .side-navigation{
    // width: 50px;
    margin-left: 190px;
    margin-top: -10px;
    /deep/.el-menu { 
      border-right: none; 
    }
    /deep/.el-menu-item {
        font-size: 17px;
    }

  }
</style>