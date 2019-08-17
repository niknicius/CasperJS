const User = require('../models/User');


module.exports = {
    async index(req, res) {
        const users = await User.find();
        return res.json(users);
    },

    async store(req, res){
        const { username, name, password } = req.body;

        const user = await User.create({
            username,
            name,
            password
        });
        return res.json(user);
    },

    async find(req, res){
        await User.findOne({username: new RegExp('^'+req.params.username+'$', "i")}, function(err, doc) {
            if (err) {
                res.sendStatus(404)
            }
            res.send(doc);
        });
    }
};
