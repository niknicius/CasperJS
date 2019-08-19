const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://niknicius:preguicaPass15@casper-pua3q.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

module.exports = mongoose;
