var models = require('../server/db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../server/sql')

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret)
    }
};

router.get('/queryUser', (req, res) => {
    var sql = $sql.user.query
    conn.query(sql, function(err, result) {
        if (err) {
        }
        if (result) {
            jsonWrite(res, result)
        }
    })
});

router.get('/deleteUser',(req,res) => {
    var sql = $sql.user.delete
    var params = req.query
    conn.query(sql,params.id, function(err ,result){
        if (err) {
            jsonWrite(err)
        }
        if (result) {
            jsonWrite(res, result)
        }
    })
})

router.get('/login',function(req,res){
    res.send("OK")
});

module.exports = router