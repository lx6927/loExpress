var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
// token
var expressJwt=require("express-jwt")
var vertoken = require('./public/javascripts/token')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/article');
var goodsRouter = require('./routes/goods');



var app = express();

// 使用cors中间件
app.use(cors())

// 在`app.use(cors())`前加入，这行代码的作用是引入db.js中导出的对象，后面需要用到它去查询数据
const myQuery = require('./db')



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 使用cookie
app.use(cookieParser('不能为空'));
app.use(express.static(path.join(__dirname, 'public')));





// 解析token获取用户信息
app.use(function(req, res, next) {
  var token = req.headers['authorization'];
  console.log("解析token",token)
  if(token == undefined){
    return next();
  }else{
    vertoken.verToken(token).then((data)=> {
      console.log(111,JSON.stringify(data))
      if(data.exp===0){
        res.status(401).send('token失效');
        return
      }
      req.data = data;
      return next();
    }).catch((error)=>{
      console.log(222,error)
      return next();
    })
  }
});
//验证token是否过期并规定哪些路由不用验证
app.use(expressJwt({
  secret: 'mes_qdhd_mobile_xhykjyxgs',
  algorithms:['HS256'],
}).unless({
  path: ['/login']//除了这个地址，其他的URL都需要验证
}));

//当token失效返回提示信息
app.use(function(err, req, res, next) {
  // console.log("当token失效返回提示信息:"+err,req,res)
  if (err.status == 401) {
    return res.status(401).send('token失效');
  }
});





app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article', articleRouter);
app.use('/goods', goodsRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
