const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applistSchema = new Schema({

    item: {
        type: String,
    },

    completed: {
        type: Boolean,
        default: false
    }
});

let applist = mongoose.model('applist', applistSchema);

module.exports = applist;