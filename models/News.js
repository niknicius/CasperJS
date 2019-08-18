const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: String,
    description: String,
    theme: String,
    link: String,
    img: String
});

module.exports = mongoose.model('News', NewsSchema);
