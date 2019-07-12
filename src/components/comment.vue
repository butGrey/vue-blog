<template>
  <div class="pages-view">
    <form method="post" id="form_message" class="mb20">
      <div class="message">
        <textarea placeholder="something you want to say( ps: unable to delete or reply ... )" class="textarea-inherit" id="message_textarea" name="content" rows="3"></textarea>
      </div>
      <div class="submit" id="submit1" v-on:click="mesSubmit('','',$event)">提交</div>
    </form>

    <div class="articles">
      <div class="count">
        <span>Comments / {{messageList.length}} </span>
        <p></p>
      </div>
      <ul class="mes">
        <li class="messagelist" v-for="(item,key) in messageList">
          <div class="mes_people"><img :src=str+item.avator alt=""></div>
          <div class="mes_content">
            <div class="right">
              <span class="user">{{item.name}}</span>
              <span class="time">{{item.moment}}</span>
            </div>
            <div class="content" v-html="item.content" onclick="show(event,this)"></div>
           <!--  <div class="submit" onclick="show(event,this)">回复</div> -->
            <form method="post" class="form_message">
              <div class="img-avators">
                <div class="information">
                  <div class="message">
                    <textarea placeholder="something you want to say( ps: unable to delete or reply ... )" class="textarea-inherit" id="message_textarea" name="content" rows="3"></textarea>
                  </div>
                  <div class="submit submit1" v-on:click="mesSubmit(item.id,'',$event)">提交</div>
                </div>
              </div>
            </form>
            <ul class="mes ml40">
              <li class="mb10" v-for="(items,key) in messagereplyList" v-if="item.id==items.postid">
                <div class="mes_people"><img class="reply" :src=str+items.avator alt=""></div>
                <div class="mes_content" style="width: 94%">
                  <div class="right">
                    <span class="user">{{items.name}}</span>
                    <span> 回复  @{{items.rpname}}</span>
                    <span class="time">{{items.moment}}</span>
                  </div>
                  <div class="content" v-html="items.content" onclick="show(event,this)"></div>
                 <!--  <div class="submit" onclick="show(event,this)">回复</div> -->
                  <form method="post" class="form_message">
                    <div class="img-avators">
                      <div class="information">
                        <div class="message">
                          <textarea placeholder="something you want to say( ps: unable to delete or reply ... )" class="textarea-inherit" id="message_textarea" name="content" rows="3"></textarea>
                        </div>
                        <div class="submit submit1" v-on:click="mesSubmit(items.postid,item.name,$event)">提交</div>
                      </div>
                    </div>
                  </form>
                  <!--<form action="post">-->
                  <!--<div class="message message2">-->
                  <!--<textarea placeholder="something you want to say ..." class="textarea-inherit" id="message_reply" name="reply" rows="3"></textarea>-->
                  <!--<div class="submit submit2">回复</div>-->
                  <!--</div>-->
                  <!--</form>-->
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
  export default{
    name: "comment",
    data(){
      return{
        messageList: [],
        messagereplyList: [],
        str: 'http://localhost:3000/images/'
      }
    },
    props: {
      commentlist: Object
    },
    mounted(){
    },
    methods:{
      mesSubmit(ci,rn,event){
        if ($(event.currentTarget).siblings('input[name=name]').val().trim() == '') {
          alert('请输入用户名！')
        }else if($(event.currentTarget).siblings('input[name=name]').val().match(/[<'">]/g)){
          alert('请输入合法字符！')
        }else if($(event.currentTarget).parent().siblings('.img-avator').children('.userimg').children('.avatorVal').val() == ''){
          alert('请上传头像！')
        }else{
          $.ajax({
            url: 'http://localhost:3000/message',
            data: {
              name: $(event.currentTarget).siblings('input[name=name]').val(),
              content: $(event.currentTarget).siblings('.message').children('textarea[name=content]').val(),
              avator: $(event.currentTarget).parent().siblings('.img-avator').children('.userimg').children('.avatorVal').val(),
              rpname: rn,
              postid: ci
            },
            type: "POST",
            cache: false,
            dataType: 'json',
            success: function (msg) {
              if(msg.code == 200){
                console.log('评论成功');
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
      }
    },
    created () {
      this.$axios('http://localhost:3000/messages').then(res => {
        this.messageList = res.data.data;
        for(let i=0;i<this.messageList.length;i++){
          this.messageList[i].moment = this.$moment(this.messageList[i].moment, "YYYY-MM-DD HH:mm:ss").fromNow();
        }
        this.$axios('http://localhost:3000/messagereplys').then(res => {
          this.messagereplyList = res.data.data;
          console.log(this.messageList)
          console.log(this.messagereplyList)
        })
          .catch(error =>{
            console.log(error);
          })
      })
        .catch(error =>{
          console.log(error);
        });

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
  @media screen and (max-width: 1024px){
    .pages-view{
        width: 100%!important;
        float: none;   
    }
  }
  .mb20{
    margin-bottom: 20px;
  }
  .ml40{
    margin-left: 40px;
  }
  .mb10{
    margin-bottom: 10px;
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
    margin: 0 auto;
    margin-bottom: 40px;
    border-radius: 10px;
    background-color: #5a576f;
  }
  .textarea-inherit {
    width: 89%;
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
    border:1px solid #fff;
  }
  .information input:focus{
  border:1px solid #fff;
  }
  #submit1{
    margin-top: 4px;
  }
  .submit{
    display: inline-block;
    width: 32px;
    height: 30px;    
    margin-bottom: 10px;
    background-color: #5a576f;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    color: #fff;
    cursor: pointer;
    -webkit-box-shadow: 1px 1px 5px #888888;
    box-shadow: 1px 1px 5px #888888;
  }
  .submit2{
    opacity: 0;
    margin-top: 5px;
    margin-bottom: 10px;
    transition: 2s;
  }
  .form_message{
    display: none;
  }
  
  .count{
    width: 100%;
    height: 20px;
  }
  .count span{
    float: left;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    font-family: Poiret One;
  }
  .count p{
    float: left;
    width: 100%;
    border: 1px dashed #fff;
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
    border-bottom:1px dashed #fff;
    padding-bottom: 10px;
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
  .reply{
    width: 45px;
    height: 45px;
  }
  .mes_content{
    text-align: left;
    display: inline-block;
    width: 80%;
    padding: 0 15px;
  }
  .user{
    font-weight: 600;
    color: #af9ad8;
    font-size: 14px;
  }
  .content{
    text-align: left;
    line-height: 20px;
    margin-top: 5px;
    min-height: 60px;
  }
  .time{
    font-size: 10px;
    float: right;
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
  .userimg{
    margin-top: 7px;
  }
  .preview{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #fff;
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
