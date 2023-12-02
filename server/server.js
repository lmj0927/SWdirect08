const express = require('express');
const app = express();
const test = require('./router/test');
const bodyParser = require('body-parser');

//app.post('/api', test);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api', (req, res)=>{
    res.send({ test: "안녕하세요!"});
  });

app.get('/api/join', (req, res)=>{
    res.send({ test: "join하자"});
  });

app.post('/api/login', (req, res)=>{

    var object = {name : "최유현", age : 20};
    res.send(object);

});

app.post('/api/join_result', (req, res)=>{
    var name = req.body;
    res.send(name);
});
  
const port=3002; //React가 3000번 포트를 사용하기 때문에 node 서버가 사용할 포트넘버는 다른 넘버로 지정해준다.
app.listen(port, ()=>{console.log(`Listening on port ${port}`)});