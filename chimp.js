// A terrible nodejs serv deftly coded by Mathieu GARRIGUES


//====================== INCLUDES =============================

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer(); 
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require("path");



//====================== DIRECTORIES =============================

app.use(express.static(__dirname + '/views'));


app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/public/css/story/assets/js'));
// app.use(express.static(__dirname + '/public/css/story/images'));




//====================== MIDDLEWARES =============================

 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: "Chimpanzee"}));
//app.engine('html', require('ejs').renderFile);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


//====================== CSS =============================


// app.get("/main.css", function(req, res){
	
//    res.sendFile('main.css', {root : __dirname + '/public/css/story/assets/css/'});
// });

//====================== SERVER =============================


app.get("/projects", function(req, res){
	res.render("projects.html");
});

app.get("/profile", function(req, res){
	res.render("profile.html");
});

app.get("/project/:id", function(req, res){
	res.render("incoming.html");
});

app.get("/error", function(req, res){
	res.render("error.html");
});






//====================== ERRORS HANDLING =============================


app.use("*", function(req, res){
	res.render("404.html");
});

app.use('*', function(err, req, res, next){
console.log(err);

	console.log(err);
  	res.redirect('/error');
});



app.listen(8080);

console.log("Chimp hanging on branch 8080.");