<template>
	<div class="pages-view">
		<div class="articles">
			<div class="day">
        <p>{{article.moment.substring(5,7)}}月</p>
        <p>{{article.moment.substring(8,10)}}日</p>
			</div>
			<div class="category">{{article.category}}</div>
			<div class="contents">
				<h2 class="title"><a href="">{{article.title}}</a></h2>
				<svg class="icon" aria-hidden="true">
				  <use xlink:href="#icon-shijian"></use>
				</svg>
				<i class="art-time">{{article.moment}}</i>
				<p class="art-content" v-html="article.content"><br /></p>
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
				<li v-for="(item,key) in commentList">
					<div class="mes_people">
            <img :src=str+item.avator alt="">
						<span>{{item.name}}</span>
						<span>{{item.moment}}</span><br />
					</div>
					<div class="mes_content">
						<p v-html="item.content"></p>
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
		      key: 0,
          article: {},
          commentList: [],
          str: 'http://localhost:3000/images/'
		    }
  		},
  		mounted() {
  			//this.fetchData();
        $('#avator').change(function(){
          if (this.files.length != 0) {
            var file = this.files[0],
              reader = new FileReader();
            if (!reader) {
              this.value = '';
              return;
            };
            console.log(file.size,file.type)
            // if (file.size >= 1024 * 1024 / 2) {
            // 	fade("请上传小于512kb的图片!")
            // 	return
            // }
            if (!/image/g.test(file.type)) {
              fade("请上传图片文件!")
              $('#avatorVal').val('')
              $('form .preview').attr('src', '')
              $('form .preview').fadeOut()
              return
            }
            reader.onload = function (e) {
              this.value = '';
              $('form .preview').attr('src', e.target.result)
              $('form .preview').fadeIn()
              var image = new Image();
              image.onload = function(){
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext("2d");
                canvas.width = 100;
                canvas.height = 100;
                ctx.clearRect(0, 0, 100, 100);
                ctx.drawImage(image, 0, 0, 100, 100);
                var blob = canvas.toDataURL("image/png");
                $('#avatorVal').val(blob)
              }
              image.src = e.target.result
            };
            reader.readAsDataURL(file);
          };
        })
        $('.submit').click(function(){
          // console.log($('.form').serialize())
          if ($('input[name=name]').val().trim() == '') {
            fade('请输入用户名！')
          }else if($('input[name=name]').val().match(/[<'">]/g)){
            fade('请输入合法字符！')
          }else if($('#avatorVal').val() == ''){
            fade('请上传头像！')
          }else{
            $.ajax({
              url: '/article_detail/' + location.pathname.split('/')[2],
              data: {
                name: $('input[name=name]').val(),
                content: $('input[name=content]').val(),
                avator: $('#avatorVal').val(),
              },
              type: "POST",
              cache: false,
              dataType: 'json',
              success: function (msg) {
                if(msg.code == 200){
                  console.log('评论成功')
                  setTimeout(function(){
                    window.location.reload()
                  },1000)

                }else{
                  console.log(msg.message)
                }
              },
              error: function () {
                alert('异常');
              }
            })
          }
        })
  		},
  		methods: {
  			// fetchData () {
	      // 		this.item = this.$route.query.item;
	      // 		JSON.stringify(this.item);
	      // 		console.log(this.item);
	  		// }
  		},
    created () {
      //this.$axios('/api/articleList').then(res => {
      this.$axios('http://localhost:3000/articles').then(res => {
        this.key = this.$route.query.key;
        this.article = res.data.data[this.key];
        this.$axios('http://localhost:3000/comments/' + this.article.id).then(res => {
          this.commentList = res.data.data;
          console.log(res.data);
        })
          .catch(error =>{
            console.log(error);
          })
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
