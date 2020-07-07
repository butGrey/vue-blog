<template>
	<div class="pages-view">
		<div class="articles">
			<ul class="timeline">
				<li v-for="(item,key) in articleList">
					<div v-if="articleList[key + 1] && item.year != articleList[key + 1].year">
						<div class="piece_year"></div>
						<h2>{{ articleList[key + 1].year}}</h2>
					</div>
					<div v-if="articleList[key - 1]==undefined">
						<div class="piece_year"></div>
						<h2>{{ item.year}}</h2>
					</div>
					<div class="piece_day"></div>
					<span style="font-size: 14px;">{{item.month}}-{{item.day}}</span>
					<router-link :to="{ path:'/article_detail' , query: { item } }" class="a"><span>{{item.title}}</span></router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name: "time_axis",
		data(){
			return{
				articleList:[],
				timeList:[
					{
						year: "2018",
						month: "10",
						day: "28",
						title: "流畅地开发一个react组件"
					}
				]
			}
		},
		methods:{
			compare:function(year1,year2){
				if (year1==year2) {
					return false;
				}
				else{
					return true;
				}
			}
		},
		created () {
			this.$axios(this.baseURL+'/articles').then(res => {
				this.articleList = res.data;
        for(var i=0;i<this.articleList.length;i++){
          this.articleList[i].year = this.$moment(this.articleList[i].moment).year();
          this.articleList[i].month = this.$moment(this.articleList[i].moment).month()+1;
          this.articleList[i].day = this.$moment(this.articleList[i].moment).date();
        }
			})
			.catch(error =>{
				console.log(error);
			})
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
		border-radius: 10px;
	}
	.articles{
		position: relative;
		box-sizing: border-box;
		width: 90%;
		height: 100%;
		margin: 10px auto;
    background-color: rgba(255,255,255,.5);
		border-radius: 10px;
		padding: 10px 110px;
	}
	.timeline{
		text-align: left;
		border-left: 1px solid #FFD9C9;
	}
	.timeline li{
		padding: 0 30px;
		margin: 30px auto;
		font-size: 14px;
		line-height: 36px;
		border-bottom:1px dashed #FFD9C9;
	}
	.piece_year{
		position: absolute;
		left: 100px;
		margin-top: 8px;
		border-radius: 50%;
		border: 10px solid #FFD9C9;
	}
	.piece_day{
		position: absolute;
		margin-top: 30px;
		left: 105px;
		border-radius: 50%;
		border: 6px solid #FFD9C9;
	}
  .timeline li a span:hover{
    text-shadow: 0 0 0.2em #FFD9C9, 0 0 0.1em #FFD9C9;
  }
  @media screen and (max-width: 767px) {
    .articles{
      padding: 0px;
    }
    .piece_year,.piece_day{
      display: none;
    }
  }

</style>
