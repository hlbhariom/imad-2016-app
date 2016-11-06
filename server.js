var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool=require('pg').pool;
var crypto=require('crypto');
var bodyParser = require('body-parser');

var config={
    user:'divya063',
    database:'divya063',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
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
app.get('/ui/profile.css',function (req,res){
    res.sendFile(path.join(__dirname, 'ui', 'profile.css'));
});
function hash(input,salt){
    var hashed=crypto.pbkdf2sync(input,salt,1000,512,'sha512');
   return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}

app.get('hash/:input', function(req,res){
    var hashedString=hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
});
app.post('/signup/create-user', function (req, res) {
// username, password
// {"username": "tanmai", "password": "password"}
// JSON
var username = req.body.username;
var password = req.body.password;
var salt = crypto.randomBytes(128).toString('hex');
var dbString = hash(password, salt);
pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
if (err) {
res.status(500).send(err.toString());
} else {
res.send('User successfully created: ' + username);
}
});
});
var pool=new Pool(config);
app.get('/test-db', function(req,res){
pool.query('SELECT * FROM test' ,function(err,result){
    if (err) {
res.status(500).send(err.toString());
} else {
res.send(res.send(JSON.stringify(result.rows)));
}
});
});






var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
