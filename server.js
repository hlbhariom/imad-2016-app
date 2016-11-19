var express = require('express');  //Express frameork object
var morgan = require('morgan');  //Morgan Framework object
var path = require('path');
var pg=require('pg');
var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/manifest.appcache', function (req, res) {
  res.set("Content-Type", "text/cache-manifest");
  res.sendFile(path.join(__dirname, 'manifest.appcache'));
});

app.use(express.static('public'));
app.use('/ui',express.static(__dirname+'/ui'));
app.use('/css',express.static(__dirname+'/css'));
app.use('/js',express.static(__dirname+'/js'));
app.use('/jquery',express.static(__dirname+'/jquery'));
app.use('/font',express.static(__dirname+'/font'));
app.use('/image',express.static(__dirname+'/image'));


/*Data Requests Start Here*/
app.get('/blogs/latest',function(req,res){
  var blog=`<h2>Why Blog?</h2>
  <h5><span class="glyphicon glyphicon-time"></span> Post by John Doe, Sep 24, 2015.</h5>
  <h5><span class="label label-success">Lorem</span></h5><br>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  <hr>

  <h4>Leave a Comment:</h4>
  <form role="form">
    <div class="form-group">
      <textarea class="form-control" rows="3" required></textarea>
    </div>
    <button type="submit" class="btn btn-success">Submit</button>
  </form>
  <br><br>

  <p><span class="badge">2</span> Comments:</p><br>

  <div class="row">
    <div class="col-sm-2 text-center">
      <img src="bandmember.jpg" class="img-circle" height="65" width="65" alt="Avatar">
    </div>
    <div class="col-sm-10">
      <h4>Anja <small>Sep 29, 2015, 9:12 PM</small></h4>
      <p>Keep up the GREAT work! I am cheering for you!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <br>
    </div>
    <div class="col-sm-2 text-center">
      <img src="bird.jpg" class="img-circle" height="65" width="65" alt="Avatar">
    </div>
    <div class="col-sm-10">
      <h4>John Row <small>Sep 25, 2015, 8:25 PM</small></h4>
      <p>I am so happy for you man! Finally. I am looking forward to read about your trendy life. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <br>
      <p><span class="badge">1</span> Comment:</p><br>
      <div class="row">
        <div class="col-sm-2 text-center">
          <img src="bird.jpg" class="img-circle" height="65" width="65" alt="Avatar">
        </div>
        <div class="col-xs-10">
          <h4>Nested Bro <small>Sep 25, 2015, 8:28 PM</small></h4>
          <p>Me too! WOW!</p>
          <br>
        </div>
      </div>
    </div>
  </div>
</div>
</div>`;
  res.send(blog);
});

/*Data Requests End Here*/


var port = 8080;// Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
