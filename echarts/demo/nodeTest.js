var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req, res){}).listen(50082);
console.log("http start");

 

var url = "http://t3.chei.com.cn/chsi/images/2016/ewm.jpg";
http.get(url, function(res){
    var imgData = "";

    res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开


    res.on("data", function(chunk){
        imgData+=chunk;
    });

    res.on("end", function(){
        fs.writeFile("images/logonew.png", imgData, "binary", function(err){
            if(err){
                console.log("down fail");
            }
            console.log("down success");
        });
    });
});

// fs.readdir(path, function(err, files) {

//     // files是名称数组
//     files.forEach(function(filename) {
//         //运用正则表达式替换oldPath中不想要的部分
//         var oldPath = path + '/' + filename,
//         newPath = newp + '/' + filename.replace(/img/g, '')

//         // fs.rename(oldPath, newPath, callback) 
//         fs.rename(oldPath, newPath, function(err) {
//             if (!err) {
//                 console.log(filename + '替换!')
//             } 
//         })
//     })
// })            
