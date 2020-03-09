define([
    'text!./list.html',
    'service/user'
  ], function(Template, user) {
    return {
        name: "register",
        template: Template,
        data: function(){
            return {
                tableDatas: [],
                cannotDeleteRoles: ["admin", "customer"]
            };
        },
        methods: {
            initData: function() {
                user.getRoles().then(
                    (response) => {
                        this.tableDatas = response.data;
                        console.log(this.tableDatas)
                    },
                    (error) => {
                        console.log(error)
                    })
            },
            convertData: function(datas) {
                aa = [];
                datas.forEach((item) => {
                    aa.push({
                        "id":item.id,
                        "roleName":item.roleName,
                        "name":item.roleDisplayName["zh-cn"]
                    })
                })

                return aa
            },
            deleteRole: function (row) {
                user.deleteRole(row.id).then(
                    (response) => {
                        console.log("角色删除成功！")
                        console.log(response)

                        this.tableDatas = this.tableDatas.filter(
                                (item) => {return item.id != row.id});
                    },
                    (error) => {
                        console.log("角色删除失败！")
                        console.log(error)
                    }
                    )
            }
        },
        mounted(){
          this.initData();
        }
    }
  })