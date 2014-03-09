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
        res.send(soynode.render('layout.home', {
            pjax: req.query.pjax
        }));
    });

    app.get('/demos/surface/about', function(req, res) {
        // sleep.sleep(3);
        res.send(soynode.render('layout.about', {
            pjax: req.query.pjax
        }));
    });

    app.listen(3000);
    console.log('Listening on port 3000, Ctrl-C to exit');
    callback();
});

async.series(operations);