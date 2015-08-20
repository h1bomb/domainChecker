exports.parse = function(callbackName, data, fn) {
	var str = 'var ret;function ' + callbackName + '(data){ ret = data;}';
	try {
		eval(str + data);
	} catch (e) {
		var err = e;
	} finally {
		fn(err, ret);
	}

}