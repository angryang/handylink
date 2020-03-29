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
                common.getCities().then(
                    (response) => {
                        this.tableDatas = response.data;
                    },
                    (error) => {
                        console.log(error)
                    })
            },
            deleteCity: function (row) {
                common.deleteCity(row.id).then(
                    (response) => {
                        if (response.data == "OK") {
                            console.log("城市删除成功！")
                            this.tableDatas = this.tableDatas.filter(
                                    (item) => {return item.id != row.id});
                        } else {
                            console.log("城市删除失败！")
                            console.log(response.data)
                        }
                    },
                    (error) => {
                        console.log("城市删除失败！")
                        console.log(error)
                    }
                )
            },
            editCity: function(row) {
                this.$router.push({
                        name: "common_edit",
                        params: {type: "nation", id: row.id}
                    })
            },
            addCity: function() {
                this.$router.push({
                        name: "common_add",
                        params: {type: "city"}
                    })
            }
            
        },
        mounted(){
          this.initData();
        }
    }
  })