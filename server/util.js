function isNullOrUndefined(param) {
    return param == undefined || param == "";
}

module.exports = {
    "isNull": isNullOrUndefined,
    "isNullOrUndefined": isNullOrUndefined
}