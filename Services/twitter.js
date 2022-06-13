import fetch from 'node-fetch';
import dotenv from 'dotenv'

dotenv.config();
const twitterToken = process.env.TWITTER_BEARER_TOKEN

const getTweets = async (userName)=>{
    const response = await fetch('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name='+userName+'&count=5&tweet_mode=extended',{
        method:'get',
	    headers: {'Authorization': 'Bearer '+ twitterToken}
});
    const body = await response.json();
    return body
} 

export default {getTweets}