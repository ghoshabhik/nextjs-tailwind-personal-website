const mongoose = require('mongoose');

const ViewSchema = new mongoose.Schema({
    slug: {
        type: String,
    },
    count: {
        type: Number 
    }
})

module.exports = mongoose.models.View || mongoose.model('View', ViewSchema);