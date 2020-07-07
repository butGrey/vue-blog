<template>
  <div class="pages-view">
    <form method="post" id="form_message" class="mb20">
      <div class="message">
        <textarea v-model ="content" placeholder="something you want to say( ps: unable to delete ... )" class="textarea-inherit" name="content" rows="3"></textarea>
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
            <div class="button" v-on:click="showReplay($event)">回复({{item.relen}})</div>
            <div class="content" v-html="item.content" v-on:click="show($event)"></div>

            <form method="post" class="form_message reform">
              <div class="img-avators">
                <div class="information">
                  <div class="message">
                    <textarea v-model ="recontent" placeholder="something you want to say( ps: unable to delete ... )" class="textarea-inherit" name="content" rows="3"></textarea>
                  </div>
                  <div class="submit submit1" v-on:click="mesSubmit(item.id,'',$event)">回复</div>
                </div>
              </div>
            </form>

            <ul class="mes ml40" style="display: none;">
              <li class="mb10" v-for="(items,key) in messagereplyList" v-if="item.id==items.postid">
                <div class="mes_people"><img class="reply" :src=str+items.avator alt=""></div>
                <div class="mes_content" style="width: 94%">
                  <div class="right">
                    <span class="user">{{items.name}}</span>
                    <span v-if='items.rpname'> 回复  @{{items.rpname}}</span>
                    <span class="time">{{items.moment}}</span>
                  </div>
                  <div class="content" v-html="items.content" v-on:click="show($event)"></div>

                  <form method="post" class="form_message reform">
                    <div class="img-avators">
                      <div class="information">
                        <div class="message">
                          <textarea v-model ="recontents" placeholder="something you want to say( ps: unable to delete ... )" class="textarea-inherit" name="content" rows="3"></textarea>
                        </div>
                        <div class="submit submit1" v-on:click="mesSubmit(items.postid,items.name,$event)">回复</div>
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
  export default{
    name: "comment",
    data(){
      return{
        content: '',
        recontent: '' ,
        recontents: '' ,
        messageList: [],
        messagereplyList: [],
        str: 'http://localhost:3000/images/',
      }
    },
    props: {
      getUrl: String,
      getUrlre: String,
      postUrl: String,
    },
    mounted(){
    },
    methods:{
      mesSubmit(ci,rn,event){
        let that = this;
        if(!sessionStorage.getItem("user")||!sessionStorage.getItem("avator")){
          alert('请先登录！')
        }else{
          if(ci){
            if(rn){
              var content = this.recontents;
            }else{
              var content = this.recontent;
            }
          }else{
              var content = this.content;
          }
          if(content == ''){
            alert('请输入内容！')
            return
          }
          var name = sessionStorage.getItem("user");
          var avator = sessionStorage.getItem("avator");

          $.ajax({
            url: that.postUrl,
            data: {
              name: name,
              content: content,
              avator: avator,
              rpname: rn,
              postid: ci
            },
            type: "POST",
            cache: false,
            dataType: 'json',
            success: function (msg) {
              if(msg.code == 200){
                console.log('评论成功');
                $(".reform").css('display','none');
                that.$axios(that.getUrl).then(res => {
                  that.messageList = res.data.data;
                  for(let i=0;i<that.messageList.length;i++){
                    that.messageList[i].moment = that.$moment(that.messageList[i].moment, "YYYY-MM-DD HH:mm:ss").fromNow();
                  }
                  that.$axios(that.getUrlre).then(res => {
                    that.messagereplyList = res.data.data;
                    that.messageList.forEach(item=>{
                      item.relen = 0;
                      that.messagereplyList.forEach(x=>{
                        if(item.id==x.postid){
                          item.relen = item.relen+1
                        }
                      })
                    })
                  })
                    .catch(error =>{
                      console.log(error);
                    })
                })
                  .catch(error =>{
                    console.log(error);
                  });

              }else{
                console.log(msg.message)
              }
            },
            error: function () {
              alert('异常');
            }
          })
        }
      },
      show(that){
        if($(that.currentTarget.nextElementSibling).css('display')=='block'){
          $(that.currentTarget.nextElementSibling).css('display','none');
        }else{
          $(".reform").css('display','none');
          $(that.currentTarget.nextElementSibling).css('display','block');
        }
      },
      showReplay(that){
        if($(that.currentTarget.nextElementSibling.nextElementSibling.nextElementSibling).css('display')=='block'){
          $(that.currentTarget.nextElementSibling.nextElementSibling.nextElementSibling).css('display','none');
        }else{
          $(that.currentTarget.nextElementSibling.nextElementSibling.nextElementSibling).css('display','block');
        }
      }
    },
    created () {
      console.log('路由'+this.getUrl)
      this.$axios(this.getUrl).then(res => {
        this.messageList = res.data.data;
        for(let i=0;i<this.messageList.length;i++){
          this.messageList[i].moment = this.$moment(this.messageList[i].moment, "YYYY-MM-DD HH:mm:ss").fromNow();
        }
        console.log('回复路由'+this.getUrlre);
        this.$axios(this.getUrlre).then(res => {
          this.messagereplyList = res.data.data;
            this.messageList.forEach(item=>{
              item.relen = 0;
              this.messagereplyList.forEach(x=>{
                if(item.id==x.postid){
                  item.relen = item.relen+1
                }
              })
            })
            console.log(this.messageList)
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
</script>

<style scoped lang="scss">
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
  .button{
    position: absolute;
    right: 105px;
    top: 40px;
    width: 50px;
    height: 26px;
    color: #a9a9a9;
    margin-bottom: 10px;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    border-bottom: 1px solid;
  }
  .pages-view{
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }
  .articles{
    position: relative;
    box-sizing: border-box;
    margin: 0 auto;
    margin-bottom: 40px;
    border-radius: 10px;
  }
  .textarea-inherit {
    width: 100%;
    overflow: auto;
    border-radius: 2px;
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
    width: 68px;
    height: 30px;
    margin-bottom: 10px;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #a9a9a9;
    cursor: pointer;
  }
  .submit:hover{
    color: #ff6c00;
    border: 1px solid #ff6c00;
  }
  textarea:hover{
    border: 1px solid #ff6c00;
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
    font-size: 16px;
    font-weight: 600;
    font-family: Poiret One;
  }
  .count p{
    float: left;
    width: 100%;
    border: 1px dashed #a9a9a9;
  }
  .mes{
    position: relative;
    width: 100%;
    height: 100%;
    li{
      border-bottom:1px solid rgba(0,0,0,.05);
    }
  }
  .messagelist{
    position: relative;
    width: 100%;
    min-height: 85px;
    margin: 20px 0;
    padding-bottom: 10px;
  }
  .mes_people{
    display: inline-block;
    vertical-align: top;
    margin-left: -60px;
  }
  .mes_people img{
    width: 50px;
    height: 50px;
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
    cursor: pointer;
    font-weight: 600;
    color: #af9ad8;
    font-size: 12px;
  }
  .content{
    cursor: pointer;
    width: 90%;
    text-align: left;
    line-height: 20px;
    margin-top: 5px;
    min-height: 60px;
  }
  .time{
    cursor: pointer;
    color: #a9a9a9;
    font-weight: 400;
    font-size: 10px;
    float: right;
  }
  .img-avators {
    text-align: left;
  }
  .img-avator input{
    vertical-align: top;
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
