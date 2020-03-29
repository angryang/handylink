const session = require('express-session');
const FileStore = require('session-file-store')(session);

// bug: node.js v8.11.3 版本不支持import语法
// import checkUser from './auth';
const auth = require('./user/user/user');
const session_name = "ssid";

const session_config = {
    name: session_name,
    secret: "handylink yangchun", // 用来对session id相关的cookie进行签名
    cookie: {
        maxAge: 30*60*1000 // 30分钟
    },
    store: new FileStore(),  // 使用本地文件存储
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
}

class UnionSession{  
    constructor() {
        this.session = session(session_config)
    }

    // 登陆
    login(req, res) {
        // 学习路径：req，res是express.js里面的对象。
        // 具体请参照文档：http://expressjs.com/en/4x/api.html
        let userInfo = auth.checkUser(req.body.username, req.body.password);
        if (userInfo) {
            req.session.regenerate(function(err){
                if (err) {
                    res.status(500).json({
                        "errorCode": 500, 
                        "errorMessage":"登录失败，请重试！"
                    });
                }
                req.session.username = userInfo.name;
                res.status(200).json(userInfo);
            })
        } else {
            res.status(500).json({
                        "errorCode": 500, 
                        "errorMessage":"用户名或密码错误！"
                    });
        }
    };

    // 退出
    logout(req, res) {
        // 备注：这里用的 session-file-store 在destroy 方法里，并没有销毁cookie
        // 所以客户端的 cookie 还是存在，导致的问题 --> 退出登陆后，服务端检测到cookie
        // 然后去查找对应的 session 文件，报错
        // session-file-store 本身的bug    

        req.session.destroy(function(err) {
            if(err){
                res.json({code: 500, message: '退出登录失败'});
                return;
            }
            
            // req.session.loginUser = null;
            res.clearCookie(session_name);
            res.json({"code": 200, message:"退出成功!"});
        });
    }
}

module.exports = new UnionSession();