<template>
	<div class="comp">
		<div class="comps">
			<div>分页组件：</div>
			<div>当前页：{{pagination.currentPage}}</div>
			<div>总长度：{{pagination.totalItems}}</div>
	    	<my-pagination :pagination="pagination"> </my-pagination>
		</div>
	</div>
</template>
<script>
	export default{
		name: "mycomponent",
		data(){
			return{
				pagination: {
					currentPage: 1,
					totalItems: 10,
					pageSize: 5,
					type: 0,
					pageNumChange: function (currentPage) {
						console.log(currentPage);
					},
					pageUpdate: function (argument) {
						// body...
					},
					pageOptionChange: function (argument) {
						// body...
					}
				}
			}
		},
		methods:{
		},
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
