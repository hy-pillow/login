/**
 * Created by zhaob on 16/10/29.
 */

var express = require('express');
var path = require('path');
var sessionParser = require('express-session');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'html');
app.set('views', path.resolve('views'));
app.engine('.html', require('ejs').__express);

app.use(bodyParser.urlencoded({extended:true}));
app.use(sessionParser({
    resave: true,
    saveUninitialized: true,
    secret: 'zb'
}));
app.use(function (req, res, next) {
    if (req.path != '/login' && req.path != '/user') {
        res.redirect('/user');
    } else {
        next();
    }
});

function checkLogin (req, res, next) {
    if (!req.session.name) {
        res.redirect('/login');
    } else {
        next();
    }
}

app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/login', function (req, res) {
    if (req.body.name == req.body.pwd) {
        req.session.name = req.body.name;
        res.redirect('/user');
    } else {
        res.redirect('back');
    }
});
app.get('/user', checkLogin, function (req, res) {
    res.render('user', {name: req.session.name});
});
app.listen(8080);