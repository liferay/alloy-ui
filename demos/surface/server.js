var async = require('async');
var express = require('express');
var path = require('path');
var sleep = require('sleep');
var soynode = require('soynode');

var operations = [];

operations.push(function(callback) {
    console.log('Compiling templates...');

    soynode.setOptions({
        allowDynamicRecompile: true,
        eraseTemporaryFiles: true
    });

    soynode.compileTemplates(__dirname, function(err) {
        if (err) {
            throw err;
        }
        callback();
    });
});

operations.push(function(callback) {
    var app = express();

    app.use(express.static(path.join(__dirname, '../..')));

    app.get('/demos/surface/home', function(req, res) {
        var content = soynode.render('layout.home', {
            info: req.query.sid ? Date.now() : 'Home',
            sid: req.query.sid,
            title: 'Home'
        });

        res.send(content);
    });

    app.get('/demos/surface/about', function(req, res) {
        var content = soynode.render('layout.about', {
            info: req.query.sid ? Date.now() : 'About',
            sid: req.query.sid,
            title: 'About'
        });

        res.send(content);
    });

    app.listen(3000);
    console.log('Listening on port 3000, Ctrl-C to exit');
    callback();
});

async.series(operations);