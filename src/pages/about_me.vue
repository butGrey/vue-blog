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
				<p class="art-content">
					　　大家好，我叫白林丽，毕业于中南民族大学计算机科学与技术专业，曾经就职于世纪鼎利科技股份有限公司产品技术支持工程师岗位，由于对前端开发的热爱，现正在寻找前端工程师的工作，附上个人简历地址（http://39.108.165.251:8080/dist/）。<br />　　关于这个bolg，使用了vue + router + axios完成前台页面，首页、时间轴、文字部分关于文章的数据是从本地data.json中请求来的，目前后台还没搭建好，预期在一周之类搭建好后台，完善后面几个板块的功能。虽然这个博客看似很简陋，却是我丰富生活的开始，我相信，不管多么的粗陋，经过我的用心雕琢，也会成为我灿烂的后花园。<br />　　本人性格开朗、大方，喜欢写代码、游泳、摄影、看电影，希望能交到很多朋友，如果是同行呢，可以一起探讨一下技术共同进步呀！如果有爱好游泳的请约我！<br />
				</p>
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