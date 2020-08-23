var fs = require('fs')


// 同步执行
// var data = fs.readFileSync("test.text");

// console.log(data.toString());
// console.log('----------------');
// console.log('文件执行结束');

// 异步执行
fs.readFile("test.text", function(err, data){
    if (err) {
        return error;
    }else{
        console.log(data.toString());
    }
    
})

console.log('----------------');
console.log('文件执行结束');
