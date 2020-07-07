<template>
  <div class="page">
    <form method="post" id="form_message">
      <div class="userimg">
        <input type="hidden" class="avatorVal">
        <img class="preview" alt="" :src="avator?str+avator:imgUrl" alt="">
      </div>
      <div class="input">
        <div>用户名:</div>
        <input v-model="name" placeholder="请输入用户名" @keyup="getAvator()">
      </div>
      <div class="input">
        <div>密码：</div>
        <input type="password" v-model="password" placeholder="请输入密码">
      </div>
      <div class="btn submit" @click="mesSubmit('','',$event)">登录</div>
      <div class="btn cancle">取消</div>
    </form>
  </div>
</template>
<script>
  export default {
    name: "login",
    data() {
      return {
        imgUrl: require('../assets/img/auto.jpg'),
        name: '',
        password: '',
        str: this.baseURL+'/images/',
        avator: ''
      }
    },
    mounted(){
      this.getAvator()
    },
    methods: {
      getAvator() {
        if (this.name == '') {
          return
        } else {
          this.$axios(this.baseURL+'/getavator/' + this.name).then(res => {
            this.avator = res.data || '';
          }).catch(error => {
              console.log(error);
            })
        }
      },
      mesSubmit() {
        if (this.name.trim() == '') {
          alert('请输入用户名！')
          return
        } else if (this.name.match(/[<'">]/g)) {
          alert('请输入合法字符！')
          return
        } else if (this.password.trim() == '') {
          alert('请输入密码！')
          return
        } else if (this.password.length < 6) {
          alert('密码长度不可低于6位！')
          return
        } else {
          this.$axios.post(this.baseURL+'/loginin', {
            name: this.name,
            password: this.password
          }).then(res => {
            if (res.code == 200) {
              console.log('登录成功');
              sessionStorage.setItem('user', this.name);
              sessionStorage.setItem('avator', this.avator);
              this.$router.push({path: '/home'})
              window.location.reload()
            } else {
              alert('用户名或密码错误！');
              this.password = '';
            }
          })
        }
      }
    },
  }
</script>

<style scoped>
  .page {
    height: calc(100vh - 0px);
    width: calc(100vw + 10px);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #form_message {
    width: 530px;
    position: relative;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.1);
  }

  .preview {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 20px auto;
  }

  .input {
    height: 45px;
    margin: 10px auto;
  }

  .input div {
    width: 80px;
    display: inline-block;
    font-size: 16px;
    color: #ccc;
    text-align: right;
    margin: 10px;
  }

  .input input {
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

  input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    -webkit-transition-delay: 99999s;
    -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
    -webkit-box-shadow: 0 0 0px 1000px rgba(0, 0, 0, 0) inset;
  }

  .btn {
    cursor: pointer;
    display: inline-block;
    margin: 20px;
    width: 150px;
    height: 40px;
    line-height: 40px;
    color: #ccc;
    background-color: rgba(255, 255, 255, .2);
  }

  .submit {
    box-shadow: 1px 1px 5px #333333;
  }

  .cancle {
    color: #ccc;
    background-color: rgba(255, 255, 255, .1);
  }

  .btn:hover {
    background-color: rgba(255, 255, 255, .2);
    box-shadow: 2px 2px 10px #333333;
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

  .fileinput-button input {
    position: absolute;
    right: 0px;
    top: 0px;
    opacity: 0.5;
    -ms-filter: 'alpha(opacity=0)';
    font-size: 200px;
  }
</style>
