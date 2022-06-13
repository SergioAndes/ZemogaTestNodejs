import mongoose from "mongoose";

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
       },
       s3key:{
        type:String,
        }
    }
},{timestamps:true}
)

export default mongoose.model('User',userSchema)