const express = require('express');
const app = express();

// 注册参数request解析器中间件，参考
// var multer = require('multer'); // v1.0.5
// var upload = multer(); // for parsing multipart/form-data
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 绑定session中间件
// 绑定cookieParser中间件
const unisession = require('./server/handylink/session');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(unisession);

// 注册api
const router = require('./server/handylink/router');
app.use(router);

// 处理静态文件
app.use(express.static(__dirname + '/webs'));
// 处理/unisession/*目录的请求
app.use("/unisession/*", function(req, res, next){
    if (req.session.username) {
        let originalUrl = req.params.originalUrl
        if (originalUrl) {
            res.redirect(originalUrl)
        } else {
            next()
        }
    } else {
        next()
    }
});
// 处理根目录的请求，必须放最后处理
app.use("/", function(req,res) {
    res.sendFile(__dirname + '/webs/index.html')
});

app.listen(80) ;

