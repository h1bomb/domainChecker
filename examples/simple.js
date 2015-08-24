var Ck = require('../index');

var ck = new Ck();

ck.check('zhouqiqisaxa.xyz', function(error, response, body) {
    if (!error) {
        console.log(body);
    } else {
        console(error);
    }
})