var express = require('express');
var router = express.Router();

var pool = require('../config/dbconfig');

//주문 전체조회(관리자)
router.get('/', (req, res, next) => {
  pool.getConnection((err, conn) =>{
    if(err) { throw err; }
    const sql = 'SELECT * FROM `bookorder`';
    conn.query(sql, (err, row) => {
      conn.release(); //마지막 query문의 제일 위쪽에 작성
      if(err) { throw err; }
      res.send(row);
    });
  });
});

//사용자별 주문조회
router.get('/:memberID', (req, res, next) => {
  var memberID = req.params.memberID;
  pool.getConnection((err, conn) =>{
    if(err) { throw err; }
    const sql = 'SELECT * FROM `bookorder` WHERE Member_memberID = ?';
    conn.query(sql, [memberID], (err, row) => {
      conn.release(); //마지막 query문의 제일 위쪽에 작성
      if(err) { throw err; }
      res.send(row);
    });
  });
});

//주문 상세보기
router.get('/detail/:orderID', (req, res, next) => {
  var orderID = req.params.orderID;
  pool.getConnection((err, conn) =>{
    if(err) { throw err; }
    var sql = "SELECT * FROM orderdetail, book WHERE orderdetail.bookID = book.bookID AND orderID = ?"
    conn.query(sql, [orderID], (err, result) => {
      conn.release();
      if(err) { throw err; }
      res.send(result);
    })
  });
});

//주문 등록
router.post('/', (req, res) => {
  const {orderQTY, orderAmount, Member_memberID, orderItem} = req.body;
  pool.getConnection((err, conn) => {
    if(err) { throw err; }
    var insert = "INSERT INTO `bookorder`(`orderQTY`, `orderAmount`, `Member_memberID`) VALUES (?,?,?)";
    conn.query(insert, [orderQTY, orderAmount, Member_memberID], (err, result) => {
      if(err){ throw err;}
      if(result) {
        var sql = `INSERT INTO orderdetail(orderID, bookID, price, QTY) VALUES (
          (SELECT MAX(orderID) FROM bookorder WHERE Member_memberID = ? ORDER BY orderID DESC), ?, ?, ?)`
          try{
            orderItem.forEach(element => {
              const {bookID, price, QTY} = element;
              conn.query(sql, [Member_memberID, bookID, price, QTY]);
            });
          } catch(e) {
            console.log(e);
            res.send({result: false, msg: e});
          } finally {
            conn.release();
          }
          res.send({result: true});
      }
      else {
        res.send(500, {result:false})
      }
    })
  });
});

//주문 수정
router.put('/', function(req, res, next) {
  res.send('respond with a resource');
});

//주문 삭제
router.delete('/:orderID', function(req, res, next) {
  var orderID = req.params.orderID;
});

module.exports = router;
