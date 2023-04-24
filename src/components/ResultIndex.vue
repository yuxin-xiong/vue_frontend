<template>
	<div class="result-container">

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
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			src_url: '',
			res_url: '',
			srcList: [],
			resList: [],
			image_verb:'sitting',
			imageInfo_list:[
				{
					role:'agent',
					noun:'man',
					color:'(255,255,0)',
				}
			],
			loading:false	
		};
	},
	components: {
	},
	methods: {},
}


</script>

<style lang="less" scoped>
* {
	margin: 0;
	padding: 0;
}

.result-container {
	height: 800px;
	width: 80%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 10px;
	// 左侧图片区样式
	.image-card {
		height: 100%;
		width: 60%;
		float: left;
		// 左侧卡片
		.box-card {
			height: 100%;
			border-radius: 8px;
			.image_1 {
				position: relative;
				margin-top: 10px;
				background: #ffffff;
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
				height: 370px;

			}
		}
	}
	.info-card {
		height: 100%;
		width: 39%;
		float: right;
		.infobox-card{
			height: 100%;
			border-radius: 8px;
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
				width: 500px; 
				letter-spacing: 1px;
				text-align: center;
			}
		}

	}
}
</style>