<template>
  <div >
    <el-row>
      <!-- 左侧上传视频区 -->
      <el-col :span="15"><div class="img-card">
        <!-- 图像卡片 -->
        <el-card class="box-card">
          <div class="video-player">
            <video ref="videoPlayer" 
                   width="620" height="340"
                   style="margin:auto"
                   controls
                   autoplay
                   muted>
            </video>
            <el-button v-show="showbutton"
                      type="primary"
                      icon="el-icon-upload"
                      class="download_bt"
                      v-on:click="true_upload">
                      选择视频
                      <input type="file" 
                             accept="video/*" 
                             style="display: none"
                             ref="localVideoInput" 
                             @change="playLocalVideo" />
            </el-button>
            <el-button type="primary"
                       icon="el-icon-upload" 
                       class="download_bt"
                       v-on:click="cutPicture">
                    点我截图
            </el-button>

            <!-- <canvas id="myCanvas" width="343" height="200"></canvas> -->

          </div>


          <div class="demo-image__preview1">
            <div>
              <el-image :src="url_1"
                        class="image_1"
                        :preview-src-list="srcList"
                        style="border-radius: 3px 3px 0 0">
              </el-image>
            </div>

            <div class="img_info_1" style="border-radius: 0 0 5px 5px">
              <span style="color: white; letter-spacing: 6px">原始图像</span>
            </div>
          </div>
          <div class="demo-image__preview2">
            <div
              v-loading="loading"
              element-loading-text="处理中,请耐心等待"
              element-loading-spinner="el-icon-loading"
            >
              <el-image
                :src="url_2"
                class="image_1"
                :preview-src-list="resList"
                style="border-radius: 3px 3px 0 0"
              >
                <div slot="error">
                  <div slot="placeholder" class="error">等待上传1</div>
                </div>
              </el-image>
            </div>
            <div class="img_info_1" style="border-radius: 0 0 5px 5px">
              <span style="color: white; letter-spacing: 4px">检测结果</span>
            </div>
          </div>
        </el-card>
      </div></el-col>
      
      <!-- 右侧信息区 -->
      <el-col :span="5"><div class="info-card">
        <!-- 实体结果 -->
        <el-card style="border-radius: 8px">
          <div slot="header" class="res-header">
            <span class="res-title">video识别结果</span>
            <el-button v-show="!showbutton"
              style="margin-left: 35px"
              type="primary"
              icon="el-icon-upload"
              class="download_bt"
              v-on:click="true_upload2">
              重新选择图像
              <input ref="upload2"
                style="display: none"
                name="file"
                type="file"
                @change="upload_file"/>
            </el-button>
          </div>
          <!-- 动词结果 -->
          <h1 class="res-verb">{{ 'Verb:'+ image_verb }}</h1>
          
          <el-table
            :data="imageInfo_list"
            v-loading="loading"
            element-loading-text="数据正在处理中，请耐心等待"
            element-loading-spinner="el-icon-loading"
            lazy
            stripe
            border
            class="res-table"
            :header-cell-style="{background:'#e6ebe9',fontFamily:'Georgia, serif',fontSize:'1.3em'}"
            :cell-style="{color: '#8b500d', fontFamily: 'Times New Roman',fontSize:'1.2em'}"
          >
            <el-table-column prop="role" label="语义角色" width="120px">
            </el-table-column>
            <el-table-column prop="noun" label="实体名词" width="250px">
            </el-table-column>
            <el-table-column prop="color" label="颜色框" width="128px">
              <template slot-scope="scope">
                <el-button :style="{ backgroundColor: 'rgb'+scope.row.color }"></el-button>
              </template>
            </el-table-column>
          </el-table>

        </el-card>
      </div></el-col>
    </el-row>
  </div>
</template>

<script> 
  import axios from "axios";

  export default{
    name:'MyImage',
    data(){
      return {
        server_url: "http://127.0.0.1:5000",        
        // 原始图像和结果图像
        url_1: "",
        url_2: "",
        //el-image中用来查看大图
        srcList: [],
        resList: [],
        //返回的动词结果
        image_verb:'sitting',
        //返回的图像信息
        imageInfo_list: [
          {
            "color": "(232, 126, 253)",
            "noun": "noun",
            "role": "role"
          }
        ],     
        // 控制重新选择图像按钮的展示
        showbutton: true,
        //控制是否显示加载中
        loading: false,

        // feature_list_1: [],
        // activeName: "first",
        // active: 0,
        // centerDialogVisible: true,
        // dialogTableVisible: false,
        // textarea: "",
        // visible: false,
        // table: false,
        // isNav: false,

        feat_list: [],
        url: "",

        wait_return: "等待上传",
        wait_upload: "等待上传",
        percentage: 0,
        fullscreenLoading: false,
        opacitys: {
          opacity: 0,
        },
      };
    },
    created: function () {
      document.title = "视觉行为识别系统";
    },
    methods: {
      true_upload() {
        this.$refs.localVideoInput.click();
      },
      true_upload2() {
        this.$refs.upload2.click();
      },
      next() {
        this.active++;
      },
      playLocalVideo() {
        // 获取 input 标签
        const input = this.$refs.localVideoInput;
        // 判断用户是否选择了视频
        if (input.files && input.files[0]) {
          const file = input.files[0];
          const url = this.getObjectURL(file)
          // const url = URL.createObjectURL(file);
          // 将 URL 赋值给 video 标签的 src 属性
          this.$refs.videoPlayer.src = url;
        }
      },
      cutPicture() {
        this.url_1='';
        const video = this.$refs.videoPlayer;
        console.log(video)

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL();
        console.log(canvas);
        this.url_1 = dataURL;

      },
      // 获得目标文件
      getObjectURL(file) {
        var url = null;
        if (window.createObjcectURL != undefined) {
          url = window.createOjcectURL(file);
        } else if (window.URL != undefined) {
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },
      // 上传文件
      upload_file(e) {
        this.url_1 = "";
        this.url_2 = "";
        this.srcList = [];
        this.resList = [];
        this.imageInfo_list = [];
        this.loading = true;
        this.showbutton = false;
        // console.log(e)
        let file = e.target.files[0];
        // console.log(file)
        this.url_1 = this.$options.methods.getObjectURL(file);
        // console.log("url1:"+this.url_1)
        let param = new FormData(); //创建form对象
        param.append("file", file, file.name); //通过append向form对象添加数据

        let config = {
          headers: { "Content-Type": "multipart/form-data" },
        }; //添加请求头
        axios
          .post(this.server_url + "/upload", param, config)
          .then((response) => {
            this.url_1 = response.data.image_url;
            this.srcList.push(this.url_1);
            this.url_2 = response.data.draw_url;
            this.resList.push(this.url_2);
            this.fullscreenLoading = false;
            this.loading = false;
            this.image_verb = response.data.verb;
            this.imageInfo_list=response.data.res_info;
            if(response.data.status === 'success')
              this.notice1();
          });
      },
      notice1() {
        this.$notify({
          title: "预测成功",
          message: "点击图片可以查看大图",
          duration: 3000,
          type: "success",
        });
      },
    },
  };
</script>

<style lang="less" scoped>

.box-card {
  // width: 900px;
  // height: 800px;
  border-radius: 8px;
  padding: 0px auto;
  border-radius: 4px;
  // margin-left: 300px;
  // margin-right: 50px;
  .demo-image__preview1 {
    width: 700px;
    height: 400px;
    margin:auto
    // float: center;
  }

  .demo-image__preview2 {
    width: 700px;
    height: 400px;
    margin: auto;
    /* background-color: green; */
  }
  .image_1 {
    width: 700px;
    height: 300px;
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .img_info_1 {
    height: 30px;
    width: 700px;
    text-align: center;
    background-color: #21b3b9;
    line-height: 30px;
  }
}

.error {
  margin: 100px auto;
  width: 50%;
  padding: 10px;
  text-align: center;
}


.info-card{
  width: 560px;
  height: 800px;
  line-height: 3.2em;
  letter-spacing: 3px;
  margin: auto;
  .res-header{
    line-height: 30px;
    color: hsl(198, 92%, 48%);
    text-align: center;
    font-size: 2.3em;
  }
  .res-verb{
    line-height: 30px;
    color: #5ed7a6;
    text-align: left;
    font-size: 1.8em;
  }
  .res-table{
    width: 500px; 
    letter-spacing: 1px;
    text-align: center;
    height: 500px
  }

}

.divider {
  width: 50%;
}

.download_bt {
  padding: 10px 16px !important;
}

#upfile {
  width: 104px;
  height: 45px;
  background-color: #187aab;
  color: #fff;
  text-align: center;
  line-height: 45px;
  border-radius: 3px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.2);
  color: #fff;
  font-family: "Source Sans Pro", Verdana, sans-serif;
  font-size: 0.875rem;
}

.block-sidebar {
  position: fixed;
  display: none;
  left: 50%;
  margin-left: 600px;

  top: 350px;
  width: 60px;
  z-index: 99;
}

.block-sidebar .block-sidebar-item {
  font-size: 50px;
  color: lightblue;
  text-align: center;
  line-height: 50px;
  margin-bottom: 20px;
  cursor: pointer;
  display: block;
}

div {
  display: block;
}

.block-sidebar .block-sidebar-item:hover {
  color: #187aab;
}
.file {
  width: 200px;
  height: 130px;
  position: absolute;
  left: -20px;
  top: 0;
  z-index: 1;
  -moz-opacity: 0;
  -ms-opacity: 0;
  -webkit-opacity: 0;
  opacity: 0; /*css属性&mdash;&mdash;opcity不透明度，取值0-1*/
  filter: alpha(opacity=0);
  cursor: pointer;
}

#upload {
  position: relative;
  margin: 0px 0px;
}

#Content {
  width: 85%;
  height: 800px;
  background-color: #ffffff;
  margin: 15px auto;
  display: flex;
  min-width: 1200px;
}

.divider {
  background-color: #eaeaea !important;
  height: 2px !important;
  width: 100%;
  margin-bottom: 50px;
}

.divider_1 {
  background-color: #ffffff;
  height: 2px !important;
  width: 100%;
  margin-bottom: 20px;
  margin: 20px auto;
}

.steps {
  font-family: "lucida grande", "lucida sans unicode", lucida, helvetica,
    "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  color: #21b3b9;
  text-align: center;
  margin: 15px auto;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

.step_1 {
  /*color: #303133 !important;*/
  margin: 20px 26px;
}


</style>


