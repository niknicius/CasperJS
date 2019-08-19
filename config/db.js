const mongoose = require('mongoose');

mongoose.connect('mongodb://niknicius:t4C7*iVF*d6C@kamino.mongodb.umbler.com:41971/casper', {
    useNewUrlParser: true,
});

module.exports = mongoose;
