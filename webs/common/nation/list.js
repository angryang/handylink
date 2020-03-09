define([
    'text!./list.html',
    'service/common'
  ], function(Template, common) {
    return {
        name: "list",
        template: Template,
        data: function(){
            return {
                tableDatas: []
            };
        },
        methods: {
            initData: function() {
                common.getNations().then(
                    (response) => {
                        this.tableDatas = response.data;
                    },
                    (error) => {
                        console.log(error)
                    })
            },
            deleteNation: function (row) {
                common.deleteNation(row.id).then(
                    (response) => {
                        if (response.data == "OK") {
                            console.log("民族删除成功！")

                            this.tableDatas = this.tableDatas.filter(
                                    (item) => {return item.id != row.id});
                        } else {
                            console.log("民族删除失败！")
                            console.log(response.data)
                        }
                    },
                    (error) => {
                        console.log("民族删除失败！")
                        console.log(error)
                    }
                )
            },
            editNation: function(row) {
                this.$router.push({
                        name: "common_edit_nation",
                        params:{groupId: row.id}
                    })
            },
            addNation: function() {
                this.$router.push({
                        name: "common_add",
                        params: {type: "nation"}
                    })
            }
            
        },
        mounted(){
          this.initData();
        }
    }
  })