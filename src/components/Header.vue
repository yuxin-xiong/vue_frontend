<template>
  <!-- 导航搜索栏 -->
  <div class="header-container">
    <el-row>
      <!-- 左侧搜索栏 -->
      <el-col :span="20"><div class="search-text">
        <el-input type="text"
                  v-model="keyWord" placeholder="请输入关键字"
                  style=";"
                  clearable
                  class="input-form">
        <el-button type="primary" 
                  slot="append" 
                  icon="el-icon-search" 
                  @click="onSubmit">搜索</el-button>

        </el-input>
      </div></el-col>
      <!-- 右侧导航 -->
      <el-col :span="4"><div class="nav-menu">
        <el-menu :default-active="activeIndex" 
                  background-color=""  
                  class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">登录</el-menu-item>
          <el-menu-item index="2">注册</el-menu-item>
          <el-menu-item index="3">GitHub</el-menu-item>
        </el-menu>  
      </div></el-col>
    </el-row>
</div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyWord:"",
      msg: "视觉行为识别系统",
      activeIndex: "1",
    };
  },
  methods: {
      onSubmit() {
        console.log("Hello world!");
      }
    }
};
</script>
<style lang="less" scoped>


.header-container{
  padding-top: 10px;
  .search-text{
  margin-left: 15%;
  padding-top: 15px;
  /deep/ .el-input__inner {
    height: 50px;
    font-size: large;
    width:100%;
  }
}

}



h1 {
  text-align: left;
  color: #21b3b9;
  letter-spacing: 5px;
  font-size: 3rem;
}

.el-menu-demo {
  width: 80%;
  margin: 0px auto;
  padding: 0px auto;
}

.top-left-edition span i {
  float: left;
  margin-right: 10px;
}

i,
input,
label {
  vertical-align: middle;
}

i {
  border: 0;
  display: block;
  cursor: pointer;
}

.top-left-edition span {
  float: left;
  font-size: 16px;
  color: #999999;
  line-height: 24px;
  margin-right: 40px;
}
</style>


