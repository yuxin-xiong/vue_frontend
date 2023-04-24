<template>
  <!-- 顶部导航搜索栏 -->
  <div class="header-container">
    <div class="left-logo">
        <img src="../assets/image/logo.jpg" width="60px" height="60px"/>
    </div>
    <div class="center-search">
        <el-input type="text"
                  v-model="keyWord" placeholder="请输入关键字"
                  clearable
                  class="input-form">
        <el-button type="primary" 
                  slot="append" 
                  icon="el-icon-search" 
                  @click="onSubmit">搜索</el-button>
        </el-input>
    </div>
    <div class="right-nav">
        <el-menu :default-active="activeIndex" 
                  :router=true 
                  menu-trigger="click" 
                  class="nav-menu" mode="horizontal">
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/login">登录</el-menu-item>
          <el-menu-item index="/github">GitHub</el-menu-item>
        </el-menu>
    </div>
  </div>
  
</template>

<script>
export default{
    name: "MyHeader",
    data() {
        return {
        activeIndex:'1',
        keyWord:"",
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
a{
  text-decoration: none;
}
.header-container{
    height: 60px;
    margin-top: 15px;
    
    .left-logo{
        width: 20%;
        float: left;
        height: 60px;
        position: relative;
        img{     
            position: absolute;
            // left: 50%;
            right:5%
            // transform: translate(0%,0%);
        }
    }

    .center-search{
        width: 60%;
        float: left;
        height: 60px;
        margin-top: 5px;
        /deep/ .el-input__inner {
            height: 50px;
            font-size: large;
            width:100%;
        }
    }

    .right-nav{
        width:20%;
        float: left;
        height: 60px;
     .nav-menu{
            width: 80%; 
            border-bottom: none;    
        }
    }
}
/deep/ .el-menu-item{
    font-size: 16px !important;

}
/deep/ .el-input-group__append{
    font-size: 16px;
    background-color: rgb(12, 158, 249);
    color: rgb(253, 254, 254);
}
</style>


