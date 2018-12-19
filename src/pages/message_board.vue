<template>
	<div class="pages-view">
		<div class="articles">
			<form method="post" id="form_message">
				<div class="message">
					<textarea placeholder="something you want to say ..." class="textarea-inherit" id="message_textarea" name="content" rows="3"></textarea>
				</div>
				<div class="information">
					<input type="text" name="name" placeholder="your name *" size="20" class="">
					<input type="email" name="email" placeholder="your email *" size="20" class="">
					<input type="url" name="网址" placeholder="your blog url *" size="20" class="">
				</div>
        <div>
          <label>上传头像：</label>
          <input type="file" name="avator" id="avator">
          <input type="hidden" id="avatorVal">
          <img class="preview" alt="预览头像">
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
				<li v-for="(item,key) in messageList">
					<div class="mes_people"><img src="'http://localhost:3000/images/'+item.avator" alt=""></div>
					<div class="mes_content">
            <span>{{item.name}}</span>
            <span>{{item.moment}}</span><br />
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
	export default{
		name: "message_board",
		data(){
			return{
        messageList: []
			}
		},mounted(){
      $('#avator').change(function(){
        if (this.files.length != 0) {
          var file = this.files[0],
            reader = new FileReader();
          if (!reader) {
            this.value = '';
            return;
          };
          console.log(file.size,file.type)
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
      });
      $('.submit').click(function(){
        return this.$axios.post('http://localhost:3000/message', {
          name: $('textarea[name=name]').val(),
          content: $('input[name=content]').val(),
          avator: $('#avatorVal').val()
        }).then(res => {
          this.messageList = res.data.data;
        })
          .catch(error =>{
            console.log(error);
          });
      });
    },
    created () {
      //this.$axios('/api/articleList').then(res => {
      this.$axios('http://localhost:3000/messages').then(res => {
        this.messageList = res.data.data;
      })
        .catch(error =>{
          console.log(error);
        });

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
	}
	.articles{
		position: relative;
		box-sizing: border-box;
		width: 90%;
		margin: 40px auto;
		border-radius: 10px;
	}
	.textarea-inherit {
        width: 94.5%;
        overflow: auto;
        border-radius: 5px;
    }
	.information{

	}
	.information input{
		flex: 1;
    width: 31%;
		height: 25px;
    margin-bottom: 10px;
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
  @media screen and (max-width: 768px) {
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
