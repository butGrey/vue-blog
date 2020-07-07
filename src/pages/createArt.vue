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
        <img class="previews" alt="预览">
      </div>
      <div class="mb20">
        <label>内容：</label>
        <div id="div3"></div>
        <textarea placeholder="请输入内容" name="content" cols="42" rows="10"></textarea>
      </div>
      <button @click="submit($event)">发表</button>
    </form>
  </div>
</template>

<script>
  export default{
    name: "layout",
    data() {
      return {}
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
        formdata.append('content',form.content.value);
        const config = { headers:{'Content-Type':'multipart/form-data'} };
        this.$axios.post(this.baseURL+'/createArticle',formdata,config).then(res => {
          alert(res.message)
        });
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
