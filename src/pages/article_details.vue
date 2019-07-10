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
		margin: 150px auto;
		text-align: center;
		border-radius: 10px;
	}
	.articles{
		position: relative;
		box-sizing: border-box;
		width: 90%;
		margin: 40px auto;
    background-color: #5a576f;
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
		background-color: #5a576f;
		color: #fff;
		text-align: center;
		line-height: 30px;
		box-shadow: 1px 1px 4px #bbbbbb;

	}
	.day p{
		font-size: 16px;
	}
	.category{
		position: absolute;
		width: 80px;
		height: 25px;
		margin-top: 130px;
		left: -14px;
		background-color: #5a576f;
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
	.title a{
		color: #fff;
	}
	.art-content{
		position:relative;
		margin: 50px 30px 10px 30px;
		text-align: left;
		font-size: 14px;
		line-height: 30px;
	}
	.count{
		width: 100%;
		height: 40px;
	}
	.count span{
    float: left;
    color: #fff;
    font-size: 16px;
    font-family: Poiret One;
	}
	.count p{
		float: left;
		width: 100%;
		border: 1px dashed #fff;
	}
  .articles{
    position: relative;
    box-sizing: border-box;
    width: 90%;
    margin: 2.5rem auto;
    border-radius: 10px;
  }
  .count{
    width: 100%;
    height: 20px;
  }
  .count span{
    float: left;
    color: #fff;
  }
  .count p{
    float: left;
    width: 100%;
    border: 1px dashed #fff;
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
</style>
