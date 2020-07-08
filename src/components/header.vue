<template>
	<div class="header">
		<ul>
			<li style="font-size: 16px;"><router-link to="/">首页</router-link></li>
			<li>
        <i class="iconfont icon-shijian"></i>
        <router-link to="timeAxis" class="button">时间轴</router-link>
      </li>
			<li><router-link :to="{ path:'/messageBoard' }" class="button">留言板</router-link></li>
			<li><router-link :to="{ path:'/create' }" class="button">文章管理</router-link></li>
		</ul>
		<ul class="login" v-if='!user'>
			<li><router-link :to="{ name:'login' }" class="button">登录</router-link></li>
			<li><router-link :to="{ path:'/signin' }" class="button">注册</router-link></li>
		</ul>
		<ul class="login" v-if='user'>
			<li @click="loginOut()">退出</li>
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
				user: '',
				avator: ''
			}
		},
    watch: {
      '$route'(to, from) {
        this.user = sessionStorage.getItem('user')?sessionStorage.getItem('user'):'';
        this.avator = sessionStorage.getItem('avator')?this.baseURL+'/images/'+sessionStorage.getItem('avator'):'';
      }
    },
		mounted () {
      this.user = sessionStorage.getItem('user')?sessionStorage.getItem('user'):'';
      this.avator = sessionStorage.getItem('avator')?this.baseURL+'/images/'+sessionStorage.getItem('avator'):'';
    },
		methods:{
			loginOut(){
				sessionStorage.removeItem('user');
				sessionStorage.removeItem('avator');
				this.user = '';
				this.avator = '';
			}
		}
	}
</script>

<style scoped lang="scss">
  @keyframes tada
  {
    from {
      color: #ccc;
    }
    to {
      color: #ff6c00;
    }
  }
	.header{
    background: rgba(255,255,255,.9);
		width: 100%;
		height: 50px;
		line-height: 50px;
		padding-left: 20px;
		position: fixed;
		top: 0;
		z-index: 999;
		box-shadow: 2px 1px 10px rgba(146, 146, 146, 0.5);
	}
	ul, li, a{
		display: inline-block;
		margin: 0 5px;
		cursor: pointer;
	}
  i{
    transition: color .2s ease-out,border .2s ease-out,opacity .2s ease-out;
  }
  li:hover, li:active {
    outline: none;
    i{
      animation: tada 1s linear infinite;
    }
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
