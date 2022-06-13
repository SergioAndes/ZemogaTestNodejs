var mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    workExperience:{
        type:String,
        required:true
    },
    twitterUser:{
        type:String,
        required:true,
        unique:true
    },
    profilePhotoUrl:{
       url:{
        type:String,
        required:true, 
       },
       s3key:{
        type:String,
        required:true,
        }
    }
},{timestamps:true}
)

module.exports = mongoose.model('User',userSchema)