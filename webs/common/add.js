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
                        value: "contury",
                        label: "国家"
                    },{
                        value: "state",
                        label: "州"
                    }
                ],
                commonInfo: {
                    type: ""
                }
            }
        },
        methods: {
            add: function() {
                let info = {
                    type: this.commonInfo.type,
                    data: {
                        "zh-cn": this.commonInfo.zhDisplay,
                        "en-us": this.commonInfo.enDisplay
                    }
                }
                
                common.add(info).then(
                    (resp) => {
                        if (resp.data == "OK") {
                            console.log("民族保存成功！")
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
                let type = this.commonInfo.type
                
                if (type == 'nation') {
                    this.$router.push("/common/nation/list")
                }
            }
        },
        init() {
            this.commonInfo.type = this.$route.params.type
        }
    }
});
  