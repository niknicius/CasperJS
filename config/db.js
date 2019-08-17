const mongoose = require('mongoose');

mongoose.connect('mongodb://casper:.lV|_R8mXI2-@kamino.mongodb.umbler.com:41689/casper', {
    useNewUrlParser: true,
});

module.exports = mongoose;
