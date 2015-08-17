var req = require('request');

module.exports = Checker;

var DEFAULT_CHECK_URL = 'http://pandavip.www.net.cn/check/checkdomain';
var TOKEN_REG_URL = 'https://ynuf.alipay.com/service/um.json?xv=0.8.1&xt=';

function Checker(options) {

}

Checker.prototype.check = function(domain, callback) {
    var token = genToken();
    req(TOKEN_REG_URL + token, function(error, response) {
        req(DEFAULT_CHECK_URL + '?domain=' + domain + '&token=' + token, function(error, response, body) {
            callback(error, response, body);
        });
    });
}

function genToken() {
    var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var result = [];
    var length = data.length;
    for (var i = 0; i < 32; i++) {
        var r = Math.floor(Math.random() * length);
        result.push(data[r]);
    }
    return 'check-web-hichina-com:' + result.join('');
}