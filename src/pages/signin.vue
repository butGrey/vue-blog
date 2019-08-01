<template>
	<div class="signpage">
		<form method="post" id="form_message">
            <div class="btn btn-success fileinput-button">
              <input type="file" name="avator" id="avator" onchange="imgImport(event,this)">
            </div>
            <div class="userimg">
              <input type="hidden" class="avatorVal">
              <img class="preview" alt="" src="../assets/img/t1.jpg">
            </div>
            <div class="input">
            	<div>用户名:</div>
            	<input type="" name="name" placeholder="请输入用户名" v-model='name' v-on:blur="getAvator(name)">
            	<span class="tips" v-show="mesShow">{{mes}}</span>
            </div>
            <div class="input">
            	<div>密码：</div>
            	<input type="password" name="password" placeholder="请输入密码" v-model='password' >
            </div>
            <div class="input">
            	<div>确认密码：</div>
            	<input type="password" name="repassword" placeholder="请输入确认密码" v-model='repassword' >
            </div>
            <div class="btn submit" :class="{'disable':mesShow}" v-on:click="mesSubmit('','',$event)">提交</div>
            <div class="btn cancle" v-on:click="mesCancle()">取消</div>
		</form>
	</div>
</template>
<script>
	export default{
		name: "signin",
		data(){
			return{
				name: '',
				password: '',
				repassword: '',
				mesShow: false,
				mes: ''
			}
		},
		methods:{
			getAvator(name){
				if(this.name==''){
		          this.mesShow = true;
		          this.mes = '请输入用户名！';
		      		return
		      	}else if(this.name.match(/[<'">]/g)){
		          this.mesShow = true;
		          this.mes = '请输入合法字符！';
		     		return
		      	}else{
			        this.$axios('http://localhost:3000/checkusername/'+this.name).then(res => {
			        	if(res.data && res.data.code=='200'){
			        		this.mesShow = true;
		          			this.mes = '用户名已存在，请重新输入！';
			        	}else{
			        		this.mesShow = false;
		          			this.mes = '';

			        	}			          
			        })
			          .catch(error =>{
			            console.log(error);
			          })
				}
			},
	      mesSubmit(ci,rn,event){
	      	if(this.mesShow){
	      		return
	      	}
	      	if($('input[name=name]').val().trim() == ''){
	          alert('请输入用户名！')
	      		return
	      	}else if($('input[name=name]').val().match(/[<'">]/g)){
	          alert('请输入合法字符！')
	     		return
	      	}else if($('input[name=password]').val().trim() == ''){
	          alert('请输入密码！')
	     		return
	      	}else if($('input[name=password]').val().length<6){
	          alert('密码长度不可低于6位！')
	     		return
	      	}else if($('input[name=password]').val()!=$('input[name=repassword]').val()){
	          alert('两次输入的密码不一致！')
	     		return
	      	}else if($('.avatorVal').val() == ''){	      		
	          alert('请上传头像！')
	      	}else{	      			      		
	      		this.$axios.post('http://localhost:3000/addbloguser',{
	              name: $('[name=name]').val(),
	              password: $('input[name=password]').val(),
	              avator: $('.avatorVal').val() 			
	      		}).then(res=>{	      			
	      			if(res.data.code == 200){
	                console.log('注册成功');
                    localStorage.setItem('user',$('input[name=name]').val());
                    sessionStorage.setItem('user',$('input[name=name]').val());
                    localStorage.setItem('avator',res.data);
                    sessionStorage.setItem('avator',res.data);
                    this.$router.push({path:'/home'})
                    window.location.reload()
	              }else{
	                console.log(msg.message)
	              }
	      		})
	      	}
	      },
	      mesCancle(){
	      	this.name = '';
	      	this.password = '';
	      	this.repassword = '';
	      	this.mesShow = false;
	      }
		},
	}

	window.imgImport=function (e,that) {
    if (that.files.length != 0) {
      var file = that.files[0],
        reader = new FileReader();
      if (!reader) {
        that.value = '';
        return;
      }
      console.log(file.size,file.type);
      if (!/image/g.test(file.type)) {
        alert("请上传图片文件!");
        //$(that).parent().siblings('.userimg').children('.avatorVal').val('');
        //$(that).parent().siblings('.userimg').children('.preview').attr('src', '../assets/img/t1.jpg');
        //$(that).parent().siblings('.userimg').children('.preview').fadeOut();
        return
      }
      reader.onload = function (e) {
        that.value = '';
        $('.preview').attr('src', e.target.result);
        $('.preview').fadeIn();
        var image = new Image();
        image.onload = function(){
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext("2d");
          canvas.width = 100;
          canvas.height = 100;
          ctx.clearRect(0, 0, 100, 100);
          ctx.drawImage(image, 0, 0, 100, 100);
          var blob = canvas.toDataURL("image/png");
          $('.avatorVal').val(blob)
        }
        image.src = e.target.result
      };
      reader.readAsDataURL(file);
    }
  }
</script>

<style scoped>
    .signpage{
    	background-color: #37324a;
    	height: calc(100vh - 0px);
    	width: calc(100vw + 10px);
    	display: flex;
	    justify-content: center;
	    align-items: center;
    }
	#form_message{
		width: 530px;
		position: relative;
		text-align: center;
		background-color: rgba(255,255,255,0.1);
	}
	.preview{
		width: 150px;
	    height: 150px;
	    border-radius: 50%;
	    margin: 20px auto;
	}
	.input{
		position: relative;
		height: 45px;
		margin: 10px auto;
	}
	.input div{
		width:80px;
		display: inline-block;
		font-size: 16px;
		color: #ccc;
		text-align: right;
		margin: 10px;
	}
	.input input{
		border: none;
	    background: none;
	    box-shadow: none;
	    border-bottom: 1px solid #ccc;
	    width: 370px;
	    height: 45px;
	    font-size: 16px;
		color: #ccc;
		padding-left: 10px;
	}
	input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill{
	    -webkit-transition-delay: 99999s;
	    -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
		-webkit-box-shadow: 0 0 0px 1000px rgba(0,0,0,0) inset;
	}
	.btn{
		cursor: pointer;
		display: inline-block;
		margin: 20px;
		width: 150px;
		height: 40px;
		line-height: 40px;
		color: #ccc;
		background-color: rgba(255,255,255,.2);
	}
	.submit{
		box-shadow: 1px 1px 5px #333333; 		
	}
	.cancle{
		color: #ccc;
		background-color: rgba(255,255,255,.1);
	}
	.btn:hover{
		background-color: rgba(255,255,255,.2);
		box-shadow: 2px 2px 10px #333333; 
	}
	.disable,.disable:hover{
		box-shadow: none;
		cursor:not-allowed;
	}
	.fileinput-button {
		width: 150px;
	    height: 150px;
	    border-radius: 50%;
	    top: 0px;
	    left: 170px;
	    text-align: center;
	    position: absolute;
	    overflow: hidden;
	    z-index: 999;
	  }
	.fileinput-button input{
	    position:absolute;
	    right: 0px;
	    top: 0px;
	    opacity: 0.5;
	    -ms-filter: 'alpha(opacity=0)';
	    font-size: 200px;
	}
	.tips{
		position: absolute;
	    right: 23px;
	    bottom: 12px;
	    color: #fff;
	    border: 1px solid;
	}
</style>
