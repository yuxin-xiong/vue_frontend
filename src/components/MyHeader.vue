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
        <el-menu-item index="/home/proimage">图片识别</el-menu-item>
        <el-menu-item index="/home/provideo">视频识别</el-menu-item>
      </el-menu>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios';
import EventBus from '../EventBus.js';
export default{
    name: "MyHeader",
    data() {
        return {
        server_url: "http://127.0.0.1:5000",      
        activeIndex:'1',
        keyWord:"",
        };
    },
    methods: {
        onSubmit() {
          // 当前路径在search-show
          if (this.$route.path === '/search-show') {
              axios.get(this.server_url+'/search', { params: { keyword: this.keyWord } })
              .then(response => {
                const data = response.data
                const imagePathList = data.map(item => {
                  return 'http://127.0.0.1:5000/static/images_512/' + item.image_path;
                });

                EventBus.$emit('data-updated', imagePathList);

              }).catch(error => {
                console.error(error);
              });
            } else {
              // 其他路径
              axios.get(this.server_url+'/search', { params: { keyword: this.keyWord } })
              .then(response => {
                // 请求成功的处理逻辑
                const data = response.data
                const imagePathList = data.map(item => {
                  return 'http://127.0.0.1:5000/static/images_512/' + item.image_path;
                });
                this.$router.push({name: 'SearchIndexShow', 
                                    params: {img_path_list: imagePathList}});
              }).catch(error => {
                // 请求失败的处理逻辑
                console.error(error);
              });
            }
    
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


