<template>
	<div class="pages-view">
		<div class="articles">
			<div class="day">
				<p>月份</p>
				<p>日期</p>
			</div>
			<div class="category">类别</div>
			<div class="content">
				<h2 class="title"><a href="">标题</a></h2>
				<svg class="icon" aria-hidden="true">
				  <use xlink:href="#icon-shijian"></use>
				</svg>
				<i class="art-time">XXXX年XX月XX日00:00:00</i>
				<p class="art-content"></p>
			</div>
		</div>
	</div>
</template>

<script>

	export default{
		name: "about_me",
		data(){
			return{
				
			}
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
		margin: 10px auto;
    background-color: rgba(255,255,255,.5);
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
	.content{
		padding: 20px;
	}
	.title{
		text-align: center;
		
	}
	.title a{
		color: #fb8183;
	}
	.art-content{
		margin: 50px 30px;
		text-align: left;
		font-size: 14px;
		line-height: 30px;
	}
	
</style>
