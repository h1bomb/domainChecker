var Ck = require('../lib/checkerP');

var ck = new Ck();

ck.check('zhouqiqisaxa.xyz').then(function(args) {
    console.log(args);
}).catch(function(err) {
    console.log(err);
});

ck.wgRun(2);