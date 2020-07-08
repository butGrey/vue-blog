<template>
  <div id="create">
    <form method="post" id="createArt" name="form" enctype="multipart/form-data">
      <div class="mb20">
        <label>标题：</label>
        <input placeholder="请输入标题" type="text" name="title">
      </div>
      <div class="mb20">
        <label>类别：</label>
        <input placeholder="请输入类别" type="text" name="category">
      </div>
      <div class="mb20">
        <label>背景图片：</label>
        <input id="img" class="import-img" type="file" name="img">
        <input type="hidden" class="avatorVal">
      </div>
      <article class="markdown-body" style="text-align:left" v-html="content"></article>
      <mavonEditor
        :toolbars="toolbars"
        @imgAdd="handleEditorImgAdd"
        @imgDel="handleEditorImgDel"
        style="height:600px"
        v-model="value"
        @change="change"
        ref=md
      />
      <button @click="submit($event)">发表</button>
    </form>
  </div>
</template>

<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default{
    name: "layout",
    components: {
      mavonEditor,
    },
    data() {
      return {
        content:'',
        value: '',
        blogInfo:{
          blogMdContent: '',
          blogContent: ''
        },
        html: '',
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: false, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        }
      }
    },
    methods: {
      submit: function(event){
        event.preventDefault();
        let formdata = new FormData();
        const form =  document.querySelector("#createArt");
        const img = document.querySelector("#img").files[0];
        formdata.append('img',img);
        formdata.append('title',form.title.value);
        formdata.append('category',form.category.value);
        formdata.append('content',this.html);
        const config = { headers:{'Content-Type':'multipart/form-data'} };
        this.$axios.post(this.baseURL+'/createArticle',formdata,config).then(res => {
          alert(res.message)
        });
      },
      change(value, render) {
        this.html = render;
        this.blogInfo.blogMdContent = value;
        this.blogInfo.blogContent = render;
      },
      //上传图片接口pos 表示第几个图片
      handleEditorImgAdd(pos , $file){
        let formdata = new FormData();
        formdata.append('file' , $file);
        this.$axios.post("http://localhost:8000/blogs/image/upload/", formdata).then(res => {
            const url = res.data;
            this.$refs.md.$img2Url(pos, url);  //这里就是引用ref = md 然后调用$img2Url方法即可替换地址
          });
      },
      handleEditorImgDel(){
        console.log('handleEditorImgDel');    //我这里没做什么操作，后续我要写上接口，从七牛云CDN删除相应的图片
      }
    }
  }
</script>
<style lang="scss" scoped>
#create{
  margin: 100px;
  .mb20{
    margin-bottom: 20px;
  }
}

</style>
