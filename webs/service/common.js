
  define(["axios"], function(axios) {

    let instance = axios.create();
    instance.defaults.headers.common
    instance.defaults.timeout = 2000; //默认超时时间，2秒。
    return {
        getNations: function() {
            return instance({
                method: 'get',
                url: '/api/nations'
            })
        },
        add: function(info) {
            return instance({
                method: 'post',
                url: '/api/common/add',
                data: info
            })
        },
        deleteNation: function(id) {
            return instance({
                method: 'delete',
                url: '/api/nations/' + id
            })
        }
    }
});