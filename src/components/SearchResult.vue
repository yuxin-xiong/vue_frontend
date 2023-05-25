<template>
	<div class="search-result-container">
		<div class="image-row" v-for="(row, index) in imageRows" :key="index">
			<div style="flex:1;margin: 5px;height: 300px; " v-for="(image, imgIndex) in row" :key="imgIndex" > 
					<el-popover placement="top-start" width="350" 
											@show="openTooltip(image)" 
											trigger="click">
						<span style="font-size:20px;color:#2bd8ad" 
									v-html="formattedString">
						</span>
						<el-image class="image-item" 
											slot="reference" 
											:src=getImagePath(image)  
											:fit="'cover'">
						</el-image>
					</el-popover>
			</div>
		</div>
	</div>
</template>
  

<script>
import EventBus from '../EventBus.js';
export default {
	name: "App",
	data() {
		return {
			my_data:null,
			popContentInfo:'',
			popTitle:null, 
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
		},		
		formattedString() {
      return this.popContentInfo.split(',').map(item => {
        const [key, value] = item.trim().split(':');
        return `${key}: ${value}<br>`;
      }).join('');
		}
	},
	methods: {
		getImagePath(image) {
			return 'http://127.0.0.1:5000/static/images_512/' + image;
		},
		openTooltip(image){
			this.dialogInfo = null;
			this.dialogVisible = true;
			this.popTitle, this.popContentInfo = this.getImageInfo(image);
		},
		getImageInfo(image){
			let result = this.my_data.search_file_info.find(item => item.file === image);
			const orderedRes = this.my_data.search_file_roles.reduce((acc, role) => {
				acc[role] = result[role];
				return acc;
			}, {});
			let { file, ...newResult } = orderedRes;
			if (result) {
				console.log(orderedRes)
				// 输出其他数据
				let json_str=JSON.stringify(newResult, null, 4);
				let cleanedString = json_str.replace(/[{}'"]/g, '');
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
	width: 80%;
	margin-left: auto;
	margin-right: auto;
	.image-row {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.image-item {
		flex: 1;
		height: 300px;
	}
}
</style>
  