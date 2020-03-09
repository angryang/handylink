let nations_json = "nations.json"
let pwd = process.cwd()
let json_file_path = pwd + "/server/mocks/" + nations_json
let fs = require("fs")
let nations = require(json_file_path)


function getNation(id) {
    
}

function getNations() {
    nations = require(json_file_path)
    return nations
}

function addNation(nation) {
    nation.id = generateId()
    nations.push(nation)
    
    saveToFile()
    return true
}

function deleteNation(id) {
    index = nations.findIndex((item) => {
        return item.id == String(id)
    })

    if (index == -1) {
        return false
    }

    nations.splice(index, 1)
    saveToFile()
    return true
}

function updateNation() {
    
}

function saveToFile() {
    var content = JSON.stringify(nations, null, 4);
    fs.writeFile(json_file_path, content, function(err) {
       if (err) {
           console.error(err);
       }
       console.log("民族保存成功！");
    });
}

// 生成民族ID
function generateId() {
    id = 0
    nations.forEach((item) => {
        id = Math.max(id, Number(item.id))
    })

    return String(id + 1)
}

module.exports = {
    "getNation": getNation,
    "getNations": getNations,
    "addNation": addNation,
    "deleteNation": deleteNation,
    "updateNation": updateNation
}