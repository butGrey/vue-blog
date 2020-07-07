<template>
  <div id="app">
    <!-- <Headers />
      <div id="cont">
        <Tree />
        <Sidebar />
        <router-view/>
      </div>
    <Footers /> -->
    <Headers />
    <router-view/>
  </div>
</template>

<script>

import Header from "./components/header"
import Footers from "./components/footer"
import Sidebar from "./components/sidebar"
import Tree from "./components/tree"
import Headers from "./components/headers"


export default {
  name: 'App',
  data(){
    return {
    }
  },
  components:{
    Headers,
    Footers,
    Sidebar,
    Tree
  }
}
</script>

<style>
.icon {
   width: 1em;
   vertical-align: -0.7em;
   fill: currentColor;
   overflow: hidden;
  height: 2.5rem;
}
#cont{
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
}
body{margin: 0;padding: 0;font-family: "Microsoft YaHei";background-color: #fff;width: calc(100vw - 0px);}
body,html{-webkit-text-size-adjust: none;width: 100%;height: 100%;}
*{text-decoration: none;list-style: none;}
img{border: 0px;}
ul,li,dl,dd,dt,ol,p{list-style:none;font-size: 14px;padding: 0;margin: 0;color:#5a5a5a;}
i{font-size: 12px;}
textarea,input {
  outline: none;
  font-family: "Microsoft YaHei";
}
h2{
  font-weight: 500;
}
.wrap{margin: 0 auto;}
.fl{float: left;}
.fr{float: right;}
.index{overflow: hidden;}
.clr{clear:both; height:0px; width:100%; font-size:1px; line-height:0px; /*visibility:hidden; overflow:hidden;*/}
.pointer{cursor:pointer;}
a,input,button{ outline:none; }
::-moz-focus-inner{border:0px;}
a{color: #5a5a5a;}
.wrapper{clear: both;width: 100%;}
table { border-collapse:collapse; }
word-break:break-all /*文字换行*/
/*white-space:nowrap 文字不换行*/

/*默认滚动条样式修改ie9 google Firefox 等高版本浏览器有效*/
::selection {background: #D03333;color: white;text-shadow: none;}
::-webkit-scrollbar{width:10px;height:6px}
::-webkit-scrollbar-thumb{height:50px;background-color:rgba(0,0,0,.3);}
::-webkit-scrollbar-thumb:hover{background:#CFCFCF}

/*渐变*/
background-image: -moz-linear-gradient(top, #8fa1ff, #3757fa);
background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #ff4f02), color-stop(1, #8f2c00));/* Saf4+, Chrome */
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#c6ff00', endColorstr='#538300', GradientType='0');/* IE*/
</style>
