const News =  require('../models/News'), crypto = require('crypto');

const hash = require('../config/auth');

module.exports = {
    async index(req, res) {
        await News.find(function (err, data) {
            if(err || data === null){
                res.sendStatus(404);
            }
            else{
                res.send(data);
            }
        });
    },

    async indexByTheme(req, res){
        await News.find({theme: new RegExp('^'+req.params.theme+'$', "i")}, function(err, doc) {
            if (err || doc === null) {
                res.sendStatus(404)
            }
            res.send(doc);
        });
    },

    async store(req, res) {
        if (req.header("Authorization") === hash) {
            const {title, description, theme, img} = req.body;
            console.log(req.body);
            let link = crypto.randomBytes(16).toString('hex');

            const news = await News.create({
                title,
                description,
                theme,
                link,
                img
            }, function (err, newNews) {
                if (err) {
                    res.sendStatus(400);
                }
                res.status(201).send(newNews);
            });
        }
        else{
            res.sendStatus(401);
        }
    },
    
    async remove(req, res){
        if (req.header("Authorization") === hash) {
            await News.findByIdAndDelete(req.params.id, function (err, data) {
                if(err) return res.sendStatus(500).send(err);
                return res.sendStatus(200);
            });
        }
        else{
            res.sendStatus(401);
        }
    },

    async update(req, res){
        if (req.header("Authorization") === hash) {
            await News.findOneAndUpdate(req.params.id, req.body, {new: true}, (err, f) => {
                if(err) return res.sendStatus(500).send(err);
                return res.sendStatus(200);
            })
        }
    }

};


