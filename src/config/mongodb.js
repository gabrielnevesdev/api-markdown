const mongoose = require("mongoose")

const Markdown = new mongoose.Schema({
    title:String,
    data:Object,
    update:String
})

module.exports = mongoose.model(
    'Markdown', Markdown, 'Markdown'
)