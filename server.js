var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var articleThree={
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


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/article-one', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});

app.get('/article-two', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three',function (req, res) {
    res.send(createTemplate(articleThree));
});

app.get('/article-four', function (req, res) {
  res.send('Article 4 is not reaady yet.');
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
