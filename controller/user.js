import twitterService from '../Services/twitter.js'
import path from 'path';
import User from '../model/user.js'
import {fileURLToPath} from 'url';
//paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const getUser = async (req,res,next)=>{
    try{
        const username= req.params.userName
        const foundUser= await User.findOne({ twitterUser: username }).exec();
        if(!foundUser){
            console.log('se erro pa')
        }   
        const tweetList = await twitterService.getTweets(username);
        const cleanTweetList= await tweetList.map(tweet=>{
        const cleanTweet ={};
        cleanTweet.description=tweet.full_text
        cleanTweet.name=tweet.user.name
        
        const tweetDate = new Date(tweet.created_at)
        const year = tweetDate.getFullYear() ; 
        const day = tweetDate.getDate(); 
        cleanTweet.date= day+'/'+tweetDate.toLocaleString("default", {month: "long"})+'/'+year+'';
        return cleanTweet
    })
    res.render('userProfile',{
        cleanTweets:cleanTweetList,
        foundUser:foundUser,
        pageTitle:'User Tweets',
        path:'/'
    })
    }catch(err){
        console.log(err)
    }
}

const createUser = async (req,res,next)=>{
try{
    const newUser = new User({
        name:req.body.name,
        workExperience:req.body.workExperience,
        twitterUser:req.body.twitterUser,
        profilePhotoUrl:req.body.profilePhotoUrl,
    })
    const dbResutl = await newUser.save()
    res.status(201).json({message:"User created", idUser:dbResutl._id})

}catch(err){
    console.log(err)
}
//res.status(201).json({message:"created", idUser:"el mongoso"})
}

export default {createUser,getUser}