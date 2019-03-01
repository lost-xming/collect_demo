var express = require('express');
var app = express();


// app.use(express.static('/Users/wangwenlin/wwl/wwlin/server.js'));
app.get('/', function(req, res) {
    res.send('Hello World!');
});
var server = app.listen(3338, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});