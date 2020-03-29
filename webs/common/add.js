define([
    'text!./add.html',
    "service/common",
  ], function(Template, common) {
    'use strict';
    return {
        name: "common_add",
        template: Template,
        data: function() {
            return {
                options: [
                    {
                        value: "nation",
                        label: "民族"
                    },{
                        value: "province",
                        label: "省份"
                    },{
                        value: "city",
                        label: "城市"
                    // },{
                    //     value: "contury",
                    //     label: "国家"
                    // },{
                    //     value: "state",
                    //     label: "州"
                    }
                ],
                commonInfo: {
                    id: "",
                    zhDisplay: "",
                    enDisplay: ""
                },
                type: "",
                pageMode: "",
                typeDisabled: false
            }
        },
        methods: {
            isUpdate: function(){
                return this.pageMode === "update"
            },
            getData: function(type, id){
                let data = {}
                if (type == "nation") {
                    common.getNation(id).then(
                        (resp) => {
                            data = resp.data
                            this.dataToView(data)
                        },
                        (error) => {
                            console.log("查询数据失败")
                        }
                    )
                }
            },
            dataToView: function(data) {
                this.$set(this.commonInfo, "zhDisplay", data["zh-cn"])
                this.$set(this.commonInfo, "enDisplay", data["en-us"])
            },
            edit: function() {
                let info = {
                    type: this.type,
                    data: {
                        "id": this.commonInfo.id,
                        "zh-cn": this.commonInfo.zhDisplay,
                        "en-us": this.commonInfo.enDisplay
                    }
                }
                common.edit(info).then(
                    (resp) => {
                        if (resp.data == "OK") {
                            console.log("数据更新成功！")
                            this.jumpTo()
                        } else {
                            console.log(resp)
                        }
                    },
                    (error) => {
                        console.log(error)
                    }
                )
            },
            add: function() {
                let info = {
                    type: this.type,
                    data: {
                        "zh-cn": this.commonInfo.zhDisplay,
                        "en-us": this.commonInfo.enDisplay
                    }
                }
                
                common.add(info).then(
                    (resp) => {
                        if (resp.data == "OK") {
                            console.log("数据保存成功！")
                            this.jumpTo()
                        } else {
                            console.log(resp)
                        }
                    },
                    (error) => {
                        console.log(error)
                    }
                )
            },
            cancel: function() {
                this.jumpTo()
            },
            jumpTo: function() {
                let type = this.type
                if (type == 'nation') {
                    this.$router.push("/common/nation/list")
                } else if (type == 'province') {
                    this.$router.push("/common/province/list")
                } else if (type == 'city') {
                    this.$router.push("/common/city/list")
                }
            }
        },
        mounted() {
            console.log(this.$route.params.type)
            let type = this.$route.params.type
            if (type && type != "") {
                this.type = type
                this.typeDisabled = true
            } else {
                this.type = "nation"
                this.typeDisabled = false
            }
            
            // 读取数据
            let id = this.$route.params.id
            if (id && id != "") {
                this.pageMode = "update"
                this.commonInfo.id = id
                this.getData(type, id)
            } else {
                this.pageMode = "add"
            }
        },
        // updated() {
        //     console.log(this.$route.params.type)
        //     this.commonInfo.type = this.$route.params.type
        // }
    }
});
  