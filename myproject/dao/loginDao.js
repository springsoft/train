var mongoose = require('mongoose') ;	// 导入组件

var models = require('./models') ;	// 导入自定义组件
var talbe = models.User ;	// 使用User模型，对应的users表

exports.setup = function(callback) { callback(null); }

exports.count = function (query_doc, callback) {

    talbe.count(query_doc, function (err, row) {
         callback(err, row);
    });

}
