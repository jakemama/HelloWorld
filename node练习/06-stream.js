//管道流    提供了从一个输出流到输入流的机制。就是从一个流中读取数据传到另一个流中
var fs = require('fs')

var writeStream = fs.createWriteStream('write.txt')

var readStream = fs.createReadStream('hello.txt')

readStream.pipe(writeStream)

console.log('流 已执行完成');


