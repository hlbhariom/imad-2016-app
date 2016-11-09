var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool=require('pg').pool;
var crypto=require('crypto');
var bodyParser = require('body-parser');



var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/co', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'co.html'));
});
app.get('/login',function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'login.html'));
});
app.get('/signup',function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'signup.html'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js',function (req,res){
    res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
  res.send(counter.toString());
});






var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
