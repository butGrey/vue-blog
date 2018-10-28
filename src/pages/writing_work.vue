<template>
	<div class="pages-view">
		<div class="articles" v-for="(item,key) in arr1">
			<div class="day">
				<p>{{item.month}}月</p>
				<p>{{item.day}}日</p>
			</div>
			<div class="category">{{item.category}}</div>
			<div class="contents">
				<h2 class="title"><router-link :to="{ path:'/article_detail' , query: { item } }" class="a">{{item.title}}</router-link></h2>
				<svg class="icon" aria-hidden="true">
				  <use xlink:href="#icon-shijian"></use>
				</svg>
				<i class="art-time">{{item.year}}年{{item.month}}月{{item.day}}日{{item.time}}</i>
				<p class="art-content">{{item.content}}<br /></p>
				<router-link :to="{ path:'/article_detail' , query: { item } }" class="button">~阅读全文~</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: "layout",
		data(){
			return{
				articleList:[],
				articleWork:[],
				articleLife:[],
				arr1:[],
				arr2:[],
				index: 1
			}
		},
		created () {
			this.$axios('/api/articleList').then(res => {
				this.articleList = res.data.data;				
				for (var i = 0; i < this.articleList.length; i++) {
					if(this.articleList[i].category=="始于梦想"){
						this.articleWork.push(this.articleList[i]);
					}
					else{
						this.articleLife.push(this.articleList[i]);
					}
				}
				this.arr1 = this.articleWork;
				this.arr2 = this.articleLife;
			})
			.catch(error =>{
				console.log(error);
			})
		}
	}
</script>

<style scoped>
	@media screen and (max-width: 1020px){
		.pages-view{
		    width: 100%!important;
		    float: none;   
		}
	}
	.pages-view{
		width: 65%;		
		margin: 0 auto;
		text-align: center;
		border-radius: 10px;
	}
	.articles{
		position: relative;
		box-sizing: border-box;
		width: 90%;
		height: 300px;
		margin: 40px auto;
		background-color: #fff;
		border-radius: 10px;
	}
	.day{
		float: left;
		position: absolute;
		left: -30px;
		top: -20px;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		padding: 5px;
		background-color: #a0ede9;
		color: #fff;
		text-align: center;
		line-height: 30px;
		box-shadow: 1px 1px 4px #bbbbbb;

	}
	.day p{
		font-weight: bold;
		font-size: 16px;
	}
	.category{
		position: absolute;
		width: 80px;
		height: 25px;
		margin-top: 130px;
		left: -14px;
		background-color: #a0ede9;
		color: #fff;
		text-align: center;
		line-height: 25px;
		box-shadow: 0px 1px 3px #bbbbbb;
	}
	.category:after{
		content: '';
		position: absolute;
	    top: 101%;
	    left: 0;
	    border-top: 7px solid #81cac6;
	    border-right: 7px solid #81cac6;
	    border-bottom: 7px solid transparent;
	    border-left: 7px solid transparent;
	}
	.contents{
		padding: 20px;
	}
	.title{
		text-align: center;
		
	}
	.title .a{
		color: #fb8183;
	}
	.art-content{
		position:relative;
		max-height: 90px;
		margin: 50px 30px 10px 30px;
		text-align: left;
		font-size: 14px;
		line-height: 30px;
		overflow: hidden;
	}
	.art-content::after {
		content: "\02026";
		position:absolute;
		bottom:0;
		right:0;
		padding-left:40px;
		background:-webkit-linear-gradient(left,transparent,#fff 55%);
		background:-o-linear-gradient(right,transparent,#fff 55%);
		background:-moz-linear-gradient(right,transparent,#fff 55%);
		background:linear-gradient(to right,transparent,#fff 55%);
	}
	.button{
		font-size: 15px;
		font-weight: bold;
		color: #26cac1;
		border-right: 
	}
	
</style>