// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lmj4247',
  database: 'sw08',
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
    } else {
      console.log('Connected to database');
    }
});

// Express 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// 검색 엔드포인트

//카테고리 분류기능 포함하기
app.post('/search', (req, res) => {
  const searchTerm = req.body.searchTerm;
  if(searchTerm == "") res.json({code : 203});
  else {
    const query = `SELECT *
                FROM resume 
                WHERE sid LIKE '%${searchTerm}%' 
                or interest LIKE '%${searchTerm}%' 
                or experience LIKE '%${searchTerm}%' 
                or major LIKE '%${searchTerm}%' 
                or ability LIKE '%${searchTerm}%' 
                or lv LIKE '%${searchTerm}%'`;
    connection.query(query, (error, results) => {
      if (error) throw error;
      else if(results.length == 0) res.json({code : 204});
      console.log(results);
      res.json(results);
    });
  }
});

/*
app.post('/search', (req, res) => {
  const searchTerm = req.body.searchTerm;
  const query = `SELECT *
                FROM resume 
                WHERE sid LIKE '%${searchTerm}%' 
                or wid LIKE '%${searchTerm}%' 
                or experience LIKE '%${searchTerm}%' 
                or major LIKE '%${searchTerm}%' 
                or ability LIKE '%${searchTerm}%' 
                or lv LIKE '%${searchTerm}%'`;

  connection.query(query, (error, results) => {
    if (error) throw error;
    console.log(results);
    res.json(results);
  });
}); */

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
