<template>
	<div class="pages-view">
		<div class="articles">
			<div class="day">
        <p>{{article.month}}月</p>
        <p>{{article.day}}日</p>
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
    <div class="articles">
      <form method="post" id="form_message">
        <div class="img-avators">
          <div class="img-avator">
            <div class="userimg">
              <input type="hidden" class="avatorVal">
              <img class="preview" alt="">
            </div>
            <div class="btn btn-success fileinput-button">
              <span class="submit">上传</span>
              <input type="file" name="avator" class="avator" onchange="imgImport(event,this)">
            </div>
          </div>
          <div class="information">
            <input type="text" name="name" placeholder="your name *" size="20" class="">
            <!--<input type="email" name="email" placeholder="your email *" size="20" class="">-->
            <!--<input type="url" name="网址" placeholder="your blog url *" size="20" class="">-->
            <div class="message">
              <textarea placeholder="something you want to say( ps: unable to delete or reply ... )" class="textarea-inherit message_textarea" name="content" rows="3"></textarea>
            </div>
            <div class="submit" id="submit1" v-on:click="mesSubmit(article.id,'','',$event)">提交</div>
          </div>
        </div>
      </form>
    </div>
    <div class="articles">
      <div class="count">
        <span>Comments / {{commentList.length}}</span>
        <p></p>
      </div>
      <ul class="mes">
        <li class="messagelist" v-for="(item,key) in commentList">
          <div class="mes_people"><img :src=str+item.avator alt=""></div>
          <div class="mes_content">
            <div class="right">
              <span class="user">{{item.name}}</span>
              <span class="time">{{item.moment}}</span>
            </div>
            <div class="content" v-html="item.content"></div>
            <!--<form action="post">-->
              <!--<div class="message message2">-->
                <!--<textarea placeholder="something you want to say ..." class="textarea-inherit" id="message_reply" name="reply" rows="3"></textarea>-->
                <!--<div class="submit submit2">回复</div>-->
              <!--</div>-->
            <!--</form>-->
            <div class="submit" onclick="show(event,this)">回复</div>
            <form method="post" class="form_message">
              <div class="img-avators">
                <div class="img-avator">
                  <div class="userimg">
                    <input type="hidden" class="avatorVal">
                    <img class="preview" alt="">
                  </div>
                  <div class="btn btn-success fileinput-button">
                    <span class="submit">上传</span>
                    <input type="file" name="avator" class="avator" onchange="imgImport(event,this)">
                  </div>
                </div>
                <div class="information">
                  <input type="text" name="name" placeholder="your name *" size="20" class="">
                  <div class="message">
                    <textarea placeholder="something you want to say( ps: unable to delete or reply ... )" class="textarea-inherit message_textarea" name="content" rows="3"></textarea>
                  </div>
                  <div class="submit submit1" v-on:click="mesSubmit(article.id,item.id,'',$event)">提交</div>
                </div>
              </div>
            </form>
            <ul class="mes">
              <li class="messagelist" v-for="(items,key) in commentreplyList" v-if="item.id==items.commentid">
                <div class="mes_people"><img :src=str+items.avator alt=""></div>
                <div class="mes_content">
                  <div class="right">
                    <span class="user">{{items.name}}</span>
                    <span class="time">{{items.moment}}</span>
                  </div>
                  <div class="content" v-html="items.content"></div>
                  <div class="submit" onclick="show(event,this)">回复</div>
                  <form method="post" class="form_message">
                    <div class="img-avators">
                      <div class="img-avator">
                        <div class="userimg">
                          <input type="hidden" class="avatorVal">
                          <img class="preview" alt="">
                        </div>
                        <div class="btn btn-success fileinput-button">
                          <span class="submit">上传</span>
                          <input type="file" name="avator" class="avator" onchange="imgImport(event,this)">
                        </div>
                      </div>
                      <div class="information">
                        <input type="text" name="name" placeholder="your name *" size="20" class="">
                        <div class="message">
                          <textarea placeholder="something you want to say( ps: unable to delete or reply ... )" class="textarea-inherit message_textarea" name="content" rows="3"></textarea>
                        </div>
                        <div class="submit submit1" v-on:click="mesSubmit(article.id,item.id,items.name,$event)">提交</div>
                      </div>
                    </div>
                  </form>
                </div>
              </li>
            </ul>
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
          commentreplyList:[],
          str: 'http://localhost:3000/images/'
		    }
  		},
  		mounted() {
  			//this.fetchData();
        // $('#avator').change(function(){
        //   if (this.files.length != 0) {
        //     var file = this.files[0],
        //       reader = new FileReader();
        //     if (!reader) {
        //       this.value = '';
        //       return;
        //     };
        //     console.log(file.size,file.type)
        //     // if (file.size >= 1024 * 1024 / 2) {
        //     // 	fade("请上传小于512kb的图片!")
        //     // 	return
        //     // }
        //     if (!/image/g.test(file.type)) {
        //       alert("请上传图片文件!")
        //       $('#avatorVal').val('')
        //       $('form .preview').attr('src', '')
        //       $('form .preview').fadeOut()
        //       return
        //     }
        //     reader.onload = function (e) {
        //       this.value = '';
        //       $('form .preview').attr('src', e.target.result)
        //       $('form .preview').fadeIn()
        //       var image = new Image();
        //       image.onload = function(){
        //         var canvas = document.createElement('canvas');
        //         var ctx = canvas.getContext("2d");
        //         canvas.width = 100;
        //         canvas.height = 100;
        //         ctx.clearRect(0, 0, 100, 100);
        //         ctx.drawImage(image, 0, 0, 100, 100);
        //         var blob = canvas.toDataURL("image/png");
        //         $('#avatorVal').val(blob)
        //       }
        //       image.src = e.target.result
        //     };
        //     reader.readAsDataURL(file);
        //   };
        // })

  		},
  		methods: {
        mesSubmit (id,cid,rn,event) {
             // console.log($('.form').serialize())
             if ($(event.currentTarget).siblings('input[name=name]').val().trim() == '') {
               alert('请输入用户名！')
             }else if($(event.currentTarget).siblings('input[name=name]').val().match(/[<'">]/g)){
               alert('请输入合法字符！')
             }else if($(event.currentTarget).parent().siblings('.img-avator').children('.userimg').children('.avatorVal').val() == ''){
               alert('请上传头像！')
             }else{
               $.ajax({
                 url: 'http://localhost:3000/article_detail/' + id,
                 data: {
                   name: $(event.currentTarget).siblings('input[name=name]').val(),
                   content: $(event.currentTarget).siblings('.message').children('textarea[name=content]').val(),
                   avator: $(event.currentTarget).parent().siblings('.img-avator').children('.userimg').children('.avatorVal').val(),
                   rpname: rn,
                   commentid: cid
                 },
                 type: "POST",
                 cache: false,
                 dataType: 'json',
                 success: function (msg) {
                   if(msg.code == 200){
                     console.log('评论成功')
                     setTimeout(function(){
                       window.location.reload()
                     },500)
                   }else{
                     console.log(msg)
                   }
                 },
                 error: function () {
                   alert('异常');
                 }
               })
             }
	  		 }
  		},
    created () {
      this.$axios('http://localhost:3000/articles').then(res => {
        this.key = this.$route.query.key;
        this.article = res.data.data[this.key];
        this.article.day = this.$moment(this.article.moment).date();
        this.article.month = this.$moment(this.article.moment).month()+1;
        console.log(this.article.moment);
        this.$axios('http://localhost:3000/comments/' + this.article.id).then(res => {
          this.commentList = res.data.data;
          for(let i=0;i<this.commentList.length;i++){
            this.commentList[i].moment = this.$moment(this.commentList[i].moment, "YYYY-MM-DD HH:mm:ss").fromNow();
          }
          this.$axios('http://localhost:3000/commentreplys/' + this.article.id).then(res => {
            this.commentreplyList = res.data.data;
          })
            .catch(error =>{
              console.log(error);
            })
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
  window.imgImport=function (e,that) {
    if (that.files.length != 0) {
      var file = that.files[0],
        reader = new FileReader();
      if (!reader) {
        that.value = '';
        return;
      }
      console.log(file.size,file.type);
      if (!/image/g.test(file.type)) {
        alert("请上传图片文件!");
        $(that).parent().siblings('.userimg').children('.avatorVal').val('');
        $(that).parent().siblings('.userimg').children('.preview').attr('src', '');
        $(that).parent().siblings('.userimg').children('.preview').fadeOut();
        return
      }
      reader.onload = function (e) {
        that.value = '';
        $(that).parent().siblings('.userimg').children('.preview').attr('src', e.target.result);
        $(that).parent().siblings('.userimg').children('.preview').fadeIn();
        var image = new Image();
        image.onload = function(){
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext("2d");
          canvas.width = 100;
          canvas.height = 100;
          ctx.clearRect(0, 0, 100, 100);
          ctx.drawImage(image, 0, 0, 100, 100);
          var blob = canvas.toDataURL("image/png");
          $(that).parent().siblings('.userimg').children('.avatorVal').val(blob)
        }
        image.src = e.target.result
      };
      reader.readAsDataURL(file);
    }
  }
  window.show=function(event,that){
    if($(that).next('form').css('display')=='block'){
      $(that).next('form').css('display','none');
    }else{
      $(that).next('form').css('display','block');
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
	/*.articless{*/
		/*position: relative;*/
		/*box-sizing: border-box;*/
		/*width: 90%;*/
		/*margin: 40px auto;*/
		/*border-radius: 10px;*/
	/*}*/
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
  .form_message{
    display: none;
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
    font-size: 16px;
    font-weight: 600;
    font-family: Poiret One;
	}
	.count p{
		float: left;
		width: 100%;
		border: 1px dashed #fb8183;
	}

	/*.mes{*/
		/*position: relative;*/
		/*width: 100%;*/
		/*height: 100%;*/
	/*}*/
	/*.mes_people img{*/
		/*width: 60px;*/
		/*height: 60px;*/
		/*float: left;*/
		/*border-radius: 50%;*/
	/*}*/
	/*.mes_people span{*/
		/*float: left;*/
		/*margin-left: 20px;*/
	/*}*/
	/*.mes_content{*/
		/*float: left;*/
		/*width: 80%;*/
		/*margin: 5px;*/
		/*padding: 0 15px;*/
	/*}*/
	/*.mes_content p{*/
		/*text-align: left;*/
		/*line-height: 20px;*/
	/*}*/
  /*.pages-view{*/
    /*width: 65%;*/
    /*margin: 0 auto;*/
    /*text-align: center;*/
  /*}*/
  .articles{
    position: relative;
    box-sizing: border-box;
    width: 90%;
    margin: 2.5rem auto;
    border-radius: 10px;
  }
  .textarea-inherit {
    width: 95%;
    overflow: auto;
    border-radius: 5px;
    padding-left: 8px;
  }
  .information{
    width: 80%;
    margin-left: 10px;
    display: inline-block;
    text-align: left;
    vertical-align: top;
  }
  .information input{
    flex: 1;
    width: 200px;
    height: 25px;
    padding-left: 8px;
    margin-bottom: 10px;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  .information input:active{
    border:1px solid #fb8183;
  }
  .information input:focus{
    border:1px solid #fb8183;
  }
  #submit1{
    margin-top: 4px;
  }
  .submit{
    display: inline-block;
    width: 40px;
    background-color: #fb8183;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;
  }
  .submit2{
    opacity: 0;
    margin-top: 5px;
    margin-bottom: 10px;
    transition: 2s;
  }
  .count{
    width: 100%;
    height: 20px;
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
  .messagelist{
    position: relative;
    width: 100%;
    min-height: 85px;
    margin: 20px 0;
    border-bottom:1px dashed #fb8183;
  }
  .mes_people{
    display: inline-block;
    vertical-align: top;
    margin-left: -60px;
  }
  .mes_people img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .mes_content{
    text-align: left;
    display: inline-block;
    width: 80%;
    padding: 0 15px;
  }
  .user{
    font-weight: 600;
    color: #ea8082;
    font-size: 14px;
  }
  .userimg{
    margin-top: 7px;
  }
  .content{
    text-align: left;
    line-height: 20px;
    margin: 10px 0;
    min-height: 35px;
  }
  .time{
    font-size: 10px;
    float: right;
    color: rgba(99, 104, 109, 0.35);
  }
  .message2{
    position: absolute;
    transform: scaleY(0);
    transition: 0s;
  }
  .mes_content:hover .message2 {
    position: relative;
    transform: scaleY(1);
    transition: 0.5s;
  }
  .mes_content:hover .submit2 {
    transition-delay: 0.3s;
    opacity: 1;
  }
  .img-avators {
    text-align: left;
  }
  .img-avator{
    text-align: left;
    display: inline-block;
    width: 100px;
  }
  .img-avator input{
    vertical-align: top;
  }
  .preview{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #fb8183;
  }
  @media screen and (max-width: 767px) {
    .mes_people{
      width: 12%;
      margin-left: 0px;
    }
    .mes_people img{
      width: 50px;
      height: 50px;
    }
    .mes_content{
      width: 75%;
    }
    .information{
      width: 13rem;
    }
    .img-avator{
      width: 6.25rem;
    }
  }
  .fileinput-button {
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .fileinput-button input{
    position:absolute;
    right: 0px;
    top: 0px;
    opacity: 0;
    -ms-filter: 'alpha(opacity=0)';
    font-size: 200px;
  }
</style>
