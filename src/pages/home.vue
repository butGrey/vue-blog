<template>
	<div class="page">
		<div class="pages-view">
			<div class="articles" v-for="(item,key) in currentArticleList">
				<div class="day">
					<p>{{item.moment.substring(5,7)}}月</p>
					<p>{{item.moment.substring(8,10)}}日</p>
				</div>
				<div class="category">{{item.category}}</div>
				<div class="contents">
					<h2 class="title"><router-link :to="{ path:'/article_details' , query: { key } }" class="a">{{item.title}}</router-link></h2>
					<svg class="icon itime" aria-hidden="true">
					  <use xlink:href="#icon-shijian"></use>
					</svg>
					<i class="art-time">{{item.moment}}</i>
					<p class="art-content" v-html="item.content"><br /></p>
					<router-link :to="{ path:'/article_details' , query: { key } }" class="button">~阅读全文~</router-link>
				</div>
			</div>
	    	<my-pagination v-if="articleList.length>5" :pagination="pagination" v-on:page-change="pageNumChange"> </my-pagination>
		</div>
	</div>
</template>

<script>
	export default{
		name: "layout",
		data(){
			return{
				articleList:[],
				currentArticleList:[],
				pagination: {
					currentPage: 1,
					totalItems: '',
					pageSize: 5,
					type: 0,
					pageNumChange: function (currentPage) {
						console.log(currentPage);
						//this.currentArticleList = this.articleList.slice(currentPage*5-5,currentPage*5);
					},
					pageUpdate: function (argument) {
						// body...
					},
					pageOptionChange: function (argument) {
						// body...
					}
				},
			}
		},
		created () {
	      this.$axios('http://localhost:3000/articles').then(res => {
					this.pagination.totalItems = Math.ceil(res.data.data.length/5);
					this.articleList = res.data.data;
					this.currentArticleList = this.articleList.slice(0,5);
				})
				.catch(error =>{
					console.log(error);
				})
		},
		methods:{
			pageNumChange: function (currentPage) {
				this.currentArticleList = this.articleList.slice( currentPage*5-5, currentPage*5);
			}
		},
		mounted(){
        }
	}
</script>

<style scoped>
	@media screen and (max-width: 1024px){
		.pages-view{
		    width: 100%!important;
		    float: none;
		}
	}
	.page{
		background-color: #fff;
		height: calc(100vh - 0px);
		width: calc(100vw + 20px);
		display: inline-block;
		overflow: scroll;
	}
	.pages-view{
		width: 65%;
		color: #000;
		margin: 120px auto;
		text-align: center;
		border-radius: 10px;
	}
	.articles{
		position: relative;
		box-sizing: border-box;
		width: 90%;
		height: 300px;
		margin: 40px auto;
	    box-shadow: 1px 1px 10px #ccc;
	    border-radius: 10px;
	    background-color: #fff;
	}
	.day {
	    float: left;
	    position: absolute;
	    left: -30px;
	    top: -20px;
	    width: 60px;
	    height: 60px;
	    border-radius: 50%;
	    padding: 5px;
	    color: #000;
	    text-align: center;
	    line-height: 30px;
	    background-color: #fff;
	    box-shadow: 1px 1px 4px #bbbbbb;
	}
	  .itime{
	    vertical-align: -0.9rem;
	  }
	.day p{
		font-size: 16px;
	}
	.category{
		position: absolute;
		width: 80px;
		height: 25px;
		margin-top: 6rem;
		left: -14px;
		background-color: #fff;
		color: #bbb;
		text-align: center;
		line-height: 25px;
		box-shadow: 0px 1px 3px #bbbbbb;
	}
	.category:after{
		content: '';
		position: absolute;
	    top: 101%;
	    left: 0;
	    border-top: 7px solid #a8a6bb;
	    border-right: 7px solid #a8a6bb;
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
		color: #000;
	}
	.art-content{
		position:relative;
		max-height: 90px;
		margin: 30px 30px 10px 30px;
		text-align: left;
		font-size: 14px;
		line-height: 30px;
		overflow: hidden;
		color: #000;
	}
	.art-content::after {
		content: "\02026";
		position:absolute;
		bottom:0;
		right:0;
		padding-left:40px;
		background:-webkit-linear-gradient(left,transparent,#bbb    55%);
		background:-o-linear-gradient(right,transparent,#bbb    55%);
		background:-moz-linear-gradient(right,transparent,#bbb  55%);
		background:linear-gradient(to right,transparent,#bbb  55%);
	}
	.button{
		font-size: 15px;
		color: #000;
	}
  @media screen and (max-width: 768px){
    .art-content{
      margin: 25px 0px 10px 0px;
    }
    .articles{
      margin: 40px 0px 40px 30px;
    }
  }
</style>
