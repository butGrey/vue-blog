<template>
	<div class="pages-view">
		<div class="articles">
			<div class="day">
				<p>{{item.month}}月</p>
				<p>{{item.day}}日</p>
			</div>
			<div class="category">{{this.$route.query.item.category}}</div>
			<div class="contents">
				<h2 class="title"><a href="">{{this.$route.query.item.title}}</a></h2>
				<svg class="icon" aria-hidden="true">
				  <use xlink:href="#icon-shijian"></use>
				</svg>
				<i class="art-time">{{this.$route.query.item.year}}年{{this.$route.query.item.month}}月{{this.$route.query.item.day}}日{{this.$route.query.item.time}}</i>
				<p class="art-content">{{this.$route.query.item.content}}<br /></p>
			</div>
		</div>
			<div class="articless">
			<form method="post" id="form_message">
				<div class="message">
					<textarea placeholder="something you want to say ..." class="textarea-inherit" id="message_textarea" rows="3"></textarea>
				</div>
				<div class="subm">
					<div class="submit preview">预览</div>
					<div class="submit">提交</div>
				</div>
			</form>
		</div>
		<div class="articless">
			<div class="count">
				<span>xxx条评论</span>
				<p></p>
			</div>
			<ul class="mes">
				<li>
					<div class="mes_people"><img src="../assets/img/t1.jpg" alt="">
						<span>名字</span>
						<span>时间</span><br />
					</div>
					<div class="mes_content">
						<p>没有十全十美的东西，没有十全十美的人，关键是清楚到底想要什么。得到想要的，肯定会失去另外一部分。如果什么都想要，只会什么都得不到。</p>
						<form action="post">
							<div class="submit submit2">回复</div>
						</form>
					</div>
				</li>
			</ul>
			<div class="paging">
				<ul>
					<li></li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
	  	data () {
		    return {
		      item: {}
		    }
  		},
  		mounted() {
  			this.fetchData();
  		},
  		methods: {
  			fetchData () {
	      		this.item = this.$route.query.item;   	      		
	      		JSON.stringify(this.item);
	      		console.log(this.item);
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
		margin: 40px auto;
    background-color: rgba(255,255,255,.5);
		border-radius: 10px;
	}
	.articless{
		position: relative;
		box-sizing: border-box;
		width: 90%;
		margin: 40px auto;
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
	.title a{
		color: #fb8183;
	}
	.art-content{
		position:relative;
		margin: 50px 30px 10px 30px;
		text-align: left;
		font-size: 14px;
		line-height: 30px;
	}
	.textarea-inherit {
        width: 98%;
        overflow: auto;
        border-radius: 5px;
    }
	.information{
		display: flex;

	}
	.information input{
		flex: 1;
		margin: 5px;
		height: 25px;
		border-radius: 5px;
		border: 1px solid #ccc;
	}
	.information input:active{
		border:1px solid #fb8183;
	}

	.information input:focus{
	border:1px solid #fb8183;
	}
	.submit{
		display: inline-block;
		width: 40px;
		background-color: #fb8183;
		color: #fff;
		font-size: 14px;
		cursor: pointer;
		border-radius: 5px;
	}
	.submit2{
		display: block;
		margin-top: 5px;
	}
	.count{
		width: 100%;
		height: 40px;
	}
	.count span{
		float: left;
		color: #fb8183;
	}
	.count p{
		float: left;
		width: 100%;
		border: 1px dashed #fb8183;
	}

	.mes{
		position: relative;
		width: 100%;
		height: 100%;
	}
	.mes_people img{
		width: 60px;
		height: 60px;
		float: left;
		border-radius: 50%;
	}
	.mes_people span{
		float: left;
		margin-left: 20px;
	}
	.mes_content{
		float: left;
		width: 80%;
		margin: 5px;
		padding: 0 15px;
	}
	.mes_content p{
		text-align: left;
		line-height: 20px;

	}
</style>
