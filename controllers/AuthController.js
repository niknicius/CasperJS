const crypto = require('crypto'), User = require('../models/User');

const hash = require('../config/auth');

function verifyHash(userHash){
    return userHash === hash;
}

module.exports = {

    async login(req, res){
        await User.findOne({username: new RegExp('^'+req.body.username+'$', "i")}, function(err, doc) {
            const body = req.body;

            if (err) {
                res.sendStatus(401)
            }

            if(doc != null && body.username === doc.username && body.password === doc.password){
                res.send({"hash": hash});
            }else{
                res.sendStatus(401);
            }
        });

        //res.sendStatus(401);
    }

};
