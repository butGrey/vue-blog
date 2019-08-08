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
		        getUrl: 'http://localhost:3000/messages',
		        getUrlre: 'http://localhost:3000/messagereplys',
		        postUrl: 'http://localhost:3000/message'				
			}
		},
		created() {
		},
		methods:{
		}
	}
</script>

<style scoped>
	div,p,a,ul,li{
		color: #fff;
	}
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
