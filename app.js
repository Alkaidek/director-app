var express = require('express');
var mysql = require('mysql');

var conn = mysql.createPool({
    connectionLimit : 50,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'crud'
});
/*conn.connect(function(error) {
    if(error){
        console.log('error');
    } else {
        console.log('Connected');
    }
});*/

var SERVVER_PORT = 3000;
var app = express();
app.get('/test1', function(req, resp) {
    /*conn.query("SELECT * FROM members", function(error, rows, fields) {
        if(error) {
            console.log('error in the query');
        } else {
            console.log('successful query');
            resp.send('Hello, ' + rows[0].firstname);
            for(let i = 0; i < rows.length; i ++ ) {
                console.log(rows[i]);
            }
        }
    });*/
    conn.getConnection(function(error, tempCont) {
        if(error) {
            conn.release();
            console.log('error');
        } else {
            console.log('conn 1');
            tempCont.query("SELECT * FROM members", function(error, rows, fields){
                tempCont.release();
                if(error) {
                    console.log('err iin query');
                } else {
                    resp.json(rows);
                }
            })
        }
    });
});

app.get('/test2', function(req, resp) {
    conn.getConnection(function(error, tempCont) {
        if(error) {
            conn.release();
            console.log('error' );
        } else {
            console.log('conn 2');
            tempCont.query("INSERT INTO members (memid, firstname, lastname) VALUES (" + req.query.id + "," + req.query.name + "," + req.query.lastname + ")", function(error){
                tempCont.release();
                if(error) {
                    console.log('err in query 2' +  req.query.id);
                } else {
                    resp.send('ok');
                }
            })
        }
    });
});

app.listen(SERVVER_PORT, function() {
    console.log('Server works on port: ' + SERVVER_PORT);
})