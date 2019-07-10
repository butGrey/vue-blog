<template>
	<div class="header">
		<ul>
			<li style="font-size: 16px;"><router-link to="home">首页</router-link></li>
			<li>时光轴</li>
			<li>留言板</li>
			<li><router-link :to="{ path:'/component' , query: { key } }" class="button">组件</router-link></li>
		</ul>
		<ul class="login">
			<li>登录</li>
			<li><router-link :to="{ path:'/signin' , query: { key } }" class="button">注册</router-link></li>
			<li>退出</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name: "headers",
		data(){
			return{
			}
		},
		mounted () {
			},
		methods:{
		}
	}
</script>

<style scoped>
	.header{
		width: 100%;
		height: 50px;
		line-height: 50px;
		padding-left: 20px;
		position: fixed;
		top: 0;
		color: #fff !important;
		background-color: #37324a;
		z-index: 999;
		box-shadow: 2px 1px 10px rgba(146, 146, 146, 0.5);
	}
	ul, li, a{
		color: #fff !important;
		display: inline-block;
		margin: 0 10px;
	}
	.login{
		position: absolute;
		right: 0;
	}
</style>
