const session = require('express-session');
const FileStore = require('session-file-store')(session);

// bug: node.js v8.11.3 版本不支持import语法
const session_name = "ssid";

const session_config = {
    name: session_name,
    secret: "handylink", // 用来对session id相关的cookie进行签名
    cookie: {
        maxAge: 30*60*1000 // 30分钟
    },
    store: new FileStore(),  // 使用本地文件存储
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
}

module.exports = session(session_config)