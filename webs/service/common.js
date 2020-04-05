
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
        getNation: function(id) {
            return instance({
                method: 'get',
                url: '/api/nations/'+id
            })
        },
        getNations: function() {
            return instance({
                method: 'get',
                url: '/api/nations'
            })
        },
        deleteNation: function(id) {
            return instance({
                method: 'delete',
                url: '/api/nations/' + id
            })
        },
        getCity: function(id) {
            return instance({
                method: 'get',
                url: '/api/cities/'+id
            })
        },
        getCities: function() {
            return instance({
                method: 'get',
                url: '/api/cities'
            })
        },
        deleteCity: function(id) {
            return instance({
                method: 'delete',
                url: '/api/cities/' + id
            })
        },
        getProvince: function(id) {
            return instance({
                method: 'get',
                url: '/api/provinces/'+id
            })
        },
        getProvinces: function() {
            return instance({
                method: 'get',
                url: '/api/provinces'
            })
        },
        deleteProvince: function(id) {
            return instance({
                method: 'delete',
                url: '/api/provinces/'+id
            })
        },
        add: function(info) {
            return instance({
                method: 'post',
                url: '/api/common/add',
                data: info
            })
        },
        edit: function(info) {
            return instance({
                method: 'put',
                url: '/api/common/edit',
                data: info
            })
        }
    }
});