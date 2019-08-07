<template>
	<div class="comp">
		<div class="comps">
			<div>分页组件：</div>
			<div>当前页：{{pagination.currentPage}}</div>
			<div>总长度：{{pagination.totalItems}}</div>
	    	<my-pagination :pagination="pagination"> </my-pagination>
		</div>
		<div class="comps">
			<div>评论组件：</div>
			<div>总评论数：{{messageList.length}}</div>
	    	<my-comment v-if="postUrl" :getUrl="getUrl" :getUrlre="getUrlre" :postUrl="postUrl"> </my-comment>
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
				},
				messageList: [],
				messagereplyList: [],
		        getUrl: 'http://localhost:3000/messages',
		        getUrlre: 'http://localhost:3000/messagereplys',
		        postUrl: 'http://localhost:3000/message'				
			}
		},
		created() {	
	      // this.$axios(this.getUrl).then(res => {
	      //   this.messageList = res.data.data;
	      //   for(let i=0;i<this.messageList.length;i++){
	      //     this.messageList[i].moment = this.$moment(this.messageList[i].moment, "YYYY-MM-DD HH:mm:ss").fromNow();
	      //   }
	      //   this.$axios(this.getUrlre).then(res => {
	      //     this.messagereplyList = res.data.data;
	      //     console.log(this.messageList)
	      //     console.log(this.messagereplyList)
	      //   })
	      //     .catch(error =>{
	      //       console.log(error);
	      //     })
	      // })
	      //   .catch(error =>{
	      //     console.log(error);
	      //   });
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
