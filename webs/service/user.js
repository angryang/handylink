
  define(["axios"], function(axios) {
    //axios.defaults.withCredentials = true;
    axios.interceptors.response.use(
        (response) => {
          if (response.status == 302) {
              window.location = response.location
              return
          } 
          return response
        }, 
        (error) => {
          return Promise.reject(error);
        });
        
    let instance = axios.create();
    instance.defaults.timeout = 2000; //默认超时时间，2秒。
    return {
        login: function(userinfo, originalUrl) {
            let url_str = '/api/login'
            if (originalUrl) {
                url_str = url_str + '?originalUrl=' + originalUrl
            }
            return instance({
                method: 'post',
                url: url_str,
                data: userinfo
              })
        },
        logout: function(userinfo) {
            return instance({
                method:'get',
                url:'/api/logout'
              })
        },
        registerUser: function(userinfo) {
            return instance({
                method: 'POST',
                url: '/api/user',
                data: userinfo
            })
        },
        getUsers: function() {
            return instance({
                method: 'get',
                url: '/api/users'
            })
        },
        getUser: function(id) {
            return instance({
                method: 'GET',
                url: '/api/users/'+id
            })
        },
        deleteUser: function(id) {
            return instance({
                method: 'DELETE',
                url: '/api/users/'+id
            })
        },
        getRoles: function() {
            return instance({
                method: 'get',
                url: '/api/roles'
            })
        },
        getRole: function(id) {
            return instance({
                method: 'GET',
                url: '/api/roles/'+id
            })
        },
        deleteRole: function(id) {
            return instance({
                method: 'DELETE',
                url: '/api/roles/'+id
            })
        },
        getGroups: function() {
            return instance({
                method: 'get',
                url: '/api/groups'
            })
        },
        getGroupUsers: function(id) {
            return instance({
                method: 'get',
                url: '/api/groups/'+id+'/users'
            })
        },
        updateGroup: function(group) {
             return instance({
                method: 'put',
                url: '/api/groups/'+group.id,
                data: group
            })
        }
    }
});