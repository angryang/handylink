let provinces_json = "provinces.json"
let pwd = process.cwd()
let json_file_path = pwd + "/server/mocks/" + provinces_json
let fs = require("fs")
let provinces = require(json_file_path)

function getProvince(id) {
    let province_res = provinces.filter(
        (item) => {
            return item.id == String(id)
        })
    if (province_res.length > 0) {
        return province_res[0] 
    } else {
        return undefined
    }
}

function getProvinces() {
    provinces = require(json_file_path)
    return provinces
}

function addProvince(province) {
    province.id = generateId()
    provinces.push(province)
    
    saveToFile()
    return true
}

function deleteProvince(id) {
    index = provinces.findIndex((item) => {
        return item.id == String(id)
    })

    if (index == -1) {
        return false
    }

    provinces.splice(index, 1)
    saveToFile()
    return true
}

function updateProvince(province) {
    let is_find = false
    for (province_old of provinces) {
        if (province_old.id === province.id) {
            is_find = true
            province_old["zh-cn"] = province["zh-cn"]
            province_old["en-us"] = province["en-us"]
            saveToFile()
        }
    }
    
    return is_find
}

function saveToFile() {
    var content = JSON.stringify(provinces, null, 4);
    fs.writeFile(json_file_path, content, function(err) {
       if (err) {
           console.error(err);
       }
       console.log("省份保存成功！");
    });
}

// 生成省份ID
function generateId() {
    id = 0
    provinces.forEach((item) => {
        id = Math.max(id, Number(item.id))
    })

    return String(id + 1)
}

module.exports = {
    "getProvince": getProvince,
    "getProvinces": getProvinces,
    "addProvince": addProvince,
    "deleteProvince": deleteProvince,
    "updateProvince": updateProvince
}