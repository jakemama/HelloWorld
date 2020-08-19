var http = require('http')

var server = http.createServer();

server.on('request', function (req, res) {
    console.log('已接收到请求，请求地址为' + req.url);

    var url = req.url;

    if (url === '/index') {
        var obj = [
            {
                name: 'apple',
                price: 3000
            },
            {
                name: 'apple',
                price: 3000
            },
            {
                name: '按时发放e',
                price: 3000
            }
        ]

        res.end(JSON.stringify(obj))
    }
})

server.listen(3000, function () {
    console.log('接收请求');

    



})