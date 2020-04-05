// ES5
define(["explore/explore",
    "./todo/todo",
    "./me/me",
    "./alipay/alipay",
    "./weixin/pay",
    "./area/area",
    "./storage/storage"], function(Explore, Todo, AboutMe, AliPay, WeixinPay, Area, Storage, Session) {
    return {
        path: "/explore",
        name: "explore",
        component: Explore,
        children: [{
            path: "",
            redirect: "me"
        },{
            path: "me",
            name: "explore_about_me",
            component: AboutMe
        },{
            path: "todo",
            name: "explore_todo",
            component: Todo
        },{
            path: "alipay",
            name: "explore_alipay",
            component: AliPay
        },{
            path: "wxpay",
            name: "explore_wxpay",
            component: WeixinPay
        },{
            path: "area",
            name: "explore_area",
            component: Area
        },{
            path: "storage",
            name: "explore_storage",
            component: Storage
        }]
    };
});