
/*
 * GET home page.
 */

var db = require('../dao/loginDao');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.login = function(req, res){
  res.render('login', { title: '用户登录' });
};

exports.doLogin = function(req, res){
    // 现在拼凑出了一个基本的字符串
    var query_doc = { userid: req.body.userid, password: req.body.password }; // 固定数据
    db.count(query_doc, function (err, doc) {
        if (doc == 0) {	// 输入错误，没有此信息
            res.redirect("/login");
        } else {	// 成功
            res.redirect("/welcome?uid=" + req.body.userid); // 地址重写
        }
    });
};

exports.logout = function(req, res){
  res.render('login', { title: '用户注销' });
};

exports.welcome = function(req, res){
	// 如果是地址栏参数使用req.query.参数名称接收
	var user = {
		userid : req.query.uid 	}
  res.render('welcome', { title: '程序首页' , user:user });
};