var mongoose = require('mongoose') ;	// 导入组件

var models = require('./models') ;	// 导入自定义组件
var table = models.UsedType; // 使用scmtypes模型，对应的scmtypes表

var comm = require('../util/comm');

exports.setup = function(callback) { callback(null); }

exports.allList = function (callback) {
    table.find({}, callback);
}

exports.edit = function(id, name, callback) {
    exports.findTodoById(id, function(err, doc) {
        if (err)
            callback(err);
        else {
            doc.name = name;
            doc.save(function(err) {
                if (err) {
                    callback(err);
                } else
                    callback(null);
            });
        }
    });
}

exports.findTodoById = function(id,callback){
    table.findOne({ id: id }, function (err, doc) {
        if (err) {
            callback(err, null);
        }
        callback(null, doc);
    });
}

exports.delete = function(id, callback) {
    exports.findTodoById(id, function(err, doc) {
        if (err)
            callback(err);
        else {
            doc.remove();
            callback(null);
        }
    });
}

exports.add = function (name, callback) {
    var newTable = new table();
    newTable.id= comm.RandomID();
    newTable.name = name;
    newTable.save(function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });

}

exports.getId = function(name, callback) {


//table.findAndModify("_id", null, function(err,obj){
//    console.log("" + obj);
//});

//var ret = table.findOneAndModify(
//          {
//            query: { _id: 'usedtypes' },
//            update: { $inc: { id: 1 } },
//            new: true
//          }
//   );

//   console.log(ret.id);
   //return ret.seq;


}

