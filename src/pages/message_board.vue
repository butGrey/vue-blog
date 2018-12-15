<template>
	<div class="pages-view">
		<div class="articles">
			<form method="post" id="form_message">
				<div class="message">
					<textarea placeholder="something you want to say ..." class="textarea-inherit" id="message_textarea" rows="3"></textarea>
				</div>
				<div class="information">
					<input type="text" name="author" placeholder="your name *" size="20" class="">
					<input type="email" name="email" placeholder="your email *" size="20" class="">
					<input type="url" name="网址" placeholder="your blog url *" size="20" class="">
				</div>
				<div class="subm">
					<div class="submit preview">预览</div>
					<div class="submit">提交</div>
				</div>
			</form>
		</div>
		<div class="articles">
			<div class="count">
				<span>xxx条评论</span>
				<p></p>
			</div>
			<ul class="mes">
				<li>
					<div class="mes_people"><img src="../assets/img/t1.jpg" alt=""></div>
					<div class="mes_content">
            <span>名字</span>
            <span>时间</span><br />
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

	export default{
		name: "message_board",
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
	}
	.articles{
		position: relative;
		box-sizing: border-box;
		width: 90%;
		margin: 40px auto;
		border-radius: 10px;
	}
	.textarea-inherit {
        width: 98%;
        overflow: auto;
        border-radius: 5px;
    }
	.information{

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
  .mes_people{
    float: left;
  }
	.mes_people img{
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}
	.mes_content span{
    float: left;
		margin-right: 20px;
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
  @media screen and (max-width: 414px) {
    .mes_people{
      width: 12%;
    }
    .mes_people img{
      width: 50px;
      height: 50px;
    }
    .mes_content{
      width: 75%;
    }
  }
</style>
