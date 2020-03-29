// ES5
define(["./list"], function(List) {
    return {
            path: "province",
            name: "province_manage",
            component: {
                template: "<router-view></router-view>"
            },
            children: [{
                path: "",
                redirect: "list"
            },{
                path: "list",
                name: "province_list",
                component: List
            // },{
            //     path: "edit",
            //     name: "nation_edit_user",
            //     component: ChangeUser,
            //     props: {
            //         groupId: true
            //     }
            }]
        };
});