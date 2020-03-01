define([
    'text!./changeUser.html',
    'service/user'
  ], function(Template, user) {
    return {
        name: "change_user",
        template: Template,
        data: function(){
            return {
                users: [],
                selectedUsers: [],
                groupId: ""
            };
        },
        methods: {
            initData: function() {
                user.getUsers().then(
                    (response) => {
                        this.users = this.convertToTransferData(response.data);
                        console.log(this.users)
                    },
                    (error) => {
                        console.log(error)
                    })
                this.groupId = this.$route.params.groupId
                console.log(this.groupId)
                user.getGroupUsers(this.groupId).then(
                    (response) => {
                        if (response.data.errorCode) {
                            console.log(response.data)
                            return
                        }
                        this.selectedUsers = response.data.map(
                                (item) => {return item.id}
                            );
                        console.log(this.selectedUsers)
                    },
                    (error) => {
                        console.log(error)
                    })
            },
            convertToTransferData: function(data) {
                return data.map(
                        (item) => {
                            return {
                                key: item.id,
                                label: item.username
                            }
                        }
                    )
            },
            change: function() {
                group = {
                    "id" : this.$route.params.groupId,
                    "users": this.selectedUsers
                }

                user.updateGroup(group).then(
                    (response) => {
                        console.log("更新用户组用户成功", response)
                    },
                    (error) => {
                        console.log("更新用户组用户失败", error)
                    });
            },
            cancel: function() {
                this.$router.push("/user/group/list")
            }
        },
        mounted(){
          this.initData();
        }
    }
  })