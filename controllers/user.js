const User = require('../models/user')
const AWS = require('aws-sdk');

exports.getUser = async (context)=>{
    try{
        const username= context.bindingData.userTwitter
        const foundUser= await User.findOne({ twitterUser: username },'name workExperience twitterUser profilePhotoUrl ').exec();
        if(!foundUser){
            return context.res = {
                status:404,
                body: {                   
                    errorMessage:'User not found'
                }
            };
        }
        context.res = {
            body: foundUser
        };
    }catch(error){
        context.res = {
            body: error.message,
            status:500
        };
    }
}

exports.updateUser = async (context,responseMessage)=>{
let filename
try{
    const req = responseMessage.fields.reduce((acum, curr) => ({ [curr.name]: curr.value, ...acum}), {})
    //console.log(responseMessage)
    if(!req.userId){
        return context.res = {
            status:400,
            body: {                   
                errorMessage:'userId is required'
            }
        };
    }

    const foundUser= await User.findById(req.userId).exec();
    if(!foundUser){
        return context.res = {
            status:404,
            body: {                   
                errorMessage:'User not found'
            }
        };
    }
    if(req.name){
        foundUser.name= req.name
    }
    if(req.workExperience){
        foundUser.workExperience= req.workExperience
    }
    if(responseMessage.files.length>0){
        req.file=responseMessage.files[0]
        filename = Date.now()+''+req.file.filename
    }
    foundUser.twitterUser= req.twitterUser
    const profilePhotoUrl= foundUser.profilePhotoUrl

    const s3 = getS3Object()


    console.log('profile antes de '+ JSON.stringify(profilePhotoUrl) )

    
    //cuando ya hay una foto en la bd, borra la foto y agrega la nueva
    if((JSON.stringify(profilePhotoUrl) !='{}'&& responseMessage.files.length>0)){

        const clearImages = await s3.deleteObject({
            Bucket: 'twitterbucketsergio',
            Key: profilePhotoUrl.s3key
          }).promise()
          console.log(clearImages)
          const uploadedImage = await s3.upload({
            Bucket: 'twitterbucketsergio',
            Key: filename,
            Body: req.file.bufferFile
          }).promise()
          foundUser.profilePhotoUrl.url=uploadedImage.Location
          foundUser.profilePhotoUrl.s3key=filename
        };
        
    //cuando no hay foto en db, solo agrega la nueva y no borra nada
    if((JSON.stringify(profilePhotoUrl)==='{}' && responseMessage.files.length>0)){
        const uploadedImage = await s3.upload({
            Bucket: 'twitterbucketsergio',
            Key: filename,
            Body: req.file.bufferFile
          }).promise()
          foundUser.profilePhotoUrl.url=uploadedImage.Location
          foundUser.profilePhotoUrl.s3key=filename
    }

    const dbResutl= await foundUser.save()
    context.res = {
        body: dbResutl,
    };


}catch(err){
    console.log(err)
    context.res = {
        body: err.message,
        status:500
    };
}
//res.status(201).json({message:"created", idUser:"el mongoso"})
}


const getS3Object =()=>{
    
    const ID = process.env.s3Id;
    const SECRET = process.env.s3Secret;
        
    // The name of the bucket that you have created
    const BUCKET_NAME = 'twitterbucketsergio';
    
    s3 = new AWS.S3({
        accessKeyId: ID,
        secretAccessKey: SECRET
    });
    
    return s3
}
