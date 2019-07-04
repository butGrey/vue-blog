<template>
	<div>
    	<my-pagination :pagination="pagination"> </my-pagination>

		<div>当前页：{{pagination.currentPage}}</div>
		<div>总长度：{{pagination.totalItems}}</div>
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
			doSomething: function(i){
			  this.title+=i.time;
			}
		},
	}
</script>
