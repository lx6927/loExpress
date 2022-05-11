//用于生成和解析token
var jwt = require('jsonwebtoken');
var signkey = 'mes_qdhd_mobile_xhykjyxgs';

exports.setToken = function(username,userid){
    return new Promise((resolve,reject)=>{
        const token = jwt.sign({
            name:username,
            _id:userid
        },signkey,{ expiresIn:'1day' });
        // 2/1h/1day
        resolve(token);
    })
}

exports.verToken = function(token) {
    return new Promise((resolve, reject) => {
        var info = jwt.verify(token, signkey,(err, decoded) => {
            if (err) {
                console.log(err);
                if(err.name == 'TokenExpiredError'){//token过期
                    let str = {
                        iat:1,
                        exp:0,
                        msg: 'token过期'
                    }
                    // return str;
                    resolve(str);
                }else if(err.name == 'JsonWebTokenError'){//无效的token
                    let str = {
                        iat:1,
                        exp:0,
                        msg: '无效的token'
                    }
                    // return str;
                    resolve(str);
                }
            }else{
                // return decoded;
                resolve(decoded);
            }
        });
        resolve(info);
    })
}