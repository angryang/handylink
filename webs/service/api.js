
  define(["axios"], function(axios) {
    //axios.defaults.withCredentials= true;
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
        getLinks: function(type){
            return instance({
                method:'get',
                url:`/api/mylinks/${type}`
              })
        }
    }
});