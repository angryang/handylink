let nation = require("./nation/nation")
let province = require("./province/province")
let city = require("./city/city")

function Add(req, resp) {
    data = req.body
    
    if (data.type == "nation") {
        req.body = data.data
        nation.addNation(req, resp)
    } else if (data.type == "province") {
        req.body = data.data
        province.addProvince(req, resp)
    } else if (data.type == "city") {
        req.body = data.data
        city.addCity(req, resp)
    } else {
        resp.status(400).json(
            {
                "errorCode": "400100100",
                "errorMessage": "请求参数不合法或者暂不支持该类型数据创建。"
            }
        )
    }
}

function Edit(req, resp) {
    data = req.body
    
    if (data.type == "nation") {
        req.body = data.data
        nation.updateNation(req, resp)
    } else if (data.type == "province") {
        req.body = data.data
        province.updateProvince(req, resp)
    } else if (data.type == "city") {
        req.body = data.data
        city.updateCity(req, resp)
    } else {
        resp.status(400).json(
            {
                "errorCode": "400100100",
                "errorMessage": "请求参数不合法或者暂不支持该类型数据创建。"
            }
        )
    }
}

function GetOffer(req, resp) {
    console.log("req.headers=", req.headers)
    console.log("req.body=", req.body)
    console.log("req.params=", req.params)
    data = require("./offer.json")
    resp.status(200).json(data)
}

module.exports = {
    "Add": Add,
    "Edit": Edit,
    "GetOffer": GetOffer
}