<template>
  <div class="signpage">
    <form method="post" id="form_message">
      <div class="userimg btn btn-success fileinput-button">
        <input type="hidden" class="avatorVal">
        <img class="preview" alt="" src="../assets/img/auto.jpg">
        <input type="file" name="avator" id="avator" onchange="imgImport(event,this)">
      </div>
      <div class="input">
        <div>用户名:</div>
        <input type="" name="name" placeholder="请输入用户名" v-model='name' @keyup="getAvator(name)">
        <span class="tips" v-show="mesShow">{{mes}}</span>
      </div>
      <div class="input">
        <div>密码：</div>
        <input type="password" name="password" placeholder="请输入密码" v-model='password'>
      </div>
      <div class="input">
        <div>确认密码：</div>
        <input type="password" name="repassword" placeholder="请输入确认密码" v-model='repassword'>
      </div>
      <div class="btn submit submitBtn" :class="{'disable':mesShow}" @click="mesSubmit('','',$event)">提交</div>
      <div class="btn cancle submitBtn" @click="mesCancle()">取消</div>
    </form>
  </div>
</template>
<script>
  export default {
    name: "signin",
    data() {
      return {
        name: '',
        password: '',
        repassword: '',
        mesShow: false,
        mes: ''
      }
    },
    methods: {
      getAvator(name) {
        if (this.name == '') {
          this.mesShow = true;
          this.mes = '请输入用户名！';
          return
        } else if (this.name.match(/[<'">]/g)) {
          this.mesShow = true;
          this.mes = '请输入合法字符！';
          return
        } else {
          this.$axios(this.baseURL+'/checkusername/' + this.name).then(res => {
            if (res && res.code == '200') {
              this.mesShow = true;
              this.mes = '用户名已存在，请重新输入！';
            } else {
              this.mesShow = false;
              this.mes = '';
            }
          }).catch(error => {
              console.log(error);
            })
        }
      },
      mesSubmit(ci, rn, event) {
        if (this.mesShow) {
          return
        }
        if ($('input[name=name]').val().trim() == '') {
          alert('请输入用户名！')
          return
        } else if ($('input[name=name]').val().match(/[<'">]/g)) {
          alert('请输入合法字符！')
          return
        } else if ($('input[name=password]').val().trim() == '') {
          alert('请输入密码！')
          return
        } else if ($('input[name=password]').val().length < 6) {
          alert('密码长度不可低于6位！')
          return
        } else if ($('input[name=password]').val() != $('input[name=repassword]').val()) {
          alert('两次输入的密码不一致！')
          return
        } else if ($('.avatorVal').val() == '') {
          alert('请上传头像！')
        } else {
          this.$axios.post(this.baseURL+'/addbloguser', {
            name: $('[name=name]').val(),
            password: $('input[name=password]').val(),
            avator: $('.avatorVal').val()
          }).then(res => {
            if (res.code == 200) {
              console.log('注册成功');
              sessionStorage.setItem('user', $('input[name=name]').val());
              sessionStorage.setItem('avator', res.data);
              this.$router.push({path: '/home'})
              window.location.reload()
            } else {
              console.log(msg.message)
            }
          })
        }
      },
      mesCancle() {
        this.name = '';
        this.password = '';
        this.repassword = '';
        this.mesShow = false;
      }
    },
  }

  window.imgImport = function (e, that) {
    if (that.files.length != 0) {
      var file = that.files[0],
        reader = new FileReader();
      if (!reader) {
        that.value = '';
        return;
      }
      console.log(file.size, file.type);
      if (!/image/g.test(file.type)) {
        alert("请上传图片文件!");
        return
      }
      reader.onload = function (e) {
        that.value = '';
        $('.preview').attr('src', e.target.result);
        $('.preview').fadeIn();
        var image = new Image();
        image.onload = function () {
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

<style scoped lang="scss">
  .signpage {
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
    #avator{
      display: block;
      margin: 0 auto;
    }
  }
  .preview {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .input {
    position: relative;
    height: 45px;
    margin: 10px auto;
  }

  .input div {
    width: 80px;
    display: inline-block;
    font-size: 16px;
    color: #5a5a5a;
    text-align: right;
    margin: 10px;
  }

  .input input {
    border: none;
    background: none;
    box-shadow: none;
    border-bottom: 1px solid #ccc;
    width: 250px;
    height: 45px;
    font-size: 16px;
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
    width: 100px;
    height: 36px;
    line-height: 36px;
    background-color: rgba(255, 255, 255, .2);
  }
  .submitBtn:hover {
    color: #ff6c00;
    border: 1px solid #ff6c00;
  }
  .submitBtn {
    display: inline-block;
    margin-bottom: 10px;
    font-size: 12px;
    text-align: center;
    border: 1px solid #a9a9a9;
    cursor: pointer;
  }

  .cancle {
    color: #ccc;
    background-color: rgba(255, 255, 255, .1);
  }

  .disable, .disable:hover {
    box-shadow: none;
    cursor: not-allowed;
  }

  .fileinput-button {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    top: 0px;
    left: 170px;
    text-align: center;
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
  .tips {
    position: absolute;
    width: 250px;
    color: red;
    bottom: 12px;
  }
</style>
