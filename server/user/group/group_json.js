let groups_json = "groups.json"
let pwd = process.cwd()
let json_file_path = pwd + "/server/mocks/" + groups_json
let fs = require("fs")
let groups = require(json_file_path)

// 查询所有用户组
function getGroups() {
    groups = require(json_file_path)
    return groups
}

// 查询指定用户组
function getGroup(groupId) {
    group_res = groups.filter(
        (item) => {
            return item.id == String(groupId)
        })
    if (group_res.length > 0) {
        return group_res[0] 
    } else {
        return undefined
    }
}

// 删除用户组
function deleteGroup(groupId) {
    groupIndex = groups.findIndex((item) => {
        return item.id == String(groupId)
    })

    if (groupIndex == -1) {
        return false
    }

    groups.splice(groupIndex, 1)
    saveToFile()
}

function saveToFile() {
    var content = JSON.stringify(groups, null, 4);
    fs.writeFile(json_file_path, content, function(err) {
       if (err) {
           return console.error(err);
       }
       console.log("用户组保存成功！");
    });
}

// 更新用户组
function updateGroup(group) {
    for (let oldGroup of groups) {
        if (oldGroup.id == group.id) {
            oldGroup.roles = group.roles || oldGroup.roles
            oldGroup.users = group.users || oldGroup.users
        }
    }

    saveToFile()
}

module.exports = {
    "getGroup": getGroup,
    "getGroups": getGroups,
    "deleteGroup": deleteGroup,
    "updateGroup": updateGroup
}