<template>
	<div>
		<div v-if='pagination.totalItems>1'
				onselectstart="return false;" >
			<ul class="page">
				<li class="square borders" @click="pageNumChange(pagination.currentPage-1);$emit('page-change', pagination.currentPage)"><</li>
				<li class="square"
					@click="pageNumChange(1);$emit('page-change', pagination.currentPage)"
					:class="pagination.currentPage==1?'actives':''">1</li>
				<li class="dot" v-show='befordot'>...</li>
				<li class="square"
					v-for="(item,index) in pages"
					@click="pageNumChange(item);$emit('page-change', pagination.currentPage)"
					:class="pagination.currentPage==item?'actives':''">{{item}}</li>
				<li class="dot" v-show='afterdot'>...</li>
				<li class="square"
					@click="pageNumChange(pagination.totalItems);$emit('page-change', pagination.currentPage)"
					:class="pagination.currentPage==pagination.totalItems?'actives':''">{{pagination.totalItems}}</li>
				<li class="square borders" @click="pageNumChange(pagination.currentPage+1);$emit('page-change', pagination.currentPage)">></li>
			</ul>
			<span class="totle">共{{pagination.totalItems}}页</span>
			<input type="" name="" oninput="value=value.replace(/[^\d]/g,'')" v-model="gopage">
			<div class="jump" @click="pageNumChange(gopage);$emit('page-change', pagination.currentPage)">GO</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"pagination",
		data(){
			return{
				pages: [],
				initpages: [],
				gopage: 1,
				befordot: false,
				afterdot: false,
			}
		},
		created (){
			if(this.pagination.totalItems>2&&this.pagination.totalItems<8){
				this.pages=[]
				for(let i=0;i<this.pagination.totalItems-2;i++){
					this.pages[i]=i+2;
				}
			}else if(this.pagination.totalItems>=8){
				this.pages=[2,3,4,5,6];
				this.afterdot = true;
			}
			this.initpages = this.pages;
		},
		methods:{
			pageNumChange: function (currentPage) {
				currentPage = currentPage-0;
				if(currentPage==this.pagination.currentPage){
					return
				}
				this.pagination.pageNumChange(currentPage);
				if(currentPage>=1&&currentPage<=this.pagination.totalItems){
					this.pagination.currentPage = currentPage;
					if(this.pagination.totalItems>=6){
						if(currentPage<=4){
							this.afterdot = true;
							this.befordot = false;
							this.pages = this.initpages;
						}else if(currentPage>4&&currentPage<this.pagination.totalItems-3){
							this.befordot = true;
							this.afterdot = true;
							this.pages=[currentPage-1,currentPage,currentPage+1,currentPage+2]
						}else if(currentPage<=this.pagination.totalItems&&currentPage>=this.pagination.totalItems-3){
							this.befordot = true;
							this.afterdot = false;
							this.pages=[this.pagination.totalItems-5,this.pagination.totalItems-4,this.pagination.totalItems-3,this.pagination.totalItems-2,this.pagination.totalItems-1];
						}
					}
				}
				return currentPage;
			},
		},
		props: {
			pagination: Object
	    },
	}

</script>

<style scoped>
ul li{
	display: inline-block;
	width: 36px;
	height: 32px;
	margin: 5px;
	line-height: 32px;
	text-align: center;
}
.square{
	border-radius: 4px;
	text-align: center;
	cursor:pointer;
	color: #676767;
}
.page{
	display: inline-block;
}
.borders{
	border: 1px solid #ccc;
}
.square:hover{
	background-color: #5a576f;
	color: #fff;
}
.actives,.square:active{
	background-color: #5a576f;
	color: #fff;
}
.totle{
	color: #756d6d;
	font-size: 12px;
	margin: 5px;
}
input{
	outline: none;
	border: 1px solid #756d6d;
	width: 26px;
	height: 22px;
	padding: 4px;
	font-size: 12px;
}
.jump{
	display: inline-block;
	width: 32px;
	height: 30px;
	margin-left: -5px;
	background-color: #5a576f;
	font-size: 12px;
	text-align: center;
	line-height: 30px;
	color: #fff;
	cursor:pointer;
	box-shadow: 1px 1px 5px #888888;
}
</style>
