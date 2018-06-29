var express = require('express');
var portfolioRouter = express.Router();

var menuList = [
                {link: './', text:'Home'},
                {link: '#about', text: 'About'}, 
                {link: '#services', text: 'Services'},
                {link: './portfolio', text: 'Portfolio'},
                {link: '#contact', text: 'Contact'}
            ];

portfolioRouter.route('/')
    .get(function(req,res){
        res.render('portfolio', {menu: menuList});
    });

portfolioRouter.route('/event')
    .get(function(req,res){
        res.send('single Event!!!');
    });

module.exports = portfolioRouter;