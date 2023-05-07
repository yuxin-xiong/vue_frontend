<template>
	<div class="search-result-container">
		<div class="image-row" v-for="(row, index) in imageRows" :key="index">
				<el-image v-for="(image, imgIndex) in row" 
									:key="imgIndex" 
									:src=getImagePath(image) 
									class="image-item"
									@click="openTooltip(image)">
				</el-image>
		</div>
		<el-dialog
					:title="dialogTitle"
					:visible.sync="dialogVisible"
					width="30%">
					<pre> {{ dialogInfo }}</pre>
		</el-dialog>

	</div>
</template>
  

<script>
import EventBus from '../EventBus.js';
export default {
	name: "App",
	data() {
		return {
			my_data:null,
			dialogInfo:null,
			dialogVisible:false,
			dialogTitle:null, 
		};
	},
	props: ['pro_data'],
	components: {
	},
	created() {
		EventBus.$on('data-updated', (share_data) => {
				this.my_data = share_data;
		});
		this.my_data = this.pro_data
	},
	mounted() {
	},
	computed: {
		imageRows() {
			const rows = [];
			const imagesPerRow = 4;
			for (let i = 0; i < this.my_data.search_file_list.length; i += imagesPerRow) {
				rows.push(this.my_data.search_file_list.slice(i, i + imagesPerRow));
			}
			return rows;
		}
	},
	methods: {
		getImagePath(image) {
			return 'http://127.0.0.1:5000/static/images_512/' + image;
		},
		openTooltip(image){
			this.dialogInfo = null;
			this.dialogVisible = true;
			this.dialogTitle, this.dialogInfo = this.getImageInfo(image);
		},
		getImageInfo(image){
			let result = this.my_data.search_file_info.find(item => item.file === image);
			const orderedRes = this.my_data.search_file_roles.reduce((acc, role) => {
				acc[role] = result[role];
				return acc;
			}, {});
			let { file, ...newResult } = orderedRes;
			if (result) {
				// 输出其他数据
				let json_str=JSON.stringify(newResult, null, 4);
				let cleanedString = json_str.replace(/['"]/g, '');
				return file,cleanedString;
			} else {
				console.log("File not found");
				return  'not found', 'error'
			}
		},
	}
};
</script>
  
<style lang="less" scoped>
pre {
  white-space: pre-wrap;
	font-size: 24px;
	color: rgb(11, 175, 235);
}
.search-result-container {
	width: 90%;
	margin-left: auto;
	margin-right: auto;
	.image-row {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.image-item {
		flex: 1;
		max-width: calc(25% - 10px);
		margin: 5px;
		height: 300px;
	}
}
</style>
  