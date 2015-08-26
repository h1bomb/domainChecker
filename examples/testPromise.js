var req = require('request');
var Promise = require('bluebird');
Promise.promisifyAll(req);

req.getAsync('http://163.com').then(function(ret, body) {
    console.log(ret[1]);
})