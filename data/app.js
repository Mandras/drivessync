// USEFULL FUNCTIONS

String.prototype.replace_all = function(str1, str2, ignore) { return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2); } 
function isNumeric(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

// REQUIRES

var app = module.exports = require('appjs');

var exec = require('child_process').exec;
var fs = require('fs');

var tree = require(__dirname + '/node_modules/mediasync/tree');

// INITIALIZING APP

app.serveFilesFrom(__dirname + '/content');

var window = app.createWindow({
	icons  : __dirname + '/content/icons',
	width  : 516,
	height : 480
});

window.on('create', function(){
	window.frame.show();
	window.frame.center();
});

window.on('ready', function(){
	window.process = process;
	window.module = module;

	window.addEventListener('keydown', function(e) {
		if (e.keyIdentifier === 'F12') { window.frame.openDevTools(); }
	});

	window.addEventListener('toto', function(e) {
		console.log('YEAH');
	});
});

// ROUTES

app.router.get('/drives', function(request, response, next) { tree.get_drives(request, response, next); });
app.router.post('/sync', function(request, response, next) { tree.sync(request, response, next, tree); });
app.router.get('/msg', function(request, response, next) { tree.msg(request, response, next); });

// END
