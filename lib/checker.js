var req = require('request');
var wg = require('./wordsGenerator');
var jsonp = require('./jsonp');
var store = require('./store');

module.exports = Checker;

var DEFAULT_CHECK_URL = 'http://pandavip.www.net.cn/check/checkdomain';
var TOKEN_REG_URL = 'https://ynuf.alipay.com/service/um.json?xv=0.8.1&xt=';
var DOMAIN_LIST = ['com', 'net', 'cn', 'xyz', 'im', 'me', 'top', 'ren', 'cc'];
var DEFAULT_METHOD = 'call';
var DELAY = '1000';

function Checker(options) {
    this.opts = options || {};
    if (!this.opts.delay) {
        this.opts.delay = DELAY;
    }
}

Checker.prototype.wgRun = function(num) {
    var words = wg.numberAndlettre(num);
    var that = this;
    var i = 0;
    var k;

    function _check() {
        if (i < words.length) {
            var domains = [];
            for (k = 0; k < DOMAIN_LIST.length; k++) {
                domains.push(words[i] + '.' + DOMAIN_LIST[k]);
            }
            domains = domains.join(',');

            that.check(domains, function(error, response, body) {
                if (error || response.statusCode !== 200 || !body.module) {
                    console.log('something wrong!');
                    return;
                }
                body.module.forEach(function(m) {
                    if (m.avail) {
                        console.log(m);
                    }
                });
                i++;

                console.log('domain:' + words[i - 1] + ' finished:' + i + '/' + words.length);
                setTimeout(_check, that.opts.delay);
            });
        }
    }

    _check();
}

Checker.prototype.check = function(domain, callback) {
    var token = genToken();
    req(TOKEN_REG_URL + token, function(error, response) {
        req(DEFAULT_CHECK_URL + '?callback=' + DEFAULT_METHOD + '&domain=' + domain + '&token=' + token, function(error, response, body) {
            if (error) {
                callback(error);
            } else {
                jsonp.parse(DEFAULT_METHOD, body, function(err, data) {
                    if (data) {
                        var ds = new store();
                        ds.insert(data);
                    }
                    callback(error, response, data);
                });
            }

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