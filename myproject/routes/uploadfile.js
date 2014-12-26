
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
    
    // 获得文件的临时路径
    var tmp_path = request.files.upload.path;   //文件存放绝对路径
    var title = request.files.upload.name;      //上传后解析过的文件名

    console.log(tmp_path);  //通过看req的内容就知道了

    // 指定文件上传后的目录 - 示例为"images"目录。 
    //var target_path = './public/upload/' + title;
    var target_path = title;
    // 移动文件
    fs.rename(tmp_path, target_path, function (err) {
        if (err) console.log(err);
        // 删除临时文件夹文件, 
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