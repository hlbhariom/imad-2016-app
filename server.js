var express = require('express');  //Express frameork object
var morgan = require('morgan');  //Morgan Framework object
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
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
var articleThree= {
   title:'Article Three | Hariom',
   heading:'Article Three',
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

`};

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

app.get('/article-one', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});

app.get('/article-two', function (req, res) {
  res.send('Article Two Will Be Served Here Soon...');  //Text Response
});

app.get('/content',function (req, res) {
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

/*app.get('/:articleName', function (req, res) {  //':' symbol lets the articleName be a variable.
    var articleName=req.params.articleName;   //articleName captured from requested url.
  res.send(createTemplate(articles[articleName])); //Sending HTML Response
});*/

//Javascript Response
app.get('/ui/main.js',function(req,res){
    res.sendFile(path.join(__dirname,'ui','main.js'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
