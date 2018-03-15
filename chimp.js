// A terrible nodejs serv coded by Mathieu GARRIGUES


//====================== INCLUDES =============================

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer(); 
var session = require('express-session');
var cookieParser = require('cookie-parser');



//====================== DIRECTORIES =============================

app.use(express.static(__dirname + '/views'));

app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/javascript'));
app.use(express.static(__dirname + '/public/images'));




//====================== MIDDLEWARES =============================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: "Chimpanzee"}));



//====================== SERVER =============================


app.get('/', function(req, res){
   res.render('index.html');
});

app.post('/signup', function(req, res){
   if(!req.body.id || !req.body.password){
      res.status("400");
      res.send("Invalid details!");
   } else {
      Users.filter(function(user){
         if(user.id === req.body.id){
            res.render('signup', {
               message: "User Already Exists! Login or choose another user id"});
         }
      });
      var newUser = {id: req.body.id, password: req.body.password};
      Users.push(newUser);
      req.session.user = newUser;
      res.redirect('/protected_page');
   }
});


//====================== ERRORS HANDLING =============================

app.use('*', function(err, req, res, next){
console.log(err);

	console.log(err);
  	res.redirect('/error');
});




app.listen(8080);

console.log("Chimp hanging on branch 8080.");