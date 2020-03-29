// ES5
define(["./menu",
    "./add",
    "./city/router",
    "./nation/router",
    "./province/router"], 
    function(Menu, Add, CityRouter, NationRouter, ProvinceRouter) {
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
            component: Add,
            props: {
                type: true,
                id: true
            }
        },
        CityRouter,
        NationRouter,
        ProvinceRouter]
    }];
});