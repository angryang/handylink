const express  = require('express');
const home_link = require('./api/home');
const unisession = require('./session');
const auth = require('./auth/auth');
// 注册路由
const router = express.Router();

// 登录
router.post('/api/login', unisession.login);
router.get('/api/logout', unisession.logout);

// 用户管理
router.get('/api/users', auth.getUsers)
router.get('/api/users/:id', auth.getUserById)
router.post('/api/user', auth.registerUser)
router.delete('/api/users/:id', auth.removeUser)

// 角色管理
// router.post('/api/roles', auth.registerUser)
// router.delete('/api/roles', auth.removeUser)

// 处理/api/mylinks的post请求
router.get('/api/mylinks', home_link.getLinks);
router.get('/api/mylinks/:type', home_link.getLinks);

// bug: node.js v8.11.3 版本不支持export语法。
// export default router;
module.exports = router;