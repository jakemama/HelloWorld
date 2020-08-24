//利用链式流对管道流进行操作，
var fs = require('fs')
var zlib = require('zlib')

fs.createReadStream('hello.txt')

.pipe(zlib.createGzip())
.pipe()