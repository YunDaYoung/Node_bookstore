var express = require('express');
var router = express.Router();

var pool = require('../config/dbconfig');

//회원가입
router.post('/signUp', (req,res) => {
  pool.getConnection((err, conn) => {
    if(err) {
      throw err;
    }
    else {
      var sql = "SELECT * from Member WHERE memberID = ?"
      conn.query(sql, [req.body.memberID], (err, result) => {
        if(err) {
          throw err;
        }
        else {
          if(result.length === 0){
            var insert = "INSERT INTO `member`(`memberID`, `memberPassword`, `memberName`) VALUES (?,?,?)";
            conn.query(insert, [req.body.memberID, req.body.memberPassword, req.body.memberName], (err, result) => {
              conn.release();
              if(err){
                throw err;
              }
              else {
                res.send({result: true});
              }
            })
          } else {
            conn.release();
            res.send("Invalid Data");
          }
        }
      });
    }
  });
});

//로그인
router.post('/signIn', (req,res) => {
  pool.getConnection((err, conn) => {
    if(err) {
      throw err;
    }
    else {
      var sql = "SELECT * FROM Member WHERE memberID = ? AND memberPassword = ?"
      conn.query(sql, [req.body.memberID, req.body.memberPassword], (err, result) => {
        conn.release();
        if(err) {
          throw err;
        }
        else {
          if(result.length === 0){
            res.send(500, {result:false})
          }
          else {
            var data = {
              memberID: result[0].memberID,
              memberName: result[0].memberName
            }
            res.send(200, data);
          }
        }
      });
    }
  });
});

module.exports = router;