var express = require('express');
var router = express.Router();
const myQuery = require('../db')

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("测试获取token",req.cookies.token)
    res.send('111111111111');
});

// 在app.listen前，我们加入一个路由
// http://localhost:3000/list,http://localhost:3000/list?page=1&size=2
router.get('/list',async (req,res)=>{
    // 获取get里的page参数，如果没有则默认为第一页
    let page = req.query.page || 1
    // 获取get里的size参数，如果没有则默认每页显示20条
    let size = req.query.size || 20
    // 从数据表article里 选择id,title,subtitle,create_time,按照id降序排列，page函数则是分页
    const result = await myQuery.table('article').field('id,title,subtitle,create_time').order('id desc').page(size,page)
    // 将获取到的结果通过json格式返回
    res.json(result)
})

// 仍旧在app.listen前，我们加入一个路由
// http://127.0.0.1:3000/article/3
router.get('/article/:id',async (req,res)=>{
    // req.params.id 只从params里获取到参数id，即路由中的`:id`
    const result = await myQuery.table('article').where('id','=',req.params.id).find()
    // 将获取到的结果通过json格式返回
    res.json(result)
})

// 更新文章,1为修改成功，0为修改失败
router.put('/article/:id',async (req,res)=>{
    // 获取到PUT请求中的BODY内容，
    let r=req;
    const updateObj = req.body
    console.log(111,req.body)
    // 这里应当对updateObj的合法性做校验，仅为演示
    // 将新的内容更新到ID为req.params.id的数据中
    const result = await myQuery.table('article').where('id','=',req.params.id).save(updateObj)
    res.json(result)
})

router.put('/web',async (req,res)=>{
    // 获取到PUT请求中的BODY内容，
    console.log(1,req.body)
    // res.json(result)
    res.send(req.body.name)
})



module.exports = router;