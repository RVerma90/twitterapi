require('dotenv').config()
const Twit = require('twit')
const request = require('request')
const fs = require('fs')

const bot = new Twit({
    consumer_key: process.env.LEARNINGBOT_CONSUMER_KEY,
    consumer_secret: process.env.LEARNINGBOT_CONSUMER_SECRET,
    access_token: process.env.LEARNINGBOT_ACESS_TOKEN,
    access_token_secret: process.env.LEARNINGBOT_ACCESSTOKEN_SECRET,
    timeout_ms: 60*1000
});

function getPhoto() {
    let parameters = {
        url: 'https://api.nasa.gov/planetary/apod',
        qs: {
            api_key: process.env.NASA_KEY
        },
        encoding: 'binary'
    }
    request.get(parameters, function(err, response, body) {
        body = JSON.parse(body);
        saveFile(body, 'nasa.jpg');
    });
}

function saveFile(body, fileName) {
    let file = fs.createWriteStream(fileName);
    request(body).pipe(file).on('close', function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Media Saved.');
            console.log(body);
            let descriptionText = body.title;
            uploadMedia(descriptionText, fileName);
        }
    })
}

function uploadMedia(descriptionText, fileName) {
    let filePath = __dirname + '/' + fileName;
    bot.postMediaChunked({file_path: filePath},
    function (err, data, response) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });
}

uploadMedia('video frmo NASA', 'nasa_video.mp4')