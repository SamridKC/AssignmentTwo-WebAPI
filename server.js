var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var passport = require('passport');
var authController = require('./auth');

var app = express();
app.use(bodyParser.text( {
    type: function (req) {
        return 'text';
    }
}));

app.use(passport.initialize());

var router = express.Router();

router.route('/post')
//app.post('/post', function (req, res) {
    .post(authController.isAuthenticated, function (req, res) {
    console.log(req.body);
    res = res.status(200);
    if (req.get('Content-Type')) {
        console.log("Content-Type: " + req.get('Content-Type'));
        res = res.type(req.get('Content-Type'));
        }
    res.send(req.body);
    }
);

app.use('/', router);
app.listen(process.env.PORT || 8080);