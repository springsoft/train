
/*
 * GET uploadfile.js
 */

var fs = require('fs');

function start(request, response) {
    console.log("Request handler 'start' was called.");

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="file" name="upload" multiple="multiple">' +
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(body);
    response.end();
}

function upload(request, response) {
    console.log("Request handler 'upload' was called.");

    console.log('about to pars')

    console.log("Request handler 'upload' was called.");
    
    // ����ļ�����ʱ·��
    var tmp_path = request.files.upload.path;   //�ļ���ž���·��
    var title = request.files.upload.name;      //�ϴ�����������ļ���

    console.log(tmp_path);  //ͨ����req�����ݾ�֪����

    // ָ���ļ��ϴ����Ŀ¼ - ʾ��Ϊ"images"Ŀ¼�� 
    //var target_path = './public/upload/' + title;
    var target_path = title;
    // �ƶ��ļ�
    fs.rename(tmp_path, target_path, function (err) {
        if (err) console.log(err);
        // ɾ����ʱ�ļ����ļ�, 
        fs.unlink(tmp_path, function () {
            if (err) console.log(err);
            console.log("tmp_path:" + tmp_path);
            console.log("target_path:" + target_path);
            //response.send('File uploaded to: ' + target_path + ' - ' + request.files.upload.size + ' bytes');
        });
    });

    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write('received image: <br />')
    response.write("<img src='/show' />");
    response.end();

}

function show(request, response) {
    console.log('request handler \'show\' was called...')

    fs.readFile("./tmp/test.jpg", "binary", function (error, file) {
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