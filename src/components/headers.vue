<template>
	<div class="header">
		<ul>
			<li style="font-size: 16px;"><router-link to="home">首页</router-link></li>
			<li>时光轴</li>
			<li>留言板</li>
			<li><router-link :to="{ path:'/component' }" class="button">组件</router-link></li>
		</ul>
		<ul class="login" v-if='!user'>
			<li><router-link :to="{ path:'/login' }" class="button">登录</router-link></li>
			<li><router-link :to="{ path:'/signin' }" class="button">注册</router-link></li>
		</ul>
		<ul class="login" v-if='user'>
			<li v-on:click="loginOut()">退出</li>
			<li>Hi，{{user}}！</li>
			<li><img class="preview" alt="" :src= "avator"   alt=""></li>
		</ul>
	</div>
</template>

<script>
	export default{
		name: "headers",
		data(){
			return{			
				user: sessionStorage.getItem('user')?sessionStorage.getItem('user'):'',
				avator: sessionStorage.getItem('avator')?'http://localhost:3000/images/'+sessionStorage.getItem('avator'):''
			}
		},
		mounted () {
			},
		methods:{
			loginOut(){
				localStorage.removeItem('user');
				localStorage.removeItem('avator');
				sessionStorage.removeItem('user');
				sessionStorage.removeItem('avator');
				this.user = '';
				this.avator = '';
                this.$router.push({path:'/login'})
			}
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
		margin: 0 5px;
		cursor: pointer;
	}
	.login{
		position: absolute;
		right: 20px;
	}
	.preview{
		width: 40px;
	    height: 40px;
	    border-radius: 50%;
	    vertical-align: middle;
	}
</style>
