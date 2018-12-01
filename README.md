# vue-blog

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

/***************************************************************/
/***************************************************************/
let postss =
    `create table if not exists posts(
     id INT NOT NULL AUTO_INCREMENT,
     title TEXT(0) NOT NULL COMMENT '文章题目',
     category TEXT(0) NOT NULL COMMENT '文章类别',
     content TEXT(0) NOT NULL COMMENT '文章内容',
     PRIMARY KEY(id)
    );`
// 发表文章2
exports.insertPosts = ( value ) => {
    let _sql = "insert into postss set title=?,category=?,content=?;"
    return query( _sql, value )
}
// 通过文章id查找2
exports.findDataByIds =  ( id ) => {
    let _sql = `select * from postss where id="${id}";`
    return query( _sql)
}
// 查询所有文章2
exports.findAllPosts = () => {
    let _sql = `select * from postss;`
    return query( _sql)
}
/***************************************************************/
/***************************************************************/
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <script type="text/javascript" src="/jquery.min.js"></script>
    <script type="text/javascript" src="/wangEditor.min.js"></script>
    <link href="/common.css" rel="stylesheet" type="text/css">
</head>
<body>
<header>
    <ul class="list">
        <li>文章管理</li>
        <li>用户管理</li>
        <li>评论管理</li>
        <li>留言管理</li>
    </ul>
    <div class="user">
        <span>登录</span>
        <span>注册</span>
        <span>退出</span>
    </div>
</header>
<div class="container">
    <div id="div3"></div>
    <div>
        <button id="btn1">获取html</button>
        <button id="btn2">获取text</button>
    </div>
    <form style="width:300px;" method="post" id="form2">
        <div>
            <label>标题：</label>
            <input placeholder="请输入标题" type="text" name="title">
        </div>
        <div>
            <label>类别：</label>
            <input placeholder="请输入类别" type="text" name="category">
        </div>
        <div>
            <label>内容：</label>
            <textarea placeholder="请输入内容" name="content" id="" cols="42" rows="10"></textarea>
        </div>
        <button id="artsubm" type="submit">发表</button>
    </form>
</div>

<script type="text/javascript">
    var E = window.wangEditor
    var editor2 = new E('#div3')
    editor2.customConfig.menus = [  //菜单配置，不要可以直接去掉这个默认全部功能都有如下图
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'image',  // 插入图片
        'table',  // 表格
        'video',  // 插入视频
        'code',  // 插入代码
        'undo'  // 撤销
    ];
    editor2.create();
    document.getElementById('btn1').addEventListener('click', function () {
        console.log(editor2.txt.html());
        alert(editor2.txt.html())
    }, false);

    document.getElementById('btn2').addEventListener('click', function () {
        alert(editor2.txt.text())
    }, false);
    $(document).ready(function () {
        $("#artsubm").click(function () {
            $.ajax({
                type: 'post',
                url: "/article",
                data: $("#form2").serialize(),
                dataType: "json",
                success: function (msg) {
                    if (msg.code != 200){
                        alert("上传失败！");
                    }else{
                        alert("上传成功！");
                        setTimeout(function () {
                            window.location.href = "/article"
                        },1500)
                    }
                },
                error: function () {
                    alert("异常");
                }
            });
            console.log($("#form2").serialize());
        })
    })
</script>

</body>
</html>
/***************************************************************/
/***************************************************************/
const router = require('koa-router')();
const common = require('../module/common.js');
const config = require('../config/default.js');
const sql = require('../lib/mysql.js');

//登录页面路由
router.get('/login',async(ctx,next)=>{
    var compare = function () {
        return {
            name:'bll',
            password:'123'
        }
    };
    let content='hello,sunshine!';
    await ctx.render('index',{
        content:content
    });
});
//获取表单提交数据（测试）
router.post('/login',async (ctx,next)=>{
    console.log(ctx.request.body);
    let { name,password } = ctx.request.body;
    if (name=="bll"&&password=="bll123"){
        ctx.body = {
            code: 200,
            message: '登陆成功'
        }
    }else{
        ctx.body = {
            code: 500,
            message: '用户名或密码错误!'
        };
        console.log('用户名或密码错误!');
    }
});
//文章列表接口（http://localhost:3000/messages）
router.get('/messages',async(ctx,next)=>{
    await Promise.all([
        sql.findAllPosts()
    ]).then(res => {
        ctx.body = {
            code: 200,
            data: res,
            message:'获取列表成功'
        };
        console.log(res);
    }).catch(err=>{
        ctx.body = {
            code: 500,
            message: '获取列表失败'
        }
    })
});
//添加文章页面页面路由
router.get('/article',async(ctx,next)=>{
    await ctx.render('article');
});
//添加文章，获取表单提交的文章数据，并添加到数据库
router.post('/article',async (ctx,next)=> {
    console.log(ctx.request.body);
    let {title, category, content} = ctx.request.body;
    await  sql.insertPosts([title, category, content])
        .then(()=> {
            ctx.body = {
                code: 200,
                message: '添加文章成功'
            }
        }).catch(()=> {
            ctx.body = {
                code: 500,
                message: '发表文章失败'
            }
        })
});
module.exports =router.routes();
