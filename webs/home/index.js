define([
  'text!home/index.html',
  'service/api'
], function(Template, api) {
  'use strict';
  return {
    name: "home",
    template: Template,
    data: function() {
      return {
        searchText: "",
        username: "",
        userRole: "0",
        links: {
          news: [],
          tech: [],
          programer: []
        }
      }
    },
    methods: {
      homeDropdownClick: function(command) {
        if (command == "logout") {
            api.logout().then(
              response => {
                  if (response.data.code == 200) {
                      window.sessionStorage.removeItem("username");
                      this.initData();
                  }
              },
              error => {
                  console.log(error);
              }
          )
        }
      },
      search: function() {
        window.open(`https://www.baidu.com/s?wd=${this.searchText}`, "_blank");
      },
      getLinks: function(type) {
        api.getLinks(type).then(response=>{
          if (response.status == 200) {
            if (type==="") {
              this.links = response.data;
            } else {
              this.links[type] = response.data;
            }
          }
        });
      },
      getAll: function() {
        this.getLinks("");
      },
      getNews: function() {
        this.getLinks("news");
      },
      getTech: function() {
        this.getLinks("tech");
      },
      initData() {
        this.getAll();
        this.username = window.sessionStorage.getItem("username");
        this.userRole = "0"
      }
    },
    mounted(){
      this.initData();
    }
  }
});
