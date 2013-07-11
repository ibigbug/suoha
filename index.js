#! /usr/bin/env node

var express = require('express'),
    route = require('./routes').route;

var app =  express();

//Environments
app.set('port', process.env['port'] || 3000);
app.set('views', __dirname + '/views');

//Middleware
app.use(express.bodyParser());
app.use('/static', express.static(__dirname + '/public'));

//routes
route(app);

//Start
app.listen(app.get('port'));
