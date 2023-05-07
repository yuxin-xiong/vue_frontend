<template>
	<div class="result-container clearfix">
		<div class="image-card">
			<el-card class="box-card">
				<div class="image_1">
					<el-image :src="src_url" :preview-src-list="srcList" style="border-radius: 3px 3px 0 0 width: 100%; height: 95%">
						<div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
					</el-image>
				</div>
				<div class="image_1">
					<el-image :src="res_url" :preview-src-list="resList" style="border-radius: 3px 3px 0 0 width: 100%; height: 95%">
						<div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
					</el-image>
				</div>
			</el-card>
		</div>
		<div class="info-card">
			<el-card class="infobox-card"> 
				<div slot="header" class="res-header">
            <span>识别结果</span>		
				</div>
				<h1 class="res-verb">{{ 'Verb:'+ image_verb }}</h1>
				<el-table
            :data="image_info"
            v-loading="loading"
            element-loading-text="数据正在处理中，请耐心等待"
            element-loading-spinner="el-icon-loading"
            lazy
            stripe
            border
            class="res-table"
            :header-cell-style="{background:'#e6ebe9',fontFamily:'Georgia, serif',fontSize:'1.2em'}"
            :cell-style="{color: '#8b500d', fontFamily: 'Times New Roman',fontSize:'1.2em'}"
          >
            <el-table-column prop="role" label="语义角色" width="121px">
            </el-table-column>
            <el-table-column prop="noun" label="实体名词" width="248px">
            </el-table-column>
            <el-table-column prop="color" label="颜色框" width="121px">
              <template slot-scope="scope">
                <el-button disabled round :style="{ backgroundColor: 'rgb'+scope.row.color }"></el-button>
              </template>
            </el-table-column>
				</el-table>
			</el-card>
		</div>
		<button @click="isExpanded = !isExpanded"
						class="show-contorl-button"	>
							{{ isExpanded ? '收起图像推荐' : '相关图像推荐' }}
		</button>
		<div  v-if="isExpanded" class="search-result-container">
			<div class="image-row" v-for="(row, index) in imageRows" :key="index">
				<div style="flex:1;margin: 5px;height: 300px; " v-for="(image, imgIndex) in row" :key="imgIndex" > 
					<el-popover placement="top-start" width="250" @show="openTooltip(image)" trigger="click">
						<span style="font-size:20px;color:#2bd8ad" v-html="formattedString"></span>
						<el-image class="image-item" slot="reference" :src=getImagePath(image)  :fit="'cover'"></el-image>
					</el-popover>
				</div>
			</div>
		</div>
		<!-- <el-dialog
					:title="dialogTitle"
					:visible.sync="dialogVisible"
					width="30%">
					<pre> {{ dialogInfo }}</pre>
		</el-dialog> -->
	</div>

</template>

<script>
export default {
	data() {
		return {
			isExpanded: false,
			dialogVisible: false,
			popContentInfo:'',
			dialogTitle:'',
			src_url: '',
			res_url: '',
			srcList: [],
			resList: [],
			image_verb:'',
			image_info:[],
			loading:false,
			recommend_images:[],
			recommend_info:[],
			recommend_roles:[],
		};
	},
	created() {
		console.log(this.data)
	},
	mounted(){
		this.res_url=this.data.draw_url;
		this.src_url=this.data.image_url;
		this.image_verb=this.data.verb;
		this.image_info=this.data.res_info;
		this.srcList.push(this.data.image_url);
		this.resList.push(this.data.draw_url);
		this.recommend_images = this.data.recommend_file_list;
		this.recommend_info = this.data.recommend_file_info;
		this.recommend_roles = this.data.recommend_file_roles
	},
	props: ['data'],
	computed: {
		imageRows() {
			const rows = [];
			const imagesPerRow = 4;
			for (let i = 0; i < this.recommend_images.length; i += imagesPerRow) {
				rows.push(this.recommend_images.slice(i, i + imagesPerRow));
			}
			return rows;
		},
		formattedString() {
      return this.popContentInfo.split(',').map(item => {
        const [key, value] = item.trim().split(':');
        return `${key}: ${value}<br>`;
      }).join('');
		}
	},
	components: {

	},
	methods: {
		openTooltip(image){
			this.popContentInfo = null;
			this.dialogTitle, this.popContentInfo = this.getImageInfo(image);
		},
		getImageInfo(image){
			let result = this.recommend_info.find(item => item.file === image);

			//按固定顺序输出
			const orderedRes = this.recommend_roles.reduce((acc, role) => {
				acc[role] = result[role];
				return acc;
			}, {});
			console.log(orderedRes)
			let { file, ...newResult } = orderedRes;
			if (orderedRes) {
				// 输出其他数据
				let json_str=JSON.stringify(newResult, null, 4);
				let cleanedString = json_str.replace(/['{}"]/g, '')
				return file,cleanedString;
			} else {
				console.log("File not found");	
				return  'not found', 'error'
			}
		},
		getPreviewPath(image){
			let pre_list = new Array();
			pre_list.push('http://127.0.0.1:5000/static/images_512/' + image);
			return pre_list;
		},
		getImagePath(image) {
      return 'http://127.0.0.1:5000/static/images_512/' + image;
    },
		notice1() {
				this.$notify({
				title: "预测成功",
				message: "预测成功,点击图片查看大图",
				duration: 3000,
			});
		},
	},
};


</script>
 
<style lang="less" scoped>
pre {
  white-space: pre-wrap;
	font-size: 24px;
	color: rgb(11, 175, 235);
}

* {
	margin: 0;
	padding: 0;
}
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

.result-container {

	width: 80%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 10px;
	margin-bottom: 20px;
	// 左侧图片区样式
	.image-card {
		width: 55%;
		margin-left: 50px;
		float: left;
		margin-bottom: 50px;
		// 左侧卡片
		.box-card {
			border-radius: 8px;
			height: 700px;
			.image_1 {
				margin-left: auto;
				margin-right: auto;
				margin-top: 10px;
				background: #ffffff;
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
				height: 320px;
				width:600px;
			}
		}
	}
	.info-card {
		height: 700px;
		width: 35%;
		float: left;
		margin-left: 20px;
		margin-bottom: 50px;

		.infobox-card{
			height: 100%;
			border-radius: 8px;
			.res-recommend{
				font-size: 16px;
				height: 50px;
			}
			.res-header{
				line-height: 40px;
				color: hsl(198, 92%, 48%);
				text-align: center;
				font-size: 40px;
			}
			.res-verb{
				line-height: 40px;
				color: #5ed7a6;
				text-align: left;
				font-size: 30px;
			}
			.res-table{
				list-style: solid;
				width: 498px; 
				letter-spacing: 1px;
				text-align: center;
			}
		}


	}
	.show-contorl-button{
		width: 100%;
		color: #3b3f3e;
		background-color: #ffffff;
		font-size: 22px;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 15px;
		border: #ffffff;
	}

	.search-result-container {
		width: 90%;
		// background-color: rgb(246, 121, 121);
		margin-left: auto;
		margin-right: auto;
		// margin-top: 50px;
		// position: relative;
		// top: 800px;
		.image-row {
			display: flex;
			justify-content: space-between;
			width: 100%;
		}
		.image-item{
			flex: 1;
			height: 300px;
		}
	}

}
</style>