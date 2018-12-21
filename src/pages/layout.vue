<template>
	<div class="pages-view">
		<div class="articles" v-for="(item,key) in articleList">
			<div class="day">
				<p>{{item.moment.substring(5,7)}}月</p>
				<p>{{item.moment.substring(8,10)}}日</p>
			</div>
			<div class="category">{{item.category}}</div>
			<div class="contents">
				<h2 class="title"><router-link :to="{ path:'/article_detail' , query: { key } }" class="a">{{item.title}}</router-link></h2>
				<svg class="icon itime" aria-hidden="true">
				  <use xlink:href="#icon-shijian"></use>
				</svg>
				<i class="art-time">{{item.moment}}</i>
				<p class="art-content" v-html="item.content"><br /></p>
				<!-- <router-link :to="{ name:'artdetail' , params: { item } }" class="button">~阅读全文~</router-link> -->
				<router-link :to="{ path:'/article_detail' , query: { key } }" class="button">~阅读全文~</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: "layout",
		data(){
			return{
				articleList:[]
			}
		},
		created () {
			//this.$axios('/api/articleList').then(res => {
      this.$axios('http://localhost:3000/articles').then(res => {
				this.articleList = res.data.data;
				// console.log(res);
			})
			.catch(error =>{
				console.log(error);
			})
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
    background-color: rgba(255,255,255,.5);
		border-radius: 10px;
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
    background-color: #a0ede9;
    color: #fff;
    text-align: center;
    line-height: 30px;
    box-shadow: 1px 1px 4px #bbbbbb;
	}
  .itime{
    vertical-align: -0.9rem;
  }
	.day p{
		font-weight: bold;
		font-size: 16px;
	}
	.category{
		position: absolute;
		width: 80px;
		height: 25px;
		margin-top: 6rem;
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
    font-weight: 500;
	}
	.art-content{
		position:relative;
		max-height: 90px;
		margin: 30px 30px 10px 30px;
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
