var express = require('express');
var router = express.Router();
const myQuery = require('../db')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 登录
var settoken = require('../public/javascripts/token')
router.post('/login', async (req, res, next) =>{
  let account=req.body.account;
  let pwd=req.body.pwd;

  if(account===""&&account===null&&account===undefined){
    res.send('用户账号不能为空！');
  }
  if(pwd===""&&pwd===null&&pwd===undefined){
    res.send('用户密码不能为空！');
  }


    // let sql="SELECT * FROM app.user WHERE email = '123456@qq.com' and user_pwd = '123456'"
  const sqlRes = await myQuery.table('user').where('user_name','=',account).where('user_pwd','=',pwd).find()

  console.log(111,sqlRes)

  if(sqlRes===null){
    res.send({
      code:1,
      message:"用户不存在"
    })
  }

  //生成token
  let token;
  settoken.setToken(account,sqlRes.user_id).then((data)=> {
    token=data;
    // res.json({ token:data });
    console.log("设置token:"+data)
    //前端获取token后存储在localStroage中,
    //**调用接口时 设置axios(ajax)请求头Authorization的格式为`Bearer ` +token

    // 写入cookie中
    // res.cookie('userTooken', token, { httpOnly: true, signed: true,domain: });

    res.send({
      code:0,
      userName:sqlRes.user_name,
      userId:sqlRes.user_id,
      nickName:sqlRes.nick_name,
      token: token
    });
  })
  // res.send({
  //   code:0,
  //   userName:sqlRes.user_name,
  //   userId:sqlRes.user_id,
  //   nickName:sqlRes.nick_name,
  //   token: token
  // });
});


module.exports = router;
