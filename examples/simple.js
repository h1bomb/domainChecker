var Ck = require('../index');

var ck = new Ck();

ck.check('zhouqiqi.cn', function(error, response, body) {
	if (!error) {
		console.log(body);
	} else {
		console(error);
	}
})