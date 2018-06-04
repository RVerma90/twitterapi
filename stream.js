require('dotenv').config()
const Twit = require('twit')

const bot = new Twit({
    consumer_key: process.env.LEARNINGBOT_CONSUMER_KEY,
    consumer_secret: process.env.LEARNINGBOT_CONSUMER_SECRET,
    access_token: process.env.LEARNINGBOT_ACESS_TOKEN,
    access_token_secret: process.env.LEARNINGBOT_ACCESSTOKEN_SECRET,
    timeout_ms: 60*1000
});

// let stream = bot.stream('statuses/sample');
let stream = bot.stream('statuses/filter', {
    track: 'global warming'
});

stream.on('tweet', function(tweet) {
    console.log(tweet.text+'\n');
});

