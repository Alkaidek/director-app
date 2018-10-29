const express = require('express');
const router = express.Router();
var mysql = require('mysql');


var conn = mysql.createPool({
    connectionLimit : 50,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'crud'
});

const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

let response = {
    data: [],
};
router.get('/test1', function(req, resp) {
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
            tempCont.query("SELECT * FROM members", function(error, rows){
                tempCont.release();
                if(error) {
                    sendError(error, resp);
                    console.log('err iin query');
                } else {
                    response.data = rows;
                    resp.json(response.data);
                }
            })
        }
    });
});
//http://localhost:3000/test2/?id=22&name=Elosza&lastname=alahomora
router.get('/test2', function(req, resp) {
    conn.getConnection(function(error, tempCont) {
        if(error) {
            conn.release();
            console.log('error' );
        } else {
            console.log('conn 2');
            console.log('parms' + req.query.id + "," + req.query.name + "," + req.query.lastname );
            tempCont.query("INSERT INTO members (firstname, lastname) VALUES ('" + req.query.name + "', '" + req.query.lastname + "')", function(error){
                //tempCont.query("INSERT INTO members (memid, firstname, lastname) VALUES (" + req.query.id + "," + req.query.name + "," + req.query.lastname + ")", function(error){
                tempCont.release();
                if(error) {
                    console.log(error);
                    console.log('err in query 2' +  req.query.id);
                } else {
                    resp.send('ok');
                }
            })
        }
    });
});
module.exports = router;