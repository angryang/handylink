userManager = require("./user_manage_json")
util = require("../util")

// 检查用户是否存在
function checkUser(userName, userPass) {
    for (let item of userManager.getUsers()) {
        if (item.username === userName && userPass == item.password) {
            return item;
        }
    }

    return undefined;
}

// 校验用户数据合法性
function validateUser(user) {
    if (user.username == undefined || user.username == "" || 
        user.password == undefined || user.password == "") {
        return {
            "errorCode": "400001",
            "errorMessage": "username or password is incorrect!"
        };
    }

    if (user.sex == undefined || user.sex == "") {
        return {
            "errorCode": "400002",
            "errorMessage": "user sex is incorrect!"
        };
    }

    return undefined
}

function convertToUser(data) {
    return {
        "id": userManager.generateId(), 
        "username": data.username,
        "password": data.password,
        "sex": data.sex,
        "birthday": data.birthday || "",
        "cardId": data.cardId || ""
    }
}

// 注册用户 
function registerUser(req, res) {
    user = convertToUser(req.body)

    error = validateUser(user)
    if (error != undefined) {
        res.json(error);
    }
    userManager.addUser(user);
    res.json("OK")
}

// 删除用户
function removeUser(req, resp) {
    userId = req.params.id
    if (util.isNull(userId)) {
        res.json({
            "errorCode": "400000000",
            "errorMessage": "param is invaid."
        })
    }

    resp_data = userManager.removeUser(userId)
    resp.json(resp_data)
}

// 查询所有用户
function getUsers(req, res) {
    res.json(userManager.getUsers())
}

// 查询指定用户
function getUserById(req, resp) {
    userId = req.params.id

    if (util.isNull(userId)) {
        res.json({
            "errorCode": "400000000",
            "errorMessage": "param is invaid."
        })
    }

    userinfo = userManager.getUser(userId)
    resp.json(userinfo)
}

module.exports = {
    "checkUser": checkUser,
    "getUsers": getUsers,
    "getUserById": getUserById,
    "registerUser": registerUser, 
    "removeUser": removeUser
};