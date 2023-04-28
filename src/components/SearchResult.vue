<template>
	<div class="search-result-container">
		<div class="image-row" v-for="(row, index) in imageRows" :key="index">
			<el-image v-for="(image, imgIndex) in row" :key="imgIndex" :src=image class="image-item"></el-image>
		</div>
	</div>
</template>
  
<script>
import EventBus from '../EventBus.js';

export default {
	name: "App",
	data() {
		return {
			images:[
			],
		};
	},
	props: ['img_path_list'],
	components: {
	},
	created() {

			EventBus.$on('data-updated', (data) => {
				this.images = data;
			});

			this.images = this.img_path_list
		
	},
	mounted() {

	},
	computed: {
		imageRows() {
			const rows = [];
			const imagesPerRow = 4;
			for (let i = 0; i < this.images.length; i += imagesPerRow) {
				rows.push(this.images.slice(i, i + imagesPerRow));
			}
			return rows;
		}
	},


	methods: {},
};
</script>
  
<style lang="less" scoped>
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
		max-width: calc(25% - 10px);
		/* Adjust the width as per your requirements */
		margin: 5px;
		height: 260px;
	}
}
</style>
  