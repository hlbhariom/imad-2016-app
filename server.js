var express = require('express');  //Express frameork object
var morgan = require('morgan');  //Morgan Framework object
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/loginform',function(req,res){
var loginform=`<div class="login">
        <header class="login-header"><span class="text">LOGIN</span><span class="loader"></span></header>
	        <form class="login-form">
		          <input type="text" placeholder="Username" class="login-input">
			            <input type="password" placeholder="Password" class="login-input">
				              <button type="submit" class="login-btn">login</button>
					              </form>
						            </div>`;

 res.send(loginform);
 });
//Array of 'data' objects 'articles'
var articles={
   'article-four': {
   title:'Article Four | Hariom',
   heading:'Article Four',
   date:'29th Sept, 2016',
   content:`<p>
                This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.
             </p>
             <p>
                    This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.
             </p>
             <p>
                    This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.
             </p>

`},
   'article-five': {
   title:'Article Five | Hariom',
   heading:'Article Five',
   date:'29th Sept, 2016',
   content:`<p>
                This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.
             </p>
             <p>
                    This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.
             </p>
             <p>
                    This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.
             </p>

`}
};
//Single 'data' object 'articleThree'
var articleThree= `

                This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.

                This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.

             <p>
                    This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.
             </p>
             This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.

                This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.

             <p>
                    This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.
             </p>
             This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.

                This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.

             <p>
                    This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.
             </p>
            This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.

                This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.

             <p>
                    This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.
             </p>
             This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.

                This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.

             <p>
                    This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.
             </p>
             This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.

                This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.

             <p>
                    This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.
             </p>
`;

//Function that takes data object as arguement and returns htmlTemplate.
function createTemplate(data) {
    title=data.title;
    date=data.date;
    heading=data.heading;
    content=data.content;
    var htmlTemplate =`
        <html>
         <head>
            <title>${title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>

        <body>
            <div class="container">
                <div>
                    <a href='/'>Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
        </html>
`;
    return htmlTemplate;
}

//CSS Response
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));   //Respond to request 'req' using 'res'
});

app.get('/ui/logo.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'logo.png'));   //png Response
});

app.get('/ui/i1.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'i1.jpg'));   //png Response
});
app.get('/ui/i2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'i2.jpg'));   //jpg Response
});
app.get('/ui/i3.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'i3.jpg'));   //jpg Response
});

app.get('/article-one', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});

app.get('/message', function (req, res) {
  res.send('Article Two Will Be Served Here Soon...');  //Text Response
});
app.get('/content', function (req, res) {
  res.send(articleThree);  //Text Response
});

app.get('/newArticle',function (req, res) {
var content=`<div  class="contentwrapper tabcontent" id="newArticle">
  <form action="##" method="post">
  <fieldset>
    <input type="text" name="category" placeholder="category"></input>
    <br>
    <input type="text" name="title" placeholder="title"></input>
    <br>
    <textarea class="contentdata">
    </textarea>
    <br>
    <input type="submit" name="submit" value="Post"></input>
    <br>
  </fieldset>
</form></div>
    `;
    res.send(content);
});

app.get('/fonturl1', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'fonturl1.eot'));
});

app.get('/fonturl2', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'fonturl2.eot'));
});

app.get('/fonturl3', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'fonturl3.woff2'));
});

app.get('/fonturl4', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'fonturl4.woff'));
});

app.get('/fonturl5', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'fonturl5.ttf'));
});

app.get('/fonturl6', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'fonturl6.svg'));
});


/*app.get('/:articleName', function (req, res) {  //':' symbol lets the articleName be a variable.
    var articleName=req.params.articleName;   //articleName captured from requested url.
  res.send(createTemplate(articles[articleName])); //Sending HTML Response
});*/

//Javascript Response
app.get('/ui/main.js',function(req,res){
    res.sendFile(path.join(__dirname,'ui','main.js'));
});
app.get('/ui/jquery.min.js',function(req,res){
    res.sendFile(path.join(__dirname,'ui','jquery.min.js'));
});


app.get('/ui/prefixfree.min.js',function(req,res){
    res.sendFile(path.join(__dirname,'ui','prefixfree.min.js'));
});

app.get('/ui/login.js',function(req,res){
    res.sendFile(path.join(__dirname,'ui','login.js'));
});
var port = 8080;// Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
