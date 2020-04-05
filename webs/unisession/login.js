define([
    'text!unisession/login.html',
    'service/user',
    'service/util'
    ], function(Template, user, util) {
        return {
            name: "login",
            template: Template,
            data: function() {
                return {
                    userinfo: {
                        username: "",
                        password: ""
                    }
                }
            },
            methods: {
                login: function() {
                    let originalUrl = util.getUrlParamater("originalUrl")
                    user.login(this.userinfo, originalUrl).then(
                        (response) => {
                            // window.sessionStorage.setItem("username", response.data.username);
                            if (response.status == 200) {
                                if (originalUrl) {
                                    window.location = response.request.responseURL
                                } else {
                                    window.location = "/#/home"
                                }
                            }
                        },
                        (error) => {
                            console.log(error);
                        }
                    )
                },
                clear: function() {
                    this.userinfo.username = "";
                    this.userinfo.password = "";
                },
                register: function() {
                    window.location = "/#/register"
                }
            }
        }
    }
)