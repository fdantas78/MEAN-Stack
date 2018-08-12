var express = require('express');
var app = express();
var port = process.env.PORT;
//const MongoClient = require('mongodb').MongoClient;
//const urlDb = "mongodb://localhost:8000";

var portfolioRouter = require('./src/routes/portfolioRoutes');
var dbRouter = require('./src/routes/dbRoutes');

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/db', dbRouter);

// app.get('/', 
//     function(req, res) {
//         MongoClient.connect(urlDb, 
//             function(err, database) {
//                 if (err) console.log(err);
                
//                 const myNav = database.db('myDB').collection('nav_bar');
//                 myNav.find({}).toArray(
//                     function(err, navList) {
//                         if (err) console.log(err);

var menuList = [
                {link: './', text:'Home'},
                {link: '#about', text: 'About'}, 
                {link: '#services', text: 'Services'},
                {link: './portfolio', text: 'Portfolio'},
                {link: '#contact', text: 'Contact'}
            ];


app.use('/portfolio', portfolioRouter);

app.get('/',
    function(req,res) {
        res.render('index', {menu: menuList});
    });

app.get('/about',
    function(req,res) {
        res.send('About page');
    });
    
app.listen(port, function(err) {
   console.log('The server is running on port: ' + port); 
});