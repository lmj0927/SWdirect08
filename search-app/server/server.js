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
  password: 'lmj4248',
  database: 'sw08',
});

connection.connect();

// Express 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// 검색 엔드포인트
app.post('/search', (req, res) => {
  const searchTerm = req.body.searchTerm;
  const query = `SELECT * FROM resume WHERE major LIKE '%${searchTerm}%'`;

  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
