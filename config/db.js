const mongoose = require('mongoose');

mongoose.connect('mongodb://niknicius01:preguicaPass15@mongodb.niknicius.kinghost.net/niknicius01', {
    useNewUrlParser: true,
});

module.exports = mongoose;
