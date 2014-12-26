﻿
/*
 * GET usedType listing.
 */

var db = require('../dao/usedDao');

exports.list = function (req, res) {
    
    db.allList(function (err, doc) {
        if (err) {
            res.send(doc);
        } else {
            res.send(doc);
        }
    });

};

exports.save = function (req, res, next) {
    var id = req.body.id;
    var name = req.body.name || '';
    name = name.trim();
    if (!name) {
        res.send({ success: false, message: '名称不能为空' });
    }
    db.edit(id,name,function (err, result) {
        if (err) {
            res.send({ success: false, message: '操作失败' });
        } else {
            res.send({ success: true, message: '操作成功' });
        }
    });
};

exports.findone = function (req, res, next) {
    var id = req.body.id;    
    db.findTodoById(id, function (err, doc) {
        if (err) {
             res.send({ success: false, message: '操作失败' });
        }
        if (doc) {
            res.send(doc);
        }
    });
};

exports.delete = function (req, res, next) {
    var id = req.body.ids;
    console.log("id:"+id);
    db.delete(id, function (err) {
        if (err) {
            res.send({ success: false, message: '操作失败' });
        } else {
            res.send({ success: true, message: '操作成功' });
        }
    });
};

exports.new = function (req, res) {
    var name = req.body.name || '';
    name = name.trim();
    var type = req.body.type;
    var content = req.body.content;

    console.log("kkk:" + type);

    if (!name) {
        res.send({d:{ success: false, message: '名称不能为空'}});
    }
    db.add(type,name,content, function (err, row) {
        if (err) {
            res.send({ success: false, message: '操作失败'});
        } else {
            res.send({ success: true, message: row});
        }
    });
};

exports.getId = function (req, res) {
    var name = "";
    db.getId(name, function (err, doc) {
        if (err) {
            res.send({ success: false, message: '操作失败' });
        } else {
            res.send({ success: true, message: doc.id });
        }
    });
};
