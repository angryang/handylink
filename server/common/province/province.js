groupManager = require("./group_json")
userManager = require("../user/user_manage_json")
let pwd = process.cwd()
util = require(pwd + "/server/util")

// 添加用户组 
function addGroup(req, res) {
    res.json("OK")
}

// 删除用户组
function deleteGroup(req, resp) {
    roleId = req.params.id
    if (util.isNull(roleId)) {
        res.json({
            "errorCode": "400020400",
            "errorMessage": "param is invaid."
        })
    }

    resp_data = groupManager.deleteGroup(roleId)
    resp.json(resp_data)
}

// 查询所有用户组
function getGroups(req, res) {
    res.json(groupManager.getGroups())
}


function checkGroupId(params) {
    groupId = params.id

    if (util.isNull(groupId)) {
        return {
            "errorCode": "400010000",
            "errorMessage": "param is invaid."
        }
    }

    return undefined
}

// 查询指定用户组
function getGroupById(req, resp) {
    res = checkGroupId(req.params)
    if (res) {
        resp.json(res)
        return 
    }

    groupId = req.params.id
    groupInfo = groupManager.getUser(groupId)
    resp.json(groupInfo)
}

// 查询指定用户组里面的所有用户
function getGroupUsers(req, resp) {
    res = checkGroupId(req.params)
    if (res) {
        resp.json(res)
        return 
    }

    groupId = req.params.id
    groupInfo = groupManager.getGroup(groupId)

    if (util.isNull(groupInfo)) {
        resp.json({
            "errorCode": "404010000",
            "errorMessage": "group not found ."
        })
        return
    }
    userInfos = userManager.getUserByIds(groupInfo.users)
    if (util.isNull(userInfos)) {
        resp.json({
            "errorCode": "404010001",
            "errorMessage": "there is no user in the group."
        })
    } else {
        resp.json(userInfos)
    }
}

// 更新用户组
function updateGroup(req, resp) {
    res = checkGroupId(req.params)
    if (res) {
        resp.json(res)
        return 
    }

    if (req.params.id != req.body.id) {
        resp.json({
            "errorCode": "404020001",
            "errorMessage": "group id in params is diffrent to id in body."
        })
        return
    }
    groupManager.updateGroup(req.body)
    resp.status(204).end()
}

module.exports = {
    "getGroup": getGroupById,
    "getGroupUsers": getGroupUsers,
    "getGroups": getGroups,
    "updateGroup": updateGroup,
    "addGroup": addGroup,
    "deleteGroup": deleteGroup
};