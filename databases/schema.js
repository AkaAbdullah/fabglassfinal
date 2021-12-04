const mongoose = require('mongoose');

const PrintSchema = new mongoose.Schema({
    Time: {
        type: String,
    },
    User: {
        type: String,
    },
    Pages: {
        type: Number,
    },
    Copies: {
        type: Number,
    },
    Printer: {
        type: String,
    },
    DocumentName: {
        type: String,
    },
    Client: {
        type: String,
    }
})
module.exports = mongoose.models.printingReport || mongoose.model('printingReport', PrintSchema);