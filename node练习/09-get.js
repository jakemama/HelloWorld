// 获得get请求的内容，是在URL的问号？之后的部分
    //  -util（是nodejs的工具模块，它有许多许多的方法）
    // -util.inspect，用来把对象转成字符串
    // -url，nodejs的url模块
    // -url.parse 解析URL请求之类的东西


    var http = require('http')
    var util = require('util')
    var url = require('url')

    http.createServer(function(req, res){
        res.writeHead(200,{
            'Content-Type':'text/plain;charset=utf-8'
        });

        res.end(util.inspect(url.parse(req.url)))
        // res.end('asdfafaf')

    }).listen(5642);

    console.log('5642端口已启用');