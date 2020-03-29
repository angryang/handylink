let jsonManager = require("./nation_json")
let pwd = process.cwd()
let util = require(pwd + "/server/handylink/util")

function getNation(req, resp) {
    id = req.params.id
    
    if (util.isNull(id)) {
        resp = {
            "errorCode": "400110000",
            "errorMessage": "param is invaid."
        }
        resp.status(400).json(resp)
    }
    
    nation = jsonManager.getNation(id)
    if (util.isNull(nation)) {
        resp = {
            "errorCode": "404110000",
            "errorMessage": "not found data."
        }
        resp.status(404).json(resp)
    }
    resp.status(200).json(nation)
}

function getNations(req, resp) {
    nations = jsonManager.getNations()
    resp.status(200).json(nations)
}

// 添加民族
function addNation(req, resp) {
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
    
    let res = jsonManager.addNation(data)
    
    if (res) {
        resp.status(200).json("OK")
    } else {
        resp.status(500).json({
            "errorCode": "500110103",
            "errorMessage": "请求数据错误，请检查！"
        })
    }
}

function deleteNation(req, resp) {
    id = req.params.id
    
    if (util.isNull(id)) {
        resp.status(400).json({
            "errorCode": "400110400",
            "errorMessage": "请求参数错误，请检查！"
        })
        return
    }
    
    res = jsonManager.deleteNation(id)
    
    if (res) {
        resp.status(200).json("OK")
    } else {
        resp.status(500).json({
            "errorCode": "500110401",
            "errorMessage": "删除民族错误，内部错误！"
        })
    }
}

function updateNation(req, resp) {
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
    
    let res = jsonManager.updateNation(data)
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
    "getNation": getNation,
    "getNations": getNations,
    "addNation": addNation,
    "deleteNation": deleteNation,
    "updateNation": updateNation
}