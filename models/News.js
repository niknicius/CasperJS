const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: String,
    description: String,
    theme: String,
    link: String,
    img: String,
    timestamps: { createdAt: 'created_at' }
});

module.exports = mongoose.model('News', NewsSchema);
