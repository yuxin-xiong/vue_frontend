<template>
  <!-- 首页底部上传图片栏 -->
  <div class="content-container">
    <el-card class="box-card">
      <!-- 视频浏览框 -->
      <div class="video-player">
        <video ref="videoPlayer" 
              width="640" 
              height="360" 
              controls autoplay muted>
        </video>
      </div>
      <!-- 图片区域 -->
      <div class="src-image">
        <el-image :src="src_img_url" style="width: 100%; height: 95%">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
      <!-- 右侧按钮区域 -->
      <div class="button-box">
        <el-button  v-show="upvdieo_button_show"
                  type="primary" 
                  icon="el-icon-upload" 
                  class="choose-video-button" 
                  v-on:click="buttonUploadVideo">
          选择视频
          <input type="file" 
                accept="video/*" 
                style="display: none" 
                ref="localVideoInput" 
                @change="playLocalVideo" />
        </el-button>

        <el-button type="primary" 
                  icon="el-icon-upload" 
                  class="cut-button" 
                  v-on:click="cutPicture">
          点我截图
        </el-button>

        <el-button v-show="predict_button_show" 
                   type="primary" 
                   icon="el-icon-open" 
                   class="predict-button"
                   v-on:click="startPredict">
          开始预测
        </el-button>

        
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'MyImage',
  data() {
    return {
      server_url: "http://127.0.0.1:5000",      
      src_img_url:"",
      upvdieo_button_show:true,
      predict_button_show:false,
      file:null,
    };
  },
  created: function () {
    document.title = "视觉行为识别系统";
  },
  methods: {
    // 选择视频按钮 触发input的click事件 调用到playLocalVideo
    buttonUploadVideo() {
      this.$refs.localVideoInput.click();
    },
    playLocalVideo() {
      this.$refs.videoPlayer.src =''
      this.again_button_show = true;
      // 获取 input 标签
      const input = this.$refs.localVideoInput;
      // 判断用户是否选择了视频
      if (input.files && input.files[0]) {
        const file = input.files[0];
        const url = this.getObjectURL(file)
        // 将 URL 赋值给 video 标签的 src 属性
        this.$refs.videoPlayer.src = url;
      }
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
    // 发送至后台开始预测
    startPredict(){
      console.log("startPredict");
      console.log(this.file);

      let param = new FormData();
      param.append("file",this.file,this.file.name);
      let config={
        headers:{"Content-Type": "multipart/form-data"}
      };
      axios.post(this.server_url + "/upload", param, config)
           .then((response)=>{
            // this.responseData=response;
            console.log(response)
            this.$router.push({name: 'ResultIndexShow', 
                                params: {data: response.data}});
           }).catch((error) => {
             console.log(error);
          });
    },

    //截图并显示 
    cutPicture() {
      this.src_img_url = '';
      this.predict_button_show = true;
      const video = this.$refs.videoPlayer;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL();
      this.src_img_url = dataURL;

      canvas.toBlob((blob) => {
        this.file = new File([blob],  Date.now()+'.jpg', {type: "image/jpeg"});
      });
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
          this.imageInfo_list = response.data.res_info;
          if (response.data.status === 'success')
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
.content-container {

  width: 100%;
  font-family: Arial, "Microsoft YaHei";
  position: relative;

  .box-card {
    position: relative;
    width: 80%;
    height: 1000px;
    border-radius: 8px;
    .video-player{
      position: absolute;
      left:45%;
      transform: translate(-50%);
      // margin-left: 3%;
    }
    .src-image {

      position: absolute;
      left: 3%;
      top: 40%;
      width: 80%;
      height: 58%;
      background: #ffffff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .el-icon-picture-outline{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%);
      }
      
    }

    .button-box {
      position: absolute;
      right: 0%;
      // background-color: pink;
      width: 17%;
      height: 100%;

      .el-button+.el-button {
        margin-left: 0 !important;
      }
      .choose-video-button{
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
      .cut-button{
        position: absolute;
        top:20%;
        left: 50%;
        transform: translate(-50%,-50%);
      }

      .again-choose-button {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .predict-button {
        position: absolute;
        top: 65%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

    }
  }

}
</style>


