<template>
	<div class="page">
		<div class="page-view">
			<article class="articles" v-for="(item,index) in currentArticleList">
				<div class="contents writing fl" :class="{'fr':index%2}">
					<div class="title"><router-link :to="{ path:'/article_detail' , query: { id: item.id } }" class="a">{{item.title}}</router-link></div>
          <div class="time">
            <svg class="icon itime" aria-hidden="true">
              <use xlink:href="#icon-shijian"></use>
            </svg>
            <i class="art-time">发布于 {{item.moment}}</i>
          </div>
					<p class="art-content" v-html="item.content"><br /></p>
					<router-link :to="{ path:'/article_detail' , query: { id: item.id } }" class="more">
            <i class="iconfont icon-shenglvehao"></i>
          </router-link>
				</div>
        <a class="contents thumb fl" :class="{'fr':index%2}">
          <img :src="'http://localhost:3000/images/'+item.img" alt="">
        </a>
			</article>
	    	<my-pagination v-if="articleList.length>5" :pagination="pagination" v-on:page-change="pageNumChange"> </my-pagination>
		</div>
	</div>
</template>

<script>
	export default{
		name: "layout",
		data(){
			return{
				articleList:[],
				currentArticleList:[],
				pagination: {
					currentPage: 1,
					totalItems: '',
					pageSize: 5,
					type: 0,
					pageNumChange: function (currentPage) {
						console.log(currentPage);
					},
					pageUpdate: function (argument) {
					},
					pageOptionChange: function (argument) {
					}
				},
			}
		},
		created () {
	      this.$axios('http://localhost:3000/articles').then(res => {
					this.pagination.totalItems = Math.ceil(res.data.data.length/5);
					this.articleList = res.data.data;
					this.currentArticleList = this.articleList.slice(0,5);
				})
				.catch(error =>{
					console.log(error);
				})
		},
		methods:{
			pageNumChange: function (currentPage) {
				this.currentArticleList = this.articleList.slice( currentPage*5-5, currentPage*5);
			}
		},
		mounted(){
        }
	}
</script>

<style scoped lang="scss">
	@media screen and (max-width: 1024px){
		.page-view{
		    width: 100%!important;
		    float: none;
		}
	}
	.page{
		background-color: #fff;
		height: calc(100vh - 0px);
		width: calc(100vw + 20px);
		display: inline-block;
		overflow: scroll;
    &-view{
      width: 65%;
      color: #000;
      margin: 120px auto;
      text-align: center;
      border-radius: 10px;
      .articles{
        position: relative;
        box-sizing: border-box;
        width: 65%;
        height: 300px;
        margin: 40px auto;
        box-shadow: 1px 1px 10px #ccc;
        border-radius: 10px;
        background-color: #fff;
        transition: all .6s;
        .contents{
          height: 100%;
          overflow: hidden;
          color: #504e4e;
          .title{
            font-size: 24px;
          }
          .time{
            color: #a9a9a9;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            pointer-events: none;
            transition: all .6s;
          }
          .more{
            float: left;
            margin-left: 20px;
            i{
              font-size: 24px;
              color: #525252;
            }
          }
          .title a:hover,.more i:hover{
            color: #ff6c00;
          }
        }
        .writing{
          width: 47%;
          padding-top: 40px;
        }
      }
    }
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
	    color: #000;
	    text-align: center;
	    line-height: 30px;
	    background-color: #fff;
	    box-shadow: 1px 1px 4px #bbbbbb;
	}
	  .itime{
	    vertical-align: -0.9rem;
	  }
	.day p{
		font-size: 16px;
	}
	.category{
		position: absolute;
		width: 80px;
		height: 25px;
		margin-top: 6rem;
		left: -14px;
		background-color: #fff;
		color: #bbb;
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
  .thumb{
    width: 53%;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
  }
  .articles:hover{
    box-shadow: 0 5px 10px 5px rgba(110,110,110,.4);
    img{
      transform: scale(1.1);
    }
  }
	.art-content{
		position:relative;
		max-height: 90px;
		margin: 20px;
		text-align: left;
		font-size: 14px;
		line-height: 30px;
		overflow: hidden;
		color: #504e4e;
	}
  @media screen and (max-width: 768px){
    .art-content{
      margin: 25px 0px 10px 0px;
    }
    .articles{
      margin: 40px 0px 40px 30px;
    }
  }
  .fl{
    float: left;
    border-radius: 0 10px 10px 0;
  }
  .fr{
    float: right;
    border-radius: 10px 0 0 10px;
  }
</style>
