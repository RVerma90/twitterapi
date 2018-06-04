require('dotenv').config()
const Twit = require('twit')

const bot = new Twit({
    consumer_key: process.env.LEARNINGBOT_CONSUMER_KEY,
    consumer_secret: process.env.LEARNINGBOT_CONSUMER_SECRET,
    access_token: process.env.LEARNINGBOT_ACESS_TOKEN,
    access_token_secret: process.env.LEARNINGBOT_ACCESSTOKEN_SECRET,
    timeout_ms: 60*1000
});

function tweetMessage() {
    bot.post('statuses/update', {status: 'hello world!'}, function(err,data,response) {
        if (err) {
            console.log(err);
        } else {
            console.log(data.text + ' was tweeted.')
        }
    })    
}

function followersList(){
    bot.get('followers/list', {screen_name: 'glancetoday'}, function(err, data, response) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    })
}

function retweet() {
    bot.post('statuses/retweet/:id', {id: '827575766967865344'}, function(err, data,response) {
            if (err) {
                console.log(err);
            } else {
                console.log(data.text+' was retweeted')
            }
        }
    );
}

function homeTimeline() {
// bot.get('statuses/home_timeline', {count: 5}, function(err, data, response) {
//     if (err) {
//         console.log(err);
//     } else {
//         data.forEach(function(d) {
//             console.log(d.text);
//             console.log(d.user.screen_name);
//             console.log(d.id_str);
//             console.log('\n');
//         })    
//     }
// });
}

function getBotTimeline() {
    bot.get('statuses/home_timeline', {count: 3},
    function(err, data, response) {
        if (err) {
            console.log(err);
        } else {
            data.forEach(function(d) {
                console.log(d.text);
                console.log(d.user.screen_name);
                console.log(d.id_str);
                console.log('\n')
            });
        }
    }
    )
}

function getBotTimeline2() {
    //tweet or untweet
    bot.post('statuses/unretweet/:id', {id: '827575766967865344'}, function(err, data, response) {
            if (err) {
                console.log(err);
            } else {
                console.log(data.text+' was retweeted.');
            }
        }
    )
}

function likeTweet() {
    //create or destroy
    bot.post('favorites/destroy', {id: '1003383788087463936'}, function(err, data, response) {
        if (err) {
            console.log(err);
        }else {
            console.log(data.text+' was unliked.')
        }
    })    
}

function reply() {
    //update or destroy
    bot.post('statuses/destroy', {status: '@glancetoday yay!', in_reply_to_status_id: '827575766967865344'},
    function(err, data, response) {
        if (err) {
            console.log(err)
        } else {
            console.log(data);
        }
    })
}

function searchTweets() {

    //q: can be 
    //q:blue fish
    //q:red OR blue
    //q:moon -landing
    //q:sad :)
    //q:#hastags
    //q:to:@user
    //q:from:@user
    //q:dance filter:safe (safe posts)
    //q:dance filter:media (includes video or media)
    //q:dance filter:links (includes url)
    //q:dance url:amazon (specific website)
    //q:dance ? (questions)
    //q:dance since: 2017-01-01 (since date)
    //result_type: 'recent/popular'
    //gecode: 37, -122,1mi
    //lang: 'es'

    bot.get('search/tweets', {q: 'trump', count: 5}, function(err, data, response) {
        if(err) {
            console.log(err);
        } else {
            data.statuses.forEach(function(s) {
                console.log(s.text);
                console.log(s.user.screen_name);
                console.log('\n');
            })
        }
    })
}
searchTweets()
