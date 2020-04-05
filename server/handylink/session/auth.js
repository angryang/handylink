const user = require('../user/user/user');
const util = require('../util')
let no_auth_apis = [
    "/api/login",
    "/api/logout",
    "/api/mylinks",
    "/api/mylinks/",
    "/api/mylinks/:type"
]

function isLogin(req, res, next) {
    if (req.session.username) {
        next()
    } else {
        let path = req.path
        if (no_auth_apis.includes(path)) {
            next()
        } else {
            let url = req.url
            // 将用户重定向到登录页面
            res.redirect('/unisession/index.html?originalUrl='+url)
        }  
    }
}

// 登陆
function login(req, res) {
    let originalUrl = req.query.originalUrl
    // 学习路径：req，res是express.js里面的对象。
    // 具体请参照文档：http://expressjs.com/en/4x/api.html
    let userInfo = user.checkUser(req.body.username, req.body.password);
    if (userInfo) {
        req.session.regenerate((err) => {
            if (err) {
                res.status(500).json({
                    "errorCode": 500, 
                    "errorMessage":"登录失败，请重试！"
                });
                return
            }
            req.session.username = userInfo.username;
            res.cookie("username", userInfo.username)
            if (util.isNullOrUndefined(originalUrl)) {
                res.status(200).json(userInfo);
            } else {
                res.redirect(302, originalUrl)
            }
        })
    } else {
        res.status(500).json({
                    "errorCode": 500, 
                    "errorMessage":"用户名或密码错误！"
                });
    }
};

// 校验sessionid
// auth(session) {
//     let ssid = session[session_name]
//     let username = session.username
//     session.store.get(ssid, (error, sessionInfo) => {
//         if (error) {
//             return {
//                 status: 400,
//                 json: {
//                     "errorCode": 400, 
//                     "errorMessage":"ssid 错误，请勿盗用别人的ssid"
//                 }
//             }
//         }
        
//         if (sessionInfo.username === username) {
//             return {
//                 status: 200,
//                 json: "OK"
//             }
//         } else {
//             return {
//                 status: 400,
//                 json: {
//                     "errorCode": 400, 
//                     "errorMessage":"ssid 错误，请勿盗用别人的ssid"
//                 }
//             }
//         }
//     })
// }

// 退出
function logout(req, res) {
    // 备注：这里用的 session-file-store 在destroy 方法里，并没有销毁cookie
    // 所以客户端的 cookie 还是存在，导致的问题 --> 退出登陆后，服务端检测到cookie
    // 然后去查找对应的 session 文件，报错
    // session-file-store 本身的bug    

    req.session.destroy((err) => {
        if(err){
            res.json({code: 500, message: '退出登录失败'});
            return;
        }
        
        res.clearCookie("ssid");
        res.clearCookie("username")
        res.json({"code": 200, message:"退出成功!"});
    });
}

module.exports = {
    "isLogin": isLogin,
    "login": login,
    "logout": logout
}