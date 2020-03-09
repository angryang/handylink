let nation = require("./nation/nation")


function Add(req, resp) {
    data = req.body
    
    if (data.type == "nation") {
        req.body = data.data
        nation.addNation(req, resp)
    } else {
        resp.status(400).json(
            {
                "errorCode": "400100100",
                "errorMessage": "请求参数不合法或者暂不支持该类型数据创建。"
            }
        )
    }
}

module.exports = {
    "Add": Add
}