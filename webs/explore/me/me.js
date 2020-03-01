define([
    'text!./me.html',
  ], function(Template) {
    'use strict';
    return {
      name: "me",
      template: Template,
      data: function() {
        return {
          activeNames: ["1"],
          edus: {
            titles: [{
              title: "时间",
              data: "time",
              width: "200px"
            },{
              title: "学历",
              data: "level",
              width: "100px"
            },{
              title: "学校",
              data: "university",
              width: "160px"
            },{
              title: "专业",
              data: "major",
              width: "160px"
            },{
              title: "主修课程",
              data: "courses",
              width: ""
            }],
            data: [{
              time: "2007年09月~2011年07月",
              level: "本科",
              university: "河南农业大学",
              major: "计算机科学与技术",
              courses: "大学数学，线性代数，计算机组成原理，计算机网络，C语言程序设计"
            }]
          }
        }
      },
      methods: {
        handleChange: function(val) {
          console.log(val)
        }
      }
    }
  });