<template>
  <div class="articleView">
    <div class="bg">
      <img :src="src" alt="">
      <header class="header">
        <div>{{article.title}}</div>
        <p>{{article.category}}·<i class="art-time">{{article.moment}}</i></p>
      </header>
    </div>
    <article class="markdown-body" v-html="article.content"></article>
    <my-comment v-if="postUrl" :getUrl="getUrl" :getUrlre="getUrlre" :postUrl="postUrl"></my-comment>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        article: {},
        src: '',
        getUrl: '',
        getUrlre: '',
        postUrl: ''
      }
    },
    mounted() {
      this.$axios.get(this.baseURL+'/getArticleDetail/' + this.$route.query.id).then(res => {
        this.article = res.data;
        this.src = this.baseURL+'/images/'+res.data.img;
        this.getUrl = this.baseURL+'/comments/' + this.$route.query.id;
        this.getUrlre = this.baseURL+'/commentreplys/' + this.$route.query.id;
        this.postUrl = this.baseURL+'/article_detail/' + this.$route.query.id;
      }).catch(error => {
          console.log(error);
        });
    }
  }
</script>

<style scoped lang="scss">
  @media screen and (max-width: 1020px) {
    .articleView {
      width: 100% !important;
      float: none;
    }
  }
  .pages-view{
    width: 800px;
  }
  .articleView {
    position: relative;
    margin: 0 auto;
    border-radius: 10px;
    .bg{
      overflow: hidden;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      background-origin: border-box;
      width: 100%;
      height: 400px;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
      }
      .header{
        position: absolute;
        top: 280px;
        left: 0;
        right: 0;
        color: #fff;
        text-shadow: 2px 2px 10px #5a5a5a;
        z-index: 1;
        max-width: 800px;
        padding: 0 10px;
        text-align: left;
        margin: 0 auto;
        bottom: 20px;
        height: 100px;
        div{
          font-size: 24px;
        }
        p{
          color: #fff;
          margin-top: 20px;
        }
      }
    }
    article{
      margin: 20px auto;
      padding: 20px 0 40px 0;
      width: 800px;
    }
  }

  .articles {
    position: relative;
    box-sizing: border-box;
    width: 90%;
    margin: 0 auto;
    border-radius: 10px;
  }

  .day {
    float: left;
    position: absolute;
    left: -30px;
    top: -20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    padding: 5px;
    text-align: center;
    line-height: 30px;
    box-shadow: 1px 1px 4px #bbbbbb;

  }

  .day p {
    font-size: 16px;
  }

  .category {
    position: absolute;
    width: 80px;
    height: 25px;
    margin-top: 130px;
    left: -14px;
    text-align: center;
    line-height: 25px;
    box-shadow: 0px 1px 3px #bbbbbb;
  }

  .category:after {
    content: '';
    position: absolute;
    top: 101%;
    left: 0;
    border-top: 7px solid #a8a6bb;
    border-right: 7px solid #a8a6bb;
    border-bottom: 7px solid transparent;
    border-left: 7px solid transparent;
  }

  .contents {
    padding: 20px;
  }

  .title {
    text-align: center;

  }

  .art-content {
    position: relative;
    text-align: left;
    font-size: 14px;
    line-height: 30px;
  }

  .count {
    width: 100%;
    height: 40px;
  }

  .count span {
    float: left;
    color: #fff;
    font-size: 16px;
    font-family: Poiret One;
  }

  .count p {
    float: left;
    width: 100%;
    border: 1px dashed #fff;
  }

  .articles {
    position: relative;
    box-sizing: border-box;
    max-width: 800px;
    margin: 2.5rem auto;
    border-radius: 10px;
  }

  .count {
    width: 100%;
    height: 20px;
  }

  .count span {
    float: left;
    color: #fff;
  }

  .count p {
    float: left;
    width: 100%;
    border: 1px dashed #fff;
  }

  @media screen and (max-width: 767px) {
    .mes_people {
      width: 12%;
      margin-left: 0px;
    }

    .mes_people img {
      width: 50px;
      height: 50px;
    }

    .mes_content {
      width: 75%;
    }

    .information {
      width: 13rem;
    }

    .img-avator {
      width: 6.25rem;
    }
  }
</style>
