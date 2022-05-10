// 引入easier_query
const EasyQuery = require('easier_query')
// 初始化easier_query
const myQuery = new EasyQuery({
    // host: "127.0.0.1",      // the mysql host
    // host: "localhost",      // the mysql host
    host: "119.3.132.242",      // the mysql host
    port: "3306",           // the mysql server port
    user: "root",           // the mysql user
    password: "hw123",       // the password
    database: "app",       // the database you will use
    debug:true              // true means the built sql string will be printed in the console
})
// 导出实例化之后的easier_query
module.exports = myQuery
