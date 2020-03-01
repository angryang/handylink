define([
    'text!./list.html',
    'service/user'
  ], function(Template, user) {
    return {
        name: "list",
        template: Template,
        data: function(){
            return {
                tableDatas: [],
                cannotDeleteGroups: ["admin"]
            };
        },
        methods: {
            initData: function() {
                user.getGroups().then(
                    (response) => {
                        this.tableDatas = response.data;
                    },
                    (error) => {
                        console.log(error)
                    })
            },
            deleteGroup: function (row) {
                user.deleteGroup(row.id).then(
                    (response) => {
                        console.log("用户组删除成功！")
                        console.log(response)

                        this.tableDatas = this.tableDatas.filter(
                                (item) => {return item.id != row.id});
                    },
                    (error) => {
                        console.log("用户组删除失败！")
                        console.log(error)
                    }
                    )
            },
            editUser: function(row) {
                this.$router.push({
                        name: "group_edit_user",
                        params:{groupId: row.id}
                    })
            }
        },
        mounted(){
          this.initData();
        }
    }
  })