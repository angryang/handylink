// 获取url参数
function getUrlParamaters() {
    let url = window.location.href
    let url_splits = url.split("?")
    let params = {}
    
    if (url_splits.length > 1) {
        let params_str = url_splits[1]
        let param_array = params_str.split("&")
        for (item of param_array) {
            item_splits = item.split("=")
            item_key = item_splits[0]
            item_val = ""
            if (item_splits.length > 1) {
                item_val = item_splits[1]
            }
            
            params[item_key] = item_val
        }
    }
    
    return params
}

// 获取url参数
function getUrlParamater(name) {
    let params = getUrlParamaters()
    return params[name]
}

define([], function() {    
    return {
        getUrlParamater: getUrlParamater
    }
})