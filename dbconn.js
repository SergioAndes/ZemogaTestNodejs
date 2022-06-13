var mongoose = require('mongoose')
exports.connection  = async   (context)=>{
    try{
        console.log('cons '+process.env.mongoDB)
        const con= await mongoose.connect('mongodb+srv://root:root@cluster0.xscsg.mongodb.net/?retryWrites=true&w=majority')

    }catch(err){
        context.res = {
            body: err.message,
            status:500
        };
    }
}