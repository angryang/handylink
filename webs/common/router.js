// ES5
define(["./menu",
    "./add",
    "./edit",
    "./nation/router"], 
    function(Menu, Add, Edit, NationRouter) {
    return [{
        path: "/common",
        name: "common",
        component: Menu,
        children: [{
            path: "",
            redirect: "nation"
        },{
            path: "add",
            name: "common_add",
            component: Add,
            props: {
                type: true
            }
        },{
            path: "edit",
            name: "common_edit",
            component: Edit,
            props: {
                type: true
            }
        },
        NationRouter]
    }];
});