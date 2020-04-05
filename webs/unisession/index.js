require.config({
  baseUrl: "/",
  paths: {
    "text": "../libs/require.text",
    "axios": "../libs/axios"
  }
});

define([
  'login.js',
], function(Login) {
  'use strict';
    let app = new Vue({
        el: '#app',
        render: h => h(Login)
    });
});