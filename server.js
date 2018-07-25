var http = require('http');
var path = require('path');
var fs = require('fs');

const port = '3000';
const host = 'localhost';

const server = http.createServer( (req,res) => {
  console.log('Server started..');
  if(req.method == 'GET'){
    var fileurl;
    if(req.url == '/')fileurl = '/index.html';
    else fileurl = req.url;

    var filepath = path.resolve('./public' + fileurl);
    var filext = path.extname(filepath);
    console.log(filext);
    if(filext == '.html'){
      fs.exists(filepath, (exists) => {
        if(!exists){
          res.statusCode = 400;
          res.setHeader('Content-Type','text/html');
          res.write('404 Bad request \n file does not exists.');
          res.end();
          return;
        }else{
          res.statusCode = 200;
          res.setHeader('Content-Type','text/html');
          fs.createReadStream(filepath).pipe(res);
        }
      });
    }else{
      res.statusCode = 400;
      res.setHeader('Content-Type','text/html');
      res.write('404 File type not supported');
      res.end();
    }
  }else{
    res.statusCode = 400;
    res.setHeader('Content-Type','text/html');
    res.write('404 Bad request \n Request method not supported.');
    res.end();
  }

});

server.listen(port, host, () => {
  console.log(`Server running at port : ${port} and at hostname : ${host}.`)
})
