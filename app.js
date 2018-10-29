var express = require('express');
//var mysql = require('mysql');
var http = require('http');
var path = require('path');
const bodyParser = require('body-parser');
var app = express();
const api = require('./server/routes/api');
/*conn.connect(function(error) {
    if(error){
        console.log('error');
    } else {
        console.log('Connected');
    }
});*/


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

var SERVVER_PORT = 3000;


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


const server = http.createServer(app);
server.listen(SERVVER_PORT, function() {
    console.log('Server works on port: ' + SERVVER_PORT);
})