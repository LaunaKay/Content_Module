module.exports =
{
    send404: function(response)
    {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('Error 404: This page is not found. Ack.');
        response.end();
    },

    respond: function(request, response)
    {
        var fs = require('fs');
        var path = require('path');
        var mimeLookup =
        {
            '.js': 'application/javascript',
            '.html': 'text/html',
            '.jpg': 'image/jpg',
            '.jpeg': 'image/jpg',
            '.css': 'text/css',
            '.png': 'image/png',
            '.gif': 'image/gif'
        };

        if(request.method == 'GET')
        {
            var fileurl;
                if (request.url == '/') fileurl = '/index.html';
                else fileurl = request.url;

            var filepath;
            var parsePath = path.parse(fileurl);
            console.log('this is the parsed path object', parsePath);

            if(parsePath.ext == '' && parsePath.dir == '/')
            {
                fileurl = '/views' + fileurl + '.html';
                console.log('filepath inside first if', fileurl);
            }

            else if(parsePath.ext != '' && parsePath.dir == '/')
            {
                fileurl = '/views' + fileurl;
                console.log('filepath inside elseif', fileurl);
            }

            var filepath = path.resolve('./' + fileurl);
            console.log('this is the filepath after resolve', filepath);

            var fileExt = parsePath.ext;
            var mimeType = mimeLookup[fileExt];

            fs.exists(filepath, function(exists)
            {
                if(!exists)
                {
                    module.exports.send404(response);
                    return;
                };

                fs.readFile(filepath, function (errors, contents)
                {
                    response.writeHead(200, {'Content-Type': mimeType});
                    // fs.createReadStream(filepath).pipe(response);
                    response.write(contents);
                    response.end();
                });
            });
        }
        else
            this.send404(response);
    }
}