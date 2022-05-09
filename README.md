# loExpress

在 MacOS 或 Linux 中，通过如下命令启动此应用：

$ DEBUG=myapp:* npm start
在 Windows 命令行中，使用如下命令：

> set DEBUG=myapp:* & npm start
在 Windows 的 PowerShell 中，使用如下命令：

PS> $env:DEBUG='myapp:*'; npm start
然后在浏览器中打开 http://localhost:9999/ 网址就可以看到这个应用了。
