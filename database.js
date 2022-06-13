var mongoose = require('mongoose')

module.exports = conn= ()=>{
    mongoose.connect(
        'mongodb+srv://root:root@cluster0.xscsg.mongodb.net/?retryWrites=true&w=majority')
}