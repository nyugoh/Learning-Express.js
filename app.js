//Import all the modules required
var express = require('express'),
    bodyParser = require('body-parser');

var urlencodeParser = bodyParser.urlencoded({extended: false});

// Create a new app
var app = express();

//Set the listening port
app.set('port', process.env.PORT || 8000);
//Set the render/ View engine --ejs
app.set('view engine', 'ejs');

//Set the router for static files --css,js, images and fonts
app.use('/public', express.static('./public'));

//Shows a log statement in the termninal about each rrequest
app.get('/', function (req, res, next){
    console.log("Incoming request ::");
    console.log("URL    --->" + req.url);
    console.log("Method --->" + req.method);
    console.log("Query  --->" + req.query);
    console.log('');
    next();
});

//All the routes on the navbar
app.get('/', function(req, res){
    res.render('index');
});

app.get('/home', function(req,res){
    res.sendFile(__dirname + '/views/message.html');
});

app.get('/contact/:name/:dept', function(req, res){
    res.render('contact', {name: req.params.name, dept : req.params.dept});
});

app.get('/about', function(req, res){
    var data = {name:'Joe', age:22, hobby:['Hacking', 'Hiking', 'Swimming', 'Workout', 'Play chess']};
    res.render('about', {data: data});
});

app.get('/login', function(req, res){
        res.render('login');
});

//Handles the login button
app.post('/login', urlencodeParser, function(req, res){
        if(!req.body) res.send(404);
        if(req.body.username == 'Joe'){
            res.render('login-good', {data: req.body});
        }else{
            res.render('login', {response:'Username or password is wrong.'});
        }
        console.log(req.body);
});

app.get('/signup', function(req, res){
        res.render('signup');
});


//Start the app
app.listen(app.get('port'), function(){
    console.log('Ninja app is running on port ' + app.get('port'));
});
