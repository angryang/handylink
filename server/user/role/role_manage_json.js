let roles_json = "roles.json"
let pwd = process.cwd()
let json_file_path = pwd + "/server/mocks/" + roles_json
let fs = require("fs")
let roles = require(json_file_path)

// 查询所有角色
function getRoles() {
    roles = require(json_file_path)
    return roles
}

// 查询指定角色
function getRole(roleId) {
    return roles.filter(
        (item) => {
            return item.id == roleId
        })
}

// 删除角色
function deleteRole(roleId) {
    roleIndex = roles.findIndex((item) => {
        return item.id == String(roleId)
    })

    if (roleIndex == -1) {
        return false
    }

    roles.splice(roleIndex, 1)
    saveToFile()
}

function saveToFile() {
    var content = JSON.stringify(roles, null, 4);
    fs.writeFile(json_file_path, content, function(err) {
       if (err) {
           return console.error(err);
       }
       console.log("角色保存成功！");
    });
}

module.exports = {
    "getRole": getRole,
    "getRoles": getRoles,
    "deleteRole": deleteRole
}