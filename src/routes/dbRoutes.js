var express = require('express');
var dbRouter = express.Router();
const MongoClient = require('mongodb').MongoClient;



dbRouter.route('/AddPortfolioData')
    .get(function(req,res){
        
        var url = 'mongodb://localhost:27017/portfolioApp';
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
             if (err) {
                 console.log(err);
                throw err;
             }
              console.log("Database created!");
              var dbo = db.db("portfolioApp");
           var collection = dbo.collection('projects');
           let projects_list = [
               {
                   name: 'first project',
                   image: 'print1',
                   link: 'linktoproject1'
               },
               {
                   name: 'second project',
                   image: 'print2',
                   link: 'linktoproject2'
               },
               {
                   name: 'third project',
                   image: 'print3',
                   link: 'linktoproject3'
               }
               
           ];
           
           collection.insertMany(projects_list, (err, results) => {
               res.send(results);
               db.close();
           });
        });
    });
    
dbRouter.route('/ShowPortfolioData')
    .get(function(req,res){
        
        var url = 'mongodb://localhost:27017/portfolioApp';
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
             if (err) {
                 console.log(err);
                throw err;
             }
              console.log("Database created!");
              var dbo = db.db("portfolioApp");
           var collection = dbo.collection('projects');
          
           
           collection.find({}).toArray( (err, results) => {
               res.send(results);
               db.close();
           });
        });
    });    

dbRouter.route('/ShowUsersData')
    .get(function(req,res){
        
        var url = 'mongodb://localhost:27017/portfolioApp';
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
             if (err) {
                 console.log(err);
                throw err;
             }
              console.log("Database created!");
              var dbo = db.db("portfolioApp");
           var collection = dbo.collection('users');
          
           
           collection.find({}).toArray( (err, results) => {
               res.send(results);
               db.close();
           });
        });
    });
    
dbRouter.route('/ShowLanguageData')
    .get(function(req,res){
        
        var url = 'mongodb://localhost:27017/portfolioApp';
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
             if (err) {
                 console.log(err);
                throw err;
             }
              console.log("Database created!");
              var dbo = db.db("portfolioApp");
           var collection = dbo.collection('projects');
          
           
           collection.aggregate(
               [
                   {"$project" : {"LANG" : "$language", "PROJ_NAME" : "$name"}},
                   {"$group" : {"_id" : "$LANG", "Number" : { "$sum" : 1}}},
                   {"$sort" : {"Number" : -1}}
                ]
               ).toArray( (err, results) => {
               res.send(results);
               db.close();
           });
        });
    });       
    
module.exports = dbRouter;