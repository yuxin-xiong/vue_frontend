<template>
    <!-- 首页底部上传图片栏 -->
    <div class="content-container">
      <el-card class="box-card">
        <div class="src-image" >
          <el-image :src="src_img_url"
                    style="width: 100%; height: 100%">
            <div slot="error" class="image-slot">
              <el-button  v-show="up_button_show"
                          type="primary"
                          icon="el-icon-upload"
                          class="upimage-button"
                          v-on:click="buttonUploadOne">
                选择图片
                <input  ref="upload_1"
                        style="display: none"
                        name="file"
                        type="file"
                        @change="uploadFile"/>
              </el-button>
            </div>
          </el-image>
        </div>
        <div class="button-box">
          <el-button  v-show="predict_button_show"
                      type="primary"
                      icon="el-icon-open"
                      class="predict-button"
                      v-on:click="startPredict">
                      开始预测
          </el-button>

          <el-button  v-show="again_buttopn_show"
                      type="primary"
                      icon="el-icon-upload"
                      class="again-choose-button"
                      v-on:click="buttonUploadTwo">
            重新选择
            <input ref="upload_2"
              style="display: none"
              name="file"
              type="file"
              @change="uploadFile"/>
          </el-button>
        </div>
      </el-card>
    </div> 

</template>

<script>
// import MyImage from "@/components/MyImage.vue"
import axios from 'axios'
export default {
  data() {
    return {
      server_url: "http://127.0.0.1:5000",      
      // url_1:'https://mms-graph.cdn.bcebos.com/activity/pc/shitu_b01.jpg'
      src_img_url:"",
      up_button_show:true,
      predict_button_show:false,
      again_buttopn_show:false,
      responseData: null,
      file:null,
    };
  },
  methods:{
    // 触发input的click事件
    // 选择图片按钮
    buttonUploadOne() {
        this.$refs.upload_1.click();
    },
    // 重新选择按钮
    buttonUploadTwo() {
        this.$refs.upload_2.click();
    },

    // 获得目标文件URL
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
    //从本地选择文件
    uploadFile(e){
      this.up_button_show=false;
      this.predict_button_show=true;
      this.again_buttopn_show=true;
      this.file = e.target.files[0];
      console.log(this.file);
      this.src_img_url = this.$options.methods.getObjectURL(this.file);
    },

    // 发送至后台开始预测
    startPredict(){
      console.log("startPredict");
      let param = new FormData();
      param.append("file",this.file,Date.now() + '.jpg');
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
    notice1() {
        this.$notify({
          title: "预测失败",
          message: "解析失败，请重新上传",
          duration: 3000,
          type: "fail",
        });
      },
  },
  components: {
    // MyImage,
  },
};
</script>

<style lang="less" scoped>

.content-container {

    width: 100%;
    font-family: Arial, "Microsoft YaHei";
    position: relative;

    .box-card{
      position: absolute;
      width: 80%;
      height: 700px;
      border-radius: 8px;
      margin:0,auto;
      .src-image{
        position: absolute;
        left: 3%;
        width: 80%;
        height: 90%;
        margin:0,auto;
        background: #ffffff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .upimage-button{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
        }
      }
      .button-box{
        position: absolute;
        right: 0%;
        // background-color: pink;
        width:17%;
        height: 90%;
        .el-button+.el-button {
          margin-left: 0 !important;
        }

        .predict-button{
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
        .again-choose-button{
          position: absolute;
          top:50%;
          left: 50%;
          transform: translate(-50%,50%);
        }
      }
    }

}

</style>