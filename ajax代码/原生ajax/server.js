const express = require('express')

const app = express()

app.get('/server', (request, response)=>{
    //设置响应头，允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    response.send('hello ajax')
})

app.listen(8000, ()=>{
    console.log('服务已启动，8000端口监听中。。。');
})