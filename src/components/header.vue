<template>
	<div class="hd">
		<template  v-if="searchBarFixed">
			<div class="nav searchBar" id="searchBar">			
				<ul class="navs">
					<li>
						<svg class="icon" aria-hidden="true"><use xlink:href="#icon-zhuye"></use></svg>
						<a href="">主页</a>
					</li>
					<li>
						<svg class="icon" aria-hidden="true"><use xlink:href="#icon-alarm_clock"></use></svg>
						<a href=""><router-link to="time_axis" class="button">时间轴</router-link></a>
					</li>
					<li class="drog_menu displayn">
						<svg class="icon" aria-hidden="true"><use xlink:href="#icon-mac"></use></svg>
						<a href="">作品集</a>
						<ul>
							<li v-for="item in demoList"><a v-bind:href="item.url" target="view_window">{{item.name}}</a></li>
						</ul>
					</li>
					<li class="drog_menu displayn">
						<svg class="icon" aria-hidden="true"><use xlink:href="#icon-tubiaozhizuomoban"></use></svg>
						<a href="">文字</a>
						<ul>
							<li><router-link to="writing_work" class="button">始于梦想</router-link></li>
							<li><router-link to="writing_life" class="button">止于生活</router-link></li>
						</ul>
					</li>
					<li>
						<svg class="icon" aria-hidden="true"><use xlink:href="#icon-liuyan"></use></svg>
						<a href=""><router-link to="message_board" class="button">留言板</router-link></a>
					</li>
					<li>
						<svg class="icon" aria-hidden="true"><use xlink:href="#icon-cansaitubiaozhuanqu-"></use></svg>
						<a href="">友人帐</a>
					</li>					
					<li>
						<svg class="icon" aria-hidden="true"><use xlink:href="#icon-zan1"></use></svg>
						<a href="">赞赏</a>
					</li>
					<li>
						<svg class="icon" aria-hidden="true"><use xlink:href="#icon-wode"></use></svg>
						<a href=""><router-link to="about_me" class="button">关于我</router-link></a>
					</li>
				</ul>			
			</div>
		</template>
		<div class="bg">
			<div class="ft">Hello , Sunshine .</div>
			<div class="tx" id="tx">
				<img src="../assets/img/t1.jpg" alt="" class="imgs">
				<p>have a nice day .</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: "headers",
		data(){
			return{
				searchBarFixed:'true',
				demoList:[
					{
						name: "LinliBai's CV",
						url:"http://39.108.165.251:8080/dist/"
					},
					{
						name: "micro-blog",
						url:"https://github.com/butGrey/micro-blog"
					},
					{
						name: "demo01",
						url:"https://github.com/butGrey/myblog"
					}
				]
			}
		},
		mounted () {
			  	window.addEventListener('scroll', this.handleScroll);
			},
		methods:{
			// handleScroll () {
			// 	  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
			// 	  console.log(scrollTop)
			// 	},
			handleScroll () {
			  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			  // var offsetTop = document.querySelector('#searchBar').offsetTop;
			  var offsetTop = document.getElementById('tx').offsetHeight+300;
			  if (scrollTop > offsetTop) {
			    this.searchBarFixed = false;
			  } else {
			    this.searchBarFixed = true;
			  }
			},
			destroyed () {
				window.removeEventListener('scroll', this.handleScroll);
			}
		}
	}
</script>

<style scoped>
	.hd{
		position: relative;
    width: 100%;
    display: flex;
    flex: 1;
	}
	.nav{
		z-index: 999;
		position: fixed;
		top: 0px;
		height: 40px;
		width: 100%;
		background-color: rgba(250,146,137,.8);
	}
  .navs{
    display: flex;
    flex: 1;
    text-align: center;
  }
	.navs li{
		list-style: none;
		height: 100%;
		text-align: center;
    margin: 0 auto;
	}
	.navs li svg{
		font-size: 20px;
	}
	.navs li a{
		font-size: 14px;
		font-weight: bold;
		color: #fff;
		line-height: 40px;
    margin: 0 auto;
	}
  .drog_menu{
    position: relative;
  }
	.drog_menu ul{
		position: absolute;
		display: block;
		width: 100px;
    left: -10px;
		height: 0px;
    margin-top: -1px;
		transform: scaleY(0);
		transition: .5s;
	}
	.drog_menu ul li{
		position: relative;
		display: block;
		width: 100%;
		height: 40px;
		line-height: 40px;
		background-color: rgba(250,146,137,.8);
		font-size: 16px;
		font-weight: bold;
		color: #fff;
	}
	.bg{
		position: relative;
		height: 38rem;
		width: 100%;
		margin-bottom: 10rem;
		text-align: center;
		background:url(../assets/img/11.jpg);
    background-repeat: no-repeat;
		background-size:100% 100%;
	}
	.ft{
		position: absolute;
		width: 100%;
		text-align: center;
		margin: 14rem auto;
		font-size: 3rem;
		color: #fff;
    font-family: 'Fredericka the Great', cursive;
	}
	.tx{
		position: absolute;
		z-index: 3;
		width: 30rem;
		height: 15rem;
		text-align: center;
		border-radius: 10px;
		background-color: rgba(255,255,255,.5);
    left: 0;
    right: 0;
    top: 35rem;
    bottom: 0;
    margin: auto;
	}
	.tx img{
		width: 140px;
		height: 140px;
		margin-top: 30px;
		border-radius: 50%;
	}
	.tx p{
		margin-top: 10px;
		font-size: 1.5rem;
		font-weight: bold;
		color: #fb8183;
    font-family: 'Indie Flower', cursive;
	}
	li:hover ul{
		transform: scaleY(1);
	}
	li:hover ul li{
		background-color: rgba(250,146,137,.8);
	}
	.drog_menu:hover{
		background-color: rgba(250,146,137,0);
	}
	.imgs:hover{

	}
  @media screen and (max-width: 685px) {
    .displayn,svg,.tx{
      display: none !important;
    }
    .bg{
      margin: 0px;
      height: 16rem;
    }
    .ft{
      margin: 8rem auto;
      font-size: 2.5rem;
    }
  }
</style>
