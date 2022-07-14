# loUniapp后端

基于express后端，开发中

功能：

-物品列表分页展示

-登录（token校验）

-添加物品

-forever启动优化,保持服务器一直开启后端

前端项目地址：https://github.com/lx6927/loUniapp


# loExpress

在 MacOS 或 Linux 中，通过如下命令启动此应用：
DEBUG=myapp:* npm start

在 Windows 命令行中，使用如下命令：
set DEBUG=myapp:* & npm start

在 Windows 的 PowerShell 中，使用如下命令：
PS> $env:DEBUG='myapp:*'; npm start

然后在浏览器中打开 http://localhost:9999/ 网址就可以看到这个应用了。


# forever启动优化
断开服务器保持express不断开
"scripts": {
  "start": "node ./bin/www"
},
改为
"start": "forever start ./bin/www"后
可使用 npm start
或
直接使用命令
forever start ./bin/www



forever start ./bin/www     #简单的启动
forever start -l forever.log ./bin/www   #指定forever日志输出文件，默认路径~/.forever
forever start -l forever.log -a ./bin/www  #需要注意，如果第一次启动带日志输出文件，以后启动都需要加-a 参数，forever默认不覆盖原文件
forever start -o out.log -e err.log ./bin/www #指定node.js应用的控制台输出文件和错误信息输出文件
forever start -w ./bin/www   #监听当前目录下文件改动，如有改动，立刻重启应用（不推荐，如有日志文件，日志文件是频繁更改的）
 
 
#重启
forever restart ./bin/www   #重启单个应用
forever restart [pid] #根据pid重启应用
forever restartall # 重启所有应用
 
 
#停止
forever stop ./bin/www   # 停止单个应用
forever stop [pid] #根据pid停止单个应用
forever stopall #停止所有应用
 
#查看forever守护的应用列表
forever list
