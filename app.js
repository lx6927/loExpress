var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
// token
var vertoken = require('./public/javascripts/token')
var expressJWT = require('express-jwt');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/article');
var goodsRouter = require('./routes/goods');


var app = express();

// 使用cors中间件
app.use(cors())

// 在`app.use(cors())`前加入，这行代码的作用是引入db.js中导出的对象，后面需要用到它去查询数据
const myQuery = require('./db')


// 解析token获取用户信息
app.use(function (req, res, next) {
    var token = req.headers['authorization'];
    console.log(111, token)
    if (token == undefined) {
        return next();
    } else {
        vertoken.verToken(token).then((data) => {
            console.log("解析token,data:" + data,req,res)
            req.data = data;
            return next();
        }).catch((error) => {
            return next();
        })
    }
    // next(createError(404));
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// 使用cookie
app.use(cookieParser('不能为空'));
app.use(express.static(path.join(__dirname, 'public')));



//验证token是否过期并规定那些路由不需要验证
app.use(expressJWT({
    secret: 'mes_qdhd_mobile_xhykjyxgs',
    algorithms: ["HS256"]
}).unless({
    path: ['/login']//除了这个地址，其他的URL都需要验证
}));

//路由目录
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article', articleRouter);
app.use('/goods', goodsRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

//token失效返回信息
app.use(function(err,req,res,next){
    // console.log('app.js')
    if(err.status==401){
        return res.json({
            code:1,
            message:'token失效',
            status:401
        })
    }
})
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
