
/*
 * GET scmtype listing.
 */

var db = require('../dao/scmDao');

exports.count = function (req, res) {
    
    var query_doc = {}; // 固定数据
    db.count(query_doc, function (err, doc) {// 直接利用mongodb的命令进行操作
        if (doc == 0) {	// 输入错误，没有此信息
            res.send("没有数据");
        } else {	    // 成功
            //res.send("总共数据:"+doc);
			res.send({size:doc});
        }
    });

};



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
    var id = req.params.id;    
    db.findTodoById(id, function (err, doc) {
        if (err) {
             res.send({ success: false, message: '操作失败' });
        }
        if (doc) {
            res.send({ success: true, message: '操作成功  '+doc });
        }
    });
};

exports.delete = function (req, res, next) {
    var id = req.body.id;
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
    if (!name) {
        res.send({d:{ success: false, message: '名称不能为空'}});
    }
    db.add(name, function (err, row) {
        if (err) {
            res.send({ success: false, message: '操作失败'});
        } else {
            res.send({ success: true, message: row});
        }
    });

    //next();
};
