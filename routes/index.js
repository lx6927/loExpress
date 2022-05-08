var express = require('express');
var router = express.Router();
const myQuery = require('../db')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 登录
router.post('/login', async (req, res, next) =>{
  let account=req.email;
  let pwd=req.pwd;

  if(account===""&&account===null&&account===undefined){
    res.send('用户账号不能为空！');
  }
  if(pwd===""&&pwd===null&&pwd===undefined){
    res.send('用户密码不能为空！');
  }

  // let sql="SELECT * FROM app.user WHERE email = '123456@qq.com' and user_pwd = '123456'"
  const sqlRes = await myQuery.table('user').where('email','=','123456@qq.com').where('user_pwd','=','123456').find()

  console.log(sqlRes)

  // console.log(11,params)

  res.send({
    userName:sqlRes.user_name,
    userId:sqlRes.user_id,
  });
});


module.exports = router;
