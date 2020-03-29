let cities_json = "cities.json"
let pwd = process.cwd()
let json_file_path = pwd + "/server/handylink/mocks/" + cities_json
let fs = require("fs")
let cities = require(json_file_path)

function getCity(id) {
    let province_res = cities.filter(
        (item) => {
            return item.id == String(id)
        })
    if (province_res.length > 0) {
        return province_res[0] 
    } else {
        return undefined
    }
}

function getCities() {
    cities = require(json_file_path)
    return cities
}

function addCity(province) {
    province.id = generateId()
    cities.push(province)
    
    saveToFile()
    return true
}

function deleteCity(id) {
    index = cities.findIndex((item) => {
        return item.id == String(id)
    })

    if (index == -1) {
        return false
    }

    cities.splice(index, 1)
    saveToFile()
    return true
}

function updateCity(province) {
    let is_find = false
    for (province_old of cities) {
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
    var content = JSON.stringify(cities, null, 4);
    fs.writeFile(json_file_path, content, function(err) {
       if (err) {
           console.error(err);
       }
       console.log("城市保存成功！");
    });
}

// 生成民族ID
function generateId() {
    id = 0
    cities.forEach((item) => {
        id = Math.max(id, Number(item.id))
    })

    return String(id + 1)
}

module.exports = {
    "getCity": getCity,
    "getCities": getCities,
    "addCity": addCity,
    "deleteCity": deleteCity,
    "updateCity": updateCity
}