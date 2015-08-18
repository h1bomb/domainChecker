exports.numberAndlettre = function(length) {
    var letters = "0123456789abcdefghijklmnopqrstuvwxyz";

    var ret = '';

    for (var i = 0; i < Math.pow(letters.length, length); i++) {
        var x = i;
        for (var j = 0; j < length; j++) {
            ret += letters.substr((x % letters.length), 1);
            x = parseInt(x / letters.length);
        }
        if (i !== Math.pow(letters.length, length) - 1) {
            ret += ',';
        }
    }
    ret = ret.split(',');
    return ret;
}