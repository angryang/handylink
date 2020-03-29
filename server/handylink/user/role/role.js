roleManager = require("./role_manage_json")
let pwd = process.cwd()
util = require(pwd + "/server/handylink/util")

// 添加角色 
function addRole(req, res) {
    res.json("OK")
}

// 删除角色
function deleteRole(req, resp) {
    roleId = req.params.id
    if (util.isNull(roleId)) {
        res.json({
            "errorCode": "400020400",
            "errorMessage": "param is invaid."
        })
    }

    resp_data = roleManager.deleteRole(roleId)
    resp.json(resp_data)
}

// 查询所有角色
function getRoles(req, res) {
    res.json(roleManager.getRoles())
}

// 查询指定角色
function getRoleById(req, resp) {
    userId = req.params.id

    if (util.isNull(userId)) {
        res.json({
            "errorCode": "400020000",
            "errorMessage": "param is invaid."
        })
    }

    userinfo = userManager.getUser(userId)
    resp.json(userinfo)
}

module.exports = {
    "getRole": getRoleById,
    "getRoles": getRoles,
    "addRole": addRole,
    "deleteRole": deleteRole
};