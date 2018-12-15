<template>		
	<div class="sidebar" v-if="show">
		<div class="contact">
			<img src="../assets/img/t2.jpeg" alt="">
			<h2 class="ft1">can you catch me ?</h2>
			<ul class="items">
				<li v-for="item in catchList">
					<div class="wz">{{item.name}}</div>
					<a v-bind:href="item.url" target="view_window">
					<div v-bind:class="item.icon" class="iconfont ic"></div></a>
				</li>
			</ul>
		</div>
		<div class="star">
			<h2 class="ft1">do you like me ?</h2>
			<i class="iconfont icon-zan" v-on:click.once="count+=1"></i>
			<h2>{{count}}</h2>
		</div>
		<div class="close">
			<p class="ft1" v-on:click="show_hidden">close the sidebar</p>
		</div>
	</div>

</template>

<script>
	export default{
		name: "layout",
		data(){
			return{
				catchList:[
				{
					name: "github",
					url:"https://github.com/butGrey",
					icon: "icon-github"
				},
				{
					name: "Email",
					url:"mailto:bllchestnut@163.com",
					icon: "icon-email"
				},
				{
					name: "zhihu",
					url:"https://www.zhihu.com/",
					icon: "icon-zhihu0"
				},
				{
					name: "weibo",
					url:"https://weibo.com/",
					icon: "icon-weibo"
				},
				{
					name: "twitter",
					url:"https://www.baidu.com/",
					icon: "icon-twitter0"
				},
				{
					name: "QQ",
					url:"https://www.qq.com/",
					icon: "icon-unie652"
				},
				{
					name: "weixin",
					url:"https://wx.qq.com/",
					icon: "icon-weixin"
				}
				],
				count: 0,
				show: true
			}
		},
		methods:{
			show_hidden(){
				this.show = !this.show;
			}
		}			
	}
</script>

<style scoped>
	@media screen and (max-width: 1024px){
		.sidebar {
		    display: none;
		}
	}
	.sidebar{
		float: right;
		width: 20%;
		margin-top: -20px;
	}
	.contact{
		width: 220px;
		height: 350px;
		background-color: #fff;
		margin: 20px auto;
		padding: 10px;
		text-align: center;
		border-radius: 10px;
	}
	.contact img{
		width: 200px;
		height: 200px;
		border-radius: 10px;
		/*box-shadow: -1px 0px 2px #333333;*/
	}
	.ft1{
		font-size: 18px;
		font-weight: bold;
		color: #fb8183;
		margin: 0px;
	}
	.items{
		width: 200px;
		height: 100px;
		margin: 10px;
		padding-left: 15px;
	}
	.items li{
		display: inline-block;
		width: 50px;
		height: 50px;
	}
	.wz{
		width: 30px;
		height: 10px;
		margin-bottom: 5px;
		color: #fb8183;
		opacity: 0;
		transition: 1.5s;
	}
	.ic{
		width: 30px;
		height: 30px;
		border-radius: 50%;
		text-align: center;
		background-color: #fb8183;
	}
	.iconfont{
		line-height: 30px;
		font-size: 25px;
	}
	.star{
		width: 220px;
		background-color: #fff;
		margin: 20px auto;
		padding: 10px;
		text-align: center;
		border-radius: 10px;
	}
	.star .iconfont{
		font-size: 36px;
		line-height: 70px;
	}
	.star h2{
		margin-top: 10px;
		color: #fb8183;
	}
	.close{
		width: 220px;
		background-color: #fff;
		margin: 20px auto;
		padding: 10px;
		text-align: center;
		border-radius: 10px;
	}
	.items li:hover .wz{
		opacity: 1;
	}
	.star i:hover {
		color: red;
		cursor: pointer;
	}
</style>
