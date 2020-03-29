define([
    'text!./list.html',
    'service/common'
  ], function(Template, common) {
    return {
        name: "list",
        template: Template,
        data: function(){
            return {
                totalDatas: [],
                tableDatas: [],
                currentPage: 0,
                pageSize: 10
            };
        },
        methods: {
            initData: function() {
                common.getProvinces().then(
                    (response) => {
                        this.totalDatas = response.data
                        this.initCurrentPage()
                    },
                    (error) => {
                        console.log(error)
                    })
            },
            initCurrentPage: function() {
                let begin = this.pageSize*(this.currentPage-1)
                let end = Math.min(this.pageSize*this.currentPage, this.totalDatas.length)
                
                this.tableDatas = this.totalDatas.slice(begin, end)
            },
            handleSizeChange: function(size) {
                this.pageSize = size
                this.initCurrentPage()
            },
            handleCurrentChange: function(pageNo) {
                this.currentPage = pageNo
                this.initCurrentPage()
            },
            deleteProvince: function (row) {
                common.deleteProvince(row.id).then(
                    (response) => {
                        if (response.data == "OK") {
                            console.log("省份删除成功！")

                            this.tableDatas = this.tableDatas.filter(
                                    (item) => {return item.id != row.id});
                        } else {
                            console.log("省份删除失败！")
                            console.log(response.data)
                        }
                    },
                    (error) => {
                        console.log("省份删除失败！")
                        console.log(error)
                    }
                )
            },
            editProvince: function(row) {
                this.$router.push({
                        name: "common_edit",
                        params: {type: "province", id: row.id}
                    })
            },
            addProvince: function() {
                this.$router.push({
                        name: "common_add",
                        params: {type: "province"}
                    })
            }
        },
        mounted(){
          this.initData();
        }
    }
  })