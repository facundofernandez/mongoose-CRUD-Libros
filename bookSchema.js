let mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    title:   'string',
    author:  'string',
    text:    'string',
    total:   'number'
});