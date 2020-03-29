const express  = require('express')
const home_link = require('./home/home')
const unisession = require('./session')
// 注册路由
const router = express.Router();

// 登录
router.post('/api/login', unisession.login)
router.get('/api/logout', unisession.logout)

// 用户管理
const user = require('./user/user/user')
router.get('/api/users', user.getUsers)
router.get('/api/users/:id', user.getUserById)
router.post('/api/user', user.registerUser)
router.delete('/api/users/:id', user.removeUser)

// 用户组管理
const group = require('./user/group/group')
router.get('/api/groups', group.getGroups)
router.get('/api/groups/:id', group.getGroup)
router.get('/api/groups/:id/users', group.getGroupUsers)
router.put('/api/groups/:id', group.updateGroup)
router.post('/api/group', group.addGroup)
router.delete('/api/groups/:id', group.deleteGroup)

// 角色管理
const role = require('./user/role/role')
router.get('/api/roles', role.getRoles)
router.delete('/api/roles/:id', role.deleteRole)

// 民族管理
const nation = require('./common/nation/nation')
router.get('/api/nations', nation.getNations)
router.get('/api/nations/:id', nation.getNation)
router.delete('/api/nations/:id', nation.deleteNation)

// 省市区管理
const province = require('./common/province/province')
router.get('/api/provinces', province.getProvinces)
router.get('/api/provinces/:id', province.getProvince)
router.delete('/api/provinces/:id', province.deleteProvince)

// 城市管理
const city = require('./common/city/city')
router.get('/api/cities', city.getCities)
router.get('/api/cities/:id', city.getCity)
router.delete('/api/cities/:id', city.deleteCity)

// 公共管理
const common = require('./common/common')
router.post('/api/common/add', common.Add)
router.put('/api/common/edit', common.Edit)
router.post('/api/offer.json', common.GetOffer)

// 处理/api/mylinks的post请求
router.get('/api/mylinks', home_link.getLinks);
router.get('/api/mylinks/:type', home_link.getLinks);

// bug: node.js v8.11.3 版本不支持export语法。
// export default router;
module.exports = router;