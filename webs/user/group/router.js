// ES5
define(["./list", "./changeUser"], function(List, ChangeUser) {
    return {
            path: "group",
            name: "group_manage",
            component: {
                template: "<router-view></router-view>"
            },
            children: [{
                path: "",
                redirect: "list"
            },{
                path: "list",
                name: "group_list",
                component: List
            },{
                path: "edit",
                name: "group_edit_user",
                component: ChangeUser,
                props: {
                    groupId: true
                }
            }]
        };
});