
/**
 * Module dependencies.
 */

var express = require('express');

var routes = require('./routes');
var user = require('./routes/user');
var todo = require('./routes/todo')
var scm = require('./routes/scm');
var usedType = require('./routes/usedType');
var used = require('./routes/used');
var uploadfile = require('./routes/uploadfile');

var version = require('./routes/version');

var mongoDB = require('./dao/db');

var http = require('http');
var path = require('path');
var ejs = require('ejs') ;	// require()函数表示要加载的模块
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

app.engine('html',ejs.__express) ; 
app.set('view engine', 'html');	// 替换：app.set('view engine', 'ejs');


app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser({uploadDir:'./public/upload'}));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/login', routes.login);	// 此处还需要routes/index.js修改
app.post('/login', routes.doLogin);	// 处理post请求，表单提交
app.get('/logout', routes.logout); // 处理注销
app.get('/welcome', routes.welcome);		// 进入到首页

app.get('/todo', todo.index);
app.post('/todo/new', todo.new);
app.get('/todo/:id', todo.view);
app.get('/todo/:id/edit', todo.edit);
app.post('/todo/:id/edit', todo.save);
app.get('/todo/:id/delete', todo.delete);
app.get('/todo/:id/finish', todo.finish);


app.post('/scmtype/create', scm.new);
app.post('/scmtype/update', scm.save);
app.post('/scmtype/delete', scm.delete);
app.get('/scmtype/list', scm.list);
app.get('/scmtype/:id/one', scm.findone);

app.post('/usedtype/create', usedType.new);
app.post('/usedtype/update', usedType.save);
app.post('/usedtype/delete', usedType.delete);
app.get('/usedtype/list', usedType.list);
app.get('/usedtype/getId', usedType.getId);

app.post('/used/create', used.new);
app.post('/used/update', used.save);
app.get('/used/list', used.list);
app.get('/used/one', used.findone);
app.post('/used/delete', used.delete);

app.all('/version/list', version.list);


app.get('/start', uploadfile.start);
app.post('/upload', uploadfile.upload);
app.post('/show', uploadfile.show);

app.get('/users', user.list);
app.get('/count', scm.count);    

mongoDB.connect(function (error) {
    if (error) throw error;
});

app.on('close', function (errno) {
    mongoDB.disconnect(function (err) { });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
