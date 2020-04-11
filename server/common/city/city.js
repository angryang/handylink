let jsonManager = require("./city_json")
let pwd = process.cwd()
let util = require(pwd + "/server/util")

function getCity(req, resp) {
    id = req.params.id
    
    if (util.isNull(id)) {
        resp = {
            "errorCode": "400110000",
            "errorMessage": "param is invaid."
        }
        resp.status(400).json(resp)
    }
    
    cities = jsonManager.getCity(id)
    if (util.isNull(cities)) {
        resp = {
            "errorCode": "404110000",
            "errorMessage": "not found data."
        }
        resp.status(404).json(resp)
    }
    resp.status(200).json(cities)
}

function getCities(req, resp) {
    citiess = jsonManager.getCities()
    resp.status(200).json(citiess)
}

// 添加省市区
function addCity(req, resp) {
    let data = req.body
    // 检查中文显示
    if (util.isNull(data["zh-cn"])) {
        resp.status(400).json({
            "errorCode": "400110100",
            "errorMessage": "请求数据格式错误，请检查！"
        })
        return
    }
    // 检查英文显示
    if (util.isNull(data["en-us"])) {
        resp.status(400).json({
            "errorCode": "400110101",
            "errorMessage": "请求数据格式错误，请检查！"
        })
        return
    }
    
    let res = jsonManager.addCity(data)
    
    if (res) {
        resp.status(200).json("OK")
    } else {
        resp.status(500).json({
            "errorCode": "500110103",
            "errorMessage": "请求数据错误，请检查！"
        })
    }
}

// 删除省市区
function deleteCity(req, resp) {
    id = req.params.id
    
    if (util.isNull(id)) {
        resp.status(400).json({
            "errorCode": "400110400",
            "errorMessage": "请求参数错误，请检查！"
        })
        return
    }
    
    res = jsonManager.deleteCity(id)
    
    if (res) {
        resp.status(200).json("OK")
    } else {
        resp.status(500).json({
            "errorCode": "500110401",
            "errorMessage": "删除城市错误，内部错误！"
        })
    }
}

// 更新省市区
function updateCity(req, resp) {
    let data = req.body
    // 检查中文显示
    if (util.isNull(data.id)) {
        resp.status(400).json({
            "errorCode": "400110200",
            "errorMessage": "请求数据格式错误，请检查！"
        })
        return
    }
    // 检查中文显示
    if (util.isNull(data["zh-cn"])) {
        resp.status(400).json({
            "errorCode": "400110201",
            "errorMessage": "请求数据格式错误，请检查！"
        })
        return
    }
    // 检查英文显示
    if (util.isNull(data["en-us"])) {
        resp.status(400).json({
            "errorCode": "400110202",
            "errorMessage": "请求数据格式错误，请检查！"
        })
        return
    }
    
    let res = jsonManager.updateCity(data)
    if (res) {
        resp.status(200).json("OK")
    } else {
        resp.status(500).json({
            "errorCode": "500110203",
            "errorMessage": "请求数据错误，请检查！"
        })
    }
    
}

module.exports = {
    "getCity": getCity,
    "getCities": getCities,
    "addCity": addCity,
    "deleteCity": deleteCity,
    "updateCity": updateCity
}