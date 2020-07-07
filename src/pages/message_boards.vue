<template>
	<div class="comp">
		<div class="comps">
	    	<my-comment v-if="postUrl" :getUrl="getUrl" :getUrlre="getUrlre" :postUrl="postUrl"> </my-comment>
		</div>
	</div>
</template>
<script>
	export default{
		name: "message_boards",
		data(){
			return{
		        getUrl: this.baseURL+'/messages',
		        getUrlre: this.baseURL+'/messagereplys',
		        postUrl: this.baseURL+'/message'
			}
		},
		created() {
		},
		methods:{
		}
	}
</script>

<style scoped>
	.comp{
		margin-top: 100px;
	}
	.comps{
		margin: 20px;
	}
	.comps div{
		margin: 10px;
	}
</style>
