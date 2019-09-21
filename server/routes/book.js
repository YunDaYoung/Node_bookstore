var express = require('express');
var router = express.Router();

var pool = require('../config/dbconfig');

//책정보 조회하기
router.get('/', (req, res) => {
  pool.getConnection((err, conn) => {
    if(err) { throw err; }
    const sql = 'SELECT * FROM `book`';
    conn.query(sql, (err, row) => {
      conn.release(); //마지막 query문의 제일 위쪽에 작성
      if(err) { throw err; }
      res.send(400, row);
    });
  });
});

//책정보 등록하기
router.post('/', (req, res) => {
  pool.getConnection((err, conn) => {
    if(err) { throw err; }
    var insert = "INSERT INTO `book`(`bookName`, `bookPrice`, `bookAuthor`) VALUES (?,?,?)";
    conn.query(insert, [req.body.bookName, req.body.bookPrice, req.body.bookAuthor],(err, result) => {
      conn.release();
      if(err){ throw err;}
      if(result) {
        res.send({result: true});
      }
      else {
        res.send(500, {result:false})
      }
    })
  });
});

//책정보 수정하기
router.put('/', (req, res) => {
  pool.getConnection((err, conn) => {
    if(err) { throw err; }
    var update = "UPDATE book SET bookName = ?, bookPrice = ?, bookAuthor = ? WHERE bookID = ?";
    conn.query(update, [req.body.bookName, req.body.bookPrice, req.body.bookAuthor, req.body.bookID],(err, result) => {
      conn.release();
      if(err){ throw err;}
      if(result) {
        res.send({result:true});
      }
      else {
        res.send(500, {result:false})
      }
    })
  });
});

//책 삭제하기
router.delete('/:bookID', (req, res) => {
  var bookID = req.params.bookID;
  pool.getConnection((err, conn) => {
    if(err) { throw err; }
    else {
      var sql = "DELETE FROM book WHERE bookID = ?";
      conn.query(sql, [bookID], (err, result) => {
        conn.release();
        if(err) { throw err; }
        else if(result) {
          res.send({result:true})
        }
        else {
          res.send(500, {result:false})
        }
      })
    }
  });
});

module.exports = router;