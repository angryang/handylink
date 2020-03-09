
  define(["axios"], function(axios) {

    let instance = axios.create();
    instance.defaults.headers.common
    instance.defaults.timeout = 2000; //默认超时时间，2秒。
    return {
        login: function(userinfo) {
            return instance({
                method:'post',
                url:'/api/login',
                data: userinfo
              })
        },
        logout: function(userinfo) {
            return instance({
                method:'get',
                url:'/api/  '
              })
        },
        getLinks: function(type){
            return instance({
                method:'get',
                url:`/api/mylinks/${type}`
              })
        },
        registerUser: function(userinfo) {
            return instance({
                method: 'post',
                url: '/api/user',
                data: userinfo
            })
        }
    }
});