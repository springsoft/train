
var formidable = require('formidable');
var fs = require('fs');

function start(request, response) {
    console.log("Request handler 'start' was called.");
    
    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload1" enctype="multipart/form-data" '+
        'method="post">'+
        '<input type="file" name="upload" multiple="multiple">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';
        
    response.writeHead(200, {'Content-Type' : 'text/html'})
    response.write(body);
    response.end();
}

function upload(request, response) {
    console.log("Request handler 'upload' was called.");

    var filename = request.files.upload.path;   //�ļ���ž���·��
    var title = request.files.upload.name;      //�ϴ�����������ļ���

    console.log(filename);  //ͨ����req�����ݾ�֪����
    

    
}

function show(request, response) {
    console.log('request handler \'show\' was called...')
    
    fs.readFile("tmp/test.jpg", "binary", function(error, file) {
        if (error) {
            response.writeHead(500, {
                "Content-Type": "text/plain"
            });
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {
                "Content-Type": "image/jpg"
            });
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;