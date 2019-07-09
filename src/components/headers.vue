<template>
	<div class="header">
		<ul>
			<li style="font-size: 16px;">首页</li>
			<li>时光轴</li>
			<li>留言板</li>
		</ul>
		<ul class="login">
			<li>登录</li>
			<li>注册</li>
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
		position: absolute;
		color: #fff;
		background-color: rgba(255,255,255,0);;
		box-shadow: 2px 1px 10px rgba(146, 146, 146, 0.5);
	}
	ul, li{
		display: inline-block;
		margin: 0 10px;
	}
	.login{
		position: absolute;
		right: 0;
	}
</style>
